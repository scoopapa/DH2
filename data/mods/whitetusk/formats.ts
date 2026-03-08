import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] White Tusk",

		mod: 'whitetusk',
		ruleset: ['Standard', 'Data Mod'],
		banlist: ['All Pokemon', 'King\'s Rock', 'Baton Pass'],
		unbanlist: ['Dust Bunnie', 'Rebirb', 'Strummingbird', 'Strummingbird-Viola', 'Strummingbird-Cello', 'Strummingbird-Contrabass', 'Strummingbird-Acoustic', 'Strummingbird-Electric', 'Strummingbird-Bass', 'Xylomist', 'Yeomelt', 'Zoplite', 'Yeoxylo', 'Xylozop', 'Zopyeo', 'Xylyeozop', 'Xylobone', 'Dormirr', 'Pufferfinch', 'Gumbawl', 'Gumbrawl', 'Gumbrawl-Bubble', 'Gumbrawl-Fresh', 'Gnawing Bark', 'Iron Mint', 'Caramilitant', 'Toughfee', 'Gasharmoir', 'Gumbrawl-Gachamech', 'Tartridge', 'Opixsi', 'Pinfrino', 'Leagle', 'Kuadrosin', 'Blite', 'Doctoxin', 'Moosquito', 'Parrox'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			const combinationTable = ['Xylomist', 'Yeomelt', 'Zoplite', 'Yeoxylo', 'Xylozop', 'Zopyeo', 'Xylyeozop'];
			let combinationTest = [];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				console.log(template.name);
				if (combinationTable.includes(template.name)) {
					combinationTest.push(template.name);
				}
			}
			if (combinationTest.length > 1) {	//Skip the check if only one was found at most
				if ((combinationTest.includes('Xylomist') && (combinationTest.includes('Yeoxylo') || combinationTest.includes('Xylozop') || combinationTest.includes('Xylyeozop')))
					|| (combinationTest.includes('Yeomelt') && (combinationTest.includes('Yeoxylo') || combinationTest.includes('Zopyeo') || combinationTest.includes('Xylyeozop')))
					|| (combinationTest.includes('Zoplite') && (combinationTest.includes('Xylozop') || combinationTest.includes('Zopyeo') || combinationTest.includes('Xylyeozop')))) {
					return ['You cannot have XYZ Pokemon with their combined forms.'];
				}
			}
		},
	}
];