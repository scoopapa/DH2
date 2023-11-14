export const Rulesets: {[k: string]: FormatData} = {
	stylemonsmovelegality: {
		effectType: 'ValidatorRule',
		name: 'Stylemons Move Legality',
		//teambuilderConfig: "stabmons",
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