export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	actions: {
		inherit: true,
		hitStepAccuracy(targets, pokemon, move) {
			const hitResults = [];
			for (const [i, target] of targets.entries()) {
				this.battle.activeTarget = target;
				// calculate true accuracy
				let accuracy = move.accuracy;
				if (move.ohko) { // bypasses accuracy modifiers
					if (!target.isSemiInvulnerable()) {
						accuracy = 30;
						if (move.ohko === 'Ice' && this.gen >= 7 && !pokemon.hasType('Ice')) {
							accuracy = 20;
						}
						if (!target.volatiles['dynamax'] && pokemon.level >= target.level &&
							(move.ohko === true || !target.hasType(move.ohko))) {
							accuracy += (pokemon.level - target.level);
						} else {
							this.battle.add('-immune', target, '[ohko]');
							hitResults[i] = false;
							continue;
						}
					}
				} else {
					const boostTable = [1, 4 / 3, 5 / 3, 2, 7 / 3, 8 / 3, 3];
	
					let boosts;
					let boost!: number;
					if (accuracy !== true) {
						if (!move.ignoreAccuracy) {
							boosts = this.battle.runEvent('ModifyBoost', pokemon, null, null, {...pokemon.boosts});
							boost = this.battle.clampIntRange(boosts['accuracy'], -6, 6);
							if (boost > 0) {
								accuracy *= boostTable[boost];
							} else {
								accuracy /= boostTable[-boost];
							}
						}
						if (!move.ignoreEvasion) {
							boosts = this.battle.runEvent('ModifyBoost', target, null, null, {...target.boosts});
							boost = this.battle.clampIntRange(boosts['evasion'], -6, 6);
							if (boost > 0) {
								accuracy /= boostTable[boost];
							} else if (boost < 0) {
								accuracy *= boostTable[-boost];
							}
						}
					}
					accuracy = this.battle.runEvent('ModifyAccuracy', target, pokemon, move, accuracy);
				}
				if (move.alwaysHit || (move.id === 'toxic' && this.gen >= 6 && pokemon.hasType('Poison'))) {
					accuracy = true; // bypasses ohko accuracy modifiers
				} else {
					accuracy = this.battle.runEvent('Accuracy', target, pokemon, move, accuracy);
				}
				if (accuracy !== true && !this.battle.randomChance(accuracy, 100)) {
					if (move.smartTarget) {
						move.smartTarget = false;
					} else {
						if (!move.spreadHit) this.battle.attrLastMove('[miss]');
						this.battle.add('-miss', pokemon, target);
					}
					if (!move.ohko && pokemon.hasItem('blunderpolicy') && pokemon.useItem()) {
							this.battle.boost({accuracy: 2, spe: 2}, pokemon);
					}
					hitResults[i] = false;
					continue;
				}
				hitResults[i] = true;
			}
			return hitResults;
		},
	},
	pokemon: {
		ignoringAbility() {
			let neutralizinggas = false;
			for (const pokemon of this.battle.getAllActive()) {
				if (pokemon.ability === ('neutralizinggas' as ID) ||
					(
						pokemon.ability === ('powerofalchemyweezing' as ID) &&
						!pokemon.volatiles['gastroacid'] &&
						!pokemon.volatiles['counteract'] &&
						!pokemon.abilityState.ending
					)
				) {
					neutralizinggas = true;
					break;
				}
			}
			return !!(
				(this.battle.gen >= 5 && !this.isActive) ||
				((this.volatiles['gastroacid'] || this.volatiles['counteract'] || (neutralizinggas && this.ability !== ('neutralizinggas' as ID)))
				&& !this.getAbility().isPermanent)
			);
		},
	},
	init() {
		this.modData("Learnsets", "screamtail").learnset.dracometeor = ["9L1"];
		this.modData("Learnsets", "screamtail").learnset.dragonpulse = ["9L1"];
		this.modData("Learnsets", "screamtail").learnset.knockoff = ["9L1"];
		this.modData("Learnsets", "screamtail").learnset.nastyplot = ["9L1"];
		this.modData("Learnsets", "screamtail").learnset.outrage = ["9L1"];
		this.modData("Learnsets", "screamtail").learnset.superfang = ["9L1"];
		this.modData("Learnsets", "crabominable").learnset.jetpunch = ["9L1"];
		this.modData("Learnsets", "crabominable").learnset.bulletpunch = ["9L1"];
		this.modData("Learnsets", "crabominable").learnset.machpunch = ["9L1"];
		this.modData("Learnsets", "crabominable").learnset.hammerarm = ["9L1"];
		this.modData("Learnsets", "crabominable").learnset.knockoff = ["9L1"];
		this.modData("Learnsets", "crabominable").learnset.slackoff = ["9L1"];
		this.modData("Learnsets", "crabominable").learnset.swordsdance = ["9L1"];
		this.modData("Learnsets", "revavroom").learnset.magicaltorque = ["9L1"];
		this.modData("Learnsets", "revavroom").learnset.wickedtorque = ["9L1"];
		this.modData("Learnsets", "revavroom").learnset.blazingtorque = ["9L1"];
		this.modData("Learnsets", "revavroom").learnset.combattorque = ["9L1"];
		this.modData("Learnsets", "revavroom").learnset.noxioustorque = ["9L1"];
		this.modData("Learnsets", "revavroom").learnset.highhorsepower = ["9L1"];
		this.modData("Learnsets", "toxapex").learnset.bodypress = ["9L1"];
		this.modData("Learnsets", "toxapex").learnset.darkpulse = ["9L1"];
		this.modData("Learnsets", "toxapex").learnset.crunch = ["9L1"];
		this.modData("Learnsets", "toxapex").learnset.knockoff = ["9L1"];
		this.modData("Learnsets", "toxapex").learnset.nastyplot = ["9L1"];
		this.modData("Learnsets", "toxapex").learnset.superfang = ["9L1"];
		this.modData("Learnsets", "toxapex").learnset.taunt = ["9L1"];
		this.modData('Learnsets', 'sneasler').learnset.direclaw = ['9L1'];
		this.modData('Learnsets', 'skuntank').learnset.direclaw = ['9L1'];
		this.modData('Learnsets', 'salazzle').learnset.direclaw = ['9L1'];
		this.modData('Learnsets', 'eternatus').learnset.direclaw = ['9L1'];
		this.modData('Learnsets', 'grafaiai').learnset.direclaw = ['9L1'];
		this.modData('Learnsets', 'magnemite').learnset.electroweb = ['9L1'];
		this.modData('Learnsets', 'mareep').learnset.electroweb = ['9L1'];
		this.modData('Learnsets', 'spidops').learnset.electroweb = ['9L1'];
		this.modData('Learnsets', 'surskit').learnset.electroweb = ['9L1'];
		this.modData('Learnsets', 'pichu').learnset.electroweb = ['9L1'];
		this.modData('Learnsets', 'raichualola').learnset.electroweb = ['9L1'];
		this.modData('Learnsets', 'samurotthisui').learnset.ceaselessedge = ['9L1'];
		this.modData('Learnsets', 'cacturne').learnset.ceaselessedge = ['9L1'];
		this.modData('Learnsets', 'houndoom').learnset.ceaselessedge = ['9L1'];
		this.modData('Learnsets', 'weavile').learnset.ceaselessedge = ['9L1'];
		this.modData('Learnsets', 'lokix').learnset.ceaselessedge = ['9L1'];
		this.modData('Learnsets', 'carbink').learnset.meteorbeam = ['9L1'];
		this.modData('Learnsets', 'delphox').learnset.meteorbeam = ['9L1'];
		this.modData('Learnsets', 'diancie').learnset.meteorbeam = ['9L1'];
		this.modData('Learnsets', 'glimmora').learnset.meteorbeam = ['9L1'];
		this.modData('Learnsets', 'sandyshocks').learnset.meteorbeam = ['9L1'];
		this.modData('Learnsets', 'coalossal').learnset.meteorbeam = ['9L1'];
		this.modData('Learnsets', 'stonjourner').learnset.meteorbeam = ['9L1'];
		this.modData('Learnsets', 'mismagius').learnset.meteorbeam = ['9L1'];
		this.modData('Learnsets', 'espeon').learnset.meteorbeam = ['9L1'];
		this.modData('Learnsets', 'rabsca').learnset.meteorbeam = ['9L1'];
		this.modData('Learnsets', 'bronzong').learnset.meteorbeam = ['9L1'];
		this.modData('Learnsets', 'grumpig').learnset.meteorbeam = ['9L1'];
		this.modData('Learnsets', 'rayquaza').learnset.meteorbeam = ['9L1'];
		this.modData('Learnsets', 'eternatus').learnset.meteorbeam = ['9L1'];
		this.modData('Learnsets', 'corviknight').learnset.skullbash = ['9L1'];
		this.modData('Learnsets', 'irontreads').learnset.skullbash = ['9L1'];
		this.modData('Learnsets', 'forretress').learnset.skullbash = ['9L1'];
		this.modData('Learnsets', 'orthworm').learnset.skullbash = ['9L1'];
		this.modData('Learnsets', 'cufant').learnset.skullbash = ['9L1'];
		this.modData('Learnsets', 'varoom').learnset.skullbash = ['9L1'];
		this.modData('Learnsets', 'perrserker').learnset.skullbash = ['9L1'];
		this.modData('Learnsets', 'sudowoodo').learnset.skullbash = ['9L1'];
		this.modData('Learnsets', 'chewtle').learnset.skullbash = ['9L1'];
		this.modData('Learnsets', 'hawlucha').learnset.skullbash = ['9L1'];
		this.modData('Learnsets', 'tauros').learnset.skullbash = ['9L1'];
		this.modData('Learnsets', 'taurospaldeacombat').learnset.skullbash = ['9L1'];
		this.modData('Learnsets', 'taurospaldeablaze').learnset.skullbash = ['9L1'];
		this.modData('Learnsets', 'taurospaldeaaqua').learnset.skullbash = ['9L1'];
		this.modData('Learnsets', 'sandaconda').learnset.skullbash = ['9L1'];
		this.modData('Learnsets', 'bergmite').learnset.skullbash = ['9L1'];
		this.modData('Learnsets', 'dugtrioalola').learnset.skullbash = ['9L1'];
		this.modData('Learnsets', 'dialga').learnset.skullbash = ['9L1'];
		this.modData('Learnsets', 'sliggoohisui').learnset.shelter = ['9L1'];
		this.modData('Learnsets', 'chewtle').learnset.shelter = ['9L1'];
		this.modData('Learnsets', 'shellder').learnset.shelter = ['9L1'];
		this.modData('Learnsets', 'samurott').learnset.shelter = ['9L1'];
		this.modData('Learnsets', 'klawf').learnset.shelter = ['9L1'];
		this.modData('Learnsets', 'torkoal').learnset.shelter = ['9L1'];
		this.modData('Learnsets', 'chesnaught').learnset.shelter = ['9L1'];
		this.modData('Learnsets', 'pineco').learnset.shelter = ['9L1'];
		this.modData('Learnsets', 'slowbro').learnset.shelter = ['9L1'];
		this.modData('Learnsets', 'slowbrogalar').learnset.shelter = ['9L1'];
		this.modData('Learnsets', 'sinistea').learnset.shelter = ['9L1'];
		this.modData('Learnsets', 'kleavor').learnset.stoneaxe = ['9L1'];
		this.modData('Learnsets', 'klawf').learnset.stoneaxe = ['9L1'];
		this.modData('Learnsets', 'avalugghisui').learnset.stoneaxe = ['9L1'];
		this.modData('Learnsets', 'drednaw').learnset.stoneaxe = ['9L1'];
    	delete this.modData('Learnsets', 'regieleki').learnset.electroweb;
    	delete this.modData('Learnsets', 'meloetta').learnset.sing;
		this.modData("Learnsets", "bellibolt").learnset.surf = ["9L1"];
		this.modData("Learnsets", "bellibolt").learnset.hydropump = ["9L1"];
		this.modData("Learnsets", "bellibolt").learnset.liquidation = ["9L1"];
		this.modData("Learnsets", "bellibolt").learnset.flipturn = ["9L1"];
		this.modData("Learnsets", "bellibolt").learnset.icebeam = ["9L1"];
		this.modData("Learnsets", "bellibolt").learnset.earthpower = ["9L1"];
		this.modData("Learnsets", "decidueye").learnset.poltergeist = ["9L1"];
		this.modData("Learnsets", "decidueyehisui").learnset.poltergeist = ["9L1"];
		this.modData("Learnsets", "magnemite").learnset.rapidspin = ["9L1"];
		this.modData('Learnsets', 'azelf').learnset.healingstones = ['9L1'];
		this.modData('Learnsets', 'mesprit').learnset.healingstones = ['9L1'];
		this.modData('Learnsets', 'uxie').learnset.healingstones = ['9L1'];
		this.modData('Learnsets', 'carbink').learnset.healingstones = ['9L1'];
		this.modData('Learnsets', 'diancie').learnset.healingstones = ['9L1'];
		this.modData('Learnsets', 'mew').learnset.healingstones = ['9L1'];
		this.modData('Learnsets', 'dunsparce').learnset.healingstones = ['9L1'];
		this.modData('Learnsets', 'hatenna').learnset.healingstones = ['9L1'];
		this.modData('Learnsets', 'gardevoir').learnset.healingstones = ['9L1'];
		this.modData('Learnsets', 'sylveon').learnset.healingstones = ['9L1'];
		this.modData('Learnsets', 'espeon').learnset.healingstones = ['9L1'];
		this.modData('Learnsets', 'bronzor').learnset.healingstones = ['9L1'];
		this.modData('Learnsets', 'spoink').learnset.healingstones = ['9L1'];
		this.modData('Learnsets', 'rabsca').learnset.healingstones = ['9L1'];
		this.modData('Learnsets', 'sableye').learnset.healingstones = ['9L1'];
		this.modData('Learnsets', 'misdreavus').learnset.healingstones = ['9L1'];
		this.modData('Learnsets', 'golduck').learnset.healingstones = ['9L1'];
		this.modData('Learnsets', 'vespiquen').learnset.healingstones = ['9L1'];
		this.modData('Learnsets', 'stonjourner').learnset.healingstones = ['9L1'];
		this.modData('Learnsets', 'forretress').learnset.shrapnelshot = ['9L1'];
		this.modData('Learnsets', 'heatran').learnset.shrapnelshot = ['9L1'];
		this.modData('Learnsets', 'ironthorns').learnset.shrapnelshot = ['9L1'];
		this.modData('Learnsets', 'irontreads').learnset.shrapnelshot = ['9L1'];
		this.modData('Learnsets', 'corviknight').learnset.shrapnelshot = ['9L1'];
		this.modData('Learnsets', 'glimmora').learnset.shrapnelshot = ['9L1'];
		this.modData('Learnsets', 'magnezone').learnset.shrapnelshot = ['9L1'];
		this.modData('Learnsets', 'coalossal').learnset.shrapnelshot = ['9L1'];
		this.modData('Learnsets', 'klefki').learnset.shrapnelshot = ['9L1'];
		this.modData('Learnsets', 'heracross').learnset.shrapnelshot = ['9L1'];
		this.modData('Learnsets', 'shellder').learnset.shrapnelshot = ['9L1'];
		this.modData('Learnsets', 'scizor').learnset.shrapnelshot = ['9L1'];
		this.modData('Learnsets', 'cufant').learnset.shrapnelshot = ['9L1'];
		this.modData('Learnsets', 'varoom').learnset.shrapnelshot = ['9L1'];
		this.modData('Learnsets', 'magearna').learnset.shrapnelshot = ['9L1'];
		this.modData('Learnsets', 'finizen').learnset.lifedew = ['9L1'];
		this.modData('Learnsets', 'vaporeon').learnset.lifedew = ['9L1'];
		this.modData('Learnsets', 'veluza').learnset.lifedew = ['9L1'];
		this.modData('Learnsets', 'azurill').learnset.lifedew = ['9L1'];
		this.modData('Learnsets', 'wochien').learnset.junglehealing = ['9L1'];
		this.modData('Learnsets', 'tsareena').learnset.junglehealing = ['9L1'];
		this.modData('Learnsets', 'rillaboom').learnset.junglehealing = ['9L1'];
		this.modData('Learnsets', 'brutebonnet').learnset.junglehealing = ['9L1'];
		this.modData('Learnsets', 'lurantis').learnset.junglehealing = ['9L1'];
		this.modData('Learnsets', 'tropius').learnset.junglehealing = ['9L1'];
		this.modData('Learnsets', 'spidops').learnset.choke = ['9L1'];
		this.modData('Learnsets', 'pawmot').learnset.choke = ['9L1'];
		this.modData('Learnsets', 'gallade').learnset.choke = ['9L1'];
		this.modData('Learnsets', 'gengar').learnset.choke = ['9L1'];
		this.modData('Learnsets', 'tsareena').learnset.choke = ['9L1'];
		this.modData('Learnsets', 'breloom').learnset.choke = ['9L1'];
		this.modData('Learnsets', 'hariyama').learnset.choke = ['9L1'];
		this.modData('Learnsets', 'drifblim').learnset.choke = ['9L1'];
		this.modData('Learnsets', 'primeape').learnset.choke = ['9L1'];
		this.modData('Learnsets', 'medicham').learnset.choke = ['9L1'];
		this.modData('Learnsets', 'ceruledge').learnset.choke = ['9L1'];
		this.modData('Learnsets', 'lucario').learnset.choke = ['9L1'];
		this.modData('Learnsets', 'goodra').learnset.choke = ['9L1'];
		this.modData('Learnsets', 'toxicroak').learnset.choke = ['9L1'];
		this.modData('Learnsets', 'dunsparce').learnset.choke = ['9L1'];
		this.modData('Learnsets', 'muk').learnset.choke = ['9L1'];
		this.modData('Learnsets', 'mukalola').learnset.choke = ['9L1'];
		this.modData('Learnsets', 'seviper').learnset.choke = ['9L1'];
		this.modData('Learnsets', 'zoroarkhisui').learnset.choke = ['9L1'];
		this.modData('Learnsets', 'mimikyu').learnset.choke = ['9L1'];
		this.modData('Learnsets', 'brambleghast').learnset.choke = ['9L1'];
		this.modData('Learnsets', 'toedscool').learnset.choke = ['9L1'];
		this.modData('Learnsets', 'heracross').learnset.choke = ['9L1'];
		this.modData('Learnsets', 'silicobra').learnset.choke = ['9L1'];
		this.modData('Learnsets', 'wiglett').learnset.choke = ['9L1'];
		this.modData('Learnsets', 'sableye').learnset.choke = ['9L1'];
		this.modData('Learnsets', 'banette').learnset.choke = ['9L1'];
		this.modData('Learnsets', 'hawlucha').learnset.choke = ['9L1'];
		this.modData('Learnsets', 'spiritomb').learnset.choke = ['9L1'];
		this.modData('Learnsets', 'houndstone').learnset.choke = ['9L1'];
		this.modData('Learnsets', 'passimian').learnset.choke = ['9L1'];
		this.modData('Learnsets', 'eelektross').learnset.choke = ['9L1'];
		this.modData('Learnsets', 'wochien').learnset.choke = ['9L1'];
		this.modData('Learnsets', 'chesnaught').learnset.choke = ['9L1'];
		this.modData('Learnsets', 'basculegion').learnset.choke = ['9L1'];
		this.modData('Learnsets', 'gholdengo').learnset.choke = ['9L1'];
		this.modData('Learnsets', 'hoopa').learnset.choke = ['9L1'];
		this.modData('Learnsets', 'sandygast').learnset.choke = ['9L1'];
		this.modData('Learnsets', 'crabrawler').learnset.stormthrow = ['9L1'];
		this.modData('Learnsets', 'hariyama').learnset.stormthrow = ['9L1'];
		this.modData('Learnsets', 'spidops').learnset.stormthrow = ['9L1'];
		this.modData('Learnsets', 'passimian').learnset.stormthrow = ['9L1'];
		this.modData('Learnsets', 'hawlucha').learnset.stormthrow = ['9L1'];
		this.modData('Learnsets', 'pawmot').learnset.stormthrow = ['9L1'];
		this.modData('Learnsets', 'medicham').learnset.stormthrow = ['9L1'];
		this.modData('Learnsets', 'chesnaught').learnset.stormthrow = ['9L1'];
		this.modData('Learnsets', 'tornadus').learnset.stormthrow = ['9L1'];
		this.modData('Learnsets', 'thundurus').learnset.stormthrow = ['9L1'];
		this.modData('Learnsets', 'landorus').learnset.stormthrow = ['9L1'];
		this.modData('Learnsets', 'enamorus').learnset.stormthrow = ['9L1'];
		this.modData('Learnsets', 'stonjourner').learnset.stormthrow = ['9L1'];
		this.modData('Learnsets', 'kubfu').learnset.stormthrow = ['9L1'];
		this.modData('Learnsets', 'lilliganthisui').learnset.stormthrow = ['9L1'];
		this.modData('Learnsets', 'glaceon').learnset.frostbreath = ['9L1'];
		this.modData('Learnsets', 'shellder').learnset.frostbreath = ['9L1'];
		this.modData('Learnsets', 'delibird').learnset.frostbreath = ['9L1'];
		this.modData('Learnsets', 'ironbundle').learnset.frostbreath = ['9L1'];
		this.modData('Learnsets', 'chienpao').learnset.frostbreath = ['9L1'];
		this.modData('Learnsets', 'clawitzer').learnset.snipeshot = ['9L1'];
		this.modData('Learnsets', 'sneasel').learnset.falsesurrender = ['9L1'];
		this.modData('Learnsets', 'stunky').learnset.falsesurrender = ['9L1'];
		this.modData('Learnsets', 'maschiff').learnset.falsesurrender = ['9L1'];
		this.modData('Learnsets', 'murkrow').learnset.falsesurrender = ['9L1'];
		this.modData('Learnsets', 'zarude').learnset.falsesurrender = ['9L1'];
		this.modData('Learnsets', 'zoroark').learnset.falsesurrender = ['9L1'];
		this.modData('Learnsets', 'greninja').learnset.falsesurrender = ['9L1'];
		this.modData('Learnsets', 'greninjabond').learnset.falsesurrender = ['9L1'];
		this.modData('Learnsets', 'kricketune').learnset.cuttingremark = ['9L1'];
		this.modData('Learnsets', 'gallade').learnset.cuttingremark = ['9L1'];
		this.modData('Learnsets', 'squawkabilly').learnset.cuttingremark = ['9L1'];
		this.modData('Learnsets', 'meditite').learnset.cuttingremark = ['9L1'];
		this.modData('Learnsets', 'toxtricity').learnset.cuttingremark = ['9L1'];
		this.modData('Learnsets', 'zangoose').learnset.cuttingremark = ['9L1'];
		this.modData('Learnsets', 'scyther').learnset.cuttingremark = ['9L1'];
		this.modData('Learnsets', 'veluza').learnset.cuttingremark = ['9L1'];
		this.modData('Learnsets', 'ironleaves').learnset.cuttingremark = ['9L1'];
		this.modData('Learnsets', 'hoopa').learnset.cuttingremark = ['9L1'];
		this.modData('Learnsets', 'calyrex').learnset.cuttingremark = ['9L1'];
		this.modData('Learnsets', 'meloetta').learnset.cuttingremark = ['9L1'];
		this.modData('Learnsets', 'articunogalar').learnset.cuttingremark = ['9L1'];
		this.modData('Learnsets', 'azelf').learnset.cuttingremark = ['9L1'];
		this.modData('Learnsets', 'toxtricitylowkey').learnset.cuttingremark = ['9L1'];
		this.modData("Learnsets", "gengar").learnset.fakeout = ["9L1"];
		this.modData("Learnsets", "gengar").learnset.knockoff = ["9L1"];
		this.modData("Learnsets", "gengar").learnset.moonblast = ["9L1"];
		this.modData("Learnsets", "gengar").learnset.moonlight = ["9L1"];
		this.modData("Learnsets", "gengar").learnset.shadowsneak = ["9L1"];
		this.modData("Learnsets", "gengar").learnset.sludgewave = ["9L1"];
		this.modData("Learnsets", "meloetta").learnset.aurasphere = ["9L1"];
		this.modData("Learnsets", "meloetta").learnset.axekick = ["9L1"];
		this.modData("Learnsets", "meloetta").learnset.blazekick = ["9L1"];
		this.modData("Learnsets", "meloetta").learnset.healbell = ["9L1"];
		this.modData("Learnsets", "meloetta").learnset.megakick = ["9L1"];
		this.modData("Learnsets", "meloetta").learnset.rapidspin = ["9L1"];
		this.modData("Learnsets", "meloetta").learnset.recover = ["9L1"];
		this.modData("Learnsets", "meloetta").learnset.vacuumwave = ["9L1"];
		this.modData("Learnsets", "pyroar").learnset.scorchingsands = ["9L1"];
		this.modData("Learnsets", "pyroar").learnset.earthpower = ["9L1"];
		this.modData("Learnsets", "pyroar").learnset.morningsun = ["9L1"];
		this.modData("Learnsets", "pyroar").learnset.grassknot = ["9L1"];
		this.modData("Learnsets", "vespiquen").learnset.gunkshot = ["9L1"];
		this.modData("Learnsets", "vespiquen").learnset.poisonjab = ["9L1"];
		this.modData("Learnsets", "vespiquen").learnset.barbbarrage = ["9L1"];
		this.modData("Learnsets", "vespiquen").learnset.poisonfang = ["9L1"];
		this.modData("Learnsets", "vespiquen").learnset.sludgewave = ["9L1"];
		this.modData("Learnsets", "vespiquen").learnset.acidarmor = ["9L1"];
		this.modData("Learnsets", "vespiquen").learnset.bodypress = ["9L1"];
		this.modData("Learnsets", "vespiquen").learnset.dualwingbeat = ["9L1"];
		this.modData("Learnsets", "vespiquen").learnset.defog = ["9L1"];
		this.modData("Learnsets", "vespiquen").learnset.whirlwind = ["9L1"];
		this.modData('Learnsets', 'tropius').learnset.defog = ['9L1'];
		this.modData('Learnsets', 'vivillon').learnset.defog = ['9L1'];
		this.modData('Learnsets', 'articuno').learnset.defog = ['9L1'];
		this.modData('Learnsets', 'articunogalar').learnset.defog = ['9L1'];
		this.modData('Learnsets', 'moltres').learnset.defog = ['9L1'];
		this.modData('Learnsets', 'moltresgalar').learnset.defog = ['9L1'];
		this.modData('Learnsets', 'thundurus').learnset.defog = ['9L1'];
		this.modData('Learnsets', 'gyarados').learnset.defog = ['9L1'];
		this.modData('Learnsets', 'salamence').learnset.defog = ['9L1'];
		this.modData('Learnsets', 'florges').learnset.defog = ['9L1'];
		this.modData('Learnsets', 'kilowattrel').learnset.defog = ['9L1'];
		this.modData('Learnsets', 'dudunsparce').learnset.defog = ['9L1'];
		this.modData('Learnsets', 'espathra').learnset.defog = ['9L1'];
		this.modData('Learnsets', 'tinkatink').learnset.defog = ['9L1'];
		this.modData('Learnsets', 'arceus').learnset.defog = ['9L1'];
		this.modData('Learnsets', 'squawkabilly').learnset.defog = ['9L1'];
		this.modData('Learnsets', 'bombirdier').learnset.defog = ['9L1'];
		this.modData('Learnsets', 'pawmi').learnset.chainlightning = ['9L1'];
		this.modData('Learnsets', 'pichu').learnset.chainlightning = ['9L1'];
		this.modData('Learnsets', 'raichualola').learnset.chainlightning = ['9L1'];
		this.modData('Learnsets', 'shinx').learnset.chainlightning = ['9L1'];
		this.modData('Learnsets', 'toxtricity').learnset.chainlightning = ['9L1'];
		this.modData('Learnsets', 'toxtricitylowkey').learnset.chainlightning = ['9L1'];
		this.modData('Learnsets', 'eelektrik').learnset.chainlightning = ['9L1'];
		this.modData('Learnsets', 'ironhands').learnset.chainlightning = ['9L1'];
		this.modData('Learnsets', 'ironthorns').learnset.chainlightning = ['9L1'];
		this.modData('Learnsets', 'thundurus').learnset.chainlightning = ['9L1'];
		this.modData('Learnsets', 'jolteon').learnset.chainlightning = ['9L1'];
		this.modData('Learnsets', 'grimer').learnset.hazardouswaste = ['9L1'];
		this.modData('Learnsets', 'grimeralola').learnset.hazardouswaste = ['9L1'];
		this.modData('Learnsets', 'glimmet').learnset.hazardouswaste = ['9L1'];
		this.modData('Learnsets', 'gengar').learnset.hazardouswaste = ['9L1'];
		this.modData('Learnsets', 'slowbrogalar').learnset.hazardouswaste = ['9L1'];
		this.modData('Learnsets', 'skrelp').learnset.hazardouswaste = ['9L1'];
		this.modData('Learnsets', 'stunky').learnset.hazardouswaste = ['9L1'];
		this.modData('Learnsets', 'shroodle').learnset.hazardouswaste = ['9L1'];
		this.modData('Learnsets', 'gulpin').learnset.hazardouswaste = ['9L1'];
		this.modData('Learnsets', 'croagunk').learnset.hazardouswaste = ['9L1'];
		this.modData('Learnsets', 'fletchling').learnset.pluck = ['9L1'];
		this.modData('Learnsets', 'starly').learnset.pluck = ['9L1'];
		this.modData('Learnsets', 'squawkabilly').learnset.pluck = ['9L1'];
		this.modData('Learnsets', 'murkrow').learnset.pluck = ['9L1'];
		this.modData('Learnsets', 'eiscue').learnset.pluck = ['9L1'];
		this.modData('Learnsets', 'flamigo').learnset.pluck = ['9L1'];
		this.modData('Learnsets', 'rufflet').learnset.pluck = ['9L1'];
		this.modData('Learnsets', 'wingull').learnset.pluck = ['9L1'];
		this.modData('Learnsets', 'delibird').learnset.pluck = ['9L1'];
		this.modData('Learnsets', 'arrokuda').learnset.pluck = ['9L1'];
		this.modData('Learnsets', 'toedscruel').learnset.pluck = ['9L1'];
		this.modData('Learnsets', 'tornadus').learnset.windbreaker = ['9L1'];
		this.modData('Learnsets', 'moltres').learnset.windbreaker = ['9L1'];
		this.modData('Learnsets', 'moltresgalar').learnset.windbreaker = ['9L1'];
		this.modData('Learnsets', 'articuno').learnset.windbreaker = ['9L1'];
		this.modData('Learnsets', 'articunogalar').learnset.windbreaker = ['9L1'];
		this.modData('Learnsets', 'ironjugulis').learnset.windbreaker = ['9L1'];
		this.modData('Learnsets', 'oricorio').learnset.windbreaker = ['9L1'];
		this.modData('Learnsets', 'noibat').learnset.windbreaker = ['9L1'];
		this.modData('Learnsets', 'wattrel').learnset.windbreaker = ['9L1'];
		this.modData('Learnsets', 'fletchling').learnset.windbreaker = ['9L1'];
		this.modData('Learnsets', 'drifloon').learnset.windbreaker = ['9L1'];
		this.modData('Learnsets', 'vivillon').learnset.windbreaker = ['9L1'];
		// this.modData('Learnsets', 'rotomfan').learnset.windbreaker = ['9L1'];
		this.modData('Learnsets', 'murkrow').learnset.windbreaker = ['9L1'];
		this.modData('Learnsets', 'hawlucha').learnset.windbreaker = ['9L1'];
		this.modData('Learnsets', 'hoppip').learnset.windbreaker = ['9L1'];
		this.modData('Learnsets', 'sneasel').learnset.throatchop = ['9L1'];
		this.modData('Learnsets', 'mankey').learnset.throatchop = ['9L1'];
		this.modData('Learnsets', 'cacturne').learnset.throatchop = ['9L1'];
		this.modData('Learnsets', 'zapdosgalar').learnset.throatchop = ['9L1'];
		this.modData('Learnsets', 'urshifu').learnset.throatchop = ['9L1'];
		this.modData('Learnsets', 'slitherwing').learnset.throatchop = ['9L1'];
		this.modData('Learnsets', 'toxtricity').learnset.throatchop = ['9L1'];
		this.modData('Learnsets', 'toxtricitylowkey').learnset.throatchop = ['9L1'];
		this.modData('Learnsets', 'falinks').learnset.throatchop = ['9L1'];
		this.modData("Learnsets", "mew").learnset.recover = ["9L1"];
		this.modData("Learnsets", "mew").learnset.defog = ["9L1"];
		this.modData("Learnsets", "mew").learnset.moonlight = ["9L1"];
		this.modData("Learnsets", "tinkaton").learnset.earthpower = ["9L1"];
		this.modData("Learnsets", "tinkaton").learnset.discharge = ["9L1"];
		this.modData('Learnsets', 'garganacl').learnset.chisel = ['9L1'];
		this.modData('Learnsets', 'growlithehisui').learnset.chisel = ['9L1'];
		this.modData('Learnsets', 'diancie').learnset.chisel = ['9L1'];
		this.modData('Learnsets', 'kleavor').learnset.chisel = ['9L1'];
		this.modData('Learnsets', 'larvitar').learnset.chisel = ['9L1'];
		this.modData('Learnsets', 'drednaw').learnset.chisel = ['9L1'];
		this.modData('Learnsets', 'rockruff').learnset.chisel = ['9L1'];
		this.modData('Learnsets', 'lycanrocdusk').learnset.chisel = ['9L1'];
		this.modData('Learnsets', 'ironthorns').learnset.chisel = ['9L1'];
		this.modData('Learnsets', 'carbink').learnset.chisel = ['9L1'];
		this.modData('Learnsets', 'stonjourner').learnset.chisel = ['9L1'];
		this.modData('Learnsets', 'sableye').learnset.chisel = ['9L1'];
		this.modData('Learnsets', 'glastrier').learnset.chisel = ['9L1'];
		this.modData('Learnsets', 'sneasel').learnset.chisel = ['9L1'];
		this.modData('Learnsets', 'froslass').learnset.chisel = ['9L1'];
		this.modData('Learnsets', 'beartic').learnset.chisel = ['9L1'];
		this.modData('Learnsets', 'greattusk').learnset.chisel = ['9L1'];
		this.modData('Learnsets', 'ironvaliant').learnset.chisel = ['9L1'];
		this.modData('Learnsets', 'gallade').learnset.chisel = ['9L1'];
		this.modData('Learnsets', 'zapdosgalar').learnset.chisel = ['9L1'];
		this.modData('Learnsets', 'toxicroak').learnset.chisel = ['9L1'];
		this.modData('Learnsets', 'falinks').learnset.chisel = ['9L1'];
		this.modData('Learnsets', 'veluza').learnset.chisel = ['9L1'];
		this.modData('Learnsets', 'breloom').learnset.chisel = ['9L1'];
		this.modData('Learnsets', 'gible').learnset.chisel = ['9L1'];
		this.modData('Learnsets', 'sandile').learnset.chisel = ['9L1'];
		this.modData('Learnsets', 'teddiursa').learnset.chisel = ['9L1'];
		this.modData('Learnsets', 'ironvaliant').learnset.parry = ['9L1'];
		this.modData('Learnsets', 'zamazenta').learnset.parry = ['9L1'];
		this.modData('Learnsets', 'zacian').learnset.parry = ['9L1'];
		this.modData('Learnsets', 'ironhands').learnset.parry = ['9L1'];
		this.modData('Learnsets', 'breloom').learnset.parry = ['9L1'];
		this.modData('Learnsets', 'chesnaught').learnset.parry = ['9L1'];
		this.modData('Learnsets', 'decidueyehisui').learnset.parry = ['9L1'];
		this.modData('Learnsets', 'gallade').learnset.parry = ['9L1'];
		this.modData('Learnsets', 'riolu').learnset.parry = ['9L1'];
		this.modData('Learnsets', 'flamigo').learnset.parry = ['9L1'];
		this.modData('Learnsets', 'makuhita').learnset.parry = ['9L1'];
		this.modData('Learnsets', 'mankey').learnset.parry = ['9L1'];
		this.modData('Learnsets', 'oshawott').learnset.parry = ['9L1'];
		this.modData('Learnsets', 'kleavor').learnset.parry = ['9L1'];
		this.modData('Learnsets', 'palafin').learnset.parry = ['9L1'];
		this.modData('Learnsets', 'ironleaves').learnset.parry = ['9L1'];
		this.modData('Learnsets', 'lokix').learnset.parry = ['9L1'];
		this.modData('Learnsets', 'golduck').learnset.parry = ['9L1'];
		this.modData('Learnsets', 'meditite').learnset.parry = ['9L1'];
		this.modData('Learnsets', 'meloetta').learnset.parry = ['9L1'];
		this.modData('Learnsets', 'pawmo').learnset.parry = ['9L1'];
		this.modData('Learnsets', 'hawlucha').learnset.parry = ['9L1'];
		this.modData('Learnsets', 'ceruledge').learnset.parry = ['9L1'];
		this.modData('Learnsets', 'veluza').learnset.parry = ['9L1'];
		this.modData('Learnsets', 'azurill').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'enamorus').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'hatterene').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'mimikyu').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'pichu').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'tinkaton').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'screamtail').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'ralts').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'grimmsnarl').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'dachsbun').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'dedenne').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'igglybuff').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'mabosstiff').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'meowth').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'meowthalola').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'meowthgalar').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'riolu').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'happiny').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'toxel').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'bonsly').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'lurantis').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'banette').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'zoroarkhisui').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'zoroark').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'sableye').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'farigiraf').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'drowzee').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'eevee').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'rowlet').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'houndstone').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'alomomola').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'dudunsparce').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'sinistea').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'maushold').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'squawkabilly').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'sandaconda').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'scorbunny').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'typhlosion').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'typhlosionhisui').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'torkoal').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'cloyster').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'flapple').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'appletun').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'mew').learnset.peekaboo = ['9L1'];
		this.modData('Learnsets', 'mew').learnset.psychoboost = ['9L1'];
		this.modData('Learnsets', 'mewtwo').learnset.psychoboost = ['9L1'];
		this.modData('Learnsets', 'espathra').learnset.psychoboost = ['9L1'];
		this.modData('Learnsets', 'espeon').learnset.psychoboost = ['9L1'];
		this.modData('Learnsets', 'gardevoir').learnset.psychoboost = ['9L1'];
		this.modData('Learnsets', 'indeedee').learnset.psychoboost = ['9L1'];
		this.modData('Learnsets', 'indeedeef').learnset.psychoboost = ['9L1'];
		this.modData('Learnsets', 'farigiraf').learnset.psychoboost = ['9L1'];
		this.modData('Learnsets', 'wyrdeer').learnset.psychoboost = ['9L1'];
		this.modData('Learnsets', 'delphox').learnset.psychoboost = ['9L1'];
		this.modData('Learnsets', 'mesprit').learnset.psychoboost = ['9L1'];
		this.modData('Learnsets', 'raichualola').learnset.psychoboost = ['9L1'];
		this.modData('Learnsets', 'wyrdeer').learnset.psychoboost = ['9L1'];
		this.modData('Learnsets', 'calyrex').learnset.psychoboost = ['9L1'];
		this.modData('Learnsets', 'grumpig').learnset.psychoboost = ['9L1'];
		this.modData('Learnsets', 'hypno').learnset.psychoboost = ['9L1'];
		this.modData('Learnsets', 'rabsca').learnset.psychoboost = ['9L1'];
		this.modData('Learnsets', 'medicham').learnset.psychoboost = ['9L1'];
		this.modData('Learnsets', 'ironleaves').learnset.psychoboost = ['9L1'];
		this.modData('Learnsets', 'psyduck').learnset.psychoboost = ['9L1'];
		this.modData('Learnsets', 'banette').learnset.ragefist = ['9L1'];
		this.modData('Learnsets', 'sableye').learnset.ragefist = ['9L1'];
		this.modData('Learnsets', 'pawmot').learnset.ragefist = ['9L1'];
		this.modData('Learnsets', 'kubfu').learnset.ragefist = ['9L1'];
		this.modData('Learnsets', 'camerupt').learnset.ragingfury = ['9L1'];
		this.modData('Learnsets', 'slitherwing').learnset.ragingfury = ['9L1'];
		this.modData('Learnsets', 'taurospaldeablaze').learnset.ragingfury = ['9L1'];
		this.modData('Learnsets', 'primeape').learnset.ragingfury = ['9L1'];
		this.modData('Learnsets', 'charizard').learnset.ragingfury = ['9L1'];
		this.modData('Learnsets', 'scovillain').learnset.ragingfury = ['9L1'];
		this.modData("Learnsets", "muk").learnset.recover = ["9L1"];
		this.modData("Learnsets", "muk").learnset.earthquake = ["9L1"];
		this.modData("Learnsets", "muk").learnset.explosion = ["9L1"];
		this.modData("Learnsets", "muk").learnset.whirlpool = ["9L1"];
		this.modData("Learnsets", "muk").learnset.aquajet = ["9L1"];
		this.modData("Learnsets", "muk").learnset.liquidation = ["9L1"];
		this.modData("Learnsets", "muk").learnset.soak = ["9L1"];
		this.modData("Learnsets", "muk").learnset.wavecrash = ["9L1"];
		this.modData("Learnsets", "muk").learnset.surf = ["9L1"];
		this.modData("Learnsets", "muk").learnset.hydropump = ["9L1"];
		this.modData("Learnsets", "muk").learnset.muddywater = ["9L1"];
		this.modData("Learnsets", "mukalola").learnset.recover = ["9L1"];
		this.modData("Learnsets", "mukalola").learnset.earthquake = ["9L1"];
		this.modData("Learnsets", "mukalola").learnset.explosion = ["9L1"];
		this.modData("Learnsets", "mukalola").learnset.suckerpunch = ["9L1"];
		this.modData("Learnsets", "mukalola").learnset.foulplay = ["9L1"];
		this.modData("Learnsets", "mukalola").learnset.swordsdance = ["9L1"];
		this.modData("Learnsets", "mukalola").learnset.beatup = ["9L1"];
		this.modData("Learnsets", "mukalola").learnset.jawlock = ["9L1"];
		this.modData("Learnsets", "mukalola").learnset.powertrip = ["9L1"];
		this.modData("Learnsets", "mukalola").learnset.curse = ["9L1"];
		this.modData("Learnsets", "mukalola").learnset.stealthrock = ["9L1"];
		this.modData("Learnsets", "hariyama").learnset.courtchange = ["9L1"];
		this.modData("Learnsets", "hariyama").learnset.saltcure = ["9L1"];
		this.modData("Learnsets", "hariyama").learnset.slackoff = ["9L1"];
		this.modData("Learnsets", "hariyama").learnset.swordsdance = ["9L1"];
		this.modData("Learnsets", "ironjugulis").learnset.aurasphere = ["9L1"];
		this.modData("Learnsets", "ironjugulis").learnset.roost = ["9L1"];
    	// delete this.modData('Learnsets', 'rotomfan').learnset.airslash;
		this.modData('Learnsets', 'growlithehisui').learnset.accelerock = ['9L1'];
		this.modData('Learnsets', 'larvitar').learnset.accelerock = ['9L1'];
		this.modData('Learnsets', 'carbink').learnset.accelerock = ['9L1'];
		this.modData('Learnsets', 'diancie').learnset.accelerock = ['9L1'];
		this.modData('Learnsets', 'rockruff').learnset.accelerock = ['9L1'];
		this.modData('Learnsets', 'chewtle').learnset.accelerock = ['9L1'];
		this.modData('Learnsets', 'rolycoly').learnset.accelerock = ['9L1'];
		this.modData('Learnsets', 'stonjourner').learnset.accelerock = ['9L1'];
		this.modData('Learnsets', 'kleavor').learnset.accelerock = ['9L1'];
		this.modData('Learnsets', 'klawf').learnset.accelerock = ['9L1'];
		this.modData('Learnsets', 'ironthorns').learnset.accelerock = ['9L1'];
		this.modData('Learnsets', 'bombirdier').learnset.accelerock = ['9L1'];
		this.modData('Learnsets', 'bagon').learnset.rollout = ['9L1'];
		this.modData('Learnsets', 'goodrahisui').learnset.rollout = ['9L1'];
		this.modData('Learnsets', 'varoom').learnset.rollout = ['9L1'];
		this.modData('Learnsets', 'glimmora').learnset.rollout = ['9L1'];
		this.modData('Learnsets', 'carbink').learnset.rollout = ['9L1'];
		this.modData('Learnsets', 'diancie').learnset.rollout = ['9L1'];
		this.modData('Learnsets', 'rolycoly').learnset.rollout = ['9L1'];
		this.modData('Learnsets', 'screamtail').learnset.round = ['9L1'];
		this.modData('Learnsets', 'happiny').learnset.round = ['9L1'];
		this.modData('Learnsets', 'kricketune').learnset.round = ['9L1'];
		this.modData('Learnsets', 'bellibolt').learnset.round = ['9L1'];
		this.modData('Learnsets', 'croagunk').learnset.round = ['9L1'];
		this.modData('Learnsets', 'azumarill').learnset.round = ['9L1'];
		this.modData('Learnsets', 'komala').learnset.round = ['9L1'];
		this.modData('Learnsets', 'toxel').learnset.round = ['9L1'];
		this.modData('Learnsets', 'growlithe').learnset.rekindle = ['9L1'];
		this.modData('Learnsets', 'growlithehisui').learnset.rekindle = ['9L1'];
		this.modData('Learnsets', 'cyndaquil').learnset.rekindle = ['9L1'];
		this.modData('Learnsets', 'moltres').learnset.rekindle = ['9L1'];
		this.modData('Learnsets', 'carkol').learnset.rekindle = ['9L1'];
		this.modData('Learnsets', 'volcarona').learnset.rekindle = ['9L1'];
		this.modData('Learnsets', 'talonflame').learnset.rekindle = ['9L1'];
		this.modData('Learnsets', 'charcadet').learnset.rekindle = ['9L1'];
		this.modData('Learnsets', 'charmander').learnset.rekindle = ['9L1'];
		this.modData('Learnsets', 'taurospaldeablaze').learnset.rekindle = ['9L1'];
		this.modData('Learnsets', 'flareon').learnset.rekindle = ['9L1'];
		this.modData('Learnsets', 'fennekin').learnset.rekindle = ['9L1'];
		this.modData('Learnsets', 'litleo').learnset.rekindle = ['9L1'];
		this.modData('Learnsets', 'fuecoco').learnset.rekindle = ['9L1'];
		this.modData('Learnsets', 'chiyu').learnset.rekindle = ['9L1'];
		this.modData("Learnsets", "salamence").learnset.scaleshot = ["9L1"];
		this.modData("Learnsets", "salamence").learnset.flamecharge = ["9L1"];
		this.modData("Learnsets", "salamence").learnset.pluck = ["9L1"];
		this.modData("Learnsets", "tsareena").learnset.knockoff = ["9L1"];
		this.modData("Learnsets", "tsareena").learnset.peekaboo = ["9L1"];
		this.modData("Learnsets", "tsareena").learnset.axekick = ["9L1"];
		this.modData("Learnsets", "tsareena").learnset.highhorsepower = ["9L1"];
		this.modData("Learnsets", "tsareena").learnset.leechseed = ["9L1"];
		this.modData("Learnsets", "tsareena").learnset.swordsdance = ["9L1"];
		this.modData("Learnsets", "orthworm").learnset.aquatail = ["9L1"];
		this.modData("Learnsets", "orthworm").learnset.aquajet = ["9L1"];
		this.modData("Learnsets", "orthworm").learnset.liquidation = ["9L1"];
		this.modData("Learnsets", "orthworm").learnset.wavecrash = ["9L1"];
		this.modData("Learnsets", "orthworm").learnset.whirlpool = ["9L1"];
		this.modData("Learnsets", "orthworm").learnset.surf = ["9L1"];
		this.modData("Learnsets", "orthworm").learnset.hydropump = ["9L1"];
		this.modData("Learnsets", "orthworm").learnset.toxic = ["9L1"];
		this.modData("Learnsets", "orthworm").learnset.recover = ["9L1"];
		delete this.modData('Learnsets', 'magearna').learnset.shiftgear;
		delete this.modData('Learnsets', 'magearna').learnset.storedpower;
		delete this.modData('Learnsets', 'magearna').learnset.spikes;
		delete this.modData('Learnsets', 'magearna').learnset.trick;
		delete this.modData('Learnsets', 'magearna').learnset.drainingkiss;
  },
};
