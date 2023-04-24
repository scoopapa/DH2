export const Items: {[itemid: string]: ModdedItemData} = {
	cursedportrait: {
		name: "Cursed Portrait",
		spritenum: 385,
		fling: {
			basePower: 70,
		},
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (!target.hp) {
				if (target.hasType('Ghost')) source.addVolatile('curse');
				// if (target.species.baseSpecies === 'Gardevoir') target.formeChange('Possessevoir', this.effect, true);
				// this will look like Primal Reversion so I would need to change it
			}
		},
		num: -1,
		gen: 8,
		desc: "A Ghost-type holder curses the attacker when it faints.",
	},
	drampaniteaged: {
		name: "Drampanite-Aged",
		spritenum: 586,
		megaStone: "Drampa-Mega-Aged",
		megaEvolves: "Drampa",
		itemUser: ["Drampa"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2,
		gen: 8,
		desc: "If held by a Drampa, this item allows it to Mega Evolve in battle.",
	},
	drampaniteuntimely: {
		name: "Drampanite-Untimely",
		spritenum: 586,
		megaStone: "Drampa-Mega-Untimely",
		megaEvolves: "Drampa",
		itemUser: ["Drampa"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -3,
		gen: 8,
		desc: "If held by a Drampa, this item allows it to Mega Evolve in battle.",
	},
	hatofdisguise: {
		name: "Hat of Disguise",
		spritenum: 385,
		fling: {
			basePower: 70,
		},
		onBeforeSwitchIn(pokemon) {
			if (pokemon.ability === 'illusion') return;
			pokemon.illusion = null;
			let i;
			for (i = pokemon.side.pokemon.length - 1; i > pokemon.position; i--) {
				if (!pokemon.side.pokemon[i]) continue;
				if (!pokemon.side.pokemon[i].fainted) break;
			}
			if (!pokemon.side.pokemon[i]) return;
			if (pokemon === pokemon.side.pokemon[i]) return;
			pokemon.illusion = pokemon.side.pokemon[i];
			pokemon.setAbility('illusion');
		},
		// some of effect hard-coded into Illusion
		num: -4,
		gen: 8,
		desc: "The holder's Ability is Illusion. Consumed when the Illusion is broken.",
	},
	bloonketcostume: {
		name: "Bloonket Costume",
		spritenum: 385,
		fling: {
			basePower: 10,
		},
		/*
		onStart(pokemon) {
			if (!pokemon.illusion) {
				const details = pokemon.species.name + (pokemon.level === 100 ? '' : ', L' + pokemon.level) +
					(pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
				this.add('replace', pokemon, details);
			}
		},
		*/
		// some of effect hard-coded into Illusion and some into Team Preview rule
		desc: "At team preview, the holder is disguised as Bloonket!",
		num: -5,
		gen: 8,
	},
	ghostsheet: {
		name: "Ghost Sheet",
		spritenum: 385,
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			if (pokemon.getTypes().join() !== 'Ghost' && pokemon.setType('Ghost')) {
				this.add('-start', pokemon, 'typechange', 'Ghost');
			}
		},
		onEnd(pokemon) {
			if (pokemon.getTypes().join() !== pokemon.baseSpecies.types.join() && pokemon.setType(pokemon.baseSpecies.types)) {
				//this.add('-end', pokemon, 'typechange', '[silent]');
				this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
			}
		},
		onTakeItem(item, pokemon, source) {
			if (pokemon.getTypes().join() !== pokemon.baseSpecies.types.join() && pokemon.setType(pokemon.baseSpecies.types)) {
				//this.add('-end', pokemon, 'typechange', '[silent]');
				this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
			}
			return true;
		},
		desc: "The holder's type is pure Ghost.",
		num: -6,
		gen: 8,
	},
	trickortreatbag: {
		name: "Trick-or-Treat Bag",
		spritenum: 385,
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			if (pokemon.hp === pokemon.maxhp) return;
			let activated = 0;
			this.add('-message', `${pokemon.illusion ? pokemon.illusion.name : pokemon.name}: Boo!`);
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted) continue;
				let scaredThisGuy = false;
				for (const moveSlot of ((pokemon.illusion && pokemon.illusion.moveSlots) ? pokemon.illusion.moveSlots : pokemon.moveSlots)) {
					if (scaredThisGuy === true) continue;
					const move = this.dex.getMove(moveSlot.move);
					if (move.category === 'Status') continue;
					const moveType = move.id === 'hiddenpower' ? target.hpType : move.type;
					if (
						this.dex.getImmunity(moveType, target) && this.dex.getEffectiveness(moveType, target) > 0
					) {
						scaredThisGuy = true;
						continue;
					}
				}
				if (scaredThisGuy === true) {
					this.add('-message', `${target.illusion ? target.illusion.name : target.name}: Eeeek!`);
					activated++;
				}
			}
			this.add('-message', `...`);
			if (activated) {
				this.add('-message', `${pokemon.illusion ? pokemon.illusion.name : pokemon.name} got some candy!`);
				this.heal(pokemon.baseMaxhp * 0.25 * activated);
			} else {
				this.add('-message', `It wasn't that scary, so nothing happened.`);
			}
		},
		desc: "On entry, the holder scares the target to restore HP.",
		num: -7,
		gen: 8,
	},
	nightgoggles: {
		name: "Night Goggles",
		spritenum: 604,
		fling: {
			basePower: 80,
		},
		onStart(pokemon) {
			if (pokemon.volatiles['choicelock']) {
				this.debug('removing choicelock: ' + pokemon.volatiles['choicelock']);
			}
			pokemon.removeVolatile('choicelock');
		},
		onModifyMove(move, pokemon) {
			pokemon.addVolatile('choicelock');
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ghost' && move.category !== 'Status') {
				this.add('-immune', target, '[from] item: Night Goggles');
				return null;
			}
		},
		isChoice: true,
		desc: "The holder is immune to Ghost but can only use the first move it selects.",
		num: -8,
		gen: 8,
	},
	eucalyptuspatch: {
		name: "Eucalyptus Patch",
		spritenum: 292,
		fling: {
			basePower: 10,
		},
		onModifyMove(move) {
			if (!move || !move.flags['contact'] || move.target === 'self' || move.type !== 'Grass') return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 100,
				volatileStatus: 'yawn',
			});
		},
		onAnyHit(target, source, move) {
			if (source && source !== target && source === this.effectData.target && move && move.flags['contact'] && move.type === 'Grass' && source.useItem()) {
				target.addVolatile('yawn');
			}
		},
		desc: "Inflicts drowsiness when using a Grass-type contact move (consumed).",
		num: -9,
		gen: 8,
	},
	crocs: {
		name: "Crocs",
		spritenum: 715,
		fling: {
			basePower: 10,
		},
		desc: "Makes the holder twice as vulnerable to hazards.",
		num: -10,
		gen: 8,
		// implemented in moves.ts
	},
	swapcauldron: {
		name: "Swap Cauldron",
		spritenum: 715,
		fling: {
			basePower: 80,
		},
		onSwitchIn(pokemon) {
			if (!this.field.addPseudoWeather('swapcauldron')) return; // awkwardly limiting to one activation per turn (sorry)
			this.useMove('trick', pokemon);
		},
		condition: {
			duration: 1,
		},
		desc: "Swaps with the target's item on entry!",
		num: -11,
		gen: 8,
	},
	thickclub: {
		name: "Thick Club",
		spritenum: 491,
		fling: {
			basePower: 90,
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Cubone' || pokemon.baseSpecies.baseSpecies === 'Marowak' || pokemon.baseSpecies.baseSpecies === 'Resurrectric') {
				return this.chainModify(2);
			}
		},
		desc: "If held by Cubone, Marowak or Resurrectric, its Attack is doubled.",
		itemUser: ["Resurrectric", "Marowak", "Cubone"],
		num: 258,
		gen: 2,
	},
	chandelite: {
		name: "Chandelite",
		spritenum: 578,
		megaStone: "Chandelure-Mega",
		megaEvolves: "Chandelure",
		itemUser: ["Chandelure"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -12,
		gen: 8,
		desc: "If held by a Chandelure, this item allows it to Mega Evolve in battle.",
	},
	mismaginite: {
		name: "Mismaginite",
		spritenum: 578,
		megaStone: "Mismagius-Mega",
		megaEvolves: "Mismagius",
		itemUser: ["Mismagius"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -13,
		gen: 8,
		desc: "If held by a Mismagius, this item allows it to Mega Evolve in battle.",
	},
	noivernite: {
		name: "Noivernite",
		spritenum: 578,
		megaStone: "Noivern-Mega",
		megaEvolves: "Noivern",
		itemUser: ["Noivern"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -14,
		gen: 8,
		desc: "If held by a Noivern, this item allows it to Mega Evolve in battle.",
	},
	mightyenite: {
		name: "Mightyenite",
		spritenum: 578,
		megaStone: "Mightyena-Mega",
		megaEvolves: "Mightyena",
		itemUser: ["Mightyena"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -15,
		gen: 8,
		desc: "If held by a Mightyena, this item allows it to Mega Evolve in battle.",
	},
	delphite: {
		name: "Delphite",
		spritenum: 578,
		megaStone: "Delphox-Mega",
		megaEvolves: "Delphox",
		itemUser: ["Delphox"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -16,
		gen: 8,
		desc: "If held by a Delphox, this item allows it to Mega Evolve in battle.",
	},
	obstagoonite: {
		name: "Obstagoonite",
		spritenum: 578,
		megaStone: "Obstagoon-Mega",
		megaEvolves: "Obstagoon",
		itemUser: ["Obstagoon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -17,
		gen: 8,
		desc: "If held by an Obstagoon, this item allows it to Mega Evolve in battle.",
	},
};
