export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	teambuilderConfig: {
		// for micrometas to only show custom tiers
		excludeStandardTiers: true,
		// only to specify the order of custom tiers
		customTiers: ['Alternatium EX'],
		customDoublesTiers: ['Alternatium EX'],
	},
	
	init: function () {
		this.modData("Learnsets", "oricorio").learnset.tripleaxel = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.rapidspin = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.fierydance = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.firespin = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.willowisp = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.twirlingdance = ["8L1"];
		
		this.modData("Learnsets", "ribombee").learnset.gigadrain = ["8L1"];
		this.modData("Learnsets", "ribombee").learnset.thunderwave = ["8L1"];
		this.modData("Learnsets", "ribombee").learnset.magiccoat = ["8L1"];

		this.modData("Learnsets", "ribombeetotem").learnset.acidspray = ["8L1"];
		this.modData("Learnsets", "ribombeetotem").learnset.corrosivegas = ["8L1"];
		this.modData("Learnsets", "ribombeetotem").learnset.mysticalfire = ["8L1"];
		this.modData("Learnsets", "ribombeetotem").learnset.sludgebomb = ["8L1"];
		this.modData("Learnsets", "ribombeetotem").learnset.sludgewave = ["8L1"];
		this.modData("Learnsets", "ribombeetotem").learnset.strengthsap = ["8L1"];
		this.modData("Learnsets", "ribombeetotem").learnset.venoshock = ["8L1"];

		this.modData("Learnsets", "araquanid").learnset.uturn = ["8L1"];
		this.modData("Learnsets", "araquanid").learnset.recover = ["8L1"];

		this.modData("Learnsets", "araquanidtotem").learnset.airslash = ["8L1"];
		this.modData("Learnsets", "araquanidtotem").learnset.healorder = ["8L1"];
		this.modData("Learnsets", "araquanidtotem").learnset.hurricane = ["8L1"];
		this.modData("Learnsets", "araquanidtotem").learnset.nastyplot = ["8L1"];
		this.modData("Learnsets", "araquanidtotem").learnset.sludgebomb = ["8L1"];
		this.modData("Learnsets", "araquanidtotem").learnset.sludgewave = ["8L1"];
		this.modData("Learnsets", "araquanidtotem").learnset.toxic = ["8L1"];
		this.modData("Learnsets", "araquanidtotem").learnset.venomdrench = ["8L1"];
		this.modData("Learnsets", "araquanidtotem").learnset.venoshock = ["8L1"];
		
		this.modData("Learnsets", "vikavolt").learnset.geargrind = ["8L1"];
		this.modData("Learnsets", "vikavolt").learnset.irontail = ["8L1"];
		this.modData("Learnsets", "vikavolt").learnset.metalclaw = ["8L1"];
		this.modData("Learnsets", "vikavolt").learnset.ironhead = ["8L1"];
		this.modData("Learnsets", "vikavolt").learnset.switcheroo = ["8L1"];
		delete this.modData('Learnsets', 'grubbin').learnset.agility;
		delete this.modData('Learnsets', 'grubbin').learnset.stickyweb;
		delete this.modData('Learnsets', 'charjabug').learnset.agility;
		delete this.modData('Learnsets', 'charjabug').learnset.stickyweb;
		delete this.modData('Learnsets', 'vikavolt').learnset.agility;
		delete this.modData('Learnsets', 'vikavolt').learnset.stickyweb;

		this.modData("Learnsets", "vikavolttotem").learnset.earthquake = ["8L1"];
		this.modData("Learnsets", "vikavolttotem").learnset.uturn = ["8L1"];
		delete this.modData('Learnsets', 'vikavolttotem').learnset.agility;
		
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
		delete this.modData('Learnsets', 'urshifu').learnset.closecombat;
		delete this.modData('Learnsets', 'urshifu').learnset.superpower;
		delete this.modData('Learnsets', 'urshifu').learnset.focuspunch;
		delete this.modData('Learnsets', 'urshifu').learnset.focusblast;
		delete this.modData('Learnsets', 'urshifu').learnset.aurasphere;
		delete this.modData('Learnsets', 'urshifu').learnset.thunderpunch;
		
		this.modData("Learnsets", "kommoo").learnset.headsmash = ["8L1"];
		this.modData("Learnsets", "kommoo").learnset.stoneedge = ["8L1"];
		this.modData("Learnsets", "kommoo").learnset.meteorbeam = ["8L1"];
		this.modData("Learnsets", "kommoo").learnset.counter = ["8L1"];
		this.modData("Learnsets", "kommoo").learnset.dragonbreath = ["8L1"];
		this.modData("Learnsets", "kommoo").learnset.focuspunch = ["8L1"];
		delete this.modData('Learnsets', 'kommoo').learnset.aurasphere;
		delete this.modData('Learnsets', 'kommoo').learnset.closecombat;
		
		this.modData("Learnsets", "salazzle").learnset.outrage = ["8L1"];
		this.modData("Learnsets", "salazzle").learnset.thunderwave = ["8L1"];
		this.modData("Learnsets", "salazzle").learnset.bulkup = ["8L1"];
		this.modData("Learnsets", "salazzle").learnset.firerenewal = ["8L1"];
		this.modData("Learnsets", "salazzle").learnset.sandattack = ["8L1"];
		this.modData("Learnsets", "salazzle").learnset.fakeout = ["8L1"];
		this.modData("Learnsets", "salazzle").learnset.mudslap = ["8L1"];
		delete this.modData('Learnsets', 'salazzle').learnset.unkshot;
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
		
		this.modData("Learnsets", "lurantis").learnset.aromatherapy = ["8L1"];
		this.modData("Learnsets", "lurantis").learnset.defog = ["8L1"];
		this.modData("Learnsets", "lurantis").learnset.ghostbite = ["8L1"];
		this.modData("Learnsets", "lurantis").learnset.closecombat = ["8L1"];
		this.modData("Learnsets", "lurantis").learnset.drainpunch = ["8L1"];
		this.modData("Learnsets", "lurantis").learnset.highjumpkick = ["8L1"];
		this.modData("Learnsets", "lurantis").learnset.machpunch = ["8L1"];
		this.modData("Learnsets", "lurantis").learnset.firstimpression = ["8L1"];
		this.modData("Learnsets", "lurantis").learnset.lunge = ["8L1"];
		this.modData("Learnsets", "lurantis").learnset.uturn = ["8L1"];
		this.modData("Learnsets", "lurantis").learnset.attackorder = ["8L1"];
		this.modData("Learnsets", "lurantis").learnset.focusblast = ["8L1"];
		this.modData("Learnsets", "lurantis").learnset.aurasphere = ["8L1"];
		this.modData("Learnsets", "lurantis").learnset.bugbuzz = ["8L1"];
		this.modData("Learnsets", "lurantis").learnset.infestation = ["8L1"];
		this.modData("Learnsets", "lurantis").learnset.bulkup = ["8L1"];
		this.modData("Learnsets", "lurantis").learnset.healorder = ["8L1"];
		this.modData("Learnsets", "lurantis").learnset.defendorder = ["8L1"];
		delete this.modData('Learnsets', 'lurantis').learnset.leafblade;
		delete this.modData('Learnsets', 'lurantis').learnset.petalblizzard;
		delete this.modData('Learnsets', 'lurantis').learnset.seedbomb;
		delete this.modData('Learnsets', 'lurantis').learnset.bulletseed;
		delete this.modData('Learnsets', 'lurantis').learnset.grassyglide;
		delete this.modData('Learnsets', 'lurantis').learnset.leafage;
		delete this.modData('Learnsets', 'lurantis').learnset.magicalleaf;
		delete this.modData('Learnsets', 'lurantis').learnset.razorleaf;
		delete this.modData('Learnsets', 'lurantis').learnset.solarblade;
		delete this.modData('Learnsets', 'lurantis').learnset.energyball;
		delete this.modData('Learnsets', 'lurantis').learnset.gigadrain;
		delete this.modData('Learnsets', 'lurantis').learnset.grassknot;
		delete this.modData('Learnsets', 'lurantis').learnset.leafstorm;
		delete this.modData('Learnsets', 'lurantis').learnset.magicalleaf;
		delete this.modData('Learnsets', 'lurantis').learnset.solarbeam;
		delete this.modData('Learnsets', 'lurantis').learnset.synthesis;
		delete this.modData('Learnsets', 'lurantis').learnset.grassyterrain;
		delete this.modData('Learnsets', 'lurantis').learnset.ingrain;
		delete this.modData('Learnsets', 'lurantis').learnset.worryseed;
		
		this.modData("Learnsets", "mrmime").learnset.hypnosis = ["8L1"];
		this.modData("Learnsets", "mrmime").learnset.fakeout = ["8L1"];
		this.modData("Learnsets", "mrmime").learnset.confuseray = ["8L1"];
		this.modData("Learnsets", "mrmime").learnset.powersplit = ["8L1"];
		this.modData("Learnsets", "mrmime").learnset.tickle = ["8L1"];
		this.modData("Learnsets", "mrmime").learnset.hypervoice = ["8L1"];
		this.modData("Learnsets", "mrmime").learnset.triattack = ["8L1"];
		this.modData("Learnsets", "mrmime").learnset.moonblast = ["8L1"];
		this.modData("Learnsets", "mrmime").learnset.slackoff = ["8L1"];
		this.modData("Learnsets", "mrmime").learnset.spikes = ["8L1"];
		this.modData("Learnsets", "mrmime").learnset.uturn = ["8L1"];
		
		this.modData("Learnsets", "stunfisk").learnset.scorchingsands = ["8L1"];
		this.modData("Learnsets", "stunfisk").learnset.recover = ["8L1"];
		this.modData("Learnsets", "stunfisk").learnset.voltswitch = ["8L1"];
		this.modData("Learnsets", "stunfisk").learnset.rapidspin = ["8L1"];
		
		delete this.modData('Learnsets', 'espurr').learnset.shadowball;
	},
	
	pokemon: {
		isGrounded(negateImmunity = false) {
			if ('gravity' in this.battle.field.pseudoWeather) return true;
			if ('ingrain' in this.volatiles && this.battle.gen >= 4) return true;
			if ('smackdown' in this.volatiles) return true;
			if ('staccato' in this.volatiles) return true;
			const item = (this.ignoringItem() ? '' : this.item);
			if (item === 'ironball') return true;
			// If a Fire/Flying type uses Burn Up and Roost, it becomes ???/Flying-type, but it's still grounded.
			if (!negateImmunity && this.hasType('Flying') && !('roost' in this.volatiles)) return false;
			if (this.hasAbility('levitate') && !this.battle.suppressingAttackEvents()) return null;
			if ('magnetrise' in this.volatiles) return false;
			if ('telekinesis' in this.volatiles) return false;
			return item !== 'airballoon';
		},
		ignoringAbility() {
			// Check if any active pokemon have the ability Neutralizing Gas
			let neutralizinggas = false;
			let rubberarmor = false;
			/*const aurabreakAbilities = ["adaptability", "aerilate", "analytic", "darkaura", "flareboost", "fairyaura", "galvanize", "guts", 
				"hustle", "ironfist", "packleader", "pixilate", "poisontouch", "punkrock", "refrigerate", "sandforce", "shadowworld", "sheerforce",
				"solarpower", "steelworker", "strongjaw", "technician", "toughclaws", "transistor", "waterbubble", "watercycle", "forecast"];*/
			const rubberarmorAbilities = ["blaze", "infiltrator", "libero", "overgrow", "sandforce", "soulreap", "splitsystem", "steelworker", 
				"swarm", "torrent", "unseenfist", "victorystar", "waterbubble"];
			for (const pokemon of this.battle.getAllActive()) {
				// can't use hasAbility because it would lead to infinite recursion
				if (pokemon.ability === ('neutralizinggas' as ID) && !pokemon.volatiles['gastroacid'] &&
					!pokemon.transformed && !pokemon.abilityData.ending) {
					neutralizinggas = true;
					break;
				}
				if (pokemon.ability === ('rubberarmor' as ID) && !pokemon.volatiles['gastroacid'] &&
					!pokemon.transformed) {
					rubberarmor = true;
				}
			}

			return !!(
				(this.battle.gen >= 5 && !this.isActive) ||
				((this.volatiles['gastroacid'] || this.volatiles['rubberarmor'] || (neutralizinggas && this.ability !== ('neutralizinggas' as ID)) ||
					(rubberarmor && rubberarmorAbilities.includes(this.ability))) &&
				!this.getAbility().isPermanent
				)
			);
		},
	},
};