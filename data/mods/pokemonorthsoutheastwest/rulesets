export const Rulesets: {[k: string]: ModdedFormatData} = {
    ancientgauge: {
                effectType: 'Rule',
                name: 'Ancient Gauge',
                desc: 'ancient gauge for nsew',
                onAfterMove(target, source, move) {
                  if(!target.ancientGauge) target.ancientGauge = 0;
                  let amount = 0;
                  if(move === [something]) target.ancientGauge += [1];
                  //etc etc
                  this.add('-message', `${target.name} gained ${1} ancient gauge.`);
                  if(target.ancientGauge > [2]) {
                    this.add('-message', `${target.name} triggered ancient gauge`);
                    target.ancientGauge -= [threshold];
                    const newMove = {
                            move: this.dex.moves.get([newmove]),
                            id: [newmove].id,
                            pp: 1, //probably 1
                            maxpp: 1, //probably 1
                            target: [newmove].target,
                            disabled: false,
                            used: false,
                        };
                        source.moveSlots[source.moveSlots.length] = newMove;
                        source.baseMoveSlots[source.moveSlots.length - 1] = newMove;
                  }
                },
    },
};
