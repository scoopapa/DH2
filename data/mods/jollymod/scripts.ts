export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	gen: 9,
	teambuilderConfig: {
		// for micrometas to only show custom tiers
		excludeStandardTiers: true,
		// only to specify the order of custom tiers
		customTiers: ['IF'],
	},	
	
	init() {
		
	},
	battle: {
	},
	actions: {
	},
	side: {
		addKarma(amount: number) {
			if(amount === 0) return;
			if(this.karma === undefined) this.karma = 0;
			this.karma += amount;
			this.battle.add('-message', `${this.name} gained ${amount} karma!`);
			this.battle.hint(`They now have ${this.karma} karma.`);
		},
		removeKarma(amount: number) {
			if(amount === 0) return;
			if(this.karma === undefined) this.karma = 0;
			this.karma -= amount;
			this.battle.add('-message', `${this.name} lost ${amount} karma!`);
			this.battle.hint(`They now have ${this.karma} karma.`);
		},
		punish() {
			if (!this.active) {
				this.battle.add('-message', "But there was no one home...");
				return;
			}
			const n = this.random(100);
			const pokemon = this.active[0];
			if (n < 40) {
				this.battle.add('-message', `Santa gave ${this.name} coal!`);
				this.add('-anim', pokemon, "G-Max Volcalith", pokemon);
				this.addSideCondition('gmaxvolcalith');
			} else if (n < 60) {
				this.battle.add('-message', `Santa lectured ${pokemon.name} about right and wrong!`);
				const bestStat = pokemon.getBestStat(true, true);
				this.boost({[bestStat]: -1}, pokemon);
			} else if (n < 80) {
				this.battle.add('-message', `Santa sent a chilling breeze!`);
				this.battle.add('-message', `${pokemon.name} became weak to Ice!`);
				pokemon.addVolatile('hypothermia');
			} else if (n < 90) {
				this.battle.add('-message', `Santa passed down chilling judgement!`);
				const newMove = this.dex.getActiveMove('judgment');
				const newSet = {
					name: 'Mew',
					species: 'Mew',
					item: 'Icicle Plate',
					ability: 'Static',
					moves: [ 'Judgment' ],
					nature: 'Serious',
					evs: { hp: 85, atk: 85, def: 85, spa: 85, spd: 85, spe: 85 },
					gender: 'N',
					ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
					happiness: 255,
					hpType: '',
					pokeball: '',
					gigantamax: false,
					dynamaxLevel: 10,
					teraType: 'Ice',
					level: 100
				};
				const newMon = new Pokemon(newSet, pokemon.side);
				this.add('-anim', pokemon, "Judgment", pokemon);
				this.actions.useMove(newMove, newMon, pokemon);
			} else if (n < 95) {
				this.battle.add('-message', `Santa gave ${this.name} coal!`);
				this.add('-anim', pokemon, "Stealth Rock", pokemon);
				this.addSideCondition('stealthrock');
			} else if (n < 99) {
				this.battle.add('-message', `Santa sent a chilling breeze!`);
				this.battle.add('-message', `${pokemon.name} became frozen!`);
				pokemon.setStatus('frz');
			} else {
				this.battle.add('-message', `Santa took out his hammer!`);
				const newMove = this.dex.getActiveMove('gigatonhammer');
				const newSet = {
					name: 'Mew',
					species: 'Mew',
					item: 'Icicle Plate',
					ability: 'Static',
					moves: [ 'Gigaton Hammer' ],
					nature: 'Serious',
					evs: { hp: 85, atk: 85, def: 85, spa: 85, spd: 85, spe: 85 },
					gender: 'N',
					ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
					happiness: 255,
					hpType: '',
					pokeball: '',
					gigantamax: false,
					dynamaxLevel: 10,
					teraType: 'Ice',
					level: 100
				};
				const newMon = new Pokemon(newSet, pokemon.side);
				this.add('-anim', pokemon, "Gigaton Hammer", pokemon);
				this.actions.useMove(newMove, newMon, pokemon);
			}
		},
	},
	pokemon: {
		inherit: true,
		hasAbility(ability) {
			if (this.ignoringAbility()) return false;
			if (Array.isArray(ability)) return ability.some(abil => this.hasAbility(abil));
			const abilityid = this.battle.toID(ability);
			return this.ability === abilityid || !!this.volatiles['ability:' + abilityid];
		},
		isGrounded(negateImmunity = false) {
			if ('gravity' in this.battle.field.pseudoWeather) return true;
			if ('ingrain' in this.volatiles && this.battle.gen >= 4) return true;
			if ('smackdown' in this.volatiles) return true;
			if ('staccato' in this.volatiles) return true;
			const item = (this.ignoringItem() ? '' : this.item);
			if (item === 'ironball') return true;
			// If a Fire/Flying type uses Burn Up and Roost, it becomes ???/Flying-type, but it's still grounded.
			if (!negateImmunity && this.hasType('Flying') && !('roost' in this.volatiles)) return false;
			if (
				(this.hasAbility('levitate') || 
				this.hasAbility('impalpable')) && 
				!this.battle.suppressingAbility(this)) return null;
			if ('magnetrise' in this.volatiles) return false;
			if ('telekinesis' in this.volatiles) return false;
			return item !== 'airballoon';
		},
	},
};