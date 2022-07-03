export const Items: {[itemid: string]: ModdedItemData} = {
  normalgem: {
    inherit: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === 'Status' || ['firepledge', 'grasspledge', 'waterpledge'].includes(move.id)) return;
      if (source.types.includes(move.type)) {
        if (source.useItem()) {
          this.add('-enditem', source, 'Normal Gem', '[from] gem', '[move] ' + move.name);
          source.addVolatile('gem');
        }
      }
    },
    desc: "Holder's first successful same-type attack will have 1.3x power. Single use.",
  },
  silkscarf: {
    inherit: true,
    onBasePower(basePower, user, target, move) {
      if (user.types.includes(move.type)) {
        return this.chainModify([0x1333, 0x1000]);
      }
    },
    desc: "Holder's same-type attacks have 1.2x power.",
  },
  chilanberry: {
    inherit: true,
    onSourceModifyDamage(damage, source, target, move) {
      if (target.types.includes(move.type) && (!target.volatiles['substitute'] || move.flags['authentic'] || (move.infiltrates && this.gen >= 6))) {
        if (target.eatItem()) {
          this.debug('-50% reduction');
          this.add('-enditem', target, this.effect, '[weaken]');
          return this.chainModify(0.5);
        }
      }
    },
    desc: "Halves damage taken from an attack of the same type as the holder. Single use.",
  },
	normaliumz: {
		name: "Normalium Z",
		spritenum: 631,
		onTakeItem: false,
		zMove: true,
		zMoveType: "Null",
		num: 776,
		gen: 7,
	},
};
