'use strict';

let BattleScripts = {
	getItem: function (name) {
		let pokemon = this.getTemplate(name);
		if (pokemon.exists) {
			pokemon.transmuteAbility = pokemon.abilities[0];
			return pokemon;
		}
		return Object.getPrototypeOf(this).getItem.call(this, name);
	},

	runMegaEvo: function (pokemon) {
		const templateid = pokemon.canMegaEvo || pokemon.canUltraBurst;
		if (!templateid) return false;
		const side = pokemon.side;

		// Pokémon affected by Sky Drop cannot mega evolve. Enforce it here for now.
		for (const foeActive of side.foe.active) {
			if (foeActive.volatiles['skydrop'] && foeActive.volatiles['skydrop'].source === pokemon) {
				return false;
			}
		}

		pokemon.formeChange(templateid, pokemon.getItem(), true);
		if (this.canTransmute(pokemon)) {
			let oldHP = pokemon.hp;
			let newHP = Math.floor(Math.floor(2 * pokemon.template.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100) * pokemon.level / 100 + 10);
			pokemon.hp = newHP - (pokemon.maxhp - pokemon.hp);
			pokemon.maxhp = newHP;
			if (newHP > oldHP) this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
			else if (newHP < oldHP) this.add('-damage', pokemon, pokemon.getHealth, '[silent]');
			// Pls no more than one transmutation for each pokemon
			pokemon.canMegaEvo = null;
		} else {
			let wasMega = pokemon.canMegaEvo;
			for (const ally of side.pokemon) {
				if (wasMega) {
					ally.canMegaEvo = null;
				} else {
					ally.canUltraBurst = null;
				}
			}
		}

		// Limit one mega evolution
		

		this.runEvent('AfterMega', pokemon);
		return true;
	},

	canTransmute: function (pokemon) {
		let transmuteMon = this.getTemplate(pokemon.item);
		if (transmuteMon.effectType !== 'Pokemon') {
			return null;
		}
		return transmuteMon;
	},

	canMegaEvo: function (pokemon) {
		if (this.canTransmute(pokemon)) return this.canTransmute(pokemon);
		let altForme = pokemon.baseTemplate.otherFormes && this.getTemplate(pokemon.baseTemplate.otherFormes[0]);
		let item = pokemon.getItem();
		if (altForme && altForme.isMega && altForme.requiredMove && pokemon.baseMoves.includes(toID(altForme.requiredMove)) && !item.zMove) return altForme.species;
		if (item.megaEvolves !== pokemon.baseTemplate.baseSpecies || item.megaStone === pokemon.species) {
			return null;
		}
		return item.megaStone;
	},

	pokemon: {
		formeChange: function (templateId, source = this.battle.effect, isPermanent, message, abilitySlot = '0') {
			let rawTemplate = this.battle.getTemplate(templateId);

			if (!rawTemplate.abilities) return false;

			let template = this.battle.singleEvent('ModifyTemplate', this.battle.getFormat(), null, this, source, null, rawTemplate);

			if (!template) return false;

			this.template = template;

			if (source && !source.transmuteAbility) this.setType(template.types, true);
			this.apparentType = rawTemplate.types.join('/');
			this.addedType = template.addedType || '';
			this.knownType = true;
			if (this.battle.gen >= 7) this.removeVolatile('autotomize');

			if (source) {
				let stats = this.battle.spreadModify(this.template.baseStats, this.set);
				if (!this.baseStats) this.baseStats = stats;
				for (let statName in this.stats) {
					// @ts-ignore
					this.stats[statName] = stats[statName];
					// @ts-ignore
					this.baseStats[statName] = stats[statName];
					// @ts-ignore
					if (this.modifiedStats) this.modifiedStats[statName] = stats[statName]; // Gen 1: Reset modified stats.
				}
				if (this.battle.gen <= 1) {
					// Gen 1: Re-Apply burn and para drops.
					// FIXME: modifyStat() is only defined for the Gen 1 mod...
					// @ts-ignore
					if (this.status === 'par') this.modifyStat('spe', 0.25);
					// @ts-ignore
					if (this.status === 'brn') this.modifyStat('atk', 0.5);
				}
				this.speed = this.stats.spe;
				if ((!source.id && !source.effectType) || this.battle.gen <= 2) return true;

				let apparentSpecies = this.illusion ? this.illusion.template.species : template.baseSpecies; // The species the opponent sees
				if (isPermanent) {
					this.baseTemplate = rawTemplate;
					this.details = template.species + (this.level === 100 ? '' : ', L' + this.level) + (this.gender === '' ? '' : ', ' + this.gender) + (this.set.shiny ? ', shiny' : '');
					this.battle.add('detailschange', this, (this.illusion || this).details);
					if (source.effectType === 'Item') {
						// @ts-ignore
						if (source.zMove) {
							this.battle.add('-burst', this, apparentSpecies, template.requiredItem);
							this.moveThisTurnResult = true; // Ultra Burst counts as an action for Truant
						} else if (source.onPrimal) {
							if (this.illusion) {
								this.ability = '';
								this.battle.add('-primal', this.illusion);
							} else {
								this.battle.add('-primal', this);
							}
						} else if (source.transmuteAbility) {
							// this.battle.add('-transmute', this, apparentSpecies, source.transmuteAbility); will probably work when i make a client mod for this
							// but until then
							this.battle.add('-message', `${this.side.name}'s ${this.species} has Transmuted into ${source.species}!`);
							this.moveThisTurnResult = true; // Transmutation counts as an action for Truant
						} else {
							this.battle.add('-mega', this, apparentSpecies, template.requiredItem);
							this.moveThisTurnResult = true; // Mega Evolution counts as an action for Truant
						}
					} else if (source.effectType === 'Status') {
						// Shaymin-Sky -> Shaymin
						this.battle.add('-formechange', this, template.species, message);
					}
				} else {
					if (source.effectType === 'Ability') {
						this.battle.add('-formechange', this, template.species, message, `[from] ability: ${source.name}`);
					} else {
						this.battle.add('-formechange', this, this.illusion ? this.illusion.template.species : template.species, message);
					}
				}
				if (source.effectType !== 'Ability' && source.id !== 'relicsong' && source.id !== 'zenmode') {
					if (this.illusion) {
						this.ability = ''; // Don't allow Illusion to wear off
					}
					this.setAbility(template.abilities[abilitySlot], null, true);
					if (isPermanent) this.baseAbility = this.ability;
				}
			}
			return true;
		},
	},
};

exports.BattleScripts = BattleScripts;
