export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	teambuilderConfig: {
		// for micrometas to only show custom tiers
		// excludeStandardTiers: true,
		// only to specify the order of custom tiers
	},
	init() {
		for (const side in this.sides) {
			this.sides[side].usedSuperType = false;
			this.sides[side].superTypeUser = "";
		}
		for (const id in this.dataCache.Pokedex) { // check the dex for fusions
			if (!this.dataCache.Learnsets[id]) continue;
			const learnset = this.dataCache.Learnsets[id].learnset;
			for ( let moveid in learnset ) {
				const move = this.dataCache.Moves[moveid];
				if (!move) continue;
				if (!move.flags) continue;
				let movesAdded = {};
				let str = "crystalcutter";
				if (!movesAdded[str] 
					&& move.flags['slicing'] 
					&& move.category === "Physical"
				) {
					this.modData('Learnsets', id).learnset[str] = ['9L1'];
					movesAdded[str] = true;
				}
				str = "crystaltail";
				if (!movesAdded[str] 
					&& moveid.includes("tail") 
					&& moveid !== "tailwind"
				) {
					this.modData('Learnsets', id).learnset[str] = ['9L1'];
					movesAdded[str] = true;
				}
				str = "crystalbash";
				if (!movesAdded[str] 
					&& ( move.recoil 
						|| move.flags['punch'] 
						|| (move.secondary && move.secondary.flinch) 
						|| moveid === "bodyslam" )
				) {
					this.modData('Learnsets', id).learnset[str] = ['9L1'];
					movesAdded[str] = true;
				}
				str = "crystalbeam";
				if (!movesAdded[str]
					&& ( move.category === "Special" 
						&& move.basePower === 90
						&& ["Water", "Grass", "Fire", "Electric", "Ice", "Psychic", "Dragon", "Dark"].includes(move.type)) 
					|| moveid === "mooblast" )
				{
					this.modData('Learnsets', id).learnset[str] = ['9L1'];
					movesAdded[str] = true;
				}
				str = "crystalburst";
				if (!movesAdded[str]
					&& ( move.category === "Special" 
						&& move.basePower >= 110
						&& (moveid !== 'hyperbeam' && moveid !== 'focusblast'))
						||	( moveid === 'storedpower' || moveid === 'explosion' )
				) {
					this.modData('Learnsets', id).learnset[str] = ['9L1'];
					movesAdded[str] = true;
				}
				str = "crystalcage";
				if (!movesAdded[str] && ["Electric", "Ground", "Steel", "Rock"].includes(move.type)) {
					this.modData('Learnsets', id).learnset[str] = ['9L1'];
					movesAdded[str] = true;
				}
				str = "crystalhealing";
				if (!movesAdded[str] 
					&& ( (move.flags['heal'] && moveid !== 'rest') 
						|| moveid === "healingwish"
						|| moveid === "lunardance"
						|| moveid === "wish" )
				) {
					this.modData('Learnsets', id).learnset[str] = ['9L1'];
					movesAdded[str] = true;
				}
				str = "crystalfortification";
				if (!movesAdded[str] 
					&& ( move.heal
						|| move.type === "Ice" 
						|| move.type === "Rock"
						|| move.type === "Steel"
					)
				) {
					this.modData('Learnsets', id).learnset[str] = ['9L1'];
					movesAdded[str] = true;
				}
				str = "crystalshard";
				if (!movesAdded[str] 
					&& (( move.category === "Physical"&& ( move.type === "Rock" || move.type === "Steel"))
						|| move.flags['slicing']
						|| ( moveid === "stealthrock" || moveid === "spikes" || moveid === "toxicspikes" || moveid === "stickyweb" )
				)) {
					this.modData('Learnsets', id).learnset[str] = ['9L1'];
					movesAdded[str] = true;
				}
				str = "feralbite";
				if (!movesAdded[str] 
					&& move.flags['bite'] 
				) {
					this.modData('Learnsets', id).learnset[str] = ['9L1'];
					movesAdded[str] = true;
				}
				str = "feralshred";
				if (!movesAdded[str] 
					&& ( move.flags["slicing"] 
						|| moveid.includes("claw")
						|| move.flags["bite"]
					)
				) {
					this.modData('Learnsets', id).learnset[str] = ['9L1'];
					movesAdded[str] = true;
				}
				str = "feralrush";
				if (!movesAdded[str] 
					&& move.recoil 
				) {
					this.modData('Learnsets', id).learnset[str] = ['9L1'];
					movesAdded[str] = true;
				}
				str = "feralshriek";
				if (!movesAdded[str] 
					&& move.flags['sound']
				) {
					this.modData('Learnsets', id).learnset[str] = ['9L1'];
					movesAdded[str] = true;
				}
				str = "feralpower";
				if (!movesAdded[str] 
					&& move.category === "Special" 
					&& move.basePower >= 80
					&& ["Normal", "Bug", "Poison", "Ghost", "Ground", "Rock", "Fighting", "Steel", "Flying"].includes(move.type)
					&& (moveid !== 'hyperbeam')
					&& (moveid !== 'terablast')
				) {
					this.modData('Learnsets', id).learnset[str] = ['9L1'];
					movesAdded[str] = true;
				}
				str = "feralbreath";
				if (!movesAdded[str] 
					&& ( move.flags['bite'] 
					|| moveid.includes("breath")
					|| moveid === "belch" )
				) {
					this.modData('Learnsets', id).learnset[str] = ['9L1'];
					movesAdded[str] = true;
				}
				str = "feralroar";
				if (!movesAdded[str] 
					&& ( moveid === "roar"
					|| moveid === "nobleroar"
					|| moveid === "screech"
					)
				) {
					this.modData('Learnsets', id).learnset[str] = ['9L1'];
					movesAdded[str] = true;
				}
				str = "feralspray";
				if (!movesAdded[str] 
					&& ( moveid === "snarl"
					|| moveid === "mudsport"
					|| move.type === "Water"
					|| ( move.type === "Poison" && moveid !== "toxic" )
					)
				) {
					this.modData('Learnsets', id).learnset[str] = ['9L1'];
					movesAdded[str] = true;
				}
				str = "feralresilience";
				if (!movesAdded[str] 
					&& ( move.heal
						|| move.type === "Dragon"
						|| move.type === "Fighting" )
				) {
					this.modData('Learnsets', id).learnset[str] = ['9L1'];
					movesAdded[str] = true;
				}
			}
		}
		
	},
};
