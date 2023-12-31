export const Items: {[itemid: string]: ItemData} = {
	//Standard Items
	thunderorb: {
		name: "Thunder Orb",
		shortDesc: "Paralyzes the holder. If Quick Feet is its ability, prevents immobilization from paralysis.",
		fling: {
			basePower: 30,
			status: 'par',
		},
		onResidualOrder: 28,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			pokemon.trySetStatus('par', pokemon);
		},
		//TODO: put parahax prevention in conditions.ts
	},
//TODO: Slushisloshi Scale, Hindrance Policy, Element Orb, Refraction Pad, Noxious Gauntlet, Heated Cuirass, Shocking Pauldron
	//TODO: Rulebook, Ashball, Spinning Top, Crimson Dagger, Interactive Lens, Flaming Pepper, Sinnoh Stone, Poison Seed, Training Belt
	
	//Wonder Masks
	ninjaskmask: {
		name: "Ninjask Mask",
		shortDesc: "Wonder Mask of Ninjask. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Ninjask-Mask",
		megaEvolves: "Cirno",
		itemUser: ["Cirno"],
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Ninjask Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Ninjask Mask emanates a strange power...`);
			this.effectState.revealed = true;
silent]');
		},
		onTakeItem: false,
	},
	ironmormask: {
		name: "Ironmor Mask",
		shortDesc: "Wonder Mask of Ironmor. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Ironmor-Mask",
		megaEvolves: "Cirno",
		itemUser: ["Cirno"],
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Ironmor Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Ironmor Mask emanates a strange power...`);
			this.effectState.revealed = true;
silent]');
		},
		onTakeItem: false,
	},
	janutchermask: {
		name: "Janutcher Mask",
		shortDesc: "Wonder Mask of Janutcher. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Janutcher-Mask",
		megaEvolves: "Cirno",
		itemUser: ["Cirno"],
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Janutcher Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Janutcher Mask emanates a strange power...`);
			this.effectState.revealed = true;
silent]');
		},
		onTakeItem: false,
	},
	hisuiansamurottmask: {
		name: "Hisuian Samurott Mask",
		shortDesc: "Wonder Mask of Samurott-Hisui. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Samurott-Hisui-Mask",
		megaEvolves: "Cirno",
		itemUser: ["Cirno"],
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Hisuian Samurott Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Hisuian Samurott Mask emanates a strange power...`);
			this.effectState.revealed = true;
silent]');
		},
		onTakeItem: false,
	},
	baxcaliburmask: {
		name: "Baxcalibur Mask",
		shortDesc: "Wonder Mask of Baxcalibur. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Baxcalibur-Mask",
		megaEvolves: "Cirno",
		itemUser: ["Cirno"],
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Baxcalibur Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Baxcalibur Mask emanates a strange power...`);
			this.effectState.revealed = true;
silent]');
		},
		onTakeItem: false,
	},
	vulguilemask: {
		name: "Vulguile Mask",
		shortDesc: "Wonder Mask of Vulguile. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Vulguile-Mask",
		megaEvolves: "Cirno",
		itemUser: ["Cirno"],
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Vulguile Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Vulguile Mask emanates a strange power...`);
			this.effectState.revealed = true;
silent]');
		},
		onTakeItem: false,
	},
	arcognitionmask: {
		name: "Arcognition Mask",
		shortDesc: "Wonder Mask of Arcognition. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Arcognition-Mask",
		megaEvolves: "Cirno",
		itemUser: ["Cirno"],
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Arcognition Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Arcognition Mask emanates a strange power...`);
			this.effectState.revealed = true;
silent]');
		},
		onTakeItem: false,
	},
	ampalangomask: {
		name: "Ampalango Mask",
		shortDesc: "Wonder Mask of Ampalango. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Ampalango-Mask",
		megaEvolves: "Cirno",
		itemUser: ["Cirno"],
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Ampalango Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Ampalango Mask emanates a strange power...`);
			this.effectState.revealed = true;
silent]');
		},
		onTakeItem: false,
	},
	tinkatonmask: {
		name: "Tinkaton Mask",
		shortDesc: "Wonder Mask of Tinkaton. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Tinkaton-Mask",
		megaEvolves: "Cirno",
		itemUser: ["Cirno"],
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Tinkaton Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Tinkaton Mask emanates a strange power...`);
			this.effectState.revealed = true;
silent]');
		},
		onTakeItem: false,
	},
	carbinkmask: {
		name: "Carbink Mask",
		shortDesc: "Wonder Mask of Carbink. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Carbink-Mask",
		megaEvolves: "Cirno",
		itemUser: ["Cirno"],
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Carbink Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Carbink Mask emanates a strange power...`);
			this.effectState.revealed = true;
silent]');
		},
		onTakeItem: false,
	},
	pumentummask: {
		name: "Pumentum Mask",
		shortDesc: "Wonder Mask of Pumentum. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Pumentum-Mask",
		megaEvolves: "Cirno",
		itemUser: ["Cirno"],
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Pumentum Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Pumentum Mask emanates a strange power...`);
			this.effectState.revealed = true;
silent]');
		},
		onTakeItem: false,
	},
	bewearmask: {
		name: "Bewear Mask",
		shortDesc: "Wonder Mask of Bewear. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Bewear-Mask",
		megaEvolves: "Cirno",
		itemUser: ["Cirno"],
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Bewear Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Bewear Mask emanates a strange power...`);
			this.effectState.revealed = true;
silent]');
		},
		onTakeItem: false,
	},
	jestiremask: {
		name: "Jestire Mask",
		shortDesc: "Wonder Mask of Jestire. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Jestire-Mask",
		megaEvolves: "Cirno",
		itemUser: ["Cirno"],
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Jestire Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Jestire Mask emanates a strange power...`);
			this.effectState.revealed = true;
silent]');
		},
		onTakeItem: false,
	},
	bombastormask: {
		name: "Bombastor Mask",
		shortDesc: "Wonder Mask of Bombastor. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Bombastor-Mask",
		megaEvolves: "Cirno",
		itemUser: ["Cirno"],
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Bombastor Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Bombastor Mask emanates a strange power...`);
			this.effectState.revealed = true;
silent]');
		},
		onTakeItem: false,
	},
	macawphonymask: {
		name: "Macawphony Mask",
		shortDesc: "Wonder Mask of Macawphony. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Macawphony-Mask",
		megaEvolves: "Cirno",
		itemUser: ["Cirno"],
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Macawphony Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Macawphony Mask emanates a strange power...`);
			this.effectState.revealed = true;
silent]');
		},
		onTakeItem: false,
	},
	gyaradosmask: {
		name: "Gyarados Mask",
		shortDesc: "Wonder Mask of Gyarados. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Gyarados-Mask",
		megaEvolves: "Cirno",
		itemUser: ["Cirno"],	
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Gyarados Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Gyarados Mask emanates a strange power...`);
			this.effectState.revealed = true;
silent]');
		},
		onTakeItem: false,
	},
	wildpyremask: {
		name: "Wildpyre Mask",
		shortDesc: "Wonder Mask of Wildpyre. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Wildpyre-Mask",
		megaEvolves: "Cirno",
		itemUser: ["Cirno"],
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Wildpyre Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Wildpyre Mask emanates a strange power...`);
			this.effectState.revealed = true;
silent]');
		},
		onTakeItem: false,
	},
	swauntedmask: {
		name: "Swaunted Mask",
		shortDesc: "Wonder Mask of Swaunted. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Swaunted-Mask",
		megaEvolves: "Cirno",
		itemUser: ["Cirno"],
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Swaunted Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Swaunted Mask emanates a strange power...`);
			this.effectState.revealed = true;
silent]');
		},
		onTakeItem: false,
	},
	norvidmask: {
		name: "Norvid Mask",
		shortDesc: "Wonder Mask of Norvid. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Norvid-Mask",
		megaEvolves: "Cirno",
		itemUser: ["Cirno"],
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Norvid Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Norvid Mask emanates a strange power...`);
			this.effectState.revealed = true;
silent]');
		},
		onTakeItem: false,
	},
	ogerponmask: {
		name: "Ogerpon Mask",
		shortDesc: "Wonder Mask of Ogerpon. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Ogerpon-Mask",
		megaEvolves: "Cirno",
		itemUser: ["Cirno"],
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Ogerpon Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Ogerpon Mask emanates a strange power...`);
			this.effectState.revealed = true;
silent]');
		},
		onTakeItem: false,
	},
	quagsiremask: {
		name: "Quagsire Mask",
		shortDesc: "Wonder Mask of Quagsire. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Quagsire-Mask",
		megaEvolves: "Cirno",
		itemUser: ["Cirno"],
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Quagsire Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Quagsire Mask emanates a strange power...`);
			this.effectState.revealed = true;
silent]');
		},
		onTakeItem: false,,
	},
	sandacondamask: {
		name: "Sandaconda Mask",
		shortDesc: "Wonder Mask of Sandaconda. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Sandaconda-Mask",
		megaEvolves: "Cirno",
		itemUser: ["Cirno"],
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Sandaconda Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Sandaconda Mask emanates a strange power...`);
			this.effectState.revealed = true;
silent]');
		},
		onTakeItem: false,
	},
	keisbergmask: {
		name: "Keisberg Mask",
		shortDesc: "Wonder Mask of Keisberg. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Keisberg-Mask",
		megaEvolves: "Cirno",
		itemUser: ["Cirno"],
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Keisberg Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Keisberg Mask emanates a strange power...`);
			this.effectState.revealed = true;
silent]');
		},
		onTakeItem: false,
	},
	icestymask: {
		name: "Icesty Mask",
		shortDesc: "Wonder Mask of Icesty. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Icesty-Mask",
		megaEvolves: "Cirno",
		itemUser: ["Cirno"],
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Icesty Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Icesty Mask emanates a strange power...`);
			this.effectState.revealed = true;
silent]');
		},
		onTakeItem: false,
	},
	eeveemask: {
		name: "Eevee Mask",
		shortDesc: "Wonder Mask of Eevee. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Eevee-Mask",
		megaEvolves: "Cirno",
		itemUser: ["Cirno"],
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Eevee Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Eevee Mask emanates a strange power...`);
			this.effectState.revealed = true;
silent]');
		},
		onTakeItem: false,
	},
	kecleonmask: {
		name: "Kecleon Mask",
		shortDesc: "Wonder Mask of Kecleon. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Kecleon-Mask",
		megaEvolves: "Cirno",
		itemUser: ["Cirno"],
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Kecleon Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Kecleon Mask emanates a strange power...`);
			this.effectState.revealed = true;
silent]');
		},
		onTakeItem: false,
	},
	desveganmamoswinemask: {
		name: "Desvegan Mamoswine Mask",
		shortDesc: "Wonder Mask of Mamoswine-Desvega. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Mamoswine-Desvega-Mask",
		megaEvolves: "Cirno",
		itemUser: ["Cirno"],
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Desvegan Mamoswine Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Desvegan Mamoswine Mask emanates a strange power...`);
			this.effectState.revealed = true;
silent]');
		},
		onTakeItem: false,
	},
	virulopemask: {
		name: "Virulope Mask",
		shortDesc: "Wonder Mask of Virulope. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Virulope-Mask",
		megaEvolves: "Cirno",
		itemUser: ["Cirno"],
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Virulope Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Virulope Mask emanates a strange power...`);
			this.effectState.revealed = true;
silent]');
		},
		onTakeItem: false,
	},
	parascendmask: {
		name: "Parascend Mask",
		shortDesc: "Wonder Mask of Parascend. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Parascend-Mask",
		megaEvolves: "Cirno",
		itemUser: ["Cirno"],
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Parascend Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Parascend Mask emanates a strange power...`);
			this.effectState.revealed = true;
silent]');
		},
		onTakeItem: false,
	},
	alakazammask: {
		name: "Alakazam Mask",
		shortDesc: "Wonder Mask of Alakazam. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Alakazam-Mask",
		megaEvolves: "Cirno",
		itemUser: ["Cirno"],		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Alakazam Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Alakazam Mask emanates a strange power...`);
			this.effectState.revealed = true;
silent]');
		},
		onTakeItem: false,
	},
	kelplossusmask: {
		name: "Kelplossus Mask",
		shortDesc: "Wonder Mask of Kelplossus. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Kelplossus-Mask",
		megaEvolves: "Cirno",
		itemUser: ["Cirno"],
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Kelplossus Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Kelplossus Mask emanates a strange power...`);
			this.effectState.revealed = true;
silent]');
		},
		onTakeItem: false,
	},
	garganaclmask: {
		name: "Garganacl Mask",
		shortDesc: "Wonder Mask of Garganacl. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Garganacl-Mask",
		megaEvolves: "Cirno",
		itemUser: ["Cirno"],
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Garganacl Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Garganacl Mask emanates a strange power...`);
			this.effectState.revealed = true;
silent]');
		},
		onTakeItem: false,
	},
	orthwormmask: {
		name: "Orthworm Mask",
		shortDesc: "Wonder Mask of Orthworm. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Orthworm-Mask",
		megaEvolves: "Cirno",
		itemUser: ["Cirno"],
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Orthworm Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Orthworm Mask emanates a strange power...`);
			this.effectState.revealed = true;
silent]');
		},
		onTakeItem: false,
	},
	auruminemask: {
		name: "Aurumine Mask",
		shortDesc: "Wonder Mask of Aurumine. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Aurumine-Mask",
		megaEvolves: "Cirno",
		itemUser: ["Cirno"],
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Aurumine Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Aurumine Mask emanates a strange power...`);
			this.effectState.revealed = true;
silent]');
		},
		onTakeItem: false,
	},
	shorrormask: {
		name: "Shorror Mask",
		shortDesc: "Wonder Mask of Shorror. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Shorror-Mask",
		megaEvolves: "Cirno",
		itemUser: ["Cirno"],
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Shorror Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Shorror Mask emanates a strange power...`);
			this.effectState.revealed = true;
silent]');
		},
		onTakeItem: false,
	},
	pelippermask: {
		name: "Pelipper Mask",
		shortDesc: "Wonder Mask of Pelipper. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Pelipper-Mask",
		megaEvolves: "Cirno",
		itemUser: ["Cirno"],
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Pelipper Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Pelipper Mask emanates a strange power...`);
			this.effectState.revealed = true;
silent]');
		},
		onTakeItem: false,
	},
};
