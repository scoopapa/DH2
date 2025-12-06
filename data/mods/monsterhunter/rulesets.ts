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
}