export const Items: {[itemid: string]: ItemData} = {
	awakeningseed: {
		name: "Awakening Seed",
		desc: "If held by a Lutakon, this item changes its forme to Awakened.",
		onTakeItem(item, pokemon, source) {
			return !((source && source.baseSpecies.baseSpecies === 'Lutakon') || pokemon.baseSpecies.baseSpecies === 'Lutakon');
		},
		itemUser: ["Lutakon-Awakened"],
	},
	
	//Type Balms
	normalbalm: {
		name: "Normal Balm",
		desc: "Gains Normal type on entry; unlocks certain Balm moves on certain Pokemon.",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (pokemon.useItem() && !pokemon.hasType('Normal') && pokemon.addType('Normal')) {
				pokemon.addVolatile('typebalm');
			}
		},
		onTakeItem: false,
	},
	firebalm: {
		name: "Fire Balm",
		desc: "Gains Fire type on entry; unlocks certain Balm moves on certain Pokemon.",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (pokemon.useItem() && !pokemon.hasType('Fire') && pokemon.addType('Fire')) {
				pokemon.addVolatile('typebalm');
			}
		},
		onTakeItem: false,
	},
	waterbalm: {
		name: "Water Balm",
		desc: "Gains Water type on entry; unlocks certain Balm moves on certain Pokemon.",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (pokemon.useItem() && !pokemon.hasType('Water') && pokemon.addType('Water')) {
				pokemon.addVolatile('typebalm');
			}
		},
		onTakeItem: false,
	},
	electricbalm: {
		name: "Electric Balm",
		desc: "Gains Electric type on entry; unlocks certain Balm moves on certain Pokemon.",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (pokemon.useItem() && !pokemon.hasType('Electric') && pokemon.addType('Electric')) {
				pokemon.addVolatile('typebalm');
			}
		},
		onTakeItem: false,
	},
	grassbalm: {
		name: "Grass Balm",
		desc: "Gains Grass type on entry; unlocks certain Balm moves on certain Pokemon.",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (pokemon.useItem() && !pokemon.hasType('Grass') && pokemon.addType('Grass')) {
				pokemon.addVolatile('typebalm');
			}
		},
		onTakeItem: false,
	},
	icebalm: {
		name: "Ice Balm",
		desc: "Gains Ice type on entry; unlocks certain Balm moves on certain Pokemon.",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (pokemon.useItem() && !pokemon.hasType('Ice') && pokemon.addType('Ice')) {
				pokemon.addVolatile('typebalm');
			}
		},
		onTakeItem: false,
	},
	fightingbalm: {
		name: "Fighting Balm",
		desc: "Gains Fighting type on entry; unlocks certain Balm moves on certain Pokemon.",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (pokemon.useItem() && !pokemon.hasType('Fighting') && pokemon.addType('Fighting')) {
				pokemon.addVolatile('typebalm');
			}
		},
		onTakeItem: false,
	},
	poisonbalm: {
		name: "Poison Balm",
		desc: "Gains Poison type on entry; unlocks certain Balm moves on certain Pokemon.",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (pokemon.useItem() && !pokemon.hasType('Poison') && pokemon.addType('Poison')) {
				pokemon.addVolatile('typebalm');
			}
		},
		onTakeItem: false,
	},
	groundbalm: {
		name: "Ground Balm",
		desc: "Gains Ground type on entry; unlocks certain Balm moves on certain Pokemon.",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (pokemon.useItem() && !pokemon.hasType('Ground') && pokemon.addType('Ground')) {
				pokemon.addVolatile('typebalm');
			}
		},
		onTakeItem: false,
	},
	flyingbalm: {
		name: "Flying Balm",
		desc: "Gains Flying type on entry; unlocks certain Balm moves on certain Pokemon.",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (pokemon.useItem() && !pokemon.hasType('Flying') && pokemon.addType('Flying')) {
				pokemon.addVolatile('typebalm');
			}
		},
		onTakeItem: false,
	},
	psychicbalm: {
		name: "Psychic Balm",
		desc: "Gains Psychic type on entry; unlocks certain Balm moves on certain Pokemon.",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (pokemon.useItem() && !pokemon.hasType('Psychic') && pokemon.addType('Psychic')) {
				pokemon.addVolatile('typebalm');
			}
		},
		onTakeItem: false,
	},
	bugbalm: {
		name: "Bug Balm",
		desc: "Gains Bug type on entry; unlocks certain Balm moves on certain Pokemon.",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (pokemon.useItem() && !pokemon.hasType('Bug') && pokemon.addType('Bug')) {
				pokemon.addVolatile('typebalm');
			}
		},
		onTakeItem: false,
	},
	rockbalm: {
		name: "Rock Balm",
		desc: "Gains Rock type on entry; unlocks certain Balm moves on certain Pokemon.",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (pokemon.useItem() && !pokemon.hasType('Rock') && pokemon.addType('Rock')) {
				pokemon.addVolatile('typebalm');
			}
		},
		onTakeItem: false,
	},
	ghostbalm: {
		name: "Ghost Balm",
		desc: "Gains Ghost type on entry; unlocks certain Balm moves on certain Pokemon.",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (pokemon.useItem() && !pokemon.hasType('Ghost') && pokemon.addType('Ghost')) {
				pokemon.addVolatile('typebalm');
			}
		},
		onTakeItem: false,
	},
	dragonbalm: {
		name: "Dragon Balm",
		desc: "Gains Dragon type on entry; unlocks certain Balm moves on certain Pokemon.",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (pokemon.useItem() && !pokemon.hasType('Dragon') && pokemon.addType('Dragon')) {
				pokemon.addVolatile('typebalm');
			}
		},
		onTakeItem: false,
	},
	darkbalm: {
		name: "Dark Balm",
		desc: "Gains Dark type on entry; unlocks certain Balm moves on certain Pokemon.",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (pokemon.useItem() && !pokemon.hasType('Dark') && pokemon.addType('Dark')) {
				pokemon.addVolatile('typebalm');
			}
		},
		onTakeItem: false,
	},
	steelbalm: {
		name: "Steel Balm",
		desc: "Gains Steel type on entry; unlocks certain Balm moves on certain Pokemon.",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (pokemon.useItem() && !pokemon.hasType('Steel') && pokemon.addType('Steel')) {
				pokemon.addVolatile('typebalm');
			}
		},
		onTakeItem: false,
	},
	fairybalm: {
		name: "Fairy Balm",
		desc: "Gains Fairy type on entry; unlocks certain Balm moves on certain Pokemon.",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (pokemon.useItem() && !pokemon.hasType('Fairy') && pokemon.addType('Fairy')) {
				pokemon.addVolatile('typebalm');
			}
		},
		onTakeItem: false,
	},
	
	//Vanilla tems that interact with Brunician customs
	
	grassyseed: {
		inherit: true,
		desc: "If the terrain is Grassy Terrain or Nature Field, raises holder's Defense by 1 stage. Single use.",
		onTerrainChange(pokemon) {
			if (this.field.isTerrain(['grassyterrain','guardianofnature'])) {
				pokemon.useItem();
			}
		},
	},
	mistyseed: {
		inherit: true,
		onTerrainChange(pokemon) {
			if (this.field.isTerrain('mistyterrain') && !this.getAllActive().some(target => !target.hasAbility('guardianofnature'))) {
				pokemon.useItem();
			}
		},
	},
	psychicseed: {
		inherit: true,
		onTerrainChange(pokemon) {
			if (this.field.isTerrain('psychicterrain') && !this.getAllActive().some(target => !target.hasAbility('guardianofnature'))) {
				pokemon.useItem();
			}
		},
	},
	electricseed: {
		inherit: true,
		onTerrainChange(pokemon) {
			if (this.field.isTerrain('electricterrain') && !this.getAllActive().some(target => !target.hasAbility('guardianofnature'))) {
				pokemon.useItem();
			}
		},
	},
	//Items modified for Brunica
	bigroot: {
		inherit: true,
		fling: {
			basePower: 10,
			volatileStatus: 'ingrain',
		},
	},
	//Standard Items (returning from Desvega)
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
		//Parahax prevention with Quick Feet is in conditions.ts
	},
	sinnohstone: {
		name: "Sinnoh Stone",
		shortDesc: "If held by a member of the Cranidos or Shieldon evolutionary lines, doubles Sp. Atk.",
		fling: {
			basePower: 100,
		},
		ignoreKlutz: true,
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			const dexnum = pokemon.baseSpecies.num;
			if (dexnum <= 411 && dexnum >= 408) return this.chainModify(2);
		},
		onTakeItem(item, pokemon, source) {
			if (!source) return false;
			const nums = [408,409,410,411];
			return !nums.includes(source.baseSpecies.num) && !nums.includes(pokemon.baseSpecies.num);
		},
		itemUser: ["Cranidos", "Rampardos", "Shieldon", "Bastiodon"],
	},
	elementaryorb: {
		name: "Elementary Orb",
		shortDesc: "Holder's resisted moves deal x1.3 damage.",
		fling: {
			basePower: 30,
		},
		onModifyDamage(damage, source, target, move) {
			if (move && target.getMoveHitData(move).typeMod < 0) {
				return this.chainModify([5325, 4096]);
			}
		},
	},
	poisonseed: {
		name: "Poison Seed",
		shortDesc: "On Poison Terrain, +1 to holder's Def or Sp. Def by 1, whichever raw stat is lower. (If tied boosts Defense) Single use.",
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			if (!pokemon.ignoringItem()) {
				this.singleEvent('TerrainChange', this.effect, this.effectState, pokemon);
			}
		},
		onTerrainChange(pokemon) {
			if (this.field.isTerrain('poisonterrain') && !this.getAllActive().some(target => !target.hasAbility('guardianofnature')) && pokemon.useItem()) {
				if (pokemon.getStat('def', false, true) > pokemon.getStat('spd', false, true)) {
					this.boost({spd: 1}, pokemon);
				} else {
					this.boost({def: 1}, pokemon);
				}
				
			}
		},
	},
	trainingbelt: {
		name: "Training Belt",
		shortDesc: "x1.3 power to holder's moves if it is last to move",
		fling: {
			basePower: 10,
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon) {
			if (this.getAllActive().every(
				target => (target === pokemon || !this.queue.willMove(target))
			)) {
				this.debug('Training Belt boost');
				return this.chainModify([5325, 4096]);
			}
		},
	},
	flamingpepper: {
		name: "Flaming Pepper",
		shortDesc: "Restores 50% of holder's Max HP at 25% or less, but also inflicts burn regardless of status. Single use.",
		fling: {
			basePower: 50,
			volatileStatus: 'taunt',
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 && this.heal(pokemon.baseMaxhp / 2)) {
				pokemon.useItem();
				pokemon.setStatus('brn', pokemon);
			}
		},
	},
	crimsondagger: {
		name: "Crimson Dagger",
		shortDesc: "Restore 12.5% of the holder's Max HP after it lands a damaging move.",
		fling: {
			basePower: 100,
		},
		onAfterMoveSecondarySelfPriority: -1,
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.totalDamage && !pokemon.forceSwitchFlag) {
				this.heal(pokemon.maxhp / 8, pokemon);
			}
		},
	},
	shockingpauldron: {
		name: "Shocking Pauldron",
		shortDesc: "When the holder is hit by a contact move, 25% chance to paralyze the attacker.",
		fling: {
			basePower: 60,
			status: 'par',
		},
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target) && this.randomChance(1, 4)) {
				source.trySetStatus('par', target);
			}
		},
	},
	heatedcuirass: {
		name: "Heated Cuirass",
		shortDesc: "When the holder is hit by a contact move, 25% chance to burn the attacker.",
		fling: {
			basePower: 60,
			status: 'brn',
		},
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target) && this.randomChance(1, 4)) {
				source.trySetStatus('brn', target);
			}
		},
	},
	noxiousgauntlet: {
		name: "Noxious Gauntlet",
		shortDesc: "When hit by contact, 25% chance to poison the attacker; If already poisoned upgrades it to Toxic poisoning.",
		fling: {
			basePower: 60,
			status: 'tox',
		},
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target) && this.randomChance(1, 4)) {
				if (source?.status === 'psn') {
					source.setStatus('tox', target);
				} else {
					source.trySetStatus('psn', target);
				}
			}
		},
	},
	crackedcrown: {
		name: "Cracked Crown",
		shortDesc: "Knightmare/Queenmate: x1.3 Attack and Sp. Atk",
		fling: {
			basePower: 30,
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (["Knightmare","Queenmate"].includes(pokemon.baseSpecies.baseSpecies)) {
				return this.chainModify([5325,4096]);
			}
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			if (["Knightmare","Queenmate"].includes(pokemon.baseSpecies.baseSpecies)) {
				return this.chainModify([5325,4096]);
			}
		},
		itemUser: ["Knightmare", "Queenmate"],
	},
	refractionpad: {
		name: "Refraction Pad",
		shortDesc: "Attackers lose 1/6 of max HP after using non-contact damaging moves against the holder.",
		fling: {
			basePower: 30,
		},
		onDamagingHitOrder: 2,
		onDamagingHit(damage, target, source, move) {
			if (!this.checkMoveMakesContact(move, source, target)) {
				this.damage(source.baseMaxhp / 6, source, target);
			}
		},
	},
	spinningtop: {
		name: "Spinning Top",
		shortDesc: "If the holder successfully used a damaging move, other damaging moves have x1.5 power if used next.",
		fling: {
			basePower: 60,
			volatileStatus: 'torment',
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon, target, move) {
			if (!pokemon.moveLastTurnResult) return;
			const lastMove = pokemon.lastMove;
			if (lastMove && lastMove.category !== 'Status' && lastMove.id !== move.id) {
				this.debug('Spinning Top boost');
				return this.chainModify(1.5);
			}
		},
	},
	interactivelens: {
		name: "Interactive Lens",
		shortDesc: "Holder's damaging moves (excl. OHKO) bypass accuracy checks and semi-invulnerability but use 1 extra PP.",
		fling: {
			basePower: 20,
		},
		onSourceInvulnerabilityPriority: 1,
		onSourceInvulnerability(target, source, move) {
			if (move && move.category !== 'Status' && !move.ohko) return 0;
		},
		onSourceAccuracy(accuracy, target, source, move) {
			return (
				move && move.category !== 'Status' && !move.ohko
			) || accuracy;
			//If the move fulfills the conditions then it returns true
			//Otherwise it returns the unchanged accuracy
		},
		onSourceDeductPP(target, source, move) {
			if (move && move.category !== 'Status' && !move.ohko) return 1;
		},
		//This also marks the first instance of an item altering Fling's critrate
		onModifyCritRatio(critRatio, source, target, move) {
			return (move.id === 'fling') ? 5 : critRatio;
		},
	},
	ashball: {
		name: "Ashball",
		fling: {
			basePower: 30,
		},	
		shortDesc: "Pichat line: doubled Attack/Sp. Atk, +1 critrate.",
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (["Pichat", "Pikachat", "Raichat"].includes(pokemon.baseSpecies.baseSpecies)) {
				return this.chainModify(2);
			}
		},	
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			if (["Pichat", "Pikachat", "Raichat"].includes(pokemon.baseSpecies.baseSpecies)) {
				return this.chainModify(2);
			}
		},
		onModifyCritRatio(critRatio, user) {
			if (["Pichat", "Pikachat", "Raichat"].includes(user.baseSpecies.baseSpecies)) {
				return critRatio + 1;
			}
		},
		//gotta put in fling effects manually
		onPrepareHitPriority: 1,
		onPrepareHit(target, source, move) {
			if (!move || move.id !== 'fling') return;
			(move.secondaries ||= []).push({chance: 100, boosts: {accuracy: -1}});
		},
		itemUser: ["Pichat", "Pikachat", "Raichat"],
	},
	slushisloshiscale: {
		name: "Slushisloshi Scale",
		shortDesc: "Slushisloshi: Does not revert to Solo Forme, ability changed to Water Absorb in School Forme",
		fling: {
			basePower: 20,
		},
		ignoreKlutz: true,
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Slushisloshi' || pokemon.transformed || pokemon.level < 20) return;
			if (pokemon.species.id === 'slushisloshi') {
				this.add('-item', pokemon, 'Slushisloshi Scale');
				pokemon.formeChange('Slushisloshi-School', this.dex.abilities.get('schooling'), true);
				this.add('-ability', pokemon, 'Water Absorb');
			}
			pokemon.setAbility('waterabsorb', pokemon, true);
		},
		onTakeItem(item, pokemon, source) {
			return (source && source.baseSpecies.baseSpecies !== "Slushisloshi" && pokemon.baseSpecies.baseSpecies !== "Slushisloshi");
		},
		itemUser: ["Slushisloshi", "Slushisloshi-School"],
		//Effects coded under Schooling in abilities.ts
	},
	hinderpolicy: {
		name: "Hinder Policy",
		shortDesc: "Holder gains +2 to Defense and Sp. Def when statused. Single use.",
		fling: {
			basePower: 80,
		},
		onAfterSetStatusPriority: -1,
		onAfterSetStatus(status, pokemon) {
			pokemon.useItem();
		},
		onUpdate(pokemon) {
			if (pokemon.status) {
				pokemon.useItem();
			}
		},
		boosts: {
			def: 2,
			spd: 2,
		},
	},
	rulebook: {
		name: "Rulebook",
		shortDesc: "On switch-in, identifies and suppresses opponents' items for two turns.",
		fling: {
			basePower: 50,
			volatileStatus: 'embargo',
		},
		onStart(pokemon) {
			for (const target of pokemon.foes()) {
				if (target.item && !target.volatiles['rulebook']) {
					const itemName = target.getItem().name
					this.add('-item', target, itemName, '[from] item: Rulebook', '[of] ' + pokemon, '[silent]');
					this.add('-item', pokemon, 'Rulebook', '[silent]');
					this.add('-message', `${pokemon.name} is inspecting ${target.name}\'s ${itemName} by its Rulebook!`);
					target.addVolatile('rulebook');
				}
			}
		},
		condition: {
			duration: 2,
			onStart(pokemon) {
				this.singleEvent('End', pokemon.getItem(), pokemon.itemState, pokemon);
			},
			// Item suppression implemented in Pokemon.ignoringItem() within scripts.ts/pokemon
		},
	},
	
	/*//Wonder Masks
	ninjaskmask: {
		name: "Ninjask Mask",
		shortDesc: "Wonder Mask of Ninjask. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Ninjask-Mask",
		megaEvolves: "Cirno",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Ninjask Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Ninjask Mask emanates a strange power...`);
			this.effectState.revealed = true;
		},
		onTakeItem: false,
	},
	ironmormask: {
		name: "Ironmor Mask",
		shortDesc: "Wonder Mask of Ironmor. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Ironmor-Mask",
		megaEvolves: "Cirno",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Ironmor Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Ironmor Mask emanates a strange power...`);
			this.effectState.revealed = true;
		},
		onTakeItem: false,
	},
	janutchermask: {
		name: "Janutcher Mask",
		shortDesc: "Wonder Mask of Janutcher. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Janutcher-Mask",
		megaEvolves: "Cirno",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Janutcher Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Janutcher Mask emanates a strange power...`);
			this.effectState.revealed = true;
		},
		onTakeItem: false,
	},
	hisuiansamurottmask: {
		name: "Hisuian Samurott Mask",
		shortDesc: "Wonder Mask of Samurott-Hisui. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Samurott-Hisui-Mask",
		megaEvolves: "Cirno",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Hisuian Samurott Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Hisuian Samurott Mask emanates a strange power...`);
			this.effectState.revealed = true;
		},
		onTakeItem: false,
	},
	baxcaliburmask: {
		name: "Baxcalibur Mask",
		shortDesc: "Wonder Mask of Baxcalibur. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Baxcalibur-Mask",
		megaEvolves: "Cirno",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Baxcalibur Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Baxcalibur Mask emanates a strange power...`);
			this.effectState.revealed = true;
		},
		onTakeItem: false,
	},
	vulguilemask: {
		name: "Vulguile Mask",
		shortDesc: "Wonder Mask of Vulguile. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Vulguile-Mask",
		megaEvolves: "Cirno",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Vulguile Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Vulguile Mask emanates a strange power...`);
			this.effectState.revealed = true;
		},
		onTakeItem: false,
	},
	arcognitionmask: {
		name: "Arcognition Mask",
		shortDesc: "Wonder Mask of Arcognition. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Arcognition-Mask",
		megaEvolves: "Cirno",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Arcognition Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Arcognition Mask emanates a strange power...`);
			this.effectState.revealed = true;
		},
		onTakeItem: false,
	},
	ampalangomask: {
		name: "Ampalango Mask",
		shortDesc: "Wonder Mask of Ampalango. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Ampalango-Mask",
		megaEvolves: "Cirno",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Ampalango Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Ampalango Mask emanates a strange power...`);
			this.effectState.revealed = true;
		},
		onTakeItem: false,
	},
	tinkatonmask: {
		name: "Tinkaton Mask",
		shortDesc: "Wonder Mask of Tinkaton. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Tinkaton-Mask",
		megaEvolves: "Cirno",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Tinkaton Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Tinkaton Mask emanates a strange power...`);
			this.effectState.revealed = true
		},
		onTakeItem: false,
	},
	carbinkmask: {
		name: "Carbink Mask",
		shortDesc: "Wonder Mask of Carbink. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Carbink-Mask",
		megaEvolves: "Cirno",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Carbink Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Carbink Mask emanates a strange power...`);
			this.effectState.revealed = true;
		},
		onTakeItem: false,
	},
	pumentummask: {
		name: "Pumentum Mask",
		shortDesc: "Wonder Mask of Pumentum. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Pumentum-Mask",
		megaEvolves: "Cirno",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Pumentum Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Pumentum Mask emanates a strange power...`);
			this.effectState.revealed = true;
		},
		onTakeItem: false,
	},
	bewearmask: {
		name: "Bewear Mask",
		shortDesc: "Wonder Mask of Bewear. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Bewear-Mask",
		megaEvolves: "Cirno",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Bewear Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Bewear Mask emanates a strange power...`);
			this.effectState.revealed = true;
		},
		onTakeItem: false,
	},
	jestiremask: {
		name: "Jestire Mask",
		shortDesc: "Wonder Mask of Jestire. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Jestire-Mask",
		megaEvolves: "Cirno",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Jestire Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Jestire Mask emanates a strange power...`);
			this.effectState.revealed = true;
		},
		onTakeItem: false,
	},
	bombastormask: {
		name: "Bombastor Mask",
		shortDesc: "Wonder Mask of Bombastor. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Bombastor-Mask",
		megaEvolves: "Cirno",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Bombastor Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Bombastor Mask emanates a strange power...`);
			this.effectState.revealed = true;
		},
		onTakeItem: false,
	},
	macawphonymask: {
		name: "Macawphony Mask",
		shortDesc: "Wonder Mask of Macawphony. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Macawphony-Mask",
		megaEvolves: "Cirno",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Macawphony Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Macawphony Mask emanates a strange power...`);
			this.effectState.revealed = true;
		},
		onTakeItem: false,
	},
	gyaradosmask: {
		name: "Gyarados Mask",
		shortDesc: "Wonder Mask of Gyarados. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Gyarados-Mask",
		megaEvolves: "Cirno",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Gyarados Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Gyarados Mask emanates a strange power...`);
			this.effectState.revealed = true;
		},
		onTakeItem: false,
	},
	wildpyremask: {
		name: "Wildpyre Mask",
		shortDesc: "Wonder Mask of Wildpyre. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Wildpyre-Mask",
		megaEvolves: "Cirno",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Wildpyre Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Wildpyre Mask emanates a strange power...`);
			this.effectState.revealed = true;
		},
		onTakeItem: false,
	},
	swauntedmask: {
		name: "Swaunted Mask",
		shortDesc: "Wonder Mask of Swaunted. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Swaunted-Mask",
		megaEvolves: "Cirno",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Swaunted Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Swaunted Mask emanates a strange power...`);
			this.effectState.revealed = true;
		},
		onTakeItem: false,
	},
	norvidmask: {
		name: "Norvid Mask",
		shortDesc: "Wonder Mask of Norvid. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Norvid-Mask",
		megaEvolves: "Cirno",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Norvid Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Norvid Mask emanates a strange power...`);
			this.effectState.revealed = true;
		},
		onTakeItem: false,
	},
	ogerponmask: {
		name: "Ogerpon Mask",
		shortDesc: "Wonder Mask of Ogerpon. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Ogerpon-Mask",
		megaEvolves: "Cirno",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Ogerpon Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Ogerpon Mask emanates a strange power...`);
			this.effectState.revealed = true;
		},
		onTakeItem: false,
	},
	quagsiremask: {
		name: "Quagsire Mask",
		shortDesc: "Wonder Mask of Quagsire. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Quagsire-Mask",
		megaEvolves: "Cirno",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Quagsire Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Quagsire Mask emanates a strange power...`);
			this.effectState.revealed = true;
		},
		onTakeItem: false,
	},
	sandacondamask: {
		name: "Sandaconda Mask",
		shortDesc: "Wonder Mask of Sandaconda. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Sandaconda-Mask",
		megaEvolves: "Cirno",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Sandaconda Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Sandaconda Mask emanates a strange power...`);
			this.effectState.revealed = true;
		},
		onTakeItem: false,
	},
	keisbergmask: {
		name: "Keisberg Mask",
		shortDesc: "Wonder Mask of Keisberg. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Keisberg-Mask",
		megaEvolves: "Cirno",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Keisberg Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Keisberg Mask emanates a strange power...`);
			this.effectState.revealed = true;
		},
		onTakeItem: false,
	},
	icestymask: {
		name: "Icesty Mask",
		shortDesc: "Wonder Mask of Icesty. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Icesty-Mask",
		megaEvolves: "Cirno",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Icesty Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Icesty Mask emanates a strange power...`);
			this.effectState.revealed = true;
		},
		onTakeItem: false,
	},
	eeveemask: {
		name: "Eevee Mask",
		shortDesc: "Wonder Mask of Eevee. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Eevee-Mask",
		megaEvolves: "Cirno",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Eevee Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Eevee Mask emanates a strange power...`);
			this.effectState.revealed = true;
		},
		onTakeItem: false,
	},
	kecleonmask: {
		name: "Kecleon Mask",
		shortDesc: "Wonder Mask of Kecleon. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Kecleon-Mask",
		megaEvolves: "Cirno",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Kecleon Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Kecleon Mask emanates a strange power...`);
			this.effectState.revealed = true;
		},
		onTakeItem: false,
	},
	desveganmamoswinemask: {
		name: "Desvegan Mamoswine Mask",
		shortDesc: "Wonder Mask of Mamoswine-Desvega. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Mamoswine-Desvega-Mask",
		megaEvolves: "Cirno",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Desvegan Mamoswine Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Desvegan Mamoswine Mask emanates a strange power...`);
			this.effectState.revealed = true;
		},
		onTakeItem: false,
	},
	virulopemask: {
		name: "Virulope Mask",
		shortDesc: "Wonder Mask of Virulope. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Virulope-Mask",
		megaEvolves: "Cirno",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Virulope Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Virulope Mask emanates a strange power...`);
			this.effectState.revealed = true;
		},
		onTakeItem: false,
	},
	parascendmask: {
		name: "Parascend Mask",
		shortDesc: "Wonder Mask of Parascend. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Parascend-Mask",
		megaEvolves: "Cirno",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Parascend Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Parascend Mask emanates a strange power...`);
			this.effectState.revealed = true;
		},
		onTakeItem: false,
	},
	alakazammask: {
		name: "Alakazam Mask",
		shortDesc: "Wonder Mask of Alakazam. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Alakazam-Mask",
		megaEvolves: "Cirno",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Alakazam Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Alakazam Mask emanates a strange power...`);
			this.effectState.revealed = true;
		},
		onTakeItem: false,
	},
	kelplossusmask: {
		name: "Kelplossus Mask",
		shortDesc: "Wonder Mask of Kelplossus. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Kelplossus-Mask",
		megaEvolves: "Cirno",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Kelplossus Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Kelplossus Mask emanates a strange power...`);
			this.effectState.revealed = true;
		},
		onTakeItem: false,
	},
	garganaclmask: {
		name: "Garganacl Mask",
		shortDesc: "Wonder Mask of Garganacl. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Garganacl-Mask",
		megaEvolves: "Cirno",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Garganacl Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Garganacl Mask emanates a strange power...`);
			this.effectState.revealed = true;
		},
		onTakeItem: false,
	},
	orthwormmask: {
		name: "Orthworm Mask",
		shortDesc: "Wonder Mask of Orthworm. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Orthworm-Mask",
		megaEvolves: "Cirno",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Orthworm Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Orthworm Mask emanates a strange power...`);
			this.effectState.revealed = true;
		},
		onTakeItem: false,
	},
	auruminemask: {
		name: "Aurumine Mask",
		shortDesc: "Wonder Mask of Aurumine. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Aurumine-Mask",
		megaEvolves: "Cirno",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Aurumine Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Aurumine Mask emanates a strange power...`);
			this.effectState.revealed = true;
		},
		onTakeItem: false,
	},
	shorrormask: {
		name: "Shorror Mask",
		shortDesc: "Wonder Mask of Shorror. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Shorror-Mask",
		megaEvolves: "Cirno",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Shorror Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Shorror Mask emanates a strange power...`);
			this.effectState.revealed = true;
		},
		onTakeItem: false,
	},
	pelippermask: {
		name: "Pelipper Mask",
		shortDesc: "Wonder Mask of Pelipper. Use on any Pokemon to Wonder Evolve.",
		megaStone: "Cirno-Pelipper-Mask",
		megaEvolves: "Cirno",
		ignoreKlutz: true,
		onStart(pokemon) {
			if (this.effectState.revealed) return;
			this.add('-item', pokemon, 'Pelipper Mask', '[silent]');
			this.add('-message', `${pokemon.name}\'s Pelipper Mask emanates a strange power...`);
			this.effectState.revealed = true;
		},
		onTakeItem: false,
	},*/
};
