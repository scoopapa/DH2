"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _utils = require('../.lib-dist/utils');
var _dexdata = require('./dex-data');

/**
 * Describes the acceptable target(s) of a move.
 * adjacentAlly - Only relevant to Doubles or Triples, the move only targets an ally of the user.
 * adjacentAllyOrSelf - The move can target the user or its ally.
 * adjacentFoe - The move can target a foe, but not (in Triples) a distant foe.
 * all - The move targets the field or all Pokémon at once.
 * allAdjacent - The move is a spread move that also hits the user's ally.
 * allAdjacentFoes - The move is a spread move.
 * allies - The move affects all active Pokémon on the user's team.
 * allySide - The move adds a side condition on the user's side.
 * allyTeam - The move affects all unfainted Pokémon on the user's team.
 * any - The move can hit any other active Pokémon, not just those adjacent.
 * foeSide - The move adds a side condition on the foe's side.
 * normal - The move can hit one adjacent Pokémon of your choice.
 * randomNormal - The move targets an adjacent foe at random.
 * scripted - The move targets the foe that damaged the user.
 * self - The move affects the user of the move.
 */
































































































































































































































































































 class DataMove extends _dexdata.BasicEffect  {
	
	/** Move type. */
	
	/** Move target. */
	
	/** Move base power. */
	
	/** Move base accuracy. True denotes a move that always hits. */
	
	/** Critical hit ratio. Defaults to 1. */
	
	/** Will this move always or never be a critical hit? */
	
	/** Can this move OHKO foes? */
	
	/**
	 * Base move type. This is the move type as specified by the games,
	 * tracked because it often differs from the real move type.
	 */
	
	/**
	 * Secondary effect. You usually don't want to access this
	 * directly; but through the secondaries array.
	 */
	
	/**
	 * Secondary effects. An array because there can be more than one
	 * (for instance, Fire Fang has both a burn and a flinch
	 * secondary).
	 */
	
	/**
	 * Move priority. Higher priorities go before lower priorities,
	 * trumping the Speed stat.
	 */
	
	/** Move category. */
	
	/**
	 * Category that changes which defense to use when calculating
	 * move damage.
	 */
	
	/** Uses the target's Atk/SpA as the attacking stat, instead of the user's. */
	
	/** Use the user's Def/SpD as the attacking stat, instead of Atk/SpA. */
	
	/** Whether or not this move ignores negative attack boosts. */
	
	/** Whether or not this move ignores positive defense boosts. */
	
	/** Whether or not this move ignores attack boosts. */
	
	/** Whether or not this move ignores defense boosts. */
	
	/**
	 * Whether or not this move ignores type immunities. Defaults to
	 * true for Status moves and false for Physical/Special moves.
	 */
	
	/** Base move PP. */
	
	/** Whether or not this move can receive PP boosts. */
	
	/** How many times does this move hit? */
	
	/** Is this move a Z-Move? */
	
	/* Z-Move fields */
	




	/** Is this move a Max move? */
	
	/** Max/G-Max move fields */
	


	
	/** Whether or not the user must switch after using this move. */
	
	/** Move target only used by Pressure. */
	
	/** Move target used if the user is not a Ghost type (for Curse). */
	
	/** Whether or not the move ignores abilities. */
	
	/**
	 * Move damage against the current target
	 * false = move will always fail with "But it failed!"
	 * null = move will always silently fail
	 * undefined = move does not deal fixed damage
	 */
	
	/** Whether or not this move hit multiple targets. */
	
	/** Modifier that affects damage when multiple targets are hit. */
	
	/**  Modifier that affects damage when this move is a critical hit. */
	
	/** Forces the move to get STAB even if the type doesn't match. */
	
	/** True if it can't be copied with Sketch. */
	
	/** STAB multiplier (can be modified by other effects) (default 1.5). */
	

	

	constructor(data, ...moreData) {
		super(data, ...moreData);
		data = this;

		this.fullname = `move: ${this.name}`;
		this.effectType = 'Move';
		this.type = _utils.Utils.getString(data.type);
		this.target = data.target;
		this.basePower = Number(data.basePower);
		this.accuracy = data.accuracy;
		this.critRatio = Number(data.critRatio) || 1;
		this.baseMoveType = _utils.Utils.getString(data.baseMoveType) || this.type;
		this.secondary = data.secondary || null;
		this.secondaries = data.secondaries || (this.secondary && [this.secondary]) || null;
		this.priority = Number(data.priority) || 0;
		this.category = data.category;
		this.defensiveCategory = data.defensiveCategory || undefined;
		this.useTargetOffensive = !!data.useTargetOffensive;
		this.useSourceDefensiveAsOffensive = !!data.useSourceDefensiveAsOffensive;
		this.ignoreNegativeOffensive = !!data.ignoreNegativeOffensive;
		this.ignorePositiveDefensive = !!data.ignorePositiveDefensive;
		this.ignoreOffensive = !!data.ignoreOffensive;
		this.ignoreDefensive = !!data.ignoreDefensive;
		this.ignoreImmunity = (data.ignoreImmunity !== undefined ? data.ignoreImmunity : this.category === 'Status');
		this.pp = Number(data.pp);
		this.noPPBoosts = !!data.noPPBoosts;
		this.isZ = data.isZ || false;
		this.isMax = data.isMax || false;
		this.flags = data.flags || {};
		this.selfSwitch = (typeof data.selfSwitch === 'string' ? (data.selfSwitch ) : data.selfSwitch) || undefined;
		this.pressureTarget = data.pressureTarget || '';
		this.nonGhostTarget = data.nonGhostTarget || '';
		this.ignoreAbility = data.ignoreAbility || false;
		this.damage = data.damage;
		this.spreadHit = data.spreadHit || false;
		this.forceSTAB = !!data.forceSTAB;
		this.noSketch = !!data.noSketch;
		this.stab = data.stab || undefined;
		this.volatileStatus = typeof data.volatileStatus === 'string' ? (data.volatileStatus ) : undefined;

		if (this.category !== 'Status' && !this.maxMove && this.id !== 'struggle') {
			this.maxMove = {basePower: 1};
			if (this.isMax || this.isZ) {
				// already initialized to 1
			} else if (!this.basePower) {
				this.maxMove.basePower = 100;
			} else if (['Fighting', 'Poison'].includes(this.type)) {
				if (this.basePower >= 150) {
					this.maxMove.basePower = 100;
				} else if (this.basePower >= 110) {
					this.maxMove.basePower = 95;
				} else if (this.basePower >= 75) {
					this.maxMove.basePower = 90;
				} else if (this.basePower >= 65) {
					this.maxMove.basePower = 85;
				} else if (this.basePower >= 55) {
					this.maxMove.basePower = 80;
				} else if (this.basePower >= 45) {
					this.maxMove.basePower = 75;
				} else {
					this.maxMove.basePower = 70;
				}
			} else {
				if (this.basePower >= 150) {
					this.maxMove.basePower = 150;
				} else if (this.basePower >= 110) {
					this.maxMove.basePower = 140;
				} else if (this.basePower >= 75) {
					this.maxMove.basePower = 130;
				} else if (this.basePower >= 65) {
					this.maxMove.basePower = 120;
				} else if (this.basePower >= 55) {
					this.maxMove.basePower = 110;
				} else if (this.basePower >= 45) {
					this.maxMove.basePower = 100;
				} else {
					this.maxMove.basePower = 90;
				}
			}
		}
		if (this.category !== 'Status' && !this.zMove && !this.isZ && !this.isMax && this.id !== 'struggle') {
			let basePower = this.basePower;
			this.zMove = {};
			if (Array.isArray(this.multihit)) basePower *= 3;
			if (!basePower) {
				this.zMove.basePower = 100;
			} else if (basePower >= 140) {
				this.zMove.basePower = 200;
			} else if (basePower >= 130) {
				this.zMove.basePower = 195;
			} else if (basePower >= 120) {
				this.zMove.basePower = 190;
			} else if (basePower >= 110) {
				this.zMove.basePower = 185;
			} else if (basePower >= 100) {
				this.zMove.basePower = 180;
			} else if (basePower >= 90) {
				this.zMove.basePower = 175;
			} else if (basePower >= 80) {
				this.zMove.basePower = 160;
			} else if (basePower >= 70) {
				this.zMove.basePower = 140;
			} else if (basePower >= 60) {
				this.zMove.basePower = 120;
			} else {
				this.zMove.basePower = 100;
			}
		}

		if (!this.gen) {
			if (this.num >= 743) {
				this.gen = 8;
			} else if (this.num >= 622) {
				this.gen = 7;
			} else if (this.num >= 560) {
				this.gen = 6;
			} else if (this.num >= 468) {
				this.gen = 5;
			} else if (this.num >= 355) {
				this.gen = 4;
			} else if (this.num >= 252) {
				this.gen = 3;
			} else if (this.num >= 166) {
				this.gen = 2;
			} else if (this.num >= 1) {
				this.gen = 1;
			}
		}
	}
} exports.DataMove = DataMove;
