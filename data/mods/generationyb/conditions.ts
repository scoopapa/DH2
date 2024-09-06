export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
	aurumaura: {
		name: 'Aurum Aura',
		noCopy: true,
		onStart(pokemon) {
			const type = pokemon.teraType;
      	this.add('-start', pokemon, 'Aurum Aura');
			this.add('-message', `${pokemon.name}'s glistening aura changes its attacks' categories to what they were in the past!`);
			if (type === 'Stellar' || pokemon.species.baseSpecies === 'Ogerpon') {
				switch (pokemon.species.name) {
					case 'Ogerpon':
						pokemon.setAbility('embodyaspectteal', pokemon, true);
						this.add('-activate', pokemon, 'ability: Embody Aspect (Teal)');
						break;
					case 'Ogerpon-Cornerstone':
						pokemon.setAbility('embodyaspectcornerstone', pokemon, true);
						this.add('-activate', pokemon, 'ability: Embody Aspect (Cornerstone)');
						break;
					case 'Ogerpon-Hearthflame':
						pokemon.setAbility('embodyaspecthearthflame', pokemon, true);
						this.add('-activate', pokemon, 'ability: Embody Aspect (Hearthflame)');
						break;
					case 'Ogerpon-Wellspring':
						pokemon.setAbility('embodyaspectwellspring', pokemon, true);
						this.add('-activate', pokemon, 'ability: Embody Aspect (Wellspring)');
						break;
					case 'Terapagos-Terastal':
						pokemon.setAbility('teraformzero', pokemon, true);
						this.add('-activate', pokemon, 'ability: Teraform Zero');
						break;
					case 'Kaledzi': case 'Urxine': case 'Nectear': case 'Sucrosid':  case 'Fyermine':  case 'Exploat':  case 'Ancillarine':  case 'Hydrattle':  case 'Aquadder':  case 'Cobrush':
						pokemon.setAbility('heartofcourage', pokemon, true);
						this.add('-activate', pokemon, 'ability: Heart of Courage');
						break;
					case 'Unown':
						pokemon.setAbility('unknownforce', pokemon, true);
						this.add('-activate', pokemon, 'ability: Unknown Force');
						break;
					case 'Gbonawola': case 'Gbonanene': case 'Gbonablanu': case 'Gbonazito':
						pokemon.setAbility('twistoffate', pokemon, true);
						this.add('-activate', pokemon, 'ability: Twist of Fate');
						break;
					case 'Squawkabilly': case 'Squawkabilly-Blue': case 'Squawkabilly-White': case 'Squawkabilly-Yellow':
						pokemon.setAbility('rockforever', pokemon, true);
						this.add('-activate', pokemon, 'ability: Rock Forever');
						break;
					case 'Chatot':
						pokemon.setAbility('unwaveringmelody', pokemon, true);
						this.add('-activate', pokemon, 'ability: Unwavering Melody');
						break;
					case 'Eevee': case 'Jolteon': case 'Vaporeon': case 'Flareon': case 'Espeon': case 'Umbreon': case 'Leafeon': case 'Glaceon': case 'Sylveon': case 'Mytheon': case 'Geareon':
						pokemon.setAbility('adaptability', pokemon, true);
						this.add('-activate', pokemon, 'ability: Adaptability');
						break;
					case 'Necrozma': case 'Necrozma-Dusk-Mane': case 'Necrozma-Dawn-Wings':
						pokemon.setAbility('neuroforce', pokemon, true);
						this.add('-activate', pokemon, 'ability: Neuroforce');
						break;
					case 'Dratini': case 'Dragonair': case 'Dragonite':
						pokemon.setAbility('moldbreaker', pokemon, true);
						this.add('-activate', pokemon, 'ability: Mold Breaker');
						break;
					case 'Deino': case 'Zweilous': case 'Hydreigon':
						pokemon.setAbility('trace', pokemon, true);
						this.add('-activate', pokemon, 'ability: Trace');
						break;
					case 'Elgyem': case 'Beheeyem':
						pokemon.setAbility('timewarp', pokemon, true);
						this.add('-activate', pokemon, 'ability: Time Warp');
						break;
					case 'Munna': case 'Musharna':
						pokemon.setAbility('comatose', pokemon, true);
						this.add('-activate', pokemon, 'ability: Comatose');
						break;
					case 'Aufant': case 'Aurrarajah':
						pokemon.setAbility('goodasgold', pokemon, true);
						this.add('-activate', pokemon, 'ability: Good as Gold');
						break;
				}
			}
		},
		onModifyMovePriority: 8,
		onModifyMove(move, pokemon) {
			if (move.category === "Status") return;
			if (['Fire', 'Water', 'Grass', 'Electric', 'Dark', 'Psychic', 'Dragon', 'Fairy'].includes(move.type)) {
				move.category = "Special";
			} else {
				move.category = "Physical";
			}
		},
		onBeforeSwitchOutPriority: -1,
		onBeforeSwitchOut(pokemon) {
			this.actions.useMove("Aurum Aura Used", pokemon, pokemon);
		},
	},
	frz: {
		name: 'frz',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'frz', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'frz');
			}
			if (target.species.name === 'Shaymin-Sky' && target.baseSpecies.baseSpecies === 'Shaymin') {
				target.formeChange('Shaymin', this.effect, true);
			}
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			if (this.randomChance(1, 10)) {
				pokemon.cureStatus();
				return;
			}
			this.damage(pokemon.baseMaxhp / 8);
		},
		onSourceModifyDamage(damage, source, target, move) {
			this.debug('Freeze extra damage');
			return this.chainModify([5325, 4096]);
		},
		onModifyMove(move, pokemon) {
			if (move.flags['defrost']) {
				this.add('-curestatus', pokemon, 'frz', '[from] move: ' + move);
				pokemon.clearStatus();
			}
		},
		onAfterMoveSecondary(target, source, move) {
			if (move.thawsTarget) {
				target.cureStatus();
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Fire' && move.category !== 'Status') {
				target.cureStatus();
			}
		},
	},
};
