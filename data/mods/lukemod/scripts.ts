export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	inherit: 'gen9',
	teambuilderConfig: {
		// for micrometas to only show custom tiers
		excludeStandardTiers: true,
		// only to specify the order of custom tiers
		customTiers: ['Alternatium EX'],
		customDoublesTiers: ['Alternatium EX'],
	},
	
	init: function () {
		//idk if this is needed
		this.modData('Moves', 'aerialace').flags.slicing = 1;
		this.modData('Moves', 'aircutter').flags.slicing = 1;
		this.modData('Moves', 'airslash').flags.slicing = 1;
		this.modData('Moves', 'aquacutter').flags.slicing = 1;
		this.modData('Moves', 'behemothblade').flags.slicing = 1;
		this.modData('Moves', 'bitterblade').flags.slicing = 1;
		this.modData('Moves', 'ceaselessedge').flags.slicing = 1;
		this.modData('Moves', 'crosspoison').flags.slicing = 1;
		this.modData('Moves', 'cut').flags.slicing = 1;
		this.modData('Moves', 'furycutter').flags.slicing = 1;
		this.modData('Moves', 'kowtowcleave').flags.slicing = 1;
		this.modData('Moves', 'nightslash').flags.slicing = 1;
		this.modData('Moves', 'populationbomb').flags.slicing = 1;
		this.modData('Moves', 'psychocut').flags.slicing = 1;
		this.modData('Moves', 'razorleaf').flags.slicing = 1;
		this.modData('Moves', 'razorshell').flags.slicing = 1;
		this.modData('Moves', 'sacredsword').flags.slicing = 1;
		this.modData('Moves', 'slash').flags.slicing = 1;
		this.modData('Moves', 'solarblade').flags.slicing = 1;
		this.modData('Moves', 'stoneaxe').flags.slicing = 1;
		this.modData('Moves', 'xscissor').flags.slicing = 1;
	
		//alt ex
		this.modData("Learnsets", "urshifu").learnset.stealthrock = ["8L1"];
		this.modData("Learnsets", "urshifu").learnset.earthquake = ["8L1"];
		this.modData("Learnsets", "urshifu").learnset.powertrip = ["8L1"];
		this.modData("Learnsets", "urshifu").learnset.highhorsepower = ["8L1"];
		this.modData("Learnsets", "urshifu").learnset.stompingtantrum = ["8L1"];
		this.modData("Learnsets", "urshifu").learnset.partingshot = ["8L1"];
		this.modData("Learnsets", "urshifu").learnset.switcheroo = ["8L1"];
		this.modData("Learnsets", "urshifu").learnset.earthpower = ["8L1"];
		this.modData("Learnsets", "urshifu").learnset.nastyplot = ["8L1"];
		this.modData("Learnsets", "urshifu").learnset.bulldoze = ["8L1"];
		this.modData("Learnsets", "urshifu").learnset.spikes = ["8L1"];
		this.modData("Learnsets", "urshifu").learnset.comeuppance = ["8L1"];
		delete this.modData('Learnsets', 'urshifu').learnset.closecombat;
		delete this.modData('Learnsets', 'urshifu').learnset.superpower;
		delete this.modData('Learnsets', 'urshifu').learnset.focuspunch;
		delete this.modData('Learnsets', 'urshifu').learnset.focusblast;
		delete this.modData('Learnsets', 'urshifu').learnset.aurasphere;
		delete this.modData('Learnsets', 'urshifu').learnset.thunderpunch;
		
		this.modData("Learnsets", "salazzle").learnset.outrage = ["8L1"];
		this.modData("Learnsets", "salazzle").learnset.thunderwave = ["8L1"];
		this.modData("Learnsets", "salazzle").learnset.bulkup = ["8L1"];
		this.modData("Learnsets", "salazzle").learnset.firerenewal = ["8L1"];
		this.modData("Learnsets", "salazzle").learnset.sandattack = ["8L1"];
		this.modData("Learnsets", "salazzle").learnset.fakeout = ["8L1"];
		this.modData("Learnsets", "salazzle").learnset.mudslap = ["8L1"];
		this.modData("Learnsets", "salazzle").learnset.swordsdance = ["8L1"];
		delete this.modData('Learnsets', 'salandit').learnset.gunkshot;
		delete this.modData('Learnsets', 'salandit').learnset.poisonjab;
		delete this.modData('Learnsets', 'salandit').learnset.sludgebomb;
		delete this.modData('Learnsets', 'salandit').learnset.sludgewave;
		delete this.modData('Learnsets', 'salandit').learnset.belch;
		delete this.modData('Learnsets', 'salandit').learnset.poisonfang;
		delete this.modData('Learnsets', 'salandit').learnset.poisongas;
		delete this.modData('Learnsets', 'salandit').learnset.smog;
		delete this.modData('Learnsets', 'salandit').learnset.venomdrench;
		delete this.modData('Learnsets', 'salandit').learnset.venoshock;
		delete this.modData('Learnsets', 'salazzle').learnset.gunkshot;
		delete this.modData('Learnsets', 'salazzle').learnset.poisonjab;
		delete this.modData('Learnsets', 'salazzle').learnset.sludgebomb;
		delete this.modData('Learnsets', 'salazzle').learnset.sludgewave;
		delete this.modData('Learnsets', 'salazzle').learnset.belch;
		delete this.modData('Learnsets', 'salazzle').learnset.corrosivegas;
		delete this.modData('Learnsets', 'salazzle').learnset.crosspoison;
		delete this.modData('Learnsets', 'salazzle').learnset.poisonfang;
		delete this.modData('Learnsets', 'salazzle').learnset.poisongas;
		delete this.modData('Learnsets', 'salazzle').learnset.smog;
		delete this.modData('Learnsets', 'salazzle').learnset.venomdrench;
		delete this.modData('Learnsets', 'salazzle').learnset.venoshock;
		delete this.modData('Learnsets', 'salazzle').learnset.dragondance;
		
		this.modData("Learnsets", "zapdos").learnset.closecombat = ["8L1"];
		this.modData("Learnsets", "zapdos").learnset.brickbreak = ["8L1"];
		this.modData("Learnsets", "zapdos").learnset.vacuumwave = ["8L1"];
		this.modData("Learnsets", "zapdos").learnset.focusblast = ["8L1"];
		this.modData("Learnsets", "zapdos").learnset.scald = ["8L1"];
		this.modData("Learnsets", "zapdos").learnset.waterfall = ["8L1"];
		this.modData("Learnsets", "zapdos").learnset.hydropump = ["8L1"];
		this.modData("Learnsets", "zapdos").learnset.surf = ["8L1"];
		this.modData("Learnsets", "zapdos").learnset.lifedew = ["8L1"];
		this.modData("Learnsets", "zapdos").learnset.drainpunch = ["8L1"];
		this.modData("Learnsets", "zapdos").learnset.aquacutter = ["8L1"];
		delete this.modData('Learnsets', 'zapdos').learnset.discharge;
		delete this.modData('Learnsets', 'zapdos').learnset.thunderbolt;
		delete this.modData('Learnsets', 'zapdos').learnset.voltswitch;
		delete this.modData('Learnsets', 'zapdos').learnset.wildcharge;
		delete this.modData('Learnsets', 'zapdos').learnset.charge;
		delete this.modData('Learnsets', 'zapdos').learnset.chargebeam;
		delete this.modData('Learnsets', 'zapdos').learnset.eerieimpulse;
		delete this.modData('Learnsets', 'zapdos').learnset.magneticflux;
		delete this.modData('Learnsets', 'zapdos').learnset.risingvoltage;
		delete this.modData('Learnsets', 'zapdos').learnset.shockwave;
		delete this.modData('Learnsets', 'zapdos').learnset.thundershock;
		delete this.modData('Learnsets', 'zapdos').learnset.zapcanon;
		delete this.modData('Learnsets', 'zapdos').learnset.bravebird;
		delete this.modData('Learnsets', 'zapdos').learnset.hurricane;
		delete this.modData('Learnsets', 'zapdos').learnset.roost;
		delete this.modData('Learnsets', 'zapdos').learnset.tailwind;
		delete this.modData('Learnsets', 'zapdos').learnset.aerialace;
		delete this.modData('Learnsets', 'zapdos').learnset.aircutter;
		delete this.modData('Learnsets', 'zapdos').learnset.dualwingbeat;
		delete this.modData('Learnsets', 'zapdos').learnset.fly;
		delete this.modData('Learnsets', 'zapdos').learnset.peck;
		delete this.modData('Learnsets', 'zapdos').learnset.pluck;
		delete this.modData('Learnsets', 'zapdos').learnset.skyattack;
		delete this.modData('Learnsets', 'zapdos').learnset.heatwave;
		
		this.modData("Learnsets", "moltres").learnset.beakblast = ["8L1"];
		this.modData("Learnsets", "moltres").learnset.superpower = ["8L1"];
		this.modData("Learnsets", "moltres").learnset.turkeybarrage = ["8L1"];
		this.modData("Learnsets", "moltres").learnset.closecombat = ["8L1"];
		delete this.modData('Learnsets', 'moltres').learnset.fireblast;
		delete this.modData('Learnsets', 'moltres').learnset.flamecharge;
		delete this.modData('Learnsets', 'moltres').learnset.flamethrower;
		delete this.modData('Learnsets', 'moltres').learnset.overheat;
		delete this.modData('Learnsets', 'moltres').learnset.willowisp;
		delete this.modData('Learnsets', 'moltres').learnset.burningjealousy;
		delete this.modData('Learnsets', 'moltres').learnset.burnup;
		delete this.modData('Learnsets', 'moltres').learnset.ember;
		delete this.modData('Learnsets', 'moltres').learnset.firespin;
		delete this.modData('Learnsets', 'moltres').learnset.incinerate;
		delete this.modData('Learnsets', 'moltres').learnset.mysticalfire;
		delete this.modData('Learnsets', 'moltres').learnset.sunnyday;
		delete this.modData('Learnsets', 'moltres').learnset.skyattack;
		
		//csm2
		this.modData("Learnsets", "virizion").learnset.anchorshot = ["9L1"];
		this.modData("Learnsets", "virizion").learnset.leechseed = ["9L1"];
		this.modData("Learnsets", "virizion").learnset.taunt = ["9L1"];
		this.modData("Learnsets", "virizion").learnset.hornleech = ["9L1"];
		delete this.modData('Learnsets', 'virizion').learnset.closecombat;
		
		this.modData("Learnsets", "talonflame").learnset.lavaplume = ["9L1"];
		delete this.modData('Learnsets', 'talonflame').learnset.uturn;
		
		//megas revisted
		this.modData("Learnsets", "houndoom").learnset.toxicspikes = ["6L1"];
		this.modData("Learnsets", "houndoom").learnset.venoshock = ["6L1"];
		this.modData("Learnsets", "houndoom").learnset.hex = ["6L1"];
		
		this.modData("Learnsets", "audino").learnset.discharge = ["6L1"];
		this.modData("Learnsets", "audino").learnset.voltswitch = ["6L1"];
		this.modData("Learnsets", "audino").learnset.chargebeam = ["6L1"];
		this.modData("Learnsets", "audino").learnset.charge = ["6L1"];
		this.modData("Learnsets", "audino").learnset.zapcannon = ["6L1"];
		
		this.modData("Learnsets", "pinsir").learnset.hail = ["6L1"];
		this.modData("Learnsets", "pinsir").learnset.megahorn = ["6L1"];
		this.modData("Learnsets", "pinsir").learnset.uturn = ["6L1"];
		this.modData("Learnsets", "pinsir").learnset.iceshard = ["6L1"];
		this.modData("Learnsets", "pinsir").learnset.iciclecrash = ["6L1"];
		this.modData("Learnsets", "pinsir").learnset.icebeam = ["6L1"];
		this.modData("Learnsets", "pinsir").learnset.blizzard = ["6L1"];
		this.modData("Learnsets", "pinsir").learnset.roost = ["6L1"];
		this.modData("Learnsets", "pinsir").learnset.iciclespear = ["6L1"];
		
		this.modData("Learnsets", "sceptile").learnset.calmmind = ["6L1"];
		this.modData("Learnsets", "sceptile").learnset.sludgewave = ["6L1"];
		
		this.modData("Learnsets", "swampert").learnset.sludgebomb = ["6L1"];
		this.modData("Learnsets", "swampert").learnset.bulkup = ["6L1"];
		this.modData("Learnsets", "swampert").learnset.toxicspikes = ["6L1"];
		this.modData("Learnsets", "swampert").learnset.aquajet = ["6L1"];
		this.modData("Learnsets", "swampert").learnset.gunkshot = ["6L1"];
		this.modData("Learnsets", "swampert").learnset.poisonjab = ["6L1"];
		
		this.modData("Learnsets", "gallade").learnset.sacredsword = ["6L1"];
		this.modData("Learnsets", "gallade").learnset.machpunch = ["6L1"];
		
		this.modData("Learnsets", "aggron").learnset.voltswitch = ["6L1"];
		
		this.modData("Learnsets", "blaziken").learnset.uturn = ["6L1"];
		this.modData("Learnsets", "blaziken").learnset.spikes = ["6L1"];
		this.modData("Learnsets", "blaziken").learnset.roost = ["6L1"];
		this.modData("Learnsets", "blaziken").learnset.closecombat = ["6L1"];
		this.modData("Learnsets", "mewtwo").learnset.extremespeed = ["6L1"];
		this.modData("Learnsets", "mewtwo").learnset.sludgewave = ["6L1"];
		this.modData("Learnsets", "mewtwo").learnset.swordsdance = ["6L1"];
		this.modData("Learnsets", "mewtwo").learnset.uturn = ["6L1"];
		this.modData("Learnsets", "mewtwo").learnset.closecombat = ["6L1"];
		this.modData("Learnsets", "mewtwo").learnset.drainpunch = ["6L1"];
		this.modData("Learnsets", "mewtwo").learnset.machpunch = ["6L1"];
		this.modData("Learnsets", "mewtwo").learnset.scald = ["6L1"];
		this.modData("Learnsets", "mewtwo").learnset.surf = ["6L1"];
		this.modData("Learnsets", "mewtwo").learnset.hydropump = ["6L1"];
		
		//metamons
		this.modData("Learnsets", "camerupt").learnset.spikes = ["8L1"];
		this.modData("Learnsets", "camerupt").learnset.taunt = ["8L1"];
		this.modData("Learnsets", "camerupt").learnset.magmastorm = ["8L1"];
		
		this.modData("Learnsets", "mesprit").learnset.swordsdance = ["8L1"];
		this.modData("Learnsets", "mesprit").learnset.closecombat = ["8L1"];
		this.modData("Learnsets", "mesprit").learnset.psychicfangs = ["8L1"];
		this.modData("Learnsets", "mesprit").learnset.focusblast = ["8L1"];
		this.modData("Learnsets", "mesprit").learnset.vacuumwave = ["8L1"];
		
		//triple threat
		//grafaiai
		this.modData("Learnsets", "grafaiai").learnset.suckerpunch = ["9L1"];
		this.modData("Learnsets", "grafaiai").learnset.nightslash = ["9L1"];
		this.modData("Learnsets", "grafaiai").learnset.entrainment = ["9L1"];
		this.modData("Learnsets", "grafaiai").learnset.beatup = ["9L1"];
		this.modData("Learnsets", "grafaiai").learnset.toxicspikes = ["9L1"];
		this.modData("Learnsets", "grafaiai").learnset.aerialace = ["9L1"];
		this.modData("Learnsets", "grafaiai").learnset.hurricane = ["9L1"];
		this.modData("Learnsets", "grafaiai").learnset.defog = ["9L1"];
		this.modData("Learnsets", "grafaiai").learnset.tailwind = ["9L1"];
		this.modData("Learnsets", "grafaiai").learnset.gust = ["9L1"];
		this.modData("Learnsets", "grafaiai").learnset.darkpulse = ["9L1"];
		this.modData("Learnsets", "grafaiai").learnset.airslash = ["9L1"];
		this.modData("Learnsets", "grafaiai").learnset.bounce = ["9L1"];
		this.modData("Learnsets", "grafaiai").learnset.skyattack = ["9L1"];
		
		//iron jugulis
		this.modData("Learnsets", "grafaiai").learnset.dracometeor = ["9L1"];
		this.modData("Learnsets", "grafaiai").learnset.dragonpulse = ["9L1"];
		this.modData("Learnsets", "grafaiai").learnset.dragondance = ["9L1"];
		this.modData("Learnsets", "grafaiai").learnset.roost = ["9L1"];
		this.modData("Learnsets", "grafaiai").learnset.toxic = ["9L1"];
		this.modData("Learnsets", "grafaiai").learnset.defog = ["9L1"];
		this.modData("Learnsets", "grafaiai").learnset.nastyplot = ["9L1"];
		this.modData("Learnsets", "grafaiai").learnset.dragontail = ["9L1"];
		
		//vape
		this.modData("Learnsets", "crabominable").learnset.jetpunch = ["8L1"];
		this.modData("Learnsets", "crabominable").learnset.bulletpunch = ["8L1"];
		this.modData("Learnsets", "crabominable").learnset.machpunch = ["8L1"];
		this.modData("Learnsets", "crabominable").learnset.hammerarm = ["8L1"];
		this.modData("Learnsets", "crabominable").learnset.knockoff = ["8L1"];
		this.modData("Learnsets", "crabominable").learnset.slackoff = ["8L1"];
		this.modData("Learnsets", "crabominable").learnset.swordsdance = ["8L1"];
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
					if (targetHits < 4 && pokemon.hasItem('loadeddice')) {
						targetHits = 5 - this.random(2);
					}
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
				if (typeof damage[i] === 'number') {
					if (!target.m.timesAttacked) target.m.timesAttacked = 0;
					target.m.timesAttacked += hit - 1;
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
};
