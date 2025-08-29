export const Abilities: {[k: string]: ModdedAbilityData} = {
	/*
	placeholder: {
		
		flags: {},
		name: "",
		shortDesc: "",
	},
	*/
	goodasmold: {
		onTryHit(target, source, move) {
			if (move.category === 'Status' && target !== source) {
				this.add('-immune', target, '[from] ability: Good as Mold');
				target.setAbility('mycelliummight');
				return null;
			}
		},
		flags: {},
		name: "Good as Mold",
		shortDesc: "Immunity to Status moves; changes to Mycellium Might after activating.",
	},
	starfall: {
		onStart(source) {
			this.field.setWeather('meteorshower');
		},
		flags: {},
		name: "Starfall",
		shortDesc: "On switchin, this Pokemon summons Meteor Shower.",
	},
	ligma: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (!this.checkMoveMakesContact(move, source, target, true)) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		flags: {},
		name: "Ligma",
		shortDesc: "Pokemon using non-contact attacks against this Pokemon lose 1/8 of their max HP."
	},
	ligmaaura: {
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Ligma Aura');
		},
		onAnyBasePowerPriority: 20,
		onAnyBasePower(basePower, source, target, move) {
			if (target === source || move.category === 'Status' || move.type !== 'Fire') return;
			if (!move.auraBooster?.hasAbility('Ligma Aura')) move.auraBooster = this.effectState.target;
			if (move.auraBooster !== this.effectState.target) return;
			return this.chainModify([move.hasAuraBreak ? 3072 : 5448, 4096]);
		},
		flags: {},
		name: "Ligma Aura",
		shortDesc: "While this Pokemon is active, a Fire move used by any Pokemon has 1.33x power.",
	},
	coolingsystem: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				this.field.setWeather('raindance');
			}
		},
		flags: {breakable: 1},
		name: "Cooling System",
		shortDesc: "This Pokemon summons Rain Dance before gtting hit by a Fire-type move.",
	},
	mactonight: {
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'meteorshower') {
				this.heal(target.baseMaxhp / 8);
			}
		},
		flags: {},
		name: "Mac Tonight",
		shortDesc: "This Pokemon gains 1/8th of its max HP every turn during Meteor Shower.",
	},
	theoriginal: {
		onBasePowerPriority: 24,
		onBasePower(basePower, pokemon, target) {
			if (target.hasType(pokemon.getTypes())) {
				return this.chainModify(1.3);
			}
		},
		flags: {},
		name: "The Original",
		shortDesc: "This Pokemon's moves deal 1.3x damage to targets that share a type with it.",
	},
	starwalker: {
		onModifySpe(spe, pokemon) {
			if (this.field.isWeather('meteorshower')) {
				return this.chainModify(2);
			}
		},
		flags: {},
		name: "Starwalker",
		shortDesc: "If Meteor Shower is active, this Pokemon's Speed is doubled.",
	},
	starguard: {
		onDamage(damage, target, source, effect) {
			if (this.field.isWeather('meteorshower') && effect.effectType !== 'Move') {
				if (effect.effectType === 'Ability') this.add('-activate', source, 'ability: ' + effect.name);
				return false;
			}
		},
		flags: {},
		name: "Star Guard",
		shortDesc: "If Meteor Shower is active, this Pokemon is immune to indirect damage.",
	},
	plunder: {
		onAfterMoveSecondarySelf(source, target, move) {
			if (source.stole || !move || !target || !target.lastMove || target.moveSlots.length === 1) return;
			if (target !== source && move.category !== 'Status') {
				let learnedMove = false;
				for (let i = 0; i < target.moveSlots.length; i ++) {
					const temp = target.moveSlots[i];
					const moveSlot = this.dex.moves.get(temp.id);
					if (moveSlot === null || source.moveSlots.some(move => (move.name === temp.move) || temp.move !== target.lastMove.name)) continue;
					this.attrLastMove('[still]');
					learnedMove = {
						move: moveSlot,
						id: moveSlot.id,
						pp: moveSlot.pp,
						maxpp: moveSlot.pp,
						target: moveSlot.target,
						disabled: false,
						used: false,
					};
					source.moveSlots[source.moveSlots.length] = learnedMove;
					source.baseMoveSlots[source.moveSlots.length] = learnedMove;
					target.moveSlots.splice(i, 1);
					target.baseMoveSlots.splice(i, 1);
					source.stole = true;
					break;
				}
				if (learnedMove) this.add('-message', `${source.name} stole ${target.name}'s ${learnedMove.move}!`);
			}
		},
		flags: {},
		name: "Plunder",
		shortDesc: "This Pokemon's first attack steals the target's last used move, if any, from their moveset and adds it to its own. Once per battle.",
	},
	humansacrifice: {
		shortDesc: "If this Pokemon attacks & KO’s a target, it restores 1/3 max HP.",
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.add('-activate', source, 'ability: Human Sacrifice');
				this.heal(source.baseMaxhp / 3, source, source, effect);
			}
		},
		name: "Human Sacrifice",
	},
	shiningmoon: {
		onAnyModifyBoost(boosts, pokemon) {
			const unawareUser = this.effectState.target;
			if (unawareUser === pokemon) return;
			if (unawareUser === this.activePokemon && unawareUser === this.activeTarget) {
				if (boosts['evasion'] > 0) boosts['evasion'] = 0;
			}
			if (pokemon === this.activePokemon && pokemon === this.activeTarget) {
				if (boosts['accuracy'] < 0) boosts['accuracy'] = 0;
			}
		},
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'meteorshower') {
				this.heal(target.baseMaxhp / 16);
			}
		},
		flags: {},
		name: "Shining Moon",
		shortDesc: "User ignores its acc drops and target's eva boosts; heals 1/16 in Meteor Shower.",
	},
	mimicry: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (!this.field.terrain || !pokemon.isGrounded()) return;
			if (move.type === 'Steel' && pokemon.hasType("Steel")) return this.chainModify([2, 3]);
			switch (this.field.terrain) {
			case 'electricterrain':
				if (move.type === 'Electric') return this.chainModify(1.5);
				break;
			case 'grassyterrain':
				if (move.type === 'Grass') return this.chainModify(1.5);
				break;
			case 'mistyterrain':
				if (move.type === 'Fairy') return this.chainModify(1.5);
				break;
			case 'psychicterrain':
				if (move.type === 'Psychic') return this.chainModify(1.5);
				break;
			}
		},
		flags: {},
		name: "Mimicry",
		shortDesc: "This Pokemon loses Steel STAB but gains corresponding STAB in terrain.",
	},
};
