export const Abilities: {[k: string]: ModdedAbilityData} = {
  karmicretribution: {
    desc:
      "This Pokemon's damaging moves become multi-hit moves that hit five times, each with their own accuracy. Does not affect moves that have multiple targets or moves that use the target's attacking stats instead of the user's.",
    shortDesc:
      "This Pokemon's damaging moves hit five times, each with their own accuracy. (not Foul Play)",
    onPrepareHit(source, target, move) {
      if (["iceball", "rollout"].includes(move.id) || move.useTargetOffensive || move.useSourceDefensive
      )
        return;
      if (
        move.category !== "Status" &&
        !move.selfdestruct &&
        !move.multihit &&
        !move.flags["charge"] &&
        !move.spreadHit &&
        !move.isZ
      ) {
        move.multihit = 5;
        move.multiaccuracy = true;
        move.multihitType = "karmicretribution";
      } else if (move.multihit) {
        move.multihit = move.multihit[1];
      }
    },
    onSourceModifySecondaries(secondaries, target, source, move) {
      if (
        move.multihitType === "karmicretribution" && move.id === "secretpower" && move.hit < 4
      ) {
        // hack to prevent accidentally suppressing King's Rock/Razor Fang
        return secondaries.filter(effect => effect.volatileStatus === "flinch");
      }
    },
    id: "karmicretribution",
    name: "Karmic Retribution"
  },
  baneofdarkness: {
    desc:
      "This Pokemon's Psychic-type attacks are super-effective against Dark-types and its Fairy-type attacks are super-effective against Poison-types. Psychic-type attacks ignore the Dark-type's immunity.",
    shortDesc:
      "User's Psychic- and Fairy-type moves are SE against Dark and Poison, respectively, ignoring immunities if applicable.",
    onModifyMovePriority: -5,
    onModifyMove(move, source, target) {
      if (!move.ignoreImmunity) move.ignoreImmunity = {};
      if (move.ignoreImmunity !== true && target.hasType("Dark")) {
        move.ignoreImmunity["Psychic"] = true;
      }
    },
    onSourceEffectiveness(typeMod, target, type, move) {
      if (
        move &&
        ((type === "Poison" && move.type === "Fairy") ||
          (type === "Dark" && move.type === "Psychic"))
      )
        return 1;
      return typeMod;
    },
    id: "baneofdarkness",
    name: "Bane of Darkness"
  },
  mountaincall: {
    desc:
      "This Pokemon's sound-based moves become Ice-type moves. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
    shortDesc: "This Pokemon's sound-based moves become Ice type.",
    onModifyMovePriority: -1,
    onModifyMove(move) {
      if (move.flags["sound"]) {
        move.type = "Ice";
      }
    },
    id: "mountaincall",
    name: "Mountain Call"
  },
  toughitout: {
    desc:
      "Prevents adjacent opposing Pokemon from choosing to switch out unless they are immune to trapping.",
    shortDesc: "Prevents adjacent foes from choosing to switch.",
    onFoeTrapPokemon(pokemon) {
      if (this.isAdjacent(pokemon, this.effectData.target)) {
        pokemon.tryTrap(true);
      }
    },
    onFoeMaybeTrapPokemon(pokemon, source) {
      if (!source) source = this.effectData.target;
      if (!source || !this.isAdjacent(pokemon, source)) return;
      pokemon.maybeTrapped = true;
    },
    id: "toughitout",
    name: "Tough It Out!"
  },
  groundworker: {
    shortDesc:
      "This Pokemon's attacking stat is multiplied by 1.5 while using a Ground-type attack.",
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Ground") {
        this.debug("Groundworker boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Ground") {
        this.debug("Groundworker boost");
        return this.chainModify(1.5);
      }
    },
    id: "groundworker",
    name: "Groundworker"
  },
  sonicwind: {
    shortDesc:
      "This Pokemon's attacking stat is multiplied by 1.5 while using a Flying-type attack.",
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Flying") {
        this.debug("Sonic Wind boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Flying") {
        this.debug("Sonic Wind boost");
        return this.chainModify(1.5);
      }
    },
    id: "sonicwind",
    name: "Sonic Wind"
  },
  forestbreeze: {
    shortDesc:
      "This Pokemon's attacking stat is multiplied by 1.5 while using a Flying-type attack.",
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Flying") {
        this.debug("Forest Breeze boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Flying") {
        this.debug("Forest Breeze boost");
        return this.chainModify(1.5);
      }
    },
    id: "forestbreeze",
    name: "Forest Breeze"
  },
  fiercewings: {
    shortDesc:
      "This Pokemon's attacking stat is multiplied by 1.3 while using a Flying-type attack.",
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Flying") {
        this.debug("Fierce Wings boost");
        return this.chainModify(1.3);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Flying") {
        this.debug("Fierce Wings boost");
        return this.chainModify(1.3);
      }
    },
    id: "fiercewings",
    name: "Fierce Wings"
  },
  poisondippedclaws: {
    shortDesc:
      "This Pokemon's attacking stat is multiplied by 1.5 while using a Poison-type attack.",
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Poison") {
        this.debug("Poison-Dipped Claws boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Poison") {
        this.debug("Poison-Dipped Claws boost");
        return this.chainModify(1.5);
      }
    },
    id: "poisondippedclaws",
    name: "Poison-Dipped Claws"
  },
  tearworker: {
    shortDesc:
      "This Pokemon's attacking stat is multiplied by 1.5 while using a Water-type attack.",
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Water") {
        this.debug("Tearworker boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Water") {
        this.debug("Tearworker boost");
        return this.chainModify(1.5);
      }
    },
    id: "tearworker",
    name: "Tearworker"
  },
  divinecourage: {
    desc:
      "When this Pokemon has more than 1/2 its maximum HP and takes damage from an attack bringing it to 1/2 or less of its maximum HP, its Attack and Defense are raised by 1 stage each. This effect applies after all hits from a multi-hit move; Sheer Force prevents it from activating if the move has a secondary effect.",
    shortDesc:
      "This Pokemon's Attack and Defense are raised by 1 when it reaches 1/2 or less of its max HP.",
    onAfterMoveSecondary(target, source, move) {
      if (!source || source === target || !target.hp || !move.totalDamage)
        return;
      if (target.hp <= target.maxhp / 2 && target.hp + move.totalDamage > target.maxhp / 2) {
        this.boost({ atk: 1, def: 1 });
      }
    },
    id: "divinecourage",
    name: "Divine Courage"
  },
  divinewisdom: {
    shortDesc:
      "This Pokemon's Sp. Def is raised by 1 stage after it is damaged by a move.",
    onAfterDamage(damage, target, source, effect) {
      if (effect && effect.effectType === "Move" && effect.id !== "confused") {
        this.boost({ spd: 1 });
      }
    },
    id: "divinewisdom",
    name: "Divine Wisdom"
  },
  crystalbarrier: {
    shortDesc:
      "This Pokemon's Defense and Sp. Def are doubled; Every damaging move used against this Pokemon will always hit. Clears hazards on entry, but takes 1/8th HP in damage when doing so.",
    onModifyDefPriority: 6,
    onModifyDef(def) {
      return this.chainModify(2);
    },
    onModifySpDPriority: 5,
    onModifySpD(spd) {
      return this.chainModify(2);
    },
    onAnyAccuracy(accuracy, target, source, move) {
      if (!move || typeof accuracy !== "number" || move.category === "Status")
        return;
      return true;
    },
    onStart(pokemon) {
      let sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'mine'];
		 //Hazard immunity has to be manually added in moves.js by customizing the respective moves above to simply do nothing if the user holds this ability
      for (const condition of sideConditions) {
        if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
          this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] ability: Trash Compactor', '[of] ' + pokemon);
        }
      }
    },
    id: "crystalbarrier",
    name: "Crystal Barrier"
  },
  powershield: {
    shortDesc:
      "Incoming moves of over 90 base power have 90 base power instead.",
    onBasePowerPriority: 8,
    onSourceBasePower(basePower, attacker, defender, move) {
      if (basePower > 90) {
        return 90;
      }
    },
    id: "powershield",
    name: "Power Shield"
  },
  antidotation: {
    desc:
      "This Pokemon is immune to Poison-type moves and restores 1/4 of its maximum HP, rounded down, when hit by an Poison-type move. The Poisoning status can still be inflicted through non-Poison-type moves.",
    shortDesc:
      "This Pokemon heals 1/4 of its max HP when hit by Poison moves; Poison immunity.",
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Poison") {
        if (!this.heal(target.maxhp / 4)) {
          this.add("-immune", target, "[from] ability: Antidotation");
        }
        return null;
      }
    },
    id: "antidotation",
    name: "Antidotation"
  },
  chillingatmosphere: {
    desc:
      "On switch-in, this Pokemon lowers the Speed of adjacent opposing Pokemon by 1 stage. Pokemon behind a substitute are immune.",
    shortDesc:
      "On switch-in, this Pokemon lowers the Speed of adjacent opponents by 1 stage.",
    onStart(pokemon) {
      let activated = false;
      for (const target of pokemon.side.foe.active) {
        if (!target || !this.isAdjacent(target, pokemon)) continue;
        if (!activated) {
          this.add("-ability", pokemon, "Chilling Atmosphere", "boost");
          activated = true;
        }
        if (target.volatiles["substitute"]) {
          this.add("-immune", target);
        } else {
          this.boost({ spe: -1 }, target, pokemon);
        }
      }
    },
    id: "chillingatmosphere",
    name: "Chilling Atmosphere"
  },
  decayingdarkness: {
    desc:
      "Causes adjacent opposing Pokemon to lose 1/8 of their maximum HP, rounded down, at the end of each turn. This Pokemon is immune to Dark-type moves and restores 1/4 of its maximum HP, rounded down, when hit by an Dark-type move.",
    shortDesc:
      "Causes adjacent foes to lose 1/8 of their max HP at the end of each turn. This Pokemon heals 1/4 of its max HP when hit by Dark moves; Dark immunity. ",
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Dark") {
        if (!this.heal(target.maxhp / 4)) {
          this.add("-immune", target, "[from] ability: Decaying Darkness");
        }
        return null;
      }
    },
    onResidualOrder: 26,
    onResidualSubOrder: 1,
    onResidual(pokemon) {
      if (!pokemon.hp) return;
      for (const target of pokemon.side.foe.active) {
        if (!target || !target.hp) continue;
        this.damage(target.maxhp / 8, target, pokemon);
      }
    },
    id: "decayingdarkness",
    name: "Decaying Darkness"
  },
  powerofsummer: {
    shortDesc:
      "This Pokemon resists Fire, regardless of typing. x1.5 to all stats in Sun.",
    onModifyAtkPriority: 3,
    onModifyAtk(atk) {
      if (this.field.isWeather(["sunnyday", "desolateland"])) {
        return this.chainModify(1.5);
      }
    },
    onModifyDefPriority: 5,
    onModifyDef(def) {
      if (this.field.isWeather(["sunnyday", "desolateland"])) {
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(spa, pokemon) {
      if (this.field.isWeather(["sunnyday", "desolateland"])) {
        return this.chainModify(1.5);
      }
    },
    onModifySpDPriority: 4,
    onModifySpD(spd) {
      if (this.field.isWeather(["sunnyday", "desolateland"])) {
        return this.chainModify(1.5);
      }
    },
    onModifySpe(spe) {
      if (this.field.isWeather(["sunnyday", "desolateland"])) {
        return this.chainModify(1.5);
      }
    },
    onEffectiveness(typeMod, target, type, move) {
      if (!move || move.type !== "Fire") return typeMod;
      if (type !== target.types[0]) return 0;
      return -1;
    },
    id: "powerofsummer",
    name: "Power of Summer"
  },
  baneoflight: {
    desc:
      "This Pokemon's Dark-type attacks are super-effective against Fairy-types, and its Poison-type attacks are super-effective against Psychic-types.",
    shortDesc:
      "User's Dark- and Poison-type moves are SE against Fairy and Psychic, respectively.",
    onSourceEffectiveness(typeMod, target, type, move) {
      if (
        move &&
        ((type === "Fairy" && move.type === "Dark") ||
          (type === "Psychic" && move.type === "Poison"))
      )
        return 1;
      return typeMod;
    },
    id: "baneoflight",
    name: "Bane of Light"
  },
  fourofakind: {
    desc:
      "This Pokemon's damaging moves become multi-hit moves that hit four times. Does not affect moves that have multiple targets or moves that use the target's attacking stats instead of the user's.",
    shortDesc:
      "This Pokemon's damaging moves hit four times, but have x0.25 power and halved secondary chances.",
    onModifyMovePriority: -2,
    onModifyMove(move) {
      if (move.secondaries && move.multihitType === "parentalbond") {
        this.debug("halving secondary chance");
        for (const secondary of move.secondaries) {
          if (secondary.chance) secondary.chance /= 2;
        }
      }
    },
    onPrepareHit(source, target, move) {
      if (["iceball", "rollout"].includes(move.id)) return;
      if (
        move.category !== "Status" &&
        !move.selfdestruct &&
        !move.multihit &&
        !move.flags["charge"] &&
        !move.spreadHit &&
        !move.isZ
      ) {
        move.multihit = 4;
        move.multihitType = "parentalbond";
        if (move.secondaries) {
          this.debug("halving secondary chance");
          for (const secondary of move.secondaries) {
            if (secondary.chance) secondary.chance /= 2;
          }
        }
      }
    },
    onBasePowerPriority: 8,
    onBasePower(basePower, pokemon, target, move) {
      if (move.multihitType === "parentalbond") return this.chainModify(0.25);
    },
    onSourceModifySecondaries(secondaries, target, source, move) {
      if (
        move.multihitType === "parentalbond" &&
        move.id === "secretpower" &&
        move.hit < 4
      ) {
        // hack to prevent accidentally suppressing King's Rock/Razor Fang
        return secondaries.filter(effect => effect.volatileStatus === "flinch");
      }
    },
    id: "fourofakind",
    name: "Four of a Kind"
  },
  fourheads: {
    desc:
      "This Pokemon's damaging moves become multi-hit moves that hit four times. Does not affect moves that have multiple targets or moves that use the target's attacking stats instead of the user's.",
    shortDesc:
      "This Pokemon's damaging moves hit four times, but have x0.3 power and halved secondary chances.",
    onPrepareHit(source, target, move) {
      if (["iceball", "rollout"].includes(move.id)) return;
      if (
        move.category !== "Status" &&
        !move.selfdestruct &&
        !move.multihit &&
        !move.flags["charge"] &&
        !move.spreadHit &&
        !move.isZ
      ) {
        move.multihit = 4;
        move.multihitType = "fourheads";
        if (move.secondaries) {
          this.debug("halving secondary chance");
          for (const secondary of move.secondaries) {
            if (secondary.chance) secondary.chance /= 2;
          }
        }
      }
    },
    onBasePowerPriority: 8,
    onBasePower(basePower, pokemon, target, move) {
      if (move.multihitType === "fourheads") return this.chainModify(0.3);
    },
    onSourceModifySecondaries(secondaries, target, source, move) {
      if (
        move.multihitType === "fourheads" &&
        move.id === "secretpower" &&
        move.hit < 4
      ) {
        // hack to prevent accidentally suppressing King's Rock/Razor Fang
        return secondaries.filter(effect => effect.volatileStatus === "flinch");
      }
    },
    id: "fourheads",
    name: "Four Heads"
  },
  abilitytodestroyanything: {
    shortDesc:
      "Sniper + Sheer Force + Super Luck + This Pokemon's moves that would otherwise lack recoil now deal 25% of damage dealt back to the user.",
    onModifyMove(move, pokemon) {
      if (move.secondaries) {
        delete move.secondaries;
        // Technically not a secondary effect, but it is negated
        if (move.id === "clangoroussoulblaze") delete move.selfBoost;
        // Actual negation of `AfterMoveSecondary` effects implemented in scripts.js
        move.hasSheerForce = true;
      }
      if (!move.recoil) {
        move.recoil = [1, 4];
      }
    },
    onBasePowerPriority: 8,
    onBasePower(basePower, pokemon, target, move) {
      if (move.hasSheerForce) return this.chainModify([0x14cd, 0x1000]);
    },
    onModifyDamage(damage, source, target, move) {
      if (target.getMoveHitData(move).crit) {
        this.debug("Sniper boost");
        return this.chainModify(1.5);
      }
    },
    onModifyCritRatio(critRatio) {
      return critRatio + 1;
    },
    id: "abilitytodestroyanything",
    name: "Ability to Destroy Anything"
  },
  miner: {
    shortDesc:
      "This Pokemon's attacking stat is multiplied by 1.5 while using a Rock-type attack.",
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Rock") {
        this.debug("Miner boost (except not really because x1.5 multiplier)");
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Rock") {
        this.debug("Miner boost (except not really because x1.5 multiplier)");
        return this.chainModify(1.5);
      }
    },
    id: "miner",
    name: "Miner"
  },
  noncorporeal: {
    shortDesc:
      "This Pokemon can only be damaged by supereffective or Rock-type moves and indirect damage.",
    onTryHit(target, source, move) {
      if (
        target === source ||
        move.category === "Status" ||
        move.type === "???" ||
        move.type === "Rock" ||
        move.id === "struggle"
      )
        return;
      this.debug("Wonder Guard immunity: " + move.id);
      if (target.runEffectiveness(move) <= 0) {
        this.add("-immune", target, "[from] ability: Noncorporeal");
        return null;
      }
    },
    id: "noncorporeal",
    name: "Noncorporeal"
  },
  kalibersfury: {
    shortDesc: "Any attacks with 60 bp or less get a +1 to priority.",
    onModifyPriority: function(priority, pokemon, target, move, basePower) {
      if (move.category !== "Status" && move.basePower <= 60)
        return priority + 1;
    },
    id: "kalibersfury",
    name: "Kaliber's Fury"
  },
  unsteadyhood: {
    desc:
      "If this Pokemon is Hyness, the first hit taken in battle deals halved damage and causes a forme-change into Unhooded Hyness. Confusion damage also breaks the disguise.",
    shortDesc:
      "If this Pokemon is Hyness, the first hit taken in battle deals halved damage and causes a forme-change into Hyness-Unhooded.",
    onDamagePriority: 1,
    onDamage(damage, target, source, effect) {
      if (
        effect &&
        effect.effectType === "Move" &&
        target.template.speciesid === "hyness" &&
        !target.transformed
      ) {
        this.add("-activate", target, "ability: Unsteady Hood");
        this.effectData.busted = true;
        return damage / 2;
      }
    },
    onUpdate(pokemon) {
      if (pokemon.template.speciesid === "hyness" && this.effectData.busted) {
        pokemon.formeChange("Hyness-Unhooded", this.effect, true);
      }
    },
    id: "unsteadyhood",
    name: "Unsteady Hood"
  },
  moonstruckblossom: {
    desc:
      "This Pokemon's moon-based moves have their power multiplied by 1.5. Moonlight now restores 1.5x more HP. If this Pokemon is a Grass-type, then the weaknesses of said type are negated.",
    shortDesc:
      "x1.5 power to Moon moves; Moonlight heals 1.5x more HP to the user; Weaknesses from the Grass type are negated.",
    onBasePowerPriority: 8,
    onBasePower(basePower, attacker, defender, move) {
      if (
        ["moonblast", "moongeistbeam", "menacingmoonrazemaelstrom"].includes(
          move.id
        )
      ) {
        return this.chainModify(1.5);
      }
    },
    onTryHeal(damage, target, source, effect) {
      this.debug(
        "Heal is occurring: " + target + " <- " + source + " :: " + effect.id
      );
      if (effect.id === "moonlight") {
        return damage * 1.5;
      }
    },
    onEffectiveness(typeMod, target, type, move) {
      if (move && type === "Grass" && typeMod > 0) return 0;
    },
    id: "moonstruckblossom",
    name: "Moonstruck Blossom"
  },
  soul0system: {
    desc:
      "This Pokemon is immune to Ghost. If this Pokemon is Star Dream Soul 0S's Clockwork Star forme, a situation that would cause it to faint instead forme-changes it into Star Dream Soul 0S-Heart, restoring back to full HP. This Pokemon's Psychic-type moves become Ghost-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, but before Electrify's effects.",
    shortDesc:
      "This Pokemon's Psychic-type moves become Ghost type and have 1.2x power. This Pokemon is immune to Ghost. If Star Dream Soul 0S-Clockwork Star, becomes Star Dream Soul 0S-Heart when it would faint and restores to full HP.",
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Ghost") {
        this.add("-immune", target, "[from] ability: Soul 0 System");
        return null;
      }
    },
    onDamagePriority: -100,
    onDamage(damage, target, source, effect) {
      if (
        damage >= target.hp &&
        target.template.speciesid === "stardreamsoulosclockworkstar"
      ) {
        this.damage(target.hp - 1, target, target);
        target.formeChange(
          "Star Dream-Soul OS-Heart",
          this.effect,
          false,
          "[msg]"
        );
        this.heal(target.maxhp);
        return null;
      }
    },
    onModifyMovePriority: -1,
    onModifyMove(move, pokemon) {
      if (
        move.type === "Psychic" &&
        ![
          "judgment",
          "multiattack",
          "naturalgift",
          "revelationdance",
          "technoblast",
          "weatherball"
        ].includes(move.id) &&
        !(move.isZ && move.category !== "Status")
      ) {
        move.type = "Ghost";
        move.soul0SBoosted = true;
      }
    },
    onBasePowerPriority: 8,
    onBasePower(basePower, pokemon, target, move) {
      if (move.soul0SBoosted) return this.chainModify([0x1333, 0x1000]);
    },
    id: "soul0system",
    name: "Soul 0 System"
  },
  shadesoul: {
    desc:
      "If this Pokemon is The Knight, a situation that would cause it to faint instead forme-changes it into The Knight-Shade.",
    shortDesc:
      "If The Knight, becomes The Knight-Shade it would otherwise faint and restores to full HP.",
    onDamagePriority: -100,
    onDamage(damage, target, source, effect) {
      if (damage >= target.hp && target.template.speciesid === "theknight") {
        this.damage(target.hp - 1, target, target);
        target.formeChange("The Knight-Shade", this.effect, false, "[msg]");
        this.heal(target.maxhp);
        return null;
      }
    },
    id: "shadesoul",
    name: "Shade Soul"
  },
  physicalbreakdown: {
    desc:
      "If this Pokemon is the Chaos Kin, a situation that would cause it to faint instead forme-changes it into its ashen forme.",
    shortDesc:
      "If Chaos Kin, becomes Chaos Kin-Ash if it would otherwise faint and restores to half HP.",
    onDamagePriority: -100,
    onDamage(damage, target, source, effect) {
      if (damage >= target.hp && target.template.speciesid === "chaoskin") {
        this.damage(target.hp - 1, target, target);
        target.formeChange("Chaos Kin-Ash", this.effect, false, "[msg]");
        this.heal(target.maxhp / 2);
        return null;
      }
    },
    id: "physicalbreakdown",
    name: "Physical Breakdown"
  },
  lastditcheffort: {
    desc:
      "If this Pokemon is 0, a situation that would cause it to faint instead causes the iris to burst out, changing formes and restoring HP.",
    shortDesc:
      "If Zero (Kirby), becomes Zero-Iris if it would otherwise faint and restores to full HP.",
    onDamagePriority: -100,
    onDamage(damage, target, source, effect) {
      if (damage >= target.hp && target.template.speciesid === "zerokirby") {
        this.damage(target.hp - 1, target, target);
        target.formeChange("Zero-Iris", this.effect, false, "[msg]");
        this.heal(target.maxhp);
        return null;
      }
    },
    id: "lastditcheffort",
    name: "Last-Ditch Effort"
  },
  eternalbeauty: {
    desc:
      "This Pokemon's attacking stat is multiplied by 1.5 while using a Grass- or Fairy-type attack. If this Pokemon is Soul of Sectonia, she changes forme and unroots herself if she has 1/2 or less of her maximum HP. This check is done on switch-in and at the end of each turn. While in its Meteor Form, it cannot become affected by major status conditions. Moongeist Beam, Sunsteel Strike, and the Mold Breaker, Teravolt, and Turboblaze Abilities cannot ignore this Ability.",
    shortDesc:
      "This Pokemon's attacking stat is multiplied by 1.5 while using a Grass- or Fairy-type attack. If Sectonia-Soul, end of turn changes to Soul-Unrooted at 1/2 max HP or less.",
    onResidualOrder: 27,
    onResidual(pokemon) {
      if (
        pokemon.baseTemplate.baseSpecies !== "Sectonia" ||
        pokemon.transformed ||
        !pokemon.hp
      )
        return;
      if (pokemon.hp <= pokemon.maxhp / 2) {
        if (pokemon.template.speciesid === "sectoniasoul") {
          pokemon.formeChange("Sectonia-Soul-Unrooted");
        }
      }
    },
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Grass" || move.type === "Fairy") {
        this.debug("Eternal Beauty boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Grass" || move.type === "Fairy") {
        this.debug("Eternal Beauty boost");
        return this.chainModify(1.5);
      }
    },
    id: "eternalbeauty",
    name: "Eternal Beauty"
  },
  incorporeal: {
    shortDesc:
      "This Pokemon's attacks do not make contact with the target. Any moves that otherwise would have 1.2x power.",
    onModifyMove(move) {
      if (move.flags["contact"]) {
        delete move.flags["contact"];
        move.incorporealBoosted = true;
      }
    },
    onBasePowerPriority: 8,
    onBasePower(basePower, pokemon, target, move) {
      if (move.incorporealBoosted) return this.chainModify([0x1333, 0x1000]);
    },
    id: "incorporeal",
    name: "Incorporeal"
  },
  supercharge: {
    desc:
      "If this Pokemon is a Creeper and takes damage from an Electric-type Attack, it forme-changes into a Charged Creeper.",
    shortDesc:
      "If Creeper, forme-change into Creeper-Charged after taking damage from an Electric-type attack.",
    onAfterDamageOrder: 1,
    onAfterDamage(damage, target, source, move) {
      if (
        source &&
        source !== target &&
        move &&
        move.type === "Electric" &&
        target.template.speciesid === "creeper"
      ) {
        target.formeChange("Creeper-Charged", this.effect, false, "[msg]");
      }
    },
    id: "supercharge",
    name: "Supercharge"
  },
  kroganrage: {
    desc:
      "This Pokemon's Attack and Speed are both raised by 1 stage if it attacks and knocks out another Pokemon with a Physical attack.",
    shortDesc:
      "This Pokemon's Attack and Speed are raised by 1 stage if it attacks and KOes another Pokemon via Physical move.",
    onSourceFaint(target, source, effect) {
      if (
        effect &&
        effect.effectType === "Move" &&
        effect.category === "Physical"
      ) {
        this.boost({ atk: 1, spe: 1 }, source);
      }
    },
    id: "kroganrage",
    name: "Krogan Rage"
  },
  knightmare: {
    desc:
      "This Pokemon's slash-based moves deal x1.3 damage and bypass type-based immunities.",
    shortDesc:
      "This Pokemon's slash-based moves deal x1.3 damage and bypass immunities.",
    onModifyMovePriority: -1,
    onModifyMove(move, pokemon) {
      if (
        [
          "sacredsword",
          "leafblade",
          "cut",
          "nightslash",
          "crosspoison",
          "slash",
          "razorwind",
          "airslash",
          "furycutter",
          "falseswipe",
          "psychocut",
          "secretsword",
          "xscissor",
          "swordrainbeta",
          "machtornado",
          "solarblade",
          "invisibleair",
          "foilflourish",
          "zsaber",
          "risingphoenix",
          "chargedsaber",
          "dashslash",
          "greatslash",
          "cycloneslash",
          "swordofhisou",
          "excaliburswordofpromisedvictory",
          "rosaichthys",
          "underworldkingslash",
          "laevateinn",
          "demonicrend"
        ].includes(move.id)
      ) {
        move.ignoreImmunity = true;
        move.knightmareBoosted = true;
      }
    },
    onBasePowerPriority: 8,
    onBasePower(basePower, attacker, defender, move) {
      if (move.knightmareBoosted) {
        this.debug("Knightmare boost");
        return this.chainModify([0x14cd, 0x1000]);
      }
    },
    id: "knightmare",
    name: "Knightmare"
  },
  swordofswords: {
    shortDesc:
      "This Pokemon deals x1.33 damage with slash-based moves and takes x0.667 damage from slash-based moves.",
    onBasePowerPriority: 8,
    onAnyBasePower(basePower, attacker, defender, move) {
      if (
        move.flags['slash'] &&
        [attacker, defender].includes(this.effectData.target)
      ) {
        this.debug("Sword of Swords - Altering damage taken.");
        return this.chainModify([
          defender === this.effectData.target ? 0x0aac : 0x1547,
          0x1000
        ]);
      }
    },
    id: "swordofswords",
    name: "Sword of Swords"
  },
  swordspirit: {
    shortDesc:
      "This Pokemon deals x1.5 damage with slash-based moves and takes x0.5 damage from slash-based moves.",
    onModifyMovePriority: -1,
    onAnyModifyMove(move, pokemon) {
      if (
        [
          "sacredsword",
          "leafblade",
          "cut",
          "nightslash",
          "crosspoison",
          "slash",
          "razorwind",
          "airslash",
          "furycutter",
          "falseswipe",
          "psychocut",
          "secretsword",
          "xscissor",
          "swordrainbeta",
          "machtornado",
          "solarblade",
          "invisibleair",
          "foilflourish",
          "zsaber",
          "risingphoenix",
          "chargedsaber",
          "dashslash",
          "greatslash",
          "cycloneslash",
          "swordofhisou",
          "excaliburswordofpromisedvictory",
          "gladiusanusblauserium",
          "rosaichthys",
          "underworldkingslash",
          "laevateinn",
          "demonicrend"
        ].includes(move.id)
      ) {
        move.swordSpiritBoosted = true;
      }
    },
    onBasePowerPriority: 8,
    onAnyBasePower(basePower, attacker, defender, move) {
      if (
        move.swordSpiritBoosted &&
        [attacker, defender].includes(this.effectData.target)
      ) {
        this.debug("Sword Spirit - Altering damage taken.");
        return this.chainModify(
          defender === this.effectData.target ? 0.5 : 1.5
        );
      }
    },
    id: "swordspirit",
    name: "Sword Spirit"
  },
  saberclass: {
    shortDesc: "This Pokemon deals x1.33 damage with slash-based moves.",
    onBasePowerPriority: 8,
    onBasePower(basePower, attacker, defender, move) {
      if (
        [
          "sacredsword",
          "leafblade",
          "cut",
          "nightslash",
          "crosspoison",
          "slash",
          "razorwind",
          "airslash",
          "furycutter",
          "falseswipe",
          "psychocut",
          "secretsword",
          "xscissor",
          "swordrainbeta",
          "machtornado",
          "solarblade",
          "invisibleair",
          "foilflourish",
          "zsaber",
          "risingphoenix",
          "chargedsaber",
          "dashslash",
          "greatslash",
          "cycloneslash",
          "swordofhisou",
          "excaliburswordofpromisedvictory",
          "gladiusanusblauserium",
          "rosaichthys",
          "underworldkingslash",
          "laevateinn",
          "demonicrend"
        ].includes(move.id)
      ) {
        this.debug("Saber Class - Boosting Damage.");
        return this.chainModify([0x1547, 0x1000]);
      }
    },
    id: "saberclass",
    name: "Saber Class"
  },
  littlepests: {
    shortDesc: "This Pokemon's Attack is halved and its evasion is 1.25x.",
    onModifyAtkPriority: 5,
    onModifyAtk(atk) {
      return this.chainModify(0.5);
    },
    onModifyAccuracy(accuracy) {
      if (typeof accuracy === "number") return accuracy * 0.8;
    },
    id: "littlepests",
    name: "Little Pests"
  },
  inkysurge: {
    shortDesc: "On switch-in, this Pokemon summons Inky Terrain.",
    onStart(source) {
      this.field.setTerrain("inkyterrain");
    },
    id: "inkysurge",
    name: "Inky Surge"
  },
  paintedsoul: {
    desc:
      "This Pokemon's Normal-type moves become Ghost-type moves and have their power multiplied by 1.2. On switch-in, this Pokemon summons Inky Terrain.",
    shortDesc:
      "User's Normal-type moves become Ghost-type with 1.2x power. On switch-in, this Pokemon summons Inky Terrain.",
    onStart(source) {
      this.field.setTerrain("inkyterrain");
    },
    onModifyMovePriority: -1,
    onModifyMove(move, pokemon) {
      if (
        move.type === "Normal" &&
        ![
          "judgment",
          "multiattack",
          "naturalgift",
          "revelationdance",
          "technoblast",
          "weatherball"
        ].includes(move.id) &&
        !(move.isZ && move.category !== "Status")
      ) {
        move.type = "Ghost";
        move.paintedSoulBoosted = true;
      }
    },
    onBasePowerPriority: 8,
    onBasePower(basePower, pokemon, target, move) {
      if (move.paintedSoulBoosted) return this.chainModify([0x1333, 0x1000]);
    },
    id: "paintedsoul",
    name: "Painted Soul"
  },
  chemicalburn: {
    shortDesc:
      "User's Poison-type moves have halved secondary chances, but have a 30+% chance of inflicting burn. The more secondaries, the stronger the chance for burns",
    onModifyMovePriority: -2,
    onModifyMove(move) {
      if (!move || move.type !== "Poison") return;
      if (!move.secondaries) {
        move.secondaries = [];
      }
      this.debug("converting secondary chance");
      let burnchance = 30;
      for (const secondary of move.secondaries) {
        // This skips if there were no secondaries to begin with.
        if (secondary.chance) {
          secondary.chance /= 2;
          burnchance += secondary.chance;
        }
      }
      move.secondaries.push({
        chance: burnchance,
        status: "brn",
        ability: this.getAbility("chemicalburn")
      });
    },
    id: "chemicalburn",
    name: "Chemical Burn"
  },
  titanweaponry: {
    desc:
      "This Pokemon's Fire-, Water-, Electric-, and Poison-type attacks have their power multiplied by 1.3.",
    shortDesc:
      "This Pokemon's Fire/Electric/Water/Poison attacks have 1.3x power.",
    onBasePowerPriority: 8,
    onBasePower(basePower, attacker, defender, move) {
      if (["Fire", "Water", "Electric", "Poison"].includes(move.type)) {
        this.debug("Titan Weaponry boost");
        return this.chainModify([0x14cd, 0x1000]);
      }
    },
    id: "titanweaponry",
    name: "Titan Weaponry"
  },
  variability: {
    desc:
      "This Pokemon's moves that don't get STAB have their power multiplied by 1.3.",
    shortDesc: "This Pokemon's non-STAB attacks have 1.3x power.",
    onBasePowerPriority: 8,
    onBasePower(basePower, attacker, defender, move) {
      if (!attacker.hasType(move.type)) {
        this.debug("Variability boost");
        return this.chainModify([0x14cd, 0x1000]);
      }
    },
    id: "variability",
    name: "Variability"
  },
  soulofmadness: {
    desc:
      "This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects. Upon fainting, this Pokemon resets all adjacent opponents' positive stat boosts and inflicts -2 Def/SpD on them. Pokemon with Soundproof are immune to this effect.",
    shortDesc:
      "User's Normal-type moves become Ghost-type with 1.2x power. Upon fainting, opponents' positive boosts are negated, -2 Def/SpD",
    onFaint(pokemon) {
      for (const target of pokemon.side.foe.active) {
        if (!target || target.hasAbility("soundproof")) continue;
        let activated = false;
        for (const statName in target.boosts) {
          // @ts-ignore
          const stage = target.boosts[statName];
          if (stage > 0) {
            target.boosts[statName] = 0;
            activated = true;
          }
        }
        if (activated) this.add("-clearpositiveboost", target);
        this.boost({ def: -2, spd: -2 }, target, pokemon);
      }
    },
    id: "soulofmadness",
    name: "Soul of Madness"
  },
  avalon: {
    shortDesc:
      "At the end of every turn, this Pokemon restores 1/10 of its max HP.",
    onResidualOrder: 26,
    onResidualSubOrder: 1,
    onResidual(pokemon) {
      if (this.field.isTerrain("grassyterrain")) return;
      this.heal(pokemon.maxhp / 10);
    },
    onTerrain(pokemon) {
      if (!this.field.isTerrain("grassyterrain")) return;
      this.heal(pokemon.maxhp / 10);
    },
    id: "avalon",
    name: "Avalon"
  },
  hydrophobia: {
    desc:
      "This Pokemon is weak to Water-type moves. Resisting Water without this ability makes the Pokemon either take neutral damage from that type or, if doubly resisted, still resist it but take double damage. At the end of each turn, this Pokemon loses 1/8 of its maximum HP, rounded down, if the weather is Rain Dance.",
    shortDesc:
      "This Pokemon has an added weakness to Water; is hurt 1/8 by Rain.",
    onEffectiveness(typeMod, target, type, move) {
      return move && move.type === "Water" && target.types[0] === type
        ? typeMod + 1
        : typeMod;
    },
    onWeather(target, source, effect) {
      if (effect.id === "raindance" || effect.id === "primordialsea") {
        this.damage(target.maxhp / 8, target, target);
      }
    },
    isUnbreakable: true,
    id: "hydrophobia",
    name: "Hydrophobia"
  },
  sougenmu: {
    desc:
      "This Pokemon's damaging moves become multi-hit moves that hit twice. The second hit has its damage quartered, but no longer makes contact. Does not affect multi-hit moves or moves that have multiple targets.",
    shortDesc:
      "This Pokemon's damaging moves hit twice. The second hit has its damage quartered and does not make contact.",
    onPrepareHit(source, target, move) {
      if (["iceball", "rollout"].includes(move.id)) return;
      if (
        move.category !== "Status" &&
        !move.selfdestruct &&
        !move.multihit &&
        !move.flags["charge"] &&
        !move.spreadHit &&
        !move.isZ
      ) {
        move.multihit = 2;
        move.multihitType = "parentalbond";
      }
    },
    onBasePowerPriority: 8,
    onBasePower(basePower, pokemon, target, move) {
      if (move.multihitType === "parentalbond" && move.hit > 1)
        return this.chainModify(0.25);
    },
    onModifyMove(move, pokemon) {
      if (move.multihitType === "parentalbond" && move.hit > 1)
        delete move.flags["contact"];
    },
    onSourceModifySecondaries(secondaries, target, source, move) {
      if (
        move.multihitType === "parentalbond" &&
        move.id === "secretpower" &&
        move.hit < 2
      ) {
        // hack to prevent accidentally suppressing King's Rock/Razor Fang
        return secondaries.filter(effect => effect.volatileStatus === "flinch");
      }
    },
    id: "sougenmu",
    name: "Sougenmu"
  },
  fairyswarm: {
    desc:
      "This Pokemon is immune to the harmful effects of weather. Its damaging moves hit 6 times each with a base power of [BP/6 + 5] at above 50% of Max HP, ten times with BP of [BP/10 + 5] at <=25% of HP, and eight times with BP of [BP/8 + 5] otherwise. The latter effect does not affect multi-hit moves or moves that have multiple targets.",
    shortDesc:
      "This Pokemon is immune to harmful effects from weather. This Pokemon's damaging moves hit more for less damage each hit the lower its health is.",
    onPrepareHit(source, target, move) {
      if (["iceball", "rollout"].includes(move.id)) return;
      if (
        move.category !== "Status" &&
        !move.selfdestruct &&
        !move.multihit &&
        !move.flags["charge"] &&
        !move.spreadHit &&
        !move.isZ
      ) {
        if (source.hp * 2 > source.maxhp) {
          move.multihit = 6;
          move.multihitType = "fairyswarm6";
        } else if (source.hp * 4 > source.maxhp) {
          move.multihit = 8;
          move.multihitType = "fairyswarm8";
        } else {
          move.multihit = 10;
          move.multihitType = "fairyswarm10";
        }
      }
    },
    onSourceModifySecondaries(secondaries, target, source, move) {
      if (
        ["fairyswarm6", "fairyswarm8", "fairyswarm10"].includes(
          move.multihitType
        ) &&
        move.id === "secretpower" &&
        move.hit < 2
      ) {
        // hack to prevent accidentally suppressing King's Rock/Razor Fang
        return secondaries.filter(effect => effect.volatileStatus === "flinch");
      }
    },
    onImmunity(type, pokemon) {
      if (type === "sandstorm" || type === "hail") return false;
    },
    onBasePowerPriority: 8,
    onBasePower(basePower, attacker, defender, move) {
      //Case 1 is use of a Fire-type move in Rain or a Water-type move in Sun.
      //Case 2 is using Solar Blade in non-Sun weather.
      if (
        (this.field.isWeather("raindance") && move.type === "Fire") ||
        (this.field.isWeather("sunnyday") && move.type === "Water") ||
        (["solarblade", "solarbeam"].includes(move.id) &&
          this.field.isWeather([
            "sandstorm",
            "hail",
            "raindance",
            "primordialsea"
          ]))
      ) {
        basePower *= 2;
      }
      if (!move.multihit) return basePower;
      if (move.multihitType === "fairyswarm6") return basePower / 6 + 5;
      if (move.multihitType === "fairyswarm8") return basePower / 8 + 5;
      return move.multihitType === "fairyswarm10"
        ? basePower / 10 + 5
        : basePower;
    },
    //Synthesis/Morning Sun/Moonlight restore HP as if it's no weather out.
    onTryHeal(damage, target, source, effect) {
      this.debug(
        "Heal is occurring: " + target + " <- " + source + " :: " + effect.id
      );
      if (
        ["morningsun", "synthesis", "moonlight"].includes(effect.id) &&
        this.field.isWeather([
          "raindance",
          "primordialsea",
          "hail",
          "sandstorm"
        ])
      ) {
        return damage * 2;
      }
    },
    //Restore Thunder and Hurricane's accuracy in sun.
    onSourceModifyAccuracy(accuracy, target, source, move) {
      if (
        !this.field.isWeather(["sunnyday", "desolateland"]) ||
        typeof accuracy !== "number" ||
        !["thunder", "hurricane"].includes(move.id)
      )
        return;
      this.debug("fairy swarm - fixing accuracy");
      return accuracy * 1.4;
    },
    id: "fairyswarm",
    name: "Fairy Swarm"
  },

  scarlettemperament: {
    desc:
      "This Pokemon and its allies are immune to the harmful effects of weather, whereas any beneficial effects of weather for the opponents are negated. This Pokemon also has x1.5 Attack under Sunny Day, x1.5 SpD under Rain Dance, x1.5 Defense under Sandstorm, x1.5 Speed under Hail, and x2 to all stats under Delta Stream.",
    shortDesc:
      "This Pokemon and active teammates are immune to harmful effects from weather. Opponents' beneficial effects are negated. Powers up this Pokemon under weather.",
    //scripts.js/field implements how it basically becomes Air Lock once one on each side with this ability is in play.
    onFoeTryMove(target, source, effect) {
      if (
        target.side !== this.effectData.target.side &&
        effect.id === "auroraveil" &&
        this.field.isWeather("hail") &&
        effect.target !== "foeSide"
      ) {
        this.attrLastMove("[still]");
        this.add(
          "cant",
          this.effectData.target,
          "ability: Scarlet Temperament",
          effect,
          "[of] " + target
        );
        return false;
      }
    },
    onAllyImmunity(type, pokemon) {
      if (type === "sandstorm" || type === "hail") return false;
    },
    onBasePowerPriority: 8,
    onAnyBasePower(basePower, attacker, defender, move) {
      //Case 1 is use of a Fire-type move in Rain or a Water-type move in Sun.
      //Case 2 is using Solar Blade in non-Sun weather.
      if (attacker.side === this.effectData.target.side) {
        if (
          (attacker.effectiveWeather() == "raindance" &&
            move.type === "Fire") ||
          (attacker.effectiveWeather() == "sunnyday" &&
            move.type === "Water") ||
          (["solarblade", "solarbeam"].includes(move.id) &&
            this.field.isWeather([
              "sandstorm",
              "hail",
              "raindance",
              "primordialsea"
            ]))
        ) {
          basePower *= 2;
        }
      } else {
        if (
          (["raindance", "primordialsea"].includes(
            attacker.effectiveWeather()
          ) &&
            move.type === "Water") ||
          (this.field.isWeather(["sunnyday", "desolateland"]) &&
            move.type === "Fire")
        ) {
          basePower = (basePower * 2) / 3;
        } else if (
          this.field.isWeather("sandstorm") &&
          ["Rock", "Steel", "Ground"].includes(move.type) &&
          attacker.hasAbility("sandforce")
        ) {
          //Negate Sand Force.
          basePower = (basePower * 10) / 13;
        }
        if (
          move.id === "weatherball" &&
          this.field.isWeather([
            "sunnyday",
            "desolateland",
            "raindance",
            "primordialsea",
            "sandstorm",
            "hail"
          ])
        )
          basePower /= 2;
      }
      return basePower;
    },
    onModifyAtkPriority: 5,
    onAnyModifyAtk(atk, pokemon) {
      if (
        this.field.isWeather([
          "raindance",
          "primordialsea",
          "sunnyday",
          "desolateland"
        ]) &&
        pokemon.hasItem("utilityumbrella")
      )
        return;
      if (
        pokemon === this.effectData.target &&
        this.field.isWeather(["sunnyday", "desolateland", "deltastream"])
      ) {
        return this.chainModify(this.field.isWeather("deltastream") ? 2 : 1.5);
      }
      let enemyHasActiveFlowerGift = false;
      for (const target of this.effectData.target.side.foe.active) {
        if (!target) continue;
        if (
          target.hasAbility("flowergift") &&
          target.template.speciesid === "cherrimsunshine"
        ) {
          enemyHasActiveFlowerGift = true;
          break;
        }
      }
      if (
        this.field.isWeather(["sunnyday", "desolateland"]) &&
        this.effectData.target.side !== pokemon.side &&
        (enemyHasActiveFlowerGift || pokemon.hasAbility("powerofsummer"))
      ) {
        return this.chainModify([0x0aab, 0x1000]);
      }
    },
    onModifyMovePriority: -1,
    onAnyModifyMove(move, attacker, defender) {
      if (
        defender.side !== this.effectData.target.side &&
        defender.hasAbility("leafguard")
      ) {
        if (
          this.field.isWeather([
            "raindance",
            "primordialsea",
            "sunnyday",
            "desolateland"
          ]) &&
          defender.hasItem("utilityumbrella")
        )
          return;
        move.ignoreAbility = true;
      }
      if (
        attacker.side !== this.effectData.target.side &&
        move.id === "weatherball" &&
        move.type !== "Normal"
      ) {
        move.type = "Normal";
      }
    },
    onModifyDefPriority: 5,
    onAnyModifyDef(spd, pokemon) {
      if (
        this.field.isWeather([
          "raindance",
          "primordialsea",
          "sunnyday",
          "desolateland"
        ]) &&
        pokemon.hasItem("utilityumbrella")
      )
        return;
      if (
        this.field.isWeather(["sandstorm", "deltastream"]) &&
        this.effectData.target === pokemon
      ) {
        return this.chainModify(this.field.isWeather("sandstorm") ? 1.5 : 2);
      }
      if (
        this.field.isWeather(["sunnyday", "desolateland"]) &&
        this.effectData.target.side !== pokemon.side &&
        pokemon.hasAbility("powerofsummer")
      ) {
        return this.chainModify([0x0aab, 0x1000]);
      }
    },
    onModifySpAPriority: 5,
    onAnyModifySpA(spa, pokemon) {
      if (
        this.field.isWeather([
          "raindance",
          "primordialsea",
          "sunnyday",
          "desolateland"
        ]) &&
        pokemon.hasItem("utilityumbrella")
      )
        return;
      if (
        this.field.isWeather("deltastream") &&
        this.effectData.target === pokemon
      ) {
        return this.chainModify(2);
      }
      if (
        this.field.isWeather(["sunnyday", "desolateland"]) &&
        this.effectData.target.side !== pokemon.side &&
        pokemon.hasAbility("powerofsummer")
      ) {
        return this.chainModify([0x0aab, 0x1000]);
      }
    },
    onModifySpDPriority: 4,
    onAnyModifySpD(spd, pokemon) {
      if (
        this.effectData.target !== pokemon &&
        this.effectData.target.side === pokemon.side
      )
        return;
      if (
        this.field.isWeather([
          "raindance",
          "primordialsea",
          "sunnyday",
          "desolateland"
        ]) &&
        pokemon.hasItem("utilityumbrella")
      )
        return;
      if (
        this.field.isWeather("sandstorm") &&
        this.effectData.target.side !== pokemon.side
      ) {
        return this.chainModify([0x0aab, 0x1000]);
      }
      if (
        this.field.isWeather(["raindance", "primordialsea", "deltastream"]) &&
        this.effectData.target === pokemon
      ) {
        return this.chainModify(this.field.isWeather("deltastream") ? 2 : 1.5);
      }
      let enemyHasActiveFlowerGift = false;
      for (const target of this.effectData.target.side.foe.active) {
        if (!target) continue;
        if (
          target.hasAbility("flowergift") &&
          target.template.speciesid === "cherrimsunshine"
        ) {
          enemyHasActiveFlowerGift = true;
          break;
        }
      }
      if (
        this.field.isWeather(["sunnyday", "desolateland"]) &&
        this.effectData.target.side !== pokemon.side &&
        (enemyHasActiveFlowerGift || pokemon.hasAbility("powerofsummer"))
      ) {
        return this.chainModify([0x0aab, 0x1000]);
      }
    },
    //Synthesis/Morning Sun/Moonlight restore HP as if it's no weather out.
    onAnyTryHeal(damage, target, source, effect) {
      this.debug(
        "Heal is occurring: " + target + " <- " + source + " :: " + effect.id
      );
      if (
        this.field.isWeather([
          "raindance",
          "primordialsea",
          "sunnyday",
          "desolateland"
        ]) &&
        target.hasItem("utilityumbrella")
      )
        return;
      if (["morningsun", "synthesis", "moonlight"].includes(effect.id)) {
        if (
          target.side === this.effectData.target.side &&
          this.field.isWeather([
            "raindance",
            "primordialsea",
            "hail",
            "sandstorm"
          ])
        ) {
          return damage * 2;
        } else if (
          target.side !== this.effectData.target.side &&
          this.field.isWeather(["sunnyday", "desolateland"])
        ) {
          return (damage * 2) / 3;
        }
      } else if (
        target.side !== this.effectData.target.side &&
        this.field.isWeather("sandstorm") &&
        effect.id === "shoreup"
      ) {
        return (damage * 2) / 3;
      }
      if (
        this.effectData.target.side !== target.side &&
        ["icebody", "hydration", "dryskin"].includes(effect)
      )
        return 0;
    },
    onAnyModifySpe(spe, pokemon) {
      if (
        this.field.isWeather([
          "raindance",
          "primordialsea",
          "sunnyday",
          "desolateland"
        ]) &&
        pokemon.hasItem("utilityumbrella")
      )
        return;
      if (
        pokemon === this.effectData.target &&
        this.field.isWeather(["hail", "deltastream"])
      ) {
        return this.chainModify(this.field.isWeather("hail") ? 1.5 : 2);
      }
      if (pokemon.side !== this.effectData.target.side) {
        if (
          (pokemon.hasAbility("chlorophyll") &&
            this.field.isWeather(["sunnyday", "desolateland"])) ||
          (pokemon.hasAbility("swiftswim") &&
            this.field.isWeather(["raindance", "primordialsea"])) ||
          (pokemon.hasAbility("sandrush") &&
            this.field.isWeather("sandstorm")) ||
          (pokemon.hasAbility("slushrush") && this.field.isWeather("hail")) ||
          (pokemon.hasAbility("scarlettemperament") &&
            this.field.isWeather("deltastream"))
        ) {
          return this.chainModify(0.5);
        }
        if (
          pokemon.hasAbility("powerofsummer") &&
          this.field.isWeather(["sunnyday", "desolateland"])
        )
          return this.chainModify([0x0aab, 0x1000]);
      }
    },
    onAnyModifyAccuracy(accuracy, target, source, move) {
      if (source.side === this.effectData.target.side) {
        //Restore Thunder and Hurricane's accuracy in sun.
        if (
          this.field.isWeather([
            "raindance",
            "primordialsea",
            "sunnyday",
            "desolateland"
          ]) &&
          source.hasItem("utilityumbrella")
        )
          return;
        if (
          !this.field.isWeather(["sunnyday", "desolateland"]) ||
          typeof accuracy !== "number" ||
          !["thunder", "hurricane"].includes(move.id)
        )
          return;
        this.debug("fixing " + move.id + " accuracy");
        return accuracy * 1.4;
      }
      if (target.side !== this.effectData.target.side) {
        if (
          (target.hasAbility("sandveil") &&
            this.field.isWeather("sandstorm")) ||
          (target.hasAbility("snowcloak") && this.field.isWeather("hail"))
        )
          return accuracy * 0.8;
      }
    },
    onAllyDamage(damage, target, source, effect) {
      if (["solarpower", "dryskin", "hydrophobia"].includes(effect.id)) {
        return false;
      }
    },
    onFoeEffectiveness(typeMod, target, type, move) {
      if (
        type === "Flying" &&
        this.battle.getEffectiveness(move, type) > 0 &&
        this.field.isWeather("deltastream")
      )
        return 1;
      return typeMod;
    },
    isUnbreakable: true,
    id: "scarlettemperament",
    name: "Scarlet Temperament"
  },
  temperaturemanipulation: {
    desc:
      "Dewy's type changes to the current weather condition's type, excluding Sandstorm. In Sunny Day, Thunder and Hurricane ignore accuracy checks to hit the target.",
    shortDesc:
      "Dewy's type changes to the current weather condition's type, except Sandstorm. (Default Dew) Sun: Thunder and Hurricane have perfect accuracy.",
    onBeforeMovePriority: 0.5,
    onBeforeMove(attacker, defender, move) {
      if (attacker.template.baseSpecies !== "Dewy" || attacker.transformed)
        return;
      switch (move.type) {
        case "Water":
          this.field.setWeather("raindance");
          break;
        case "Ice":
          this.field.setWeather("hail");
          break;
        case "Electric":
          this.field.setWeather("sunnyday");
          break;
      }
    },
    onUpdate(pokemon) {
      if (pokemon.baseTemplate.baseSpecies !== "Dewy" || pokemon.transformed)
        return;
      let forme = null;
      switch (this.field.effectiveWeather()) {
        case "sunnyday":
        case "desolateland":
          if (pokemon.template.speciesid !== "dewymist") forme = "Dewy-Mist";
          break;
        case "hail":
          if (pokemon.template.speciesid !== "dewyice") forme = "Dewy-Ice";
          break;
        default:
          if (pokemon.template.speciesid !== "dewy") forme = "Dewy";
          break;
      }
      if (pokemon.isActive && forme) {
        pokemon.formeChange(forme, this.effect, false, "[msg]");
      }
    },
    onModifyAccuracyPriority: 10,
    onSourceModifyAccuracy(accuracy, target, source, move) {
      if (
        ["thunder", "hurricane"].includes(move.id) &&
        this.field.isWeather(["sunnyday", "desolateland"]) &&
        source.baseTemplate.baseSpecies === "Dewy" &&
        !source.transformed
      ) {
        return true;
      }
    },
    id: "temperaturemanipulation",
    name: "Temperature Manipulation"
  },
  barrierchange: {
    shortDesc:
      "Immune to Special Fire/Water+Ice/Electric/Dark moves with an exception specified in battle. Being hit by such a Special move re-randomizes the exception. Using a Special Fire/Water+Ice/Electric/Dark move changes the barrier to block its original weakspot but leave this Pokemon vulnerable to the Special Move's type",
    onStart(pokemon) {
      let possibleBlockedTypes = ["Fire", "Water", "Electric", "Dark"];
      this.effectData.vulnerableType = this.sample(possibleBlockedTypes);
      this.add(
        "-ability",
        pokemon,
        "Barrier Change (" + this.effectData.vulnerableType + ")"
      );
    },
    onHit(target, source, move) {
      if (!target.hp) return;
      if (
        move &&
        move.effectType === "Move" &&
        move.category === "Special" &&
        move.type === this.effectData.vulnerableType
      ) {
        let possibleVulnerableTypes = ["Fire", "Water", "Electric", "Dark"];
        let newPossibleVulnerableTypes = [];
        for (let i in possibleVulnerableTypes) {
          if (this.effectData.vulnerableType != i)
            newPossibleVulnerableTypes.push(i);
        }
        this.effectData.vulnerableType = this.sample(
          newPossibleVulnerableTypes
        );
        this.add(
          "-ability",
          target,
          "Barrier Change (" + this.effectData.vulnerableType + ")"
        );
      }
    },
    onTryHit(target, source, move) {
      if (
        target === source ||
        move.category !== "Special" ||
        move.id === "struggle"
      )
        return;
      let possibleBlockedTypes = ["Fire", "Water", "Ice", "Electric", "Dark"];
      if (
        possibleBlockedTypes.includes(move.type) &&
        (this.effectData.vulnerableType !== move.type ||
          (this.effectData.vulnerableType !== "Water" && move.type === "Ice"))
      ) {
        this.debug(
          "Barrier Change immunity: " +
            move.id +
            " (Vulnerable type should be " +
            this.effectData.vulnerableType +
            ")"
        );
        this.add("-immune", target, "[from] ability: Barrier Change");
        return null;
      }
    },
    isUnbreakable: true,
    id: "barrierchange",
    name: "Barrier Change"
  },
  brandoftheexalt: {
    shortDesc: "This Pokemon's critical hit ratio is raised by 2 stages.",
    onModifyCritRatio(critRatio) {
      return critRatio + 2;
    },
    id: "brandoftheexalt",
    name: "Brand of the Exalt"
  },

  foreseer: {
    desc:
      "This Pokemon's Normal-type moves become Psychic-type moves and have their power multiplied by 1.3. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
    shortDesc:
      "This Pokemon's Normal-type moves become Psychic type and have 1.3x power.",
    onModifyMovePriority: -1,
    onModifyMove(move, pokemon) {
      if (
        move.type === "Normal" &&
        ![
          "judgment",
          "multiattack",
          "naturalgift",
          "revelationdance",
          "technoblast",
          "weatherball"
        ].includes(move.id) &&
        !(move.isZ && move.category !== "Status")
      ) {
        move.type = "Psychic";
        move.foreseerBoosted = true;
      }
    },
    onBasePowerPriority: 8,
    onBasePower(basePower, pokemon, target, move) {
      if (move.foreseerBoosted) return this.chainModify([0x14cd, 0x1000]);
    },
    id: "foreseer",
    name: "Foreseer"
  },
  rosesthorns: {
    shortDesc:
      "This Pokemon's allies have the power of their attacks x1.5 and receive x0.8 damage from attacks.",
    onAnyBasePowerPriority: 8,
    onAnyBasePower(basePower, attacker, defender, move) {
      if (
        [attacker, defender].includes(this.effectData.target) &&
        attacker.side !== defender.side
      )
        return;
      if (
        attacker.side === this.effectData.target.side &&
        this.isAdjacent(attacker, this.effectData.target)
      ) {
        return this.chainModify([
          defender.side === this.effectData.target.side &&
          this.isAdjacent(defender, this.effectData.target)
            ? 0x1333
            : 0x1800,
          0x1000
        ]);
      } else if (
        defender.side === this.effectData.target.side &&
        this.isAdjacent(defender, this.effectData.target)
      ) {
        this.debug("Rose's Thorns reduction");
        return this.chainModify([0x0ccd, 0x1000]);
      }
    },
    id: "rosesthorns",
    name: "Rose's Thorns"
  },
  underworldknight: {
    desc:
      "This Pokemon is immune to Ghost-type moves. The first time it is hit by a Ghost-type move, its attacking stat is multiplied by 1.5 while using a Ghost-type attack as long as it remains active and has this Ability.",
    shortDesc:
      "This Pokemon's Ghost attacks do 1.5x damage if hit by one Ghost move; Ghost immunity.",
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Ghost") {
        move.accuracy = true;
        if (!target.addVolatile("underworldknight")) {
          this.add("-immune", target, "[from] ability: Underworld Knight");
        }
        return null;
      }
    },
    onEnd(pokemon) {
      pokemon.removeVolatile("underworldknight");
    },
    effect: {
      noCopy: true, // doesn't get copied by Baton Pass
      onStart(target) {
        this.add("-start", target, "ability: Underworld Knight");
      },
      onModifyAtkPriority: 5,
      onModifyAtk(atk, attacker, defender, move) {
        if (move.type === "Ghost") {
          this.debug("Underworld Knight boost");
          return this.chainModify(1.5);
        }
      },
      onModifySpAPriority: 5,
      onModifySpA(atk, attacker, defender, move) {
        if (move.type === "Ghost") {
          this.debug("Underworld Knight boost");
          return this.chainModify(1.5);
        }
      },
      onEnd(target) {
        this.add("-end", target, "ability: Underworld Knight", "[silent]");
      }
    },
    id: "underworldknight",
    name: "Underworld Knight"
  },
  ultimatedetective: {
    shortDesc:
      "On switch-in, this Pokemon identifies the held items, abilities, and a single move of each opposing Pokemon.",
    onStart(pokemon) {
      for (const target of pokemon.side.foe.active) {
        if (!target || target.fainted) continue;
        this.add("-ability", target, target.getAbility().name);
        const warnMoveName = this.sample(target.moveSlots);
        this.add(
          "-activate",
          pokemon,
          "ability: Ultimate Detective",
          warnMoveName,
          "[of] " + target
        );
        if (target.item) {
          this.add(
            "-item",
            target,
            target.getItem().name,
            "[from] ability: Ultimate Detective",
            "[of] " + pokemon,
            "[identify]"
          );
        }
      }
    },
    id: "ultimatedetective",
    name: "Ultimate Detective"
  },

  //These vanilla abilities are overridden, though mostly just to account for custom elements (For instance, Damp blocking Creeper Blast, etc.)

  mummy: {
    desc:
      "Pokemon making contact with this Pokemon have their Ability changed to Mummy. Does not affect the Battle Bond, Comatose, Disguise, Multitype, Power Construct, RKS System, Schooling, Shields Down, Stance Change, and Zen Mode Abilities.",
    shortDesc:
      "Pokemon making contact with this Pokemon have their Ability changed to Mummy.",
    id: "mummy",
    name: "Mummy",
    onAfterDamage(damage, target, source, move) {
      if (
        source &&
        source !== target &&
        move &&
        move.flags["contact"] &&
        source.ability !== "mummy"
      ) {
        let oldAbility = source.setAbility("mummy", target);
        if (oldAbility) {
          this.add(
            "-activate",
            target,
            "ability: Mummy",
            this.getAbility(oldAbility).name,
            "[of] " + source
          );
        }
      }
    },
    onBasePower(basePower, pokemon, target, move) {
      if (move.multihitType === "parentalbond" && move.hit > 1)
        return this.chainModify(0.25);
      if (move.multihitType === "fourheads" && move.hit > 1)
        return this.chainModify(0.3);
      if (move.multihitType === "fairyswarm6" && move.hit > 1)
        return basePower / 6 + 5;
      if (move.multihitType === "fairyswarm8" && move.hit > 1)
        return basePower / 8 + 5;
      if (move.multihitType === "fairyswarm10" && move.hit > 1)
        return basePower / 10 + 5;
    },
    rating: 2.5,
    num: 152
  },
  damp: {
    desc:
      "While this Pokemon is active, Explosion, Mind Blown, Self-Destruct, and the Aftermath Ability are prevented from having an effect.",
    shortDesc:
      "Prevents Explosion/Mind Blown/Self-Destruct/Creeper Blast/Aftermath while this Pokemon is active.",
    id: "damp",
    onAnyTryMove(target, source, effect) {
      if (
        [
          "explosion",
          "mindblown",
          "selfdestruct",
          "creeperblast",
          "crash"
        ].includes(effect.id)
      ) {
        this.attrLastMove("[still]");
        this.add(
          "cant",
          this.effectData.target,
          "ability: Damp",
          effect,
          "[of] " + target
        );
        return false;
      }
    },
    onAnyDamage(damage, target, source, effect) {
      if (effect && effect.id === "aftermath") {
        return false;
      }
    },
    name: "Damp",
    rating: 1,
    num: 6
  },
  //Expanded abilities start here.

  cursed: {
    shortDesc:
      "This Pokemon hits Fairy super-effectively with Dark moves, but is weak to Water and takes an additional 2x damage.",
    onSourceEffectiveness(typeMod, target, type, move) {
      if (move && (type === "Fairy" && move.type === "Dark")) return 1;
      return typeMod;
    },
    onEffectiveness(typeMod, target, type, move) {
      if (move && move.type === "Water")
        return target.types[0] === type ? 1 : 0;
      return typeMod;
    } /* I don't know how to force a 4x weakness so I'm going to do a pro gamer move */,
    onSourceModifyAtkPriority: 6,
    onSourceModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Water") {
        this.debug("Cursed strengthen");
        return this.chainModify(2);
      }
    },
    onSourceModifySpAPriority: 5,
    onSourceModifySpA(atk, attacker, defender, move) {
      if (move.type === "Water") {
        this.debug("Cursed strengthen");
        return this.chainModify(2);
      }
    },
    id: "cursed",
    name: "Cursed"
  },
  voiceless: {
    shortDesc: "Punching moves 1.2x power, sound moves Physical.",
    onBasePowerPriority: 8,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["punch"]) {
        this.debug("voiceless boost");
        return this.chainModify(1.2);
      }
    },
    onModifyMove(move) {
      if (move.flags["sound"] && move.category !== "Status") {
        move.category = "Physical";
        delete move.flags["sound"];
      }
    },
		onBeforeMovePriority: 9,
		onBeforeMove(pokemon) {
			if (move.flags["sound"] && move.category == "Status") {
				this.add('cant', pokemon, 'ability: voiceless');
				return false;
			}
		},
    id: "voiceless",
    name: "voiceless"
  },
	trashcompactor: {
    desc:
      "On switch-in, removes hazards. The user is also immune to all hazards",
    shortDesc:
      "On switch-in, removes hazards. User is immune to such",
    onStart(pokemon) {
      let sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'mine'];
		 //Hazard immunity has to be manually added in moves.js by customizing the respective moves above to simply do nothing if the user holds this ability
      for (const condition of sideConditions) {
        if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
          this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] ability: Trash Compactor', '[of] ' + pokemon);
        }
      }
    },
    id: "trashcompactor",
    name: "Trash Compactor"
},
  aimforthehead: {
    desc:
      "If this Pokemon is at full HP, it survives one hit with at least 1 HP. OHKO moves fail when used against this Pokemon.",
    shortDesc:
      "If this Pokemon is at full HP, it survives one hit with at least 1 HP. Perfect evasion against OHKO.",
    onTryHit(pokemon, target, move) {
      if (move.ohko) {
        this.add("-immune", pokemon, "[from] ability: Aim For The Head");
        return null;
      }
    },
    onDamagePriority: -100,
    onDamage(damage, target, source, effect) {
      if (
        target.hp === target.maxhp &&
        damage >= target.hp &&
        effect &&
        effect.effectType === "Move"
      ) {
        this.add("-ability", target, "Aim For The Head");
        return target.hp - 1;
      }
    },
    id: "aimforthehead",
    name: "Aim For The Head",
  },
	charisma: {
		shortDesc: "This Pokemon's allies have the base power of their moves multiplied by 1.3.",
		onAllyBasePowerPriority: 8,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (attacker !== this.effectData.target) {
				this.debug('Charisma boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		id: "charisma",
		name: "Charisma",
	},
  masterchampion: {
    shortDesc:
      "This Pokemon deals x1.33 damage with punch-based moves and takes x0.667 damage from punch-based moves.",
    onBasePowerPriority: 8,
    onAnyBasePower(basePower, attacker, defender, move) {
        if ((move.flags['punch']) &&
        [attacker, defender].includes(this.effectData.target))
		{
			this.debug("Master Champion - Altering damage taken.");
			return this.chainModify([
			  defender === this.effectData.target ? 0x0aac : 0x1547,
			  0x1000
			]);
		}
    },
    id: "masterchampion",
    name: "Master Champion"
  },
	breathoftheearth: {
		desc: "This Pokemon is immune to Ground-type and Rock-type moves, and is always treated as grounded.",
		shortDesc: "Immune to Ground and Rock. Grounded.",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Breath of the Earth');
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ground' || move.type === 'Rock') {
				return null;
			}
		},
		/* TODO: add groundedness, also do the summon earth spirit thing whenever that's added */
		id: "breathoftheearth",
		name: "Breath of the Earth",
	},
	affectionofthegoddess: {
		desc: "This Pokemon's damaging moves become multi-hit moves that hit twice. The second hit has its damage quartered. Does not affect multi-hit moves or moves that have multiple targets.",
		shortDesc: "This Pokemon's damaging moves hit twice. The second hit has its damage quartered.",
		onPrepareHit(source, target, move) {
			if (['iceball', 'rollout'].includes(move.id)) return;
			if (move.category !== 'Status' && !move.selfdestruct && !move.multihit && !move.flags['charge'] && !move.spreadHit && !move.isZ) {
				move.multihit = 2;
				move.multihitType = 'parentalbond';
			}
		},
		onBasePowerPriority: 8,
		onBasePower(basePower, pokemon, target, move) {
			if (move.multihitType === 'parentalbond' && move.hit > 1) return this.chainModify(0.25);
		},
		onSourceModifySecondaries(secondaries, target, source, move) {
			if (move.multihitType === 'parentalbond' && move.id === 'secretpower' && move.hit < 2) {
				// hack to prevent accidentally suppressing King's Rock/Razor Fang
				return secondaries.filter(effect => effect.volatileStatus === 'flinch');
			}
		},
		id: "affectionofthegoddess",
		name: "Affection of the Goddess",
	},
	swarmingminions: {
		desc: "This Pokemon's damaging moves become multi-hit moves that hit twice. The second hit has its damage quartered. Does not affect multi-hit moves or moves that have multiple targets.",
		shortDesc: "This Pokemon's damaging moves hit twice. The second hit has its damage quartered.",
		onPrepareHit(source, target, move) {
			if (['iceball', 'rollout'].includes(move.id)) return;
			if (move.category !== 'Status' && !move.selfdestruct && !move.multihit && !move.flags['charge'] && !move.spreadHit && !move.isZ) {
				move.multihit = 2;
				move.multihitType = 'parentalbond';
			}
		},
		onBasePowerPriority: 8,
		onBasePower(basePower, pokemon, target, move) {
			if (move.multihitType === 'parentalbond' && move.hit > 1) return this.chainModify(0.25);
		},
		onSourceModifySecondaries(secondaries, target, source, move) {
			if (move.multihitType === 'parentalbond' && move.id === 'secretpower' && move.hit < 2) {
				// hack to prevent accidentally suppressing King's Rock/Razor Fang
				return secondaries.filter(effect => effect.volatileStatus === 'flinch');
			}
		},
		id: "swarmingminions",
		name: "Swarming Minions",
	},
	"nowifi": {
		desc: "While this Pokemon is active, Abilities of Electric-type Pokemon have no effect. Does not affect the Battle Bond, Comatose, Disguise, Gulp Missile, Ice Face, Multitype, Power Construct, RKS System, Schooling, Shields Down, Stance Change, or Zen Mode Abilities.",
		shortDesc: "While this Pokemon is active, Abilities of Electric-types have no effect.",
		// Ability suppression implemented in scripts/pokemon:ignoringAbility
		// TODO Will abilities that already started start again? (Intimidate seems like a good test case)
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'No Wi-Fi');
			pokemon.abilityData.ending = false;
		},
		onEnd(source) {
			// FIXME this happens before the pokemon switches out, should be the opposite order.
			// Not an easy fix since we cant use a supported event. Would need some kind of special event that
			// gathers events to run after the switch and then runs them when the ability is no longer accessible.
			// (If your tackling this, do note extreme weathers have the same issue)

			// Mark this pokemon's ability as ending so Pokemon#ignoringAbility skips it
			source.abilityData.ending = true;
			for (const pokemon of this.getAllActive()) {
				if (pokemon !== source && pokemon.hasType('Electric')) {
					// Will be suppressed by Pokemon#ignoringAbility if needed
					this.singleEvent('Start', pokemon.getAbility(), pokemon.abilityData, pokemon);
				}
			}
		},
		id: "nowifi",
		name: "No Wi-Fi",
	},
	"hunger": {
		shortDesc: "On switch-in, this Pokemon's Attack and Speed are halved for 5 turns.",
		onStart(pokemon) {
			pokemon.addVolatile('hunger');
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['hunger'];
			this.add('-end', pokemon, 'Hunger', '[silent]');
		},
		onEatItem(item, pokemon) {
			pokemon.addVolatile('hunger');
		},
		effect: {
			duration: 10,
			onStart(target) {
				this.add('-start', target, 'ability: Hunger');
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.heal(pokemon.baseMaxhp / 16);
			},
			onEnd(target) {
				this.add('-end', target, 'Hunger');
			},
		},

		onResidualOrder: 6,
		onResidual(pokemon) {
			if (!pokemon.volatiles['hunger']) {
				this.add('-activate', pokemon, 'ability: Hunger');
				this.damage(pokemon.baseMaxhp / 16, pokemon, pokemon);
			}
		},
		id: "hunger",
		name: "Hunger",
	},
	"dimensionalmastery": {
		desc: "The duration of Gravity, Heal Block, Magic Room, Safeguard, Tailwind, Trick Room, and Wonder Room is increased by 2 turns if the effect is started by this Pokemon.",
		shortDesc: "When used, Gravity/Heal Block/Safeguard/Tailwind/Room effects last 2 more turns.",
		id: "dimensionalmastery",
		name: "Dimensional Mastery",
		// implemented in the corresponding move
	},
	"zeusthunder": {
		desc: "When using Thunder, additionally uses Bulk Up.",
		shortDesc: "When using Thunder, additionally uses Bulk Up.",
		onAnyDamage(damage, target, source, effect) {
			if (effect && effect.id === 'thunder' && source.hasAbility('zeusthunder')) {
                		this.useMove('Bulk Up', source);
			}
		},
		onAnyAfterSubDamage(damage, target, source, effect) {
			if (effect && effect.id === 'thunder' && source.hasAbility('zeusthunder')) {
                		this.useMove('Bulk Up', source);
			}
		},
		id: "zeusthunder",
		name: "Zeus Thunder",
	},
	"eightgates": {
		desc: "If the user is Might Guy, changes form at the end of each full turn on the field.",
		shortDesc: "Might Guy: change form at the end of each turn.",
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (!pokemon.isActive || pokemon.baseTemplate.baseSpecies !== 'Might Guy' || pokemon.transformed) return;
			if (pokemon.template.speciesid == 'mightguyeighthgate' || !pokemon.activeTurns) return;
			switch (pokemon.template.speciesid){
				case 'mightguyseventhgate':	
					pokemon.formeChange('Might Guy-Eighth Gate', this.effect, false, '[msg]');	
					break;
				case 'mightguysixthgate':	
					pokemon.formeChange('Might Guy-Seventh Gate', this.effect, false, '[msg]');	
					break;
				case 'mightguyfifthgate':	
					pokemon.formeChange('Might Guy-Sixth Gate', this.effect, false, '[msg]');	
					break;
				case 'mightguyfourthgate':	
					pokemon.formeChange('Might Guy-Fifth Gate', this.effect, false, '[msg]');	
					break;
				case 'mightguythirdgate':	
					pokemon.formeChange('Might Guy-Fourth Gate', this.effect, false, '[msg]');	
					break;
				case 'mightguysecondgate':	
					pokemon.formeChange('Might Guy-Third Gate', this.effect, false, '[msg]');	
					break;
				case 'mightguyfirstgate':	
					pokemon.formeChange('Might Guy-Second Gate', this.effect, false, '[msg]');
					break;
				default:	//Nothing else.
					pokemon.formeChange('Might Guy-First Gate', this.effect, false, '[msg]');
					break;
			}
		},
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if ((move.recoil || move.hasCustomRecoil) && ['mightguyfourthgate', 'mightguyfifthgate', 'mightguysixthgate', 'mightguyseventhgate', 'mightguyeightgate'].includes(attacker.template.speciesid)) {
				this.debug('Reckless boost');
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		id: "eightgates",
		name: "Eight Gates",
	},
	"subzero": {
		desc: "At the end of each turn, this Pokemon restores 1/8 of its maximum HP, rounded down, if the weather is Hail, and loses 1/8 of its maximum HP, rounded down, if the weather is Sunny Day. If this Pokemon is holding Utility Umbrella, the effects of weather are nullified.",
		shortDesc: "This Pokemon is healed 1/8 by Hail; is hurt 1/8 by Sun.",
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'hail') {
				this.heal(target.baseMaxhp / 8);
			} else if (effect.id === 'sunnyday' || effect.id === 'desolateland') {
				this.damage(target.baseMaxhp / 8, target, target);
			}
		},
		id: "subzero",
		name: "Sub-Zero",
	},
	"allforone": {
		desc: "On switch-in, or when this Pokemon acquires this ability, this Pokemon copies a random adjacent opposing Pokemon's Ability and then suppresses that Pokemon's ability. However, if one or more adjacent Pokemon has the Ability \"No Ability\", Trace won't copy anything even if there is another valid Ability it could normally copy. Otherwise, if there is no Ability that can be copied at that time, this Ability will activate as soon as an Ability can be copied. Abilities that cannot be copied are the previously mentioned \"No Ability\", as well as Comatose, Disguise, Flower Gift, Forecast, Gulp Missile, Hunger Switch, Ice Face, Illusion, Imposter, Multitype, Schooling, Stance Change, Trace, and Zen Mode.",
		shortDesc: "On switch-in, or when it can, this Pokemon copies a random adjacent foe's Ability, and then suppresses that foe's ability.",
		onStart(pokemon) {
			if (pokemon.side.foe.active.some(foeActive => foeActive && this.isAdjacent(pokemon, foeActive) && foeActive.ability === 'noability')) {
				this.effectData.gaveUp = true;
			}
		},
		onUpdate(pokemon) {
			if (!pokemon.isStarted || this.effectData.gaveUp) return;
			let possibleTargets = pokemon.side.foe.active.filter(foeActive => foeActive && this.isAdjacent(pokemon, foeActive));
			while (possibleTargets.length) {
				let rand = 0;
				if (possibleTargets.length > 1) rand = this.random(possibleTargets.length);
				let target = possibleTargets[rand];
				let ability = target.getAbility();
				let bannedAbilities = ['noability', 'battlebond', 'comatose', 'disguise', 'flowergift', 'forecast', 'gulpmissile', 'hungerswitch', 'iceface', 'illusion', 'imposter', 'multitype', 'powerconstruct', 'powerofalchemy', 'receiver', 'rkssystem', 'schooling', 'shieldsdown', 'stancechange', 'trace', 'zenmode'];
				if (bannedAbilities.includes(target.ability)) {
					possibleTargets.splice(rand, 1);
					continue;
				}
				this.add('-ability', pokemon, ability, '[from] ability: All for One', '[of] ' + target);
				pokemon.setAbility(ability);
				target.setAbility('noability');
				return;
			}
		},
		id: "allforone",
		name: "All For One",
	},
};
