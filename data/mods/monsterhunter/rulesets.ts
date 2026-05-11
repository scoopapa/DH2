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
    },
}