export const Rulesets: {[k: string]: ModdedFormatData} = {
    statusmod: {
        effectType: 'Rule',
        name: 'Status Mod',
        desc: "Displays Dragonblight as a volatile",
        onSwitchIn(pokemon) {
            if (pokemon.status === 'dragonblight') {
                this.add('-start', pokemon, 'dragonblight', '[silent]');
            }
        },
        onSetStatus(status, target, source, effect) {
            if (status === 'dragonblight') {
                this.add('-start', target, 'dragonblight', '[silent]');
            }
        },
        onCureStatus(pokemon, source, effect) {
            const cured = effect?.status || pokemon.statusState?.prevStatus;
            if (cured === 'dragonblight') {
                this.add('-end', pokemon, 'dragonblight', '[silent]');
            }
        },
    },
    spriteviewer: {
		effectType: 'ValidatorRule',
		name: 'Sprite Viewer',
		desc: "Displays a fakemon's sprite in chat when it is switched in for the first time",
		onBegin() {
			this.add('rule', 'Sprite Viewer: Displays sprites in chat');
		},
		onSwitchIn(pokemon) {
			if (!this.effectState[pokemon.species.id]) {
				this.add('-message', `${pokemon.species.name}'s Sprite:`);
				this.add(`raw|<img src="https://raw.githubusercontent.com/scoopapa/DH2/refs/heads/main/data/mods/monsterhunter/sprites/front/${pokemon.species.id}.png" height="96" width="96">`);
				this.effectState[pokemon.species.id] = true;
			}
		},
	},
}