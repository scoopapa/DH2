export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	gen: 9,
	teambuilderConfig: {
		// for micrometas to only show custom tiers
		excludeStandardTiers: true,
		// only to specify the order of custom tiers
		customTiers: ['CCAPM2024'],
	},	
	
	init() {
		
	},
	battle: {
	},
	actions: {
		secondaries(targets: SpreadMoveTargets, source: Pokemon, move: ActiveMove, moveData: ActiveMove, isSelf?: boolean) {
			if (!moveData.secondaries) return;
			for (const target of targets) {
				if (target === false) continue;
				const secondaries: Dex.SecondaryEffect[] =
					this.battle.runEvent('ModifySecondaries', target, source, moveData, moveData.secondaries.slice());
				for (const secondary of secondaries) {
					const secondaryRoll = this.battle.random(100);
					// User stat boosts or target stat drops can possibly overflow if it goes beyond 256 in Gen 8 or prior
					const secondaryOverflow = (secondary.boosts || secondary.self) && this.battle.gen <= 8;
					if (typeof secondary.chance === 'undefined' ||
						secondaryRoll < (secondaryOverflow ? secondary.chance % 256 : secondary.chance)) {
						let flag = true;
						let canSetStatus = function (status, target, pokemon) {
							if (target.status) return false;
							let cantStatus = {
								brn: ['Fire', 'comatose', 'waterveil', 'waterbubble'],
								frz: ['Ice', 'comatose', 'magmaarmor'],
								par: ['Electric', 'comatose', 'limber'],
								psn: ['comatose', 'immunity'],
								slp: ['comatose', 'insomnia', 'vitalspirit'],
								tox: ['comatose', 'immunity'],
							};
							if (target.hasType(['Poison', 'Steel']) && (status === 'psn' || status === 'tox')) {
								if (pokemon.hasAbility('corrosion')) {
									return true;
								} else {
									return false;
								}
							}
							if (target.hasType(cantStatus[status][0])) return false;
							if (move.ignoreAbility) return true;
							if (target.hasAbility('leafguard') && this.isWeather(['sunnyday', 'desolateland'])) return false;
							if (target.hasAbility('shieldsdown') && target.template.speciesid === 'miniormeteor') return false;
							if (target.hasAbility(cantStatus[status])) return false;
							return true;
						};
						if (moveData.secondary.status) flag = canSetStatus(moveData.secondary.status, target, source);
						if (moveData.secondary.volatileStatus) flag = !(moveData.secondary.volatileStatus in target.volatiles);
						if (moveData.secondary.volatileStatus === 'flinch') flag = flag && target.activeTurns && !target.moveThisTurn;
						this.moveHit(target, source, move, secondary, true, isSelf);
						if (moveData.secondary.self && moveData.secondary.self.boosts) {
							Object.keys(moveData.secondary.self.boosts).forEach(boost => {
								if (source.boosts[boost] === 6) flag = false;
							});
						} else {
							flag = flag && !(target.hp === undefined || target.hp <= 0);
						}
						if (moveData.target !== 'self' && moveData.secondary.boosts) {
							let cantLower = {
								'atk': ['clearbody', 'fullmetalbody', 'hypercutter', 'whitesmoke'],
								'def': ['bigpecks', 'clearbody', 'fullmetalbody', 'whitesmoke'],
								'spa': ['clearbody', 'fullmetalbody', 'whitesmoke'],
								'spd': ['clearbody', 'fullmetalbody', 'whitesmoke'],
								'spe': ['clearbody', 'fullmetalbody', 'whitesmoke'],
								'accuracy': ['clearbody', 'fullmetalbody', 'keeneye', 'whitesmoke'],
							};
							for (let k in moveData.secondary.boosts) {
								if (target.boosts[k] === -6) {
									flag = false;
									continue;
								}
								if (moveData.secondary.boosts[k] < 0 && target.hasAbility(cantLower[k]) && !move.ignoreAbility) {
									flag = false;
									break;
								}
							}
						}
						if (source.hasAbility('sheerforce')) flag = false;
						if (target && target.hasAbility('shielddust') && !move.ignoreAbility && !move.secondary.self.boosts) {
							flag = false;
						}
						if (flag && target.hasAbility('countermeasures')) {
							this.battle.add('-activate', target, 'ability: Countermeasures');
							this.battle.damage(source.baseMaxhp * (100 - secondary.chance) / 100, source, target);
						}
					}
				}
			}
		}
	},
	side: {
		addFishingTokens(amount: number) {
			if(amount === 0) return;
			if(this.fishingTokens === undefined) this.fishingTokens = 0;
			if(this.battle.field.isTerrain('fishingterrain')) amount *= 2;
			this.fishingTokens += amount;
			const word = (amount === 1) ? 'token was' : 'tokens were';
			this.battle.add('-message', `${amount} fishing ${word} added to ${this.name}'s side!`);
			this.battle.hint(`They now have ${this.fishingTokens} tokens.`);
		},
		removeFishingTokens(amount: number) {
			if(amount === 0) return;
			if(this.fishingTokens === undefined) this.fishingTokens = 0;
			if (amount > this.fishingTokens) {
				//this.add('-message', `There weren't enough fishing tokens on the field!`);
				return false;
			}
			this.fishingTokens -= amount;
			const word = (amount === 1) ? 'token was' : 'tokens were';
			this.battle.add('-message', `${amount} fishing ${word} removed from ${this.name}'s side!`);
			this.battle.hint(`They now have ${this.fishingTokens} tokens.`);
			return true;
		},
	},
	pokemon: {
		
	},
};
