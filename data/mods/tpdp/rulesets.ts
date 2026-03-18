export const Rulesets: {[k: string]: FormatData} = {
	sleepclausemod: {
        effectType: 'Rule',
        name: 'Sleep Clause Mod',
        desc: "Prevents players from putting more than one of their opponent's Pok&eacute;mon to sleep at a time",
        onBegin() {
            this.add('rule', 'Sleep Clause Mod: Limit one foe put to sleep');
        },
        onSetStatus(status, target, source) {
            if (source && source.isAlly(target)) {
                return;
            }
            if (status.id === 'slp') {
                for (const pokemon of target.side.pokemon) {
                    if (pokemon.hp && pokemon.status === 'slp') {
                        if (!pokemon.statusState.source || !pokemon.statusState.source.isAlly(pokemon)) {
                            this.add('-message', 'Sleep Clause Mod activated.');
                            this.hint("Sleep Clause Mod prevents players from putting more than one of their opponent's Pokémon to sleep at a time");
                            return false;
                        }
                    }
                }
            }
        },
    },
	statusmod: {
        effectType: 'Rule',
        name: 'Status Mod',
        desc: "Displays new statuses as a volatile",
        onSwitchIn (pokemon) {
			if(pokemon.status) this.add('-start', pokemon, pokemon.status, '[silent]');
		},
    },
	stylemonsmovelegality: {
		effectType: 'ValidatorRule',
		name: 'Stylemons Move Legality',
		teambuilderConfig: "stylemons",
		desc: "Allows Puppets to use any move that they or another style learns",
		checkCanLearn(move, species, setSources, set) {
			const matchingSpecies = this.dex.species.all()
				.filter(s => (
					s.spriteid === species.spriteid && !this.ruleTable.isBannedSpecies(s)
				));
			const someCanLearn = matchingSpecies.some(s => this.checkCanLearn(move, s, setSources, set) === null);
			if (someCanLearn) return null;
			return this.checkCanLearn(move, species, setSources, set);
		},
	},
}