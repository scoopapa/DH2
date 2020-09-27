'use strict';

exports.BattleScripts = {
	init: function () {
		this.modData('Learnsets', 'dragonite').learnset.playrough = ['7L1'];
		this.modData('Learnsets', 'goodra').learnset.gigadrain = ['7L1'];
		this.modData('Learnsets', 'goodra').learnset.drainpunch = ['7L1'];
		this.modData('Learnsets', 'dragapult').learnset.recover = ['8L1'];
		this.modData('Learnsets', 'dragapult').learnset.icebeam = ['8L1'];
		this.modData('Learnsets', 'orbeetle').learnset.focusblast = ['8L1'];
		this.modData('Learnsets', 'orbeetle').learnset.teleport = ['8L1'];
		this.modData('Learnsets', 'thievul').learnset.focusblast = ['8L1'];
		this.modData('Learnsets', 'thievul').learnset.aurasphere = ['8L1'];
		this.modData('Learnsets', 'gumshoos').learnset.coil = ['7L1'];
		this.modData('Learnsets', 'gumshoos').learnset.bodyslam = ['7L1'];
		this.modData('Learnsets', 'vikavolt').learnset.leafblade = ['7L1'];
		this.modData('Learnsets', 'vikavolt').learnset.darkpulse = ['7L1'];
		this.modData('Learnsets', 'lycanrocmidnight').learnset.headsmash = ['7L1'];
		this.modData('Learnsets', 'lycanroc').learnset.extremespeed = ['7L1'];
		this.modData('Learnsets', 'lycanroc').learnset.spikes = ['7L1'];
		this.modData('Learnsets', 'raichu').learnset.highjumpkick = ['7L1'];
		this.modData('Learnsets', 'clefable').learnset.hex = ['7L1'];
		this.modData('Learnsets', 'clefable').learnset.nastyplot = ['7L1'];
		this.modData('Learnsets', 'clefable').learnset.shadowsneak = ['7L1'];
		this.modData('Learnsets', 'clefable').learnset.willowisp = ['7L1'];
		this.modData('Learnsets', 'rillaboom').learnset.junglehealing = ['8L1'];
		this.modData('Learnsets', 'rillaboom').learnset.toxic = ['8L1'];
		this.modData('Learnsets', 'cinderace').learnset.energyball = ['8L1'];
		this.modData('Learnsets', 'inteleon').learnset.taunt = ['8L1'];
		this.modData('Learnsets', 'inteleon').learnset.firstimpression = ['8L1'];
		this.modData('Learnsets', 'inteleon').learnset.encore = ['8L1'];
		this.modData('Learnsets', 'inteleon').learnset.pursuit = ['8L1'];
		this.modData('Learnsets', 'klinklang').learnset.rapidspin = ['7L1'];
		this.modData('Learnsets', 'garbodor').learnset.stealthrock = ['7L1'];
		this.modData('Learnsets', 'garbodor').learnset.knockoff = ['7L1'];
		this.modData('Learnsets', 'jolteon').learnset.calmmind = ['7L1'];
		this.modData('Learnsets', 'flareon').learnset.burnup = ['7L1'];
		this.modData('Learnsets', 'butterfree').learnset.taunt = ['7L1'];
		this.modData('Learnsets', 'butterfree').learnset.earthpower = ['7L1'];
	},
};

pokemon: {
	setStatus(status, source, sourceEffect, ignoreImmunities) {
		if (!this.hp) return false;
		status = this.battle.dex.getEffect(status);
		if (this.battle.event) {
			if (!source) source = this.battle.event.source;
			if (!sourceEffect) sourceEffect = this.battle.effect;
		}
		if (!source) source = this;
 
		if (this.status === status.id) {
			if ((sourceEffect as Move)?.status === this.status) {
				this.battle.add('-fail', this, this.status);
			} else if ((sourceEffect as Move)?.status) {
				this.battle.add('-fail', source);
				this.battle.attrLastMove('[still]');
			}
			return false;
		}
 
		if (!ignoreImmunities && status.id &&
				!(source?.hasAbility('corrosion') && ['tox', 'psn'].includes(status.id)) &&
				!(source?.hasAbility('dustscatter') && ['poisonpowder', 'stunspore'].includes(effect.id))) {
			// the game currently never ignores immunities
			if (!this.runStatusImmunity(status.id === 'tox' ? 'psn' : status.id)) {
				this.battle.debug('immune to status');
				if ((sourceEffect as Move)?.status) {
					this.battle.add('-immune', this);
				}
				return false;
			}
		}
		const prevStatus = this.status;
		const prevStatusData = this.statusData;
		if (status.id) {
			const result: boolean = this.battle.runEvent('SetStatus', this, source, sourceEffect, status);
			if (!result) {
				this.battle.debug('set status [' + status.id + '] interrupted');
				return result;
			}
		}
 
		this.status = status.id;
		this.statusData = {id: status.id, target: this};
		if (source) this.statusData.source = source;
		if (status.duration) this.statusData.duration = status.duration;
		if (status.durationCallback) {
			this.statusData.duration = status.durationCallback.call(this.battle, this, source, sourceEffect);
		}
 
		if (status.id && !this.battle.singleEvent('Start', status, this.statusData, this, source, sourceEffect)) {
			this.battle.debug('status start [' + status.id + '] interrupted');
			// cancel the setstatus
			this.status = prevStatus;
			this.statusData = prevStatusData;
			return false;
		}
		if (status.id && !this.battle.runEvent('AfterSetStatus', this, source, sourceEffect, status)) {
			return false;
		}
		return true;
	}
};
