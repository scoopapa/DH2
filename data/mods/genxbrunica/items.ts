export const Items: {[itemid: string]: ItemData} = {
	awakeningseed: {
		name: "Awakening Seed",
		shortDesc: "If held by a Lutakon, this item changes its forme to Awakened.",
		onTakeItem(item, pokemon, source) {
			return !((source && source.baseSpecies.baseSpecies === 'Lutakon') || pokemon.baseSpecies.baseSpecies === 'Lutakon');
		},
		itemUser: ["Lutakon-Awakened"],
	},
	deluxebait: {
		name: "Deluxe Bait",
		shortDesc: "Speed is raised 2 if holder is hit by Water; Water power against it is halved.",
		fling: {
			basePower: 10,
			volatileStatus: 'trapped',
		},
		onSourceModifyAtkPriority: 5,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				this.debug('Deluxe Bait weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				this.debug('Deluxe Bait weaken');
				return this.chainModify(0.5);
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Water') {
				this.boost({spe: 2});
			}
		},
	},
	blunderpolicy: {
		inherit: true,
		shortDesc: "Speed +2 if holder misses/is immobilized or target is immune. Single use.",
		//Basically activates under similar conditions to Stomping Tantrum/Temper Flare boost
		//So it's in scripts.ts, activating alongside such conditions
	},
	protectivepads: {
		inherit: true,
		shortDesc: "Recoil/crash moves have x1.2 power (excl. Struggle); Holder protected from adverse contact effects (excl. Pickpocket)",
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.recoil || move.hasCrashDamage) {
				this.debug('Protective Pads boost');
				return this.chainModify([4915, 4096]);
			}
		},
	},
	soullink: {
		name: "Soul-Link",
		shortDesc: "Passive damage on holder is also inflicted on an opponent. (Prioritizes directly across)",
		fling: {
			basePower: 60,
		},
		onDamage(damage, target, source, effect) {
			if (!effect || effect.id === 'struggle' || effect.id === 'soullink') return;
			if (effect.effectType !== 'Move' || target === source) {
				const foes = target.foes();
				if (!foes.length) return;
				let damageTarget = foes[target.position + target.side.active.length - 1] || this.sample(foes);
				this.damage(damage, damageTarget, target);
			}
		},
	},
	hornoplenty: {
		name: "Horn o' Plenty",
		shortDesc: "Stockpile if at full HP. (+1 Def/SpD if successful; Max. 3)",
		fling: {
			basePower: 10,
			volatileStatus: 'stockpile',
		},
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(target) {
			if (target.hp === target.maxhp) {
				target.addVolatile('stockpile');
			}
		},
	},
	warpscarf: {
		name: "Warp Scarf",
		shortDesc: "End of turn: 50% chance for holder to switch into an ally of choice.",
		fling: {
			basePower: 10,
		},
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(target) {
			if (this.canSwitch(target.side) && !target.switchFlag && this.randomChance(1,2)) {
				for (const side of this.sides) {
					for (const active of side.active) {
						active.switchFlag = false;
					}
				}
				target.switchFlag = true;
				this.add('-activate', target, 'item: Warp Scarf');
			}
		},
		//manual fling effects
		onPrepareHitPriority: 1,
		onPrepareHit(target, source, move) {
			if (!move || move.id !== 'fling') return;
			move.forceSwitch = true;
		},
	},
	tomeofimagination: {
		name: "Tome of Imagination",
		shortDesc: "On PP consumption from user's moves, this item is consumed instead.",
		fling: {
			basePower: 20,
		},
		//manual fling effects
		onPrepareHitPriority: 1,
		onPrepareHit(target, source, move) {
			if (!move || move.id !== 'fling') return;
			(move.secondaries ||= []).push({
				chance: 100,
				onHit(target) {
					if (!target.hp) return;
					let targetmove: Move | ActiveMove | null = target.lastMove;
					if (!targetmove || targetmove.isZ) return;
					if (targetmove.isMax && targetmove.baseMove) targetmove = this.dex.moves.get(targetmove.baseMove);

					const ppDeducted = target.deductPP(targetmove.id, 4);
					if (ppDeducted) this.add('-activate', target, 'move: Fling', targetmove.name, ppDeducted);
				},
			});
		},
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
		shortDesc: "Slushisloshi/Wishiwashi: Does not revert to Solo Forme, ability changed to Water Absorb in School Forme",
		fling: {
			basePower: 20,
		},
		ignoreKlutz: true,
		onStart(pokemon) {
			if (!['Slushisloshi','Wishiwashi'].includes(pokemon.baseSpecies.baseSpecies) || pokemon.transformed || pokemon.level < 20) return;
			if (['slushisloshi','wishiwashi'].includes(pokemon.species.id)) {
				this.add('-item', pokemon, 'Slushisloshi Scale');
				pokemon.formeChange(pokemon.baseSpecies.baseSpecies + '-School', this.dex.abilities.get('schooling'), true);
				this.add('-ability', pokemon, 'Water Absorb');
			}
			pokemon.setAbility('waterabsorb', pokemon, true);
		},
		onTakeItem(item, pokemon, source) {
			return (source && !["Slushisloshi", "Wishiwashi"].includes(source.baseSpecies.baseSpecies) && !["Slushisloshi", "Wishiwashi"].includes(pokemon.baseSpecies.baseSpecies));
		},
		itemUser: ["Slushisloshi", "Slushisloshi-School", "Wishiwashi", "Wishiwashi-School"],
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
	
};
