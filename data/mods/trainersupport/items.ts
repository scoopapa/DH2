export const Items: {[itemid: string]: ModdedItemData} = {
	dracoplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Dragon') {
				if (user.volatiles['cynthiaboost']) return this.chainModify([5324, 4096]);
				return this.chainModify([4915, 4096]);
			}
		},
	},
	dreadplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Dark') {
				if (user.volatiles['cynthiaboost']) return this.chainModify([5324, 4096]);
				return this.chainModify([4915, 4096]);
			}
		},
	},
	earthplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Ground') {
				if (user.volatiles['cynthiaboost']) return this.chainModify([5324, 4096]);
				return this.chainModify([4915, 4096]);
			}
		},
	},
	fistplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Fighting') {
				if (user.volatiles['cynthiaboost']) return this.chainModify([5324, 4096]);
				return this.chainModify([4915, 4096]);
			}
		},
	},
	flameplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Fire') {
				if (user.volatiles['cynthiaboost']) return this.chainModify([5324, 4096]);
				return this.chainModify([4915, 4096]);
			}
		},
	},
	icicleplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Ice') {
				if (user.volatiles['cynthiaboost']) return this.chainModify([5324, 4096]);
				return this.chainModify([4915, 4096]);
			}
		},
	},
	insectplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Bug') {
				if (user.volatiles['cynthiaboost']) return this.chainModify([5324, 4096]);
				return this.chainModify([4915, 4096]);
			}
		},
	},
	ironplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Steel') {
				if (user.volatiles['cynthiaboost']) return this.chainModify([5324, 4096]);
				return this.chainModify([4915, 4096]);
			}
		},
	},
	meadowplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Grass') {
				if (user.volatiles['cynthiaboost']) return this.chainModify([5324, 4096]);
				return this.chainModify([4915, 4096]);
			}
		},
	},
	pixieplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Fairy') {
				if (user.volatiles['cynthiaboost']) return this.chainModify([5324, 4096]);
				return this.chainModify([4915, 4096]);
			}
		},
	},
	skyplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Flying') {
				if (user.volatiles['cynthiaboost']) return this.chainModify([5324, 4096]);
				return this.chainModify([4915, 4096]);
			}
		},
	},
	splashplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Water') {
				if (user.volatiles['cynthiaboost']) return this.chainModify([5324, 4096]);
				return this.chainModify([4915, 4096]);
			}
		},
	},
	spookyplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Ghost') {
				if (user.volatiles['cynthiaboost']) return this.chainModify([5324, 4096]);
				return this.chainModify([4915, 4096]);
			}
		},
	},
	stoneplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Rock') {
				if (user.volatiles['cynthiaboost']) return this.chainModify([5324, 4096]);
				return this.chainModify([4915, 4096]);
			}
		},
	},
	toxicplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Poison') {
				if (user.volatiles['cynthiaboost']) return this.chainModify([5324, 4096]);
				return this.chainModify([4915, 4096]);
			}
		},
	},
	zapplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Electric') {
				if (user.volatiles['cynthiaboost']) return this.chainModify([5324, 4096]);
				return this.chainModify([4915, 4096]);
			}
		},
	},
}
