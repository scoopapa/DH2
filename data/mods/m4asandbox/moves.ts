export const Moves: {[moveid: string]: ModdedMoveData} = {
	steelroller: {
		inherit: true,
		onTryHit() {
			if (this.field.isTerrain('')) return false;
			for (const target of this.getAllActive()) {
				if (target.hasAbility('downtoearth')) {
					this.add('-message', `${target.name} suppresses the effects of the terrain!`);
					return false;
				}
			}
		},
		onHit() {
			if (this.field.isTerrain('grassyterrain') &&
				this.getAllActive().some(x => x.hasAbility('arenarock'))) return;
			if (this.field.isTerrain('acidicterrain') &&
				this.getAllActive().some(x => x.hasAbility('acidrock'))) return;
			this.field.clearTerrain();
		},
	},
	defog: {
		inherit: true,
		onHit(target, source, move) {
			if (this.field.getPseudoWeather('stickyresidues')) {
				this.add('-message', `Sticky residues keep hazards stuck to the field!`);
			}
			let success = false;
			if (!target.volatiles['substitute'] || move.infiltrates) success = !!this.boost({evasion: -1});
			const removeTarget = [
				'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.getEffect(targetCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (this.field.getPseudoWeather('stickyresidues')) continue;
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.getEffect(sideCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			if (this.field.isTerrain('grassyterrain') &&
				this.getAllActive().some(x => x.hasAbility('arenarock'))) return success;
			if (this.field.isTerrain('acidicterrain') &&
				this.getAllActive().some(x => x.hasAbility('acidrock'))) return success;
			this.field.clearTerrain();
			return success;
		},
	},
	gmaxwindrage: {
		inherit: true,
		self: {
			onHit(source) {
				if (this.field.getPseudoWeather('stickyresidues')) {
					this.add('-message', `Sticky residues keep hazards stuck to the field!`);
				}
				let success = false;
				const removeTarget = [
					'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb',
				];
				const removeAll = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const targetCondition of removeTarget) {
					if (source.side.foe.removeSideCondition(targetCondition)) {
						if (!removeAll.includes(targetCondition)) continue;
						this.add('-sideend', source.side.foe, this.dex.getEffect(targetCondition).name, '[from] move: G-Max Wind Rage', '[of] ' + source);
						success = true;
					}
				}
				for (const sideCondition of removeAll) {
					if (this.field.getPseudoWeather('stickyresidues')) continue;
					if (source.side.removeSideCondition(sideCondition)) {
						this.add('-sideend', source.side, this.dex.getEffect(sideCondition).name, '[from] move: G-Max Wind Rage', '[of] ' + source);
						success = true;
					}
				}
				if (this.field.isTerrain('grassyterrain') &&
					this.getAllActive().some(x => x.hasAbility('arenarock'))) return success;
				if (this.field.isTerrain('acidicterrain') &&
					this.getAllActive().some(x => x.hasAbility('acidrock'))) return success;
				this.field.clearTerrain();
				return success;
			},
		},
	},
	splinteredstormshards: {
		inherit: true,
		onHit() {
			if (this.field.isTerrain('grassyterrain') &&
				this.getAllActive().some(x => x.hasAbility('arenarock'))) return;
			if (this.field.isTerrain('acidicterrain') &&
				this.getAllActive().some(x => x.hasAbility('acidrock'))) return;
			this.field.clearTerrain();
		},
	},
};
