export const Items: {[k: string]: ModdedItemData} = {
	whiteflower: {
		name: "White Flower",
		spritenum: 307,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			const pledges = ['firepledge', 'grasspledge', 'waterpledge'];
			if (target === source || move.category === 'Status' || pledges.includes(move.id)) return;
			if (move.type === 'Normal' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 564,
		gen: 5,
		desc: "Holder's first successful Normal-type attack will have 1.3x power. Single use.",
	},
	
	tinytoadstool: {
		name: "Tiny Toadstool",
		spritenum: 307,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			const pledges = ['firepledge', 'grasspledge', 'waterpledge'];
			if (target === source || move.category === 'Status' || pledges.includes(move.id)) return;
			if (move.type === 'Fairy' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 564,
		gen: 8,
		desc: "Holder's first successful Fairy-type attack will have 1.3x power. Single use.",
	},
	
	frostylichen: {
		name: "Frosty Lichen",
		spritenum: 307,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			const pledges = ['firepledge', 'grasspledge', 'waterpledge'];
			if (target === source || move.category === 'Status' || pledges.includes(move.id)) return;
			if (move.type === 'Ice' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 564,
		gen: 8,
		desc: "Holder's first successful Ice-type attack will have 1.3x power. Single use.",
	},
	
	honeycomb: {
		name: "Honeycomb",
		spritenum: 307,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			const pledges = ['firepledge', 'grasspledge', 'waterpledge'];
			if (target === source || move.category === 'Status' || pledges.includes(move.id)) return;
			if (move.type === 'Bug' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 564,
		gen: 8,
		desc: "Holder's first successful Bug-type attack will have 1.3x power. Single use.",
	},
	
	midnightflower: {
		name: "Midnight Flower",
		spritenum: 307,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			const pledges = ['firepledge', 'grasspledge', 'waterpledge'];
			if (target === source || move.category === 'Status' || pledges.includes(move.id)) return;
			if (move.type === 'Dark' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 564,
		gen: 8,
		desc: "Holder's first successful Dark-type attack will have 1.3x power. Single use.",
	},
	
	royalflower: {
		name: "Royal Flower",
		spritenum: 307,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			const pledges = ['firepledge', 'grasspledge', 'waterpledge'];
			if (target === source || move.category === 'Status' || pledges.includes(move.id)) return;
			if (move.type === 'Dragon' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 564,
		gen: 8,
		desc: "Holder's first successful Dragon-type attack will have 1.3x power. Single use.",
	},
	
	redflower: {
		name: "Red Flower",
		spritenum: 307,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			const pledges = ['firepledge', 'grasspledge', 'waterpledge'];
			if (target === source || move.category === 'Status' || pledges.includes(move.id)) return;
			if (move.type === 'Fire' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 564,
		gen: 8,
		desc: "Holder's first successful Fire-type attack will have 1.3x power. Single use.",
	},
	
	floatyflower: {
		name: "Floaty Flower",
		spritenum: 307,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			const pledges = ['firepledge', 'grasspledge', 'waterpledge'];
			if (target === source || move.category === 'Status' || pledges.includes(move.id)) return;
			if (move.type === 'Flying' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 564,
		gen: 8,
		desc: "Holder's first successful Flying-type attack will have 1.3x power. Single use.",
	},
	
	ruggedflower: {
		name: "Rugged Flower",
		spritenum: 307,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			const pledges = ['firepledge', 'grasspledge', 'waterpledge'];
			if (target === source || move.category === 'Status' || pledges.includes(move.id)) return;
			if (move.type === 'Fighting' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 564,
		gen: 8,
		desc: "Holder's first successful Fighting-type attack will have 1.3x power. Single use.",
	},
	
	shadyflower: {
		name: "Shady Flower",
		spritenum: 307,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			const pledges = ['firepledge', 'grasspledge', 'waterpledge'];
			if (target === source || move.category === 'Status' || pledges.includes(move.id)) return;
			if (move.type === 'Ghost' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 564,
		gen: 8,
		desc: "Holder's first successful Ghost-type attack will have 1.3x power. Single use.",
	},
	
	mintyleaf: {
		name: "Minty Leaf",
		spritenum: 307,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			const pledges = ['firepledge', 'grasspledge', 'waterpledge'];
			if (target === source || move.category === 'Status' || pledges.includes(move.id)) return;
			if (move.type === 'Grass' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 564,
		gen: 8,
		desc: "Holder's first successful Grass-type attack will have 1.3x power. Single use.",
	},
	
	earthyroot: {
		name: "Earthy Root",
		spritenum: 307,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			const pledges = ['firepledge', 'grasspledge', 'waterpledge'];
			if (target === source || move.category === 'Status' || pledges.includes(move.id)) return;
			if (move.type === 'Ground' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 564,
		gen: 8,
		desc: "Holder's first successful Ground-type attack will have 1.3x power. Single use.",
	},
	
	yellowflower: {
		name: "Yellow Flower",
		spritenum: 307,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			const pledges = ['firepledge', 'grasspledge', 'waterpledge'];
			if (target === source || move.category === 'Status' || pledges.includes(move.id)) return;
			if (move.type === 'Electric' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 564,
		gen: 8,
		desc: "Holder's first successful Electric-type attack will have 1.3x power. Single use.",
	},
	
	wiltedflower: {
		name: "Wilted Flower",
		spritenum: 307,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			const pledges = ['firepledge', 'grasspledge', 'waterpledge'];
			if (target === source || move.category === 'Status' || pledges.includes(move.id)) return;
			if (move.type === 'Poison' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 564,
		gen: 8,
		desc: "Holder's first successful Poison-type attack will have 1.3x power. Single use.",
	},
	
	silverflower: {
		name: "Silver Flower",
		spritenum: 307,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			const pledges = ['firepledge', 'grasspledge', 'waterpledge'];
			if (target === source || move.category === 'Status' || pledges.includes(move.id)) return;
			if (move.type === 'Steel' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 564,
		gen: 8,
		desc: "Holder's first successful Steel-type attack will have 1.3x power. Single use.",
	},
	
	blueflower: {
		name: "Blue Flower",
		spritenum: 307,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			const pledges = ['firepledge', 'grasspledge', 'waterpledge'];
			if (target === source || move.category === 'Status' || pledges.includes(move.id)) return;
			if (move.type === 'Water' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 564,
		gen: 8,
		desc: "Holder's first successful Water-type attack will have 1.3x power. Single use.",
	},
	
	starchyroot: {
		name: "Starchy Root",
		spritenum: 307,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			const pledges = ['firepledge', 'grasspledge', 'waterpledge'];
			if (target === source || move.category === 'Status' || pledges.includes(move.id)) return;
			if (move.type === 'Rock' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 564,
		gen: 8,
		desc: "Holder's first successful Rock-type attack will have 1.3x power. Single use.",
	},
	
	velvetflower: {
		name: "Velvet Flower",
		spritenum: 307,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			const pledges = ['firepledge', 'grasspledge', 'waterpledge'];
			if (target === source || move.category === 'Status' || pledges.includes(move.id)) return;
			if (move.type === 'Psychic' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 564,
		gen: 8,
		desc: "Holder's first successful Psychic-type attack will have 1.3x power. Single use.",
	},
	
	heavydutyboots: {
		inherit: true,
		desc: "When switching in, the holder is unaffected by grounded hazards on its side of the field.",
		// Hazard Immunity implemented in moves.js
	},
	
	hardhat: {
		name: "Hard Hat",
		spritenum: 417,
		fling: {
			basePower: 80,
		},
		num: 1120,
		gen: 8,
		desc: "When switching in, the holder is unaffected by airborne hazards on its side of the field.",
		// Hazard Immunity implemented in moves.js
	},
};