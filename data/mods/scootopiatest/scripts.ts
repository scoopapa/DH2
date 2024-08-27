export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	inherit: "scootopia",
	teambuilderConfig: { excludeStandardTiers: true },
	init(){
		this.scootopia = {};
		this.scootopia.worldEffects = ["chaoticweather", "chaoticterrain", "cursedfield", "blessedfield", 
							"rainofmeteors", "rainofdew", "silentdomain", "stellaralignment"];
		this.scootopia.getWorldEffect = function() {
			for (let e of this.scootopia.worldEffects) {
				if (this.field.getPseudoWeather(e)) {
					return e;
				}
			}
			return false;
		}
		this.scootopia.worldEffectStart = function(w) {
			for (let e of this.scootopia.worldEffects) {
				if (this.field.getPseudoWeather(e) && e !== w) {
					this.field.removePseudoWeather(e);
				} else if ( !this.field.getPseudoWeather(e) && e === w ) {
					this.field.addPseudoWeather(w);
				}
			}
		}
		this.scootopia.getWorldEffectMove = function(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				const move = this.dex.moves.get(moveSlot.id);
				if (this.scootopia.worldEffects.includes(moveSlot.id)) {
					console.log(moveSlot.id);
					return move
				}
			}
		}
		this.scootopia.getImmunity = function(pokemon, w) {
			if (!w) w = this.scootopia.getWorldEffect();
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
					return false
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
