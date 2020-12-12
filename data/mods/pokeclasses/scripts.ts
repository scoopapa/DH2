export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	init() {
		this.modData('Moves', 'sacredsword').flags.blade = 1;
		this.modData('Moves', 'secretsword').flags.blade = 1;
		this.modData('Moves', 'slash').flags.blade = 1;
		this.modData('Moves', 'nightslash').flags.blade = 1;
		this.modData('Moves', 'psychocut').flags.blade = 1;
		this.modData('Moves', 'leafblade').flags.blade = 1;
		this.modData('Moves', 'solarblade').flags.blade = 1;
		this.modData('Moves', 'razorshell').flags.blade = 1;
		this.modData('Moves', 'smartstrike').flags.blade = 1;
	},
};