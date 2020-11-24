export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	init() {
		this.modData('Movedex', 'sacredsword').flags.blade = 1;
		this.modData('Movedex', 'secretsword').flags.blade = 1;
		this.modData('Movedex', 'slash').flags.blade = 1;
		this.modData('Movedex', 'nightslash').flags.blade = 1;
		this.modData('Movedex', 'psychocut').flags.blade = 1;
		this.modData('Movedex', 'leafblade').flags.blade = 1;
		this.modData('Movedex', 'solarblade').flags.blade = 1;
		this.modData('Movedex', 'razorshell').flags.blade = 1;
		this.modData('Movedex', 'smartstrike').flags.blade = 1;
	},
};