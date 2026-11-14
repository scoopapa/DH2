/*
Ratings and how they work:
-1: Detrimental
	  An ability that severely harms the user.
	ex. Defeatist, Slow Start
 0: Useless
	  An ability with no overall benefit in a singles battle.
	ex. Color Change, Plus
 1: Ineffective
	  An ability that has minimal effect or is only useful in niche situations.
	ex. Light Metal, Suction Cups
 2: Useful
	  An ability that can be generally useful.
	ex. Flame Body, Overcoat
 3: Effective
	  An ability with a strong effect on the user or foe.
	ex. Chlorophyll, Sturdy
 4: Very useful
	  One of the more popular abilities. It requires minimal support to be effective.
	ex. Adaptability, Magic Bounce
 5: Essential
	  The sort of ability that defines metagames.
	ex. Imposter, Shadow Tag
*/

import { onDatabaseStart } from "../../../server/private-messages/database";

export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	bloodsucker: {
		shortDesc: "The user gains 100% more HP from draining moves.",
		onTryHealPriority: 1,
		onTryHeal(damage, target, source, effect) {
			const heals = ['drain', 'leechseed', 'ingrain', 'aquaring', 'strengthsap'];
			if (heals.includes(effect.id)) {
				return this.chainModify(2);
			}
		},
		flags: {},
		name: "Bloodsucker",
		rating: 3,
		num: -1,
	},
	insectbreathing: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (['furyattack', 'hornattack', 'horndrill', 'hyperdrill', 
				'retaliate', 'fellstinger', 'lunge', 'megahorn', 'twineedle', 
				'poisonjab', 'poisonsting', 'drillpeck', 'drillrun', 'smartstrike'].includes(move.id)) {
				this.debug('Sharpness boost');
				return this.chainModify(1.2);
			}
		},
		onModifyMovePriority: -1,
		onModifyMove(move) {
			if (move.category !== "Status") {
				this.debug('Adding Insect Breathing poison');
				if (move.secondaries) move.secondaries = [];
				move.secondaries.push({
					chance: 50,
					status: 'tox',
				});
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'psn' && status.id !== 'tox') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Insect Breathing');
			}
			return false;
		},
		flags: {},
		name: "Insect Breathing",
		shortDesc: "Piercing moves have 1.2x damage and 50% tox. +Poison properties.",
	},	
	grandtriskellion: {
		name: "Grand Triskellion",
		onSwitchOut(pokemon) {
			pokemon.side.addSlotCondition(pokemon, 'grandtriskellion');
		},
	   condition: {
			onSwap(target) {
				 if (!target.fainted) {
					  const source = this.effectState.source;
					  const damage = this.heal(target.baseMaxhp / 8, target, source); 
					  target.side.removeSlotCondition(target, 'grandtriskellion');
				 }
			},
	   },
		rating: 3,
		shortDesc: "On switch-out, the next Pokemon sent out heals 1/8 of the user's max HP.",
		num: -3,
	},
	ringmaster: {
		name: "Ringmaster",
		shortDesc: "Levitate + While this Pokemon is active, sound moves are disabled.",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Ringmaster');
			for (const target of pokemon.adjacentFoes()) {
				target.addVolatile("ringmaster");
			}
		},
		onUpdate(pokemon) {
			for (const target of pokemon.adjacentFoes()) {
				target.addVolatile("ringmaster");
			}
		},
		onEnd(pokemon) {
			for (const target of pokemon.adjacentFoes()) {
				if (target.volatiles['ringmaster']) target.removeVolatile('ringmaster');
			}
		},
		condition: {
			duration: 2,
			onStart(target) {
				this.add('-start', target, 'Ringmaster', '[silent]');
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.dex.moves.get(moveSlot.id).flags['sound']) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 6,
			onBeforeMove(pokemon, target, move) {
				if (!move.isZ && !move.isMax && move.flags['sound']) {
					this.add('cant', pokemon, 'ability: Ringmaster');
					return false;
				}
			},
			onModifyMove(move, pokemon, target) {
				if (!move.isZ && !move.isMax && move.flags['sound']) {
					this.add('cant', pokemon, 'ability: Ringmaster');
					return false;
				}
			},
			onResidualOrder: 22,
			onEnd(target) {
				this.add('-end', target, 'Ringmaster', '[silent]');
			},
		},
	},
	packhunter: {
		onSwitchOut(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Velociraptor') return;
			if (pokemon.species.forme !== 'Pack') {
				pokemon.formeChange('Velociraptor-Pack', this.effect, true);
			}
		},
		onSwitchIn() {
			this.effectState.switchingIn = true;
		},
		onStart(pokemon) {
			if (!this.effectState.switchingIn) return;
			this.effectState.switchingIn = false;
			if (pokemon.baseSpecies.baseSpecies !== 'Velociraptor') return;
			this.add('-activate', pokemon, 'ability: Pack Hunter');
			if (pokemon.species.forme === 'Pack') pokemon.addVolatile('packhunter');
		},
		condition: {
			duration: 3,
			onPrepareHit(source, target, move) {
				if (move.category === 'Status' || move.multihit || 
				move.flags['noparentalbond'] || move.flags['charge'] || move.flags['futuremove'] ||
				move.spreadHit || move.isZ || move.isMax) return;
				
				if (move.flags['slicing'] || move.flags['bite']) {
					move.multihit = 2;
					move.multihitType = 'packhunter';
					if (!move.flags['contact']) move.flags.contact = 1;
				}
			},
			// Damage modifier implemented in BattleActions#modifyDamage()
			onEnd(pokemon){
				if (pokemon.species.forme == 'Pack') {
					pokemon.formeChange('Velociraptor', this.effect, true);
				}
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1, notransform: 1},
		name: "Pack Hunter",
		shortDesc: "If this Pokemon is a Velociraptor, switching out has it change to Pack Form for 3 turns."
	},
	innatepotential: {
		onResidualOrder: 29,
		onResidual(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'The Second Coming' || pokemon.transformed || !pokemon.hp) return;
			if (pokemon.species.id === 'thesecondcomingawakened' || pokemon.hp > pokemon.maxhp / 3) return;
			this.add('-activate', pokemon, 'ability: Innate Potential');
			pokemon.formeChange('The Second Coming-Awakened', this.effect, true);
			pokemon.baseMaxhp = Math.floor(Math.floor(
				2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100
			) * pokemon.level / 100 + 10);
			const newMaxHP = pokemon.volatiles['dynamax'] ? (2 * pokemon.baseMaxhp) : pokemon.baseMaxhp;
			pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
			pokemon.maxhp = newMaxHP;
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
			this.heal(pokemon.baseMaxhp / 4);
		},
		onSourceAfterFaint(length, target, source, effect) {
			if (source.baseSpecies.baseSpecies !== 'The Second Coming' || !source.hp) return;
			if (effect && effect.effectType === 'Move') {
				source.removeVolatile('mustrecharge');
				this.add('-message', `${source.name} recharged instantly!`);
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Innate Potential",
		shortDesc: "If The Second Coming, changes to Awakened if at 1/3 max HP or less at end of turn.",
	},
};
