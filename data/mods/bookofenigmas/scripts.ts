export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	/*inherit: 'gen8',
	gen: 8,*/
	
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['BoE OU', 'BoE NFE', 'BoE LC', 'BoE Uber'],
	},

	init() {
		//stolen from optimons x
		const addNewMoves = (pokemonid: string, moveids: string[]) => {
			for (const moveid of moveids) {
				this.modData('Learnsets', pokemonid).learnset[moveid] = [moveid === 'dracometeor' || moveid === 'steelbeam' ? '8T' : '8M'];
			}
		};
		for (const id in this.dataCache.Pokedex) {
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset) {
				const learnset = this.modData('Learnsets', this.toID(id)).learnset;
				this.modData('Learnsets', this.toID(id)).learnset.terablast = ["8M"];
			}
		};
		addNewMoves('azumarill',['icespinner']);
		addNewMoves('cloyster',['icespinner']);
		addNewMoves('delibird',['icespinner']);
		addNewMoves('donphan',['icespinner']);
		addNewMoves('dragonite',['icespinner']);
		addNewMoves('forretress',['icespinner']);
		addNewMoves('weavile',['icespinner']);
		addNewMoves('wigglytuff',['icespinner']);
		addNewMoves('articuno',['icespinner']);
		addNewMoves('mew',['icespinner']);
		addNewMoves('dunsparce',['icespinner']);
		addNewMoves('jigglypuff',['icespinner']);
		addNewMoves('marill',['icespinner']);
		addNewMoves('shellder',['icespinner']);

		addNewMoves('altaria',['trailblaze']);
		addNewMoves('ampharos',['trailblaze']);
		addNewMoves('azumarill',['trailblaze']);
		addNewMoves('blissey',['trailblaze']);
		addNewMoves('clodsire',['trailblaze']);
		addNewMoves('delibird',['trailblaze']);
		addNewMoves('donphan',['trailblaze']);
		addNewMoves('eevee',['trailblaze']);
		addNewMoves('golduck',['trailblaze']);
		addNewMoves('heracross',['trailblaze']);
		addNewMoves('hypno',['trailblaze']);
		addNewMoves('jumpluff',['trailblaze']);
		addNewMoves('perrserker',['trailblaze']);
		addNewMoves('persian',['trailblaze']);
		addNewMoves('quagsire',['trailblaze']);
		addNewMoves('raichu',['trailblaze']);
		addNewMoves('stantler',['trailblaze']);
		addNewMoves('sudowoodo',['trailblaze']);
		addNewMoves('sunflora',['trailblaze']);
		addNewMoves('ursaring',['trailblaze']);
		addNewMoves('weavile',['trailblaze']);
		addNewMoves('wigglytuff',['trailblaze']);

		addNewMoves('azumarill',['chillingwater']);
		addNewMoves('blissey',['chillingwater']);
		addNewMoves('cloyster',['chillingwater']);
		addNewMoves('delibird',['chillingwater']);
		addNewMoves('dragonite',['chillingwater']);
		addNewMoves('glaceon',['chillingwater']);
		addNewMoves('gyarados',['chillingwater']);
		addNewMoves('pelipper',['chillingwater']);
		addNewMoves('perrserker',['chillingwater']);
		addNewMoves('persian',['chillingwater']);
		addNewMoves('quagsire',['chillingwater']);
		addNewMoves('qwilfish',['chillingwater']);
		addNewMoves('slowbro',['chillingwater']);
		addNewMoves('slowking',['chillingwater']);
		addNewMoves('slowbrogalar',['chillingwater']);
		addNewMoves('slowkinggalar',['chillingwater']);
		addNewMoves('vaporeon',['chillingwater']);
		addNewMoves('wigglytuff',['chillingwater']);

		addNewMoves('wigglytuff', ['nastyplot']);
		addNewMoves('dugtrio', ['swordsdance']);
		addNewMoves('dugtrioalola', ['swordsdance']);
		addNewMoves('golduck', ['nastyplot', "powergem"]);
		addNewMoves('primeape', ['stealthrock']);
		addNewMoves('muk', ['drainpunch', 'toxicspikes']);
		addNewMoves('mukalola', ['drainpunch']);
		addNewMoves('gengar', ['toxicspikes']);
		addNewMoves('scyther', ['closecombat']);
		addNewMoves('vaporeon', ['calmmind']);
		addNewMoves('jolteon', ['calmmind']);
		addNewMoves('flareon', ['calmmind']);
		addNewMoves('articuno', ['haze']);
		addNewMoves('articunogalar', ['tailwind']);
		addNewMoves('zapdosgalar', ['tailwind']);
		addNewMoves('moltresgalar', ['tailwind']);
		addNewMoves('dragonite', ['encore']);
		addNewMoves('mewtwo', ['earthpower', 'powergem']);

		addNewMoves('typhlosionhisui', ['focusblast', 'eruption']);
		addNewMoves('ampharos', ['dazzlinggleam']);
		addNewMoves('sudowoodo', ['spikes']);
		addNewMoves('jumpluff', ['tailwind', 'pollenpuff', 'dazzlinggleam']);
		addNewMoves('quagsire', ['spikes', 'toxicspikes', 'stealthrock']);
		addNewMoves('espeon', ['powergem']);
		addNewMoves('umbreon', ['calmmind', 'thunderwave']);
		addNewMoves('slowkinggalar', ['toxicspikes']);
		addNewMoves('forretress', ['bodypress']);
		addNewMoves('scizor', ['pounce', 'closecombat']);
		addNewMoves('tyranitar', ['powergem']);

		addNewMoves('gardevoir', ['aurasphere']);
		addNewMoves('masquerain', ['hurricane']);
		addNewMoves('sableye', ['gigadrain', 'reflect', 'lightscreen']);
		addNewMoves('honchkrow', ['uturn', 'hurricane']);
		addNewMoves('weavile', ['icespinner']);
		addNewMoves('leafeon', ['calmmind']);
		addNewMoves('weavile', ['calmmind']);
		addNewMoves('gallade', ['agility', 'sacredsword']);
	},

	hitStepBreakProtect(targets, pokemon, move) {
		if (move.breaksProtect) {
			for (const target of targets) {
				let broke = false;
				for (const effectid of ['banefulbunker', 'kingsshield', 'obstruct', 'protect', 'spikyshield']) {
					if (target.removeVolatile(effectid)) broke = true;
				}
				if (this.gen >= 6 || target.side !== pokemon.side) {
					for (const effectid of ['craftyshield', 'matblock', 'quickguard', 'wideguard']) {
						if (target.side.removeSideCondition(effectid)) broke = true;
					}
				}
				if (broke) {
					if (['feint', 'gmaxoneblow', 'gmaxrapidflow', 'hyperdrill'].includes(move.id)) {
						this.add('-activate', target, 'move: ' + move.name);
					} else {
						this.add('-activate', target, 'move: ' + move.name, '[broken]');
					}
					if (this.gen >= 6) delete target.volatiles['stall'];
				}
			}
		}
		return undefined;
	},

	hitStepMoveHitLoop(targets, pokemon, move) { // Temporary name
		const damage: (number | boolean | undefined)[] = [];
		for (const i of targets.keys()) {
			damage[i] = 0;
		}
		move.totalDamage = 0;
		pokemon.lastDamage = 0;
		let targetHits = move.multihit || 1;
		if (Array.isArray(targetHits)) {
			// yes, it's hardcoded... meh
			if (targetHits[0] === 2 && targetHits[1] === 5) {
				if (this.gen >= 5) {
					// 35-35-15-15 out of 100 for 2-3-4-5 hits
					targetHits = this.sample([2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5, 5]);
				} else {
					targetHits = this.sample([2, 2, 2, 3, 3, 3, 4, 5]);
				}
			} else {
				targetHits = this.random(targetHits[0], targetHits[1] + 1);
			}
		}
		targetHits = Math.floor(targetHits);
		let nullDamage = true;
		let moveDamage: (number | boolean | undefined)[];
		// There is no need to recursively check the ´sleepUsable´ flag as Sleep Talk can only be used while asleep.
		const isSleepUsable = move.sleepUsable || this.dex.getMove(move.sourceEffect).sleepUsable;

		let targetsCopy: (Pokemon | false | null)[] = targets.slice(0);
		let hit: number;
		for (hit = 1; hit <= targetHits; hit++) {
			if (damage.includes(false)) break;
			if (hit > 1 && pokemon.status === 'slp' && !isSleepUsable) break;
			if (targets.every(target => !target || !target.hp)) break;
			move.hit = hit;
			if (move.smartTarget && targets.length > 1) {
				targetsCopy = [targets[hit - 1]];
			} else {
				targetsCopy = targets.slice(0);
			}
			const target = targetsCopy[0]; // some relevant-to-single-target-moves-only things are hardcoded
			if (target && typeof move.smartTarget === 'boolean') {
				if (hit > 1) {
					this.addMove('-anim', pokemon, move.name, target);
				} else {
					this.retargetLastMove(target);
				}
			}

			// like this (Triple Kick)
			if (target && move.multiaccuracy && hit > 1) {
				let accuracy = move.accuracy;
				const boostTable = [1, 4 / 3, 5 / 3, 2, 7 / 3, 8 / 3, 3];
				if (accuracy !== true) {
					if (!move.ignoreAccuracy) {
						const boosts = this.runEvent('ModifyBoost', pokemon, null, null, {...pokemon.boosts});
						const boost = this.clampIntRange(boosts['accuracy'], -6, 6);
						if (boost > 0) {
							accuracy *= boostTable[boost];
						} else {
							accuracy /= boostTable[-boost];
						}
					}
					if (!move.ignoreEvasion) {
						const boosts = this.runEvent('ModifyBoost', target, null, null, {...target.boosts});
						const boost = this.clampIntRange(boosts['evasion'], -6, 6);
						if (boost > 0) {
							accuracy /= boostTable[boost];
						} else if (boost < 0) {
							accuracy *= boostTable[-boost];
						}
					}
				}
				accuracy = this.runEvent('ModifyAccuracy', target, pokemon, move, accuracy);
				if (!move.alwaysHit) {
					accuracy = this.runEvent('Accuracy', target, pokemon, move, accuracy);
					if (accuracy !== true && !this.randomChance(accuracy, 100)) break;
				}
			}

			const moveData = move;
			if (!moveData.flags) moveData.flags = {};

			// Modifies targetsCopy (which is why it's a copy)
			[moveDamage, targetsCopy] = this.spreadMoveHit(targetsCopy, pokemon, move, moveData);

			if (!moveDamage.some(val => val !== false)) break;
			nullDamage = false;

			for (const [i, md] of moveDamage.entries()) {
				// Damage from each hit is individually counted for the
				// purposes of Counter, Metal Burst, and Mirror Coat.
				damage[i] = md === true || !md ? 0 : md;
				// Total damage dealt is accumulated for the purposes of recoil (Parental Bond).
				move.totalDamage += damage[i] as number;
			}
			if (move.mindBlownRecoil) {
				this.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.dex.getEffect('Mind Blown'), true);
				move.mindBlownRecoil = false;
			}
			this.eachEvent('Update');
			if (!pokemon.hp && targets.length === 1) {
				hit++; // report the correct number of hits for multihit moves
				break;
			}
		}
		// hit is 1 higher than the actual hit count
		if (hit === 1) return damage.fill(false);
		if (nullDamage) damage.fill(false);
		if (move.multihit && typeof move.smartTarget !== 'boolean') {
			this.add('-hitcount', targets[0], hit - 1);
		}

		if (move.recoil && move.totalDamage) {
			this.damage(this.calcRecoilDamage(move.totalDamage, move), pokemon, pokemon, 'recoil');
		}

		if (move.struggleRecoil) {
			let recoilDamage;
			if (this.dex.gen >= 5) {
				recoilDamage = this.clampIntRange(Math.round(pokemon.baseMaxhp / 4), 1);
			} else {
				recoilDamage = this.trunc(pokemon.maxhp / 4);
			}
			this.directDamage(recoilDamage, pokemon, pokemon, {id: 'strugglerecoil'} as Condition);
		}

		// smartTarget messes up targetsCopy, but smartTarget should in theory ensure that targets will never fail, anyway
		if (move.smartTarget) targetsCopy = targets.slice(0);

		for (const [i, target] of targetsCopy.entries()) {
			if (target && pokemon !== target) {
				target.gotAttacked(move, damage[i] as number | false | undefined, pokemon);
				if (move.category !== 'Status') {
					target.timesAttacked += hit - 1;
				}
			}
		}

		if (move.ohko && !targets[0].hp) this.add('-ohko');

		if (!damage.some(val => !!val || val === 0)) return damage;

		this.eachEvent('Update');

		this.afterMoveSecondaryEvent(targetsCopy.filter(val => !!val) as Pokemon[], pokemon, move);

		if (!move.negateSecondary && !(move.hasSheerForce && pokemon.hasAbility('sheerforce'))) {
			for (const [i, d] of damage.entries()) {
				// There are no multihit spread moves, so it's safe to use move.totalDamage for multihit moves
				// The previous check was for `move.multihit`, but that fails for Dragon Darts
				const curDamage = targets.length === 1 ? move.totalDamage : d;
				if (typeof curDamage === 'number' && targets[i].hp) {
					const targetHPBeforeDamage = (targets[i].hurtThisTurn || 0) + curDamage;
					if (targets[i].hp <= targets[i].maxhp / 2 && targetHPBeforeDamage > targets[i].maxhp / 2) {
						this.runEvent('EmergencyExit', targets[i], pokemon);
					}
				}
			}
		}

		return damage;
	},

	// Terastal
	// taken from SV Speculative

	canMegaEvo(pokemon) {
		if (pokemon.species.isMega) return null;
		return pokemon.hpType || "Normal";
	},
	runMegaEvo(pokemon) {
		if (pokemon.species.isMega || !pokemon.canMegaEvo) return false;
		if (pokemon.illusion) {
			this.singleEvent('End', this.dex.getAbility('Illusion'), pokemon.abilityData, pokemon);
		}
		let species = this.dex.deepClone(pokemon.species);
		species.teraBoost = pokemon.species.types;
		species.teraType = pokemon.canMegaEvo; // remember that the species is Terastal
		species.types = [species.teraType];
		species.nonTeraForm = pokemon.species;
		
		// Pokémon affected by Sky Drop cannot Terastallize
		const side = pokemon.side;
		for (const foeActive of side.foe.active) {
			if (foeActive.volatiles['skydrop'] && foeActive.volatiles['skydrop'].source === pokemon) {
				return false;
			}
		}

		pokemon.formeChange(species, "Terastal", true);
		this.add('-anim', pokemon, "Cosmic Power", pokemon);
		this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		this.add('-message', `${pokemon.name} Terastallized to become ${species.types[0]}-type!`);
		pokemon.addVolatile('terastal');

		// Limit one Terastal
		for (const ally of side.pokemon) ally.canMegaEvo = null;
		return true;
	},
	runSwitch(pokemon: Pokemon) { // modified for Terastal
		if (pokemon.illusion ? pokemon.illusion.species.teraType : pokemon.species.teraType) this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		this.runEvent('Swap', pokemon);
		this.runEvent('SwitchIn', pokemon);
		if (this.gen <= 2 && !pokemon.side.faintedThisTurn && pokemon.draggedIn !== this.turn) {
			this.runEvent('AfterSwitchInSelf', pokemon);
		}
		if (!pokemon.hp) return false;
		pokemon.isStarted = true;
		if (!pokemon.fainted) {
			this.singleEvent('Start', pokemon.getAbility(), pokemon.abilityData, pokemon);
			pokemon.abilityOrder = this.abilityOrder++;
			this.singleEvent('Start', pokemon.getItem(), pokemon.itemData, pokemon);
		}
		if (this.gen === 4) {
			for (const foeActive of pokemon.side.foe.active) {
				foeActive.removeVolatile('substitutebroken');
			}
		}
		pokemon.draggedIn = null;
		return true;
	},

	pokemon: {

		setType(newType: string | string[], enforce = false) { // modded for Terastal
			// First type of Arceus, Silvally cannot be normally changed
			if (!enforce) {
				if (this.species.teraType || (this.battle.gen >= 5 && (this.species.num === 493 || this.species.num === 773)) ||
					 (this.battle.gen === 4 && this.hasAbility('multitype'))) {
					return false;
				}
			}

			if (!newType) throw new Error("Must pass type to setType");
			this.types = (typeof newType === 'string' ? [newType] : newType);
			this.addedType = '';
			this.knownType = true;
			this.apparentType = this.types.join('/');

			return true;
		},

		formeChange( // modded for Terastal
		speciesId: string | Species, source: Effect = this.battle.effect,
		 isPermanent?: boolean, message?: string
		) {
			if (this.species.teraType) console.log("teraType: " + this.species.teraType);
			let baseForm = this.battle.dex.species.get(speciesId);
			let teraSpecies = null;
			if (this.species.teraType) {
				teraSpecies = this.battle.dex.deepClone(baseForm);
				teraSpecies.teraType = this.species.teraType;
				teraSpecies.types = [teraSpecies.teraType];
				teraSpecies.teraBoost = this.battle.dex.species.get(speciesId).types;
				teraSpecies.nonTeraForm = baseForm;
			}
			const rawSpecies = teraSpecies || baseForm;
			const species = this.setSpecies(rawSpecies, source);
			if (!species) return false;

			if (this.battle.gen <= 2) return true;

			// The species the opponent sees
			const apparentSpecies =
					this.illusion ? this.illusion.species.name : species.baseSpecies;
			if (isPermanent) {
				this.baseSpecies = rawSpecies;
				this.details = species.name + (this.level === 100 ? '' : ', L' + this.level) +
					(this.gender === '' ? '' : ', ' + this.gender) + (this.set.shiny ? ', shiny' : '');
				this.battle.add('detailschange', this, (this.illusion || this).details);
				if (source.effectType === 'Item') {
					if (source.zMove) {
						this.battle.add('-burst', this, apparentSpecies, species.requiredItem);
						this.moveThisTurnResult = true; // Ultra Burst counts as an action for Truant
					} else if (source.onPrimal) {
						if (this.illusion) {
							this.ability = '';
							this.battle.add('-primal', this.illusion);
						} else {
							this.battle.add('-primal', this);
						}
					} else {
						this.battle.add('-mega', this, apparentSpecies, species.requiredItem);
						this.moveThisTurnResult = true; // Mega Evolution counts as an action for Truant
					}
				} else if (source.effectType === 'Status') {
					// Shaymin-Sky -> Shaymin
					this.battle.add('-formechange', this, species.name, message);
				}
			} else {
				if (source.effectType === 'Ability') {
					this.battle.add('-formechange', this, species.name, message, `[from] ability: ${source.name}`);
				} else {
					this.battle.add('-formechange', this, this.illusion ? this.illusion.species.name : species.name, message);
				}
			}
			
			if (source === "Terastal") return true;
			if (isPermanent && !['disguise', 'iceface'].includes(source.id)) {
				if (this.illusion) {
					this.ability = ''; // Don't allow Illusion to wear off
				}
				this.setAbility(species.abilities['0'], null, true);
				this.baseAbility = this.ability;
			}
			if (teraSpecies) this.battle.add('-start', this, 'typechange', this.types.join('/'), '[silent]');
			return true;
		}
	},

	// modifyDamage added for the Terastal Adaptability boost

	modifyDamage(
		baseDamage: number, pokemon: Pokemon, target: Pokemon, move: ActiveMove, suppressMessages = false
	) {
		const tr = this.trunc;
		if (!move.type) move.type = '???';
		const type = move.type;

		baseDamage += 2;

		// multi-target modifier (doubles only)
		if (move.spreadHit) {
			const spreadModifier = move.spreadModifier || (this.gameType === 'free-for-all' ? 0.5 : 0.75);
			this.debug('Spread modifier: ' + spreadModifier);
			baseDamage = this.modify(baseDamage, spreadModifier);
		}

		// weather modifier
		baseDamage = this.runEvent('WeatherModifyDamage', pokemon, target, move, baseDamage);

		// crit - not a modifier
		const isCrit = target.getMoveHitData(move).crit;
		if (isCrit) {
			baseDamage = tr(baseDamage * (move.critModifier || (this.gen >= 6 ? 1.5 : 2)));
		}

		// random factor - also not a modifier
		baseDamage = this.randomizer(baseDamage);

		// STAB
		if (move.forceSTAB || (type !== '???' && (pokemon.hasType(type) || pokemon.species.teraBoost?.includes(type)))) {
			// The "???" type never gets STAB
			// Not even if you Roost in Gen 4 and somehow manage to use
			// Struggle in the same turn.
			// (On second thought, it might be easier to get a MissingNo.)
			let stabBoost = 1.5;
			if (move.stab) stabBoost = move.stab;
			if (pokemon.species.teraBoost?.includes(type)) {
				if (pokemon.hasType(type)) {
					if (!suppressMessages) this.add('-message', `Terastal boosts moves of the ${type} type!`);
					stabBoost = 2;
				} else {
					this.hint(`Terastal keeps STAB on the user's original type, ${type}!`, true, pokemon.side);
					// don't reveal to the opponent (in case of Illusion)
				}
			}
			baseDamage = this.modify(baseDamage, stabBoost);
		}
		// types
		let typeMod = target.runEffectiveness(move);
		typeMod = this.clampIntRange(typeMod, -6, 6);
		target.getMoveHitData(move).typeMod = typeMod;
		if (typeMod > 0) {
			if (!suppressMessages) this.add('-supereffective', target);

			for (let i = 0; i < typeMod; i++) {
				baseDamage *= 2;
			}
		}
		if (typeMod < 0) {
			if (!suppressMessages) this.add('-resisted', target);

			for (let i = 0; i > typeMod; i--) {
				baseDamage = tr(baseDamage / 2);
			}
		}

		if (isCrit && !suppressMessages) this.add('-crit', target);

		if (pokemon.status === 'brn' && move.category === 'Physical' && !pokemon.hasAbility('guts')) {
			if (this.gen < 6 || move.id !== 'facade') {
				baseDamage = this.modify(baseDamage, 0.5);
			}
		}
		// Generation 5, but nothing later, sets damage to 1 before the final damage modifiers
		if (this.gen === 5 && !baseDamage) baseDamage = 1;

		// Final modifier. Modifiers that modify damage after min damage check, such as Life Orb.
		baseDamage = this.runEvent('ModifyDamage', pokemon, target, move, baseDamage);

		if (move.isZOrMaxPowered && target.getMoveHitData(move).zBrokeProtect) {
			baseDamage = this.modify(baseDamage, 0.25);
			this.add('-zbroken', target);
		}

		// Generation 6-7 moves the check for minimum 1 damage after the final modifier...
		if (this.gen !== 5 && !baseDamage) return 1;

		// ...but 16-bit truncation happens even later, and can truncate to 0
		return tr(baseDamage, 16);
	},
};