export const Rulesets: {[k: string]: ModdedFormatData} = {
statusmod: {
        effectType: 'Rule',
        name: 'Status Mod',
        desc: "Displays new statuses as a volatile",
        onSwitchIn (pokemon) {
            if(pokemon.status) this.add('-start', pokemon, pokemon.status, '[silent]');
        },
        onSetStatus(status, target, source, effect) {
            this.add('-start', target, status, '[silent]');
        },
        onCureStatus(pokemon, source, effect) {
            const cured = effect?.status || pokemon.statusState?.prevStatus;
            if (cured) this.add('-end', pokemon, cured, '[silent]');
        },
    },
}