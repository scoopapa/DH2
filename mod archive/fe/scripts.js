'use strict';

exports.BattleScripts = {

    useMoveInner(moveOrMoveName, pokemon, target, sourceEffect, zMove) {
        if (!sourceEffect && this.effect.id) sourceEffect = this.effect;
        if (sourceEffect && sourceEffect.id === 'instruct') sourceEffect = null;
        let move = this.getActiveMove(moveOrMoveName);
        if (move.id === 'weatherball' && zMove) {
            // Z-Weather Ball only changes types if it's used directly,
            // not if it's called by Z-Sleep Talk or something.
            this.singleEvent('ModifyMove', move, null, pokemon, target, move, move);
            if (move.type !== 'Normal') sourceEffect = move;
        }
        if (zMove || (move.category !== 'Status' && sourceEffect && sourceEffect.isZ)) {
            move = this.getActiveZMove(move, pokemon);
        }

        if (this.activeMove) {
            move.priority = this.activeMove.priority;
            if (!move.hasBounced) move.pranksterBoosted = this.activeMove.pranksterBoosted;
        }
        let baseTarget = move.target;
        if (target === undefined) target = this.resolveTarget(pokemon, move);
        if (move.target === 'self' || move.target === 'allies') {
            target = pokemon;
        }
        if (sourceEffect) {
            move.sourceEffect = sourceEffect.id;
            move.ignoreAbility = false;
        }
        let moveResult = false;

        this.setActiveMove(move, pokemon, target);

        this.singleEvent('ModifyMove', move, null, pokemon, target, move, move);
        if (baseTarget !== move.target) {
            // Target changed in ModifyMove, so we must adjust it here
            // Adjust before the next event so the correct target is passed to the
            // event
            target = this.resolveTarget(pokemon, move);
        }
        move = this.runEvent('ModifyMove', pokemon, target, move, move);
        if (baseTarget !== move.target) {
            // Adjust again
            target = this.resolveTarget(pokemon, move);
        }
        if (!move || pokemon.fainted) {
            return false;
        }

        let attrs = '';

        let movename = move.name;
        if (move.id === 'hiddenpower') movename = 'Hidden Power';
        if (move.id === 'hiddengem') movename = 'Hidden Gem';
        if (sourceEffect) attrs += '|[from]' + this.getEffect(sourceEffect);
        if (zMove && move.isZ === true) {
            attrs = '|[anim]' + movename + attrs;
            movename = 'Z-' + movename;
        }
        this.addMove('move', pokemon, movename, target + attrs);

        if (zMove) this.runZPower(move, pokemon);

        if (!target) {
            this.attrLastMove('[notarget]');
            this.add(this.gen >= 5 ? '-fail' : '-notarget', pokemon);
            if (move.target === 'normal') pokemon.isStaleCon = 0;
            return false;
        }

		  const {targets, pressureTargets} = pokemon.getMoveTargets(move, target);

        if (!sourceEffect || (['pursuit', 'shocksuck', 'pursuingbeam'].includes(sourceEffect.id))) {
            let extraPP = 0;
            for (const source of pressureTargets) {
                let ppDrop = this.runEvent('DeductPP', source, pokemon, move);
                if (ppDrop !== true) {
                    extraPP += ppDrop || 0;
                    if (ppDrop && pokemon.hasAbility('powerdrain') && !source.runStatusImmunity('par', false) && !source.status) {
                        this.add('-ability', pokemon, 'Power Drain');
                        source.trySetStatus('par', pokemon);
                    }
                }
            }
            if (extraPP > 0 && !(pokemon.hasAbility(['diamondarmor', 'calamity']))) {
                pokemon.deductPP(move, extraPP);
            }
        }

        if (!this.singleEvent('TryMove', move, null, pokemon, target, move) ||
            !this.runEvent('TryMove', pokemon, target, move)) {
            move.mindBlownRecoil = false;
            return false;
        }

        if (move.id !== 'foulmimicry' || !pokemon.illusion) {
            this.singleEvent('UseMoveMessage', move, null, pokemon, target, move);
        }

		if (move.ignoreImmunity === undefined) {
			move.ignoreImmunity = (move.category === 'Status');
		}

		if (move.selfdestruct === 'always') {
			this.faint(pokemon, pokemon, move);
		}

		/** @type {number | false | undefined | ''} */
		let damage = false;
		if (move.target === 'all' || move.target === 'foeSide' || move.target === 'allySide' || move.target === 'allyTeam') {
			damage = this.tryMoveHit(target, pokemon, move);
			if (damage === this.NOT_FAIL) pokemon.moveThisTurnResult = null;
			if (damage || damage === 0 || damage === undefined) moveResult = true;
		} else {
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

		if (!move.negateSecondary && !(move.hasSheerForce && pokemon.hasAbility('sheerforce'))) {
			this.singleEvent('AfterMoveSecondarySelf', move, null, pokemon, target, move);
			this.runEvent('AfterMoveSecondarySelf', pokemon, target, move);
		}

		return true;
    },


    tryMoveHit(target, pokemon, move) {
        this.setActiveMove(move, pokemon, target);
        move.zBrokeProtect = false;
        let hitResult = true;

        hitResult = this.singleEvent('PrepareHit', move, {}, target, pokemon, move);
        if (!hitResult) {
            if (hitResult === false) this.add('-fail', target);
            return false;
        }
        this.runEvent('PrepareHit', pokemon, target, move);

        if (!this.singleEvent('Try', move, null, pokemon, target, move)) {
            return false;
        }

        if (move.target === 'all' || move.target === 'foeSide' || move.target === 'allySide' || move.target === 'allyTeam') {
            if (move.target === 'all') {
                hitResult = this.runEvent('TryHitField', target, pokemon, move);
            } else {
                hitResult = this.runEvent('TryHitSide', target, pokemon, move);
            }
            if (!hitResult) {
                if (hitResult === false) this.add('-fail', target);
                return false;
            }
            return this.moveHit(target, pokemon, move);
        }

        hitResult = this.runEvent('TryImmunity', target, pokemon, move);
        if (!hitResult) {
            if (hitResult !== null) {
                if (!move.spreadHit) this.attrLastMove('[miss]');
                this.add('-miss', pokemon, target);
            }
            return false;
        }

        if (move.ignoreImmunity === undefined) {
            move.ignoreImmunity = (move.category === 'Status');
        }

        if (this.gen < 7 && (!move.ignoreImmunity || (move.ignoreImmunity !== true && !move.ignoreImmunity[move.type])) && !target.runImmunity(move.type, true)) {
            return false;
        }

        hitResult = this.runEvent('TryHit', target, pokemon, move);
        if (!hitResult) {
            if (hitResult === false) this.add('-fail', target);
            return false;
        }

        if (this.gen >= 7 && (!move.ignoreImmunity || (move.ignoreImmunity !== true && !move.ignoreImmunity[move.type])) && !target.runImmunity(move.type, true)) {
            return false;
        }
        if (move.flags['powder'] && target !== pokemon && !this.getImmunity('powder', target)) {
            this.debug('natural powder immunity');
            this.add('-immune', target, '[msg]');
            return false;
        }
        if (this.gen >= 7 && move.pranksterBoosted && pokemon.hasAbility(['prankster', 'authority', 'rapidgrowth', 'creepy', 'panicmode', 'prankstar', 'stunningbug', 'indulgence', 'tinkering', 'bamboozled', 'lightningfist', 'trickyglare', 'familiarmaneuvering', 'slippery', 'dancingmad', 'mischievousdust']) && target.side !== pokemon.side && !this.getImmunity('prankster', target)) {
            this.debug('natural prankster immunity');
            if (!target.illusion) this.add('-hint', "In gen 7, Dark is immune to moves boosted by Prankster or derivatives.");
            this.add('-immune', target, '[msg]');
            return false;
        }

        let boostTable = [1, 4 / 3, 5 / 3, 2, 7 / 3, 8 / 3, 3];

        // calculate true accuracy
        /** @type {number | true} */ // TypeScript bug: incorrectly infers {number | true} as {number | boolean}
        let accuracy = move.accuracy;
        let boosts, boost;
        if (accuracy !== true) {
            if (!move.ignoreAccuracy) {
                boosts = this.runEvent('ModifyBoost', pokemon, null, null, Object.assign({}, pokemon.boosts));
                boost = this.clampIntRange(boosts['accuracy'], -6, 6);
                if (boost > 0) {
                    accuracy *= boostTable[boost];
                } else {
                    accuracy /= boostTable[-boost];
                }
            }
            if (!move.ignoreEvasion) {
                boosts = this.runEvent('ModifyBoost', target, null, null, Object.assign({}, target.boosts));
                boost = this.clampIntRange(boosts['evasion'], -6, 6);
                if (boost > 0) {
                    accuracy /= boostTable[boost];
                } else if (boost < 0) {
                    accuracy *= boostTable[-boost];
                }
            }
        }
        if (move.ohko) { // bypasses accuracy modifiers
            if (!target.isSemiInvulnerable()) {
                accuracy = 30;
                if (move.ohko === 'Ice' && this.gen >= 7 && !pokemon.hasType('Ice')) {
                    accuracy = 20;
                }
                if (pokemon.level >= target.level && (move.ohko === true || !target.hasType(move.ohko))) {
                    accuracy += (pokemon.level - target.level);
                } else {
                    this.add('-immune', target, '[ohko]');
                    return false;
                }
            }
        } else {
            accuracy = this.runEvent('ModifyAccuracy', target, pokemon, move, accuracy);
        }
        if (move.alwaysHit || (move.id === 'toxic' && this.gen >= 6 && pokemon.hasType('Poison'))) {
            accuracy = true; // bypasses ohko accuracy modifiers
        } else {
            accuracy = this.runEvent('Accuracy', target, pokemon, move, accuracy);
        }
        if (accuracy !== true && !this.randomChance(accuracy, 100)) {
            if (!move.spreadHit) this.attrLastMove('[miss]');
            this.add('-miss', pokemon, target);
            return false;
        }

        if (move.breaksProtect) {
            let broke = false;
            for (const effectid of ['banefulbunker', 'kingsshield', 'protect', 'spikyshield', 'ancientshield']) {
                if (target.removeVolatile(effectid)) broke = true;
            }
            if (this.gen >= 6 || target.side !== pokemon.side) {
                for (const effectid of ['craftyshield', 'matblock', 'quickguard', 'wideguard']) {
                    if (target.side.removeSideCondition(effectid)) broke = true;
                }
            }
            if (broke) {
                if (move.id === 'feint') {
                    this.add('-activate', target, 'move: Feint');
                } else {
                    this.add('-activate', target, 'move: ' + move.name, '[broken]');
                }
                if (this.gen >= 6) delete target.volatiles['stall'];
            }
        }

        if (move.stealsBoosts) {
            let boosts = {};
            let stolen = false;
            for (let statName in target.boosts) {
                // @ts-ignore
                let stage = target.boosts[statName];
                if (stage > 0) {
                    boosts[statName] = stage;
                    stolen = true;
                }
            }
            if (stolen) {
                this.attrLastMove('[still]');
                this.add('-clearpositiveboost', target, pokemon, 'move: ' + move.name);
                this.boost(boosts, pokemon, pokemon);

                for (let statName in boosts) {
                    boosts[statName] = 0;
                }
                target.setBoost(boosts);
                this.add('-anim', pokemon, "Spectral Thief", target);
            }
        }

        move.totalDamage = 0;
        /**@type {number | false} */
        let damage = 0;
        pokemon.lastDamage = 0;
        if (move.multihit) {
            let hits = move.multihit;
            if (Array.isArray(hits)) {
                // yes, it's hardcoded... meh
                if (hits[0] === 2 && hits[1] === 5) {
                    if (this.gen >= 5) {
                        hits = this.sample([2, 2, 3, 3, 4, 5]);
                    } else {
                        hits = this.sample([2, 2, 2, 3, 3, 3, 4, 5]);
                    }
                } else {
                    hits = this.random(hits[0], hits[1] + 1);
                }
            }
            hits = Math.floor(hits);
            let nullDamage = true;
            /**@type {number | false} */
            let moveDamage;
            // There is no need to recursively check the ´sleepUsable´ flag as Sleep Talk can only be used while asleep.
            let isSleepUsable = move.sleepUsable || this.getMove(move.sourceEffect).sleepUsable;
            let i;
            for (i = 0; i < hits && target.hp && pokemon.hp; i++) {
                if (pokemon.status === 'slp' && !isSleepUsable) break;

                if (move.multiaccuracy && i > 0) {
                    accuracy = move.accuracy;
                    if (accuracy !== true) {
                        if (!move.ignoreAccuracy) {
                            boosts = this.runEvent('ModifyBoost', pokemon, null, null, Object.assign({}, pokemon.boosts));
                            boost = this.clampIntRange(boosts['accuracy'], -6, 6);
                            if (boost > 0) {
                                accuracy *= boostTable[boost];
                            } else {
                                accuracy /= boostTable[-boost];
                            }
                        }
                        if (!move.ignoreEvasion) {
                            boosts = this.runEvent('ModifyBoost', target, null, null, Object.assign({}, target.boosts));
                            boost = this.clampIntRange(boosts['evasion'], -6, 6);
                            if (boost > 0) {
                                accuracy /= boostTable[boost];
                            } else if (boost < 0) {
                                accuracy *= boostTable[-boost];
                            }
                        }
                    }
                    accuracy = this.runEvent('ModifyAccuracy', target, pokemon, move, accuracy);
                    if (!move.alwaysHit) {
                        accuracy = this.runEvent('Accuracy', target, pokemon, move, accuracy);
                        if (accuracy !== true && !this.randomChance(accuracy, 100)) break;
                    }
                }

                moveDamage = this.moveHit(target, pokemon, move);
                if (moveDamage === false) break;
                if (nullDamage && (moveDamage || moveDamage === 0 || moveDamage === undefined)) nullDamage = false;
                // Damage from each hit is individually counted for the
                // purposes of Counter, Metal Burst, and Mirror Coat.
                damage = (moveDamage || 0);
                // Total damage dealt is accumulated for the purposes of recoil (Parental Bond).
                move.totalDamage += damage;
                if (move.mindBlownRecoil && i === 0) {
                    this.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.getEffect('Mind Blown'), true);
                }
                this.eachEvent('Update');
            }
            if (i === 0) return false;
            if (nullDamage) damage = false;
            this.add('-hitcount', target, i);
        } else {
            damage = this.moveHit(target, pokemon, move);
            move.totalDamage = damage;
        }

        if (move.recoil && move.totalDamage) {
            this.damage(this.calcRecoilDamage(move.totalDamage, move), pokemon, pokemon, 'recoil');
        }

        if (move.struggleRecoil) {
            // @ts-ignore
            this.directDamage(this.clampIntRange(Math.round(pokemon.maxhp / 4), 1), pokemon, pokemon, {
                id: 'strugglerecoil'
            });
        }

        if (target && pokemon !== target) target.gotAttacked(move, damage, pokemon);

        if (move.ohko) this.add('-ohko');

        if (!damage && damage !== 0) return damage;

        this.eachEvent('Update');

        if (target && !move.negateSecondary && !(move.hasSheerForce && pokemon.hasAbility('sheerforce'))) {
            this.singleEvent('AfterMoveSecondary', move, null, target, pokemon, move);
            this.runEvent('AfterMoveSecondary', target, pokemon, move);
        }

        return damage;
    },
// 	canMegaEvo(pokemon) {
// 		let item = pokemon.getItem();
// 		if ((item.megaEvolves !== pokemon.baseTemplate.baseSpecies || (Array.isArray(item.megaEvolves) && !item.megaEvolves.includes(pokemon.baseTemplate.baseSpecies))) || item.megaStone === pokemon.species || (Array.isArray(item.megaStone) && item.megaStone.includes(pokemon.species))) {
// 			if (item.zMove) return null;
// 			for (let i = 0; i < pokemon.baseTemplate.otherFormes.length; i++) {
// 				let altForme = pokemon.baseTemplate.otherFormes[i];
// 				if (altForme && altForme.isMega && altForme.requiredMove && pokemon.baseMoves.includes(toID(altForme.requiredMove))) return altForme.species;
// 			}
// 			return null;
// 		}
// 		if (Array.isArray(item.megaStone) && pokemon.baseTemplate.otherFormes) {
// 			for (let i = 0; i < pokemon.baseTemplate.otherFormes.length; i++) {
// 				let forme = pokemon.baseTemplate.otherFormes[i];
// 				if (forme && forme.isMega && item.megaStone.includes(forme.species)) return forme.species;
// 			}
// 		}
// 		else return item.megaStone;
// 	},
    canUltraBurst(pokemon) {
        if (pokemon.getItem().id === 'ultranecroziumz') {
            switch (pokemon.baseTemplate.species) {
                case 'Necrozma-Dusk-Mane':
                case 'Necrozma-Dawn-Wings':
                    return "Necrozma-Ultra";
                case 'Necrynx':
                    return "Necrynx-Ultra";
                case 'Necroqua':
                    return "Necroqua-Ultra";
                case 'Necrozerain':
                    return "Necrozerain-Ultra";
                case 'Necropur':
                    return "Necropur-Beautiful";
                case 'Lampara':
                    return "Lampara-De-Lava";
                case 'Chazma':
                    return "Chazma-Hatched";
                case 'Smolitzer':
                    return "Smolitzer-Ultra";
                case 'Necrotune':
                    return "Necrotune-Ultra";
                case 'Nut':
                    return "Ultra Burst Nut";
            }
        }
        return null;
    },

    runMegaEvo(pokemon) {
        const templateid = pokemon.canMegaEvo || pokemon.canUltraBurst;
        if (!templateid) return false;
        const side = pokemon.side;

        // Pokémon affected by Sky Drop cannot mega evolve. Enforce it here for now.
        for (const foeActive of side.foe.active) {
            if (foeActive.volatiles['skydrop'] && foeActive.volatiles['skydrop'].source === pokemon) {
                return false;
            }
        }

        pokemon.formeChange(templateid, pokemon.getItem(), true);

        // Limit one mega evolution
        let wasMega = pokemon.canMegaEvo;
        for (const ally of side.pokemon) {
            if (wasMega) {
                ally.canMegaEvo = null;
            } else {
                ally.canUltraBurst = null;
            }
        }

        this.runEvent('AfterMega', pokemon);
        let ability = this.getAbility(pokemon.ability);
        this.add('-start', pokemon, 'typechange', pokemon.getTypes().join('/'), '[silent]');
        this.add('raw', ability, ability.shortDesc);
        return true;
    },

    // BattlePokemon scripts, which should override the other things.
    pokemon: {

        hasItem(item) {
            if (this.ignoringItem()) return false;
            let ownItem = (this.ignoringItem() ? '' : this.item);
            let golden = false;
            let bootleg = false;
            if (!Array.isArray(item)) {
                if (this.volatiles['goldentouch']) {
                    golden = (this.volatiles['goldentouch'].item === toID(item));
                }
                if (this.volatiles['beastbootleg']) {
                    bootleg = (this.volatiles['beastbootleg'].items.includes(toID(item)));
                }
                return (ownItem === toID(item) || golden || bootleg);
            }
            if (this.volatiles['goldentouch'] && !item.map(toID).includes(ownItem)) {
                golden = (item.map(toID).includes(this.volatiles['goldentouch'].item));
            }
            if (this.volatiles['beastbootleg'] && !item.map(toID).includes(ownItem)) {
                bootleg = (item.map(toID).includes(ownItem) || (item.map(toID).includes(this.volatiles['beastbootleg'].items[0]) || item.map(toID).includes(this.volatiles['beastbootleg'].items[1])));
            }
            return (item.map(toID).includes(ownItem) || golden || bootleg);
        },
        eatItem() {
            if (!this.hp || !this.isActive) return false;
            let source = this.battle.event.target;
            let item = this.battle.effect;
            if (this.battle.runEvent('UseItem', this, null, null, item) && this.battle.runEvent('TryEatItem', this, null, null, item)) {
                this.battle.add('-enditem', this, item, '[eat]');

                this.battle.singleEvent('Eat', item, this.itemData, this, source, item);
                this.battle.runEvent('EatItem', this, null, null, item);

                this.lastItem = this.item;
                if (this.item === item.id) {
                    this.item = '';
                    this.itemData = {
                        id: '',
                        target: this
                    };
                }
                if ('goldentouch' in this.volatiles) {
                    if (this.volatiles['goldentouch'].item === item.id) {
                        this.volatiles['goldentouch'].item = '';
                        this.abilityData = {
                            id: '',
                            target: this
                        };
                    }
                }
                if ('beastbootleg' in this.volatiles) {
                    if (this.volatiles['beastbootleg'].items[0] === item.id) {
                        this.volatiles['beastbootleg'].items[0] = '';
                    } else if (this.volatiles['beastbootleg'].items[1] === item.id) {
                        this.volatiles['beastbootleg'].items[1] = this.volatiles['beastbootleg'].items[0];
                        this.volatiles['beastbootleg'].items[0] = '';

                    }
                }
                this.usedItemThisTurn = true;
                this.ateBerry = true;
                this.battle.runEvent('AfterUseItem', this, null, null, item);
                return true;
            }
            return false;
        },

        useItem(unused, source) {
            let item = this.battle.effect;
            if ((!this.hp && !item.isGem) || !this.isActive) return false;
            if (!source && this.battle.event && this.battle.event.target) source = this.battle.event.target;
            if (this.battle.runEvent('UseItem', this, null, null, item)) {
                switch (item.id) {
                    case 'redcard':
                        this.battle.add('-enditem', this, item, '[of] ' + source);
                        break;
                    default:
                        if (!item.isGem) {
                            this.battle.add('-enditem', this, item);
                        }
                        break;
                }

                this.battle.singleEvent('Use', item, this.itemData, this, source, item);

                this.lastItem = this.item;
                if (this.item === item.id) {
                    this.item = '';
                    this.itemData = {
                        id: '',
                        target: this
                    };
                }
                if ('goldentouch' in this.volatiles) {
                    if (this.volatiles['goldentouch'].item === item.id) {
                        this.volatiles['goldentouch'].item = '';
                        this.abilityData = {
                            id: '',
                            target: this
                        };
                    }
                }
                if ('beastbootleg' in this.volatiles) {
                    if (this.volatiles['beastbootleg'].items[0] === item.id) {
                        this.volatiles['beastbootleg'].items[0] = '';
                    } else if (this.volatiles['beastbootleg'].items[1] === item.id) {
                        this.volatiles['beastbootleg'].items = ['', this.volatiles['beastbootleg'].items[0]];

                    }
                }
                this.usedItemThisTurn = true;
                this.battle.runEvent('AfterUseItem', this, null, null, item);
                return true;
            }
            return false;
        },
        ignoringAbility() {
            return !!((this.battle.gen >= 5 && !this.isActive) || ((this.volatiles['gastroacid'] || this.volatiles['teraarmor']) && !(['battlebond', 'comatose', 'disguise', 'multitype', 'powerconstruct', 'rkssystem', 'schooling', 'shieldsdown', 'stancechange', 'truant', 'resurrection', 'magicalwand', 'sleepingsystem', 'cursedcloak', 'appropriation', 'disguiseburden', 'hideandseek', 'beastcostume', 'spiralpower', 'optimize', 'prototype', 'typeillusionist', 'godoffertility', 'foundation', 'sandyconstruct', 'victorysystem', 'techequip', 'technicalsystem', 'triagesystem', 'geneticalgorithm', 'effectsetter', 'tacticalcomputer', 'mitosis', 'barbstance', 'errormacro', 'combinationdrive', 'stanceshield', 'unfriend', 'desertmirage', 'sociallife', 'cosmology', 'crystallizedshield', 'compression', 'whatdoesthisdo'].includes(this.ability))));
        },
        getActionSpeed() {
            let speed = this.getStat('spe', false, false);
            if (speed > 10000) speed = 10000;
            if (this.battle.field.getPseudoWeather('trickroom')) {
                speed = 0x2710 - speed;
            }
            if (this.battle.field.getPseudoWeather('sluggishaura')) {
                speed = 0x2710 - speed;
            }
            return speed & 0x1FFF;
        },
        isGrounded(negateImmunity = false) {
            if ('gravity' in this.battle.field.pseudoWeather) return true;
            if ('ingrain' in this.volatiles && this.battle.gen >= 4) return true;
            if ('smackdown' in this.volatiles) return true;
            let item = (this.ignoringItem() ? '' : this.item);
            let golden = ((this.ignoringItem() || !('goldentouch' in this.volatiles)) ? '' : this.volatiles['goldentouch'].item);
            let bootleg1 = ((this.ignoringItem() || !('beastbootleg' in this.volatiles)) ? '' : this.volatiles['beastbootleg'].items[0]);
            let bootleg2 = ((this.ignoringItem() || !('beastbootleg' in this.volatiles)) ? '' : this.volatiles['beastbootleg'].items[1]);
            let totalItems = [item, golden, bootleg1, bootleg2];
            if (totalItems.includes('ironball')) return true;
            // If a Fire/Flying type uses Burn Up and Roost, it becomes ???/Flying-type, but it's still grounded.
            if (!negateImmunity && this.hasType('Flying') && !('roost' in this.volatiles)) return false;
            if (this.hasAbility(['levitate', 'airraider', 'magneticfield', 'galelevitation', 'floatinggrounds', 'turborise', 'enchanted', 'hyperprotection', 'stickyfloat', 'stasis']) && !this.battle.suppressingAttackEvents()) return null;
            //Compression protects Unleashed Giramini from Ground-type moves, but not Captive.
            if (this.hasAbility('compression') && this.template.species === 'Giramini-Unleashed' && !this.battle.suppressingAttackEvents()) return null;
            if ('magnetrise' in this.volatiles) return false;
            if ('maglevrailway' in this.side.sideConditions) return false;
            if ('telekinesis' in this.volatiles) return false;
            return !totalItems.includes('airballoon');
        },

        setStatus(status, source = null, sourceEffect = null, ignoreImmunities = false) {
            if (!this.hp) return false;
            status = this.battle.getEffect(status);
            if (this.battle.event) {
                if (!source) source = this.battle.event.source;
                if (!sourceEffect) sourceEffect = this.battle.effect;
            }

            if (this.status === status.id) {
                if (sourceEffect && sourceEffect.status === this.status) {
                    this.battle.add('-fail', this, this.status);
                } else if (sourceEffect && sourceEffect.status) {
                    this.battle.add('-fail', this);
                }
                return false;
            }

            if (!ignoreImmunities && status.id && !(source && (source.hasAbility('ailmentmaster') || ((source.hasAbility(['corrosion', 'poisonpores'])) && ['tox', 'psn'].includes(status.id)))) && !(sourceEffect && sourceEffect.effectType === 'Move' && sourceEffect.id === 'thundervirus')) {
                // the game currently never ignores immunities
                if (!this.runStatusImmunity(status.id === 'tox' ? 'psn' : status.id)) {
                    this.battle.debug('immune to status');
                    if (sourceEffect && sourceEffect.status) this.battle.add('-immune', this, '[msg]');
                    return false;
                }
            }
            let prevStatus = this.status;
            let prevStatusData = this.statusData;
            if (status.id) {
                let result = this.battle.runEvent('SetStatus', this, source, sourceEffect, status);
                if (!result) {
                    this.battle.debug('set status [' + status.id + '] interrupted');
                    return result;
                }
            }
            this.status = status.id;
            this.statusData = {
                id: status.id,
                target: this
            };
            if (source) this.statusData.source = source;
            if (status.duration) {
                this.statusData.duration = status.duration;
            }
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
        ignoringItem() {
            return !!((this.battle.gen >= 5 && !this.isActive) || ((this.hasAbility(['klutz', 'carelessforce']) || this.volatiles['engarde']) && !this.getItem().ignoreKlutz) || this.volatiles['magicbreak'] || this.volatiles['embargo'] || this.battle.field.pseudoWeather['magicroom']);
        },
        setAbility(ability, source, isFromFormeChange) {
            if (!this.hp) return false;
            if (typeof ability === 'string') ability = this.battle.getAbility(ability);
            let oldAbility = this.ability;
            if (!isFromFormeChange) {
                if (['illusion', 'mirageguard', 'justiceillusion', 'adaptableillusion', 'battlebond', 'comatose', 'disguise', 'multitype', 'powerconstruct', 'rkssystem', 'schooling', 'shieldsdown', 'stancechange', 'truant', 'resurrection', 'magicalwand', 'sleepingsystem', 'cursedcloak', 'appropriation', 'disguiseburden', 'hideandseek', 'beastcostume', 'spiralpower', 'optimize', 'prototype', 'typeillusionist', 'godoffertility', 'foundation', 'sandyconstruct', 'victorysystem', 'techequip', 'technicalsystem', 'triagesystem', 'geneticalgorithm', 'effectsetter', 'tacticalcomputer', 'mitosis', 'barbstance', 'errormacro', 'combinationdrive', 'stanceshield', 'unfriend', 'desertmirage', 'sociallife', 'cosmology', 'crystallizedshield', 'compression', 'whatdoesthisdo'].includes(ability.id)) return false;
                if (['battlebond', 'comatose', 'disguise', 'multitype', 'powerconstruct', 'rkssystem', 'schooling', 'shieldsdown', 'stancechange', 'truant', 'resurrection', 'magicalwand', 'sleepingsystem', 'cursedcloak', 'appropriation', 'disguiseburden', 'hideandseek', 'beastcostume', 'spiralpower', 'optimize', 'prototype', 'typeillusionist', 'godoffertility', 'foundation', 'sandyconstruct', 'victorysystem', 'techequip', 'technicalsystem', 'triagesystem', 'geneticalgorithm', 'effectsetter', 'tacticalcomputer', 'mitosis', 'barbstance', 'errormacro', 'combinationdrive', 'stanceshield', 'unfriend', 'desertmirage', 'sociallife', 'cosmology', 'crystallizedshield', 'compression', 'whatdoesthisdo'].includes(oldAbility)) return false;
            }
            if (!this.battle.runEvent('SetAbility', this, source, this.battle.effect, ability)) return false;
            this.battle.singleEvent('End', this.battle.getAbility(oldAbility), this.abilityData, this, source);
            if (this.battle.effect && this.battle.effect.effectType === 'Move') {
                this.battle.add('-endability', this, this.battle.getAbility(oldAbility), '[from] move: ' + this.battle.getMove(this.battle.effect.id));
            }
            this.ability = ability.id;
            this.abilityData = {
                id: ability.id,
                target: this
            };
            if (ability.id && this.battle.gen > 3) {
                this.battle.singleEvent('Start', ability, this.abilityData, this, source);
            }
            this.abilityOrder = this.battle.abilityOrder++;
            return oldAbility;
        },
    },
};
