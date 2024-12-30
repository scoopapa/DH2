export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	inherit: "scootopia",
	teambuilderConfig: { excludeStandardTiers: true },
	init(){
		const scoot = this.dataCache
		scoot.scootopia = {};
		scoot.scootopia.worldEffects = ["chaoticweather", "chaoticterrain", "cursedfield", "blessedfield", 
										"rainofmeteors", "rainofdew", "silentdomain", "stellaralignment"];
		scoot.scootopia.getWorldEffect = function(pokemon) {
			let battle = pokemon.battle
			for (let e of scoot.scootopia.worldEffects) {
				if (battle.field.getPseudoWeather(e)) {
					return e;
				}
			}
			return false;
		}
		scoot.scootopia.worldEffectStart = function(w, pokemon) {
			let battle = pokemon.battle
			for (let e of scoot.scootopia.worldEffects) {
				if (battle.field.getPseudoWeather(e) && e !== w) {
					battle.field.removePseudoWeather(e);
					battle.add('-fieldend', 'move: ' + e);
				} else if ( !battle.field.getPseudoWeather(e) && e === w ) {
					battle.field.addPseudoWeather(w);
				}
			}
		}
		scoot.scootopia.getWorldEffectMove = function(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				if (scoot.scootopia.worldEffects.includes(moveSlot.id)) {
					return moveSlot.id
				}
			}
		}
		scoot.scootopia.getImmunity = function(pokemon, w) {
			if (!w) w = scoot.scootopia.getWorldEffect(pokemon);
			if (!w) return false;
			const ability = pokemon.ability;
			const fieldImmune = pokemon.hasType("Dark") || pokemon.hasType("Ghost");
			switch (w) {
				case 'chaoticweather':
					if ( ability == 'overcoat' 
						|| ability == 'celestial' 
						|| ability == 'fallingstar'
						|| ability == 'cloudnine'
						|| ability == 'airlock'
						|| ability == 'windrider'
						|| ability == 'windpower'
					) return true;
				break;
				case 'chaoticterrain':
					if ( ability == 'overcoat' 
						|| ability == 'tellurian' 
						|| ability == 'fallingstar'
						|| !pokemon.isGrounded()
					) return true;
				break;
				case 'rainofdew':
					return pokemon.hasItem('utilityumbrella');
				break;
				case 'rainofmeteors':
					if ( ability == 'celestial' 
						|| ability == 'fallingstar' 
						|| ability == 'overcoat'
						|| pokemon.hasType("Fairy")
					) return true;
				break;
				case 'blessedfield':
					if (fieldImmune 
						&& ability !== 'tellurian' 
						&& ability !== 'risingsun'
					) return true;
				break;
				case 'cursedfield':
					if ( ability == 'fallingstar'
						|| ability == 'tellurian'
						|| fieldImmune
					) return true;
				break;
				case 'silentdomain':
					if ( ability == 'risingsun'
						|| ability == 'tellurian'
					) return true;
				break;
				case 'stellaralignment':
					return false;
				break;
			}
		}
		// Arbrella-North
		this.modData("Learnsets", "arbrellanorth").learnset.legacyshade = ["9L1"];
		this.modData("Learnsets", "arbrellanorth").learnset.cursedfield = ["9L1"];
		// Krachiten
		this.modData("Learnsets", "krachiten").learnset.rebalance = ["9L1"];
		this.modData("Learnsets", "krachiten").learnset.silentdomain = ["9L1"];
		// Scalaron
		this.modData("Learnsets", "scalaron").learnset.iconoblast = ["9L1"];
		this.modData("Learnsets", "scalaron").learnset.rainofdew = ["9L1"];
		// Rantler
		// Woolora
		this.modData("Learnsets", "woolora").learnset.rebalance = ["9L1"];
		// Harzodia
		this.modData("Learnsets", "harzodia").learnset.iconoblast = ["9L1"];
		this.modData("Learnsets", "harzodia").learnset.stellaralignment = ["9L1"];
		// Minillow
		this.modData("Learnsets", "minillow").learnset.rebalance = ["9L1"];
		this.modData("Learnsets", "minillow").learnset.wish = ["9L1"];
		this.modData("Learnsets", "minillow").learnset.healingwish = ["9L1"];
		this.modData("Learnsets", "minillow").learnset.defog = ["9L1"];
		this.modData("Learnsets", "minillow").learnset.whirlwind = ["9L1"];
		delete this.modData("Learnsets", "minillow").learnset.calmmind;
		// Sturgard
		this.modData("Learnsets", "sturgard").learnset.rebalance = ["9L1"];
		this.modData("Learnsets", "sturgard").learnset.rainofdew = ["9L1"];
		// Albatrygon
		// Electangle
		this.modData("Learnsets", "electangle").learnset.rainofmeteors = ["9L1"];
		// Efflor
		this.modData("Learnsets", "efflor").learnset.legacyshade = ["9L1"];
		this.modData("Learnsets", "efflor").learnset.rebalance = ["9L1"];
		this.modData("Learnsets", "efflor").learnset.blessedfield = ["9L1"];
		// Whiscamp
		this.modData("Learnsets", "barbolt").learnset.rebalance = ["9L1"];
		this.modData("Learnsets", "barbolt").learnset.chaoticterrain = ["9L1"];
		// Axolacred
		this.modData("Learnsets", "axolacred").learnset.legacyshade = ["9L1"];
		this.modData("Learnsets", "axolacred").learnset.rebalance = ["9L1"];
		this.modData("Learnsets", "axolacred").learnset.rainofdew = ["9L1"];
		// Noxtrice
		this.modData("Learnsets", "noxtrice").learnset.cursedfield = ["9L1"];
		// Himalao
		// Lunacal
		this.modData("Learnsets", "lunacal").learnset.legacyshade = ["9L1"];
		this.modData("Learnsets", "lunacal").learnset.rainofmeteors = ["9L1"];
		this.modData("Learnsets", "lunacal").learnset.rebalance = ["9L1"];
		// Eleqwil
		// Duratreme
		this.modData("Learnsets", "duratreme").learnset.rebalance = ["9L1"];
		// Velocipasta
		this.modData("Learnsets", "velocipasta").learnset.legacyshade = ["9L1"];
		this.modData("Learnsets", "velocipasta").learnset.silentdomain = ["9L1"];
		// Crolegion
		this.modData("Learnsets", "crolegion").learnset.cursedfield = ["9L1"];
		// Coraking
		this.modData("Learnsets", "coraking").learnset.rebalance = ["9L1"];
		// Celespirit
		this.modData("Learnsets", "celespirit").learnset.legacyshade = ["9L1"];
		this.modData("Learnsets", "celespirit").learnset.stellaralignment = ["9L1"];
		// Elemadillo
		// this.modData("Learnsets", "elemadillo").learnset.earthpower = ["9L1"];
		// Cinnastar
		this.modData("Learnsets", "cinnastar").learnset.rebalance = ["9L1"];
		this.modData("Learnsets", "cinnastar").learnset.stellaralignment = ["9L1"];
		// Crossont
		// Kodokai
		// Sumolug
		this.modData("Learnsets", "sumolug").learnset.rebalance = ["9L1"];
		// Torgeist
		this.modData("Learnsets", "torgeist").learnset.chaoticweather = ["9L1"];
		// Embuck
		this.modData("Learnsets", "embuck").learnset.chaoticterrain = ["9L1"];
		// Cindoe
		this.modData("Learnsets", "cindoe").learnset.chaoticterrain = ["9L1"];
		// Cobracotta
		// Cyllindrake
		this.modData("Learnsets", "cyllindrake").learnset.rainofmeteors = ["9L1"];
		// Soleron
		this.modData("Learnsets", "soleron").learnset.chaoticweather = ["9L1"];
		// Soleron-Awakened
		// Dojodo
		// Blunderbusk
		this.modData("Learnsets", "blunderbusk").learnset.rebalance = ["9L1"];
		// Dracoil
		this.modData("Learnsets", "dracoil").learnset.rebalance = ["9L1"];
		this.modData("Learnsets", "dracoil").learnset.chaoticweather = ["9L1"];
		// Enkappa
		// Zeploom
		this.modData("Learnsets", "zeploom").learnset.blessedfield = ["9L1"];
		// Jamborai
		this.modData("Learnsets", "jamborai").learnset.silentdomain = ["9L1"];
		// Avastar
		this.modData("Learnsets", "avastar").learnset.stellaralignment = ["9L1"];
		// Nunopod
		// Pyrove
		this.modData("Learnsets", "pyrove").learnset.rebalance = ["9L1"];
		this.modData("Learnsets", "pyrove").learnset.iconoblast = ["9L1"];
		this.modData("Learnsets", "pyrove").learnset.blessedfield = ["9L1"];
		// Stone Husk
		// Zephyrmine
		this.modData("Learnsets", "zephyrmine").learnset.iconoblast = ["9L1"];
		this.modData("Learnsets", "zephyrmine").learnset.rainofdew = ["9L1"];
		// Boreasel
		this.modData("Learnsets", "boreasel").learnset.iconoblast = ["9L1"];
		this.modData("Learnsets", "boreasel").learnset.chaoticweather = ["9L1"];
		// Corundell
		this.modData("Learnsets", "corundell").learnset.rainofmeteors = ["9L1"];
		// Quadringo
		this.modData("Learnsets", "quadringo").learnset.rebalance = ["9L1"];
		// Zygola
		this.modData("Learnsets", "zygola").learnset.legacyshade = ["9L1"];
		this.modData("Learnsets", "zygola").learnset.iconoblast = ["9L1"];
		this.modData("Learnsets", "zygola").learnset.silentdomain = ["9L1"];
		this.modData("Learnsets", "zygola").learnset.stellaralignment = ["9L1"];
		// Skawamud
		this.modData("Learnsets", "skawamud").learnset.legacyshade = ["9L1"];
		this.modData("Learnsets", "skawamud").learnset.iconoblast = ["9L1"];
		this.modData("Learnsets", "skawamud").learnset.cursedfield = ["9L1"];
		this.modData("Learnsets", "skawamud").learnset.blessedfield = ["9L1"];
		// Noxon
		this.modData("Learnsets", "noxon").learnset.legacyshade = ["9L1"];
		this.modData("Learnsets", "noxon").learnset.iconoblast = ["9L1"];
		this.modData("Learnsets", "noxon").learnset.chaoticweather = ["9L1"];
		this.modData("Learnsets", "noxon").learnset.chaoticterrain = ["9L1"];
		// Xiphoil
		this.modData("Learnsets", "xiphoil").learnset.legacyshade = ["9L1"];
		this.modData("Learnsets", "xiphoil").learnset.iconoblast = ["9L1"];
		this.modData("Learnsets", "xiphoil").learnset.rainofmeteors = ["9L1"];
		this.modData("Learnsets", "xiphoil").learnset.rainofdew = ["9L1"];
		// Saphor
		this.modData("Learnsets", "saphor").learnset.iconoblast = ["9L1"];
		this.modData("Learnsets", "saphor").learnset.blessedfield = ["9L1"];
		// Fenreil
		this.modData("Learnsets", "fenreil").learnset.iconoblast = ["9L1"];
		this.modData("Learnsets", "fenreil").learnset.cursedfield = ["9L1"];
		// Flocura
		this.modData("Learnsets", "flocura").learnset.chaoticterrain = ["9L1"];
		this.modData("Learnsets", "flocura").learnset.silentdomain = ["9L1"];
		this.modData("Learnsets", "flocura").learnset.rebalance = ["9L1"];
		// Flocura-Nexus
		// Cyrome-Book
		this.modData("Learnsets", "cyromebook").learnset.rebalance = ["9L1"];
		this.modData("Learnsets", "cyromebook").learnset.legacyshade = ["9L1"];
		this.modData("Learnsets", "cyromebook").learnset.iconoblast = ["9L1"];
		this.modData("Learnsets", "cyromebook").learnset.chaoticterrain = ["9L1"];
		this.modData("Learnsets", "cyromebook").learnset.chaoticweather = ["9L1"];
		this.modData("Learnsets", "cyromebook").learnset.rainofmeteors = ["9L1"];
		this.modData("Learnsets", "cyromebook").learnset.rainofdew = ["9L1"];
		this.modData("Learnsets", "cyromebook").learnset.cursedfield = ["9L1"];
		this.modData("Learnsets", "cyromebook").learnset.blessedfield = ["9L1"];
		this.modData("Learnsets", "cyromebook").learnset.silentdomain = ["9L1"];
		this.modData("Learnsets", "cyromebook").learnset.stellaralignment = ["9L1"];
		// Cyrome-Scribe
		this.modData("Learnsets", "cyrome").learnset.rebalance = ["9L1"];
		this.modData("Learnsets", "cyrome").learnset.legacyshade = ["9L1"];
		this.modData("Learnsets", "cyrome").learnset.iconoblast = ["9L1"];
		this.modData("Learnsets", "cyrome").learnset.chaoticterrain = ["9L1"];
		this.modData("Learnsets", "cyrome").learnset.chaoticweather = ["9L1"];
		this.modData("Learnsets", "cyrome").learnset.rainofmeteors = ["9L1"];
		this.modData("Learnsets", "cyrome").learnset.rainofdew = ["9L1"];
		this.modData("Learnsets", "cyrome").learnset.cursedfield = ["9L1"];
		this.modData("Learnsets", "cyrome").learnset.blessedfield = ["9L1"];
		this.modData("Learnsets", "cyrome").learnset.silentdomain = ["9L1"];
		this.modData("Learnsets", "cyrome").learnset.stellaralignment = ["9L1"];
		// Cyrome-Author
		// Krachiten
		this.modData("Learnsets", "krachiten").learnset.wavecrash = ["9L1"];
		// Scalaron
		this.modData("Learnsets", "scalaron").learnset.lavaplume = ["9L1"];
	}
};
