export const Rulesets: {[k: string]: ModdedFormatData} = {
    statusmod: {
        effectType: 'Rule',
        name: 'Status Mod',
        desc: "Displays new statuses as a volatile",
        onSwitchIn (pokemon) {
            if(pokemon.status === 'cfs') this.add('-start', pokemon, pokemon.status, '[silent]');
        },
    },
    evasionabilitiesclause: {
            effectType: 'ValidatorRule',
            name: 'Evasion Abilities Clause',
            desc: "Bans abilities that boost Evasion under certain weather conditions",
            banlist: ['Sand Veil'],
            onBegin() {
                this.add('rule', 'Evasion Abilities Clause: Evasion abilities are banned');
            },
        },
}