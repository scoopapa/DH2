export const Rulesets: {[k: string]: ModdedFormatData} = {
statusmod: {
        effectType: 'Rule',
        name: 'Status Mod',
        desc: "Displays new statuses as a volatile",
        onSwitchIn (pokemon) {
            if(pokemon.status) this.add('-start', pokemon, pokemon.status, '[silent]');
        },
    },
}