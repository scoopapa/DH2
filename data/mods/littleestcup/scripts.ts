export const Scripts: BattleScriptsData = { 
	gen: 9,
	side: {
		inherit: true,
		constructor(name: string, battle: Battle, sideNum: number, team: PokemonSet[]) {
			const sideScripts = battle.dex.data.Scripts.side;
			if (sideScripts) Object.assign(this, sideScripts);
	
			this.battle = battle;
			this.id = ['p1', 'p2', 'p3', 'p4'][sideNum] as SideID;
			this.n = sideNum;
	
			this.name = name;
			this.avatar = '';
	
			this.team = team;
			this.pokemon = [];
			for (let i = 0; i < this.team.length && i < 24; i++) {
				// console.log("NEW POKEMON: " + (this.team[i] ? this.team[i].name : '[unidentified]'));
				this.pokemon.push(new Pokemon(this.team[i], this));
				this.pokemon[i].position = i;
			}
	
			switch (this.battle.gameType) {
			case 'doubles':
				this.active = [null!, null!];
				break;
			case 'triples': case 'rotation':
				this.active = [null!, null!, null!];
				break;
			default:
				this.active = [null!];
			}
	
			this.pokemonLeft = this.pokemon.length;
			this.faintedLastTurn = null;
			this.faintedThisTurn = null;
			this.totalFainted = 0;
			this.zMoveUsed = false;
			this.dynamaxUsed = this.battle.gen !== 9;
	
			this.sideConditions = {};
			this.slotConditions = [];
			// Array#fill doesn't work for this
			for (let i = 0; i < this.active.length; i++) this.slotConditions[i] = {};
	
			this.activeRequest = null;
			this.choice = {
				cantUndo: false,
				error: ``,
				actions: [],
				forcedSwitchesLeft: 0,
				forcedPassesLeft: 0,
				switchIns: new Set(),
				zMove: false,
				mega: false,
				ultra: false,
				terastallize: false,
				dynamax: false,
			};
	
			// old-gens
			this.lastMove = null;
		},
		canDynamaxNow() {
			if (this.battle.gen !== 9) return false;
			if (this.battle.gameType === 'multi' && this.battle.turn % 2 !== [1, 1, 0, 0][this.n]) return false;
			// if (this.battle.gameType === 'multitriples' && this.battle.turn % 3 !== [1, 1, 2, 2, 0, 0][this.side.n]) {
			//        return false;
			// }
			if (this.dynamaxUsed) return false;
			if (this.battle.ruleTable.has('bigdogclause')) {
				return this.active.some(pokemon => pokemon.m.dog);
			}
			return true;
		},
	},
	pokemon: {
	inherit: true,
		getDynamaxRequest(skipChecks?: boolean) {
			// {gigantamax?: string, maxMoves: {[k: string]: string} | null}[]
			if (!skipChecks) {
				const speciesid = this.species.id;
				if (!this.side.canDynamaxNow()) return;
				if (
					this.species.isMega || this.species.isPrimal || this.species.forme === "Ultra" || this.canMegaEvo
				) {
					return;
				}
				// Some pokemon species are unable to dynamax
				if (this.species.cannotDynamax || this.illusion?.species.cannotDynamax) return;
			}
			const result: DynamaxOptions = {maxMoves: []};
			let atLeastOne = false;
			for (const moveSlot of this.moveSlots) {
				const move = this.battle.dex.moves.get(moveSlot.id);
				const maxMove = this.battle.actions.getMaxMove(move, this);
				if (maxMove) {
					if (this.maxMoveDisabled(move)) {
						result.maxMoves.push({move: maxMove.id, target: maxMove.target, disabled: true});
					} else {
						result.maxMoves.push({move: maxMove.id, target: maxMove.target});
						atLeastOne = true;
					}
				}
			}
			if (!atLeastOne) return;
			if (this.canGigantamax) result.gigantamax = this.canGigantamax;
			return result;
		},		
	},
};
