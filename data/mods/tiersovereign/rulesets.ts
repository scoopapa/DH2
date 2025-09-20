export const Rulesets: {[k: string]: ModdedFormatData} = {
tiersovereignmod: {
		effectType: 'Rule',
		name: 'Tier Sovereign Mod',
		desc: 'At the start of a battle, gives each player a link to the Tier Sovereign thread so orangesodapop can shamelessly plug his mod.',
		onBegin() {
			this.add(`raw|<img src="https://i.imgur.com/vyDA28u.png" height="213" width="381">`);
			this.add('-message', `Welcome to Tier Soveriegn!`);
			this.add('-message', `This is a mod that revolves around a Sovereign who is central to the tiers function, Lindwallow!`);
			this.add('-message', `You can find our thread and metagame resources here:`);
			this.add('-message', `https://www.smogon.com/forums/threads/tier-sovereign-gen-9-natdex-slate-3-submissions-closed.3768338/`);
		},
	},
};