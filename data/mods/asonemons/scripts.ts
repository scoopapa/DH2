export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	init(){ 
		this.modData('Learnsets', 'yanmega').learnset.coalsting = ['8L1'];
		delete this.modData('Learnsets', 'torkoal').learnset.shellsmash;
		
		this.modData('Learnsets', 'pelipper').learnset.inkgulp = ['8L1'];
		
		this.modData('Learnsets', 'excadrill').learnset.bouldertoss = ['8L1'];
		
		this.modData('Learnsets', 'vanilluxe').learnset.icescream = ['8L1'];
		
		this.modData('Learnsets', 'butterfree').learnset.baitsplash = ['8L1'];
		
		this.modData('Learnsets', 'dedenne').learnset.hamsterslam = ['8L1'];
		
		this.modData('Learnsets', 'shuckle').learnset.shellstack = ['8L1'];
		
		this.modData('Learnsets', 'munchlax').learnset.biobelly = ['8L1'];
		
		this.modData('Learnsets', 'bunnelby').learnset.hardwork = ['8L1'];
		
		this.modData('Learnsets', 'sirfetchd').learnset.excaliburslash = ['8L1'];
		
		this.modData('Learnsets', 'frogadier').learnset.bubbleblades = ['8L1'];
		
		this.modData('Learnsets', 'chandelure').learnset.balloonburner = ['8L1'];

		this.modData('Learnsets', 'infernape').learnset.extendneck = ['8L1'];
		
		this.modData('Learnsets', 'ribombee').learnset.pungiblow = ['8L1'];
		
		this.modData('Learnsets', 'beheeyem').learnset.beamup = ['8L1'];
		
		this.modData('Learnsets', 'sableye').learnset.darkfractals = ['8L1'];
		
		this.modData('Learnsets', 'mareanie').learnset.sulfuricflame = ['8L1'];
		
		this.modData('Learnsets', 'thwackey').learnset.lushsoil = ['8L1'];
		
		this.modData('Learnsets', 'spheal').learnset.entrancingsound = ['8L1'];
		
		this.modData('Learnsets', 'pincurchin').learnset.paralyzinggoo = ['8L1'];
		
		this.modData('Learnsets', 'nihilego').learnset.neurodrain = ['8L1'];
		
		this.modData('Learnsets', 'stunfisk').learnset.spikeburst = ['8L1'];
		
		this.modData('Learnsets', 'pawniard').learnset.aerialstrike = ['8L1'];
		
		this.modData('Learnsets', 'watchog').learnset.airsurveillance = ['8L1'];
		
		this.modData('Learnsets', 'mothim').learnset.gourdspirit = ['8L1'];
		
		this.modData('Learnsets', 'clefairy').learnset.moonritual = ['8L1'];
		
		this.modData('Learnsets', 'hoothoot').learnset.illomen = ['8L1'];
		
		this.modData('Learnsets', 'swoobat').learnset.souraroma = ['8L1'];
		
		this.modData('Learnsets', 'blacephalon').learnset.vengefulspirit = ['8L1'];
		
		this.modData('Learnsets', 'malamar').learnset.innerdeviation = ['8L1'];
		// *(Referenced from FEUU)* 
		// Automatically construct fusion learnsets! (Thank u scoopapa)
		for (const id in this.dataCache.Pokedex) {//check the dex for fusions
			const fusionEntry = this.dataCache.Pokedex[id];
			if (fusionEntry.fusion) {//if the pokedex entry has a fusion field, it's a fusion
				const learnsetFusionList = [];//list of pokemon whose learnsets need to be fused
				for (let name of fusionEntry.fusion) {
					let prevo = true;
					while (prevo) {//make sure prevos of both fused pokemon are added to the list
						learnsetFusionList.push(name);
						const dexEntry = this.dataCache.Pokedex[this.toID(name)];
						if (dexEntry.prevo) name = dexEntry.prevo;
						else prevo = false;
					}
				}
				if (!this.dataCache.Learnsets[id]) this.dataCache.Learnsets[id] = { learnset: {}};//create a blank learnset entry so we don't need a learnsets file
				for (let name of learnsetFusionList) {					
					const learnset = this.dataCache.Learnsets[this.toID(name)].Learnsets;//get the learnset of each pokemon in the list
					for (const moveid in learnset) {
						this.modData('Learnsets', id).learnset[moveid] = ['8L1', '7L1', '6L1', '5L1', '4L1'];//all moves are compatible with the fusion's only ability, so just set it to 8L1
					}
				}
			}
		}
	},
pokemon: {
	runImmunity(type: string, message?: string | boolean) {
			if (!type || type === '???') return true;
			if (!(type in this.battle.dex.data.TypeChart)) {
				if (type === 'Fairy' || type === 'Dark' || type === 'Steel') return true;
				throw new Error("Use runStatusImmunity for " + type);
			}
			if (this.fainted) return false;

			const negateResult = this.battle.runEvent('NegateImmunity', this, type);
			let isGrounded;
			if (type === 'Ground') {
				isGrounded = this.isGrounded(!negateResult);
				if (isGrounded === null) {
					if (message) {
						if (this.hasAbility('asonelunatone')) {
							this.battle.add('-immune', this, '[from] ability: Levitate');
						}
					}
					return false;
				}
			}
			if (!negateResult) return true;
			if ((isGrounded === undefined && !this.battle.dex.getImmunity(type, this)) || isGrounded === false) {
				if (message) {
					this.battle.add('-immune', this);
				}
				return false;
			}
			return true;
		},
		isGrounded(negateImmunity = false) {
		if ('gravity' in this.battle.field.pseudoWeather) return true;
		if ('ingrain' in this.volatiles && this.battle.gen >= 4) return true;
		if ('smackdown' in this.volatiles) return true;
		const item = (this.ignoringItem() ? '' : this.item);
		if (item === 'ironball') return true;
		// If a Fire/Flying type uses Burn Up and Roost, it becomes ???/Flying-type, but it's still grounded.
		if (!negateImmunity && this.hasType('Flying') && !('roost' in this.volatiles)) return false;
		if (this.hasAbility('levitate') || this.hasAbility('asonelunatone') && !this.battle.suppressingAttackEvents()) return null;
		if ('magnetrise' in this.volatiles) return false;
		if ('telekinesis' in this.volatiles) return false;
		if ('float' in this.volatiles) return false;
		return item !== 'airballoon';
		},
		setStatus(
		status: string | Condition,
		source: Pokemon | null = null,
		sourceEffect: Effect | null = null,
		ignoreImmunities = false
	) {
    if (!ignoreImmunities && status.id &&
				!(source?.hasAbility('asonesalazzle') && ['tox', 'psn'].includes(status.id))) {
			// the game currently never ignores immunities
			if (!this.runStatusImmunity(status.id === 'tox' ? 'psn' : status.id)) {
				this.battle.debug('immune to status');
				if ((sourceEffect as Move)?.status) {
					this.battle.add('-immune', this);
				}
				return false;
				}
			}
   	}
	},	
};

