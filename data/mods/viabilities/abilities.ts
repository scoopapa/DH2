'use strict';
exports.BattleAbilities = {
	"stench": {
		shortDesc: "Grants immunity to Fairy-type moves.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fairy') { // adding the immunity
				this.add('-immune', target, '[from] ability: Stench');
				return null;
			}
		},
		id: "stench",
		name: "Stench",
		rating: 0.5,
		num: 1,
	},
	"anticipation": {
		desc: "On switch-in, this Pokemon is alerted if any opposing Pokemon has an attack that is super effective on this Pokemon, or an OHKO move. Counter, Metal Burst, and Mirror Coat count as attacking moves of their respective types, Hidden Power counts as its determined type, and Judgment, Multi-Attack, Natural Gift, Revelation Dance, Techno Blast, and Weather Ball are considered Normal-type moves. Being alerted will cause the user's speed to be raised by one stage.",
		shortDesc: "On switch-in, this Pokemon shudders if any foe has a supereffective or OHKO move. Shuddering raises Speed by one stage.",
		onStart(pokemon) {
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted) continue;
				for (const moveSlot of target.moveSlots) {
					const move = this.dex.getMove(moveSlot.move);
					const moveType = move.id === 'hiddenpower' ? target.hpType : move.type;
					if (move.category !== 'Status' && (this.dex.getImmunity(moveType, pokemon) && this.dex.getEffectiveness(moveType, pokemon) > 0 || move.ohko)) {
						this.add('-ability', pokemon, 'Anticipation');
						if (!this.boost({spe: 1})) { // here Speed is boosted
							this.add('-immune', target, '[from] ability: Anticipation');
						}
						return;
					}
				}
			}
		},
		id: "anticipation",
		name: "Anticipation",
		rating: 0.5,
		num: 107,
	},
	"battery": {
		shortDesc: "Upon switching in, the user will automatically use Charge.",
		onStart(pokemon){
			pokemon.addVolatile('charge'); // fortunately 'charge' is a volatile
			this.add('-activate', pokemon, 'ability: Battery');
		},
		id: "battery",
		name: "Battery",
		rating: 0,
		num: 217,
	},
	"klutz": {
		desc: "The user's contact moves will remove the opponent's items, but it will lose its own item upon being hit by any attack.",
		shortDesc: "Removes Item when making contact, loses Item when receiving contact.",
		onAfterMoveSecondary(target, source, move) { // inspired to Knock Off
			if (target !== source && move.flags['contact'] && source.hp) {
				let item = target.takeItem();
				if (item) {
					this.add('-enditem', target, item.name, '[from] move: Knock Off', '[of] ' + source);
				}
			}
		},
		onDamagingHit(damage, target, source, move) { // inspired to Pickpocket
			if (target !== source && move.flags['contact'] && source.hp) {
				let item = target.takeItem();
				if (item) {
					this.add('-enditem', target, item.name, '[from] move: Knock Off', '[of] ' + source);
				}
			}
		},
		id: "klutz",
		name: "Klutz",
		rating: -1,
		num: 103,
	},
	"receiver": {
		desc: "This Pokemon copies the Ability of an ally that faints. Abilities that cannot be copied are Flower Gift, Forecast, Gulp Missile, Hunger Switch, Ice Face, Illusion, Imposter, Multitype, Stance Change, Trace, Wonder Guard, and Zen Mode.",
		shortDesc: "This Pokemon copies the Ability of an ally that faints.",
		onStart(pokemon) {
			var target, switchingOut, id;
			if (pokemon.side.faintedLastTurn) {
				switchingOut = battle.log[battle.lastMoveLine].splice('|');
				id = switchingOut.indexOf('faint') + 1;
				for(const ally of side.pokemon){ if(ally.id === switchingOut[id]) target = ally; } // pretty sure 'pokemon.id' is in the same format as what is shown in the console, just needs testing
				if (!this.effectData.target.hp) return;
				let ability = target.getAbility();
				let bannedAbilities = ['battlebond', 'comatose', 'disguise', 'download', 'flowergift', 'forecast', 'gorillatactics', 'gulpmissile', 'hugepower', 'hungerswitch', 'hustle', 'iceface', 'illusion', 'intrepidsword', 'imposter', 'multitype', 'powerconstruct', 'powerofalchemy', 'purepower', 'receiver', 'rkssystem', 'schooling', 'shieldsdown', 'stancechange', 'trace', 'wonderguard', 'zenmode'];
				if (bannedAbilities.includes(target.ability)) return;
				this.add('-ability', this.effectData.target, ability, '[from] ability: Receiver', '[of] ' + target);
				this.effectData.target.setAbility(ability);
			}
		},
		id: "receiver",
		name: "Receiver",
		rating: 0,
		num: 222,
	},
};
