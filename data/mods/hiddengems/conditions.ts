export const Conditions: {[k: string]: ConditionData} = {
// Hidden Gem activation template
/*
	psychicgem: {
		name: 'psychicgem',
		duration: 1,
		affectsFainted: true,
		onAfterMoveSecondarySelf(source, target, move) {
			if (!move || !target) return;
			this.add('-anim', source, "Cosmic Power", source);
	      this.add('-message', `${source.name}'s Hidden Gem activated!`);
	      const targetType = source.types[1];
	      this.add('-start', source, 'typeadd', 'Psychic', '[from] item: Psychic Gem');
	      source.setAbility('goodasgold', source, true);
	      this.add('-activate', source, 'ability: Good as Gold');
	      this.boost({spa: 1, spd: 1, spe: 1}, source);
		},
	},
*/
	normalgem: {
		name: 'normalgem',
		duration: 1,
		affectsFainted: true,
		onAfterMoveSecondarySelf(source, target, move) {
			if (!move || !target) return;
			this.add('-anim', source, "Cosmic Power", source);
			this.add('-message', `${source.name}'s Hidden Gem activated!`);
			source.setAbility('libero', source, true);
      	this.add('-activate', source, 'ability: Libero');
      	this.boost({atk: 1, spe: 2}, source);
		},
	},
	buggem: {
		name: 'buggem',
		duration: 1,
		affectsFainted: true,
		onAfterMoveSecondarySelf(source, target, move) {
			if (!move || !target) return;
			this.add('-anim', source, "Cosmic Power", source);
			this.add('-message', `${source.name}'s Hidden Gem activated!`);
			source.setAbility('tintedlens', source, true);
      	this.add('-activate', source, 'ability: Tinted Lens');
      	this.boost({spa: 1, accuracy: 1, spe: 1}, source);
		},
	},
	fightinggem: {
		name: 'fightinggem',
		duration: 1,
		affectsFainted: true,
		onAfterMoveSecondarySelf(source, target, move) {
			if (!move || !target) return;
			this.add('-anim', source, "Cosmic Power", source);
	      this.add('-message', `${source.name}'s Hidden Gem activated!`);
	      source.setAbility('noguard', source, true);
	      this.add('-activate', source, 'ability: No Guard');
	      this.boost({spa: 1, spd: 1}, source);
		},
	},
	watergem: {
		name: 'watergem',
		duration: 1,
		affectsFainted: true,
		onAfterMoveSecondarySelf(source, target, move) {
			if (!move || !target) return;
			if (this.effectState.waterGem) return;
			this.effectState.waterGem = true;
			this.add('-anim', source, "Cosmic Power", source);
	      this.add('-message', `${source.name}'s Hidden Gem activated!`);
	      source.setAbility('unaware', source, true);
	      this.add('-activate', source, 'ability: Unaware');
	      this.boost({def: 1, spa: 1}, source);
			this.actions.useMove("Hidden Gem Water", source, source);
		},
	},
	grassgem: {
		name: 'grassgem',
		duration: 1,
		affectsFainted: true,
		onAfterMoveSecondarySelf(source, target, move) {
			if (!move || !target) return;
			this.add('-anim', source, "Cosmic Power", source);
	      this.add('-message', `${source.name}'s Hidden Gem activated!`);
	      source.setAbility('electricsurge', source, true);
	      this.add('-activate', source, 'ability: Electric Surge');
      	this.boost({spd: 1, accuracy: 1, spe: 1}, source);
		},
	},
	firegem: {
		name: 'firegem',
		duration: 1,
		affectsFainted: true,
		onAfterMoveSecondarySelf(source, target, move) {
			if (!move || !target) return;
			this.add('-anim', source, "Cosmic Power", source);
	      this.add('-message', `${source.name}'s Hidden Gem activated!`);
	      source.setAbility('amorphous', source, true);
	      this.add('-activate', source, 'ability: Amorphous');
      	this.boost({def: 1, spd: 1}, source);
		},
	},
	flyinggem: {
		name: 'flyinggem',
		duration: 1,
		affectsFainted: true,
		onAfterMoveSecondarySelf(source, target, move) {
			if (!move || !target) return;
			if (this.effectState.flyingGem) return;
			this.effectState.flyingGem = true;
			this.add('-anim', source, "Cosmic Power", source);
	      this.add('-message', `${source.name}'s Hidden Gem activated!`);
	      source.setAbility('deltastream', source, true);
	      this.add('-activate', source, 'ability: Delta Stream');
	      this.boost({def: 1, spe: 1}, source);
			this.actions.useMove("Hidden Gem Flying", source, source);
		},
	},
	electricgem: {
		name: 'electricgem',
		duration: 1,
		affectsFainted: true,
		onAfterMoveSecondarySelf(source, target, move) {
			if (!move || !target) return;
			this.add('-anim', source, "Cosmic Power", source);
	      this.add('-message', `${source.name}'s Hidden Gem activated!`);
	      source.setAbility('triage', source, true);
	      this.add('-activate', source, 'ability: Triage');
      	this.boost({def: 1, spa: 1, spd: 1}, source);
		},
	},
	icegem: {
		name: 'icegem',
		duration: 1,
		affectsFainted: true,
		onAfterMoveSecondarySelf(source, target, move) {
			if (!move || !target) return;
			this.add('-anim', source, "Cosmic Power", source);
	      this.add('-message', `${source.name}'s Hidden Gem activated!`);
	      source.setAbility('inversion', source, true);
	      this.add('-activate', source, 'ability: Inversion');
      	this.boost({atk: 1, spd: 1, accuracy: 1}, source);
		},
	},
	poisongem: {
		name: 'poisongem',
		duration: 1,
		affectsFainted: true,
		onAfterMoveSecondarySelf(source, target, move) {
			if (!move || !target) return;
			if (this.effectState.poisonGem) return;
			this.effectState.poisonGem = true;
			this.add('-anim', source, "Cosmic Power", source);
	      this.add('-message', `${source.name}'s Hidden Gem activated!`);
	      source.setAbility('magicbounce', source, true);
	      this.add('-activate', source, 'ability: Magic Bounce');
      	this.boost({def: 1, spd: 1, accuracy: 1}, source);
			this.actions.useMove("Hidden Gem Poison", source, source);
		},
	},
	groundgem: {
		name: 'groundgem',
		duration: 1,
		affectsFainted: true,
		onAfterMoveSecondarySelf(source, target, move) {
			if (!move || !target) return;
			if (this.effectState.groundGem) return;
			this.effectState.groundGem = true;
			this.add('-anim', source, "Cosmic Power", source);
	      this.add('-message', `${source.name}'s Hidden Gem activated!`);
	      source.setAbility('gravityfield', source, true);
	      this.add('-activate', source, 'ability: Gravity Field');
      	this.boost({atk: 1, spe: 1}, source);
			this.actions.useMove("Hidden Gem Ground", source, source);
		},
	},
	rockgem: {
		name: 'rockgem',
		duration: 1,
		affectsFainted: true,
		onAfterMoveSecondarySelf(source, target, move) {
			if (!move || !target) return;
			if (this.effectState.rockGem) return;
			this.effectState.rockGem = true;
			this.add('-anim', source, "Cosmic Power", source);
	      this.add('-message', `${source.name}'s Hidden Gem activated!`);
	      source.setAbility('sandrush', source, true);
	      this.add('-activate', source, 'ability: Sand Rush');
      	this.boost({atk: 2, spd: 1}, source);
			this.actions.useMove("Hidden Gem Rock", source, source);
		},
	},
	psychicgem: {
		name: 'psychicgem',
		duration: 1,
		affectsFainted: true,
		onAfterMoveSecondarySelf(source, target, move) {
			if (!move || !target) return;
			if (this.effectState.psychicGem) return;
			this.effectState.psychicGem = true;
			this.add('-anim', source, "Cosmic Power", source);
	      this.add('-message', `${source.name}'s Hidden Gem activated!`);
	      source.setAbility('neuroforce', source, true);
	      this.add('-activate', source, 'ability: Neuroforce');
      	this.boost({spe: 2}, source);
			this.actions.useMove("Hidden Gem Dragon", source, source);
		},
	},
	ghostgem: {
		name: 'ghostgem',
		duration: 1,
		affectsFainted: true,
		onAfterMoveSecondarySelf(source, target, move) {
			if (!move || !target) return;
			if (this.effectState.ghostGem) return;
			this.effectState.ghostGem = true;
			this.add('-anim', source, "Cosmic Power", source);
	      this.add('-message', `${source.name}'s Hidden Gem activated!`);
	      source.setAbility('obstinacy', source, true);
	      this.add('-activate', source, 'ability: Obstinacy');
      	this.boost({atk: 1, def: 1}, source);
			this.actions.useMove("Hidden Gem Ghost", source, source);
		},
	},
	dragongem: {
		name: 'dragongem',
		duration: 1,
		affectsFainted: true,
		onAfterMoveSecondarySelf(source, target, move) {
			if (!move || !target) return;
			if (this.effectState.dragonGem) return;
			this.effectState.dragonGem = true;
			this.add('-anim', source, "Cosmic Power", source);
	      this.add('-message', `${source.name}'s Hidden Gem activated!`);
	      source.setAbility('intimidate', source, true);
      	this.boost({atk: 1, spd: 1}, source);
			this.actions.useMove("Hidden Gem Dragon", source, source);
		},
	},
};
