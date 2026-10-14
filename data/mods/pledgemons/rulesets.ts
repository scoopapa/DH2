export const Rulesets: {[k: string]: ModdedFormatData} = {
    pledgemoves: {
        effectType: 'Rule',
        name: 'Pledge Moves',
        desc: 'Grants all Pok&eacute;mon their STAB pledge moves in addition to their other moves.',
        onBegin() {
            const pledgeMoves = {
                Grass: this.dex.moves.get('grasspledge'),
                Fire: this.dex.moves.get('firepledge'),
                Water: this.dex.moves.get('waterpledge'),
            };
            for (const pokemon of this.getAllPokemon()) {
                for (const [key, value] of Object.entries(pledgeMoves)) {
                    let baseSpecies = pokemon.species.name;
                    if (baseSpecies.includes("-")) {
                        baseSpecies = baseSpecies.substring(0, baseSpecies.indexOf("-"))
                    }
                    if (pokemon.hasType(key)
                        || ["Ogerpon", "Rotom", "Silvally"].includes(baseSpecies)
                    ) {
                        const pledgeMove = {
                            move: value.name,
                            id: value.id,
                            pp: (value.pp + 6),
                            maxpp: (value.pp + 6),
                            target: value.target,
                            disabled: false,
                            used: false,
                        }
                        pokemon.moveSlots.push(pledgeMove);
                        pokemon.baseMoveSlots.push(pledgeMove);
                    }
                }
            }
        }
    }
};