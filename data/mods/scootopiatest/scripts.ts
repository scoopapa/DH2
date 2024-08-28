export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	inherit: "scootopia",
	teambuilderConfig: { excludeStandardTiers: true },
	init(){
		const scoot = this.dataCache
		scoot.scootopia = {};
		scoot.scootopia.shatteredOrbUsed = [false, false];
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
	}
};
