export const Rulesets: {[k: string]: ModdedFormatData} = {
    // Hidden Power IV override rule
    nohptypeiv: {
        effectType: 'Rule',
        name: 'No HP Type IV Enforcement',
        desc: "Hidden Power does not modify or require specific IVs.",
        onValidateSet(set) {
            // Intentionally empty — prevents the teambuilder from auto-adjusting IVs or showing warnings about Hidden Power type mismatches.
        },
    },
};