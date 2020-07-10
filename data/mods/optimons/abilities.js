'use strict';
exports.BattleAbilities = {
	"gulpmissile": {
		desc: "If this Pokemon is a Cramorant, it changes forme when it hits a target with Surf or uses the first turn of Dive successfully. It becomes Gulping Form with an Arrokuda in its mouth if it has more than 1/2 of its maximum HP remaining, or Gorging Form with a Pikachu in its mouth if it has 1/2 or less of its maximum HP remaining. If Cramorant gets hit in Gulping or Gorging Form, it spits the Arrokuda or Pikachu at its attacker, even if it has no HP remaining. The projectile deals damage equal to 1/4 of the target's maximum HP, rounded down; this damage is blocked by the Magic Guard Ability but not by a substitute. An Arrokuda also lowers the target's Defense by 1 stage, and a Pikachu paralyzes the target. Cramorant will return to normal if it spits out a projectile, switches out, or Dynamaxes.",
		shortDesc: "When hit after Surf/Dive, attacker takes 1/4 max HP and -1 Defense or paralysis.",
		onDamagingHit(damage, target, source, move) {
			if (move.effectType === 'Move' && ['cramorantgulping', 'cramorantgorging'].includes(target.template.speciesid) && !target.transformed && !target.isSemiInvulnerable()) {
				this.damage(source.baseMaxhp / 4, source, target);
				this.boost({def: -1}, source, target, null, true);
				target.formeChange('cramorant', move);
			}
		},
		// The Dive part of this mechanic is implemented in Dive's `onTryMove` in moves.js
		onAnyDamage(damage, target, source, effect) {
			if (effect && effect.type === 'Water' && source.hasAbility('gulpmissile') && source.template.species === 'Cramorant' && !source.transformed) {
				const forme = source.hp <= source.maxhp / 2 ? 'cramorantgorging' : 'cramorantgulping';
				source.formeChange(forme, effect);
			}
		},
		onAnyAfterSubDamage(damage, target, source, effect) {
			if (effect && effect.type === 'Water' && source.hasAbility('gulpmissile') && source.template.species === 'Cramorant' && !source.transformed) {
				const forme = source.hp <= source.maxhp / 2 ? 'cramorantgorging' : 'cramorantgulping';
				source.formeChange(forme, effect);
			}
		},
		id: "gulpmissile",
		name: "Gulp Missile",
		rating: 1.5,
		num: 241,
	},
	"steamengine": {
		shortDesc: "This Pokemon's Speed is raised by 6 stages after it is damaged by Fire/Water moves.",
		onDamagingHit(damage, target, source, effect) {
			if (effect && ['Fire'].includes(effect.type)) {
				this.boost({spe: 6});
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				move.accuracy = true;
				this.add('-immune', target, '[from] ability: Steam Engine');
				this.boost({spe: 6});
				return null;
			}
		},
		id: "steamengine",
		name: "Steam Engine",
		rating: 1,
		num: 243,
	},
	"pastelveil": {
		shortDesc: "Protects the Pokémon and its ally Pokémon from being poisoned.",
		onAllySwitchIn(pokemon) {
			if (['psn', 'tox'].includes(pokemon.status)) {
				this.add('-activate', this.effectData.target, 'ability: Pastel Veil');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (!['psn', 'tox'].includes(status.id)) return;
			if (!effect || !effect.status) return false;
			this.add('-immune', target, '[from] ability: Pastel Veil');
			return false;
		},
		onAllySetStatus(status, target, source, effect) {
			if (!['psn', 'tox'].includes(status.id)) return;
			if (!effect || !effect.status) return false;
			this.add('-block', target, 'ability: Pastel Veil', '[of] ' + this.effectData.target);
			return false;
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Poison') {
				move.accuracy = true;
				this.add('-immune', target, '[from] ability: Pastel Veil');
				return null;
			}
		},
		onAllyTryHit(target, source, move) {
			if (target !== source && move.type === 'Poison') {
				move.accuracy = true;
				this.add('-immune', target, '[from] ability: Pastel Veil');
				return null;
			}
		},
		id: "pastelveil",
		name: "Pastel Veil",
		rating: 2,
		num: 257,
	},
};
