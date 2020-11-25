"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _dexdata = require('./dex-data');






































 class Species extends _dexdata.BasicEffect  {
	
	/**
	 * Species ID. Identical to ID. Note that this is the full ID, e.g.
	 * 'basculinbluestriped'. To get the base species ID, you need to
	 * manually read toID(species.baseSpecies).
	 */
	
	/**
	 * Name. Note that this is the full name with forme,
	 * e.g. 'Basculin-Blue-Striped'. To get the name without forme, see
	 * `species.baseSpecies`.
	 */
	
	/**
	 * Base species. Species, but without the forme name.
	 *
	 * DO NOT ASSUME A POKEMON CAN TRANSFORM FROM `baseSpecies` TO
	 * `species`. USE `changesFrom` FOR THAT.
	 */
	
	/**
	 * Forme name. If the forme exists,
	 * `species.name === species.baseSpecies + '-' + species.forme`
	 *
	 * The games make a distinction between Forme (foorumu) (legendary Pokémon)
	 * and Form (sugata) (non-legendary Pokémon). PS does not use the same
	 * distinction – they're all "Forme" to PS, reflecting current community
	 * use of the term.
	 *
	 * This property only tracks non-cosmetic formes, and will be `''` for
	 * cosmetic formes.
	 */
	
	/**
	 * Base forme name (e.g. 'Altered' for Giratina).
	 */
	
	/**
	 * Other forms. List of names of cosmetic forms. These should have
	 * `aliases.js` aliases to this entry, but not have their own
	 * entry in `pokedex.js`.
	 */
	
	/**
	 * Other formes. List of names of formes, appears only on the base
	 * forme. Unlike forms, these have their own entry in `pokedex.js`.
	 */
	
	/**
	 * List of forme speciesNames in the order they appear in the game data -
	 * the union of baseSpecies, otherFormes and cosmeticFormes. Appears only on
	 * the base species forme.
	 *
	 * A species's alternate formeindex may change from generation to generation -
	 * the forme with index N in Gen A is not guaranteed to be the same forme as the
	 * forme with index in Gen B.
	 *
	 * Gigantamaxes are not considered formes by the game (see data/FORMES.md - PS
	 * labels them as such for convenience) - Gigantamax "formes" are instead included at
	 * the end of the formeOrder list so as not to interfere with the correct index numbers.
	 */
	
	/**
	 * Sprite ID. Basically the same as ID, but with a dash between
	 * species and forme.
	 */
	
	/** Abilities. */
	
	/** Types. */
	
	/** Added type (used in OMs). */
	
	/** Pre-evolution. '' if nothing evolves into this Pokemon. */
	
	/** Evolutions. Array because many Pokemon have multiple evolutions. */
	
	
	/** Evolution condition. falsy if doesn't evolve. */
	
	/** Evolution item. falsy if doesn't evolve. */
	
	/** Evolution move. falsy if doesn't evolve. */
	
	/** Evolution level. falsy if doesn't evolve. */
	
	/** Is NFE? True if this Pokemon can evolve (Mega evolution doesn't count). */
	
	/** Egg groups. */
	
	/** True if this species can hatch from an Egg. */
	
	/**
	 * Gender. M = always male, F = always female, N = always
	 * genderless, '' = sometimes male sometimes female.
	 */
	
	/** Gender ratio. Should add up to 1 unless genderless. */
	
	/** Base stats. */
	
	/** Max HP. Overrides usual HP calculations (for Shedinja). */
	
	/** A Pokemon's Base Stat Total */
	
	/** Weight (in kg). Not valid for OMs; use weighthg / 10 instead. */
	
	/** Weight (in integer multiples of 0.1kg). */
	
	/** Height (in m). */
	
	/** Color. */
	
	/** Does this Pokemon have an unreleased hidden ability? */
	
	/**
	 * Is it only possible to get the hidden ability on a male pokemon?
	 * This is mainly relevant to Gen 5.
	 */
	
	/** True if a pokemon is mega. */
	
	/** True if a pokemon is primal. */
	
	/** Name of its Gigantamax move, if a pokemon is capable of gigantamaxing. */
	
	/** If this Pokemon can gigantamax, is its gigantamax released? */
	
	/** True if a Pokemon species is incapable of dynamaxing */
	
	/** What it transforms from, if a pokemon is a forme that is only accessible in battle. */
	
	/** Required item. Do not use this directly; see requiredItems. */
	
	/** Required move. Move required to use this forme in-battle. */
	
	/** Required ability. Ability required to use this forme in-battle. */
	
	/**
	 * Required items. Items required to be in this forme, e.g. a mega
	 * stone, or Griseous Orb. Array because Arceus formes can hold
	 * either a Plate or a Z-Crystal.
	 */
	

	/**
	 * Formes that can transform into this Pokemon, to inherit learnsets
	 * from. (Like `prevo`, but for transformations that aren't
	 * technically evolution. Includes in-battle transformations like
	 * Zen Mode and out-of-battle transformations like Rotom.)
	 *
	 * Not filled out for megas/primals - fall back to baseSpecies
	 * for in-battle formes.
	 */
	

	/**
	 * Singles Tier. The Pokemon's location in the Smogon tier system.
	 * Do not use for LC bans (usage tier will override LC Uber).
	 */
	
	/**
	 * Doubles Tier. The Pokemon's location in the Smogon doubles tier system.
	 * Do not use for LC bans (usage tier will override LC Uber).
	 */
	
	
	
	
	
	
	
	

	constructor(data, ...moreData) {
		super(data, ...moreData);
		data = this;

		this.fullname = `pokemon: ${data.name}`;
		this.effectType = 'Pokemon';
		this.id = data.id ;
		this.name = data.name;
		this.baseSpecies = data.baseSpecies || this.name;
		this.forme = data.forme || '';
		this.baseForme = data.baseForme || '';
		this.cosmeticFormes = data.cosmeticFormes || undefined;
		this.otherFormes = data.otherFormes || undefined;
		this.formeOrder = data.formeOrder || undefined;
		this.spriteid = data.spriteid ||
			(_dexdata.toID.call(void 0, this.baseSpecies) + (this.baseSpecies !== this.name ? `-${_dexdata.toID.call(void 0, this.forme)}` : ''));
		this.abilities = data.abilities || {0: ""};
		this.types = data.types || ['???'];
		this.addedType = data.addedType || undefined;
		this.prevo = data.prevo || '';
		this.tier = data.tier || '';
		this.doublesTier = data.doublesTier || '';
		this.evos = data.evos || [];
		this.evoType = data.evoType || undefined;
		this.evoMove = data.evoMove || undefined;
		this.evoLevel = data.evoLevel || undefined;
		this.nfe = data.nfe || false;
		this.eggGroups = data.eggGroups || [];
		this.canHatch = data.canHatch || false;
		this.gender = data.gender || '';
		this.genderRatio = data.genderRatio || (this.gender === 'M' ? {M: 1, F: 0} :
			this.gender === 'F' ? {M: 0, F: 1} :
			this.gender === 'N' ? {M: 0, F: 0} :
			{M: 0.5, F: 0.5});
		this.requiredItem = data.requiredItem || undefined;
		this.requiredItems = this.requiredItems || (this.requiredItem ? [this.requiredItem] : undefined);
		this.baseStats = data.baseStats || {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0};
		this.bst = this.baseStats.hp + this.baseStats.atk + this.baseStats.def +
			this.baseStats.spa + this.baseStats.spd + this.baseStats.spe;
		this.weightkg = data.weightkg || 0;
		this.weighthg = this.weightkg * 10;
		this.heightm = data.heightm || 0;
		this.color = data.color || '';
		this.unreleasedHidden = data.unreleasedHidden || false;
		this.maleOnlyHidden = !!data.maleOnlyHidden;
		this.maxHP = data.maxHP || undefined;
		this.isMega = !!(this.forme && ['Mega', 'Mega-X', 'Mega-Y'].includes(this.forme)) || undefined;
		this.canGigantamax = data.canGigantamax || undefined;
		this.gmaxUnreleased = !!data.gmaxUnreleased;
		this.cannotDynamax = !!data.cannotDynamax;
		this.battleOnly = data.battleOnly || (this.isMega ? this.baseSpecies : undefined);
		this.changesFrom = data.changesFrom ||
			(this.battleOnly !== this.baseSpecies ? this.battleOnly : this.baseSpecies);
		if (Array.isArray(data.changesFrom)) this.changesFrom = data.changesFrom[0];

		if (!this.gen && this.num >= 1) {
			if (this.num >= 810 || ['Gmax', 'Galar', 'Galar-Zen'].includes(this.forme)) {
				this.gen = 8;
			} else if (this.num >= 722 || this.forme.startsWith('Alola') || this.forme === 'Starter') {
				this.gen = 7;
			} else if (this.forme === 'Primal') {
				this.gen = 6;
				this.isPrimal = true;
				this.battleOnly = this.baseSpecies;
			} else if (this.num >= 650 || this.isMega) {
				this.gen = 6;
			} else if (this.num >= 494) {
				this.gen = 5;
			} else if (this.num >= 387) {
				this.gen = 4;
			} else if (this.num >= 252) {
				this.gen = 3;
			} else if (this.num >= 152) {
				this.gen = 2;
			} else {
				this.gen = 1;
			}
		}
	}
} exports.Species = Species;
