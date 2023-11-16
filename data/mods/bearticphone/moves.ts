export const Moves: {[k: string]: ModdedMoveData} = {
	bullseye1: {
		  num: 9000,
		  accuracy: true,
		  basePower: 0,
		  category: "Status",
		  name: "Bullseye 1",
	  shortDesc: "Raises crit ratio. Is only called by Bullseye",
		  pp: 30,
		  priority: 0,
		  flags: {snatch: 1},
		  condition: {
					onStart(target) {
					  this.add('-start', target, 'move: Bullseye 1');
					},
					onEnd(target) {
					  this.add('-end', target, 'Bullseye 1');
					},
			onModifyCritRatio(critRatio) {
			  return critRatio + 1;
			},
		  },
		  secondary: null,
		  target: "self",
		  type: "Normal",
	  },
  
  bullseye2: {
		  num: 9001,
		  accuracy: true,
		  basePower: 0,
		  category: "Status",
		  name: "Bullseye 2",
	  shortDesc: "Raises crit ratio. Is only called by Bullseye",
		  pp: 30,
		  priority: 0,
		  flags: {snatch: 1},
		  condition: {
					onStart(target) {
					  this.add('-start', target, 'move: Bullseye 2');
					},
					onEnd(target) {
					  this.add('-end', target, 'Bullseye 2');
					},
			onModifyCritRatio(critRatio) {
			  return critRatio + 2;
			},
		  },
		  secondary: null,
		  target: "self",
		  type: "Normal",
	  },
	  bullseye3: {
        num: 9002,
        accuracy: true,
        basePower: 0,
        category: "Status",
        name: "Bullseye 3",
    shortDesc: "Raises crit ratio. Is only called by Bullseye",
        pp: 30,
        priority: 0,
        flags: {snatch: 1},
        condition: {
                  onStart(target) {
                    this.add('-start', target, 'move: Bullseye 3');
                  },
                  onEnd(target) {
                    this.add('-end', target, 'Bullseye 3');
                  },
          onModifyCritRatio(critRatio) {
            return critRatio + 3;
          },
        },
        secondary: null,
        target: "self",
        type: "Normal",
    },

  bullseye4: {
        num: 9003,
        accuracy: true,
        basePower: 0,
        category: "Status",
        name: "Bullseye 4",
    shortDesc: "Raises crit ratio. Is only called by Bullseye",
        pp: 30,
        priority: 0,
        flags: {snatch: 1},
        condition: {
                  onStart(target) {
                    this.add('-start', target, 'move: Bullseye 4');
                  },
                  onEnd(target) {
                    this.add('-end', target, 'Bullseye 4');
                  },
          onModifyCritRatio(critRatio) {
            return critRatio + 4;
          },
        },
        secondary: null,
        target: "self",
        type: "Normal",
    },
};