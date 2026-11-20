// Robot Masters-specific changes layered on top of the standard [Gen 9] OU format.
const ROBOT_MASTERS_ROSTER = new Set([
	'megaman',
	'cutman', 'gutsman', 'iceman', 'bombman', 'fireman', 'elecman',
	'metalman', 'airman', 'bubbleman', 'quickman', 'crashman', 'flashman',
	'heatman', 'woodman', 'needleman', 'magnetman', 'geminiman', 'hardman',
	'topman', 'snakeman', 'sparkman', 'shadowman', 'brightman', 'toadman',
	'drillman', 'pharaohman', 'ringman', 'dustman', 'diveman', 'skullman',
	'dynamoman', 'coldman', 'groundman', 'pirateman', 'burnerman', 'magicman',
	'concreteman', 'tornadoman', 'splashwoman', 'plugman', 'jewelman',
	'hornetman', 'magmaman', 'galaxyman',
	'stardroidterra', 'stardroidmercury', 'stardroidvenus', 'stardroidmars',
	'stardroidjupiter', 'stardroidsaturn', 'stardroiduranus', 'stardroidpluto',
	'stardroidneptune',
]);

export const Rulesets: import('../../../sim/dex-formats').ModdedFormatDataTable = {
	robotmastersclause: {
		inherit: true,
		ruleset: ['Terastal Clause'],
		onValidateTeam(team) {
			const rejected: string[] = [];
			for (const set of team) {
				const species = this.dex.species.get(set.species);
				if (!ROBOT_MASTERS_ROSTER.has(species.id)) rejected.push(species.name);
			}
			if (rejected.length) {
				return [
					'Only Mega Man, Robot Masters, and Stardroids are allowed in this format.',
					'Not allowed: ' + rejected.join(', '),
				];
			}
		},
	},
};
