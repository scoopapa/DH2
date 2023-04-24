export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	hoard: {
		shortDesc: "When it leaves battle, the Pokémon restores its original held item.",
		onSwitchOut(pokemon) {
			if (!pokemon.item && pokemon.m.originalItem) {
				if (pokemon.setItem(pokemon.m.originalItem)) {
					this.add('-ability', pokemon, 'Hoard');
					this.add('-item', pokemon, this.dex.getItem(pokemon.m.originalItem), '[from] Ability: Hoard');
				}
			}
		},
		name: "Hoard",
		rating: 3,
		num: -1,
	},
	chainlink: {
		shortDesc: "In a double battle, the Pokémon steals its partner's Steel type.",
		onUpdate(pokemon) {
			if (!pokemon.isStarted) return; // should activate *after* Data Mod
			if (!pokemon.hasType('Steel')) {
				for (const ally of pokemon.allies()) {
					if (ally.hasAbility('chainlink')) continue; // don't bounce back and forth indefinitely
					if (ally.hasType('Steel') && pokemon.addType('Steel')) {
						this.add('-ability', pokemon, 'Chain Link');
						this.add('-message', `${pokemon.name} stole its partner's armor!`);
						this.add('-start', pokemon, 'typeadd', 'Steel', '[from] Ability: Chain Link');
						ally.addVolatile('chainlink');
					}
				}
			}
		},
		onEnd(pokemon) {
			if (!pokemon.hasType('Steel')) return;
			// doesn't happen twice if the ally has already returned the armor
			for (const ally of pokemon.allies()) {
				ally.removeVolatile('chainlink');
			}
		},
		condition: {
			onStart(pokemon) {
				pokemon.setType(pokemon.getTypes(true).map(type => type === "Steel" ? "???" : type));
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'));
			},
			onSwitchOut(pokemon) { // it seems like volatiles may not run onEnd on their own the way Abilities do
				pokemon.removeVolatile('chainlink');
			},
			onFaint(pokemon) {
				pokemon.removeVolatile('chainlink');
			},
			onEnd(pokemon) {
				for (const ally of pokemon.allies()) { // revert Chain Link user's type first
					if (ally.hasAbility('chainlink') && ally.hasType('Steel')) {
						let types = ally.baseSpecies.types;
						if (ally.getTypes().join() === types.join() || !ally.setType(types)) return;
						this.add('-ability', ally, 'Chain Link');
						this.add('-message', `${ally.name} returned its partner's armor!`);
						this.add('-start', ally, 'typechange', ally.types.join('/'));
						types = pokemon.baseSpecies.types;
						if (pokemon.getTypes().join() === types.join() || !pokemon.setType(types)) return;
						this.add('-start', pokemon, 'typechange', pokemon.types.join('/'));
					}
				}
			},
		},
		name: "Chain Link",
		rating: 3,
		num: -2,
	},
	lavaflow: {
		shortDesc: "The Pokémon draws Fire moves to itself to raise Speed by 1; Fire immunity.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				if (!this.boost({spe: 1})) {
					this.add('-immune', target, '[from] ability: Lava Flow');
				}
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if (move.type !== 'Fire' || ['firepledge', 'grasspledge', 'waterpledge'].includes(move.id)) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectData.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				return this.effectData.target;
			}
		},
		name: "Lava Flow",
		rating: 3,
		num: -3,
	},
	centrifuge: {
		shortDesc: "The Pokémon draws Ground moves to itself to raise Attack by 1; Ground immunity.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ground') {
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] ability: Centrifuge');
				}
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if (move.type !== 'Ground' || ['firepledge', 'grasspledge', 'waterpledge'].includes(move.id)) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectData.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				return this.effectData.target;
			}
		},
		name: "Centrifuge",
		rating: 3,
		num: -4,
	},
	blowout: {
		shortDesc: "Sound-based moves: 1.3x damage, give target Soundproof.",
		onBasePowerPriority: 7,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['sound']) {
				this.debug('Blowout boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		onSourceHit(target, source, move) {
			if (!source || !target || !move) return; // just being safe here
			if (!move.flags['sound'] || target.getAbility().isPermanent || target.ability === 'soundproof' || target.ability === 'truant') return;
			const oldAbility = target.setAbility('soundproof');
			if (oldAbility) {
				this.add('-ability', source, 'Blowout');
				this.add('-ability', target, 'Soundproof');
				this.add('-message', `${target.illusion ? target.illusion.name : target.name} lost its hearing!`);
			}
		},
		name: "Blowout",
		rating: 3.5,
		num: -5,
	},
	murmuration: {
		shortDesc: "If user is Crown Starly, changes to Cloud Form if it has > 1/4 max HP, else Solo Form.",
		onStart(pokemon) {
			if (!pokemon.species.id.startsWith('starlycrown') || pokemon.level < 34 || pokemon.transformed) return;
			if (pokemon.hp > pokemon.maxhp / 4) {
				if (pokemon.species.id === 'starlycrown') {
					pokemon.formeChange('Starly-Crown-Cloud', this.effect, true);
					this.add('-message', `${pokemon.name} changed to Cloud Form!`);
				}
			} else {
				if (pokemon.species.id === 'starlycrowncloud') {
					pokemon.formeChange('Starly-Crown', this.effect, true);
					this.add('-message', `${pokemon.name} changed to Solo Form...`);
				}
			}
			this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
			if (!this.effectData.busted && pokemon.species.id === 'starlycrowncloud') { // this is just to make a dt that only shows up once per Starly
				const species = this.dex.getSpecies(pokemon.species.name);
				const abilities = species.abilities;
				const baseStats = species.baseStats;
				const type = species.types[0];
				if (species.types[1]) {
					const type2 = species.types[1];
					this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="http://play.pokemonshowdown.com/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
				} else {
					this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
				}
				this.effectData.busted = true;
			}
		},
		onResidualOrder: 27,
		onResidual(pokemon) {
			if (!pokemon.species.id.startsWith('starlycrown') || pokemon.level < 34 || pokemon.transformed || !pokemon.hp) return;
			if (pokemon.hp > pokemon.maxhp / 4) {
				if (pokemon.species.id === 'starlycrown') {
					pokemon.formeChange('Starly-Crown-Cloud', this.effect, true);
					this.add('-message', `${pokemon.name} changed to Cloud Form!`);
				}
			} else {
				if (pokemon.species.id === 'starlycrowncloud') {
					pokemon.formeChange('Starly-Crown', this.effect, true);
					this.add('-message', `${pokemon.name} changed to Solo Form...`);
				}
			}
			this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
			if (!this.effectData.busted && pokemon.species.id === 'starlycrowncloud') { // this is just to make a dt that only shows up once per Starly
				const species = this.dex.getSpecies(pokemon.species.name);
				const abilities = species.abilities;
				const baseStats = species.baseStats;
				const type = species.types[0];
				if (species.types[1]) {
					const type2 = species.types[1];
					this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="http://play.pokemonshowdown.com/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
				} else {
					this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
				}
				this.effectData.busted = true;
			}
		},
		onFaint(pokemon) {
			if (pokemon.species.id !== 'starlycrowncloud' || pokemon.transformed) return;
			pokemon.formeChange('Starly-Crown', this.effect, true);
			this.add('-message', `${pokemon.name} changed to Solo Form...`);
		},
		isPermanent: true,
		name: "Murmuration",
		rating: 3,
		num: -6,
	},
	scaleshift: {
		shortDesc: "In a double battle, the Pokémon copies its partner's first type.",
		onUpdate(pokemon) {
			if (!pokemon.isStarted) return; // should activate *after* Data Mod
			let newtype = null;
			for (const ally of pokemon.side.active) {
				if (
					ally !== pokemon && !ally.hasAbility('scaleshift') && ally.types[0] !== pokemon.baseSpecies.types[0]
					&& ally.types[0] !== pokemon.baseSpecies.types[1]
				) {
					newtype = ally.types[0];
				}
			}
			if (newtype) {
				let typecombo = [newtype, pokemon.baseSpecies.types[1]];
				if (pokemon.getTypes().join() === typecombo.join() || !pokemon.setType(typecombo)) return;
				this.add('-ability', pokemon, 'Scale Shift');
				this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'));
			} else {
				if (pokemon.getTypes().join() === pokemon.baseSpecies.types.join() || !pokemon.setType(pokemon.baseSpecies.types)) return;
				this.add('-ability', pokemon, 'Scale Shift');
				this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'));
			}
		},
		onEnd(pokemon) {
			if (pokemon.getTypes().join() === pokemon.baseSpecies.types.join() || !pokemon.setType(pokemon.baseSpecies.types)) return;
			this.add('-ability', pokemon, 'Scale Shift');
			this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'));
		},
		name: "Scale Shift",
		rating: 3,
		num: -7,
	},
	disengage: {
		shortDesc: "This Pokémon switches out when it reaches 1/2 or less of its maximum HP.",
		onEmergencyExit(target) {
			if (!this.canSwitch(target.side) || target.forceSwitchFlag || target.switchFlag) return;
			for (const side of this.sides) {
				for (const active of side.active) {
					active.switchFlag = false;
				}
			}
			target.switchFlag = true;
			this.add('-activate', target, 'ability: Disengage');
		},
		name: "Disengage",
		rating: 1,
		num: -8,
	},
	hoverdrive: {
		shortDesc: "This Pokémon is immune to Ground during Electric Terrain.",
		// airborneness implemented in scripts.ts
		onStart(pokemon) {
			if (this.field.isTerrain('electricterrain')) {
				this.add('-ability', pokemon, 'Hover Drive');
				this.add('-message', `${pokemon.name} levitates above the Electric Terrain!`);
			}
		},
		onAnyTerrainStart() {
			if (this.field.isTerrain('electricterrain')) {
				this.add('-ability', this.effectData.target, 'Hover Drive');
				this.add('-message', `${this.effectData.target.name} levitates above the Electric Terrain!`);
			}
		},
		name: "Hover Drive",
		rating: 3,
		num: -9,
	},

// modded form-changing Abilities

	stancechange: {
		shortDesc: "Changes Aegislash/Condana to Blade/Coiled before attack, Aegislash to Shield before King's Shield.",
		onBeforeMovePriority: 0.5,
		onBeforeMove(attacker, defender, move) {
			if (
				(attacker.species.baseSpecies !== 'Aegislash' && !attacker.species.name.startsWith('Condana')) || attacker.transformed
			) return;
			if (move.category === 'Status' && move.id !== 'kingsshield') return;
			if (attacker.species.baseSpecies === 'Aegislash') {
				const targetForme = (move.id === 'kingsshield' ? 'Aegislash' : 'Aegislash-Blade');
				if (attacker.species.name !== targetForme) attacker.formeChange(targetForme);
			} else if (attacker.species.name.startsWith('Condana') && attacker.species.name !== 'Condana-Coiled') {
				// Condana can't learn King's Shield, so it can't change back to Slither Forme (by design)
				attacker.formeChange('Condana-Coiled');
				this.add('-message', `${attacker.name} changed to Coiled Forme!`);
				this.add('-start', attacker, 'typechange', attacker.getTypes(true).join('/'), '[silent]');
				if (!this.effectData.busted) { // this is just to make a dt that only shows up once per Condana
					const species = this.dex.getSpecies(attacker.species.name);
					const abilities = species.abilities;
					const baseStats = species.baseStats;
					const type = species.types[0];
					if (species.types[1]) {
						const type2 = species.types[1];
						this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="http://play.pokemonshowdown.com/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
					} else {
						this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
					}
					this.effectData.busted = true;
				}
			}
		},
		isPermanent: true,
		name: "Stance Change",
		rating: 4,
		num: 176,
	},
	hungerswitch: {
		shortDesc: "If Morpeko or Klefki-Galar, it changes between modes at the end of each turn.",
		onResidual(pokemon) {
			if (pokemon.transformed) return;
			let targetForme = null;
			if (pokemon.species.baseSpecies === 'Morpeko') targetForme = pokemon.species.name === 'Morpeko' ? 'Morpeko-Hangry' : 'Morpeko';
			if (pokemon.species.name.startsWith('Klefki-Galar')) targetForme = pokemon.species.name === 'Klefki-Galar' ? 'Klefki-Galar-Revealed' : 'Klefki-Galar';
			if (targetForme) {
				pokemon.formeChange(targetForme);
				this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
				if (targetForme === 'Klefki-Galar') {
					this.add('-message', `${pokemon.name} changed to Lure Mode!`);
				} else if (targetForme === 'Klefki-Galar-Revealed') {
					this.add('-message', `${pokemon.name} changed to Revealed Mode!`);
				}
				if (!this.effectData.busted && pokemon.species.baseSpecies !== 'Morpeko') { // this is just to make a dt that only shows up once per Klefki
					const species = this.dex.getSpecies(pokemon.species.name); 
					const abilities = species.abilities;
					const baseStats = species.baseStats;
					const type = species.types[0];
					if (species.types[1]) {
						const type2 = species.types[1];
						this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="http://play.pokemonshowdown.com/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
					} else {
						this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
					}
					this.effectData.busted = true;
				}
			} else {
				return;
			}
		},
		// isPermanent: true, // it actually isn't in canon despite how weird that is
		name: "Hunger Switch",
		rating: 1,
		num: 258,
	},
};
