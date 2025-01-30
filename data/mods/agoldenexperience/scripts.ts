export const Scripts: ModdedBattleScriptsData = {
  gen: 9,
  pokemon: {
    inherit: true,
    addType(newType: string) {
      if (this.terastallized) return false;
      if (this.hasItem('identitycard')) return false;
      this.addedType = newType;
      return true;
    },
    setType(newType: string | string[], enforce = false) {
      if (!enforce) {
        // No Pokemon should be able to have Stellar as a base type
        if (typeof newType === 'string' ? newType === 'Stellar' : newType.includes('Stellar')) return false;

        if (this.hasItem('identitycard')) return false;
        // First type of Arceus, Silvally cannot be normally changed
        if ((this.battle.gen >= 5 && (this.species.num === 493 || this.species.num === 773)) ||
          (this.battle.gen === 4 && this.hasAbility('multitype'))) {
          return false;
        }
        // Terastallized Pokemon cannot have their base type changed except via forme change
        if (this.terastallized) return false;
      }
  
      if (!newType) throw new Error("Must pass type to setType");
      this.types = (typeof newType === 'string' ? [newType] : newType);
      this.addedType = '';
      this.knownType = true;
      this.apparentType = this.types.join('/');
  
      return true;
    }
  },
  actions: {
    canMegaEvo(pokemon) {
      const altForme = pokemon.baseSpecies.otherFormes && this.dex.species.get(pokemon.baseSpecies.otherFormes[0]);
      const item = pokemon.getItem();
      if (
        altForme?.isMega && altForme?.requiredMove &&
        pokemon.baseMoves.includes(this.dex.toID(altForme.requiredMove)) && !item.zMove
      ) {
        return altForme.name;
      }
      if (item.name === "Slowbronite" && pokemon.baseSpecies.name === "Slowbro") {
        return "Slowbro-Mega";
      }
      else if (item.name === "Slowbronite" && pokemon.baseSpecies.name === "Slowbro-Galar") {
        return "Slowbro-Galar-Mega";
      }
      else if (item.name === "Zoroarkite" && pokemon.baseSpecies.name === "Zoroark-Hisui") {
        return null;
      }
      else if (item.name === "Scizorite" && pokemon.baseSpecies.name === "Scizor") {
        return "Scizor-Mega";
      }
      else if (item.name === "Scizorite" && pokemon.baseSpecies.name === "Scizor-Galar") {
        return "Scizor-Galar-Mega";
      }
      else if (item.name === "Typhlosionite" && pokemon.baseSpecies.name === "Typhlosion") {
        return "Typhlosion-Mega";
      }
      else if (item.name === "Typhlosionite" && pokemon.baseSpecies.name === "Typhlosion-Hisui") {
        return "Typhlosion-Hisui-Mega";
      }
      else if (item.name === "Sablenite" && pokemon.baseSpecies.name === "Sableye-Unova") {
        return null;
      }
      else if (item.name === "Meteor Fragment" && pokemon.baseSpecies.name === "Rayquaza") {
        return "Rayquaza-Mega";
      }
      else if (item.name === "Necrosolunite" && pokemon.baseSpecies.name === "Necrozma-Dusk-Mane") {
        return "Necrozma-Ultra";
      }
      else if (item.name === "Necrosolunite" && pokemon.baseSpecies.name === "Necrozma-Dawn-Wings") {
        return "Necrozma-Ultra";
      }
      return item.megaStone;
    },

    runSwitch(pokemon: Pokemon) {
      this.battle.runEvent('Swap', pokemon);

      if (this.battle.gen >= 5) {
        this.battle.runEvent('SwitchIn', pokemon);
      }

      this.battle.runEvent('EntryHazard', pokemon);

      if (this.battle.gen <= 4) {
        this.battle.runEvent('SwitchIn', pokemon);
      }

      if (this.battle.gen <= 2) {
        // pokemon.lastMove is reset for all Pokemon on the field after a switch. This affects Mirror Move.
        for (const poke of this.battle.getAllActive()) poke.lastMove = null;
        if (!pokemon.side.faintedThisTurn && pokemon.draggedIn !== this.battle.turn) {
          this.battle.runEvent('AfterSwitchInSelf', pokemon);
        }
      }
      if (!pokemon.hp) return false;
      pokemon.isStarted = true;
      if (!pokemon.fainted) {
        this.battle.singleEvent('Start', pokemon.getAbility(), pokemon.abilityState, pokemon);
        this.battle.singleEvent('Start', pokemon.getItem(), pokemon.itemState, pokemon);
      }
      if (this.battle.gen === 4) {
        for (const foeActive of pokemon.foes()) {
          foeActive.removeVolatile('substitutebroken');
        }
      }
      this.battle.runEvent('HiveMind', pokemon); // making Hive Mind activate at the appropriate time
      pokemon.addVolatile('indomitablespirit'); // yes this is a really ugly way to do this but it's better than a ruleset okay
      pokemon.draggedIn = null;
      return true;
    },




    hitStepMoveHitLoop(targets: Pokemon[], pokemon: Pokemon, move: ActiveMove) { // Temporary name
      let damage: (number | boolean | undefined)[] = [];
      for (const i of targets.keys()) {
        damage[i] = 0;
      }
      move.totalDamage = 0;
      pokemon.lastDamage = 0;
      let targetHits = move.multihit || 1;
      if (Array.isArray(targetHits)) {
        // yes, it's hardcoded... meh
        if (targetHits[0] === 2 && targetHits[1] === 5) {
          if (this.battle.gen >= 5) {
            // 35-35-15-15 out of 100 for 2-3-4-5 hits
            targetHits = this.battle.sample([2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5, 5]);
            if (targetHits < 4 && pokemon.hasItem('loadeddice')) {
              targetHits = 5 - this.battle.random(2);
            }
          } else {
            targetHits = this.battle.sample([2, 2, 2, 3, 3, 3, 4, 5]);
          }
        } else {
          targetHits = this.battle.random(targetHits[0], targetHits[1] + 1);
        }
      }
      if (targetHits === 10 && pokemon.hasItem('loadeddice')) targetHits -= this.battle.random(7);
      targetHits = Math.floor(targetHits);
      let nullDamage = true;
      let moveDamage: (number | boolean | undefined)[] = [];
      // There is no need to recursively check the ´sleepUsable´ flag as Sleep Talk can only be used while asleep.
      const isSleepUsable = move.sleepUsable || this.dex.moves.get(move.sourceEffect).sleepUsable;

      let targetsCopy: (Pokemon | false | null)[] = targets.slice(0);
      let hit: number;
      for (hit = 1; hit <= targetHits; hit++) {
        if (damage.includes(false)) break;
        if (hit > 1 && pokemon.status === 'slp' && (!isSleepUsable || this.battle.gen === 4)) break;
        if (targets.every(target => !target?.hp)) break;
        move.hit = hit;
        if (move.smartTarget && targets.length > 1) {
          targetsCopy = [targets[hit - 1]];
          damage = [damage[hit - 1]];
        } else {
          targetsCopy = targets.slice(0);
        }
        const target = targetsCopy[0]; // some relevant-to-single-target-moves-only things are hardcoded
        if (target && typeof move.smartTarget === 'boolean') {
          if (hit > 1) {
            this.battle.addMove('-anim', pokemon, move.name, target);
          } else {
            this.battle.retargetLastMove(target);
          }
        }

        // like this (Triple Kick)
        if (target && move.multiaccuracy && hit > 1) {
          let accuracy = move.accuracy;
          const boostTable = [1, 4 / 3, 5 / 3, 2, 7 / 3, 8 / 3, 3];
          if (accuracy !== true) {
            if (!move.ignoreAccuracy) {
              const boosts = this.battle.runEvent('ModifyBoost', pokemon, null, null, { ...pokemon.boosts });
              const boost = this.battle.clampIntRange(boosts['accuracy'], -6, 6);
              if (boost > 0) {
                accuracy *= boostTable[boost];
              } else {
                accuracy /= boostTable[-boost];
              }
            }
            if (!move.ignoreEvasion) {
              const boosts = this.battle.runEvent('ModifyBoost', target, null, null, { ...target.boosts });
              const boost = this.battle.clampIntRange(boosts['evasion'], -6, 6);
              if (boost > 0) {
                accuracy /= boostTable[boost];
              } else if (boost < 0) {
                accuracy *= boostTable[-boost];
              }
            }
          }
          accuracy = this.battle.runEvent('ModifyAccuracy', target, pokemon, move, accuracy);
          if (!move.alwaysHit) {
            accuracy = this.battle.runEvent('Accuracy', target, pokemon, move, accuracy);
            if (accuracy !== true && !this.battle.randomChance(accuracy, 100)) break;
          }
        }

        const moveData = move;
        if (!moveData.flags) moveData.flags = {};

        // Modifies targetsCopy (which is why it's a copy)
        [moveDamage, targetsCopy] = this.spreadMoveHit(targetsCopy, pokemon, move, moveData);

        if (!moveDamage.some(val => val !== false)) break;
        nullDamage = false;

        for (const [i, md] of moveDamage.entries()) {
          // Damage from each hit is individually counted for the
          // purposes of Counter, Metal Burst, and Mirror Coat.
          damage[i] = md === true || !md ? 0 : md;
          // Total damage dealt is accumulated for the purposes of recoil (Parental Bond).
          move.totalDamage += damage[i] as number;
        }
        if (move.mindBlownRecoil) {
          const hpBeforeRecoil = pokemon.hp;
          this.battle.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.dex.conditions.get(move.id), true);
          move.mindBlownRecoil = false;
          if (pokemon.hp <= pokemon.maxhp / 2 && hpBeforeRecoil > pokemon.maxhp / 2) {
            this.battle.runEvent('EmergencyExit', pokemon, pokemon);
          }
        }
        this.battle.eachEvent('Update');
        if (!pokemon.hp && targets.length === 1) {
          hit++; // report the correct number of hits for multihit moves
          break;
        }
      }
      // hit is 1 higher than the actual hit count
      if (hit === 1) return damage.fill(false);
      if (nullDamage) damage.fill(false);
      this.battle.faintMessages(false, false, !pokemon.hp);
      if (move.multihit && typeof move.smartTarget !== 'boolean') {
        this.battle.add('-hitcount', targets[0], hit - 1);
      }

      if ((move.recoil || (move.id === 'chloroblast' && !pokemon.hasAbility('explosive') && !pokemon.hasAbility('nevergonnagiveyouup'))) && move.totalDamage) {
        const hpBeforeRecoil = pokemon.hp;
        this.battle.damage(this.calcRecoilDamage(move.totalDamage, move, pokemon), pokemon, pokemon, 'recoil');
        if (pokemon.hp <= pokemon.maxhp / 2 && hpBeforeRecoil > pokemon.maxhp / 2) {
          this.battle.runEvent('EmergencyExit', pokemon, pokemon);
        }
      }

      if (move.struggleRecoil) {
        const hpBeforeRecoil = pokemon.hp;
        let recoilDamage;
        if (this.dex.gen >= 5) {
          recoilDamage = this.battle.clampIntRange(Math.round(pokemon.baseMaxhp / 4), 1);
        } else {
          recoilDamage = this.battle.clampIntRange(this.battle.trunc(pokemon.maxhp / 4), 1);
        }
        this.battle.directDamage(recoilDamage, pokemon, pokemon, { id: 'strugglerecoil' } as Condition);
        if (pokemon.hp <= pokemon.maxhp / 2 && hpBeforeRecoil > pokemon.maxhp / 2) {
          this.battle.runEvent('EmergencyExit', pokemon, pokemon);
        }
      }

      // smartTarget messes up targetsCopy, but smartTarget should in theory ensure that targets will never fail, anyway
      if (move.smartTarget) {
        if (move.smartTarget && targets.length > 1) {
          targetsCopy = [targets[hit - 1]];
        } else {
          targetsCopy = targets.slice(0);
        }
      }

      for (const [i, target] of targetsCopy.entries()) {
        if (target && pokemon !== target) {
          target.gotAttacked(move, moveDamage[i] as number | false | undefined, pokemon);
          if (typeof moveDamage[i] === 'number') {
            target.timesAttacked += hit - 1;
          }
        }
      }

      if (move.ohko && !targets[0].hp) this.battle.add('-ohko');

      if (!damage.some(val => !!val || val === 0)) return damage;

      this.battle.eachEvent('Update');

      this.afterMoveSecondaryEvent(targetsCopy.filter(val => !!val) as Pokemon[], pokemon, move);

      if (!move.negateSecondary && !(move.hasSheerForce && pokemon.hasAbility('sheerforce'))) {
        for (const [i, d] of damage.entries()) {
          // There are no multihit spread moves, so it's safe to use move.totalDamage for multihit moves
          // The previous check was for `move.multihit`, but that fails for Dragon Darts
          const curDamage = targets.length === 1 ? move.totalDamage : d;
          if (typeof curDamage === 'number' && targets[i].hp) {
            const targetHPBeforeDamage = (targets[i].hurtThisTurn || 0) + curDamage;
            if (targets[i].hp <= targets[i].maxhp / 2 && targetHPBeforeDamage > targets[i].maxhp / 2) {
              this.battle.runEvent('EmergencyExit', targets[i], pokemon);
            }
          }
        }
      }

      return damage;
    },

    calcRecoilDamage(damageDealt: number, move: Move, pokemon: Pokemon): number {
      if (move.id === 'chloroblast') return Math.round(pokemon.maxhp / 2);
      return this.battle.clampIntRange(Math.round(damageDealt * move.recoil![0] / move.recoil![1]), 1);
    }
  },



  init() {

    // distrib for PLA moves

    // headlongrush 
    this.modData('Learnsets', 'copperajah').learnset.headlongrush = ['9L1'];
    this.modData('Learnsets', 'bouffalant').learnset.headlongrush = ['9L1'];
    this.modData('Learnsets', 'mamoswine').learnset.headlongrush = ['9L1'];

    // ragingfury 
    this.modData('Learnsets', 'emboar').learnset.ragingfury = ['9L1'];
    this.modData('Learnsets', 'darmanitan').learnset.ragingfury = ['9L1'];

    // wavecrash 
    this.modData('Learnsets', 'kabutops').learnset.wavecrash = ['9L1'];
    this.modData('Learnsets', 'poliwrath').learnset.wavecrash = ['9L1'];
    this.modData('Learnsets', 'azumarill').learnset.wavecrash = ['9L1'];
    this.modData('Learnsets', 'walrein').learnset.wavecrash = ['9L1'];
    this.modData('Learnsets', 'carracosta').learnset.wavecrash = ['9L1'];

    // mountaingale 
    this.modData('Learnsets', 'abomasnow').learnset.mountaingale = ['9L1'];
    this.modData('Learnsets', 'crabominable').learnset.mountaingale = ['9L1'];
    this.modData('Learnsets', 'beartic').learnset.mountaingale = ['9L1'];
    this.modData('Learnsets', 'glastrier').learnset.mountaingale = ['9L1'];
    this.modData('Learnsets', 'mamoswine').learnset.mountaingale = ['9L1'];

    //    

    // magicmissile 
    this.modData('Learnsets', 'rayquaza').learnset.magicmissile = ['9L1'];
    this.modData('Learnsets', 'mismagius').learnset.magicmissile = ['9L1'];
    this.modData('Learnsets', 'azelf').learnset.magicmissile = ['9L1'];
    this.modData('Learnsets', 'uxie').learnset.magicmissile = ['9L1'];
    this.modData('Learnsets', 'mesprit').learnset.magicmissile = ['9L1'];
    this.modData('Learnsets', 'dialga').learnset.magicmissile = ['9L1'];
    this.modData('Learnsets', 'palkia').learnset.magicmissile = ['9L1'];
    this.modData('Learnsets', 'giratina').learnset.magicmissile = ['9L1'];
    this.modData('Learnsets', 'arceus').learnset.magicmissile = ['9L1'];
    this.modData('Learnsets', 'zoroarkhisui').learnset.magicmissile = ['9L1'];
    this.modData('Learnsets', 'delphox').learnset.magicmissile = ['9L1'];
    this.modData('Learnsets', 'drampa').learnset.magicmissile = ['9L1'];
    this.modData('Learnsets', 'wyrdeer').learnset.magicmissile = ['9L1'];
    this.modData('Learnsets', 'ursalunabloodmoon').learnset.magicmissile = ['9L1'];

    // hardwareheat 
    this.modData('Learnsets', 'magnezone').learnset.hardwareheat = ['8L1'];
    this.modData('Learnsets', 'magearna').learnset.hardwareheat = ['8L1'];
    this.modData('Learnsets', 'magearnaoriginal').learnset.hardwareheat = ['8L1'];
    this.modData('Learnsets', 'porygon').learnset.hardwareheat = ['8L1'];
    this.modData('Learnsets', 'silvally').learnset.hardwareheat = ['8L1'];
    this.modData('Learnsets', 'scizorgalar').learnset.hardwareheat = ['8L1'];
    this.modData('Learnsets', 'genesect').learnset.hardwareheat = ['8L1'];

    // swarming 
    this.modData('Learnsets', 'mewtwo').learnset.swarming = ['8L1'];
    this.modData('Learnsets', 'baalzebutis').learnset.swarming = ['8L1'];
    this.modData('Learnsets', 'deoxys').learnset.swarming = ['8L1'];
    this.modData('Learnsets', 'silvally').learnset.swarming = ['8L1'];
    this.modData('Learnsets', 'porygon').learnset.swarming = ['8L1'];
    this.modData('Learnsets', 'snoxin').learnset.swarming = ['8L1'];
    this.modData('Learnsets', 'illumise').learnset.swarming = ['8L1'];
    this.modData('Learnsets', 'volbeat').learnset.swarming = ['8L1'];
    this.modData('Learnsets', 'magroach').learnset.swarming = ['8L1'];
    this.modData('Learnsets', 'scizorgalar').learnset.swarming = ['8L1'];
    this.modData('Learnsets', 'yanma').learnset.swarming = ['8L1'];
    this.modData('Learnsets', 'kricketune').learnset.swarming = ['8L1'];
    this.modData('Learnsets', 'annoyog').learnset.swarming = ['8L1'];
    this.modData('Learnsets', 'accelgor').learnset.swarming = ['8L1'];
    this.modData('Learnsets', 'parasect').learnset.swarming = ['8L1'];
    this.modData('Learnsets', 'slitherwing').learnset.swarming = ['9L1'];

    // underdog 
    this.modData('Learnsets', 'lillipup').learnset.underdog = ['9M'];
    this.modData('Learnsets', 'herdier').learnset.underdog = ['9M'];
    this.modData('Learnsets', 'stoutland').learnset.underdog = ['9M'];
    this.modData('Learnsets', 'snubbull').learnset.underdog = ['9M'];
    this.modData('Learnsets', 'granbull').learnset.underdog = ['9M'];
    this.modData('Learnsets', 'eevee').learnset.underdog = ['9M'];
    this.modData('Learnsets', 'vaporeon').learnset.underdog = ['9M'];
    this.modData('Learnsets', 'jolteon').learnset.underdog = ['9M'];
    this.modData('Learnsets', 'flareon').learnset.underdog = ['9M'];
    this.modData('Learnsets', 'espeon').learnset.underdog = ['9M'];
    this.modData('Learnsets', 'umbreon').learnset.underdog = ['9M'];
    this.modData('Learnsets', 'leafeon').learnset.underdog = ['9M'];
    this.modData('Learnsets', 'glaceon').learnset.underdog = ['9M'];
    this.modData('Learnsets', 'sylveon').learnset.underdog = ['9M'];
    this.modData('Learnsets', 'furfrou').learnset.underdog = ['9M'];
    this.modData('Learnsets', 'growlithe').learnset.underdog = ['9M'];
    this.modData('Learnsets', 'growlithehisui').learnset.underdog = ['9M'];
    this.modData('Learnsets', 'arcanine').learnset.underdog = ['9M'];
    this.modData('Learnsets', 'arcaninehisui').learnset.underdog = ['9M'];
    this.modData('Learnsets', 'yamper').learnset.underdog = ['9M'];
    this.modData('Learnsets', 'boltund').learnset.underdog = ['9M'];
    this.modData('Learnsets', 'watchog').learnset.underdog = ['9M'];
    this.modData('Learnsets', 'furret').learnset.underdog = ['9M'];
    this.modData('Learnsets', 'gumshoos').learnset.underdog = ['9M'];
    this.modData('Learnsets', 'linoonegalar').learnset.underdog = ['9M'];
    this.modData('Learnsets', 'obstagoon').learnset.underdog = ['9M'];

    // natureswrath 
    this.modData('Learnsets', 'comfey').learnset.natureswrath = ['9M'];
    this.modData('Learnsets', 'florges').learnset.natureswrath = ['9M'];
    this.modData('Learnsets', 'rillaboom').learnset.natureswrath = ['9M'];
    this.modData('Learnsets', 'serperior').learnset.natureswrath = ['9M'];
    this.modData('Learnsets', 'abomasnow').learnset.natureswrath = ['9M'];
    this.modData('Learnsets', 'exeggutor').learnset.natureswrath = ['9M'];
    this.modData('Learnsets', 'exeggutoralola').learnset.natureswrath = ['9M'];
    this.modData('Learnsets', 'gogoat').learnset.natureswrath = ['9M'];
    this.modData('Learnsets', 'sawsbuck').learnset.natureswrath = ['9M'];
    this.modData('Learnsets', 'shiftry').learnset.natureswrath = ['9M'];
    this.modData('Learnsets', 'torterra').learnset.natureswrath = ['9M'];
    this.modData('Learnsets', 'landorus').learnset.natureswrath = ['9M'];
    this.modData('Learnsets', 'sautropius').learnset.natureswrath = ['9M'];
    this.modData('Learnsets', 'wochien').learnset.natureswrath = ['9M'];
    this.modData('Learnsets', 'venusaur').learnset.natureswrath = ['9M'];
    this.modData('Learnsets', 'trevenant').learnset.natureswrath = ['9M'];

    // flamingsphere 
    this.modData('Learnsets', 'magmar').learnset.flamingsphere = ['9M'];
    this.modData('Learnsets', 'moltres').learnset.flamingsphere = ['9M'];
    this.modData('Learnsets', 'entei').learnset.flamingsphere = ['9M'];
    this.modData('Learnsets', 'hooh').learnset.flamingsphere = ['9M'];
    this.modData('Learnsets', 'magmortar').learnset.flamingsphere = ['9M'];
    this.modData('Learnsets', 'reshiram').learnset.flamingsphere = ['9M'];
    this.modData('Learnsets', 'braixen').learnset.flamingsphere = ['9M'];
    this.modData('Learnsets', 'delphox').learnset.flamingsphere = ['9M'];
    this.modData('Learnsets', 'cinderace').learnset.flamingsphere = ['9M'];
    this.modData('Learnsets', 'scizorgalar').learnset.flamingsphere = ['9M'];

    // fireball 
    this.modData('Learnsets', 'charizard').learnset.fireball = ['9M'];
    this.modData('Learnsets', 'hooh').learnset.fireball = ['9M'];
    this.modData('Learnsets', 'reshiram').learnset.fireball = ['9M'];
    this.modData('Learnsets', 'mismagius').learnset.fireball = ['9M'];
    this.modData('Learnsets', 'delphox').learnset.fireball = ['9M'];
    this.modData('Learnsets', 'ninetales').learnset.fireball = ['9M'];
    this.modData('Learnsets', 'chandelure').learnset.fireball = ['9M'];
    this.modData('Learnsets', 'magmortar').learnset.fireball = ['9M'];
    this.modData('Learnsets', 'cinderace').learnset.fireball = ['9M'];
    this.modData('Learnsets', 'drinferno').learnset.fireball = ['9M'];

    // backfire 
    this.modData('Learnsets', 'reshiram').learnset.backfire = ['9M'];
    this.modData('Learnsets', 'hooh').learnset.backfire = ['9M'];
    this.modData('Learnsets', 'victini').learnset.backfire = ['9M'];
    this.modData('Learnsets', 'blacephalon').learnset.backfire = ['9M'];
    this.modData('Learnsets', 'chimchar').learnset.backfire = ['9M'];
    this.modData('Learnsets', 'monferno').learnset.backfire = ['9M'];
    this.modData('Learnsets', 'infernape').learnset.backfire = ['9M'];
    this.modData('Learnsets', 'tepig').learnset.backfire = ['9M'];
    this.modData('Learnsets', 'pignite').learnset.backfire = ['9M'];
    this.modData('Learnsets', 'emboar').learnset.backfire = ['9M'];
    this.modData('Learnsets', 'emboargalar').learnset.backfire = ['9M'];
    this.modData('Learnsets', 'turtonator').learnset.backfire = ['9M'];
    this.modData('Learnsets', 'litwick').learnset.backfire = ['9M'];
    this.modData('Learnsets', 'lampent').learnset.backfire = ['9M'];
    this.modData('Learnsets', 'chandelure').learnset.backfire = ['9M'];
    this.modData('Learnsets', 'marowakalola').learnset.backfire = ['9M'];
    this.modData('Learnsets', 'vulpix').learnset.backfire = ['9M'];
    this.modData('Learnsets', 'ninetales').learnset.backfire = ['9M'];
    this.modData('Learnsets', 'litleo').learnset.backfire = ['9M'];
    this.modData('Learnsets', 'pyroar').learnset.backfire = ['9M'];
    this.modData('Learnsets', 'fletchinder').learnset.backfire = ['9M'];
    this.modData('Learnsets', 'talonflame').learnset.backfire = ['9M'];
    this.modData('Learnsets', 'cyndaquil').learnset.backfire = ['9M'];
    this.modData('Learnsets', 'quilava').learnset.backfire = ['9M'];
    this.modData('Learnsets', 'typhlosion').learnset.backfire = ['9M'];
    this.modData('Learnsets', 'wizamadol').learnset.backfire = ['9M'];
    this.modData('Learnsets', 'solens').learnset.backfire = ['9M'];
    this.modData('Learnsets', 'charmander').learnset.backfire = ['9M'];
    this.modData('Learnsets', 'charmeleon').learnset.backfire = ['9M'];
    this.modData('Learnsets', 'charizard').learnset.backfire = ['9M'];
    this.modData('Learnsets', 'torchic').learnset.backfire = ['9M'];
    this.modData('Learnsets', 'combusken').learnset.backfire = ['9M'];
    this.modData('Learnsets', 'blaziken').learnset.backfire = ['9M'];
    this.modData('Learnsets', 'ponyta').learnset.backfire = ['9M'];
    this.modData('Learnsets', 'rapidash').learnset.backfire = ['9M'];

    // highwater 
    this.modData('Learnsets', 'squirtle').learnset.highwater = ['9M'];
    this.modData('Learnsets', 'wartortle').learnset.highwater = ['9M'];
    this.modData('Learnsets', 'blastoise').learnset.highwater = ['9M'];
    this.modData('Learnsets', 'tentacruel').learnset.highwater = ['9M'];
    this.modData('Learnsets', 'poliwrath').learnset.highwater = ['9M'];
    this.modData('Learnsets', 'dewgong').learnset.highwater = ['9M'];
    this.modData('Learnsets', 'vaporeon').learnset.highwater = ['9M'];
    this.modData('Learnsets', 'chinchou').learnset.highwater = ['9M'];
    this.modData('Learnsets', 'lanturn').learnset.highwater = ['9M'];
    this.modData('Learnsets', 'politoed').learnset.highwater = ['9M'];
    this.modData('Learnsets', 'seismitoad').learnset.highwater = ['9M'];
    this.modData('Learnsets', 'jellicent').learnset.highwater = ['9M'];
    this.modData('Learnsets', 'eelektross').learnset.highwater = ['9M'];
    this.modData('Learnsets', 'stunfisk').learnset.highwater = ['9M'];
    this.modData('Learnsets', 'skrelp').learnset.highwater = ['9M'];
    this.modData('Learnsets', 'dragalge').learnset.highwater = ['9M'];
    this.modData('Learnsets', 'volcanion').learnset.highwater = ['9M'];
    this.modData('Learnsets', 'golisopod').learnset.highwater = ['9M'];
    this.modData('Learnsets', 'araquanid').learnset.highwater = ['9M'];
    this.modData('Learnsets', 'grapploct').learnset.highwater = ['9M'];
    this.modData('Learnsets', 'medidragon').learnset.highwater = ['9M'];

    // seajaws 
    this.modData('Learnsets', 'dracovish').learnset.seajaws = ['9L1'];
    this.modData('Learnsets', 'gyarados').learnset.seajaws = ['9L1'];
    this.modData('Learnsets', 'barraskewda').learnset.seajaws = ['9L1'];
    this.modData('Learnsets', 'sharpedo').learnset.seajaws = ['9L1'];
    this.modData('Learnsets', 'bruxish').learnset.seajaws = ['9L1'];
    this.modData('Learnsets', 'drednaw').learnset.seajaws = ['9L1'];
    this.modData('Learnsets', 'feraligatr').learnset.seajaws = ['9L1'];
    this.modData('Learnsets', 'basculin').learnset.seajaws = ['9L1'];
    this.modData('Learnsets', 'basculegion').learnset.seajaws = ['9L1'];
    this.modData('Learnsets', 'basculegionf').learnset.seajaws = ['9L1'];
    this.modData('Learnsets', 'carracosta').learnset.seajaws = ['9L1'];
    this.modData('Learnsets', 'arctovish').learnset.seajaws = ['9L1'];
    this.modData('Learnsets', 'huntail').learnset.seajaws = ['9L1'];
    this.modData('Learnsets', 'relicanth').learnset.seajaws = ['9L1'];

    // roguewave 
    this.modData('Learnsets', 'basculegion').learnset.roguewave = ['9L1'];
    this.modData('Learnsets', 'basculegionf').learnset.roguewave = ['9L1'];
    this.modData('Learnsets', 'croagunk').learnset.roguewave = ['9L1'];
    this.modData('Learnsets', 'floatzel').learnset.roguewave = ['9L1'];
    this.modData('Learnsets', 'basculin').learnset.roguewave = ['9L1'];
    this.modData('Learnsets', 'sharpedo').learnset.roguewave = ['9L1'];
    this.modData('Learnsets', 'azumarill').learnset.roguewave = ['9L1'];
    this.modData('Learnsets', 'kingdra').learnset.roguewave = ['9L1'];
    this.modData('Learnsets', 'quaquaval').learnset.roguewave = ['9L1'];
    this.modData('Learnsets', 'dhelmise').learnset.roguewave = ['9L1'];
    this.modData('Learnsets', 'armaldo').learnset.roguewave = ['9L1'];

    // parallelcircuit 
    this.modData('Learnsets', 'ironhands').learnset.parallelcircuit = ['9M'];
    this.modData('Learnsets', 'ironthorns').learnset.parallelcircuit = ['9M'];
    this.modData('Learnsets', 'electivire').learnset.parallelcircuit = ['9M'];
    this.modData('Learnsets', 'luxray').learnset.parallelcircuit = ['9M'];
    this.modData('Learnsets', 'morpeko').learnset.parallelcircuit = ['9M'];
    this.modData('Learnsets', 'zeraora').learnset.parallelcircuit = ['9M'];
    this.modData('Learnsets', 'pincurchin').learnset.parallelcircuit = ['9M'];
    this.modData('Learnsets', 'zebstrika').learnset.parallelcircuit = ['9M'];
    this.modData('Learnsets', 'pikachu').learnset.parallelcircuit = ['9M'];
    this.modData('Learnsets', 'pawmi').learnset.parallelcircuit = ['9M'];
    this.modData('Learnsets', 'boltund').learnset.parallelcircuit = ['9M'];

    // musclecare 
    this.modData('Learnsets', 'poliwrath').learnset.musclecare = ['9L1'];
    this.modData('Learnsets', 'machop').learnset.musclecare = ['9L1'];
    this.modData('Learnsets', 'tyrogue').learnset.musclecare = ['9L1'];
    this.modData('Learnsets', 'makuhita').learnset.musclecare = ['9L1'];
    this.modData('Learnsets', 'meditite').learnset.musclecare = ['9L1'];
    this.modData('Learnsets', 'riolu').learnset.musclecare = ['9L1'];
    this.modData('Learnsets', 'sawk').learnset.musclecare = ['9L1'];
    this.modData('Learnsets', 'throh').learnset.musclecare = ['9L1'];
    this.modData('Learnsets', 'cobalion').learnset.musclecare = ['9L1'];
    this.modData('Learnsets', 'terrakion').learnset.musclecare = ['9L1'];
    this.modData('Learnsets', 'virizion').learnset.musclecare = ['9L1'];
    this.modData('Learnsets', 'keldeo').learnset.musclecare = ['9L1'];
    this.modData('Learnsets', 'hawlucha').learnset.musclecare = ['9L1'];
    this.modData('Learnsets', 'passimian').learnset.musclecare = ['9L1'];
    this.modData('Learnsets', 'buzzwole').learnset.musclecare = ['9L1'];
    this.modData('Learnsets', 'cinderace').learnset.musclecare = ['9L1'];
    this.modData('Learnsets', 'kubfu').learnset.musclecare = ['9L1'];
    this.modData('Learnsets', 'quaquaval').learnset.musclecare = ['9L1'];
    this.modData('Learnsets', 'mystao').learnset.musclecare = ['9L1'];

    // dissolution 
    this.modData('Learnsets', 'venusaur').learnset.dissolution = ['9M'];
    this.modData('Learnsets', 'arbok').learnset.dissolution = ['9M'];
    this.modData('Learnsets', 'grimer').learnset.dissolution = ['9M'];
    this.modData('Learnsets', 'grimeralola').learnset.dissolution = ['9M'];
    this.modData('Learnsets', 'muk').learnset.dissolution = ['9M'];
    this.modData('Learnsets', 'mukalola').learnset.dissolution = ['9M'];
    this.modData('Learnsets', 'koffing').learnset.dissolution = ['9M'];
    this.modData('Learnsets', 'weezing').learnset.dissolution = ['9M'];
    this.modData('Learnsets', 'weezinggalar').learnset.dissolution = ['9M'];
    this.modData('Learnsets', 'skrelp').learnset.dissolution = ['9M'];
    this.modData('Learnsets', 'dragalge').learnset.dissolution = ['9M'];
    this.modData('Learnsets', 'nihilego').learnset.dissolution = ['9M'];
    this.modData('Learnsets', 'garbodor').learnset.dissolution = ['9M'];
    this.modData('Learnsets', 'salazzle').learnset.dissolution = ['9M'];
    this.modData('Learnsets', 'gulpin').learnset.dissolution = ['9M'];
    this.modData('Learnsets', 'swalot').learnset.dissolution = ['9M'];
    this.modData('Learnsets', 'tentacool').learnset.dissolution = ['9M'];
    this.modData('Learnsets', 'tentacruel').learnset.dissolution = ['9M'];
    this.modData('Learnsets', 'bellsprout').learnset.dissolution = ['9M'];
    this.modData('Learnsets', 'weepinbell').learnset.dissolution = ['9M'];
    this.modData('Learnsets', 'victreebel').learnset.dissolution = ['9M'];
    this.modData('Learnsets', 'vileplume').learnset.dissolution = ['9M'];
    this.modData('Learnsets', 'accelgor').learnset.dissolution = ['9M'];
    this.modData('Learnsets', 'seismitoad').learnset.dissolution = ['9M'];
    this.modData('Learnsets', 'shuckle').learnset.dissolution = ['9M'];
    this.modData('Learnsets', 'lickilicky').learnset.dissolution = ['9M'];
    this.modData('Learnsets', 'annoyog').learnset.dissolution = ['9M'];
    this.modData('Learnsets', 'cradily').learnset.dissolution = ['9M'];
    this.modData('Learnsets', 'appletun').learnset.dissolution = ['9M'];

    // landslide 
    this.modData('Learnsets', 'hippopotas').learnset.landslide = ['9M'];
    this.modData('Learnsets', 'hippowdon').learnset.landslide = ['9M'];
    this.modData('Learnsets', 'mudsdale').learnset.landslide = ['9M'];
    this.modData('Learnsets', 'palossand').learnset.landslide = ['9M'];
    this.modData('Learnsets', 'sandaconda').learnset.landslide = ['9M'];
    this.modData('Learnsets', 'larvitar').learnset.landslide = ['9M'];
    this.modData('Learnsets', 'pupitar').learnset.landslide = ['9M'];
    this.modData('Learnsets', 'tyranitar').learnset.landslide = ['9M'];
    this.modData('Learnsets', 'torterra').learnset.landslide = ['9M'];
    this.modData('Learnsets', 'machamp').learnset.landslide = ['9M'];
    this.modData('Learnsets', 'graveler').learnset.landslide = ['9M'];
    this.modData('Learnsets', 'golem').learnset.landslide = ['9M'];
    this.modData('Learnsets', 'graveleralola').learnset.landslide = ['9M'];
    this.modData('Learnsets', 'golemalola').learnset.landslide = ['9M'];
    this.modData('Learnsets', 'piloswine').learnset.landslide = ['9M'];
    this.modData('Learnsets', 'mamoswine').learnset.landslide = ['9M'];
    this.modData('Learnsets', 'onix').learnset.landslide = ['9M'];
    this.modData('Learnsets', 'steelix').learnset.landslide = ['9M'];
    this.modData('Learnsets', 'rhyhorn').learnset.landslide = ['9M'];
    this.modData('Learnsets', 'rhydon').learnset.landslide = ['9M'];
    this.modData('Learnsets', 'rhyperior').learnset.landslide = ['9M'];
    this.modData('Learnsets', 'coalossal').learnset.landslide = ['9M'];
    this.modData('Learnsets', 'gigalith').learnset.landslide = ['9M'];
    this.modData('Learnsets', 'lairon').learnset.landslide = ['9M'];
    this.modData('Learnsets', 'aggron').learnset.landslide = ['9M'];
    this.modData('Learnsets', 'stonjourner').learnset.landslide = ['9M'];
    this.modData('Learnsets', 'ironthorns').learnset.landslide = ['9M'];

    // epicenter 
    this.modData('Learnsets', 'golem').learnset.epicenter = ['9L1'];
    this.modData('Learnsets', 'camerupt').learnset.epicenter = ['9L1'];
    this.modData('Learnsets', 'torterra').learnset.epicenter = ['9L1'];
    this.modData('Learnsets', 'claydol').learnset.epicenter = ['9L1'];
    this.modData('Learnsets', 'donphan').learnset.epicenter = ['9L1'];
    this.modData('Learnsets', 'rhydon').learnset.epicenter = ['9L1'];
    this.modData('Learnsets', 'rhyperior').learnset.epicenter = ['9L1'];
    this.modData('Learnsets', 'mudsdale').learnset.epicenter = ['9L1'];
    this.modData('Learnsets', 'coalossal').learnset.epicenter = ['9L1'];
    this.modData('Learnsets', 'gigalith').learnset.epicenter = ['9L1'];
    this.modData('Learnsets', 'copperajah').learnset.epicenter = ['9L1'];
    this.modData('Learnsets', 'metagross').learnset.epicenter = ['9L1'];
    this.modData('Learnsets', 'ironthorns').learnset.epicenter = ['9L1'];

    // downdraft 
    this.modData('Learnsets', 'rayquaza').learnset.downdraft = ['9L1'];
    this.modData('Learnsets', 'lugia').learnset.downdraft = ['9L1'];
    this.modData('Learnsets', 'hooh').learnset.downdraft = ['9L1'];
    this.modData('Learnsets', 'corviknight').learnset.downdraft = ['9L1'];
    this.modData('Learnsets', 'latias').learnset.downdraft = ['9L1'];
    this.modData('Learnsets', 'latios').learnset.downdraft = ['9L1'];
    this.modData('Learnsets', 'celesteela').learnset.downdraft = ['9L1'];
    this.modData('Learnsets', 'dragonite').learnset.downdraft = ['9L1'];
    this.modData('Learnsets', 'salamence').learnset.downdraft = ['9L1'];
    this.modData('Learnsets', 'talonflame').learnset.downdraft = ['9L1'];
    this.modData('Learnsets', 'altaria').learnset.downdraft = ['9L1'];
    this.modData('Learnsets', 'archeops').learnset.downdraft = ['9L1'];
    this.modData('Learnsets', 'braviary').learnset.downdraft = ['9L1'];
    this.modData('Learnsets', 'drifblim').learnset.downdraft = ['9L1'];
    this.modData('Learnsets', 'noivern').learnset.downdraft = ['9L1'];
    this.modData('Learnsets', 'noctowl').learnset.downdraft = ['9L1'];
    this.modData('Learnsets', 'swellow').learnset.downdraft = ['9L1'];
    this.modData('Learnsets', 'staraptor').learnset.downdraft = ['9L1'];
    this.modData('Learnsets', 'articuno').learnset.downdraft = ['9L1'];
    this.modData('Learnsets', 'articunogalar').learnset.downdraft = ['9L1'];
    this.modData('Learnsets', 'shiftry').learnset.downdraft = ['9L1'];
    this.modData('Learnsets', 'unfezant').learnset.downdraft = ['9L1'];
    this.modData('Learnsets', 'unfezantf').learnset.downdraft = ['9L1'];
    this.modData('Learnsets', 'cymadalea').learnset.downdraft = ['9L1'];
    this.modData('Learnsets', 'medidragon').learnset.downdraft = ['9L1'];
    this.modData('Learnsets', 'admistral').learnset.downdraft = ['9L1'];

    // clearmind 
    this.modData('Learnsets', 'deoxys').learnset.clearmind = ['9L1'];
    this.modData('Learnsets', 'keldeo').learnset.clearmind = ['9L1'];
    this.modData('Learnsets', 'mew').learnset.clearmind = ['9L1'];
    this.modData('Learnsets', 'mystao').learnset.clearmind = ['9L1'];
    this.modData('Learnsets', 'silvally').learnset.clearmind = ['9L1'];
    this.modData('Learnsets', 'slowpoke').learnset.clearmind = ['9L1'];
    this.modData('Learnsets', 'slowpokegalar').learnset.clearmind = ['9L1'];
    this.modData('Learnsets', 'ironleaves').learnset.clearmind = ['9L1'];
    this.modData('Learnsets', 'orbeetle').learnset.clearmind = ['9L1'];
    this.modData('Learnsets', 'uxie').learnset.clearmind = ['9L1'];
    this.modData('Learnsets', 'delphox').learnset.clearmind = ['9L1'];
    this.modData('Learnsets', 'gardevoir').learnset.clearmind = ['9L1'];
    this.modData('Learnsets', 'necrozma').learnset.clearmind = ['9L1'];
    this.modData('Learnsets', 'reuniclus').learnset.clearmind = ['9L1'];
    this.modData('Learnsets', 'medicham').learnset.clearmind = ['9L1'];
    this.modData('Learnsets', 'espeon').learnset.clearmind = ['9L1'];
    this.modData('Learnsets', 'latias').learnset.clearmind = ['9L1'];
    this.modData('Learnsets', 'latios').learnset.clearmind = ['9L1'];
    this.modData('Learnsets', 'mewtwo').learnset.clearmind = ['9L1'];
    this.modData('Learnsets', 'wizamadol').learnset.clearmind = ['9L1'];

    // golemstrike 
    this.modData('Learnsets', 'nidoqueen').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'nidoking').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'primeape').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'machamp').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'geodude').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'geodudealola').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'graveler').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'graveleralola').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'golem').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'golemalola').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'grimeralola').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'mukalola').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'hitmonlee').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'hitmonchan').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'rhydon').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'rhyperior').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'aerodactyl').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'dragonite').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'mew').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'sudowoodo').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'smeargle').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'hitmontop').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'tyranitar').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'blaziken').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'aggron').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'armaldo').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'absol').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'regirock').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'groudon').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'infernape').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'lucario').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'toxicroak').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'gallade').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'dialga').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'palkia').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'regigigas').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'arceus').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'pignite').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'emboar').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'timburr').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'gurdurr').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'conkeldurr').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'throh').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'sawk').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'krokorok').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'krookodile').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'darmanitan').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'darmanitangalar').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'dwebble').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'crustle').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'scraggy').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'scrafty').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'tirtouga').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'carracosta').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'golurk').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'bisharp').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'terrakion').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'chesnaught').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'diggersby').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'binacle').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'barbaracle').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'crabrawler').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'crabominable').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'rockruff').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'lycanroc').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'lycanrocdusk').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'lycanrocmidnight').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'solgaleo').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'buzzwole').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'celesteela').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'stakataka').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'runerigus').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'copperajah').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'urshifu').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'urshifurapidstrike').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'kleavor').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'ledian').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'ledixy').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'mosquitox').learnset.golemstrike = ['9M'];
    this.modData('Learnsets', 'gogoat').learnset.golemstrike = ['9L1'];

    // punishingblow 
    this.modData('Learnsets', 'froslass').learnset.punishingblow = ['9L1'];
    this.modData('Learnsets', 'blacephalon').learnset.punishingblow = ['9L1'];
    this.modData('Learnsets', 'banette').learnset.punishingblow = ['9L1'];
    this.modData('Learnsets', 'decidueye').learnset.punishingblow = ['9L1'];
    this.modData('Learnsets', 'dhelmise').learnset.punishingblow = ['9L1'];
    this.modData('Learnsets', 'golurk').learnset.punishingblow = ['9L1'];
    this.modData('Learnsets', 'mimikyu').learnset.punishingblow = ['9L1'];
    this.modData('Learnsets', 'annihilape').learnset.punishingblow = ['9L1'];
    this.modData('Learnsets', 'slendawful').learnset.punishingblow = ['9L1'];
    this.modData('Learnsets', 'paranormear').learnset.punishingblow = ['9L1'];
    this.modData('Learnsets', 'trevenant').learnset.punishingblow = ['9M'];

    // condensate 
    this.modData('Learnsets', 'ninetalesalola').learnset.condensate = ['9L1'];
    this.modData('Learnsets', 'articuno').learnset.condensate = ['9L1'];
    this.modData('Learnsets', 'aurorus').learnset.condensate = ['9L1'];
    this.modData('Learnsets', 'lapras').learnset.condensate = ['9L1'];
    this.modData('Learnsets', 'walrein').learnset.condensate = ['9L1'];
    this.modData('Learnsets', 'arctovish').learnset.condensate = ['9L1'];
    this.modData('Learnsets', 'arctozolt').learnset.condensate = ['9L1'];
    this.modData('Learnsets', 'kyurem').learnset.condensate = ['9L1'];
    this.modData('Learnsets', 'abomasnow').learnset.condensate = ['9L1'];
    this.modData('Learnsets', 'glaceon').learnset.condensate = ['9L1'];
    this.modData('Learnsets', 'frosmoth').learnset.condensate = ['9L1'];
    this.modData('Learnsets', 'vanilluxe').learnset.condensate = ['9L1'];
    this.modData('Learnsets', 'froslass').learnset.condensate = ['9L1'];
    this.modData('Learnsets', 'cryogonal').learnset.condensate = ['9L1'];
    this.modData('Learnsets', 'glastrier').learnset.condensate = ['9L1'];
    this.modData('Learnsets', 'calyrexice').learnset.condensate = ['9L1'];

    // chillblain 
    this.modData('Learnsets', 'sandshrewalola').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'sandslashalola').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'vulpixalola').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'ninetalesalola').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'dewgong').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'cloyster').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'mrmimegalar').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'jynx').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'lapras').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'articuno').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'sneasel').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'swinub').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'piloswine').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'delibird').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'smoochum').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'mew').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'snorunt').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'glalie').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'spheal').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'sealeo').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'walrein').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'regice').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'snover').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'abomasnow').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'weavile').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'glaceon').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'mamoswine').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'froslass').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'castform').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'darumakagalar').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'darmanitangalar').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'vanillite').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'vanillish').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'vanilluxe').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'cubchoo').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'beartic').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'cryogonal').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'kyurem').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'amaura').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'aurorus').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'bergmite').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'avalugg').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'crabominable').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'mrrime').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'snom').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'frosmoth').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'arceus').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'silvally').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'eiscue').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'arctozolt').learnset.chillblain = ['9L1'];

    // indomitablespirit 
    this.modData('Learnsets', 'gastly').learnset.indomitablespirit = ['9M'];
    this.modData('Learnsets', 'croagunk').learnset.indomitablespirit = ['9M'];
    this.modData('Learnsets', 'snorunt').learnset.indomitablespirit = ['9M'];
    this.modData('Learnsets', 'marowakalola').learnset.indomitablespirit = ['9M'];
    this.modData('Learnsets', 'sandygast').learnset.indomitablespirit = ['9M'];
    this.modData('Learnsets', 'hawlucha').learnset.indomitablespirit = ['9M'];
    this.modData('Learnsets', 'jangmoo').learnset.indomitablespirit = ['9M'];
    this.modData('Learnsets', 'riolu').learnset.indomitablespirit = ['9M'];
    this.modData('Learnsets', 'buzzwole').learnset.indomitablespirit = ['9M'];
    this.modData('Learnsets', 'heracross').learnset.indomitablespirit = ['9M'];
    this.modData('Learnsets', 'pancham').learnset.indomitablespirit = ['9M'];
    this.modData('Learnsets', 'scraggy').learnset.indomitablespirit = ['9M'];
    this.modData('Learnsets', 'poliwag').learnset.indomitablespirit = ['9M'];

    // monkeypunch 
    this.modData('Learnsets', 'primeape').learnset.monkeypunch = ['9L1'];
    this.modData('Learnsets', 'infernape').learnset.monkeypunch = ['9L1'];
    this.modData('Learnsets', 'oranguru').learnset.monkeypunch = ['9L1'];
    this.modData('Learnsets', 'zarude').learnset.monkeypunch = ['9L1'];
    this.modData('Learnsets', 'zarudedada').learnset.monkeypunch = ['9L1'];

    // cosmicpunch 
    this.modData('Learnsets', 'ledian').learnset.cosmicpunch = ['9L1'];
    this.modData('Learnsets', 'metang').learnset.cosmicpunch = ['9L1'];
    this.modData('Learnsets', 'lucario').learnset.cosmicpunch = ['9L1'];
    this.modData('Learnsets', 'paranormear').learnset.cosmicpunch = ['9L1'];

    // draconiccurse 
    this.modData('Learnsets', 'rayquaza').learnset.draconiccurse = ['9L1'];
    this.modData('Learnsets', 'reshiram').learnset.draconiccurse = ['9L1'];
    this.modData('Learnsets', 'hydreigon').learnset.draconiccurse = ['9L1'];
    this.modData('Learnsets', 'salamence').learnset.draconiccurse = ['9L1'];
    this.modData('Learnsets', 'noivern').learnset.draconiccurse = ['9L1'];
    this.modData('Learnsets', 'noivernsinnoh').learnset.draconiccurse = ['9L1'];
    this.modData('Learnsets', 'regidrago').learnset.draconiccurse = ['9L1'];
    this.modData('Learnsets', 'giratina').learnset.draconiccurse = ['9L1'];

    // draconicfury 
    this.modData('Learnsets', 'charizard').learnset.draconicfury = ['9L1'];
    this.modData('Learnsets', 'dragonite').learnset.draconicfury = ['9L1'];
    this.modData('Learnsets', 'salamence').learnset.draconicfury = ['9L1'];
    this.modData('Learnsets', 'rayquaza').learnset.draconicfury = ['9L1'];
    this.modData('Learnsets', 'haxorus').learnset.draconicfury = ['9L1'];
    this.modData('Learnsets', 'druddigon').learnset.draconicfury = ['9L1'];
    this.modData('Learnsets', 'hydreigon').learnset.draconicfury = ['9L1'];
    this.modData('Learnsets', 'zekrom').learnset.draconicfury = ['9L1'];
    this.modData('Learnsets', 'tyrantrum').learnset.draconicfury = ['9L1'];
    this.modData('Learnsets', 'kommoo').learnset.draconicfury = ['9L1'];
    this.modData('Learnsets', 'regidrago').learnset.draconicfury = ['9L1'];

    // contrariety 
    this.modData('Learnsets', 'larvitar').learnset.contrariety = ['9M'];
    this.modData('Learnsets', 'carvanha').learnset.contrariety = ['9M'];
    this.modData('Learnsets', 'pawniard').learnset.contrariety = ['9M'];
    this.modData('Learnsets', 'sandile').learnset.contrariety = ['9M'];
    this.modData('Learnsets', 'zorua').learnset.contrariety = ['9M'];
    this.modData('Learnsets', 'tyrunt').learnset.contrariety = ['9M'];
    this.modData('Learnsets', 'inkay').learnset.contrariety = ['9M'];
    this.modData('Learnsets', 'rowlet').learnset.contrariety = ['9M'];

    // blackflash 
    this.modData('Learnsets', 'baalzebutis').learnset.blackflash = ['9M'];
    this.modData('Learnsets', 'grimillia').learnset.blackflash = ['9M'];
    this.modData('Learnsets', 'chienpao').learnset.blackflash = ['9M'];
    this.modData('Learnsets', 'chiyu').learnset.blackflash = ['9M'];
    this.modData('Learnsets', 'wochien').learnset.blackflash = ['9M'];
    this.modData('Learnsets', 'tinglu').learnset.blackflash = ['9M'];
    this.modData('Learnsets', 'tyranitar').learnset.blackflash = ['9M'];
    this.modData('Learnsets', 'absol').learnset.blackflash = ['9M'];
    this.modData('Learnsets', 'gengar').learnset.blackflash = ['9M'];
    this.modData('Learnsets', 'hoopa').learnset.blackflash = ['9M'];
    this.modData('Learnsets', 'hydreigon').learnset.blackflash = ['9M'];
    this.modData('Learnsets', 'ironjugulis').learnset.blackflash = ['9M'];
    this.modData('Learnsets', 'moltresgalar').learnset.blackflash = ['9M'];
    this.modData('Learnsets', 'paranormear').learnset.blackflash = ['9M'];
    this.modData('Learnsets', 'sithbull').learnset.blackflash = ['9M'];
    this.modData('Learnsets', 'slendawful').learnset.blackflash = ['9M'];
    this.modData('Learnsets', 'zoroark').learnset.blackflash = ['9M'];
    this.modData('Learnsets', 'yveltal').learnset.blackflash = ['9M'];
    this.modData('Learnsets', 'chandelure').learnset.blackflash = ['9M'];
    this.modData('Learnsets', 'guzzlord').learnset.blackflash = ['9M'];
    this.modData('Learnsets', 'krookodile').learnset.blackflash = ['9M'];
    this.modData('Learnsets', 'malamar').learnset.blackflash = ['9M'];
    this.modData('Learnsets', 'necrozma').learnset.blackflash = ['9M'];
    this.modData('Learnsets', 'spiritomb').learnset.blackflash = ['9M'];
    this.modData('Learnsets', 'dusknoir').learnset.blackflash = ['9M'];

    // hypnotichorror 
    this.modData('Learnsets', 'gastly').learnset.hypnotichorror = ['9M'];
    this.modData('Learnsets', 'haunter').learnset.hypnotichorror = ['9M'];
    this.modData('Learnsets', 'gengar').learnset.hypnotichorror = ['9M'];
    this.modData('Learnsets', 'zorua').learnset.hypnotichorror = ['9M'];
    this.modData('Learnsets', 'zoroark').learnset.hypnotichorror = ['9M'];
    this.modData('Learnsets', 'zoruahisui').learnset.hypnotichorror = ['9M'];
    this.modData('Learnsets', 'zoroarkhisui').learnset.hypnotichorror = ['9M'];
    this.modData('Learnsets', 'darkrai').learnset.hypnotichorror = ['9M'];
    this.modData('Learnsets', 'inkay').learnset.hypnotichorror = ['9M'];
    this.modData('Learnsets', 'malamar').learnset.hypnotichorror = ['9M'];
    this.modData('Learnsets', 'hypno').learnset.hypnotichorror = ['9M'];
    this.modData('Learnsets', 'mewtwo').learnset.hypnotichorror = ['9M'];
    this.modData('Learnsets', 'mew').learnset.hypnotichorror = ['9M'];
    this.modData('Learnsets', 'drifblim').learnset.hypnotichorror = ['9M'];
    this.modData('Learnsets', 'hatenna').learnset.hypnotichorror = ['9M'];
    this.modData('Learnsets', 'hatterene').learnset.hypnotichorror = ['9M'];

    // sneakyassault 
    this.modData('Learnsets', 'rattataalola').learnset.sneakyassault = ['9L1'];
    this.modData('Learnsets', 'raticatealola').learnset.sneakyassault = ['9L1'];
    this.modData('Learnsets', 'meowth').learnset.sneakyassault = ['9L1'];
    this.modData('Learnsets', 'persian').learnset.sneakyassault = ['9L1'];
    this.modData('Learnsets', 'meowthalola').learnset.sneakyassault = ['9L1'];
    this.modData('Learnsets', 'persianalola').learnset.sneakyassault = ['9L1'];
    this.modData('Learnsets', 'meowthgalar').learnset.sneakyassault = ['9L1'];
    this.modData('Learnsets', 'perrserker').learnset.sneakyassault = ['9L1'];
    this.modData('Learnsets', 'gligar').learnset.sneakyassault = ['9L1'];
    this.modData('Learnsets', 'sneasel').learnset.sneakyassault = ['9L1'];
    this.modData('Learnsets', 'ninjask').learnset.sneakyassault = ['9L1'];
    this.modData('Learnsets', 'zangoose').learnset.sneakyassault = ['9L1'];
    this.modData('Learnsets', 'absol').learnset.sneakyassault = ['9L1'];
    this.modData('Learnsets', 'mothim').learnset.sneakyassault = ['9L1'];
    this.modData('Learnsets', 'luxray').learnset.sneakyassault = ['9L1'];
    this.modData('Learnsets', 'drapion').learnset.sneakyassault = ['9L1'];
    this.modData('Learnsets', 'weavile').learnset.sneakyassault = ['9L1'];
    this.modData('Learnsets', 'gliscor').learnset.sneakyassault = ['9L1'];
    this.modData('Learnsets', 'purrloin').learnset.sneakyassault = ['9L1'];
    this.modData('Learnsets', 'liepard').learnset.sneakyassault = ['9L1'];
    this.modData('Learnsets', 'zorua').learnset.sneakyassault = ['9L1'];
    this.modData('Learnsets', 'zoroark').learnset.sneakyassault = ['9L1'];
    this.modData('Learnsets', 'greninja').learnset.sneakyassault = ['9L1'];
    this.modData('Learnsets', 'kartana').learnset.sneakyassault = ['9L1'];
    this.modData('Learnsets', 'zeraora').learnset.sneakyassault = ['9L1'];
    this.modData('Learnsets', 'zarude').learnset.sneakyassault = ['9L1'];
    this.modData('Learnsets', 'zarudedada').learnset.sneakyassault = ['9L1'];
    this.modData('Learnsets', 'lokix').learnset.sneakyassault = ['9L1'];
    this.modData('Learnsets', 'maushold').learnset.sneakyassault = ['9L1'];
    this.modData('Learnsets', 'slendawful').learnset.sneakyassault = ['9L1'];

    // mercuryshot 
    this.modData('Learnsets', 'squirtle').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'wartortle').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'blastoise').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'piplup').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'prinplup').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'empoleon').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'magnemite').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'magneton').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'magnezone').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'heatran').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'dialga').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'celesteela').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'duraludon').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'kyogre').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'phione').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'manaphy').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'alomomola').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'xurkitree').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'aron').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'lairon').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'aggron').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'clauncher').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'clawitzer').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'meltan').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'melmetal').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'corsolagalar').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'cursola').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'entei').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'clamperl').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'huntail').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'gorebyss').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'frillish').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'jellicent').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'lapras').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'chinchou').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'lanturn').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'tentacool').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'tentacruel').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'wailmer').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'wailord').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'spheal').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'sealeo').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'walrein').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'remoraid').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'octillery').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'registeel').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'koffing').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'weezing').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'weezinggalar').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'volcanion').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'mantyke').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'mantine').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'sliggoohisui').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'goodrahisui').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'genesect').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'magearna').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'magearnaoriginal').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'stonlet').learnset.mercuryshot = ['9M'];
    this.modData('Learnsets', 'rockster').learnset.mercuryshot = ['9M'];

    // sweetheart 
    this.modData('Learnsets', 'audino').learnset.sweetheart = ['9L1'];
    this.modData('Learnsets', 'blissey').learnset.sweetheart = ['9L1'];
    this.modData('Learnsets', 'alomomola').learnset.sweetheart = ['9L1'];
    this.modData('Learnsets', 'sylveon').learnset.sweetheart = ['9L1'];
    this.modData('Learnsets', 'luvdisc').learnset.sweetheart = ['9L1'];
    this.modData('Learnsets', 'wigglytuff').learnset.sweetheart = ['9L1'];
    this.modData('Learnsets', 'florges').learnset.sweetheart = ['9L1'];
    this.modData('Learnsets', 'meganium').learnset.sweetheart = ['9L1'];
    this.modData('Learnsets', 'primarina').learnset.sweetheart = ['9L1'];
    this.modData('Learnsets', 'bellossom').learnset.sweetheart = ['9L1'];
    this.modData('Learnsets', 'milotic').learnset.sweetheart = ['9L1'];

    // chakraterrain 
    this.modData('Learnsets', 'hitmonchan').learnset.chakraterrain = ['9L1'];
    this.modData('Learnsets', 'hitmonlee').learnset.chakraterrain = ['9L1'];
    this.modData('Learnsets', 'mew').learnset.chakraterrain = ['9L1'];
    this.modData('Learnsets', 'tyrogue').learnset.chakraterrain = ['9L1'];
    this.modData('Learnsets', 'hitmontop').learnset.chakraterrain = ['9L1'];
    this.modData('Learnsets', 'ralts').learnset.chakraterrain = ['9L1'];
    this.modData('Learnsets', 'kirlia').learnset.chakraterrain = ['9L1'];
    this.modData('Learnsets', 'gardevoir').learnset.chakraterrain = ['9L1'];
    this.modData('Learnsets', 'gallade').learnset.chakraterrain = ['9L1'];
    this.modData('Learnsets', 'meditite').learnset.chakraterrain = ['9L1'];
    this.modData('Learnsets', 'medicham').learnset.chakraterrain = ['9L1'];
    this.modData('Learnsets', 'infernape').learnset.chakraterrain = ['9L1'];
    this.modData('Learnsets', 'riolu').learnset.chakraterrain = ['9L1'];
    this.modData('Learnsets', 'lucario').learnset.chakraterrain = ['9L1'];
    this.modData('Learnsets', 'throh').learnset.chakraterrain = ['9L1'];
    this.modData('Learnsets', 'sawk').learnset.chakraterrain = ['9L1'];
    this.modData('Learnsets', 'mienfoo').learnset.chakraterrain = ['9L1'];
    this.modData('Learnsets', 'mienshao').learnset.chakraterrain = ['9L1'];
    this.modData('Learnsets', 'cobalion').learnset.chakraterrain = ['9L1'];
    this.modData('Learnsets', 'terrakion').learnset.chakraterrain = ['9L1'];
    this.modData('Learnsets', 'virizion').learnset.chakraterrain = ['9L1'];
    this.modData('Learnsets', 'keldeo').learnset.chakraterrain = ['9L1'];
    this.modData('Learnsets', 'kubfu').learnset.chakraterrain = ['9L1'];
    this.modData('Learnsets', 'urshifurapidstrike').learnset.chakraterrain = ['9L1'];
    this.modData('Learnsets', 'urshifu').learnset.chakraterrain = ['9L1'];
    this.modData('Learnsets', 'mystao').learnset.chakraterrain = ['9L1'];

    // New movepool changes :

    // Gen 1: 
    this.modData('Learnsets', 'venusaur').learnset.shadowclaw = ['9L1'];
    this.modData('Learnsets', 'venusaur').learnset.shadowsneak = ['9L1'];
    this.modData('Learnsets', 'venusaur').learnset.punishingblow = ['9L1'];
    delete this.modData('Learnsets', 'squirtle').learnset.shellsmash;
    delete this.modData('Learnsets', 'wartortle').learnset.shellsmash;
    delete this.modData('Learnsets', 'blastoise').learnset.shellsmash;
    this.modData('Learnsets', 'squirtle').learnset.calmmind = ['9L1'];
    this.modData('Learnsets', 'wartortle').learnset.calmmind = ['9L1'];
    this.modData('Learnsets', 'blastoise').learnset.calmmind = ['9L1'];
    this.modData('Learnsets', 'blastoise').learnset.ironhead = ['9L1'];
    this.modData('Learnsets', 'blastoise').learnset.meteormash = ['9L1'];
    this.modData('Learnsets', 'pidgeot').learnset.focusblast = ['9L1'];
    this.modData('Learnsets', 'spearow').learnset.bravebird = ['9L1'];
    this.modData('Learnsets', 'arbok').learnset.meanlook = ['9L1'];
    this.modData('Learnsets', 'pikachurockstar').learnset.bulletpunch = ['9L1'];
    this.modData('Learnsets', 'pikachurockstar').learnset.rapidspin = ['9L1'];
    this.modData('Learnsets', 'pikachubelle').learnset.iceshard = ['9L1'];
    this.modData('Learnsets', 'pikachubelle').learnset.freezedry = ['9L1'];
    this.modData('Learnsets', 'pikachupopstar').learnset.charm = ['9L1'];
    this.modData('Learnsets', 'pikachupopstar').learnset.dazzlinggleam = ['9L1'];
    this.modData('Learnsets', 'pikachuphd').learnset.psychic = ['9L1'];
    this.modData('Learnsets', 'pikachuphd').learnset.psyshock = ['9L1'];
    this.modData('Learnsets', 'pikachulibre').learnset.machpunch = ['9L1'];
    this.modData('Learnsets', 'pikachulibre').learnset.seismictoss = ['9L1'];
    this.modData('Learnsets', 'raichu').learnset.highjumpkick = ['9L1'];
    this.modData('Learnsets', 'sandslash').learnset.spikyshield = ['9L1'];
    this.modData('Learnsets', 'sandslashalola').learnset.spikyshield = ['9L1'];
    this.modData('Learnsets', 'nidoqueen').learnset.moonlight = ['9L1'];
    this.modData('Learnsets', 'nidoking').learnset.moonlight = ['9L1'];
    this.modData('Learnsets', 'ninetales').learnset.focusblast = ['9L1'];
    this.modData('Learnsets', 'ninetales').learnset.partingshot = ['9L1'];
    this.modData('Learnsets', 'ninetalesalola').learnset.focusblast = ['9L1'];
    this.modData('Learnsets', 'ninetalesalola').learnset.psychic = ['9L1'];
    this.modData('Learnsets', 'wigglytuff').learnset.moonblast = ['9L1'];
    this.modData('Learnsets', 'parasect').learnset.infestation = ['9L1'];
    this.modData('Learnsets', 'venomoth').learnset.airslash = ['9L1'];
    this.modData('Learnsets', 'venomoth').learnset.shadowball = ['9L1'];
    this.modData('Learnsets', 'dugtrio').learnset.taunt = ['9L1'];
    this.modData('Learnsets', 'dugtrioalola').learnset.taunt = ['9L1'];
    this.modData('Learnsets', 'persian').learnset.crushclaw = ['9L1'];
    this.modData('Learnsets', 'persian').learnset.grassknot = ['9L1'];
    this.modData('Learnsets', 'persian').learnset.drainingkiss = ['9L1'];
    this.modData('Learnsets', 'persianalola').learnset.slackoff = ['9L1'];
    this.modData('Learnsets', 'persianalola').learnset.focusblast = ['9L1'];
    this.modData('Learnsets', 'persianalola').learnset.sludgewave = ['9L1'];
    this.modData('Learnsets', 'persianalola').learnset.drainingkiss = ['9L1'];
    this.modData('Learnsets', 'golduck').learnset.darkpulse = ['9L1'];
    this.modData('Learnsets', 'golduck').learnset.expandingforce = ['9L1'];
    this.modData('Learnsets', 'golduck').learnset.shadowball = ['9L1'];
    this.modData('Learnsets', 'golduck').learnset.thunderbolt = ['9L1'];
    this.modData('Learnsets', 'arcanine').learnset.bulkup = ['9L1'];
    this.modData('Learnsets', 'poliwrath').learnset.flipturn = ['9L1'];
    this.modData('Learnsets', 'poliwrath').learnset.lifedew = ['9L1'];
    delete this.modData('Learnsets', 'alakazam').learnset.nastyplot;
    this.modData('Learnsets', 'machamp').learnset.machpunch = ['9L1'];
    this.modData('Learnsets', 'machamp').learnset.drainpunch = ['9L1'];
    this.modData('Learnsets', 'victreebel').learnset.solarblade = ['9L1'];
    this.modData('Learnsets', 'victreebel').learnset.stompingtantrum = ['9L1'];
    this.modData('Learnsets', 'victreebel').learnset.gunkshot = ['9L1'];
    this.modData('Learnsets', 'victreebel').learnset.snaptrap = ['9L1'];
    this.modData('Learnsets', 'victreebel').learnset.junglehealing = ['9L1'];
    this.modData('Learnsets', 'golem').learnset.rapidspin = ['9L1'];
    this.modData('Learnsets', 'golem').learnset.rockwrecker = ['9L1'];
    this.modData('Learnsets', 'golemalola').learnset.rapidspin = ['9L1'];
    this.modData('Learnsets', 'golemalola').learnset.rockwrecker = ['9L1'];
    this.modData('Learnsets', 'rapidash').learnset.uturn = ['9L1'];
    this.modData('Learnsets', 'rapidashgalar').learnset.uturn = ['9L1'];
    this.modData('Learnsets', 'dodrio').learnset.megakick = ['9L1'];
    this.modData('Learnsets', 'dodrio').learnset.uturn = ['9L1'];
    this.modData('Learnsets', 'dodrio').learnset.tripleaxel = ['9L1'];
    this.modData('Learnsets', 'dodrio').learnset.triplekick = ['9L1'];
    this.modData('Learnsets', 'dewgong').learnset.calmmind = ['9L1'];
    this.modData('Learnsets', 'dewgong').learnset.freezedry = ['9L1'];
    this.modData('Learnsets', 'dewgong').learnset.flipturn = ['9L1'];
    this.modData('Learnsets', 'muk').learnset.recover = ['9L1'];
    this.modData('Learnsets', 'mukalola').learnset.recover = ['9L1'];
    this.modData('Learnsets', 'mukalola').learnset.seedbomb = ['9L1'];
    this.modData('Learnsets', 'mukalola').learnset.grassyglide = ['9L1'];
    this.modData('Learnsets', 'mukalola').learnset.toxicspikes = ['9L1'];
    this.modData('Learnsets', 'mukalola').learnset.rototiller = ['9L1'];
    this.modData('Learnsets', 'electrode').learnset.wildcharge = ['9L1'];
    this.modData('Learnsets', 'exeggutor').learnset.focusblast = ['9L1'];
    this.modData('Learnsets', 'exeggutor').learnset.aurasphere = ['9L1'];
    this.modData('Learnsets', 'marowak').learnset.rockpolish = ['9L1'];
    this.modData('Learnsets', 'hitmonlee').learnset.tropkick = ['9L1'];
    this.modData('Learnsets', 'hitmonlee').learnset.stompingtantrum = ['9L1'];
    this.modData('Learnsets', 'hitmonlee').learnset.tripleaxel = ['9L1'];
    this.modData('Learnsets', 'hitmonlee').learnset.acrobatics = ['9L1'];
    this.modData('Learnsets', 'weezinggalar').learnset.moonlight = ['9L1'];
    this.modData('Learnsets', 'seaking').learnset.dragondance = ['9L1'];
    this.modData('Learnsets', 'starmie').learnset.calmmind = ['9L1'];
    this.modData('Learnsets', 'starmie').learnset.futuresight = ['9L1'];
    this.modData('Learnsets', 'starmie').learnset.storedpower = ['9L1'];
    this.modData('Learnsets', 'pinsir').learnset.megahorn = ['9L1'];
    this.modData('Learnsets', 'vaporeon').learnset.bouncybubble = ['9L1'];
    this.modData('Learnsets', 'jolteon').learnset.buzzybuzz = ['9L1'];
    this.modData('Learnsets', 'jolteon').learnset.grassknot = ['9L1'];
    this.modData('Learnsets', 'flareon').learnset.sizzlyslide = ['9L1'];
    this.modData('Learnsets', 'flareon').learnset.stompingtantrum = ['9L1'];
    this.modData('Learnsets', 'snorlax').learnset.slackoff = ['9L1'];
    this.modData('Learnsets', 'articuno').learnset.focusblast = ['9L1'];
    this.modData('Learnsets', 'articuno').learnset.calmmind = ['9L1'];
    this.modData('Learnsets', 'articuno').learnset.aeroblast = ['9L1'];

    // Gen 2:
    this.modData('Learnsets', 'meganium').learnset.playrough = ['9L1'];
    this.modData('Learnsets', 'meganium').learnset.dazzlinggleam = ['9L1'];
    this.modData('Learnsets', 'meganium').learnset.dragondance = ['9L1'];
    this.modData('Learnsets', 'meganium').learnset.rockslide = ['9L1'];
    this.modData('Learnsets', 'typhlosion').learnset.gravity = ['9L1'];
    this.modData('Learnsets', 'typhlosion').learnset.morningsun = ['9L1'];
    this.modData('Learnsets', 'typhlosion').learnset.earthpower = ['9L1'];
    this.modData('Learnsets', 'furret').learnset.extremespeed = ['9M'];
    this.modData('Learnsets', 'furret').learnset.taunt = ['9M'];
    this.modData('Learnsets', 'noctowl').learnset.focusblast = ['9L1'];
    this.modData('Learnsets', 'noctowl').learnset.magisterialwind = ['9L1'];
    this.modData('Learnsets', 'noctowl').learnset.uturn = ['9L1'];
    this.modData('Learnsets', 'lanturn').learnset.tailglow = ['9L1'];
    this.modData('Learnsets', 'bellossom').learnset.weatherball = ['9L1'];
    this.modData('Learnsets', 'ampharos').learnset.wish = ['9L1'];
    this.modData('Learnsets', 'ampharos').learnset.moonlight = ['9L1'];
    this.modData('Learnsets', 'azumarill').learnset.bulkup = ['9L1'];
    this.modData('Learnsets', 'sudowoodo').learnset.teramorphosis = ['9L1'];
    this.modData('Learnsets', 'politoed').learnset.flipturn = ['9L1'];
    this.modData('Learnsets', 'politoed').learnset.lifedew = ['9L1'];
    this.modData('Learnsets', 'sunflora').learnset.weatherball = ['9L1'];
    this.modData('Learnsets', 'sunflora').learnset.flamethrower = ['9L1'];
    this.modData('Learnsets', 'sunflora').learnset.fireblast = ['9L1'];
    this.modData('Learnsets', 'espeon').learnset.glitzyglow = ['9L1'];
    this.modData('Learnsets', 'espeon').learnset.mysticalfire = ['9L1'];
    this.modData('Learnsets', 'umbreon').learnset.baddybad = ['9L1'];
    this.modData('Learnsets', 'umbreon').learnset.recover = ['9L1'];
    this.modData('Learnsets', 'umbreon').learnset.nightdaze = ['9L1'];
    this.modData('Learnsets', 'murkrow').learnset.partingshot = ['9L1'];
    this.modData('Learnsets', 'octillery').learnset.aurasphere = ['9L1'];
    this.modData('Learnsets', 'octillery').learnset.terrainpulse = ['9L1'];
    this.modData('Learnsets', 'mantine').learnset.flipturn = ['9L1'];
    this.modData('Learnsets', 'raikou').learnset.thunderclap = ['9L1'];
    this.modData('Learnsets', 'entei').learnset.earthquake = ['9L1'];
    this.modData('Learnsets', 'entei').learnset.burningbulwark = ['9L1'];
    this.modData('Learnsets', 'suicune').learnset.hydrosteam = ['9L1'];
    this.modData('Learnsets', 'suicune').learnset.knockoff = ['9L1'];
    this.modData('Learnsets', 'suicune').learnset.flipturn = ['9L1'];

    // Gen 3:
    this.modData('Learnsets', 'blaziken').learnset.roost = ['9L1'];
    this.modData('Learnsets', 'mightyena').learnset.pursuit = ['9L1'];
    this.modData('Learnsets', 'mightyena').learnset.bulkup = ['9L1'];
    this.modData('Learnsets', 'beautifly').learnset.smartstrike = ['9L1'];
    this.modData('Learnsets', 'beautifly').learnset.suckerpunch = ['9L1'];
    this.modData('Learnsets', 'beautifly').learnset.dualwingbeat = ['9L1'];
    this.modData('Learnsets', 'beautifly').learnset.leechlife = ['9L1'];
    this.modData('Learnsets', 'beautifly').learnset.agility = ['9L1'];
    this.modData('Learnsets', 'dustox').learnset.pollenpuff = ['9L1'];
    this.modData('Learnsets', 'dustox').learnset.ragepowder = ['9L1'];
    this.modData('Learnsets', 'ludicolo').learnset.calmmind = ['9L1'];
    this.modData('Learnsets', 'ludicolo').learnset.happydance = ['9L1'];
    this.modData('Learnsets', 'shiftry').learnset.windscall = ['9L1'];
    this.modData('Learnsets', 'gardevoir').learnset.recover = ['9L1'];
    this.modData('Learnsets', 'gardevoir').learnset.sonicboom = ['9L1'];
    this.modData('Learnsets', 'masquerain').learnset.glare = ['9L1'];
    this.modData('Learnsets', 'masquerain').learnset.meanlook = ['9L1'];
    this.modData('Learnsets', 'masquerain').learnset.partingshot = ['9L1'];
    this.modData('Learnsets', 'masquerain').learnset.taunt = ['9L1'];
    this.modData('Learnsets', 'ninjask').learnset.lightningassault = ['9L1'];
    this.modData('Learnsets', 'whismur').learnset.sonicboom = ['9L1'];
    this.modData('Learnsets', 'hariyama').learnset.machpunch = ['9L1'];
    this.modData('Learnsets', 'hariyama').learnset.courtchange = ['9L1'];
    this.modData('Learnsets', 'delcatty').learnset.slackoff = ['9L1'];
    this.modData('Learnsets', 'plusle').learnset.icywind = ['9L1'];
    this.modData('Learnsets', 'plusle').learnset.icepunch = ['9L1'];
    this.modData('Learnsets', 'plusle').learnset.doubleshock = ['9L1'];
    this.modData('Learnsets', 'plusle').learnset.energyball = ['9L1'];
    this.modData('Learnsets', 'plusle').learnset.fakeout = ['9L1'];
    this.modData('Learnsets', 'minun').learnset.reflect = ['9L1'];
    this.modData('Learnsets', 'minun').learnset.fakeout = ['9L1'];
    this.modData('Learnsets', 'minun').learnset.doubleshock = ['9L1'];
    this.modData('Learnsets', 'minun').learnset.followme = ['9L1'];
    this.modData('Learnsets', 'minun').learnset.afteryou = ['9L1'];
    this.modData('Learnsets', 'wailord').learnset.flipturn = ['9L1'];
    this.modData('Learnsets', 'wailord').learnset.slackoff = ['9L1'];
    this.modData('Learnsets', 'wailord').learnset.superpower = ['9L1'];
    this.modData('Learnsets', 'wailord').learnset.focusblast = ['9L1'];
    this.modData('Learnsets', 'grumpig').learnset.slackoff = ['9L1'];
    this.modData('Learnsets', 'cacturne').learnset.pursuit = ['9L1'];
    this.modData('Learnsets', 'cacturne').learnset.earthquake = ['9L1'];
    this.modData('Learnsets', 'cacturne').learnset.scorchingsands = ['9L1'];
    this.modData('Learnsets', 'altaria').learnset.calmmind = ['9L1'];
    this.modData('Learnsets', 'claydol').learnset.recover = ['9L1'];
    this.modData('Learnsets', 'whiscash').learnset.slackoff = ['9L1'];
    this.modData('Learnsets', 'cradily').learnset.powergem = ['9L1'];
    this.modData('Learnsets', 'cradily').learnset.strengthsap = ['9L1'];
    this.modData('Learnsets', 'armaldo').learnset.flipturn = ['9L1'];
    this.modData('Learnsets', 'armaldo').learnset.wavecrash = ['9L1'];
    this.modData('Learnsets', 'milotic').learnset.moonblast = ['9M'];
    this.modData('Learnsets', 'milotic').learnset.dazzlinggleam = ['9M'];
    this.modData('Learnsets', 'castform').learnset.calmmind = ['9L1'];
    this.modData('Learnsets', 'castform').learnset.uturn = ['9L1'];
    this.modData('Learnsets', 'castform').learnset.moonlight = ['9L1'];
    this.modData('Learnsets', 'castform').learnset.triattack = ['9L1'];
    this.modData('Learnsets', 'banette').learnset.mefirst = ['9L1'];
    this.modData('Learnsets', 'banette').learnset.copycat = ['9L1'];
    this.modData('Learnsets', 'banette').learnset.focuspunch = ['9L1'];
    this.modData('Learnsets', 'banette').learnset.encore = ['9L1'];
    this.modData('Learnsets', 'chimecho').learnset.mysticalfire = ['9L1'];
    this.modData('Learnsets', 'chimecho').learnset.teleport = ['9L1'];
    this.modData('Learnsets', 'chimecho').learnset.detectmagic = ['9L1'];
    this.modData('Learnsets', 'absol').learnset.sacredsword = ['9L1'];
    this.modData('Learnsets', 'absol').learnset.nightdaze = ['9L1'];
    this.modData('Learnsets', 'glalie').learnset.rapidspin = ['9L1'];
    this.modData('Learnsets', 'glalie').learnset.recover = ['9L1'];
    this.modData('Learnsets', 'walrein').learnset.slackoff = ['9L1'];
    this.modData('Learnsets', 'walrein').learnset.iciclecrash = ['9L1'];
    this.modData('Learnsets', 'walrein').learnset.iceshard = ['9L1'];
    this.modData('Learnsets', 'relicanth').learnset.flipturn = ['9L1'];
    this.modData('Learnsets', 'regirock').learnset.recover = ['9L1'];
    this.modData('Learnsets', 'regice').learnset.recover = ['9M'];
    this.modData('Learnsets', 'registeel').learnset.recover = ['9L1'];
    delete this.modData('Learnsets', 'deoxys').learnset.magiccoat;

    // Gen 4:
    this.modData('Learnsets', 'torterra').learnset.weatherball = ['9L1'];
    this.modData('Learnsets', 'bibarel').learnset.earthquake = ['9L1'];
    this.modData('Learnsets', 'bibarel').learnset.icefang = ['9L1'];
    this.modData('Learnsets', 'luxray').learnset.suckerpunch = ['9L1'];
    this.modData('Learnsets', 'luxray').learnset.pursuit = ['9L1'];
    this.modData('Learnsets', 'roserade').learnset.quiverdance = ['9L1'];
    this.modData('Learnsets', 'rampardos').learnset.wildcharge = ['9L1'];
    this.modData('Learnsets', 'bastiodon').learnset.bodypress = ['9L1'];
    this.modData('Learnsets', 'wormadam').learnset.aromatherapy = ['9L1'];
    this.modData('Learnsets', 'wormadam').learnset.leaftornado = ['9L1'];
    this.modData('Learnsets', 'wormadam').learnset.leafage = ['9L1'];
    this.modData('Learnsets', 'wormadam').learnset.magicalleaf = ['9L1'];
    this.modData('Learnsets', 'wormadam').learnset.leechseed = ['9L1'];
    this.modData('Learnsets', 'wormadam').learnset.aircutter = ['9L1'];
    this.modData('Learnsets', 'wormadam').learnset.airslash = ['9L1'];
    this.modData('Learnsets', 'wormadam').learnset.defog = ['9L1'];
    this.modData('Learnsets', 'wormadam').learnset.roost = ['9L1'];
    this.modData('Learnsets', 'wormadam').learnset.uturn = ['9L1'];
    this.modData('Learnsets', 'wormadamsandy').learnset.rockthrow = ['9L1'];
    this.modData('Learnsets', 'wormadamsandy').learnset.rockslide = ['9L1'];
    this.modData('Learnsets', 'wormadamsandy').learnset.powergem = ['9L1'];
    this.modData('Learnsets', 'wormadamsandy').learnset.roost = ['9L1'];
    this.modData('Learnsets', 'wormadamsandy').learnset.uturn = ['9L1'];
    this.modData('Learnsets', 'wormadamtrash').learnset.sludge = ['9L1'];
    this.modData('Learnsets', 'wormadamtrash').learnset.sludgebomb = ['9L1'];
    this.modData('Learnsets', 'wormadamtrash').learnset.sludgewave = ['9L1'];
    this.modData('Learnsets', 'wormadamtrash').learnset.roost = ['9L1'];
    this.modData('Learnsets', 'wormadamtrash').learnset.uturn = ['9L1'];
    this.modData('Learnsets', 'mothim').learnset.leechlife = ['9L1'];
    this.modData('Learnsets', 'mothim').learnset.zenheadbutt = ['9L1'];
    this.modData('Learnsets', 'mothim').learnset.extrasensory = ['9L1'];
    this.modData('Learnsets', 'mothim').learnset.throatchop = ['9L1'];
    this.modData('Learnsets', 'mothim').learnset.suckerpunch = ['9L1'];
    this.modData('Learnsets', 'floatzel').learnset.flipturn = ['9L1'];
    this.modData('Learnsets', 'floatzel').learnset.tripleaxel = ['9L1'];
    this.modData('Learnsets', 'cherrim').learnset.heatwave = ['9L1'];
    this.modData('Learnsets', 'cherrim').learnset.stompingtantrum = ['9L1'];
    this.modData('Learnsets', 'cherrim').learnset.flamecharge = ['9L1'];
    this.modData('Learnsets', 'cherrim').learnset.ember = ['9L1'];
    this.modData('Learnsets', 'cherrim').learnset.firespin = ['9L1'];
    this.modData('Learnsets', 'cherrim').learnset.blazekick = ['9L1'];
    this.modData('Learnsets', 'cherrim').learnset.flareblitz = ['9L1'];
    this.modData('Learnsets', 'drifblim').learnset.agility = ['9L1'];
    this.modData('Learnsets', 'drifblim').learnset.heatwave = ['9L1'];
    this.modData('Learnsets', 'drifblim').learnset.mysticalfire = ['9L1'];
    this.modData('Learnsets', 'drifblim').learnset.roost = ['9L1'];
    this.modData('Learnsets', 'mismagius').learnset.moonblast = ['9L1'];
    this.modData('Learnsets', 'honchkrow').learnset.dualwingbeat = ['9L1'];
    this.modData('Learnsets', 'honchkrow').learnset.throatchop = ['9L1'];
    this.modData('Learnsets', 'honchkrow').learnset.partingshot = ['9L1'];
    this.modData('Learnsets', 'skuntank').learnset.stompingtantrum = ['9L1'];
    this.modData('Learnsets', 'skuntank').learnset.swordsdance = ['9L1'];
    this.modData('Learnsets', 'bronzong').learnset.recover = ['9L1'];
    this.modData('Learnsets', 'bronzong').learnset.healbell = ['9L1'];
    this.modData('Learnsets', 'bronzong').learnset.teleport = ['9L1'];
    this.modData('Learnsets', 'spiritomb').learnset.strengthsap = ['9L1'];
    this.modData('Learnsets', 'chatot').learnset.hurricane = ['9L1'];
    this.modData('Learnsets', 'lucario').learnset.synchronoise = ['9L1'];
    this.modData('Learnsets', 'lucario').learnset.machpunch = ['9L1'];
    this.modData('Learnsets', 'croagunk').learnset.closecombat = ['9L1'];
    this.modData('Learnsets', 'croagunk').learnset.hydropump = ['9L1'];
    this.modData('Learnsets', 'croagunk').learnset.liquidation = ['9L1'];
    this.modData('Learnsets', 'croagunk').learnset.waterfall = ['9L1'];
    this.modData('Learnsets', 'croagunk').learnset.wavecrash = ['9L1'];
    this.modData('Learnsets', 'croagunk').learnset.flipturn = ['9L1'];
    this.modData('Learnsets', 'lumineon').learnset.quiverdance = ['9L1'];
    this.modData('Learnsets', 'lumineon').learnset.tailglow = ['9L1'];
    this.modData('Learnsets', 'lumineon').learnset.airslash = ['9L1'];
    this.modData('Learnsets', 'lumineon').learnset.roost = ['9L1'];
    this.modData('Learnsets', 'lickilicky').learnset.sludgebomb = ['9L1'];
    this.modData('Learnsets', 'lickilicky').learnset.poisonjab = ['9L1'];
    this.modData('Learnsets', 'lickilicky').learnset.poisontail = ['9L1'];
    this.modData('Learnsets', 'lickilicky').learnset.sludge = ['9L1'];
    this.modData('Learnsets', 'lickilicky').learnset.acidarmor = ['9L1'];
    this.modData('Learnsets', 'lickilicky').learnset.gunkshot = ['9L1'];
    this.modData('Learnsets', 'lickilicky').learnset.slackoff = ['9L1'];
    this.modData('Learnsets', 'electivire').learnset.doubleshock = ['9L1'];
    this.modData('Learnsets', 'magmortar').learnset.scald = ['9L1'];
    this.modData('Learnsets', 'magmortar').learnset.recover = ['9L1'];
    this.modData('Learnsets', 'yanmega').learnset.agility = ['9L1'];
    this.modData('Learnsets', 'leafeon').learnset.sappyseed = ['9L1'];
    this.modData('Learnsets', 'leafeon').learnset.sacredsword = ['9L1'];
    this.modData('Learnsets', 'glaceon').learnset.freezyfrost = ['9L1'];
    this.modData('Learnsets', 'porygonz').learnset.conversionz = ['9L1'];
    this.modData('Learnsets', 'gallade').learnset.sacredsword = ['9L1'];
    this.modData('Learnsets', 'probopass').learnset.bodypress = ['9L1'];
    this.modData('Learnsets', 'probopass').learnset.recover = ['9L1'];
    this.modData('Learnsets', 'dusknoir').learnset.recover = ['9L1'];
    this.modData('Learnsets', 'dusknoir').learnset.drainpunch = ['9L1'];
    this.modData('Learnsets', 'rotomheat').learnset.heatwave = ['9L1'];
    this.modData('Learnsets', 'rotomwash').learnset.whirlpool = ['9L1'];
    this.modData('Learnsets', 'rotomfrost').learnset.chillblain = ['9L1'];
    this.modData('Learnsets', 'rotomfan').learnset.hurricane = ['9L1'];
    this.modData('Learnsets', 'rotommow').learnset.leechseed = ['9L1'];
    this.modData('Learnsets', 'uxie').learnset.bodypress = ['9L1'];
    this.modData('Learnsets', 'uxie').learnset.awakening = ['9L1'];
    this.modData('Learnsets', 'mesprit').learnset.bodypress = ['9L1'];
    this.modData('Learnsets', 'mesprit').learnset.powergem = ['9L1'];
    this.modData('Learnsets', 'mesprit').learnset.rockslide = ['9L1'];
    this.modData('Learnsets', 'mesprit').learnset.scorchingsands = ['9L1'];
    this.modData('Learnsets', 'mesprit').learnset.fulldevotion = ['9L1'];
    this.modData('Learnsets', 'azelf').learnset.bodypress = ['9L1'];
    this.modData('Learnsets', 'azelf').learnset.leafblade = ['9L1'];
    this.modData('Learnsets', 'azelf').learnset.sacredsword = ['9L1'];
    this.modData('Learnsets', 'azelf').learnset.braveblade = ['9L1'];
    this.modData('Learnsets', 'palkia').learnset.teleport = ['9L1'];
    this.modData('Learnsets', 'palkia').learnset.cosmicpower = ['9L1'];
    this.modData('Learnsets', 'regigigas').learnset.headsmash = ['9L1'];
    this.modData('Learnsets', 'regigigas').learnset.wildcharge = ['9L1'];
    this.modData('Learnsets', 'regigigas').learnset.icehammer = ['9L1'];
    this.modData('Learnsets', 'regigigas').learnset.dragonhammer = ['9L1'];
    this.modData('Learnsets', 'regigigas').learnset.meteormash = ['9L1'];
    this.modData('Learnsets', 'regigigas').learnset.recover = ['9L1'];
    this.modData('Learnsets', 'shaymin').learnset.hurricane = ['9L1'];
    this.modData('Learnsets', 'giratina').learnset.teleport = ['9L1'];

    // Gen 5:
    this.modData('Learnsets', 'serperior').learnset.hurricane = ['9L1'];
    this.modData('Learnsets', 'watchog').learnset.megakick = ['9L1'];
    this.modData('Learnsets', 'watchog').learnset.glare = ['9L1'];
    this.modData('Learnsets', 'stoutland').learnset.doubleedge = ['9L1'];
    this.modData('Learnsets', 'stoutland').learnset.closecombat = ['9L1'];
    this.modData('Learnsets', 'stoutland').learnset.highhorsepower = ['9L1'];
    this.modData('Learnsets', 'simisage').learnset.powerwhip = ['9L1'];
    this.modData('Learnsets', 'simisage').learnset.swordsdance = ['9L1'];
    this.modData('Learnsets', 'simisage').learnset.stompingtantrum = ['9L1'];
    this.modData('Learnsets', 'simisage').learnset.scorchingsands = ['9L1'];
    this.modData('Learnsets', 'simisage').learnset.closecombat = ['9L1'];
    this.modData('Learnsets', 'simisage').learnset.monkeybusiness = ['9L1'];
    this.modData('Learnsets', 'simisage').learnset.slackoff = ['9L1'];
    this.modData('Learnsets', 'simisear').learnset.swordsdance = ['9L1'];
    this.modData('Learnsets', 'simisear').learnset.stompingtantrum = ['9L1'];
    this.modData('Learnsets', 'simisear').learnset.scorchingsands = ['9L1'];
    this.modData('Learnsets', 'simisear').learnset.closecombat = ['9L1'];
    this.modData('Learnsets', 'simisear').learnset.monkeybusiness = ['9L1'];
    this.modData('Learnsets', 'simisear').learnset.slackoff = ['9L1'];
    this.modData('Learnsets', 'simipour').learnset.swordsdance = ['9L1'];
    this.modData('Learnsets', 'simipour').learnset.stompingtantrum = ['9L1'];
    this.modData('Learnsets', 'simipour').learnset.scorchingsands = ['9L1'];
    this.modData('Learnsets', 'simipour').learnset.closecombat = ['9L1'];
    this.modData('Learnsets', 'simipour').learnset.monkeybusiness = ['9L1'];
    this.modData('Learnsets', 'simipour').learnset.slackoff = ['9L1'];
    this.modData('Learnsets', 'musharna').learnset.teleport = ['9L1'];
    this.modData('Learnsets', 'unfezant').learnset.knockoff = ['9L1'];
    this.modData('Learnsets', 'unfezant').learnset.nastyplot = ['9L1'];
    this.modData('Learnsets', 'unfezant').learnset.hypervoice = ['9L1'];
    this.modData('Learnsets', 'unfezant').learnset.swordsdance = ['9L1'];
    this.modData('Learnsets', 'unfezant').learnset.doubleedge = ['9L1'];
    this.modData('Learnsets', 'unfezantf').learnset.knockoff = ['9L1'];
    this.modData('Learnsets', 'unfezantf').learnset.nastyplot = ['9L1'];
    this.modData('Learnsets', 'unfezantf').learnset.hypervoice = ['9L1'];
    this.modData('Learnsets', 'unfezantf').learnset.swordsdance = ['9L1'];
    this.modData('Learnsets', 'unfezantf').learnset.doubleedge = ['9L1'];
    this.modData('Learnsets', 'zebstrika').learnset.flareblitz = ['9L1'];
    this.modData('Learnsets', 'zebstrika').learnset.jumpkick = ['9L1'];
    this.modData('Learnsets', 'zebstrika').learnset.highhorsepower = ['9L1'];
    this.modData('Learnsets', 'gigalith').learnset.scorchingsands = ['9L1'];
    this.modData('Learnsets', 'gigalith').learnset.thunderbolt = ['9L1'];
    this.modData('Learnsets', 'seismitoad').learnset.gunkshot = ['9L1'];
    this.modData('Learnsets', 'throh').learnset.bodypress = ['9L1'];
    this.modData('Learnsets', 'krookodile').learnset.partingshot = ['9L1'];
    this.modData('Learnsets', 'darmanitan').learnset.recover = ['9L1'];
    this.modData('Learnsets', 'darmanitan').learnset.psyshock = ['9L1'];
    this.modData('Learnsets', 'darmanitan').learnset.teleport = ['9L1'];
    this.modData('Learnsets', 'darmanitan').learnset.trickroom = ['9L1'];
    this.modData('Learnsets', 'darmanitan').learnset.calmmind = ['9L1'];
    this.modData('Learnsets', 'maractus').learnset.earthquake = ['9L1'];
    this.modData('Learnsets', 'maractus').learnset.earthpower = ['9L1'];
    this.modData('Learnsets', 'maractus').learnset.scorchingsands = ['9L1'];
    this.modData('Learnsets', 'maractus').learnset.sandtomb = ['9L1'];
    this.modData('Learnsets', 'maractus').learnset.sandattack = ['9L1'];
    this.modData('Learnsets', 'crustle').learnset.crabhammer = ['9L1'];
    this.modData('Learnsets', 'crustle').learnset.brickbreak = ['9L1'];
    this.modData('Learnsets', 'crustle').learnset.painsplit = ['9L1'];
    this.modData('Learnsets', 'scrafty').learnset.gunkshot = ['9L1'];
    this.modData('Learnsets', 'sigilyph').learnset.hurricane = ['9L1'];
    this.modData('Learnsets', 'sigilyph').learnset.focusblast = ['9L1'];
    this.modData('Learnsets', 'sigilyph').learnset.aurasphere = ['9L1'];
    this.modData('Learnsets', 'cofagrigus').learnset.metalburst = ['9L1'];
    this.modData('Learnsets', 'cofagrigus').learnset.gyroball = ['9L1'];
    this.modData('Learnsets', 'cofagrigus').learnset.metalclaw = ['9L1'];
    this.modData('Learnsets', 'cofagrigus').learnset.ironhead = ['9L1'];
    this.modData('Learnsets', 'cofagrigus').learnset.heavyslam = ['9L1'];
    this.modData('Learnsets', 'cofagrigus').learnset.flashcannon = ['9L1'];
    this.modData('Learnsets', 'lilligant').learnset.weatherball = ['9L1'];
    this.modData('Learnsets', 'lilligant').learnset.earthpower = ['9L1'];
    this.modData('Learnsets', 'lilligant').learnset.focusblast = ['9L1'];
    this.modData('Learnsets', 'basculin').learnset.closecombat = ['9L1'];
    this.modData('Learnsets', 'trubbish').learnset.poisonjab = ['9L1'];
    this.modData('Learnsets', 'garbodor').learnset.poisonjab = ['9L1'];
    this.modData('Learnsets', 'zoroark').learnset.gunkshot = ['9L1'];
    this.modData('Learnsets', 'zoroark').learnset.focuspunch = ['9L1'];
    this.modData('Learnsets', 'zoroark').learnset.superpower = ['9L1'];
    this.modData('Learnsets', 'gothitelle').learnset.moonlight = ['9L1'];
    this.modData('Learnsets', 'swanna').learnset.quiverdance = ['9L1'];
    this.modData('Learnsets', 'vanilluxe').learnset.hydropump = ['9L1'];
    this.modData('Learnsets', 'vanilluxe').learnset.surf = ['9L1'];
    this.modData('Learnsets', 'sawsbuck').learnset.highhorsepower = ['9L1'];
    this.modData('Learnsets', 'escavalier').learnset.firstimpression = ['9L1'];
    this.modData('Learnsets', 'escavalier').learnset.horndrill = ['9L1'];
    this.modData('Learnsets', 'galvantula').learnset.focusblast = ['9L1'];
    this.modData('Learnsets', 'ferrothorn').learnset.spikyshield = ['9L1'];
    this.modData('Learnsets', 'klinklang').learnset.rockslide = ['9L1'];
    this.modData('Learnsets', 'eelektross').learnset.scald = ['9L1'];
    this.modData('Learnsets', 'beheeyem').learnset.focusblast = ['9L1'];
    this.modData('Learnsets', 'accelgor').learnset.taunt = ['9L1'];
    this.modData('Learnsets', 'stunfiskgalar').learnset.leechlife = ['9L1'];
    this.modData('Learnsets', 'stunfiskgalar').learnset.recover = ['9L1'];
    this.modData('Learnsets', 'stunfiskgalar').learnset.secretpower = ['9L1'];
    this.modData('Learnsets', 'stunfiskgalar').learnset.ironhead = ['9L1'];
    this.modData('Learnsets', 'mienshao').learnset.courtchange = ['9L1'];
    this.modData('Learnsets', 'druddigon').learnset.roost = ['9L1'];
    this.modData('Learnsets', 'bouffalant').learnset.headsmash = ['9L1'];
    this.modData('Learnsets', 'bouffalant').learnset.milkdrink = ['9L1'];
    this.modData('Learnsets', 'heatmor').learnset.powerwhip = ['9L1'];
    this.modData('Learnsets', 'hydreigon').learnset.nightdaze = ['9L1'];
    this.modData('Learnsets', 'cobalion').learnset.bodypress = ['9L1'];
    this.modData('Learnsets', 'reshiram').learnset.calmmind = ['9L1'];

    // Gen 6:
    this.modData('Learnsets', 'delphox').learnset.recover = ['9L1'];
    this.modData('Learnsets', 'delphox').learnset.speedswap = ['9L1'];
    this.modData('Learnsets', 'delphox').learnset.teleport = ['9L1'];
    this.modData('Learnsets', 'delphox').learnset.magicpowder = ['9L1'];
    this.modData('Learnsets', 'pyroar').learnset.nastyplot = ['9L1'];
    this.modData('Learnsets', 'pyroar').learnset.scorchingsands = ['9L1'];
    this.modData('Learnsets', 'gogoat').learnset.stealthrock = ['9L1'];
    this.modData('Learnsets', 'gogoat').learnset.swordsdance = ['9L1'];
    this.modData('Learnsets', 'gogoat').learnset.stoneedge = ['9L1'];
    this.modData('Learnsets', 'furfrou').learnset.bodyslam = ['9L1'];
    this.modData('Learnsets', 'furfrou').learnset.knockoff = ['9L1'];
    this.modData('Learnsets', 'furfrou').learnset.taunt = ['9L1'];
    this.modData('Learnsets', 'meowstic').learnset.focusblast = ['9L1'];
    this.modData('Learnsets', 'meowstic').learnset.mysticalfire = ['9L1'];
    this.modData('Learnsets', 'meowsticf').learnset.focusblast = ['9L1'];
    this.modData('Learnsets', 'meowsticf').learnset.mysticalfire = ['9L1'];
    this.modData('Learnsets', 'heliolisk').learnset.earthpower = ['9L1'];
    this.modData('Learnsets', 'heliolisk').learnset.scorchingsands = ['9L1'];
    this.modData('Learnsets', 'aurorus').learnset.powergem = ['9L1'];
    this.modData('Learnsets', 'sylveon').learnset.sparklyswirl = ['9L1'];
    this.modData('Learnsets', 'sylveon').learnset.moonlight = ['9L1'];
    delete this.modData('Learnsets', 'goomy').learnset.lifedew;
    delete this.modData('Learnsets', 'sliggoohisui').learnset.lifedew;
    delete this.modData('Learnsets', 'goodrahisui').learnset.lifedew;
    this.modData('Learnsets', 'goodra').learnset.purify = ['9L1'];
    this.modData('Learnsets', 'goodrahisui').learnset.steelroller = ['9L1'];
    this.modData('Learnsets', 'trevenant').learnset.highhorsepower = ['9L1'];
    this.modData('Learnsets', 'trevenant').learnset.shadowsneak = ['9L1'];
    this.modData('Learnsets', 'gourgeist').learnset.swordsdance = ['9L1'];
    this.modData('Learnsets', 'gourgeist').learnset.strengthsap = ['9L1'];
    this.modData('Learnsets', 'avalugg').learnset.liquidation = ['9L1'];
    this.modData('Learnsets', 'avalugg').learnset.fissure = ['9L1'];
    this.modData('Learnsets', 'avalugg').learnset.waterfall = ['9L1'];
    this.modData('Learnsets', 'noivern').learnset.snarl = ['9L1'];

    // Gen 7:
    this.modData('Learnsets', 'incineroar').learnset.rapidspin = ['9L1'];
    this.modData('Learnsets', 'incineroar').learnset.suckerpunch = ['9L1'];
    this.modData('Learnsets', 'incineroar').learnset.victorydance = ['9L1'];
    this.modData('Learnsets', 'popplio').learnset.sonicboom = ['9L1'];
    this.modData('Learnsets', 'brionne').learnset.sonicboom = ['9L1'];
    this.modData('Learnsets', 'primarina').learnset.sonicboom = ['9L1'];
    this.modData('Learnsets', 'gumshoos').learnset.closecombat = ['9L1'];
    this.modData('Learnsets', 'crabominable').learnset.iceshard = ['9L1'];
    this.modData('Learnsets', 'crabominable').learnset.hammerarm = ['9L1'];
    this.modData('Learnsets', 'oricorio').learnset.healingwish = ['9L1'];
    this.modData('Learnsets', 'oricorio').learnset.destinybond = ['9L1'];
    this.modData('Learnsets', 'lycanrocmidnight').learnset.knockoff = ['9L1'];
    this.modData('Learnsets', 'lycanrocmidnight').learnset.moonlight = ['9L1'];
    this.modData('Learnsets', 'wishiwashi').learnset.blizzard = ['9L1'];
    this.modData('Learnsets', 'wishiwashi').learnset.aquajet = ['9L1'];
    this.modData('Learnsets', 'wishiwashi').learnset.thunder = ['9L1'];
    this.modData('Learnsets', 'wishiwashi').learnset.focusblast = ['9L1'];
    this.modData('Learnsets', 'stufful').learnset.playrough = ['9L1'];
    this.modData('Learnsets', 'bewear').learnset.playrough = ['9L1'];
    this.modData('Learnsets', 'comfey').learnset.moonblast = ['9L1'];
    this.modData('Learnsets', 'passimian').learnset.courtchange = ['9L1'];
    this.modData('Learnsets', 'golisopod').learnset.uturn = ['9L1'];
    this.modData('Learnsets', 'golisopod').learnset.wavecrash = ['9L1'];
    this.modData('Learnsets', 'palossand').learnset.knockoff = ['9L1'];
    this.modData('Learnsets', 'palossand').learnset.hex = ['9L1'];
    this.modData('Learnsets', 'silvally').learnset.recover = ['9L1'];
    this.modData('Learnsets', 'silvally').learnset.extremespeed = ['9L1'];
    this.modData('Learnsets', 'silvally').learnset.taunt = ['9L1'];
    this.modData('Learnsets', 'silvally').learnset.bulkup = ['9L1'];
    this.modData('Learnsets', 'silvally').learnset.calmmind = ['9L1'];
    this.modData('Learnsets', 'turtonator').learnset.stealthrock = ['9L1'];
    this.modData('Learnsets', 'turtonator').learnset.lavaplume = ['9L1'];
    this.modData('Learnsets', 'drampa').learnset.chillyreception = ['9L1'];
    this.modData('Learnsets', 'mimikyu').learnset.poltergeist = ['9L1'];
    this.modData('Learnsets', 'nihilego').learnset.nastyplot = ['9L1'];
    this.modData('Learnsets', 'buzzwole').learnset.uturn = ['9L1'];
    this.modData('Learnsets', 'buzzwole').learnset.landslide = ['9L1'];
    this.modData('Learnsets', 'solgaleo').learnset.swordsdance = ['9L1'];
    this.modData('Learnsets', 'necrozma').learnset.focusblast = ['9L1'];
    delete this.modData('Learnsets', 'magearna').learnset.drainingkiss;
    delete this.modData('Learnsets', 'magearna').learnset.storedpower;
    delete this.modData('Learnsets', 'magearnaoriginal').learnset.drainingkiss;
    delete this.modData('Learnsets', 'magearnaoriginal').learnset.storedpower;
    this.modData('Learnsets', 'stakataka').learnset.zawall = ['9M'];
    this.modData('Learnsets', 'blacephalon').learnset.poltergeist = ['9L1'];
    this.modData('Learnsets', 'blacephalon').learnset.shadowsneak = ['9L1'];
    delete this.modData('Learnsets', 'poipole').learnset.nastyplot;
    delete this.modData('Learnsets', 'naganadel').learnset.nastyplot;
    this.modData('Learnsets', 'naganadel').learnset.roost = ['9L1'];

    // Gen 8:
    this.modData('Learnsets', 'greedent').learnset.recycle = ['9L1'];
    this.modData('Learnsets', 'greedent').learnset.slackoff = ['9L1'];
    this.modData('Learnsets', 'orbeetle').learnset.toxic = ['9M'];
    this.modData('Learnsets', 'orbeetle').learnset.gravity = ['9M'];
    this.modData('Learnsets', 'eldegoss').learnset.uturn = ['9L1'];
    this.modData('Learnsets', 'eldegoss').learnset.dazzlinggleam = ['9L1'];
    this.modData('Learnsets', 'dubwool').learnset.bodyslam = ['9L1'];
    this.modData('Learnsets', 'dubwool').learnset.milkdrink = ['9L1'];
    this.modData('Learnsets', 'drednaw').learnset.aquajet = ['9L1'];
    this.modData('Learnsets', 'boltund').learnset.doubleshock = ['9L1'];
    this.modData('Learnsets', 'boltund').learnset.extremespeed = ['9L1'];
    this.modData('Learnsets', 'boltund').learnset.icefang = ['9L1'];
    this.modData('Learnsets', 'sandaconda').learnset.shoreup = ['9L1'];
    this.modData('Learnsets', 'cramorant').learnset.toxic = ['9L1'];
    this.modData('Learnsets', 'toxtricity').learnset.sonicboom = ['9L1'];
    this.modData('Learnsets', 'toxtricitylowkey').learnset.sonicboom = ['9L1'];
    this.modData('Learnsets', 'centiskorch').learnset.tailslap = ['9L1'];
    this.modData('Learnsets', 'centiskorch').learnset.firstimpression = ['9L1'];
    this.modData('Learnsets', 'centiskorch').learnset.superfang = ['9L1'];
    this.modData('Learnsets', 'grapploct').learnset.stormthrow = ['9L1'];
    this.modData('Learnsets', 'grapploct').learnset.flipturn = ['9L1'];
    this.modData('Learnsets', 'grapploct').learnset.thunderpunch = ['9L1'];
    this.modData('Learnsets', 'grapploct').learnset.machpunch = ['9L1'];
    this.modData('Learnsets', 'grapploct').learnset.armthrust = ['9L1'];
    this.modData('Learnsets', 'hatterene').learnset.moonblast = ['9L1'];
    this.modData('Learnsets', 'hatterene').learnset.moonlight = ['9L1'];
    this.modData('Learnsets', 'obstagoon').learnset.pursuit = ['9L1'];
    this.modData('Learnsets', 'perrserker').learnset.bulletpunch = ['9L1'];
    this.modData('Learnsets', 'cursola').learnset.trickroom = ['9L1'];
    this.modData('Learnsets', 'sirfetchd').learnset.roost = ['9L1'];
    this.modData('Learnsets', 'runerigus').learnset.painsplit = ['9L1'];
    this.modData('Learnsets', 'alcremie').learnset.moonblast = ['9L1'];
    this.modData('Learnsets', 'falinks').learnset.sacredsword = ['9L1'];
    this.modData('Learnsets', 'falinks').learnset.stompingtantrum = ['9L1'];
    this.modData('Learnsets', 'frosmoth').learnset.roost = ['9L1'];
    this.modData('Learnsets', 'frosmoth').learnset.freezedry = ['9L1'];
    this.modData('Learnsets', 'pincurchin').learnset.voltswitch = ['9L1'];
    this.modData('Learnsets', 'zamazenta').learnset.bulkup = ['9L1'];
    this.modData('Learnsets', 'zarude').learnset.honeclaws = ['9L1'];
    this.modData('Learnsets', 'zarudedada').learnset.honeclaws = ['9L1'];
    this.modData('Learnsets', 'regieleki').learnset.superpower = ['9L1'];
    this.modData('Learnsets', 'regieleki').learnset.flameburst = ['9L1'];
    this.modData('Learnsets', 'regieleki').learnset.smartstrike = ['9L1'];
    this.modData('Learnsets', 'regieleki').learnset.flashcannon = ['9L1'];
    this.modData('Learnsets', 'regieleki').learnset.recover = ['9L1'];
    this.modData('Learnsets', 'regidrago').learnset.superpower = ['9L1'];
    this.modData('Learnsets', 'regidrago').learnset.fireblast = ['9L1'];
    this.modData('Learnsets', 'regidrago').learnset.flamethrower = ['9L1'];
    this.modData('Learnsets', 'regidrago').learnset.icefang = ['9L1'];
    this.modData('Learnsets', 'regidrago').learnset.thunderbolt = ['9L1'];
    this.modData('Learnsets', 'regidrago').learnset.recover = ['9L1'];
    this.modData('Learnsets', 'glastrier').learnset.slackoff = ['9L1'];
    delete this.modData('Learnsets', 'spectrier').learnset.nastyplot;
    this.modData('Learnsets', 'calyrexice').learnset.slackoff = ['9L1'];

    // Gen 9
    this.modData('Learnsets', 'typhlosionhisui').learnset.moonlight = ['9L1'];
    this.modData('Learnsets', 'decidueyehisui').learnset.spikes = ['9L1'];
    this.modData('Learnsets', 'basculegion').learnset.shadowsneak = ['9L1'];
    this.modData('Learnsets', 'basculegionf').learnset.shadowsneak = ['9L1'];
    this.modData('Learnsets', 'overqwil').learnset.pursuit = ['9L1'];
    this.modData('Learnsets', 'overqwil').learnset.explosion = ['9L1'];
    this.modData('Learnsets', 'overqwil').learnset.painsplit = ['9L1'];
    this.modData('Learnsets', 'oinkologne').learnset.slackoff = ['9L1'];
    this.modData('Learnsets', 'oinkolognef').learnset.slackoff = ['9L1'];
    this.modData('Learnsets', 'lokix').learnset.highjumpkick = ['9L1'];
    this.modData('Learnsets', 'pawmot').learnset.stompingtantrum = ['9L1'];
    this.modData('Learnsets', 'pawmot').learnset.uturn = ['9L1'];
    this.modData('Learnsets', 'bellibolt').learnset.surf = ['9L1'];
    this.modData('Learnsets', 'maushold').learnset.armthrust = ['9L1'];
    this.modData('Learnsets', 'houndstone').learnset.strengthsap = ['9L1'];
    this.modData('Learnsets', 'houndstone').learnset.stealthrock = ['9L1'];
    this.modData('Learnsets', 'ceruledge').learnset.agility = ['9L1'];
    this.modData('Learnsets', 'armarouge').learnset.agility = ['9L1'];
    this.modData('Learnsets', 'tinkaton').learnset.icepunch = ['9L1'];
    this.modData('Learnsets', 'tinkaton').learnset.thunderpunch = ['9L1'];
    this.modData('Learnsets', 'tinkaton').learnset.fissure = ['9L1'];
    this.modData('Learnsets', 'bombirdier').learnset.fatbombing = ['9L1'];
    this.modData('Learnsets', 'wugtrio').learnset.flipturn = ['9L1'];
    this.modData('Learnsets', 'greattusk').learnset.submission = ['9L1'];
    this.modData('Learnsets', 'screamtail').learnset.seismictoss = ['9L1'];
    this.modData('Learnsets', 'screamtail').learnset.softboiled = ['9L1'];
    this.modData('Learnsets', 'screamtail').learnset.followme = ['9L1'];
    this.modData('Learnsets', 'screamtail').learnset.afteryou = ['9L1'];
    this.modData('Learnsets', 'brutebonnet').learnset.pursuit = ['9L1'];
    this.modData('Learnsets', 'slitherwing').learnset.quiverdance = ['9L1'];
    this.modData('Learnsets', 'slitherwing').learnset.focusblast = ['9L1'];
    this.modData('Learnsets', 'slitherwing').learnset.vacuumwave = ['9L1'];
    this.modData('Learnsets', 'slitherwing').learnset.flamethrower = ['9L1'];
    this.modData('Learnsets', 'slitherwing').learnset.airslash = ['9L1'];
    this.modData('Learnsets', 'slitherwing').learnset.hurricane = ['9L1'];
    this.modData('Learnsets', 'ironbundle').learnset.defog = ['9L1'];
    this.modData('Learnsets', 'ironbundle').learnset.spikes = ['9L1'];
    this.modData('Learnsets', 'ironbundle').learnset.surf = ['9L1'];
    this.modData('Learnsets', 'ironjugulis').learnset.nastyplot = ['9L1'];
    this.modData('Learnsets', 'ironjugulis').learnset.downdraft = ['9L1'];
    this.modData('Learnsets', 'ironjugulis').learnset.roost = ['9L1'];
    this.modData('Learnsets', 'ironthorns').learnset.shiftgear = ['9L1'];
    this.modData('Learnsets', 'wochien').learnset.synthesis = ['9L1'];
    this.modData('Learnsets', 'okidogi').learnset.swordsdance = ['9L1'];
    this.modData('Learnsets', 'fezandipiti').learnset.defog = ['9L1'];
    this.modData('Learnsets', 'fezandipiti').learnset.knockoff = ['9L1'];
    delete this.modData('Learnsets', 'ironcrown').learnset.storedpower;
    delete this.modData('Learnsets', 'ironbundle').learnset.freezedry;
    delete this.modData('Learnsets', 'flittle').learnset.storedpower;
    delete this.modData('Learnsets', 'espathra').learnset.storedpower;

    // return 
    this.modData('Learnsets', 'meltan').learnset.return = ['9M'];
    this.modData('Learnsets', 'melmetal').learnset.return = ['9M'];
    this.modData('Learnsets', 'grookey').learnset.return = ['9M'];
    this.modData('Learnsets', 'thwackey').learnset.return = ['9M'];
    this.modData('Learnsets', 'rillaboom').learnset.return = ['9M'];
    this.modData('Learnsets', 'scorbunny').learnset.return = ['9M'];
    this.modData('Learnsets', 'raboot').learnset.return = ['9M'];
    this.modData('Learnsets', 'cinderace').learnset.return = ['9M'];
    this.modData('Learnsets', 'sobble').learnset.return = ['9M'];
    this.modData('Learnsets', 'drizzile').learnset.return = ['9M'];
    this.modData('Learnsets', 'inteleon').learnset.return = ['9M'];
    this.modData('Learnsets', 'skwovet').learnset.return = ['9M'];
    this.modData('Learnsets', 'greedent').learnset.return = ['9M'];
    this.modData('Learnsets', 'rookidee').learnset.return = ['9M'];
    this.modData('Learnsets', 'corvisquire').learnset.return = ['9M'];
    this.modData('Learnsets', 'corviknight').learnset.return = ['9M'];
    this.modData('Learnsets', 'blipbug').learnset.return = ['9M'];
    this.modData('Learnsets', 'dottler').learnset.return = ['9M'];
    this.modData('Learnsets', 'orbeetle').learnset.return = ['9M'];
    this.modData('Learnsets', 'nickit').learnset.return = ['9M'];
    this.modData('Learnsets', 'thievul').learnset.return = ['9M'];
    this.modData('Learnsets', 'gossifleur').learnset.return = ['9M'];
    this.modData('Learnsets', 'eldegoss').learnset.return = ['9M'];
    this.modData('Learnsets', 'wooloo').learnset.return = ['9M'];
    this.modData('Learnsets', 'dubwool').learnset.return = ['9M'];
    this.modData('Learnsets', 'chewtle').learnset.return = ['9M'];
    this.modData('Learnsets', 'drednaw').learnset.return = ['9M'];
    this.modData('Learnsets', 'yamper').learnset.return = ['9M'];
    this.modData('Learnsets', 'boltund').learnset.return = ['9M'];
    this.modData('Learnsets', 'rolycoly').learnset.return = ['9M'];
    this.modData('Learnsets', 'carkol').learnset.return = ['9M'];
    this.modData('Learnsets', 'coalossal').learnset.return = ['9M'];
    this.modData('Learnsets', 'applin').learnset.return = ['9M'];
    this.modData('Learnsets', 'flapple').learnset.return = ['9M'];
    this.modData('Learnsets', 'appletun').learnset.return = ['9M'];
    this.modData('Learnsets', 'silicobra').learnset.return = ['9M'];
    this.modData('Learnsets', 'sandaconda').learnset.return = ['9M'];
    this.modData('Learnsets', 'cramorant').learnset.return = ['9M'];
    this.modData('Learnsets', 'arrokuda').learnset.return = ['9M'];
    this.modData('Learnsets', 'barraskewda').learnset.return = ['9M'];
    this.modData('Learnsets', 'toxel').learnset.return = ['9M'];
    this.modData('Learnsets', 'sizzlipede').learnset.return = ['9M'];
    this.modData('Learnsets', 'centiskorch').learnset.return = ['9M'];
    this.modData('Learnsets', 'clobbopus').learnset.return = ['9M'];
    this.modData('Learnsets', 'grapploct').learnset.return = ['9M'];
    this.modData('Learnsets', 'sinistea').learnset.return = ['9M'];
    this.modData('Learnsets', 'polteageist').learnset.return = ['9M'];
    this.modData('Learnsets', 'hatenna').learnset.return = ['9M'];
    this.modData('Learnsets', 'hattrem').learnset.return = ['9M'];
    this.modData('Learnsets', 'hatterene').learnset.return = ['9M'];
    this.modData('Learnsets', 'impidimp').learnset.return = ['9M'];
    this.modData('Learnsets', 'morgrem').learnset.return = ['9M'];
    this.modData('Learnsets', 'grimmsnarl').learnset.return = ['9M'];
    this.modData('Learnsets', 'obstagoon').learnset.return = ['9M'];
    this.modData('Learnsets', 'perrserker').learnset.return = ['9M'];
    this.modData('Learnsets', 'cursola').learnset.return = ['9M'];
    this.modData('Learnsets', 'sirfetchd').learnset.return = ['9M'];
    this.modData('Learnsets', 'mrrime').learnset.return = ['9M'];
    this.modData('Learnsets', 'runerigus').learnset.return = ['9M'];
    this.modData('Learnsets', 'milcery').learnset.return = ['9M'];
    this.modData('Learnsets', 'alcremie').learnset.return = ['9M'];
    this.modData('Learnsets', 'falinks').learnset.return = ['9M'];
    this.modData('Learnsets', 'pincurchin').learnset.return = ['9M'];
    this.modData('Learnsets', 'snom').learnset.return = ['9M'];
    this.modData('Learnsets', 'frosmoth').learnset.return = ['9M'];
    this.modData('Learnsets', 'stonjourner').learnset.return = ['9M'];
    this.modData('Learnsets', 'eiscue').learnset.return = ['9M'];
    this.modData('Learnsets', 'indeedee').learnset.return = ['9M'];
    this.modData('Learnsets', 'indeedeef').learnset.return = ['9M'];
    this.modData('Learnsets', 'morpeko').learnset.return = ['9M'];
    this.modData('Learnsets', 'cufant').learnset.return = ['9M'];
    this.modData('Learnsets', 'copperajah').learnset.return = ['9M'];
    this.modData('Learnsets', 'dracozolt').learnset.return = ['9M'];
    this.modData('Learnsets', 'arctozolt').learnset.return = ['9M'];
    this.modData('Learnsets', 'dracovish').learnset.return = ['9M'];
    this.modData('Learnsets', 'arctovish').learnset.return = ['9M'];
    this.modData('Learnsets', 'duraludon').learnset.return = ['9M'];
    this.modData('Learnsets', 'dreepy').learnset.return = ['9M'];
    this.modData('Learnsets', 'drakloak').learnset.return = ['9M'];
    this.modData('Learnsets', 'dragapult').learnset.return = ['9M'];
    this.modData('Learnsets', 'zacian').learnset.return = ['9M'];
    this.modData('Learnsets', 'zaciancrowned').learnset.return = ['9M'];
    this.modData('Learnsets', 'zamazenta').learnset.return = ['9M'];
    this.modData('Learnsets', 'zamazentacrowned').learnset.return = ['9M'];
    this.modData('Learnsets', 'eternatus').learnset.return = ['9M'];
    this.modData('Learnsets', 'zarude').learnset.return = ['9M'];
    this.modData('Learnsets', 'zarudedada').learnset.return = ['9M'];
    this.modData('Learnsets', 'kubfu').learnset.return = ['9M'];
    this.modData('Learnsets', 'urshifu').learnset.return = ['9M'];
    this.modData('Learnsets', 'urshifurapidstrike').learnset.return = ['9M'];
    this.modData('Learnsets', 'regieleki').learnset.return = ['9M'];
    this.modData('Learnsets', 'regidrago').learnset.return = ['9M'];
    this.modData('Learnsets', 'glastrier').learnset.return = ['9M'];
    this.modData('Learnsets', 'spectrier').learnset.return = ['9M'];
    this.modData('Learnsets', 'calyrex').learnset.return = ['9M'];
    this.modData('Learnsets', 'wyrdeer').learnset.return = ['9M'];
    this.modData('Learnsets', 'kleavor').learnset.return = ['9M'];
    this.modData('Learnsets', 'ursaluna').learnset.return = ['9M'];
    this.modData('Learnsets', 'basculegion').learnset.return = ['9M'];
    this.modData('Learnsets', 'sneasler').learnset.return = ['9M'];
    this.modData('Learnsets', 'overqwil').learnset.return = ['9M'];

    // frustration 
    this.modData('Learnsets', 'meltan').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'melmetal').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'grookey').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'thwackey').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'rillaboom').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'scorbunny').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'raboot').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'cinderace').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'sobble').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'drizzile').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'inteleon').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'skwovet').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'greedent').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'rookidee').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'corvisquire').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'corviknight').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'blipbug').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'dottler').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'orbeetle').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'nickit').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'thievul').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'gossifleur').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'eldegoss').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'wooloo').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'dubwool').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'chewtle').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'drednaw').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'yamper').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'boltund').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'rolycoly').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'carkol').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'coalossal').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'applin').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'flapple').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'appletun').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'silicobra').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'sandaconda').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'cramorant').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'arrokuda').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'barraskewda').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'toxel').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'sizzlipede').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'centiskorch').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'clobbopus').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'grapploct').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'sinistea').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'polteageist').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'hatenna').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'hattrem').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'hatterene').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'impidimp').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'morgrem').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'grimmsnarl').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'obstagoon').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'perrserker').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'cursola').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'sirfetchd').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'mrrime').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'runerigus').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'milcery').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'alcremie').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'falinks').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'pincurchin').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'snom').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'frosmoth').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'stonjourner').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'eiscue').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'indeedee').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'indeedeef').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'morpeko').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'cufant').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'copperajah').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'dracozolt').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'arctozolt').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'dracovish').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'arctovish').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'duraludon').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'dreepy').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'drakloak').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'dragapult').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'zacian').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'zaciancrowned').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'zamazenta').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'zamazentacrowned').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'eternatus').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'zarude').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'zarudedada').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'kubfu').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'urshifu').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'urshifurapidstrike').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'regieleki').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'regidrago').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'glastrier').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'spectrier').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'calyrex').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'wyrdeer').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'kleavor').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'ursaluna').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'basculegion').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'sneasler').learnset.frustration = ['9M'];
    this.modData('Learnsets', 'overqwil').learnset.frustration = ['9M'];




    // long Hidden Power deletion
    delete this.modData('Learnsets', 'bulbasaur').learnset.hiddenpower;
    delete this.modData('Learnsets', 'ivysaur').learnset.hiddenpower;
    delete this.modData('Learnsets', 'venusaur').learnset.hiddenpower;
    delete this.modData('Learnsets', 'charmander').learnset.hiddenpower;
    delete this.modData('Learnsets', 'charmeleon').learnset.hiddenpower;
    delete this.modData('Learnsets', 'charizard').learnset.hiddenpower;
    delete this.modData('Learnsets', 'squirtle').learnset.hiddenpower;
    delete this.modData('Learnsets', 'wartortle').learnset.hiddenpower;
    delete this.modData('Learnsets', 'blastoise').learnset.hiddenpower;
    delete this.modData('Learnsets', 'caterpie').learnset.hiddenpower;
    delete this.modData('Learnsets', 'metapod').learnset.hiddenpower;
    delete this.modData('Learnsets', 'butterfree').learnset.hiddenpower;
    delete this.modData('Learnsets', 'weedle').learnset.hiddenpower;
    delete this.modData('Learnsets', 'kakuna').learnset.hiddenpower;
    delete this.modData('Learnsets', 'beedrill').learnset.hiddenpower;
    delete this.modData('Learnsets', 'pidgey').learnset.hiddenpower;
    delete this.modData('Learnsets', 'pidgeotto').learnset.hiddenpower;
    delete this.modData('Learnsets', 'pidgeot').learnset.hiddenpower;
    delete this.modData('Learnsets', 'rattata').learnset.hiddenpower;
    delete this.modData('Learnsets', 'raticate').learnset.hiddenpower;
    delete this.modData('Learnsets', 'rattataalola').learnset.hiddenpower;
    delete this.modData('Learnsets', 'raticatealola').learnset.hiddenpower;
    delete this.modData('Learnsets', 'spearow').learnset.hiddenpower;
    delete this.modData('Learnsets', 'fearow').learnset.hiddenpower;
    delete this.modData('Learnsets', 'ekans').learnset.hiddenpower;
    delete this.modData('Learnsets', 'arbok').learnset.hiddenpower;
    delete this.modData('Learnsets', 'pikachu').learnset.hiddenpower;
    delete this.modData('Learnsets', 'pikachualola').learnset.hiddenpower;
    delete this.modData('Learnsets', 'pikachuhoenn').learnset.hiddenpower;
    delete this.modData('Learnsets', 'pikachukalos').learnset.hiddenpower;
    delete this.modData('Learnsets', 'pikachuoriginal').learnset.hiddenpower;
    delete this.modData('Learnsets', 'pikachupartner').learnset.hiddenpower;
    delete this.modData('Learnsets', 'pikachusinnoh').learnset.hiddenpower;
    delete this.modData('Learnsets', 'pikachuunova').learnset.hiddenpower;
    delete this.modData('Learnsets', 'pikachuworld').learnset.hiddenpower;
    delete this.modData('Learnsets', 'pikachucosplay').learnset.hiddenpower;
    delete this.modData('Learnsets', 'pikachurockstar').learnset.hiddenpower;
    delete this.modData('Learnsets', 'pikachubelle').learnset.hiddenpower;
    delete this.modData('Learnsets', 'pikachupopstar').learnset.hiddenpower;
    delete this.modData('Learnsets', 'pikachuphd').learnset.hiddenpower;
    delete this.modData('Learnsets', 'pikachulibre').learnset.hiddenpower;
    delete this.modData('Learnsets', 'raichu').learnset.hiddenpower;
    delete this.modData('Learnsets', 'raichualola').learnset.hiddenpower;
    delete this.modData('Learnsets', 'sandshrew').learnset.hiddenpower;
    delete this.modData('Learnsets', 'sandshrewalola').learnset.hiddenpower;
    delete this.modData('Learnsets', 'sandslash').learnset.hiddenpower;
    delete this.modData('Learnsets', 'sandslashalola').learnset.hiddenpower;
    delete this.modData('Learnsets', 'nidoranf').learnset.hiddenpower;
    delete this.modData('Learnsets', 'nidorina').learnset.hiddenpower;
    delete this.modData('Learnsets', 'nidoqueen').learnset.hiddenpower;
    delete this.modData('Learnsets', 'nidoranm').learnset.hiddenpower;
    delete this.modData('Learnsets', 'nidorino').learnset.hiddenpower;
    delete this.modData('Learnsets', 'nidoking').learnset.hiddenpower;
    delete this.modData('Learnsets', 'clefairy').learnset.hiddenpower;
    delete this.modData('Learnsets', 'clefable').learnset.hiddenpower;
    delete this.modData('Learnsets', 'vulpix').learnset.hiddenpower;
    delete this.modData('Learnsets', 'vulpixalola').learnset.hiddenpower;
    delete this.modData('Learnsets', 'ninetales').learnset.hiddenpower;
    delete this.modData('Learnsets', 'ninetalesalola').learnset.hiddenpower;
    delete this.modData('Learnsets', 'jigglypuff').learnset.hiddenpower;
    delete this.modData('Learnsets', 'wigglytuff').learnset.hiddenpower;
    delete this.modData('Learnsets', 'zubat').learnset.hiddenpower;
    delete this.modData('Learnsets', 'golbat').learnset.hiddenpower;
    delete this.modData('Learnsets', 'oddish').learnset.hiddenpower;
    delete this.modData('Learnsets', 'gloom').learnset.hiddenpower;
    delete this.modData('Learnsets', 'vileplume').learnset.hiddenpower;
    delete this.modData('Learnsets', 'paras').learnset.hiddenpower;
    delete this.modData('Learnsets', 'parasect').learnset.hiddenpower;
    delete this.modData('Learnsets', 'venonat').learnset.hiddenpower;
    delete this.modData('Learnsets', 'venomoth').learnset.hiddenpower;
    delete this.modData('Learnsets', 'diglettalola').learnset.hiddenpower;
    delete this.modData('Learnsets', 'diglett').learnset.hiddenpower;
    delete this.modData('Learnsets', 'dugtrio').learnset.hiddenpower;
    delete this.modData('Learnsets', 'dugtrioalola').learnset.hiddenpower;
    delete this.modData('Learnsets', 'meowth').learnset.hiddenpower;
    delete this.modData('Learnsets', 'meowthalola').learnset.hiddenpower;
    delete this.modData('Learnsets', 'persian').learnset.hiddenpower;
    delete this.modData('Learnsets', 'persianalola').learnset.hiddenpower;
    delete this.modData('Learnsets', 'psyduck').learnset.hiddenpower;
    delete this.modData('Learnsets', 'golduck').learnset.hiddenpower;
    delete this.modData('Learnsets', 'mankey').learnset.hiddenpower;
    delete this.modData('Learnsets', 'primeape').learnset.hiddenpower;
    delete this.modData('Learnsets', 'growlithe').learnset.hiddenpower;
    delete this.modData('Learnsets', 'arcanine').learnset.hiddenpower;
    delete this.modData('Learnsets', 'poliwag').learnset.hiddenpower;
    delete this.modData('Learnsets', 'poliwhirl').learnset.hiddenpower;
    delete this.modData('Learnsets', 'poliwrath').learnset.hiddenpower;
    delete this.modData('Learnsets', 'abra').learnset.hiddenpower;
    delete this.modData('Learnsets', 'kadabra').learnset.hiddenpower;
    delete this.modData('Learnsets', 'alakazam').learnset.hiddenpower;
    delete this.modData('Learnsets', 'machop').learnset.hiddenpower;
    delete this.modData('Learnsets', 'machoke').learnset.hiddenpower;
    delete this.modData('Learnsets', 'machamp').learnset.hiddenpower;
    delete this.modData('Learnsets', 'bellsprout').learnset.hiddenpower;
    delete this.modData('Learnsets', 'weepinbell').learnset.hiddenpower;
    delete this.modData('Learnsets', 'victreebel').learnset.hiddenpower;
    delete this.modData('Learnsets', 'tentacool').learnset.hiddenpower;
    delete this.modData('Learnsets', 'tentacruel').learnset.hiddenpower;
    delete this.modData('Learnsets', 'geodude').learnset.hiddenpower;
    delete this.modData('Learnsets', 'geodudealola').learnset.hiddenpower;
    delete this.modData('Learnsets', 'graveler').learnset.hiddenpower;
    delete this.modData('Learnsets', 'graveleralola').learnset.hiddenpower;
    delete this.modData('Learnsets', 'golem').learnset.hiddenpower;
    delete this.modData('Learnsets', 'golemalola').learnset.hiddenpower;
    delete this.modData('Learnsets', 'ponyta').learnset.hiddenpower;
    delete this.modData('Learnsets', 'rapidash').learnset.hiddenpower;
    delete this.modData('Learnsets', 'slowpoke').learnset.hiddenpower;
    delete this.modData('Learnsets', 'slowbro').learnset.hiddenpower;
    delete this.modData('Learnsets', 'magnemite').learnset.hiddenpower;
    delete this.modData('Learnsets', 'magneton').learnset.hiddenpower;
    delete this.modData('Learnsets', 'farfetchd').learnset.hiddenpower;
    delete this.modData('Learnsets', 'doduo').learnset.hiddenpower;
    delete this.modData('Learnsets', 'dodrio').learnset.hiddenpower;
    delete this.modData('Learnsets', 'seel').learnset.hiddenpower;
    delete this.modData('Learnsets', 'dewgong').learnset.hiddenpower;
    delete this.modData('Learnsets', 'grimer').learnset.hiddenpower;
    delete this.modData('Learnsets', 'grimeralola').learnset.hiddenpower;
    delete this.modData('Learnsets', 'muk').learnset.hiddenpower;
    delete this.modData('Learnsets', 'mukalola').learnset.hiddenpower;
    delete this.modData('Learnsets', 'shellder').learnset.hiddenpower;
    delete this.modData('Learnsets', 'cloyster').learnset.hiddenpower;
    delete this.modData('Learnsets', 'gastly').learnset.hiddenpower;
    delete this.modData('Learnsets', 'haunter').learnset.hiddenpower;
    delete this.modData('Learnsets', 'gengar').learnset.hiddenpower;
    delete this.modData('Learnsets', 'onix').learnset.hiddenpower;
    delete this.modData('Learnsets', 'drowzee').learnset.hiddenpower;
    delete this.modData('Learnsets', 'hypno').learnset.hiddenpower;
    delete this.modData('Learnsets', 'krabby').learnset.hiddenpower;
    delete this.modData('Learnsets', 'kingler').learnset.hiddenpower;
    delete this.modData('Learnsets', 'voltorb').learnset.hiddenpower;
    delete this.modData('Learnsets', 'electrode').learnset.hiddenpower;
    delete this.modData('Learnsets', 'exeggcute').learnset.hiddenpower;
    delete this.modData('Learnsets', 'exeggutor').learnset.hiddenpower;
    delete this.modData('Learnsets', 'exeggutoralola').learnset.hiddenpower;
    delete this.modData('Learnsets', 'cubone').learnset.hiddenpower;
    delete this.modData('Learnsets', 'marowak').learnset.hiddenpower;
    delete this.modData('Learnsets', 'marowakalola').learnset.hiddenpower;
    delete this.modData('Learnsets', 'hitmonlee').learnset.hiddenpower;
    delete this.modData('Learnsets', 'hitmonchan').learnset.hiddenpower;
    delete this.modData('Learnsets', 'lickitung').learnset.hiddenpower;
    delete this.modData('Learnsets', 'koffing').learnset.hiddenpower;
    delete this.modData('Learnsets', 'weezing').learnset.hiddenpower;
    delete this.modData('Learnsets', 'weezinggalar').learnset.hiddenpower;
    delete this.modData('Learnsets', 'rhyhorn').learnset.hiddenpower;
    delete this.modData('Learnsets', 'rhydon').learnset.hiddenpower;
    delete this.modData('Learnsets', 'chansey').learnset.hiddenpower;
    delete this.modData('Learnsets', 'tangela').learnset.hiddenpower;
    delete this.modData('Learnsets', 'horsea').learnset.hiddenpower;
    delete this.modData('Learnsets', 'seadra').learnset.hiddenpower;
    delete this.modData('Learnsets', 'goldeen').learnset.hiddenpower;
    delete this.modData('Learnsets', 'seaking').learnset.hiddenpower;
    delete this.modData('Learnsets', 'staryu').learnset.hiddenpower;
    delete this.modData('Learnsets', 'starmie').learnset.hiddenpower;
    delete this.modData('Learnsets', 'mrmime').learnset.hiddenpower;
    delete this.modData('Learnsets', 'scyther').learnset.hiddenpower;
    delete this.modData('Learnsets', 'jynx').learnset.hiddenpower;
    delete this.modData('Learnsets', 'electabuzz').learnset.hiddenpower;
    delete this.modData('Learnsets', 'magmar').learnset.hiddenpower;
    delete this.modData('Learnsets', 'pinsir').learnset.hiddenpower;
    delete this.modData('Learnsets', 'gyarados').learnset.hiddenpower;
    delete this.modData('Learnsets', 'lapras').learnset.hiddenpower;
    delete this.modData('Learnsets', 'kabuto').learnset.hiddenpower;
    delete this.modData('Learnsets', 'kabutops').learnset.hiddenpower;
    delete this.modData('Learnsets', 'aerodactyl').learnset.hiddenpower;
    delete this.modData('Learnsets', 'snorlax').learnset.hiddenpower;
    delete this.modData('Learnsets', 'articuno').learnset.hiddenpower;
    delete this.modData('Learnsets', 'zapdos').learnset.hiddenpower;
    delete this.modData('Learnsets', 'moltres').learnset.hiddenpower;
    delete this.modData('Learnsets', 'dratini').learnset.hiddenpower;
    delete this.modData('Learnsets', 'dragonair').learnset.hiddenpower;
    delete this.modData('Learnsets', 'dragonite').learnset.hiddenpower;
    delete this.modData('Learnsets', 'mewtwo').learnset.hiddenpower;
    delete this.modData('Learnsets', 'chikorita').learnset.hiddenpower;
    delete this.modData('Learnsets', 'bayleef').learnset.hiddenpower;
    delete this.modData('Learnsets', 'meganium').learnset.hiddenpower;
    delete this.modData('Learnsets', 'cyndaquil').learnset.hiddenpower;
    delete this.modData('Learnsets', 'quilava').learnset.hiddenpower;
    delete this.modData('Learnsets', 'typhlosion').learnset.hiddenpower;
    delete this.modData('Learnsets', 'totodile').learnset.hiddenpower;
    delete this.modData('Learnsets', 'croconaw').learnset.hiddenpower;
    delete this.modData('Learnsets', 'feraligatr').learnset.hiddenpower;
    delete this.modData('Learnsets', 'sentret').learnset.hiddenpower;
    delete this.modData('Learnsets', 'furret').learnset.hiddenpower;
    delete this.modData('Learnsets', 'hoothoot').learnset.hiddenpower;
    delete this.modData('Learnsets', 'noctowl').learnset.hiddenpower;
    delete this.modData('Learnsets', 'ledyba').learnset.hiddenpower;
    delete this.modData('Learnsets', 'ledian').learnset.hiddenpower;
    delete this.modData('Learnsets', 'spinarak').learnset.hiddenpower;
    delete this.modData('Learnsets', 'ariados').learnset.hiddenpower;
    delete this.modData('Learnsets', 'crobat').learnset.hiddenpower;
    delete this.modData('Learnsets', 'chinchou').learnset.hiddenpower;
    delete this.modData('Learnsets', 'lanturn').learnset.hiddenpower;
    delete this.modData('Learnsets', 'pichu').learnset.hiddenpower;
    delete this.modData('Learnsets', 'cleffa').learnset.hiddenpower;
    delete this.modData('Learnsets', 'igglybuff').learnset.hiddenpower;
    delete this.modData('Learnsets', 'togepi').learnset.hiddenpower;
    delete this.modData('Learnsets', 'togetic').learnset.hiddenpower;
    delete this.modData('Learnsets', 'natu').learnset.hiddenpower;
    delete this.modData('Learnsets', 'xatu').learnset.hiddenpower;
    delete this.modData('Learnsets', 'mareep').learnset.hiddenpower;
    delete this.modData('Learnsets', 'flaaffy').learnset.hiddenpower;
    delete this.modData('Learnsets', 'ampharos').learnset.hiddenpower;
    delete this.modData('Learnsets', 'bellossom').learnset.hiddenpower;
    delete this.modData('Learnsets', 'marill').learnset.hiddenpower;
    delete this.modData('Learnsets', 'azumarill').learnset.hiddenpower;
    delete this.modData('Learnsets', 'sudowoodo').learnset.hiddenpower;
    delete this.modData('Learnsets', 'politoed').learnset.hiddenpower;
    delete this.modData('Learnsets', 'hoppip').learnset.hiddenpower;
    delete this.modData('Learnsets', 'skiploom').learnset.hiddenpower;
    delete this.modData('Learnsets', 'jumpluff').learnset.hiddenpower;
    delete this.modData('Learnsets', 'aipom').learnset.hiddenpower;
    delete this.modData('Learnsets', 'sunkern').learnset.hiddenpower;
    delete this.modData('Learnsets', 'sunflora').learnset.hiddenpower;
    delete this.modData('Learnsets', 'yanma').learnset.hiddenpower;
    delete this.modData('Learnsets', 'wooper').learnset.hiddenpower;
    delete this.modData('Learnsets', 'quagsire').learnset.hiddenpower;
    delete this.modData('Learnsets', 'murkrow').learnset.hiddenpower;
    delete this.modData('Learnsets', 'slowking').learnset.hiddenpower;
    delete this.modData('Learnsets', 'misdreavus').learnset.hiddenpower;
    delete this.modData('Learnsets', 'wobbuffet').learnset.hiddenpower;
    delete this.modData('Learnsets', 'girafarig').learnset.hiddenpower;
    delete this.modData('Learnsets', 'pineco').learnset.hiddenpower;
    delete this.modData('Learnsets', 'forretress').learnset.hiddenpower;
    delete this.modData('Learnsets', 'dunsparce').learnset.hiddenpower;
    delete this.modData('Learnsets', 'gligar').learnset.hiddenpower;
    delete this.modData('Learnsets', 'steelix').learnset.hiddenpower;
    delete this.modData('Learnsets', 'snubbull').learnset.hiddenpower;
    delete this.modData('Learnsets', 'granbull').learnset.hiddenpower;
    delete this.modData('Learnsets', 'qwilfish').learnset.hiddenpower;
    delete this.modData('Learnsets', 'scizor').learnset.hiddenpower;
    delete this.modData('Learnsets', 'shuckle').learnset.hiddenpower;
    delete this.modData('Learnsets', 'heracross').learnset.hiddenpower;
    delete this.modData('Learnsets', 'sneasel').learnset.hiddenpower;
    delete this.modData('Learnsets', 'teddiursa').learnset.hiddenpower;
    delete this.modData('Learnsets', 'ursaring').learnset.hiddenpower;
    delete this.modData('Learnsets', 'swinub').learnset.hiddenpower;
    delete this.modData('Learnsets', 'piloswine').learnset.hiddenpower;
    delete this.modData('Learnsets', 'corsola').learnset.hiddenpower;
    delete this.modData('Learnsets', 'remoraid').learnset.hiddenpower;
    delete this.modData('Learnsets', 'octillery').learnset.hiddenpower;
    delete this.modData('Learnsets', 'delibird').learnset.hiddenpower;
    delete this.modData('Learnsets', 'mantine').learnset.hiddenpower;
    delete this.modData('Learnsets', 'skarmory').learnset.hiddenpower;
    delete this.modData('Learnsets', 'kingdra').learnset.hiddenpower;
    delete this.modData('Learnsets', 'phanpy').learnset.hiddenpower;
    delete this.modData('Learnsets', 'donphan').learnset.hiddenpower;
    delete this.modData('Learnsets', 'stantler').learnset.hiddenpower;
    delete this.modData('Learnsets', 'tyrogue').learnset.hiddenpower;
    delete this.modData('Learnsets', 'hitmontop').learnset.hiddenpower;
    delete this.modData('Learnsets', 'smoochum').learnset.hiddenpower;
    delete this.modData('Learnsets', 'elekid').learnset.hiddenpower;
    delete this.modData('Learnsets', 'magby').learnset.hiddenpower;
    delete this.modData('Learnsets', 'miltank').learnset.hiddenpower;
    delete this.modData('Learnsets', 'blissey').learnset.hiddenpower;
    delete this.modData('Learnsets', 'raikou').learnset.hiddenpower;
    delete this.modData('Learnsets', 'entei').learnset.hiddenpower;
    delete this.modData('Learnsets', 'suicune').learnset.hiddenpower;
    delete this.modData('Learnsets', 'larvitar').learnset.hiddenpower;
    delete this.modData('Learnsets', 'pupitar').learnset.hiddenpower;
    delete this.modData('Learnsets', 'tyranitar').learnset.hiddenpower;
    delete this.modData('Learnsets', 'lugia').learnset.hiddenpower;
    delete this.modData('Learnsets', 'hooh').learnset.hiddenpower;
    delete this.modData('Learnsets', 'celebi').learnset.hiddenpower;
    delete this.modData('Learnsets', 'treecko').learnset.hiddenpower;
    delete this.modData('Learnsets', 'grovyle').learnset.hiddenpower;
    delete this.modData('Learnsets', 'sceptile').learnset.hiddenpower;
    delete this.modData('Learnsets', 'torchic').learnset.hiddenpower;
    delete this.modData('Learnsets', 'combusken').learnset.hiddenpower;
    delete this.modData('Learnsets', 'blaziken').learnset.hiddenpower;
    delete this.modData('Learnsets', 'mudkip').learnset.hiddenpower;
    delete this.modData('Learnsets', 'marshtomp').learnset.hiddenpower;
    delete this.modData('Learnsets', 'swampert').learnset.hiddenpower;
    delete this.modData('Learnsets', 'poochyena').learnset.hiddenpower;
    delete this.modData('Learnsets', 'mightyena').learnset.hiddenpower;
    delete this.modData('Learnsets', 'zigzagoon').learnset.hiddenpower;
    delete this.modData('Learnsets', 'linoone').learnset.hiddenpower;
    delete this.modData('Learnsets', 'wurmple').learnset.hiddenpower;
    delete this.modData('Learnsets', 'silcoon').learnset.hiddenpower;
    delete this.modData('Learnsets', 'beautifly').learnset.hiddenpower;
    delete this.modData('Learnsets', 'cascoon').learnset.hiddenpower;
    delete this.modData('Learnsets', 'dustox').learnset.hiddenpower;
    delete this.modData('Learnsets', 'lotad').learnset.hiddenpower;
    delete this.modData('Learnsets', 'lombre').learnset.hiddenpower;
    delete this.modData('Learnsets', 'ludicolo').learnset.hiddenpower;
    delete this.modData('Learnsets', 'seedot').learnset.hiddenpower;
    delete this.modData('Learnsets', 'nuzleaf').learnset.hiddenpower;
    delete this.modData('Learnsets', 'shiftry').learnset.hiddenpower;
    delete this.modData('Learnsets', 'taillow').learnset.hiddenpower;
    delete this.modData('Learnsets', 'swellow').learnset.hiddenpower;
    delete this.modData('Learnsets', 'wingull').learnset.hiddenpower;
    delete this.modData('Learnsets', 'pelipper').learnset.hiddenpower;
    delete this.modData('Learnsets', 'ralts').learnset.hiddenpower;
    delete this.modData('Learnsets', 'kirlia').learnset.hiddenpower;
    delete this.modData('Learnsets', 'gardevoir').learnset.hiddenpower;
    delete this.modData('Learnsets', 'surskit').learnset.hiddenpower;
    delete this.modData('Learnsets', 'masquerain').learnset.hiddenpower;
    delete this.modData('Learnsets', 'shroomish').learnset.hiddenpower;
    delete this.modData('Learnsets', 'breloom').learnset.hiddenpower;
    delete this.modData('Learnsets', 'slakoth').learnset.hiddenpower;
    delete this.modData('Learnsets', 'vigoroth').learnset.hiddenpower;
    delete this.modData('Learnsets', 'slaking').learnset.hiddenpower;
    delete this.modData('Learnsets', 'nincada').learnset.hiddenpower;
    delete this.modData('Learnsets', 'ninjask').learnset.hiddenpower;
    delete this.modData('Learnsets', 'shedinja').learnset.hiddenpower;
    delete this.modData('Learnsets', 'whismur').learnset.hiddenpower;
    delete this.modData('Learnsets', 'loudred').learnset.hiddenpower;
    delete this.modData('Learnsets', 'exploud').learnset.hiddenpower;
    delete this.modData('Learnsets', 'makuhita').learnset.hiddenpower;
    delete this.modData('Learnsets', 'hariyama').learnset.hiddenpower;
    delete this.modData('Learnsets', 'azurill').learnset.hiddenpower;
    delete this.modData('Learnsets', 'nosepass').learnset.hiddenpower;
    delete this.modData('Learnsets', 'skitty').learnset.hiddenpower;
    delete this.modData('Learnsets', 'delcatty').learnset.hiddenpower;
    delete this.modData('Learnsets', 'sableye').learnset.hiddenpower;
    delete this.modData('Learnsets', 'mawile').learnset.hiddenpower;
    delete this.modData('Learnsets', 'aron').learnset.hiddenpower;
    delete this.modData('Learnsets', 'lairon').learnset.hiddenpower;
    delete this.modData('Learnsets', 'aggron').learnset.hiddenpower;
    delete this.modData('Learnsets', 'meditite').learnset.hiddenpower;
    delete this.modData('Learnsets', 'medicham').learnset.hiddenpower;
    delete this.modData('Learnsets', 'electrike').learnset.hiddenpower;
    delete this.modData('Learnsets', 'manectric').learnset.hiddenpower;
    delete this.modData('Learnsets', 'plusle').learnset.hiddenpower;
    delete this.modData('Learnsets', 'minun').learnset.hiddenpower;
    delete this.modData('Learnsets', 'volbeat').learnset.hiddenpower;
    delete this.modData('Learnsets', 'illumise').learnset.hiddenpower;
    delete this.modData('Learnsets', 'roselia').learnset.hiddenpower;
    delete this.modData('Learnsets', 'gulpin').learnset.hiddenpower;
    delete this.modData('Learnsets', 'swalot').learnset.hiddenpower;
    delete this.modData('Learnsets', 'carvanha').learnset.hiddenpower;
    delete this.modData('Learnsets', 'sharpedo').learnset.hiddenpower;
    delete this.modData('Learnsets', 'wailmer').learnset.hiddenpower;
    delete this.modData('Learnsets', 'wailord').learnset.hiddenpower;
    delete this.modData('Learnsets', 'numel').learnset.hiddenpower;
    delete this.modData('Learnsets', 'camerupt').learnset.hiddenpower;
    delete this.modData('Learnsets', 'torkoal').learnset.hiddenpower;
    delete this.modData('Learnsets', 'spoink').learnset.hiddenpower;
    delete this.modData('Learnsets', 'grumpig').learnset.hiddenpower;
    delete this.modData('Learnsets', 'spinda').learnset.hiddenpower;
    delete this.modData('Learnsets', 'trapinch').learnset.hiddenpower;
    delete this.modData('Learnsets', 'vibrava').learnset.hiddenpower;
    delete this.modData('Learnsets', 'flygon').learnset.hiddenpower;
    delete this.modData('Learnsets', 'cacnea').learnset.hiddenpower;
    delete this.modData('Learnsets', 'cacturne').learnset.hiddenpower;
    delete this.modData('Learnsets', 'swablu').learnset.hiddenpower;
    delete this.modData('Learnsets', 'altaria').learnset.hiddenpower;
    delete this.modData('Learnsets', 'zangoose').learnset.hiddenpower;
    delete this.modData('Learnsets', 'seviper').learnset.hiddenpower;
    delete this.modData('Learnsets', 'lunatone').learnset.hiddenpower;
    delete this.modData('Learnsets', 'solrock').learnset.hiddenpower;
    delete this.modData('Learnsets', 'barboach').learnset.hiddenpower;
    delete this.modData('Learnsets', 'whiscash').learnset.hiddenpower;
    delete this.modData('Learnsets', 'corphish').learnset.hiddenpower;
    delete this.modData('Learnsets', 'crawdaunt').learnset.hiddenpower;
    delete this.modData('Learnsets', 'baltoy').learnset.hiddenpower;
    delete this.modData('Learnsets', 'claydol').learnset.hiddenpower;
    delete this.modData('Learnsets', 'lileep').learnset.hiddenpower;
    delete this.modData('Learnsets', 'cradily').learnset.hiddenpower;
    delete this.modData('Learnsets', 'anorith').learnset.hiddenpower;
    delete this.modData('Learnsets', 'armaldo').learnset.hiddenpower;
    delete this.modData('Learnsets', 'feebas').learnset.hiddenpower;
    delete this.modData('Learnsets', 'milotic').learnset.hiddenpower;
    delete this.modData('Learnsets', 'castform').learnset.hiddenpower;
    delete this.modData('Learnsets', 'shuppet').learnset.hiddenpower;
    delete this.modData('Learnsets', 'banette').learnset.hiddenpower;
    delete this.modData('Learnsets', 'duskull').learnset.hiddenpower;
    delete this.modData('Learnsets', 'dusclops').learnset.hiddenpower;
    delete this.modData('Learnsets', 'tropius').learnset.hiddenpower;
    delete this.modData('Learnsets', 'chimecho').learnset.hiddenpower;
    delete this.modData('Learnsets', 'absol').learnset.hiddenpower;
    delete this.modData('Learnsets', 'wynaut').learnset.hiddenpower;
    delete this.modData('Learnsets', 'snorunt').learnset.hiddenpower;
    delete this.modData('Learnsets', 'glalie').learnset.hiddenpower;
    delete this.modData('Learnsets', 'spheal').learnset.hiddenpower;
    delete this.modData('Learnsets', 'sealeo').learnset.hiddenpower;
    delete this.modData('Learnsets', 'walrein').learnset.hiddenpower;
    delete this.modData('Learnsets', 'clamperl').learnset.hiddenpower;
    delete this.modData('Learnsets', 'huntail').learnset.hiddenpower;
    delete this.modData('Learnsets', 'gorebyss').learnset.hiddenpower;
    delete this.modData('Learnsets', 'relicanth').learnset.hiddenpower;
    delete this.modData('Learnsets', 'luvdisc').learnset.hiddenpower;
    delete this.modData('Learnsets', 'bagon').learnset.hiddenpower;
    delete this.modData('Learnsets', 'shelgon').learnset.hiddenpower;
    delete this.modData('Learnsets', 'salamence').learnset.hiddenpower;
    delete this.modData('Learnsets', 'beldum').learnset.hiddenpower;
    delete this.modData('Learnsets', 'metang').learnset.hiddenpower;
    delete this.modData('Learnsets', 'metagross').learnset.hiddenpower;
    delete this.modData('Learnsets', 'regirock').learnset.hiddenpower;
    delete this.modData('Learnsets', 'regice').learnset.hiddenpower;
    delete this.modData('Learnsets', 'registeel').learnset.hiddenpower;
    delete this.modData('Learnsets', 'latias').learnset.hiddenpower;
    delete this.modData('Learnsets', 'latios').learnset.hiddenpower;
    delete this.modData('Learnsets', 'kyogre').learnset.hiddenpower;
    delete this.modData('Learnsets', 'groudon').learnset.hiddenpower;
    delete this.modData('Learnsets', 'rayquaza').learnset.hiddenpower;
    delete this.modData('Learnsets', 'jirachi').learnset.hiddenpower;
    delete this.modData('Learnsets', 'deoxys').learnset.hiddenpower;
    delete this.modData('Learnsets', 'turtwig').learnset.hiddenpower;
    delete this.modData('Learnsets', 'grotle').learnset.hiddenpower;
    delete this.modData('Learnsets', 'torterra').learnset.hiddenpower;
    delete this.modData('Learnsets', 'chimchar').learnset.hiddenpower;
    delete this.modData('Learnsets', 'monferno').learnset.hiddenpower;
    delete this.modData('Learnsets', 'infernape').learnset.hiddenpower;
    delete this.modData('Learnsets', 'piplup').learnset.hiddenpower;
    delete this.modData('Learnsets', 'prinplup').learnset.hiddenpower;
    delete this.modData('Learnsets', 'empoleon').learnset.hiddenpower;
    delete this.modData('Learnsets', 'starly').learnset.hiddenpower;
    delete this.modData('Learnsets', 'staravia').learnset.hiddenpower;
    delete this.modData('Learnsets', 'staraptor').learnset.hiddenpower;
    delete this.modData('Learnsets', 'bidoof').learnset.hiddenpower;
    delete this.modData('Learnsets', 'bibarel').learnset.hiddenpower;
    delete this.modData('Learnsets', 'kricketune').learnset.hiddenpower;
    delete this.modData('Learnsets', 'shinx').learnset.hiddenpower;
    delete this.modData('Learnsets', 'luxio').learnset.hiddenpower;
    delete this.modData('Learnsets', 'luxray').learnset.hiddenpower;
    delete this.modData('Learnsets', 'budew').learnset.hiddenpower;
    delete this.modData('Learnsets', 'roserade').learnset.hiddenpower;
    delete this.modData('Learnsets', 'cranidos').learnset.hiddenpower;
    delete this.modData('Learnsets', 'rampardos').learnset.hiddenpower;
    delete this.modData('Learnsets', 'shieldon').learnset.hiddenpower;
    delete this.modData('Learnsets', 'bastiodon').learnset.hiddenpower;
    delete this.modData('Learnsets', 'burmy').learnset.hiddenpower;
    delete this.modData('Learnsets', 'wormadam').learnset.hiddenpower;
    delete this.modData('Learnsets', 'wormadamsandy').learnset.hiddenpower;
    delete this.modData('Learnsets', 'wormadamtrash').learnset.hiddenpower;
    delete this.modData('Learnsets', 'mothim').learnset.hiddenpower;
    delete this.modData('Learnsets', 'combee').learnset.hiddenpower;
    delete this.modData('Learnsets', 'vespiquen').learnset.hiddenpower;
    delete this.modData('Learnsets', 'pachirisu').learnset.hiddenpower;
    delete this.modData('Learnsets', 'buizel').learnset.hiddenpower;
    delete this.modData('Learnsets', 'floatzel').learnset.hiddenpower;
    delete this.modData('Learnsets', 'cherubi').learnset.hiddenpower;
    delete this.modData('Learnsets', 'cherrim').learnset.hiddenpower;
    delete this.modData('Learnsets', 'shellos').learnset.hiddenpower;
    delete this.modData('Learnsets', 'gastrodon').learnset.hiddenpower;
    delete this.modData('Learnsets', 'ambipom').learnset.hiddenpower;
    delete this.modData('Learnsets', 'drifloon').learnset.hiddenpower;
    delete this.modData('Learnsets', 'drifblim').learnset.hiddenpower;
    delete this.modData('Learnsets', 'buneary').learnset.hiddenpower;
    delete this.modData('Learnsets', 'lopunny').learnset.hiddenpower;
    delete this.modData('Learnsets', 'mismagius').learnset.hiddenpower;
    delete this.modData('Learnsets', 'honchkrow').learnset.hiddenpower;
    delete this.modData('Learnsets', 'glameow').learnset.hiddenpower;
    delete this.modData('Learnsets', 'purugly').learnset.hiddenpower;
    delete this.modData('Learnsets', 'chingling').learnset.hiddenpower;
    delete this.modData('Learnsets', 'stunky').learnset.hiddenpower;
    delete this.modData('Learnsets', 'skuntank').learnset.hiddenpower;
    delete this.modData('Learnsets', 'bronzor').learnset.hiddenpower;
    delete this.modData('Learnsets', 'bronzong').learnset.hiddenpower;
    delete this.modData('Learnsets', 'bonsly').learnset.hiddenpower;
    delete this.modData('Learnsets', 'mimejr').learnset.hiddenpower;
    delete this.modData('Learnsets', 'happiny').learnset.hiddenpower;
    delete this.modData('Learnsets', 'chatot').learnset.hiddenpower;
    delete this.modData('Learnsets', 'spiritomb').learnset.hiddenpower;
    delete this.modData('Learnsets', 'munchlax').learnset.hiddenpower;
    delete this.modData('Learnsets', 'riolu').learnset.hiddenpower;
    delete this.modData('Learnsets', 'lucario').learnset.hiddenpower;
    delete this.modData('Learnsets', 'hippopotas').learnset.hiddenpower;
    delete this.modData('Learnsets', 'hippowdon').learnset.hiddenpower;
    delete this.modData('Learnsets', 'skorupi').learnset.hiddenpower;
    delete this.modData('Learnsets', 'drapion').learnset.hiddenpower;
    delete this.modData('Learnsets', 'croagunk').learnset.hiddenpower;
    delete this.modData('Learnsets', 'toxicroak').learnset.hiddenpower;
    delete this.modData('Learnsets', 'finneon').learnset.hiddenpower;
    delete this.modData('Learnsets', 'lumineon').learnset.hiddenpower;
    delete this.modData('Learnsets', 'mantyke').learnset.hiddenpower;
    delete this.modData('Learnsets', 'snover').learnset.hiddenpower;
    delete this.modData('Learnsets', 'abomasnow').learnset.hiddenpower;
    delete this.modData('Learnsets', 'weavile').learnset.hiddenpower;
    delete this.modData('Learnsets', 'magnezone').learnset.hiddenpower;
    delete this.modData('Learnsets', 'lickilicky').learnset.hiddenpower;
    delete this.modData('Learnsets', 'rhyperior').learnset.hiddenpower;
    delete this.modData('Learnsets', 'tangrowth').learnset.hiddenpower;
    delete this.modData('Learnsets', 'electivire').learnset.hiddenpower;
    delete this.modData('Learnsets', 'magmortar').learnset.hiddenpower;
    delete this.modData('Learnsets', 'togekiss').learnset.hiddenpower;
    delete this.modData('Learnsets', 'yanmega').learnset.hiddenpower;
    delete this.modData('Learnsets', 'gliscor').learnset.hiddenpower;
    delete this.modData('Learnsets', 'mamoswine').learnset.hiddenpower;
    delete this.modData('Learnsets', 'gallade').learnset.hiddenpower;
    delete this.modData('Learnsets', 'probopass').learnset.hiddenpower;
    delete this.modData('Learnsets', 'dusknoir').learnset.hiddenpower;
    delete this.modData('Learnsets', 'froslass').learnset.hiddenpower;
    delete this.modData('Learnsets', 'rotom').learnset.hiddenpower;
    delete this.modData('Learnsets', 'uxie').learnset.hiddenpower;
    delete this.modData('Learnsets', 'mesprit').learnset.hiddenpower;
    delete this.modData('Learnsets', 'azelf').learnset.hiddenpower;
    delete this.modData('Learnsets', 'dialga').learnset.hiddenpower;
    delete this.modData('Learnsets', 'palkia').learnset.hiddenpower;
    delete this.modData('Learnsets', 'heatran').learnset.hiddenpower;
    delete this.modData('Learnsets', 'regigigas').learnset.hiddenpower;
    delete this.modData('Learnsets', 'giratina').learnset.hiddenpower;
    delete this.modData('Learnsets', 'cresselia').learnset.hiddenpower;
    delete this.modData('Learnsets', 'phione').learnset.hiddenpower;
    delete this.modData('Learnsets', 'manaphy').learnset.hiddenpower;
    delete this.modData('Learnsets', 'darkrai').learnset.hiddenpower;
    delete this.modData('Learnsets', 'shaymin').learnset.hiddenpower;
    delete this.modData('Learnsets', 'rotomheat').learnset.hiddenpower;
    delete this.modData('Learnsets', 'rotomwash').learnset.hiddenpower;
    delete this.modData('Learnsets', 'rotomfrost').learnset.hiddenpower;
    delete this.modData('Learnsets', 'rotomfan').learnset.hiddenpower;
    delete this.modData('Learnsets', 'rotommow').learnset.hiddenpower;
    delete this.modData('Learnsets', 'victini').learnset.hiddenpower;
    delete this.modData('Learnsets', 'snivy').learnset.hiddenpower;
    delete this.modData('Learnsets', 'servine').learnset.hiddenpower;
    delete this.modData('Learnsets', 'serperior').learnset.hiddenpower;
    delete this.modData('Learnsets', 'tepig').learnset.hiddenpower;
    delete this.modData('Learnsets', 'pignite').learnset.hiddenpower;
    delete this.modData('Learnsets', 'emboar').learnset.hiddenpower;
    delete this.modData('Learnsets', 'patrat').learnset.hiddenpower;
    delete this.modData('Learnsets', 'watchog').learnset.hiddenpower;
    delete this.modData('Learnsets', 'lillipup').learnset.hiddenpower;
    delete this.modData('Learnsets', 'herdier').learnset.hiddenpower;
    delete this.modData('Learnsets', 'stoutland').learnset.hiddenpower;
    delete this.modData('Learnsets', 'purrloin').learnset.hiddenpower;
    delete this.modData('Learnsets', 'liepard').learnset.hiddenpower;
    delete this.modData('Learnsets', 'pansage').learnset.hiddenpower;
    delete this.modData('Learnsets', 'simisage').learnset.hiddenpower;
    delete this.modData('Learnsets', 'pansear').learnset.hiddenpower;
    delete this.modData('Learnsets', 'simisear').learnset.hiddenpower;
    delete this.modData('Learnsets', 'panpour').learnset.hiddenpower;
    delete this.modData('Learnsets', 'simipour').learnset.hiddenpower;
    delete this.modData('Learnsets', 'munna').learnset.hiddenpower;
    delete this.modData('Learnsets', 'musharna').learnset.hiddenpower;
    delete this.modData('Learnsets', 'pidove').learnset.hiddenpower;
    delete this.modData('Learnsets', 'tranquill').learnset.hiddenpower;
    delete this.modData('Learnsets', 'unfezant').learnset.hiddenpower;
    delete this.modData('Learnsets', 'blitzle').learnset.hiddenpower;
    delete this.modData('Learnsets', 'zebstrika').learnset.hiddenpower;
    delete this.modData('Learnsets', 'roggenrola').learnset.hiddenpower;
    delete this.modData('Learnsets', 'boldore').learnset.hiddenpower;
    delete this.modData('Learnsets', 'gigalith').learnset.hiddenpower;
    delete this.modData('Learnsets', 'woobat').learnset.hiddenpower;
    delete this.modData('Learnsets', 'swoobat').learnset.hiddenpower;
    delete this.modData('Learnsets', 'audino').learnset.hiddenpower;
    delete this.modData('Learnsets', 'timburr').learnset.hiddenpower;
    delete this.modData('Learnsets', 'gurdurr').learnset.hiddenpower;
    delete this.modData('Learnsets', 'conkeldurr').learnset.hiddenpower;
    delete this.modData('Learnsets', 'tympole').learnset.hiddenpower;
    delete this.modData('Learnsets', 'palpitoad').learnset.hiddenpower;
    delete this.modData('Learnsets', 'seismitoad').learnset.hiddenpower;
    delete this.modData('Learnsets', 'throh').learnset.hiddenpower;
    delete this.modData('Learnsets', 'sawk').learnset.hiddenpower;
    delete this.modData('Learnsets', 'sewaddle').learnset.hiddenpower;
    delete this.modData('Learnsets', 'swadloon').learnset.hiddenpower;
    delete this.modData('Learnsets', 'leavanny').learnset.hiddenpower;
    delete this.modData('Learnsets', 'venipede').learnset.hiddenpower;
    delete this.modData('Learnsets', 'whirlipede').learnset.hiddenpower;
    delete this.modData('Learnsets', 'scolipede').learnset.hiddenpower;
    delete this.modData('Learnsets', 'cottonee').learnset.hiddenpower;
    delete this.modData('Learnsets', 'whimsicott').learnset.hiddenpower;
    delete this.modData('Learnsets', 'petilil').learnset.hiddenpower;
    delete this.modData('Learnsets', 'lilligant').learnset.hiddenpower;
    delete this.modData('Learnsets', 'basculin').learnset.hiddenpower;
    delete this.modData('Learnsets', 'sandile').learnset.hiddenpower;
    delete this.modData('Learnsets', 'krokorok').learnset.hiddenpower;
    delete this.modData('Learnsets', 'krookodile').learnset.hiddenpower;
    delete this.modData('Learnsets', 'darumaka').learnset.hiddenpower;
    delete this.modData('Learnsets', 'darmanitan').learnset.hiddenpower;
    delete this.modData('Learnsets', 'maractus').learnset.hiddenpower;
    delete this.modData('Learnsets', 'dwebble').learnset.hiddenpower;
    delete this.modData('Learnsets', 'crustle').learnset.hiddenpower;
    delete this.modData('Learnsets', 'scraggy').learnset.hiddenpower;
    delete this.modData('Learnsets', 'scrafty').learnset.hiddenpower;
    delete this.modData('Learnsets', 'sigilyph').learnset.hiddenpower;
    delete this.modData('Learnsets', 'yamask').learnset.hiddenpower;
    delete this.modData('Learnsets', 'cofagrigus').learnset.hiddenpower;
    delete this.modData('Learnsets', 'tirtouga').learnset.hiddenpower;
    delete this.modData('Learnsets', 'carracosta').learnset.hiddenpower;
    delete this.modData('Learnsets', 'archen').learnset.hiddenpower;
    delete this.modData('Learnsets', 'archeops').learnset.hiddenpower;
    delete this.modData('Learnsets', 'trubbish').learnset.hiddenpower;
    delete this.modData('Learnsets', 'garbodor').learnset.hiddenpower;
    delete this.modData('Learnsets', 'zorua').learnset.hiddenpower;
    delete this.modData('Learnsets', 'zoroark').learnset.hiddenpower;
    delete this.modData('Learnsets', 'minccino').learnset.hiddenpower;
    delete this.modData('Learnsets', 'cinccino').learnset.hiddenpower;
    delete this.modData('Learnsets', 'gothita').learnset.hiddenpower;
    delete this.modData('Learnsets', 'gothorita').learnset.hiddenpower;
    delete this.modData('Learnsets', 'gothitelle').learnset.hiddenpower;
    delete this.modData('Learnsets', 'solosis').learnset.hiddenpower;
    delete this.modData('Learnsets', 'duosion').learnset.hiddenpower;
    delete this.modData('Learnsets', 'reuniclus').learnset.hiddenpower;
    delete this.modData('Learnsets', 'ducklett').learnset.hiddenpower;
    delete this.modData('Learnsets', 'swanna').learnset.hiddenpower;
    delete this.modData('Learnsets', 'vanillite').learnset.hiddenpower;
    delete this.modData('Learnsets', 'vanillish').learnset.hiddenpower;
    delete this.modData('Learnsets', 'vanilluxe').learnset.hiddenpower;
    delete this.modData('Learnsets', 'deerling').learnset.hiddenpower;
    delete this.modData('Learnsets', 'sawsbuck').learnset.hiddenpower;
    delete this.modData('Learnsets', 'emolga').learnset.hiddenpower;
    delete this.modData('Learnsets', 'karrablast').learnset.hiddenpower;
    delete this.modData('Learnsets', 'escavalier').learnset.hiddenpower;
    delete this.modData('Learnsets', 'foongus').learnset.hiddenpower;
    delete this.modData('Learnsets', 'amoonguss').learnset.hiddenpower;
    delete this.modData('Learnsets', 'frillish').learnset.hiddenpower;
    delete this.modData('Learnsets', 'jellicent').learnset.hiddenpower;
    delete this.modData('Learnsets', 'alomomola').learnset.hiddenpower;
    delete this.modData('Learnsets', 'joltik').learnset.hiddenpower;
    delete this.modData('Learnsets', 'galvantula').learnset.hiddenpower;
    delete this.modData('Learnsets', 'ferroseed').learnset.hiddenpower;
    delete this.modData('Learnsets', 'ferrothorn').learnset.hiddenpower;
    delete this.modData('Learnsets', 'klink').learnset.hiddenpower;
    delete this.modData('Learnsets', 'klang').learnset.hiddenpower;
    delete this.modData('Learnsets', 'klinklang').learnset.hiddenpower;
    delete this.modData('Learnsets', 'eelektrik').learnset.hiddenpower;
    delete this.modData('Learnsets', 'eelektross').learnset.hiddenpower;
    delete this.modData('Learnsets', 'elgyem').learnset.hiddenpower;
    delete this.modData('Learnsets', 'beheeyem').learnset.hiddenpower;
    delete this.modData('Learnsets', 'litwick').learnset.hiddenpower;
    delete this.modData('Learnsets', 'lampent').learnset.hiddenpower;
    delete this.modData('Learnsets', 'chandelure').learnset.hiddenpower;
    delete this.modData('Learnsets', 'axew').learnset.hiddenpower;
    delete this.modData('Learnsets', 'fraxure').learnset.hiddenpower;
    delete this.modData('Learnsets', 'haxorus').learnset.hiddenpower;
    delete this.modData('Learnsets', 'cubchoo').learnset.hiddenpower;
    delete this.modData('Learnsets', 'beartic').learnset.hiddenpower;
    delete this.modData('Learnsets', 'cryogonal').learnset.hiddenpower;
    delete this.modData('Learnsets', 'shelmet').learnset.hiddenpower;
    delete this.modData('Learnsets', 'accelgor').learnset.hiddenpower;
    delete this.modData('Learnsets', 'stunfisk').learnset.hiddenpower;
    delete this.modData('Learnsets', 'mienfoo').learnset.hiddenpower;
    delete this.modData('Learnsets', 'mienshao').learnset.hiddenpower;
    delete this.modData('Learnsets', 'druddigon').learnset.hiddenpower;
    delete this.modData('Learnsets', 'golett').learnset.hiddenpower;
    delete this.modData('Learnsets', 'golurk').learnset.hiddenpower;
    delete this.modData('Learnsets', 'pawniard').learnset.hiddenpower;
    delete this.modData('Learnsets', 'bisharp').learnset.hiddenpower;
    delete this.modData('Learnsets', 'bouffalant').learnset.hiddenpower;
    delete this.modData('Learnsets', 'rufflet').learnset.hiddenpower;
    delete this.modData('Learnsets', 'braviary').learnset.hiddenpower;
    delete this.modData('Learnsets', 'vullaby').learnset.hiddenpower;
    delete this.modData('Learnsets', 'mandibuzz').learnset.hiddenpower;
    delete this.modData('Learnsets', 'heatmor').learnset.hiddenpower;
    delete this.modData('Learnsets', 'durant').learnset.hiddenpower;
    delete this.modData('Learnsets', 'deino').learnset.hiddenpower;
    delete this.modData('Learnsets', 'zweilous').learnset.hiddenpower;
    delete this.modData('Learnsets', 'hydreigon').learnset.hiddenpower;
    delete this.modData('Learnsets', 'larvesta').learnset.hiddenpower;
    delete this.modData('Learnsets', 'volcarona').learnset.hiddenpower;
    delete this.modData('Learnsets', 'cobalion').learnset.hiddenpower;
    delete this.modData('Learnsets', 'terrakion').learnset.hiddenpower;
    delete this.modData('Learnsets', 'virizion').learnset.hiddenpower;
    delete this.modData('Learnsets', 'reshiram').learnset.hiddenpower;
    delete this.modData('Learnsets', 'zekrom').learnset.hiddenpower;
    delete this.modData('Learnsets', 'kyurem').learnset.hiddenpower;
    delete this.modData('Learnsets', 'kyuremblack').learnset.hiddenpower;
    delete this.modData('Learnsets', 'kyuremwhite').learnset.hiddenpower;
    delete this.modData('Learnsets', 'keldeo').learnset.hiddenpower;
    delete this.modData('Learnsets', 'meloetta').learnset.hiddenpower;
    delete this.modData('Learnsets', 'genesect').learnset.hiddenpower;
    delete this.modData('Learnsets', 'chespin').learnset.hiddenpower;
    delete this.modData('Learnsets', 'quilladin').learnset.hiddenpower;
    delete this.modData('Learnsets', 'chesnaught').learnset.hiddenpower;
    delete this.modData('Learnsets', 'bunnelby').learnset.hiddenpower;
    delete this.modData('Learnsets', 'diggersby').learnset.hiddenpower;
    delete this.modData('Learnsets', 'fletchling').learnset.hiddenpower;
    delete this.modData('Learnsets', 'fletchinder').learnset.hiddenpower;
    delete this.modData('Learnsets', 'talonflame').learnset.hiddenpower;
    delete this.modData('Learnsets', 'vivillon').learnset.hiddenpower;
    delete this.modData('Learnsets', 'litleo').learnset.hiddenpower;
    delete this.modData('Learnsets', 'pyroar').learnset.hiddenpower;
    delete this.modData('Learnsets', 'flabebe').learnset.hiddenpower;
    delete this.modData('Learnsets', 'floette').learnset.hiddenpower;
    delete this.modData('Learnsets', 'florges').learnset.hiddenpower;
    delete this.modData('Learnsets', 'skiddo').learnset.hiddenpower;
    delete this.modData('Learnsets', 'gogoat').learnset.hiddenpower;
    delete this.modData('Learnsets', 'pancham').learnset.hiddenpower;
    delete this.modData('Learnsets', 'pangoro').learnset.hiddenpower;
    delete this.modData('Learnsets', 'furfrou').learnset.hiddenpower;
    delete this.modData('Learnsets', 'espurr').learnset.hiddenpower;
    delete this.modData('Learnsets', 'meowstic').learnset.hiddenpower;
    delete this.modData('Learnsets', 'meowsticf').learnset.hiddenpower;
    delete this.modData('Learnsets', 'honedge').learnset.hiddenpower;
    delete this.modData('Learnsets', 'doublade').learnset.hiddenpower;
    delete this.modData('Learnsets', 'aegislash').learnset.hiddenpower;
    delete this.modData('Learnsets', 'spritzee').learnset.hiddenpower;
    delete this.modData('Learnsets', 'aromatisse').learnset.hiddenpower;
    delete this.modData('Learnsets', 'swirlix').learnset.hiddenpower;
    delete this.modData('Learnsets', 'slurpuff').learnset.hiddenpower;
    delete this.modData('Learnsets', 'inkay').learnset.hiddenpower;
    delete this.modData('Learnsets', 'malamar').learnset.hiddenpower;
    delete this.modData('Learnsets', 'binacle').learnset.hiddenpower;
    delete this.modData('Learnsets', 'barbaracle').learnset.hiddenpower;
    delete this.modData('Learnsets', 'skrelp').learnset.hiddenpower;
    delete this.modData('Learnsets', 'dragalge').learnset.hiddenpower;
    delete this.modData('Learnsets', 'clauncher').learnset.hiddenpower;
    delete this.modData('Learnsets', 'clawitzer').learnset.hiddenpower;
    delete this.modData('Learnsets', 'helioptile').learnset.hiddenpower;
    delete this.modData('Learnsets', 'heliolisk').learnset.hiddenpower;
    delete this.modData('Learnsets', 'tyrunt').learnset.hiddenpower;
    delete this.modData('Learnsets', 'tyrantrum').learnset.hiddenpower;
    delete this.modData('Learnsets', 'amaura').learnset.hiddenpower;
    delete this.modData('Learnsets', 'aurorus').learnset.hiddenpower;
    delete this.modData('Learnsets', 'hawlucha').learnset.hiddenpower;
    delete this.modData('Learnsets', 'dedenne').learnset.hiddenpower;
    delete this.modData('Learnsets', 'carbink').learnset.hiddenpower;
    delete this.modData('Learnsets', 'goomy').learnset.hiddenpower;
    delete this.modData('Learnsets', 'sliggoo').learnset.hiddenpower;
    delete this.modData('Learnsets', 'goodra').learnset.hiddenpower;
    delete this.modData('Learnsets', 'klefki').learnset.hiddenpower;
    delete this.modData('Learnsets', 'phantump').learnset.hiddenpower;
    delete this.modData('Learnsets', 'trevenant').learnset.hiddenpower;
    delete this.modData('Learnsets', 'pumpkaboo').learnset.hiddenpower;
    delete this.modData('Learnsets', 'gourgeist').learnset.hiddenpower;
    delete this.modData('Learnsets', 'bergmite').learnset.hiddenpower;
    delete this.modData('Learnsets', 'avalugg').learnset.hiddenpower;
    delete this.modData('Learnsets', 'noibat').learnset.hiddenpower;
    delete this.modData('Learnsets', 'noivern').learnset.hiddenpower;
    delete this.modData('Learnsets', 'xerneas').learnset.hiddenpower;
    delete this.modData('Learnsets', 'yveltal').learnset.hiddenpower;
    delete this.modData('Learnsets', 'zygarde').learnset.hiddenpower;
    delete this.modData('Learnsets', 'diancie').learnset.hiddenpower;
    delete this.modData('Learnsets', 'hoopa').learnset.hiddenpower;
    delete this.modData('Learnsets', 'volcanion').learnset.hiddenpower;
    delete this.modData('Learnsets', 'rowlet').learnset.hiddenpower;
    delete this.modData('Learnsets', 'dartrix').learnset.hiddenpower;
    delete this.modData('Learnsets', 'decidueye').learnset.hiddenpower;
    delete this.modData('Learnsets', 'litten').learnset.hiddenpower;
    delete this.modData('Learnsets', 'torracat').learnset.hiddenpower;
    delete this.modData('Learnsets', 'incineroar').learnset.hiddenpower;
    delete this.modData('Learnsets', 'popplio').learnset.hiddenpower;
    delete this.modData('Learnsets', 'brionne').learnset.hiddenpower;
    delete this.modData('Learnsets', 'primarina').learnset.hiddenpower;
    delete this.modData('Learnsets', 'pikipek').learnset.hiddenpower;
    delete this.modData('Learnsets', 'trumbeak').learnset.hiddenpower;
    delete this.modData('Learnsets', 'toucannon').learnset.hiddenpower;
    delete this.modData('Learnsets', 'yungoos').learnset.hiddenpower;
    delete this.modData('Learnsets', 'gumshoos').learnset.hiddenpower;
    delete this.modData('Learnsets', 'grubbin').learnset.hiddenpower;
    delete this.modData('Learnsets', 'charjabug').learnset.hiddenpower;
    delete this.modData('Learnsets', 'vikavolt').learnset.hiddenpower;
    delete this.modData('Learnsets', 'crabrawler').learnset.hiddenpower;
    delete this.modData('Learnsets', 'crabominable').learnset.hiddenpower;
    delete this.modData('Learnsets', 'oricorio').learnset.hiddenpower;
    delete this.modData('Learnsets', 'cutiefly').learnset.hiddenpower;
    delete this.modData('Learnsets', 'ribombee').learnset.hiddenpower;
    delete this.modData('Learnsets', 'rockruff').learnset.hiddenpower;
    delete this.modData('Learnsets', 'rockruffdusk').learnset.hiddenpower;
    delete this.modData('Learnsets', 'lycanroc').learnset.hiddenpower;
    delete this.modData('Learnsets', 'lycanrocdusk').learnset.hiddenpower;
    delete this.modData('Learnsets', 'lycanroc').learnset.hiddenpower;
    delete this.modData('Learnsets', 'lycanrocmidnight').learnset.hiddenpower;
    delete this.modData('Learnsets', 'wishiwashi').learnset.hiddenpower;
    delete this.modData('Learnsets', 'mareanie').learnset.hiddenpower;
    delete this.modData('Learnsets', 'toxapex').learnset.hiddenpower;
    delete this.modData('Learnsets', 'mudbray').learnset.hiddenpower;
    delete this.modData('Learnsets', 'mudsdale').learnset.hiddenpower;
    delete this.modData('Learnsets', 'dewpider').learnset.hiddenpower;
    delete this.modData('Learnsets', 'araquanid').learnset.hiddenpower;
    delete this.modData('Learnsets', 'fomantis').learnset.hiddenpower;
    delete this.modData('Learnsets', 'lurantis').learnset.hiddenpower;
    delete this.modData('Learnsets', 'morelull').learnset.hiddenpower;
    delete this.modData('Learnsets', 'shiinotic').learnset.hiddenpower;
    delete this.modData('Learnsets', 'salandit').learnset.hiddenpower;
    delete this.modData('Learnsets', 'salazzle').learnset.hiddenpower;
    delete this.modData('Learnsets', 'stufful').learnset.hiddenpower;
    delete this.modData('Learnsets', 'bewear').learnset.hiddenpower;
    delete this.modData('Learnsets', 'bounsweet').learnset.hiddenpower;
    delete this.modData('Learnsets', 'steenee').learnset.hiddenpower;
    delete this.modData('Learnsets', 'tsareena').learnset.hiddenpower;
    delete this.modData('Learnsets', 'comfey').learnset.hiddenpower;
    delete this.modData('Learnsets', 'oranguru').learnset.hiddenpower;
    delete this.modData('Learnsets', 'passimian').learnset.hiddenpower;
    delete this.modData('Learnsets', 'wimpod').learnset.hiddenpower;
    delete this.modData('Learnsets', 'golisopod').learnset.hiddenpower;
    delete this.modData('Learnsets', 'sandygast').learnset.hiddenpower;
    delete this.modData('Learnsets', 'palossand').learnset.hiddenpower;
    delete this.modData('Learnsets', 'typenull').learnset.hiddenpower;
    delete this.modData('Learnsets', 'minior').learnset.hiddenpower;
    delete this.modData('Learnsets', 'komala').learnset.hiddenpower;
    delete this.modData('Learnsets', 'turtonator').learnset.hiddenpower;
    delete this.modData('Learnsets', 'togedemaru').learnset.hiddenpower;
    delete this.modData('Learnsets', 'mimikyu').learnset.hiddenpower;
    delete this.modData('Learnsets', 'bruxish').learnset.hiddenpower;
    delete this.modData('Learnsets', 'drampa').learnset.hiddenpower;
    delete this.modData('Learnsets', 'dhelmise').learnset.hiddenpower;
    delete this.modData('Learnsets', 'jangmoo').learnset.hiddenpower;
    delete this.modData('Learnsets', 'hakamoo').learnset.hiddenpower;
    delete this.modData('Learnsets', 'kommoo').learnset.hiddenpower;
    delete this.modData('Learnsets', 'cosmog').learnset.hiddenpower;
    delete this.modData('Learnsets', 'cosmoem').learnset.hiddenpower;
    delete this.modData('Learnsets', 'solgaleo').learnset.hiddenpower;
    delete this.modData('Learnsets', 'lunala').learnset.hiddenpower;
    delete this.modData('Learnsets', 'nihilego').learnset.hiddenpower;
    delete this.modData('Learnsets', 'buzzwole').learnset.hiddenpower;
    delete this.modData('Learnsets', 'pheromosa').learnset.hiddenpower;
    delete this.modData('Learnsets', 'xurkitree').learnset.hiddenpower;
    delete this.modData('Learnsets', 'celesteela').learnset.hiddenpower;
    delete this.modData('Learnsets', 'kartana').learnset.hiddenpower;
    delete this.modData('Learnsets', 'necrozma').learnset.hiddenpower;
    delete this.modData('Learnsets', 'poipole').learnset.hiddenpower;
    delete this.modData('Learnsets', 'naganadel').learnset.hiddenpower;
    delete this.modData('Learnsets', 'stakataka').learnset.hiddenpower;
    delete this.modData('Learnsets', 'blacephalon').learnset.hiddenpower;
    delete this.modData('Learnsets', 'magearna').learnset.hiddenpower;
    delete this.modData('Learnsets', 'marshadow').learnset.hiddenpower;
    delete this.modData('Learnsets', 'zeraora').learnset.hiddenpower;
  }
};
