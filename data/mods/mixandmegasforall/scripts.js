'use strict';

/**@type {ModdedBattleScriptsData} */
const BattleScripts = {
	init() {
		for (const id in this.data.Items) {
			if (!this.data.Items[id].megaStone) continue;
			this.modData('Items', id).onTakeItem = false;
		}
	},
	canMegaEvo(pokemon) {
		if (pokemon.template.isMega || pokemon.template.isPrimal) return null;

		const item = pokemon.getItem();
		if (item.megaStone) {
			if (item.megaStone === pokemon.species) return null;
			return item.megaStone;
		} else if (pokemon.baseMoves.includes('dragonascent')) {
			return 'Rayquaza-Mega';
		} else {
			return null;
		}
	},
	runMegaEvo(pokemon) {
		if (pokemon.template.isMega || pokemon.template.isPrimal) return false;

		const isUltraBurst = !pokemon.canMegaEvo;
		/**@type {Template} */
		// @ts-ignore
		const template = this.getMixedTemplate(pokemon.originalSpecies, pokemon.canMegaEvo || pokemon.canUltraBurst);
		const side = pokemon.side;

		// Pokémon affected by Sky Drop cannot Mega Evolve. Enforce it here for now.
		for (const foeActive of side.foe.active) {
			if (foeActive.volatiles['skydrop'] && foeActive.volatiles['skydrop'].source === pokemon) {
				return false;
			}
		}

		// Do we have a proper sprite for it?
		// @ts-ignore
		if (this.getTemplate(pokemon.canMegaEvo).baseSpecies === pokemon.originalSpecies || isUltraBurst) {
			pokemon.formeChange(template, pokemon.getItem(), true);
		} else {
			const oTemplate = this.getTemplate(pokemon.originalSpecies);
			const oMegaTemplate = this.getTemplate(template.originalMega);
			pokemon.formeChange(template, pokemon.getItem(), true);
			this.add('-start', pokemon, oMegaTemplate.requiredItem || oMegaTemplate.requiredMove, '[silent]');
			if (oTemplate.types.length !== pokemon.template.types.length || oTemplate.types[1] !== pokemon.template.types[1]) {
				this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
			}
		}

		pokemon.canMegaEvo = null;
		if (isUltraBurst) pokemon.canUltraBurst = null;
		return true;
	},
	getMixedTemplate(originalSpecies, megaSpecies) {
		const originalTemplate = this.getTemplate(originalSpecies);
		const megaTemplate = this.getTemplate(megaSpecies);
		if (originalTemplate.baseSpecies === megaTemplate.baseSpecies) return megaTemplate;
		// @ts-ignore
		const deltas = this.getMegaDeltas(megaTemplate);
		// @ts-ignore
		const template = this.doGetMixedTemplate(originalTemplate, deltas);
		return template;
	},
	getMegaDeltas(megaTemplate) {
		const baseTemplate = this.getTemplate(megaTemplate.baseSpecies);
		const deltas = {
			ability: megaTemplate.abilities['0'],
			baseStats: {},
			weightkg: megaTemplate.weightkg - baseTemplate.weightkg,
			originalMega: megaTemplate.species,
			requiredItem: megaTemplate.requiredItem,
		};
		for (const statId in megaTemplate.baseStats) {
			// @ts-ignore
			deltas.baseStats[statId] = megaTemplate.baseStats[statId] - baseTemplate.baseStats[statId];
		}
		if (megaTemplate.types.length > baseTemplate.types.length) {
			deltas.type = megaTemplate.types[1];
		} else if (megaTemplate.types.length < baseTemplate.types.length) {
			deltas.type = baseTemplate.types[0];
		} else if (megaTemplate.types[1] !== baseTemplate.types[1]) {
			deltas.type = megaTemplate.types[1];
		}
		if (megaTemplate.isMega) deltas.isMega = true;
		if (megaTemplate.isPrimal) deltas.isPrimal = true;
		return deltas;
	},
	doGetMixedTemplate(template, deltas) {
		if (!deltas) throw new TypeError("Must specify deltas!");
		if (!template || typeof template === 'string') template = this.getTemplate(template);
		template = Object.assign({}, template);
		template.abilities = {'0': deltas.ability};
		if (template.types[0] === deltas.type) {
			template.types = [deltas.type];
		} else if (deltas.type) {
			template.types = [template.types[0], deltas.type];
		}
		const baseStats = template.baseStats;
		// @ts-ignore
		template.baseStats = {};
		for (const statName in baseStats) {
			// @ts-ignore
			template.baseStats[statName] = this.clampIntRange(baseStats[statName] + deltas.baseStats[statName], 1, 255);
		}
		template.weightkg = Math.max(0.1, template.weightkg + deltas.weightkg);
		template.originalMega = deltas.originalMega;
		template.requiredItem = deltas.requiredItem;
		if (deltas.isMega) template.isMega = true;
		if (deltas.isPrimal) template.isPrimal = true;
		return template;
	},
};

exports.BattleScripts = BattleScripts;
