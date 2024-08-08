export const Conditions: {[k: string]: ConditionData} = {
	// Max Mode
	dynamax: {
		name: 'Dynamax',
		noCopy: true,
		onStart(pokemon) {
			this.effectState.turns = 0;
			pokemon.side.addSideCondition('dynamaxused', pokemon);
			this.add('-message', `This Pokemon has now entered Max Mode!`);
			this.add('-message', `In Max Mode, all of this Pokemon's stats (except HP & Speed) are increased by 1.5x!`);
			this.add('-message', `Additionally, this Pokemon is now immune to the negative effects of status conditions and can't be forced out (unless it's holding an Eject Button)!`);
			this.add('-message', `Max Mode will last for the next 3 turns and can't be entered again!`);
			this.add('-start', pokemon, 'Dynamax', pokemon.gigantamax ? 'Gmax' : '');
		},
		onBeforeSwitchOutPriority: -1,
		onBeforeSwitchOut(pokemon) {
			pokemon.removeVolatile('dynamax');
			pokemon.side.removeSideCondition('maxmeter7');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.id === 'behemothbash' || move.id === 'behemothblade' || move.id === 'dynamaxcannon') {
				return this.chainModify(2);
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			this.debug('Dynamax atk boost');
			return this.chainModify(1.5);
		},
		onModifyDefPriority: 6,
		onModifyDef(def, pokemon) {
			this.debug('Dynamax def boost');
			return this.chainModify(1.5);
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			this.debug('Dynamax spa boost');
			return this.chainModify(1.5);
		},
		onModifySpDPriority: 6,
		onModifySpD(spd, pokemon) {
			this.debug('Dynamax spd boost');
			return this.chainModify(1.5);
		},
		onDragOutPriority: 2,
		onDragOut(pokemon) {
			this.add('-block', pokemon, 'Dynamax');
			return null;
		},
		onResidualPriority: -100,
		onResidual() {
			this.effectState.turns++;
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, 'Dynamax');
			pokemon.side.removeSideCondition('maxmeter7');
		},
	},

	// Statuses (incl. new Freeze)
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
