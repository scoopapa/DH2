export const Moves: {[moveid: string]: MoveData} = {
	swarmattack: {
		num: -1,
		accuracy: 90,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 10 + (move.hit * 10);
		},
		category: "Physical",
		name: "Swarm Attack",
		shortDesc: "Hits 3 times. Each hit can miss, but power rises. 10% to lower Defense.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		multihit: 3,
		multiaccuracy: true,
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Attack Order", target);
		},
		secondary: {
			chance: 10,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Bug",
	},
	blackhole: {
		num: -2,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		shortDesc: "User loses 50% of its max HP. Damages with halved Sp. Def in 3 turns.",
		name: "Black Hole",
		pp: 5,
		priority: 0,
		flags: {authentic: 1},
		willCrit: false,
		isFutureMove: true,
		onPrepareHit: function(target, source, move) {
			this.damage(source.baseMaxhp / 2, source);
			this.attrLastMove('[still]');
			this.add('-anim', source, "Black Hole Eclipse", target);
			this.add('-message', `${source.name} summoned a Black Hole...`);
		},
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 4,
				move: 'blackhole',
				source: source,
				moveData: {
					id: 'blackhole',
					name: "Black Hole",
					accuracy: 100,
					basePower: 200,
					category: "Special",
					priority: 0,
					flags: {},
					target: "normal",
					effectType: 'Move',
					isFutureMove: true,
					type: '???',
				},
			});
			this.add('-start', source, 'Black Hole');
			return null;
		},
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	parry: {
        num: -3,
        accuracy: true,
        basePower: 0,
        category: "Status",
        pp: 5,
        priority: -1,
        flags: {contact: 1, protect: 1},
		  stallingMove: true,
        volatileStatus: 'parry',
        beforeTurnCallback(pokemon) {
        pokemon.addVolatile('parry');
        },
        beforeMoveCallback(pokemon, move) {
            if (pokemon.volatiles['parry'] && pokemon.volatiles['parry'].untouched) {
					 const ppDeducted = pokemon.deductPP(move, 1);
                if (!ppDeducted) 
                return false;
            }
            else if (pokemon.volatiles['parry'] && !pokemon.volatiles['parry'].untouched) {
					 this.add('-message', `${pokemon.name} was unable to parry...`);
                return true;
            }
        },
        condition: {
            duration: 1,
            onStart(pokemon) {
                this.add('-message', `${pokemon.name} is attempting to parry!`);
            },
            onHit(pokemon, source, move) {
                if (move.category !== 'Status') {
                    pokemon.volatiles['parry'].untouched = true;
               }
           },
       },
		 onHit(pokemon) {
            if (pokemon.volatiles['parry'] && pokemon.volatiles['parry'].untouched) {
                const NoParry = ['assist', 'beakblast', 'belch', 'bide', 'celebrate', 'chatter', 'copycat', 'dynamaxcannon', 'focuspunch', 'mefirst', 'metronome', 'mimic', 'mirrormove', 'naturepower', 'shelltrap', 'sketch', 'uproar', 'sketch', 'parry', 'protect', 'detect'];
                const moves = [];
                for (const moveSlot of pokemon.moveSlots) {
                    const move = moveSlot.id;
                    if (move && !NoParry.includes(move) && !this.dex.getMove(move).flags['charge']) {
                        moves.push(move);
                    }
                }
                let randomMove = '';
                if (moves.length) randomMove = this.sample(moves);
                if (!randomMove) return false;
                this.useMove(randomMove, pokemon);
                if (randomMove == 'sleeptalk') {
                    const ppDeducted = pokemon.deductPP(randomMove, 2);
                    if (!ppDeducted) return false;
                }
                else {
                    const ppDeducted = pokemon.deductPP(randomMove, 1);
                    if (!ppDeducted) return false;
                }
            }
        },
        name: "Parry",
        desc: "Parry",
        secondary: null,
        target: "self",
        type: "Fighting",
        contestType: "Cool",
    },
	
	///////
	
	spikes: {
		inherit: true,
		flags: {authentic: 1},
		desc: "Sets up a hazard on the opposing side of the field, causing each opposing Pokemon that switches in to lose 1/8 of their maximum HP, rounded down, unless it is a Flying-type Pokemon. Fails if the effect is already active on the opposing side. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin successfully.",
		shortDesc: "Hurts grounded foes on switch-in. Max 1 layer.",
		condition: {
			// this is a side condition
			onStart(side) {
				if (!this.effectData.layers || this.effectData.layers === 0) {
					this.add('-sidestart', side, 'Spikes');
					this.effectData.layers = 1;
				} else {
					return false;
				}
			},
			onSwitchIn(pokemon) {
				if (!pokemon.runImmunity('Ground')) return;
				const damageAmounts = [0, 3];
				this.damage(damageAmounts[this.effectData.layers] * pokemon.maxhp / 24);
			},
		},
	},
	
};
