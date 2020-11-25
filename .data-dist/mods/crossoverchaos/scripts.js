"use strict";Object.defineProperty(exports, "__esModule", {value: true}); const Scripts = {

	useMoveInner(moveOrMoveName, pokemon, target, sourceEffect, zMove, maxMove) {
		if (!sourceEffect && this.effect.id) sourceEffect = this.effect;
		if (sourceEffect && ['instruct', 'custapberry'].includes(sourceEffect.id)) sourceEffect = null;

		let move = this.dex.getActiveMove(moveOrMoveName);
		if (move.id === 'weatherball' && zMove) {
			// Z-Weather Ball only changes types if it's used directly,
			// not if it's called by Z-Sleep Talk or something.
			this.singleEvent('ModifyType', move, null, pokemon, target, move, move);
			if (move.type !== 'Normal') sourceEffect = move;
		}
		if (zMove || (move.category !== 'Status' && sourceEffect && /** @type {ActiveMove} */(sourceEffect).isZ)) {
			move = this.getActiveZMove(move, pokemon);
		}
		if (maxMove && move.category !== 'Status') {
			let moveType = move.type;
			// Max move outcome is dependent on the move type after type modifications from ability and the move itself
			this.singleEvent('ModifyType', move, null, pokemon, target, move, move);
			this.runEvent('ModifyType', pokemon, target, move, move);
			if (move.type !== moveType) sourceEffect = move;
		}
		if (maxMove || (move.category !== 'Status' && sourceEffect && /** @type {ActiveMove} */(sourceEffect).isMax)) {
			move = this.getActiveMaxMove(move, pokemon);
		}

		if (this.activeMove) {
			move.priority = this.activeMove.priority;
			if (!move.hasBounced) move.pranksterBoosted = this.activeMove.pranksterBoosted;
		}
		let baseTarget = move.target;
		if (target === undefined) target = this.getRandomTarget(pokemon, move);
		if (move.target === 'self' || move.target === 'allies') {
			target = pokemon;
		}
		if (sourceEffect) {
			move.sourceEffect = sourceEffect.id;
			move.ignoreAbility = false;
		}
		let moveResult = false;

		this.setActiveMove(move, pokemon, target);

		this.singleEvent('ModifyType', move, null, pokemon, target, move, move);
		this.singleEvent('ModifyMove', move, null, pokemon, target, move, move);
		if (baseTarget !== move.target) {
			// Target changed in ModifyMove, so we must adjust it here
			// Adjust before the next event so the correct target is passed to the
			// event
			target = this.getRandomTarget(pokemon, move);
		}
		move = this.runEvent('ModifyType', pokemon, target, move, move);
		move = this.runEvent('ModifyMove', pokemon, target, move, move);
		if (baseTarget !== move.target) {
			// Adjust again
			target = this.getRandomTarget(pokemon, move);
		}
		if (!move || pokemon.fainted) {
			return false;
		}

		let attrs = '';

		let movename = move.name;
		if (move.id === 'hiddenpower') movename = 'Hidden Power';
		if (sourceEffect) attrs += '|[from]' + this.dex.getEffect(sourceEffect);
		if (zMove && move.isZ === true) {
			attrs = '|[anim]' + movename + attrs;
			movename = 'Z-' + movename;
		}
		this.addMove('move', pokemon, movename, target + attrs);

		if (zMove) this.runZPower(move, pokemon);

		if (!target) {
			this.attrLastMove('[notarget]');
			this.add(this.gen >= 5 ? '-fail' : '-notarget', pokemon);
			return false;
		}

		const {targets, pressureTargets} = pokemon.getMoveTargets(move, target);

		if (!sourceEffect || sourceEffect.id === 'pursuit' || sourceEffect.id === 'grapplebeam') {
			let extraPP = 0;
			for (const source of pressureTargets) {
				let ppDrop = this.runEvent('DeductPP', source, pokemon, move);
				if (ppDrop !== true) {
					extraPP += ppDrop || 0;
				}
			}
			if (extraPP > 0) {
				pokemon.deductPP(move, extraPP);
			}
		}

		if (!this.singleEvent('TryMove', move, null, pokemon, target, move) ||
			!this.runEvent('TryMove', pokemon, target, move)) {
			move.mindBlownRecoil = false;
			return false;
		}

		this.singleEvent('UseMoveMessage', move, null, pokemon, target, move);

		if (move.ignoreImmunity === undefined) {
			move.ignoreImmunity = (move.category === 'Status');
		}

		if (this.gen !== 4 && move.selfdestruct === 'always') {
			this.faint(pokemon, pokemon, move);
		}

		/** @type {number | false | undefined | ''} */
		let damage = false;
		if (move.target === 'all' || move.target === 'foeSide' || move.target === 'allySide' || move.target === 'allyTeam') {
			damage = this.tryMoveHit(target, pokemon, move);
			if (damage === this.NOT_FAIL) pokemon.moveThisTurnResult = null;
			if (damage || damage === 0 || damage === undefined) moveResult = true;
		} else {
			if (!targets.length) {
				this.attrLastMove('[notarget]');
				this.add(this.gen >= 5 ? '-fail' : '-notarget', pokemon);
				return false;
			}
			if (this.gen === 4 && move.selfdestruct === 'always') {
				this.faint(pokemon, pokemon, move);
			}
			moveResult = this.trySpreadMoveHit(targets, pokemon, move);
		}
		if (move.selfBoost && moveResult) this.moveHit(pokemon, pokemon, move, move.selfBoost, false, true);
		if (!pokemon.hp) {
			this.faint(pokemon, pokemon, move);
		}

		if (!moveResult) {
			this.singleEvent('MoveFail', move, null, target, pokemon, move);
			return false;
		}

		if (!move.negateSecondary && !(move.hasSheerForce && pokemon.hasAbility(['sheerforce', 'abilitytodestroyanything']))) {
			this.singleEvent('AfterMoveSecondarySelf', move, null, pokemon, target, move);
			this.runEvent('AfterMoveSecondarySelf', pokemon, target, move);
		}

		return true;
	},
  pokemon: {
    
// 	  getHealth(){
// 		  if (!this.hp) return {side: this.side.id, secret: '0 fnt', shared: '0 fnt'};
// 		  let secret = `${this.hp}/${this.maxhp}`;
// 		  let shared;
// 		  const ratio = ((!!('tippedarrowpsychic' in this.volatiles) ? 1 : this.hp) / this.maxhp);
// 		  if (this.battle.reportExactHP) {
// 		  	shared = secret;
// 		  } else if (this.battle.reportPercentages) {
// 		  	// HP Percentage Mod mechanics
// 		  	let percentage = Math.ceil(ratio * 100);
// 		  	if ((percentage === 100) && (ratio < 1.0)) {
// 		  		percentage = 99;
// 		  	}
// 		  	shared = `${percentage}/100`;
// 		  } else {
// 		  	// In-game accurate pixel health mechanics
// 		  	const pixels = Math.floor(ratio * 48) || 1;
// 		  	shared = `${pixels}/48`;
// 		  	if ((pixels === 9) && (ratio > 0.2)) {
// 		  		shared += 'y'; // force yellow HP bar
// 		  	} else if ((pixels === 24) && (ratio > 0.5)) {
// 		  		shared += 'g'; // force green HP bar
// 		  	}
// 		  }
// 		  if (this.status) {
// 		  	secret += ` ${this.status}`;
// 		  	shared += ` ${this.status}`;
// 		  }
// 		  return {side: this.side.id, secret, shared};
// 	  };  
    

	setStatus(status,	source,	sourceEffect,	ignoreImmunities) {
		if (!this.hp) return false;
		status = this.battle.dex.getEffect(status);
		if (this.battle.event) {
			if (!source) source = this.battle.event.source;
			if (!sourceEffect) sourceEffect = this.battle.effect;
		}
		if (!source) source = this;

		if (this.status === status.id) {
			if (sourceEffect && sourceEffect.status === this.status) {
				this.battle.add('-fail', this, this.status);
			} else if (sourceEffect && sourceEffect.status) {
				this.battle.add('-fail', source);
				this.battle.attrLastMove('[still]');
			}
			return false;
		}

		if (!ignoreImmunities && status.id &&
				!(source && (source.hasAbility('corrosion') || (sourceEffect && sourceEffect.effectType === 'Move' && sourceEffect.id === 'strike9shot')) && ['tox', 'psn'].includes(status.id))) {
			// the game currently never ignores immunities
			if (!this.runStatusImmunity(status.id === 'tox' ? 'psn' : status.id)) {
				this.battle.debug('immune to status');
				if (sourceEffect && sourceEffect.status) this.battle.add('-immune', this);
				return false;
			}
		}
		const prevStatus = this.status;
		const prevStatusData = this.statusData;
		if (status.id) {
			const result = !!this.battle.runEvent('SetStatus', this, source, sourceEffect, status);
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
	},
	runEffectiveness(move) {
		let totalTypeMod = 0;
		for (const type of this.getTypes()) {
			let typeMod = this.battle.dex.getEffectiveness(move, type);
			typeMod = this.battle.singleEvent('Effectiveness', move, null, this, type, move, typeMod);
			totalTypeMod += this.battle.runEvent('Effectiveness', this, type, move, typeMod);
		}
      if (totalTypeMod >= 0 && this.hasAbility('powerofsummer') && move.type === 'Fire'){
        totalTypeMod = -1;
      }
		if (move.type === 'Fire' && ('tarshot' in this.volatiles)) totalTypeMod++;
		return totalTypeMod;
	},
  	ignoringAbility() {
		const abilities = [
			'battlebond', 'comatose', 'disguise', 'gulpmissile', 'multitype', 'powerconstruct', 'rkssystem', 'schooling', 'shieldsdown', 'stancechange', 'bellydances', 'deadringer', 'soul0system', 'physicalbreakdown', 'unsteadyhood', 'shadesoul', 'stolenarmour', 'lastditcheffort', 'stillheart',
		];
		// Check if any active pokemon have the ability Neutralizing Gas
		let neutralizinggas = false;
		for (const pokemon of this.battle.getAllActive()) {
			// can't use hasAbility because it would lead to infinite recursion
			if (((pokemon.ability === ('neutralizinggas')) || (this.hasType('Electric') && pokemon.ability === ('nowifi'))) && !pokemon.volatiles['gastroacid'] &&
				!pokemon.abilityData.ending) {
				neutralizinggas = true;
				break;
			}
		}

		return !!(
			(this.battle.gen >= 5 && !this.isActive) ||
			((this.volatiles['gastroacid'] || (neutralizinggas && this.ability !== ('neutralizinggas'))) &&
			!abilities.includes(this.ability))
		);
	},
	  
	  isGrounded(negateImmunity = false) {
		  if ('gravity' in this.battle.field.pseudoWeather) return true;
		  if ('ingrain' in this.volatiles && this.battle.gen >= 4) return true;
		  if (this.hasAbility('breathoftheearth')) return true;
		  if ('smackdown' in this.volatiles) return true;
		  const item = (this.ignoringItem() ? '' : this.item);
		  if (item === 'ironball') return true;
		  // If a Fire/Flying type uses Burn Up and Roost, it becomes ???/Flying-type, but it's still grounded.
		  if (!negateImmunity && this.hasType('Flying') && !('roost' in this.volatiles)) return false;
		  if (this.hasAbility('levitate') && !this.battle.suppressingAttackEvents()) return null;
		  if (this.hasAbility('eightgates') && (pokemon.template.speciesid == 'mightguysixthgate' || pokemon.template.speciesid == 'mightguyseventhgate' || pokemon.template.speciesid == 'mightguyeightgate') && !this.battle.suppressingAttackEvents()) return null;
		  if ('magnetrise' in this.volatiles) return false;
		  if ('cycloneslash' in this.volatiles) return false;
		  if ('telekinesis' in this.volatiles) return false;
		  return item !== 'airballoon';
	  },
  },
  field: {
    //Completely negate weather if both sides have an active Scarlet Temperament.
	  suppressingWeather() {
      let scarlettemperaments = 0;
		  for (const side of this.battle.sides) {
        let hasScarletTemperament = false;
			  for (const pokemon of side.active) {
          if (!pokemon || pokemon.ignoringAbility()) continue;
				  if (pokemon.getAbility().suppressWeather) return true;
          if (pokemon.hasAbility('scarlettemperament')){
            scarlettemperaments++;
            break;
          }
			  }
		  }
		  return !(this.battle.sides.length - scarlettemperaments);
	  }
  },
}; exports.Scripts = Scripts;
