export const Moves: {[k: string]: ModdedMoveData} = {
	// coding the max meter side conditions (AKA I really should've worked off of Stockpile)
	maxmeter1: {
		shortDesc: "The first level of Max Meter.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Max Meter 1",
		pp: 1,
		priority: 0,
		flags: {},
		noSketch: true,
		sideCondition: 'maxmeter1',
		condition: {
			onAfterMoveSecondarySelf(source, target, move) {
				if (!move || !target) return;
				if (source.hasType(move.type)) {
					source.side.removeSideCondition('maxmeter1');
					source.side.addSideCondition('maxmeter2');
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Max Meter 1');
				this.add('-message', `This side has 1 level of Max Meter!`);
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 2,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Max Meter 1');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Fighting",
	},
	maxmeter2: {
		shortDesc: "The second level of Max Meter.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Max Meter 2",
		pp: 1,
		priority: 0,
		flags: {},
		noSketch: true,
		sideCondition: 'maxmeter2',
		condition: {
			onAfterMoveSecondarySelf(source, target, move) {
				if (!move || !target) return;
				if (source.hasType(move.type)) {
					source.side.removeSideCondition('maxmeter2');
					source.side.addSideCondition('maxmeter3');
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Max Meter 2');
				this.add('-message', `This side has 2 levels of Max Meter!`);
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 2,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Max Meter 2');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Fighting",
	},
	maxmeter3: {
		shortDesc: "The third level of Max Meter.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Max Meter 3",
		pp: 1,
		priority: 0,
		flags: {},
		noSketch: true,
		sideCondition: 'maxmeter3',
		condition: {
			onAfterMoveSecondarySelf(source, target, move) {
				if (!move || !target) return;
				if (source.hasType(move.type)) {
					source.side.removeSideCondition('maxmeter3');
					source.side.addSideCondition('maxmeter4');
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Max Meter 3');
				this.add('-message', `This side has 3 levels of Max Meter!`);
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 2,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Max Meter 3');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Fighting",
	},
	maxmeter4: {
		shortDesc: "The fourth level of Max Meter.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Max Meter 4",
		pp: 1,
		priority: 0,
		flags: {},
		noSketch: true,
		sideCondition: 'maxmeter4',
		condition: {
			onAfterMoveSecondarySelf(source, target, move) {
				if (!move || !target) return;
				if (source.hasType(move.type)) {
					source.side.removeSideCondition('maxmeter4');
					source.side.addSideCondition('maxmeter5');
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Max Meter 4');
				this.add('-message', `This side has 4 levels of Max Meter!`);
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 2,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Max Meter 4');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Fighting",
	},
	maxmeter5: {
		shortDesc: "The fifth level of Max Meter.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Max Meter 5",
		pp: 1,
		priority: 0,
		flags: {},
		noSketch: true,
		sideCondition: 'maxmeter5',
		condition: {
			onAfterMoveSecondarySelf(source, target, move) {
				if (!move || !target) return;
				if (source.hasType(move.type)) {
					source.side.removeSideCondition('maxmeter5');
					source.side.addSideCondition('maxmeter6');
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Max Meter 5');
				this.add('-message', `This side has 5 levels of Max Meter!`);
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 2,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Max Meter 5');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Fighting",
	},
	maxmeter6: {
		shortDesc: "The sixth level of Max Meter.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Max Meter 6",
		pp: 1,
		priority: 0,
		flags: {},
		noSketch: true,
		sideCondition: 'maxmeter6',
		condition: {
			onAfterMoveSecondarySelf(source, target, move) {
				if (!move || !target) return;
				if (source.hasType(move.type)) {
					source.side.removeSideCondition('maxmeter6');
					source.side.addSideCondition('maxmeter7');
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Max Meter 6');
				this.add('-message', `This side has 6 levels of Max Meter!`);
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 2,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Max Meter 6');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Fighting",
	},
	maxmeter7: {
		shortDesc: "The seventh and final level of Max Meter.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Max Meter 7",
		pp: 1,
		priority: 0,
		flags: {},
		noSketch: true,
		sideCondition: 'maxmeter7',
		condition: {
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Max Meter 7');
				this.add('-message', `This side has 7 levels of Max Meter!`);
				this.add('-message', `The Max Meter is now maxed out!`);
				if (side.sideConditions['dynamaxused']) {
					side.dynamaxUsed = true;
				} else {
					side.dynamaxUsed = false;				
				}
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 2,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Max Meter 7');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Fighting",
	},
	dynamaxused: {
		shortDesc: "Prevents Dynamax from being used multiple times.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Dynamax Used",
		pp: 5,
		priority: 0,
		flags: {},
		noSketch: true,
		sideCondition: 'dynamaxused',
		condition: {},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
};
