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
};
