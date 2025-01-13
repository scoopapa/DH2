function mergeCallback(
	c1?: (this: Battle, ...args: any[]) => any,
	c2?: (this: Battle, ...args: any[]) => any,
): ((this: Battle, ...args: any[]) => any) | undefined {
	if (!c1) return c2;
	if (!c2) return c1;
	return (function (...a) {
		const ret1 = c1.call(this, ...a);
		const ret2 = c2.call(this, ...a);
		return this.actions.combineResults(ret1, ret2);
	});
}

export const Scripts: ModdedBattleScriptsData = {
	gen: 6,
	inherit: 'gen6',
	teambuilderConfig: {
		// for micrometas to only show custom tiers
		excludeStandardTiers: true,
		// only to specify the order of custom tiers
		customTiers: ['TPDP OU', 'TPDP LC'],
		
		//viability
		moveIsNotUseless(id: ID, species: Species, moves: string[], set: PokemonSet, dex: ModdedDex): boolean {
			//const dex = this.dex;

			let abilityid: ID = set ? toID(set.ability) : '' as ID;
			const itemid: ID = set ? toID(set.item) : '' as ID;
			
			const GOOD_WEAK_MOVES = [
			'plasmaball', 'smashspin', 'infinitescales', 'raid', 'tigerrush', 'icegatling', 'aquacutter', 'aquasonic', 'overtakestrike', 'springfirst', 'overray', 'shadowbomb', 'toxicspiral', 'strikeshot', 'trickster', 'cruciform', 'heavenlyinfluence', 'heavenlyblessing', 'earthlyinfluence', 'earthlyblessing', 'stonethrow', 'airstamp', 'twingears', 'darkarrow', 'twinthrust', 'pursuit', 'unfetteredsoul', 'geyser', 'firesign', 'watersign', 'naturesign', 'electricsign', 'earthsign', 'steelsign', 'soundsign', 'depressingrain', 'negativemist', 'mirrorworld', 'firewall', 'paniccall', 'stelmosfire', 'loveorpain', 'blowfromcalamity', 'killingbite', 'lightningspeed', 'changeling',
			] as ID[] as readonly ID[];
			const BAD_STRONG_MOVES = [
			'deflagration', 'aquarake', 'pulselaser', 'vacuumrupture', 'meteorimpact', 'gensokyotyphoon', 'firmspirit', 'gravityblast', 'blazeoftenmei', 'divinethunder', 'explodingfist', 'glamorpandemic', 'conflagration',
			] as ID[] as readonly ID[];
			const GOOD_STATUS_MOVES = [
			'supernaturalborder', 'magicbarrier', 'firstaid', 'powerspot', 'unconsciousmind', 'innerpower', 'camouflage', 'imposingair', 'battlepreparation', 'offensivetrance', 'backupplan', 'focusedmovement', 'eternalrecord', 'willowisp', 'thermit', 'cloudburst', 'drought', 'foresttherapy', 'thornedivy', 'drainseed', 'graceofmana', 'whitelilydance', 'fairydance', 'whitemist', 'bewitchingpollen', 'minetrap', 'racingearth', 'focusedstance', 'strenuousstance', 'madrushstance', 'stealthtrap', 'windgodsgrace', 'squall', 'perch', 'skanda', 'sharpwind', 'thunderveil', 'fieldbarrier', 'fieldprotect', 'moonsprotection', 'solareclipse', 'sharktrade', 'puppetsgrudge', 'darkpower', 'creepingdarkness', 'callofthedead', 'cursereversal', 'eyeofcalamity', 'poisontrap', 'miasma', 'acidtears', 'continue', 'amnesia', 'honestmanslie', 'projection', 'gorgonseye', 'boutdrunkard', 'wordbreak', 'encourage', 'upbeat', 'atempo', 'booing', 'ruinousvoice', 'bravesong', 'decrescendo', 'phaseinversion', 'forceshield', 'soulcorruption',
			] as ID[] as readonly ID[];
			
			switch (id) {
				//1 ability
				case 'falsecourage':
					return abilityid === 'ontheedge';
				case 'venomstrike':
					return abilityid === 'nimble';
				//speed
				case 'jinx':
					return species.baseStats.spe >= 70;
				case 'impactrebellion':
					return species.baseStats.spe <= 60;
				//multiple abilities
				case 'terrainsuzaku':
					return ['suteisfire', 'southernexpanse'].includes(abilityid);
				case 'terraingenbu':
					return species.baseStats.spe <= 60 || ['genteiswater', 'northernexpanse'].includes(abilityid);
				case 'terrainseiryu':
					return ['seiteiswood', 'easternexpanse'].includes(abilityid);
				case 'terrainbyakko':
					return ['byakuteismetal', 'westernexpanse'].includes(abilityid);
				case 'terrainkohyru':
					return ['kouteisearth', 'centralexpanse'].includes(abilityid);
				case 'crosschange':
					return ['wasteful', 'drunkard'].includes(abilityid);
				case 'mindcontrol':
					return ['wasteful', 'drunkard'].includes(abilityid);
				case 'randomshots':
					return ['salvo', 'strategist'].includes(abilityid);
				case 'hornetsflit':
					return ['salvo', 'strategist'].includes(abilityid);
				case 'godstonefrenzy':
					return ['salvo', 'strategist'].includes(abilityid);
				case 'twister':
					return ['salvo', 'strategist'].includes(abilityid);
				case 'darkinnocence':
					return ['salvo', 'strategist'].includes(abilityid);
				case 'shootingarts':
					return ['salvo', 'strategist'].includes(abilityid);
				case 'rushattack':
					return ['salvo', 'strategist'].includes(abilityid);
				case 'rapidthrow':
					return ['salvo', 'strategist'].includes(abilityid);
				case 'rainbowflowers':
					return ['sanguine', 'flash'].includes(abilityid);
				case 'densefogbloom':
					return ['melancholic', 'fogtraveler'].includes(abilityid);
				case 'deathmatch':
					return ['indomitable', 'stubborn', 'ontheedge'].includes(abilityid);
				case 'direstate':
					return ['indomitable', 'stubborn', 'ontheedge'].includes(abilityid);
				case 'passingbreeze':
					return ['sanguine', 'melancholic', 'choleric', 'phlegmatic', 'supine'].includes(abilityid);
				//not ability
				case 'raid':
					return abilityid !== 'charge';
				case 'risingsun':
					return abilityid !== 'charge';
				case 'plasmaball':
					return abilityid !== 'charge';
			}
			
			let moveData = dex.moves.get(id);
			if (moveData.flags.charge) return abilityid === 'fasttalker';
			if (moveData.category === 'Status') {
				return GOOD_STATUS_MOVES.includes(id);
			}
			if (moveData.basePower < 75 && !(abilityid === 'technician' && moveData.basePower <= 60 && moveData.basePower >= 50)) {
				return GOOD_WEAK_MOVES.includes(id);
			}
			return !BAD_STRONG_MOVES.includes(id);
		}
	},
	
	battle: {
        spreadModify(baseStats: StatsTable, set: PokemonSet): StatsTable {
            const modStats: SparseStatsTable = {atk: 10, def: 10, spa: 10, spd: 10, spe: 10};
            const tr = this.trunc;
            let statName: keyof StatsTable;
            for (statName in modStats) {
                const stat = baseStats[statName];
                modStats[statName] = tr(((2 * (stat + set.ivs[statName]) + set.evs[statName]) / 100) * set.level + 5);
            }
            if ('hp' in baseStats) {
                const stat = baseStats['hp'];
                modStats['hp'] = ((2 * (stat + set.ivs['hp']) + set.evs['hp']) / 100 + 1) * set.level + 10;
            }
            return this.natureModify(modStats as StatsTable, set);
        }
    },
	pokemon: {
		trySetStatus(status: string | Condition, source: Pokemon | null = null, sourceEffect: Effect | null = null) {
			const setStatus = this.battle.dex.conditions.get(status);
			if (setStatus.statusSlots > 1 && !['hvybrn', 'shk', 'weakheavy', 'stp'].includes(status)) {
				const statusOne = status.substring(0, 3);
				const statusTwo = status.substring(3);
				return this.setStatus(statusOne, source, sourceEffect) &&
					   this.setStatus(statusTwo, source, sourceEffect);
			}
			else return this.setStatus(status, source, sourceEffect);
		},
		setStatus(
			status: string | Condition,
			source: Pokemon | null = null,
			sourceEffect: Effect | null = null,
			ignoreImmunities = false
		) {
			if (!this.hp) return false;
			status = this.battle.dex.conditions.get(status);
			if (this.battle.event) {
				if (!source) source = this.battle.event.source;
				if (!sourceEffect) sourceEffect = this.battle.effect;
			}
			if (!source) source = this;
			
			if (this.status && this.status.length !== 0) {
				if(status.id.length !== 0) return this.setStatusTwo(this.status, source, sourceEffect, false, status);
				else {
					this.status = status.id;
					return true;
				}
			}

			if (!ignoreImmunities && status.id &&
				!(source?.hasAbility('corrosion') && ['tox', 'psn'].includes(status.id))) {
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
			const prevStatusState = this.statusState;
			this.battle.add('-end', this, this.status, '[silent]');
			if (status.id) {
				const result: boolean = this.battle.runEvent('SetStatus', this, source, sourceEffect, status);
				if (!result) {
					this.battle.debug('set status [' + status.id + '] interrupted');
					return result;
				}
			}

			this.status = status.id;
			this.statusState = {id: status.id, target: this};
			if (source) this.statusState.source = source;
			if (status.duration) this.statusState.duration = status.duration;
			if (status.durationCallback) {
				this.statusState.duration = status.durationCallback.call(this.battle, this, source, sourceEffect);
			}

			if (status.id && !this.battle.singleEvent('Start', status, this.statusState, this, source, sourceEffect)) {
				this.battle.debug('status start [' + status.id + '] interrupted');
				// cancel the setstatus
				this.status = prevStatus;
				this.statusState = prevStatusState;
				return false;
			}
			if (status.id && !this.battle.runEvent('AfterSetStatus', this, source, sourceEffect, status)) {
				return false;
			}
			this.battle.add('-start', this, this.status, '[silent]');
			
			return true;
		},
		setStatusTwo(
			currentStatus: string | Condition,
			source: Pokemon | null = null,
			sourceEffect: Effect | null = null,
			ignoreImmunities = false,
			newStatus: string | string[] | Condition | Condition[],
		) {
			if (!this.hp) return false;
			currentStatus = this.battle.dex.conditions.get(currentStatus);
			newStatus = this.battle.dex.conditions.get(newStatus);
			if (this.battle.event) {
				if (!source) source = this.battle.event.source;
				if (!sourceEffect) sourceEffect = this.battle.effect;
			}
			if (!source) source = this;

			if (currentStatus.id === newStatus.id) {
				if (currentStatus.statusSlots === 1 && newStatus.statusSlots === 1) {
					newStatus = this.battle.dex.conditions.get(newStatus.stackCondition);
					this.battle.add('-end', this, this.status, '[silent]');
					delete this.status;
				} else if ((sourceEffect as Move)?.status) {
					this.battle.add('-fail', source);
					this.battle.attrLastMove('[still]');
					return false;
				}
			} else if (this.status) {
				if(currentStatus.statusSlots === 1 && 
				   newStatus.statusSlots === 1) {
					newStatus = this.battle.dex.conditions.get(this.status + newStatus.id);
					this.battle.add('-end', this, this.status, '[silent]');
					delete this.status;
				} else if ((sourceEffect as Move)?.status) {
					this.battle.add('-fail', source);
					this.battle.attrLastMove('[still]');
					return false;
				}
			}

			if (!ignoreImmunities && newStatus.id &&
					!(source?.hasAbility('corrosion') && ['tox', 'psn'].includes(newStatus.id))) {
				// the game currently never ignores immunities
				if (!this.runStatusImmunity(newStatus.id === 'tox' ? 'psn' : newStatus.id)) {
					this.battle.debug('immune to status');
					if ((sourceEffect as Move)?.newStatus) {
						this.battle.add('-immune', this);
					}
					return false;
				}
			}
			const prevStatus = this.status;
			const prevStatusState = this.statusState;
			this.battle.add('-end', this, this.status, '[silent]');
			if (newStatus.id) {
				const result: boolean = this.battle.runEvent('SetStatus', this, source, sourceEffect, newStatus);
				if (!result) {
					console.log('set status [' + newStatus.id + '] interrupted');
					return result;
				}
			}
			
			this.status = newStatus.id;
			this.statusState = {id: newStatus.id, target: this};
			if (source) this.statusState.source = source;
			if (newStatus.duration) this.statusState.duration = newStatus.duration;
			if (newStatus.durationCallback) {
				this.statusState.duration = newStatus.durationCallback.call(this.battle, this, source, sourceEffect);
			}

			if (newStatus.id && !this.battle.singleEvent('Start', newStatus, this.statusState, this, source, sourceEffect)) {
				this.battle.debug('status start [' + newStatus.id + '] interrupted');
				// cancel the setstatus
				this.status = prevStatus;
				this.statusState = prevStatusState;
				return false;
			}
			if (newStatus.id && !this.battle.runEvent('AfterSetStatus', this, source, sourceEffect, newStatus)) {
				return false;
			}
			this.battle.add('-start', this, this.status, '[silent]');
			return true;
		},
		cureStatus(silent = false) {
			if (!this.hp || !this.status) return false;
			this.battle.add('-curestatus', this, this.status, silent ? '[silent]' : '[msg]');
			if (this.status === 'stp' && this.removeVolatile('nightmare')) {
				this.battle.add('-end', this, 'Nightmare', '[silent]');
			}
			this.battle.add('-end', this, this.status, '[silent]');
			this.setStatus('');
			return true;
		},
		runImmunity(type: string, message?: string | boolean) {
			if (!type || type === '???') return true;
			// Nihilslave: i think tpdp types can be recognized by this?
			if (!this.battle.dex.types.isName(type)) {
				throw new Error("Use runStatusImmunity for " + type);
			}
			if (this.fainted) return false;

			const negateImmunity = !this.battle.runEvent('NegateImmunity', this, type);
			const notImmune = type === 'Earth' ?
				this.isGrounded(negateImmunity) :
				negateImmunity || this.battle.dex.getImmunity(type, this);
			if (notImmune) return true;
			if (!message) return false;
			if (notImmune === null) {
				// Nihilslave: here
				this.battle.add('-immune', this, '[from] ability: Air Cushion');
			} else {
				this.battle.add('-immune', this);
			}
			return false;
		},
		getActionSpeed() {
			let speed = this.getStat('spe', false, false);
			if (this.battle.field.getPseudoWeather('trickroom') || this.battle.field.isTerrain('genbu')) {
				speed = 10000 - speed;
			}
			return this.battle.trunc(speed, 13);
		},
		// todo: for kohryu
		ignoringAbility() {
			if (this.battle.gen >= 5 && !this.isActive) return true;
			if (this.getAbility().isPermanent) return false;
			if (this.volatiles['gastroacid']) return true;
	
			// Check if any active pokemon have the ability Neutralizing Gas
			if (this.hasItem('Ability Shield') || this.ability === ('neutralizinggas' as ID)) return false;
			for (const pokemon of this.battle.getAllActive()) {
				// can't use hasAbility because it would lead to infinite recursion
				if (pokemon.ability === ('neutralizinggas' as ID) && !pokemon.volatiles['gastroacid'] &&
					!pokemon.transformed && !pokemon.abilityState.ending) {
					return true;
				}
			}
	
			return false;
		},
		ignoringItem() {
			return !!((this.battle.gen >= 5 && !this.isActive) ||
			(!this.getItem().ignoreKlutz && this.hasAbility(['klutz', 'wasteful'])) ||
			(this.battle.field.isTerrain('kohryu') && !this.hasAbility('centralexpanse')));
		},
		isGrounded(negateImmunity = false) {
			if ('perch' in this.volatiles) return true;
			if ('gravity' in this.battle.field.pseudoWeather) return true;
			if ('ingrain' in this.volatiles && this.battle.gen >= 4) return true;
			if ('smackdown' in this.volatiles) return true;
			const item = (this.ignoringItem() ? '' : this.item);
			if (item === 'ironball') return true;
			// If a Fire/Flying type uses Burn Up and Roost, it becomes ???/Flying-type, but it's still grounded.
			if (!negateImmunity && this.hasType('Wind') && !(this.hasType('???') && 'perch' in this.volatiles)) return false;
			if (this.hasAbility('aircushion') && !this.battle.field.isWeather("duststorm")) return false;
			if ('magnetrise' in this.volatiles) return false;
			if ('telekinesis' in this.volatiles) return false;
			return item !== 'airballoon' && item !== 'floatingstone';
		},		
		/*
		calculateStat(statName: StatNameExceptHP, boost: number, modifier?: number) {
			statName = toID(statName) as StatNameExceptHP;
			// @ts-ignore - type checking prevents 'hp' from being passed, but we're paranoid
			if (statName === 'hp') throw new Error("Please read `maxhp` directly");

			// base stat
			let stat = this.storedStats[statName];

			// Wonder Room swaps defenses before calculating anything else
			if (this.battle.field.isWeather('sunshower')) {
				if (statName === 'def') {
					stat = this.storedStats['spd'];
				} else if (statName === 'spd') {
					stat = this.storedStats['def'];
				}
			}

			// stat boosts
			let boosts: SparseBoostsTable = {};
			const boostName = statName as BoostName;
			boosts[boostName] = boost;
			boosts = this.battle.runEvent('ModifyBoost', this, null, null, boosts);
			boost = boosts[boostName]!;
			const boostTable = [1, 1.5, 2, 2.5, 3, 3.5, 4];
			if (boost > 6) boost = 6;
			if (boost < -6) boost = -6;
			if (boost >= 0) {
				stat = Math.floor(stat * boostTable[boost]);
			} else {
				stat = Math.floor(stat / boostTable[-boost]);
			}

			// stat modifier
			return this.battle.modify(stat, (modifier || 1));
		},
		getStat(statName: StatNameExceptHP, unboosted?: boolean, unmodified?: boolean) {
			statName = toID(statName) as StatNameExceptHP;
			// @ts-ignore - type checking prevents 'hp' from being passed, but we're paranoid
			if (statName === 'hp') throw new Error("Please read `maxhp` directly");

			// base stat
			let stat = this.storedStats[statName];

			// Download ignores Wonder Room's effect, but this results in
			// stat stages being calculated on the opposite defensive stat
			if (this.battle.field.isWeather('sunshower')) {
				if (statName === 'def') {
					statName = 'spd';
				} else if (statName === 'spd') {
					statName = 'def';
				}
			}

			// stat boosts
			if (!unboosted) {
				const boosts = this.battle.runEvent('ModifyBoost', this, null, null, {...this.boosts});
				let boost = boosts[statName];
				const boostTable = [1, 1.5, 2, 2.5, 3, 3.5, 4];
				if (boost > 6) boost = 6;
				if (boost < -6) boost = -6;
				if (boost >= 0) {
					stat = Math.floor(stat * boostTable[boost]);
				} else {
					stat = Math.floor(stat / boostTable[-boost]);
				}
			}

			// stat modifier effects
			if (!unmodified) {
				const statTable: {[s in StatNameExceptHP]?: string} = {atk: 'Atk', def: 'Def', spa: 'SpA', spd: 'SpD', spe: 'Spe'};
				stat = this.battle.runEvent('Modify' + statTable[statName], this, null, null, stat);
			}

			if (statName === 'spe' && stat > 10000) stat = 10000;
			return stat;
		},*/
	},
};
