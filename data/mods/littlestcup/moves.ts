export const Moves: {[k: string]: ModdedMoveData} = {
	terablast: {
		inherit: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]'); 
      if (move.type === 'Fire') {
        this.add('-anim', source, "Rock Polish", source);
        this.add('-anim', source, "Flamethrower", target);
      } else if (move.type === 'Grass') {
        this.add('-anim', source, "Rock Polish", source);
        this.add('-anim', source, "Energy Ball", target);
      } else if (move.type === 'Water') {
        this.add('-anim', source, "Rock Polish", source);
        this.add('-anim', source, "Hydro Pump", target);
      } else if (move.type === 'Bug') {
        this.add('-anim', source, "Rock Polish", source);
        this.add('-anim', source, "Pollen Puff", target);
      } else if (move.type === 'Dark') {
        this.add('-anim', source, "Rock Polish", source);
        this.add('-anim', source, "Fiery Wrath", target);
      } else if (move.type === 'Dragon') {
        this.add('-anim', source, "Rock Polish", source);
        this.add('-anim', source, "Dragon Pulse", target);
      } else if (move.type === 'Electric') {
        this.add('-anim', source, "Rock Polish", source);
        this.add('-anim', source, "Wildbolt Storm", target);
      } else if (move.type === 'Fairy') {
        this.add('-anim', source, "Rock Polish", source);
        this.add('-anim', source, "Springtide Storm", target);
      } else if (move.type === 'Flying') {
        this.add('-anim', source, "Rock Polish", source);
        this.add('-anim', source, "Aeroblast", target);
      } else if (move.type === 'Fighting') {
        this.add('-anim', source, "Rock Polish", source);
        this.add('-anim', source, "Focus Blast", target);
      } else if (move.type === 'Ghost') {
        this.add('-anim', source, "Rock Polish", source);
        this.add('-anim', source, "Poltergeist", target);
      } else if (move.type === 'Ground') {
        this.add('-anim', source, "Rock Polish", source);
        this.add('-anim', source, "Sandsear Storm", target);
      } else if (move.type === 'Ice') {
        this.add('-anim', source, "Rock Polish", source);
        this.add('-anim', source, "Sheer Cold", target);
      } else if (move.type === 'Poison') {
        this.add('-anim', source, "Rock Polish", source);
        this.add('-anim', source, "Gunk Shot", target);
      } else if (move.type === 'Psychic') {
        this.add('-anim', source, "Rock Polish", source);
        this.add('-anim', source, "Psycho Boost", target);
      } else if (move.type === 'Rock') {
        this.add('-anim', source, "Rock Polish", source);
        this.add('-anim', source, "Ancient Power", target);
      } else if (move.type === 'Steel') {
        this.add('-anim', source, "Rock Polish", source);
        this.add('-anim', source, "Steel Beam", target);
      } else if (move.type === 'Normal') {
        this.add('-anim', source, "Tera Blast", target);
      }
    },
	},
};
