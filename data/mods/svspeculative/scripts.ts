const hisui = ["arcaninehisui", "avalugghisui", "basculegion", "basculegionf", "braviaryhisui", "decidueyehisui", "dialgaorigin", "electrodehisui", "enamorus", "enamorustherian", "goodrahisui", "kleavor", "lilliganthisui", "overqwil", "palkiaorigin", "samurotthisui", "sneasler", "typhlosionhisui", "ursaluna", "wyrdeer", "zoroarkhisui"]; // only fully-evolved Pokémon from Legends: Arceus

export const Scripts: ModdedBattleScriptsData = {
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['SV', 'SV (NFE)'],
		customDoublesTiers: ['SV', 'SV (NFE)'],
	},

	// Legends stuff + future speculative Fakemon

	init() {
		const cutMoves = [
			'karatechop', 'doubleslap', 'cometpunch', 'razorwind', 'Jumpkick', 'rollingkick', 'twineedle', 'sonicboom', 'dragonrage', 'meditate', 'rage', 'barrier',
			'bide', 'mirrormove', 'eggbomb', 'boneclub', 'clamp', 'spikecannon', 'constrict', 'barrage', 'bubble', 'dizzypunch', 'flash', 'psywave', 'sharpen',
			'spiderweb', 'nightmare', 'feintattack', 'foresight', 'return', 'frustration', 'magnitude', 'pursuit', 'hiddenpower', 'smellingsalts', 'assist', 'refresh',
			'snatch', 'secretpower', 'camouflage', 'mudsport', 'iceball', 'needlearm', 'odorsleuth', 'silverwind', 'grasswhistle', 'signalbeam', 'skyuppercut',
			'watersport', 'miracleeye', 'wakeupslap', 'naturalgift', 'embargo', 'trumpcard', 'healblock', 'wringout', 'luckychant', 'mefirst', 'punishment', 'mudbomb',
			'mirrorshot', 'rockclimb', 'magnetbomb', 'captivate', 'healorder', 'ominouswind', 'telekinesis', 'flameburst', 'synchronoise', 'chipaway', 'skydrop',
			'bestow', 'heartstamp', 'steamroller', 'rototiller', 'iondeluge', 'spotlight',
		];
		const galarMoves = [
			'acrobatics', 'agility', 'airslash', 'allyswitch', 'amnesia', 'assurance', 'attract', 'aurasphere', 'avalanche', 'batonpass', 'beatup', 'blazekick',
			'blizzard', 'bodypress', 'bodyslam', 'bounce', 'bravebird', 'breakingswipe', 'brickbreak', 'brine', 'brutalswing', 'bugbuzz', 'bulkup', 'bulldoze',
			'bulletseed', 'burningjealousy', 'calmmind', 'charm', 'closecombat', 'coaching', 'corrosivegas', 'cosmicpower', 'crosspoison', 'crunch', 'darkestlariat',
			'darkpulse', 'dazzlinggleam', 'dig', 'dive', 'dracometeor', 'dragonclaw', 'dragondance', 'dragonpulse', 'drainingkiss', 'drainpunch', 'drillrun',
			'dualwingbeat', 'earthpower', 'earthquake', 'eerieimpulse', 'electricterrain', 'electroball', 'electroweb', 'encore', 'endure', 'energyball',
			'expandingforce', 'facade', 'faketears', 'falseswipe', 'fireblast', 'firefang', 'firepunch', 'firespin', 'flamethrower', 'flareblitz', 'flashcannon',
			'fling', 'flipturn', 'fly', 'focusblast', 'focusenergy', 'foulplay', 'futuresight', 'gigadrain', 'gigaimpact', 'grassknot', 'grassyglide', 'grassyterrain',
			'guardswap', 'gunkshot', 'gyroball', 'hail', 'heatcrash', 'heatwave', 'heavyslam', 'helpinghand', 'hex', 'highhorsepower', 'hurricane', 'hydropump',
			'hyperbeam', 'hypervoice', 'icebeam', 'icefang', 'icepunch', 'iciclespear', 'icywind', 'imprison', 'irondefense', 'ironhead', 'irontail', 'lashout',
			'leafblade', 'leafstorm', 'leechlife', 'lightscreen', 'liquidation', 'lowkick', 'lowsweep', 'magicalleaf', 'magicroom', 'megahorn', 'megakick', 'megapunch',
			'meteorbeam', 'metronome', 'mistyexplosion', 'mistyterrain', 'muddywater', 'mudshot', 'mysticalfire', 'nastyplot', 'outrage', 'overheat', 'payback', 'payday',
			'phantomforce', 'pinmissile', 'playrough', 'poisonjab', 'pollenpuff', 'poltergeist', 'powergem', 'powerswap', 'powerwhip', 'protect', 'psychic',
			'psychicfangs', 'psychicterrain', 'psychocut', 'psyshock', 'raindance', 'razorshell', 'reflect', 'rest', 'retaliate', 'revenge', 'reversal', 'risingvoltage',
			'rockblast', 'rockslide', 'rocktomb', 'round', 'safeguard', 'sandstorm', 'sandtomb', 'scald', 'scaleshot', 'scaryface', 'scorchingsands', 'screech',
			'seedbomb', 'selfdestruct', 'shadowball', 'shadowclaw', 'skillswap', 'skittersmack', 'sleeptalk', 'sludgebomb', 'sludgewave', 'smartstrike', 'snarl', 'snore',
			'solarbeam', 'solarblade', 'speedswap', 'spikes', 'stealthrock', 'steelbeam', 'steelroller', 'steelwing', 'stompingtantrum', 'stoneedge', 'storedpower',
			'substitute', 'sunnyday', 'superpower', 'surf', 'swift', 'swordsdance', 'tailslap', 'taunt', 'terrainpulse', 'thief', 'throatchop', 'thunder', 'thunderbolt',
			'thunderfang', 'thunderpunch', 'thunderwave', 'toxicspikes', 'triattack', 'trick', 'trickroom', 'tripleaxel', 'uproar', 'uturn', 'venomdrench', 'venoshock',
			'voltswitch', 'waterfall', 'weatherball', 'whirlpool', 'wildcharge', 'willowisp', 'wonderroom', 'workup', 'xscissor', 'zenheadbutt',
		];
		for (const id in this.dataCache.Pokedex) {
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset) {
				const learnset = this.modData('Learnsets', this.toID(id)).learnset;
				for (const moveid in learnset) {
					if (cutMoves.includes(moveid)) {
						delete learnset[moveid];
					} else if (galarMoves.includes(moveid)) {
						learnset[moveid] = ['8M'];
					} else {
						let moveSource = null;
						for (const source of learnset[moveid]) {
							if (parseInt(source.charAt(0)) < 7) continue; // only recent level/Egg moves
							if (source.charAt(1) === 'L') {
								moveSource = ['8L1'];
								break; // prioritize level-up over Egg if something can be both
							}
							if (source.charAt(1) === 'E') moveSource = ['8E'];
						}
						if (moveSource) {
							learnset[moveid] = moveSource;
						} else {
							delete learnset[moveid];
						}
					}
				}
				this.modData('Learnsets', this.toID(id)).learnset.terablast = ["8M"];
			}
			const newMon = this.dataCache.Pokedex[id];
			if (!newMon) continue; // weeding out Pokémon that aren't new

			if (newMon.copyData) {
				let copyData = this.dataCache.Pokedex[this.toID(newMon.copyData)];
				if (!newMon.types && copyData.types) newMon.types = copyData.types;
				if (!newMon.baseStats && copyData.baseStats) newMon.baseStats = copyData.baseStats;
				if (!newMon.abilities && copyData.abilities) newMon.abilities = copyData.abilities;
				if (!newMon.num && copyData.num) newMon.num = copyData.num;
				if (!newMon.genderRatio && copyData.genderRatio) newMon.genderRatio = copyData.genderRatio;
				if (!newMon.heightm && copyData.heightm) newMon.heightm = copyData.heightm;
				if (!newMon.weightkg && copyData.weightkg) newMon.weightkg = copyData.weightkg;
				if (!newMon.color && copyData.color) newMon.color = copyData.color;
				if (!newMon.eggGroups && copyData.eggGroups) newMon.eggGroups = copyData.eggGroups;
			} else if (!newMon.name.startsWith('Enamorus')) continue;

			if (!this.dataCache.Learnsets[id]) continue; // just in case
			const movepoolAdditions = ["attract", "endure", "facade", "protect", "rest", "round", "sleeptalk", "snore", "substitute", "terablast"];
			for (const move of movepoolAdditions) {
				this.modData('Learnsets', this.toID(id)).learnset[this.toID(move)] = ["8M"];
			}
		}
	},

	// Pawmi

	faintMessages(lastFirst = false) {
		if (this.ended) return;
		const length = this.faintQueue.length;
		if (!length) return false;
		if (lastFirst) {
			this.faintQueue.unshift(this.faintQueue[this.faintQueue.length - 1]);
			this.faintQueue.pop();
		}
		let faintData;
		while (this.faintQueue.length) {
			faintData = this.faintQueue.shift()!;
			const pokemon: Pokemon = faintData.target;
			if (!pokemon.fainted &&
					this.runEvent('BeforeFaint', pokemon, faintData.source, faintData.effect)) {
				this.add('faint', pokemon);
				pokemon.side.pokemonLeft--;
				this.runEvent('Faint', pokemon, faintData.source, faintData.effect);
				this.singleEvent('End', pokemon.getAbility(), pokemon.abilityData, pokemon);
				pokemon.clearVolatile(false);
				pokemon.fainted = true;
				pokemon.illusion = null;
				pokemon.isActive = false;
				pokemon.isStarted = false;
				pokemon.side.faintedThisTurn = pokemon;
				pokemon.side.mostRecentKO = pokemon; // only change
			}
		}

		if (this.gen <= 1) {
			// in gen 1, fainting skips the rest of the turn
			// residuals don't exist in gen 1
			this.queue.clear();
		} else if (this.gen <= 3 && this.gameType === 'singles') {
			// in gen 3 or earlier, fainting in singles skips to residuals
			for (const pokemon of this.getAllActive()) {
				if (this.gen <= 2) {
					// in gen 2, fainting skips moves only
					this.queue.cancelMove(pokemon);
				} else {
					// in gen 3, fainting skips all moves and switches
					this.queue.cancelAction(pokemon);
				}
			}
		}

		let team1PokemonLeft = this.sides[0].pokemonLeft;
		let team2PokemonLeft = this.sides[1].pokemonLeft;
		const team3PokemonLeft = this.gameType === 'free-for-all' && this.sides[2]!.pokemonLeft;
		const team4PokemonLeft = this.gameType === 'free-for-all' && this.sides[3]!.pokemonLeft;
		if (this.gameType === 'multi') {
			team1PokemonLeft = this.sides.reduce((total, side) => total + (side.n % 2 === 0 ? side.pokemonLeft : 0), 0);
			team2PokemonLeft = this.sides.reduce((total, side) => total + (side.n % 2 === 1 ? side.pokemonLeft : 0), 0);
		}
		if (!team1PokemonLeft && !team2PokemonLeft && !team3PokemonLeft && !team4PokemonLeft) {
			this.win(faintData && this.gen > 4 ? faintData.target.side : null);
			return true;
		}
		if (!team2PokemonLeft && !team3PokemonLeft && !team4PokemonLeft) {
			this.win(this.sides[0]);
			return true;
		}
		if (!team1PokemonLeft && !team3PokemonLeft && !team4PokemonLeft) {
			this.win(this.sides[1]);
			return true;
		}
		if (!team1PokemonLeft && !team2PokemonLeft && !team4PokemonLeft) {
			this.win(this.sides[2]);
			return true;
		}
		if (!team1PokemonLeft && !team2PokemonLeft && !team3PokemonLeft) {
			this.win(this.sides[3]);
			return true;
		}

		if (faintData) {
			this.runEvent('AfterFaint', faintData.target, faintData.source, faintData.effect, length);
		}
		return false;
	},

	// Terastal

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
			let baseForm = this.battle.dex.getSpecies(speciesId);
			let teraSpecies = null;
			if (this.species.teraType) {
				teraSpecies = this.battle.dex.deepClone(baseForm);
				teraSpecies.teraType = this.species.teraType;
				teraSpecies.types = [teraSpecies.teraType];
				teraSpecies.teraBoost = this.battle.dex.getSpecies(speciesId).types;
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

	// modifyDamage added for frostbite for Hisuian Zoroark specifically, and also the Terastal Adaptability boost

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

		if (pokemon.status === 'frz' && pokemon.statusData.frostbite && move.category === 'Special') { // the only changed section
			baseDamage = this.modify(baseDamage, 0.5);
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

	// hitStepMoveHitLoop added for Loaded Dice specifically
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
				if (pokemon.hasItem('loadeddice')) {
					// average base power of 100
					targetHits = this.sample([2, 3, 3, 4, 4, 4, 5, 5, 5, 5]);
				} else if (this.gen >= 5) {
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

};
