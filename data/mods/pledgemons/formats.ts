import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Pledge Doubles",
		mod: 'pledgemons',
		desc: `6v6 doubles format where only Fire, Water and Grass types are legal. All pokemon gain the pledge moves they would have STAB for.`,
		gameType: 'doubles',
		ruleset: ['Standard NatDex', 'Data Mod', 'Pledge Moves'],
		banlist: ['AG', 'Arceus-Water', 'Kyogre', 'Kyogre-Primal', 'Palkia', 'Palkia-Origin', 'Ho-Oh', 'Arceus-Fire', 'Groudon-Primal', 'Reshiram', 'Arceus-Grass'],
		unbanlist: ['Chandelure-Mega', 'Chesnaught-Mega', 'Delphox-Mega', 'Emboar-Mega', 'Feraligatr-Mega', 'Greninja-Mega', 'Meganium-Mega', 'Pyroar-Mega', 'Starmie-Mega', 'Victreebel-Mega', 'Scovillain-Mega'],
		teambuilderFormat: 'National Dex', 
		onValidateTeam(team, format) {
            for (const set of team) {
                let species = this.dex.species.get(set.species);
                if (!(
                        species.types.includes("Fire") ||
                        species.types.includes("Grass") ||
                        species.types.includes("Water")
                    )) {
                    return [set.species + ' is not a Fire, Water or Grass-type.'];
                }
            }
		}
	}
];