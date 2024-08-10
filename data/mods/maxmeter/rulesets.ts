export const Rulesets: {[k: string]: ModdedFormatData} = {
	supermoveadditions: {
		effectType: 'Rule',
		name: 'Super Move Additions',
		desc: 'Adds a Super to every Pokemon.',
    	onBegin() {
          for (const side0 of this.sides[0].pokemon) {
      	 	  const newMove  = {
      	    	move: "Super Move",
            	id: "supermove",
            	pp: 10,
              maxpp: 10,
            	target: "normal",
            	disabled: false,
              used: false,
         	};
    			side0.baseMoveSlots[side0.baseMoveSlots.length] = newMove
    			side0.moveSlots[side0.moveSlots.length] = newMove
    		  }
          for (const side1 of this.sides[1].pokemon) {
            const newMove  = {
              move: "Super Move",
            	id: "supermove",
            	pp: 10,
              maxpp: 10,
            	target: "normal",
            	disabled: false,
            	used: false,
         	};
    			side1.baseMoveSlots[side1.baseMoveSlots.length] = newMove
    			side1.moveSlots[side1.moveSlots.length] = newMove
        }
      },
    },
  };
