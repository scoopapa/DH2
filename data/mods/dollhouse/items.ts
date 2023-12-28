export const Items: {[itemid: string]: ModdedItemData} = {
	gliscorplushie: {
		name: "Gliscor Plushie",
		spritenum: 2,
		fling: {
			basePower: 30,
		},
		onResidualOrder: 5,
		onResidualSubOrder: 5,
		onResidual(pokemon) {
			if (pokemon.status) {
				this.heal(pokemon.baseMaxhp / 8);
			}
		},
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (effect.id === 'psn' || effect.id === 'tox' || effect.id === 'brn') {
				return false;
			}
		},
		num: -1000,
		desc: "Holder heals 12.5% of its max HP while statused.",
		gen: 9,
		rating: 3,
	},
	chienpaoplushie: {
		name: "Chien-Pao Plushie",
		spritenum: 2,
		fling: {
			basePower: 30,
		},
		onAfterMoveSecondarySelf(target, source, move) {
			if (move.flags['slicing']) {
				target.useItem();
			}
		},
		boosts: {
			atk: 1,
		},
		num: -1001,
		desc: "Raises holder's Attack by 1 stage after it uses a slicing move. Single use.",
		gen: 9,
		rating: 3,
	},
	dragapultplushie: {
		name: "Dragapult Plushie",
		spritenum: 2,
		fling: {
			basePower: 30,
		},
		onPrepareHit(source, target, move) {
			if (move.type === 'Dragon' && !move.multihit && !move.flags['noparentalbond'] && !move.flags['charge'] &&
			!move.flags['futuremove'] && !move.spreadHit && !move.isZ && !move.isMax && move.category !== 'Status') {
			  move.multihit = 2;
			  move.multihitType = 'parentalbond';
      }
		},
		num: -1002,
		desc: "This Pokemon's Dragon-type moves hit a second time at 0.25x power.",
		gen: 9,
		rating: 3,
	},
	fluttermaneplushie: {
		name: "Flutter Mane Plushie",
		spritenum: 2,
		fling: {
			basePower: 30,
		},
		onModifyDamage(damage, source, target, move) {
			if (move && ['sunnyday', 'desolateland'].includes(this.field.effectiveWeather())) {
				return this.chainModify([4915, 4096]);
			}
		},
		num: -1003,
		desc: "If Sun is active, the holder's attacks deal 1.2x damage.",
		gen: 9,
		rating: 3,
	},
	ogerponhearthflameplushie: {
		name: "Ogerpon-Hearthflame Plushie",
		spritenum: 2,
		fling: {
			basePower: 30,
		},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Grass' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Fire';
			}
		},
		num: -1004,
		desc: "The holder's Grass-type attacks become Fire-type.",
		gen: 9,
		rating: 3,
	},
	magearnaplushie: {
		name: "Magearna Plushie",
		spritenum: 2,
		fling: {
			basePower: 30,
		},
		onSourceAfterFaint(length, target, source, effect) {
			if (this.effectState.magearnaPlushie) return;
			if (effect && effect.effectType === 'Move') {
				const bestStat = source.getBestStat(true, true);
				this.boost({[bestStat]: length}, source);
				this.effectState.magearnaPlushie = true;
			}
		},
		onSwitchIn(pokemon) {
			delete this.effectState.magearnaPlushie;
		},
		num: -1005,
		desc: "(Mostly functional placeholder) Once per switch-in, the holder's highest of Def, SpA, SpD, or Spe is boosted by 1 stage when a Pokemon faints.",
		gen: 9,
		rating: 3,
	},
	ursalunabloodmoonplushie: {
		name: "Ursaluna-Bloodmoon Plushie",
		spritenum: 2,
		fling: {
			basePower: 30,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Normal') {
			  return this.chainModify([5324, 4096]);
			}
		},
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Normal'] = true;
      	}
		},
		onAfterMoveSecondarySelfPriority: -1,
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.type === 'Normal') {
				pokemon.removeVolatile('disable');
				pokemon.addVolatile('disable');
			}
		},
		condition: {
			onDisableMove(pokemon) {
				if (pokemon.lastMove?.id === 'gigatonhammer') pokemon.disableMove('gigatonhammer');
			},
			beforeMoveCallback(pokemon) {
				if (pokemon.lastMove?.id === 'gigatonhammer') pokemon.addVolatile('gigatonhammer');
			}
		},
		num: -1006,
		desc: "Holder's Normal moves deal 1.3x damage and ignore immunites, but can't be used twice in a row.",
		gen: 9,
		rating: 3,
	},
	ironbundleplushie: {
		name: "Iron Bundle Plushie",
		spritenum: 2,
		fling: {
			basePower: 30,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Ice' && target.hasType('Water')) {
			  return this.chainModify(2);
			}
		},
		num: -1007,
		desc: "Holder's Ice-type moves deal double damage against Water-types.",
		gen: 9,
		rating: 3,
	},
	garganaclplushie: {
		name: "Garganacl Plushie",
		spritenum: 2,
		fling: {
			basePower: 30,
		},
		onSetStatus(status, target, source, effect) {
			if (target.hasType('Rock') && (effect as Move)?.status) {
				this.add('-immune', target, '[from] item: Garganacl Plushie');
			}
			return false;
		},
  		onTryAddVolatile(status, target) {
			if (target.hasType('Rock') && status.id === 'yawn') {
				this.add('-immune', target, '[from] item: Garganacl Plushie');
				return null;
			}
		},
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (defender.hasType('Rock') && move.type === 'Ghost') {
				this.debug('Garganacl Plushie weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(spa, attacker, defender, move) {
			if (defender.hasType('Rock') && move.type === 'Ghost') {
				this.debug('Garganacl Plushie weaken');
				return this.chainModify(0.5);
			}
		},
		num: -1008,
		desc: "Rock-types: Takes 50% damage from Ghost-type moves, status immunity.",
		gen: 9,
		rating: 3,
	},
	manaphyplushie: {
		name: "Manaphy Plushie",
		spritenum: 2,
		fling: {
			basePower: 30,
		},
    	onAfterMove(target, source, move) {
			if (target !== source && move.type === 'Psychic') {
			  this.actions.useMove("Heart Swap", target);
			}
		},
		num: -1009,
		desc: "Holder uses Heart Swap after landing a Psychic-type attack.",
		gen: 9,
		rating: 3,
	},
	ironvaliantplushie: {
		name: "Iron Valiant Plushie",
		spritenum: 2,
		fling: {
			basePower: 30,
		},
		onSourceDamagingHit(damage, target, source, move) {
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
			if (move.category === 'Physical') {
				this.boost({spa: -1}, target, target);
			}
		},
		num: -1010,
		desc: "Holder's physical moves lower the foe's SpA by 1 stage after hitting.",
		gen: 9,
		rating: 3,
	},
	amoongussplushie: {
		name: "Amoonguss Plushie",
		spritenum: 2,
		fling: {
			basePower: 30,
		},
		onSwitchOut(pokemon) {
      if (pokemon.hasType('Grass')) {
			  pokemon.heal(pokemon.baseMaxhp / 4);
      }
		},
		num: -1011,
		desc: "Grass-types: Heal 25% of their max HP on switch out.",
		gen: 9,
		rating: 3,
	},
	annihilapeplushie: {
		name: "Annihilape Plushie",
		spritenum: 2,
		fling: {
			basePower: 30,
		},
		onStart(pokemon) {
			pokemon.addVolatile('annihilapeplushie');
		},
		condition: {
			onStart(pokemon) {
				this.effectState.numConsecutive = 0;
			},
			onTryMovePriority: -2,
			onTryMove(pokemon, target, move) {
				if (!pokemon.hasItem('annihilapeplushie')) {
					pokemon.removeVolatile('annihilapeplushie');
					return;
				}
			},
  			onResidualOrder: 29,
  			onResidual(pokemon) {
			  const lastDamagedBy = pokemon.getLastDamagedBy(true);
				if (lastDamagedBy === undefined || !lastDamagedBy.thisTurn) {
					pokemon.removeVolatile('annihilapeplushie');
					return;
				}
  			},
  			onDamagePriority: -101,
			onDamage(damage, target, source, move) {
				if (!move || move.effectType !== 'Move' || !source) return;
				this.effectState.numConsecutive++;
			},
			onModifyDamage(damage, source, target, move) {
				const dmgMod = [4096, 4915, 5734, 6553, 7372, 8192];
				const numConsecutive = this.effectState.numConsecutive > 5 ? 5 : this.effectState.numConsecutive;
				this.debug(`Current Metronome boost: ${dmgMod[numConsecutive]}/4096`);
				return this.chainModify([dmgMod[numConsecutive], 4096]);
			},
		},
		num: -1012,
		desc: "Holder moves deal .2x more damage for every consecutive turn it's been damaged.",
		gen: 9,
		rating: 3,
	},
	palafinplushie: {
		name: "Palafin Plushie",
		spritenum: 2,
		fling: {
			basePower: 30,
		},
		/*
		onStart(pokemon) {
			if (this.effectState.palafinPlushie) return;
			this.boost({def: -1, spd: -1});
			this.effectState.palafinPlushie = true;
		},
		onModifyPriority(priority, pokemon, target, move) {
			if (this.effectState.palafinPlushie) {
          for (const moveSlot of pokemon.moveSlots) {
            let moves = this.dex.getMove(moveSlot.move);
            let bp = moves.basePower;
            if (moves.ohko) bp = 160;
            if (moves.id === 'counter' || moves.id === 'metalburst' || moves.id === 'mirrorcoat') bp = 120;
            if (!bp && moves.category !== 'Status') bp = 80;
            if (bp <= 60) {
              warnMoves = [[move, pokemon]];
              return priority + 1;
            }
          }
        }
		},
  		*/
		num: -1013,
		desc: "(Non-functional placeholder) First switch-in: -1 Defenses. Second switch-in+on: lowest <60 BP move has +1 priority.",
		gen: 9,
		rating: 3,
	},
	chiyuplushie: {
		name: "Chi-Yu Plushie",
		spritenum: 2,
		fling: {
			basePower: 30,
		},
		onAnyModifySpD(spd, target, source, move) {
			const itemHolder = this.effectState.target;
			if (target.hasItem('Chi-Yu Plushie')) return;
			if (this.queue.willMove(target)) return;
			if (!move.ruinedSpD?.hasItem('Chi-Yu Plushie')) move.ruinedSpD = itemHolder;
			if (move.ruinedSpD !== itemHolder) return;
			this.debug('Chi-Yu Plushie SpD drop');
			return this.chainModify(0.75);
		},
		num: -1014,
		desc: "If the holder is slower, the foe's SpD is multiplied by 0.75.",
		gen: 9,
		rating: 3,
	},
	baxcaliburplushie: {
		name: "Baxcalibur Plushie",
		spritenum: 2,
		fling: {
			basePower: 30,
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Fire') {
				this.boost({atk: 1});
			}
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] item: Baxcalibur Plushie');
			}
			return false;
		},
		num: -1015,
		desc: "Holder's Attack is raised by 1 when damaged by Fire moves; can't be burned.",
		gen: 9,
		rating: 3,
	},
	kyuremplushie: {
		name: "Kyurem Plushie",
		spritenum: 2,
		fling: {
			basePower: 30,
		},
		onStart(pokemon) {
			if (pokemon.hasType('Ice')) return false;
			if (!pokemon.addType('Ice')) return false;
			this.add('-start', pokemon, 'typeadd', 'Ice', '[from] item: Kyurem Plushie');
		},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const bp = move.basePower;
			if (bp >= 130) {
				move.type = 'Ice';
			}
		},
		num: -1016,
		desc: "Adds the Ice-type to the holder. Moves of 130+ BP become Ice-type.",
		gen: 9,
		rating: 3,
	},
	kingambitplushie: {
		name: "Kingambit Plushie",
		spritenum: 2,
		fling: {
			basePower: 30,
		},
		onModifyDamage(damage, source, target, move) {
			if (source.side.faintedLastTurn) {
				return this.chainModify(1.5);
			}
		},
		num: -1017,
		desc: "1.5x Atk & SpA if an ally fainted last turn.",
		gen: 9,
		rating: 3,
	},
	darkraiplushie: {
		name: "Darkrai Plushie",
		spritenum: 2,
		fling: {
			basePower: 30,
		},
		onSourceModifyAccuracyPriority: -1,
		onSourceModifyAccuracy(accuracy, target, source, move) {
			if (move.status && move.status === 'slp') {
				return true;
			}
		},
		onAfterMoveSecondarySelf(target, source, move) {
			if (move.status && move.status === 'slp') {
				target.useItem();
			}
		},
		num: -1018,
		desc: "Holder's sleep moves are guaranteed to hit. Single use.",
		gen: 9,
		rating: 3,
	},
	zamazentacrownedplushie: {
		name: "Zamazenta-Crowned Plushie",
		spritenum: 2,
		fling: {
			basePower: 30,
		},
		onStart(pokemon) {
			this.boost({def: 1}, pokemon);
			pokemon.addVolatile('zamazentacrownedplushie');
			this.add('-message', `${pokemon.name} has its shield up!`);
		},
		condition: {
			duration: 2,
			onEnd(pokemon) {
				this.add('-item', pokemon, 'Zamazenta-Crowned Plushie');
				this.add('-message', `${pokemon.name} lowered its shield!`);
				this.boost({def: -1}, pokemon);
			},
		},
		num: -1019,
		desc: "+1 Defense on switch-in. Boost goes away at the end of the next turn.",
		gen: 9,
		rating: 3,
	},
	sneaslerplushie: {
		name: "Sneasler Plushie",
		spritenum: 2,
		fling: {
			basePower: 30,
		},
		onSourceDamagingHit(damage, target, source, move) {
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
			if (move.type === 'Poison') {
				if (this.randomChance(2, 10)) {
					target.trySetStatus('psn', source);
				}
			}
		},
		num: -1020,
		desc: "Holder's Poison moves have an additional 20% chance to poison.",
		gen: 9,
		rating: 3,
	},
	urshifurapidstrikeplushie: {
		name: "Urshifu-Rapid-Strike Plushie",
		spritenum: 2,
		fling: {
			basePower: 30,
		},
		onModifyMove(move) {
			if (move.multihit) {
				move.willCrit = true;
			}
		},
		num: -1021,
		desc: "Holder's multi-hit moves always critically hit.",
		gen: 9,
		rating: 3,
	},
	gougingfireplushie: {
		name: "Gouging Fire Plushie",
		spritenum: 2,
		fling: {
			basePower: 30,
		},
		onStart(pokemon) {
			if (pokemon.hasAbility('chlorophyll')) {
				this.boost({atk: 1});
				pokemon.useItem();
			}
		},
		num: -1021,
		desc: "Chlorophyll Pokemon: +1 Attack on switch-in. Single use.",
		gen: 9,
		rating: 3,
	},
};
