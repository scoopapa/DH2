export const Formats: {[k: string]: FormatData} = {
	sylvemonsintromod: {
		effectType: 'Rule',
		name: 'SylveMons Intro Mod',
		desc: 'At the start of a battle, gives each player information about the the archive and SylveMons Resources thread so they can use them to get information about new additions',
		onBegin() {
			this.add('-message', `Welcome to SylveMons`);
			this.add('-message', `This is a National Dex-based format where a multitude of moves, items, and abilities have been changed or added and a number of Pokemon have had their types changed as well!.`);
			this.add('-message', `If you want information on all of the new additions in this mod, then you can find the's spreadsheet here:`);
			this.add('-message', `https://docs.google.com/spreadsheets/d/18DiYjbZXv1Nm7tU-W0OMgPow0ZO7J2ETJF-hWapwM-o/edit?usp=sharing`);
			this.add('-message', `You can also use /dt to get information quickly!`);
			this.add('-message', `You can also find metagame resources here:`);
			this.add('-message', `https://www.smogon.com/forums/threads/3646673/`);
		},
	},
};
