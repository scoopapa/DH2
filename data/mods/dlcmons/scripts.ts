export const Scripts: { [k: string]: ModdedBattleScriptsData; } = {
	gen: 6,
	inherit: 'gen6',
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['Kalos OU', 'Kalos', 'Kalos Uber', 'Kalos (NFE)', 'Kalos (LC)'],
		customDoublesTiers: ['Kalos OU', 'Kalos', 'Kalos Uber', 'Kalos (NFE)', 'Kalos (LC)'],
	},
	  actions: {
	    modifyDamage(baseDamage, pokemon, target, move, suppressMessages = false) {
	      const tr = this.battle.trunc;
	      if (!move.type) move.type = '???';
	      const type = move.type;

	      baseDamage += 2;

	      if (move.spreadHit) {
	        // multi-target modifier (doubles only)
	        const spreadModifier = this.battle.gameType === 'freeforall' ? 0.5 : 0.75;
	        this.battle.debug(`Spread modifier: ${spreadModifier}`);
	        baseDamage = this.battle.modify(baseDamage, spreadModifier);
	      } else if (move.multihitType === 'parentalbond' && move.hit > 1) {
	        // Parental Bond modifier
	        const bondModifier = 0.25;
	        this.battle.debug(`Parental Bond modifier: ${bondModifier}`);
	        baseDamage = this.battle.modify(baseDamage, bondModifier);
	      } 

	      // weather modifier
	      baseDamage = this.battle.runEvent('WeatherModifyDamage', pokemon, target, move, baseDamage);

	      // crit - not a modifier
	      const isCrit = target.getMoveHitData(move).crit;
	      if (isCrit) {
	        baseDamage = tr(baseDamage * (move.critModifier || (this.battle.gen >= 6 ? 1.5 : 2)));
	      }

	      // random factor - also not a modifier
	      baseDamage = this.battle.randomizer(baseDamage);

	      // STAB
	      // The "???" type never gets STAB
	      // Not even if you Roost in Gen 4 and somehow manage to use
	      // Struggle in the same turn.
	      // (On second thought, it might be easier to get a MissingNo.)
	      if (type !== '???') {
	        let stab: number | [number, number] = 1;

	        const isSTAB = move.forceSTAB || pokemon.hasType(type) || pokemon.getTypes(false, true).includes(type);
	        if (isSTAB) {
	          stab = 1.5;
	        }

	        // The Stellar tera type makes this incredibly confusing
	        // If the move's type does not match one of the user's base types,
	        // the Stellar tera type applies a one-time 1.2x damage boost for that type.
	        //
	        // If the move's type does match one of the user's base types,
	        // then the Stellar tera type applies a one-time 2x STAB boost for that type,
	        // and then goes back to using the regular 1.5x STAB boost for those types.
	        if (pokemon.terastallized === 'Stellar') {
	          if (!pokemon.stellarBoostedTypes.includes(type) || move.stellarBoosted) {
	            stab = isSTAB ? 2 : [4915, 4096];
	            move.stellarBoosted = true;
	            if (pokemon.species.name !== 'Terapagos-Stellar') {
	              pokemon.stellarBoostedTypes.push(type);
	            }
	          }
	        } else {
	          if (pokemon.terastallized === type && pokemon.getTypes(false, true).includes(type)) {
	            stab = 2;
	          }
	          stab = this.battle.runEvent('ModifySTAB', pokemon, target, move, stab);
	        }

	        baseDamage = this.battle.modify(baseDamage, stab);
	      }

	      // types
	      let typeMod = target.runEffectiveness(move);
	      typeMod = this.battle.clampIntRange(typeMod, -6, 6);
	      target.getMoveHitData(move).typeMod = typeMod;
	      if (typeMod > 0) {
	        if (!suppressMessages) this.battle.add('-supereffective', target);

	        for (let i = 0; i < typeMod; i++) {
	          baseDamage *= 2;
	        }
	      }
	      if (typeMod < 0) {
	        if (!suppressMessages) this.battle.add('-resisted', target);

	        for (let i = 0; i > typeMod; i--) {
	          baseDamage = tr(baseDamage / 2);
	        }
	      }

	      if (isCrit && !suppressMessages) this.battle.add('-crit', target);

	      if (pokemon.status === 'brn' && move.category === 'Physical' && !pokemon.hasAbility('guts')) {
	        if (this.battle.gen < 6 || move.id !== 'facade') {
	          baseDamage = this.battle.modify(baseDamage, 0.5);
	        }
	      }

	      // Generation 5, but nothing later, sets damage to 1 before the final damage modifiers
	      if (this.battle.gen === 5 && !baseDamage) baseDamage = 1;

	      // Final modifier. Modifiers that modify damage after min damage check, such as Life Orb.
	      baseDamage = this.battle.runEvent('ModifyDamage', pokemon, target, move, baseDamage);

	      if (move.isZOrMaxPowered && target.getMoveHitData(move).zBrokeProtect) {
	        baseDamage = this.battle.modify(baseDamage, 0.25);
	        this.battle.add('-zbroken', target);
	      }

	      // Generation 6-7 moves the check for minimum 1 damage after the final modifier...
	      if (this.battle.gen !== 5 && !baseDamage) return 1;

	      // ...but 16-bit truncation happens even later, and can truncate to 0
	      return tr(baseDamage, 16);
	    },
	  },
	init() {
		// vocalstrain 
		this.modData('Learnsets', 'altaria').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'amaura').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'audino').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'aurorus').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'blissey').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'buneary').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'chansey').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'chatot').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'cinccino').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'clefable').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'clefairy').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'cleffa').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'deino').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'delcatty').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'eevee').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'espeon').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'exploud').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'flareon').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'furfrou').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'furret').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'gallade').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'gardevoir').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'girafarig').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'glaceon').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'glameow').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'granbull').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'happiny').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'heliolisk').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'herdier').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'hooh').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'hoothoot').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'houndoom').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'houndour').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'hydreigon').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'igglybuff').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'jigglypuff').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'jolteon').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'jynx').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'kirlia').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'lapras').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'leafeon').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'liepard').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'lillipup').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'linoone').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'litleo').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'lombre').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'lopunny').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'loudred').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'ludicolo').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'lugia').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'meloetta').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'meowth').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'mew').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'mightyena').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'minccino').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'misdreavus').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'mismagius').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'munchlax').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'noctowl').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'noibat').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'noivern').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'pancham').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'pangoro').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'persian').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'politoed').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'poochyena').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'purrloin').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'purugly').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'pyroar').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'ralts').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'sentret').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'skitty').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'smeargle').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'snorlax').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'snubbull').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'spinda').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'stoutland').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'swablu').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'sylveon').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'teddiursa').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'togekiss').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'togepi').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'togetic').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'tyrantrum').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'tyrunt').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'umbreon').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'ursaring').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'vaporeon').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'wailmer').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'wailord').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'whismur').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'wigglytuff').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'xerneas').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'yveltal').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'zigzagoon').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'zoroark').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'zorua').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'zweilous').learnset.vocalstrain = ['6L1'];
		this.modData('Learnsets', 'zygarde').learnset.vocalstrain = ['6L1'];
		// abadapple 
		this.modData('Learnsets', 'quilladin').learnset.abadapple = ['6L1'];
		this.modData('Learnsets', 'chesnaught').learnset.abadapple = ['6L1'];
		this.modData('Learnsets', 'simisage').learnset.abadapple = ['6L1'];
		this.modData('Learnsets', 'burmy').learnset.abadapple = ['6L1'];
		this.modData('Learnsets', 'wormadam').learnset.abadapple = ['6L1'];
		this.modData('Learnsets', 'florges').learnset.abadapple = ['6L1'];
		this.modData('Learnsets', 'roselia').learnset.abadapple = ['6L1'];
		this.modData('Learnsets', 'roserade').learnset.abadapple = ['6L1'];
		this.modData('Learnsets', 'bulbasaur').learnset.abadapple = ['6L1'];
		this.modData('Learnsets', 'ivysaur').learnset.abadapple = ['6L1'];
		this.modData('Learnsets', 'venusaur').learnset.abadapple = ['6L1'];
		this.modData('Learnsets', 'gogoat').learnset.abadapple = ['6L1'];
		this.modData('Learnsets', 'pangoro').learnset.abadapple = ['6L1'];
		this.modData('Learnsets', 'hoppip').learnset.abadapple = ['6L1'];
		this.modData('Learnsets', 'skiploom').learnset.abadapple = ['6L1'];
		this.modData('Learnsets', 'jumpluff').learnset.abadapple = ['6L1'];
		this.modData('Learnsets', 'munchlax').learnset.abadapple = ['6L1'];
		this.modData('Learnsets', 'snorlax').learnset.abadapple = ['6L1'];
		this.modData('Learnsets', 'ferroseed').learnset.abadapple = ['6L1'];
		this.modData('Learnsets', 'ferrothorn').learnset.abadapple = ['6L1'];
		this.modData('Learnsets', 'leafeon').learnset.abadapple = ['6L1'];
		this.modData('Learnsets', 'exeggutor').learnset.abadapple = ['6L1'];
		this.modData('Learnsets', 'bellsprout').learnset.abadapple = ['6L1'];
		this.modData('Learnsets', 'weepinbell').learnset.abadapple = ['6L1'];
		this.modData('Learnsets', 'victreebel').learnset.abadapple = ['6L1'];
		this.modData('Learnsets', 'murkrow').learnset.abadapple = ['6L1'];
		this.modData('Learnsets', 'honchkrow').learnset.abadapple = ['6L1'];
		this.modData('Learnsets', 'amoonguss').learnset.abadapple = ['6L1'];
		this.modData('Learnsets', 'phantump').learnset.abadapple = ['6L1'];
		this.modData('Learnsets', 'trevenant').learnset.abadapple = ['6L1'];
		this.modData('Learnsets', 'pumpkaboo').learnset.abadapple = ['6L1'];
		this.modData('Learnsets', 'gourgeist').learnset.abadapple = ['6L1'];
		this.modData('Learnsets', 'zoroark').learnset.abadapple = ['6L1'];
		this.modData('Learnsets', 'yveltal').learnset.abadapple = ['6L1'];
		this.modData('Learnsets', 'regirockkalos').learnset.abadapple = ['6L1'];
		this.modData('Learnsets', 'glimmaltis').learnset.abadapple = ['6L1'];
		// kindle 
		this.modData('Learnsets', 'chandelure').learnset.kindle = ['6L1'];
		this.modData('Learnsets', 'charizard').learnset.kindle = ['6L1'];
		this.modData('Learnsets', 'delphox').learnset.kindle = ['6L1'];
		this.modData('Learnsets', 'houndoom').learnset.kindle = ['6L1'];
		this.modData('Learnsets', 'magcargo').learnset.kindle = ['6L1'];
		this.modData('Learnsets', 'moltres').learnset.kindle = ['6L1'];
		this.modData('Learnsets', 'torkoal').learnset.kindle = ['6L1'];
		// cleansingwave 
		this.modData('Learnsets', 'lugia').learnset.cleansingwave = ['6L1'];
		this.modData('Learnsets', 'suicune').learnset.cleansingwave = ['6L1'];
		this.modData('Learnsets', 'manaphy').learnset.cleansingwave = ['6L1'];
		this.modData('Learnsets', 'phione').learnset.cleansingwave = ['6L1'];
		this.modData('Learnsets', 'corsola').learnset.cleansingwave = ['6L1'];
		this.modData('Learnsets', 'swanna').learnset.cleansingwave = ['6L1'];
		this.modData('Learnsets', 'milotic').learnset.cleansingwave = ['6L1'];
		this.modData('Learnsets', 'lapras').learnset.cleansingwave = ['6L1'];
		this.modData('Learnsets', 'politoed').learnset.cleansingwave = ['6L1'];
		this.modData('Learnsets', 'slowking').learnset.cleansingwave = ['6L1'];
		this.modData('Learnsets', 'alomomola').learnset.cleansingwave = ['6L1'];
		this.modData('Learnsets', 'masquerain').learnset.cleansingwave = ['6L1'];
		this.modData('Learnsets', 'blissey').learnset.cleansingwave = ['6L1'];
		this.modData('Learnsets', 'cinccino').learnset.cleansingwave = ['6L1'];
		this.modData('Learnsets', 'audino').learnset.cleansingwave = ['6L1'];
		this.modData('Learnsets', 'chimecho').learnset.cleansingwave = ['6L1'];
		this.modData('Learnsets', 'aromatisse').learnset.cleansingwave = ['6L1'];
		this.modData('Learnsets', 'illumise').learnset.cleansingwave = ['6L1'];
		// Slate 4
		this.modData('Learnsets', 'floatzel').learnset.block = ['6L1'];
		this.modData('Learnsets', 'floatzel').learnset.cleansingwave = ['6L1'];
		this.modData('Learnsets', 'floatzel').learnset.healpulse = ['6L1'];
		this.modData('Learnsets', 'floatzel').learnset.superpower = ['6L1'];
		this.modData('Learnsets', 'floatzel').learnset.uturn = ['6L1'];
		// jumpscare 
		this.modData('Learnsets', 'diglett').learnset.jumpscare = ['6L1'];
		this.modData('Learnsets', 'dugtrio').learnset.jumpscare = ['6L1'];
		this.modData('Learnsets', 'gastly').learnset.jumpscare = ['6L1'];
		this.modData('Learnsets', 'haunter').learnset.jumpscare = ['6L1'];
		this.modData('Learnsets', 'gengar').learnset.jumpscare = ['6L1'];
		this.modData('Learnsets', 'sudowoodo').learnset.jumpscare = ['6L1'];
		this.modData('Learnsets', 'sableye').learnset.jumpscare = ['6L1'];
		this.modData('Learnsets', 'shuppet').learnset.jumpscare = ['6L1'];
		this.modData('Learnsets', 'banette').learnset.jumpscare = ['6L1'];
		this.modData('Learnsets', 'kecleon').learnset.jumpscare = ['6L1'];
		this.modData('Learnsets', 'zorua').learnset.jumpscare = ['6L1'];
		this.modData('Learnsets', 'zoroark').learnset.jumpscare = ['6L1'];
		this.modData('Learnsets', 'hoopa').learnset.jumpscare = ['6L1'];
		this.modData('Learnsets', 'misdreavus').learnset.jumpscare = ['6L1'];
		this.modData('Learnsets', 'mismagius').learnset.jumpscare = ['6L1'];
		this.modData('Learnsets', 'darkrai').learnset.jumpscare = ['6L1'];
		this.modData('Learnsets', 'yamask').learnset.jumpscare = ['6L1'];
		// meltdown 
		this.modData('Learnsets', 'magnemite').learnset.meltdown = ['6L1'];
		this.modData('Learnsets', 'magneton').learnset.meltdown = ['6L1'];
		this.modData('Learnsets', 'magnezone').learnset.meltdown = ['6L1'];
		this.modData('Learnsets', 'lucario').learnset.meltdown = ['6L1'];
		this.modData('Learnsets', 'nosepass').learnset.meltdown = ['6L1'];
		this.modData('Learnsets', 'probopass').learnset.meltdown = ['6L1'];
		this.modData('Learnsets', 'aron').learnset.meltdown = ['6L1'];
		this.modData('Learnsets', 'lairon').learnset.meltdown = ['6L1'];
		this.modData('Learnsets', 'aggron').learnset.meltdown = ['6L1'];
		this.modData('Learnsets', 'mawile').learnset.meltdown = ['6L1'];
		this.modData('Learnsets', 'sableye').learnset.meltdown = ['6L1'];
		this.modData('Learnsets', 'steelix').learnset.meltdown = ['6L1'];
		this.modData('Learnsets', 'flygon').learnset.meltdown = ['6L1'];
		this.modData('Learnsets', 'rotom').learnset.meltdown = ['6L1'];
		this.modData('Learnsets', 'volcanion').learnset.meltdown = ['6L1'];
		// shocktail 
		this.modData('Learnsets', 'gyarados').learnset.shocktail = ['6L1'];
		this.modData('Learnsets', 'ampharos').learnset.shocktail = ['6L1'];
		this.modData('Learnsets', 'electivire').learnset.shocktail = ['6L1'];
		this.modData('Learnsets', 'luxray').learnset.shocktail = ['6L1'];
		this.modData('Learnsets', 'manectric').learnset.shocktail = ['6L1'];
		this.modData('Learnsets', 'raichu').learnset.shocktail = ['6L1'];
		this.modData('Learnsets', 'plusle').learnset.shocktail = ['6L1'];
		this.modData('Learnsets', 'minun').learnset.shocktail = ['6L1'];
		this.modData('Learnsets', 'pachirisu').learnset.shocktail = ['6L1'];
		this.modData('Learnsets', 'eelektross').learnset.shocktail = ['6L1'];
		this.modData('Learnsets', 'thundurus').learnset.shocktail = ['6L1'];
		this.modData('Learnsets', 'zekrom').learnset.shocktail = ['6L1'];
		this.modData('Learnsets', 'heliolisk').learnset.shocktail = ['6L1'];
		this.modData('Learnsets', 'dedenne').learnset.shocktail = ['6L1'];
		this.modData('Learnsets', 'ambipom').learnset.shocktail = ['6L1'];
		this.modData('Learnsets', 'dialga').learnset.shocktail = ['6L1'];
		this.modData('Learnsets', 'palkia').learnset.shocktail = ['6L1'];
		this.modData('Learnsets', 'groudon').learnset.shocktail = ['6L1'];
		this.modData('Learnsets', 'rayquaza').learnset.shocktail = ['6L1'];
		this.modData('Learnsets', 'serperior').learnset.shocktail = ['6L1'];
		this.modData('Learnsets', 'goodra').learnset.shocktail = ['6L1'];
		this.modData('Learnsets', 'emboar').learnset.shocktail = ['6L1'];
		this.modData('Learnsets', 'infernape').learnset.shocktail = ['6L1'];
		this.modData('Learnsets', 'sceptile').learnset.shocktail = ['6L1'];
		this.modData('Learnsets', 'seviper').learnset.shocktail = ['6L1'];
		this.modData('Learnsets', 'dragonite').learnset.shocktail = ['6L1'];
		this.modData('Learnsets', 'rhyperior').learnset.shocktail = ['6L1'];
		this.modData('Learnsets', 'arbok').learnset.shocktail = ['6L1'];
		this.modData('Learnsets', 'tyranitar').learnset.shocktail = ['6L1'];
		this.modData('Learnsets', 'lugia').learnset.shocktail = ['6L1'];
		this.modData('Learnsets', 'flygon').learnset.shocktail = ['6L1'];
		this.modData('Learnsets', 'rampardos').learnset.shocktail = ['6L1'];
		this.modData('Learnsets', 'milotic').learnset.shocktail = ['6L1'];
		this.modData('Learnsets', 'avalugg').learnset.shocktail = ['6L1'];
		// mindgamepunch 
		this.modData('Learnsets', 'gallade').learnset.mindgamepunch = ['6L1'];
		this.modData('Learnsets', 'mewtwo').learnset.mindgamepunch = ['6L1'];
		this.modData('Learnsets', 'mew').learnset.mindgamepunch = ['6L1'];
		this.modData('Learnsets', 'deoxys').learnset.mindgamepunch = ['6L1'];
		this.modData('Learnsets', 'hoopa').learnset.mindgamepunch = ['6L1'];
		this.modData('Learnsets', 'metagross').learnset.mindgamepunch = ['6L1'];
		this.modData('Learnsets', 'azelf').learnset.mindgamepunch = ['6L1'];
		this.modData('Learnsets', 'mesprit').learnset.mindgamepunch = ['6L1'];
		this.modData('Learnsets', 'uxie').learnset.mindgamepunch = ['6L1'];
		this.modData('Learnsets', 'hitmonchan').learnset.mindgamepunch = ['6L1'];
		this.modData('Learnsets', 'medicham').learnset.mindgamepunch = ['6L1'];
		this.modData('Learnsets', 'breloom').learnset.mindgamepunch = ['6L1'];
		this.modData('Learnsets', 'meloetta').learnset.mindgamepunch = ['6L1'];
		this.modData('Learnsets', 'electivire').learnset.mindgamepunch = ['6L1'];
		this.modData('Learnsets', 'magmortar').learnset.mindgamepunch = ['6L1'];
		this.modData('Learnsets', 'granbull').learnset.mindgamepunch = ['6L1'];
		this.modData('Learnsets', 'wigglytuff').learnset.mindgamepunch = ['6L1'];
		this.modData('Learnsets', 'cacturne').learnset.mindgamepunch = ['6L1'];
		this.modData('Learnsets', 'snorlax').learnset.mindgamepunch = ['6L1'];
		this.modData('Learnsets', 'hypno').learnset.mindgamepunch = ['6L1'];
		this.modData('Learnsets', 'grumpig').learnset.mindgamepunch = ['6L1'];
		this.modData('Learnsets', 'alakazam').learnset.mindgamepunch = ['6L1'];
		this.modData('Learnsets', 'krookodile').learnset.mindgamepunch = ['6L1'];
		this.modData('Learnsets', 'ledian').learnset.mindgamepunch = ['6L1'];
		this.modData('Learnsets', 'ledellar').learnset.mindgamepunch = ['6L1'];
		// petrify 
		this.modData('Learnsets', 'lunatone').learnset.petrify = ['6L1'];
		this.modData('Learnsets', 'solrock').learnset.petrify = ['6L1'];
		this.modData('Learnsets', 'tyranitar').learnset.petrify = ['6L1'];
		this.modData('Learnsets', 'magcargo').learnset.petrify = ['6L1'];
		this.modData('Learnsets', 'snaisland').learnset.petrify = ['6L1'];
		this.modData('Learnsets', 'aurorus').learnset.petrify = ['6L1'];
		this.modData('Learnsets', 'arceus').learnset.petrify = ['6L1'];
		this.modData('Learnsets', 'giratina').learnset.petrify = ['6L1'];
		this.modData('Learnsets', 'omastar').learnset.petrify = ['6L1'];
		this.modData('Learnsets', 'archeops').learnset.petrify = ['6L1'];
		this.modData('Learnsets', 'probopass').learnset.petrify = ['6L1'];
		this.modData('Learnsets', 'corsola').learnset.petrify = ['6L1'];
		this.modData('Learnsets', 'arbok').learnset.petrify = ['6L1'];
		this.modData('Learnsets', 'seviper').learnset.petrify = ['6L1'];
		this.modData('Learnsets', 'dunsparce').learnset.petrify = ['6L1'];
		this.modData('Learnsets', 'mismagius').learnset.petrify = ['6L1'];
		this.modData('Learnsets', 'delphox').learnset.petrify = ['6L1'];
		this.modData('Learnsets', 'beheeyem').learnset.petrify = ['6L1'];
		this.modData('Learnsets', 'hydreigon').learnset.petrify = ['6L1'];
		this.modData('Learnsets', 'yveltal').learnset.petrify = ['6L1'];
		this.modData('Learnsets', 'jynx').learnset.petrify = ['6L1'];
		// slate 6
		this.modData('Learnsets', 'dusknoir').learnset.thunderbolt = ['6L1'];
		this.modData('Learnsets', 'dusknoir').learnset.thunder = ['6L1'];
		this.modData('Learnsets', 'dusknoir').learnset.flamethrower = ['6L1'];
		this.modData('Learnsets', 'dusknoir').learnset.fireblast = ['6L1'];
		this.modData('Learnsets', 'dusknoir').learnset.slackoff = ['6L1'];
		this.modData('Learnsets', 'klinklang').learnset.bulldoze = ['6L1'];
		this.modData('Learnsets', 'luxray').learnset.agility = ['6L1'];
		this.modData('Learnsets', 'luxray').learnset.jumpscare = ['6L1'];
		// slate 7
		this.modData('Learnsets', 'wigglytuff').learnset.moonblast = ['6L1'];
		// slate 8
	    delete this.modData('Learnsets', 'torchic').learnset.swordsdance;
	    delete this.modData('Learnsets', 'combusken').learnset.swordsdance;
	    delete this.modData('Learnsets', 'blaziken').learnset.swordsdance;
		this.modData('Learnsets', 'blaziken').learnset.defog = ['6L1'];
		this.modData('Learnsets', 'blaziken').learnset.uturn = ['6L1'];
	    delete this.modData('Learnsets', 'kangaskhan').learnset.seismictoss;
	},
};
