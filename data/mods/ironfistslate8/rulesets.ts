export const Rulesets: {[k: string]: ModdedFormatData} = {
	bigbuttonrule: {
		name: "Big Button Rule",
		effectType: "Rule",
		desc: `Pok&eacute;mon who have turned Big will remain Big when switched out.`,
		onSwitchIn(pokemon) {
			if (pokemon.big) {
				pokemon.addVolatile('bigbutton');
			}
		},
	},
	milfrule: {
		name: "MILF Rule",
		effectType: "Rule",
		desc: `Pok&eacute;mon with the ability MILF will add 2 Fishing Tokens at the beginning of the battle.`,
		onBegin() {
			for (const side of this.sides) {
				for (const pokemon of side.pokemon) {
					if (pokemon.set.ability === 'M I L F') side.addFishingTokens(2);
				}
			}
		},
	},
	ohmyrodrule: {
		name: "Ohmyrod Rule",
		effectType: "Rule",
		desc: `Ohmyrod gets a special message when switching in.`,
		onSwitchIn(pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Ohmyrod') {
				this.add('-message', 'it is ohmyrod time :D');
			}
		}
	},
	seriousrule: {
		name: "Serious Rule",
		effectType: "Rule",
		desc: `Pok&eacute;mon with the nature Serious will gain the Serious type on switchin.`,
		onSwitchIn(pokemon) {
			if (pokemon.set.nature === 'Serious') {
				if (pokemon.addType('Serious')) this.add('-start', pokemon, 'typeadd', 'Serious');
			}
		}
	},
};