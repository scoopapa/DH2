export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	init(){
		const data = this.dataCache
		data.PP = {};
		const types = ["Normal","Fire","Water","Grass","Psychic","Dark","Fighting"];
		data.PP.debuffText = {
			"Fire": "Applies Burn for 3 turns.",
			"Water": "Applies Halved Fire-Type Damage for 3 turns.",
			"Grass": "Applies Leech Seed for 3 turns.",
			"Psychic": "lowers Atk and Sp Atk for 3 turns by 25%.",
			"Dark": "lowers Speed to 2/3 for 3 turns.",
			"Fighting": "lowers Def and Sp Def for 3 turns by 25%.",
		};
		data.PP.buffText = {
			"Fire": "Applies Aqua Ring for 3 turns.",
			"Water": "Target's moves gain 50% HP drain for 3 turns.",
			"Grass": "Applies Flash Fire for 3 turns.",
			"Psychic": "raises chance of landing a secondary effect for 3 turns.",
			"Dark": "Raises Critical Hit Ratio for 3 turns.",
			"Fighting": "Target's moves use the opponent's lower defensive stat for 3 turns.",
		};
		data.PP.applyTypeDebuff = function(target, atkType){
			switch (atkType){ // DEBUFFS - After landing a Super Effective Attack
				case "Grass": //applies Leech Seed for 3 turns
					
					break;
				case "Fire": //applies Burn for 3 turns
					
					break;
				case "Water": //applies Halved Fire-Type Damage for 3 turns
					
					break;
				case "Psychic": //lowers Atk and Sp Atk for 3 turns * As if affected by a Ruin ability 
					
					break;
				case "Dark": //lowers Speed for 3 turns ** Status that leaves the mon at -1 Speed (Think of it as a reverse Paradox-Ability Speed boost)
					
					break;
				case "Fighting": //lowers Def and Sp Def for 3 turns * As if affected by a Ruin ability 
					
					break;
				case "Normal": 
			}
		}
		data.PP.applyTypeBuff = function(target, atkType){
			switch (atkType){ // BUFFS - After landing a Resisted Attack
				case "Grass": //applies Flash Fire for 3 turns
					
					break;
				case "Fire": //applies Aqua Ring for 3 turns
					
					break;
				case "Water": //applies a status that makes that Pokémon's moves heal for 50% of damage dealt for 3 turns
					
					break;
				case "Psychic": //raises chance of landing a secondary effect for 3 turns
					
					break;
				case "Dark": //raises Critical Hit Ratio for 3 turns
					
					break;
				case "Fighting": //applies a status that makes your moves target the opponent's lower defensive stat for 3 turns 
					
					break;
				case "Normal": 
			}
		}
	}
};
