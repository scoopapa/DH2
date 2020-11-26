'use strict';

exports.BattleMovedex = {
  "fakeout": {
    inherit: true,
    type: "Fighting",
  },
  "return": {
    inherit: true,
    type: "Fairy",
  },
  "frustration": {
    inherit: true,
    type: "Dark",
  },
  "boomburst": {
    inherit: true,
    type: "Flying",
  },
  "hypervoice": {
    inherit: true,
    type: "Dragon",
  },
  "relicsong": {
    inherit: true,
    type: "Fairy",
  },
  "stomp": {
    inherit: true,
    type: "Ground",
  },
  "doubleedge": {
    inherit: true,
    type: "Steel",
  },
  "lastresort": {
    inherit: true,
    type: "Dark",
  },
  "slash": {
    inherit: true,
    type: "Steel",
  },
  "triattack": {
    inherit: true,
    type: "Electric",
  },
  "hyperbeam": {
    inherit: true,
    type: "Dark",
  },
  "gigaimpact": {
    inherit: true,
    type: "Dark",
  },
  "rockclimb": {
    inherit: true,
    type: "Bug",
  },
  "roar": {
    inherit: true,
    type: "Dragon",
  },
  "swordsdance": {
    inherit: true,
    type: "Steel",
  },
  "shellsmash": {
    inherit: true,
    type: "Rock",
  },
  "hornattack": {
    inherit: true,
    type: "Bug",
  },
  "bodyslam": {
    inherit: true,
    type: "Ground",
  },
  "retaliate": {
    inherit: true,
    type: "Dark",
  },
  "protect": {
    inherit: true,
    type: "Psychic",
  },
  "recover": {
    inherit: true,
    type: "Psychic",
  },
  "slackoff": {
    inherit: true,
    type: "Ground",
  },
  "headcharge": {
    inherit: true,
    type: "Ground",
  },
  "judgment": {
    inherit: true,
    type: "Fairy",
  },
  "crushgrip": {
    inherit: true,
    type: "Ground",
  },
  "crushclaw": {
    inherit: true,
    type: "Dark",
  },
  "stockpile": {
    inherit: true,
    type: "Grass",
  },
  "swallow": {
    inherit: true,
    type: "Poison",
  },
  "spitup": {
    inherit: true,
    type: "Poison",
  },
  "extremespeed": {
    inherit: true,
    type: "Fire",
  },
  "weatherball": {
    inherit: true,
    type: "Flying",
  },
  "snore": {
    inherit: true,
    type: "Psychic",
  },
  "bellydrum": {
    inherit: true,
    type: "Dragon",
  },
  "sleeptalk": {
    inherit: true,
    type: "Psychic",
  },
  "softboiled": {
    inherit: true,
    type: "Fairy",
  },
  "facade": {
    inherit: true,
    type: "Fighting",
  },
  "explosion": {
    inherit: true,
    type: "Fire",
  },
  "selfdestruct": {
    inherit: true,
    type: "Fire",
  },
  "tailslap": {
    inherit: true,
    type: "Fairy",
  },
  "batonpass": {
    inherit: true,
    type: "Psychic",
  },
  "whirlwind": {
    inherit: true,
    type: "Flying",
  },
  "camouflage": {
    inherit: true,
    desc: "The user's type changes based on the battle terrain. Ground type on the regular Wi-Fi terrain, Electric type during Electric Terrain, Fairy type during Misty Terrain, Grass type during Grassy Terrain, and Psychic type during Psychic Terrain. Fails if the user's type cannot be changed or if the user is already purely that type.",
    shortDesc: "Changes user's type by terrain (default Ground).",
    onHit(target) {
      let newType = 'Ground';
      if (this.field.isTerrain('electricterrain')) {
        newType = 'Electric';
      } else if (this.field.isTerrain('grassyterrain')) {
        newType = 'Grass';
      } else if (this.field.isTerrain('mistyterrain')) {
        newType = 'Fairy';
      } else if (this.field.isTerrain('psychicterrain')) {
        newType = 'Psychic';
      }
      
      if (target.getTypes().join() === newType || !target.setType(newType)) return false;
      this.add('-start', target, 'typechange', newType);
    },
    type: "Ghost",
  },
  "wringout": {
    inherit: true,
    type: "Grass",
  },
  "spikecannon": {
    inherit: true,
    type: "Ground",
  },
  "rapidspin": {
    inherit: true,
    type: "Fighting",
  },
  "conversion": {
    inherit: true,
    type: "Electric",
  },
  "conversion2": {
    inherit: true,
    type: "Electric",
  },
  "sharpen": {
    inherit: true,
    type: "Steel",
  },
  "metronome": {
    inherit: true,
    type: "Psychic",
  },
  "covet": {
    inherit: true,
    type: "Fairy",
  },
  "quickattack": {
    inherit: true,
    type: "Electric",
  },
  "round": {
    inherit: true,
    type: "Flying",
  },
  "workup": {
    inherit: true,
    type: "Fairy",
  },
  "superfang": {
    inherit: true,
    type: "Dark",
  },
  "hyperfang": {
    inherit: true,
    type: "Dark",
  },
  "disable": {
    inherit: true,
    type: "Psychic",
  },
  "present": {
    inherit: true,
    type: "Ice",
  },
  "smellingsalts": {
    inherit: true,
    type: "Fighting",
  },
  "secretpower": {
    inherit: true,
    type: "Psychic",
  },
  "lovelykiss": {
    inherit: true,
    type: "Dark",
  },
  "milkdrink": {
    inherit: true,
    type: "Fairy",
  },
  "sing": {
    inherit: true,
    type: "Fairy",
  },
  "eggbomb": {
    inherit: true,
    type: "Fire",
  },
  "barrage": {
    inherit: true,
    type: "Grass",
  },
  "dizzypunch": {
    inherit: true,
    type: "Psychic",
  },
  "sketch": {
    inherit: true,
    type: "Psychic",
  },
  "glare": {
    inherit: true,
    type: "Poison",
  },
  "psychup": {
    inherit: true,
    type: "Psychic",
  },
  "endeavor": {
    inherit: true,
    type: "Fighting",
  },
  "flail": {
    inherit: true,
    type: "Dark",
  },
  "technoblast": {
    inherit: true,
    type: "Steel",
  },
  "uproar": {
    inherit: true,
    type: "Dragon",
  },
  "acupressure": {
    inherit: true,
    type: "Psychic",
  },
  "entrainment": {
    inherit: true,
    type: "Fairy",
  },
  "yawn": {
    inherit: true,
    type: "Fairy",
  },
  "wish": {
    inherit: true,
    type: "Fairy",
  },
  "doublehit": {
    inherit: true,
    type: "Dark",
  },
  "headbutt": {
    inherit: true,
    type: "Rock",
  },
  "echoedvoice": {
    inherit: true,
    type: "Flying",
  },
  "vicegrip": {
    inherit: true,
    type: "Bug",
  },
  "substitute": {
    inherit: true,
    type: "Poison",
  },
  "tickle": {
    inherit: true,
    type: "Fairy",
  },
  "teeterdance": {
    inherit: true,
    type: "Psychic",
  },
  "simplebeam": {
    inherit: true,
    type: "Psychic",
  },
  "feint": {
    inherit: true,
    type: "Fighting",
  },
  "struggle": {
    inherit: true,
    type: "Fairy",
  },
  "skullbash": {
    inherit: true,
    type: "Rock",
  },
  "followme": {
    inherit: true,
    type: "Fairy",
  },
  "transform": {
    inherit: true,
    type: "Psychic",
  },
  "smokescreen": {
    inherit: true,
    type: "Poison",
  },
  "splash": {
    inherit: true,
    type: "Water",
  },
  "trumpcard": {
    inherit: true,
    type: "Fighting",
  },
  "takedown": {
    inherit: true,
    type: "Rock",
  },
  "thrash": {
    inherit: true,
    type: "Dark",
  },
  "razorwind": {
    inherit: true,
    type: "Steel",
  },
  "naturalgift": {
    inherit: true,
    type: "Grass",
  },
  "afteryou": {
    inherit: true,
    type: "Fairy",
  },
  "assist": {
    inherit: true,
    type: "Fairy",
  },
  "attract": {
    inherit: true,
    type: "Fairy",
  },
  "focusenergy": {
    inherit: true,
    type: "Fighting",
  },
  "tackle": {
    inherit: true,
    type: "Ground",
  },
  "strength": {
    inherit: true,
    type: "Rock",
  },
  "payday": {
    inherit: true,
    type: "Dark",
  },
  "sonicboom": {
    inherit: true,
    type: "Steel",
  },
  "lockon": {
    inherit: true,
    type: "Steel",
  },
  "morningsun": {
    inherit: true,
    type: "Fire",
  },
  "painsplit": {
    inherit: true,
    type: "Ghost",
  },
  "scaryface": {
    inherit: true,
    type: "Ghost",
  },
  "wrap": {
    inherit: true,
    type: "Poison",
  },
  "scratch": {
    inherit: true,
    type: "Bug",
  },
  "megakick": {
    inherit: true,
    type: "Fighting",
  },
  "horndrill": {
    inherit: true,
    type: "Steel",
  },
  "foresight": {
    inherit: true,
    desc: "As long as the target remains active, its evasiveness stat stage is ignored during accuracy checks against it if it is greater than 0, and Fighting-type attacks can hit the target if it is a Ghost type. Fails if the target is already affected, or affected by Foresight or Miracle Eye.",
    shortDesc: "Fighting hits Ghost. Evasiveness ignored.",
    condition: {
      noCopy: true,
      onStart(pokemon) {
        this.add('-start', pokemon, 'Foresight');
      },
      onNegateImmunity(pokemon, type) {
        if (pokemon.hasType('Ghost') && type === 'Fighting') return false;
      },
      onModifyBoost(boosts) {
        if (boosts.evasion && boosts.evasion > 0) {
          boosts.evasion = 0;
        }
      },
    },
    type: "Psychic",
  },
  "sweetscent": {
    inherit: true,
    type: "Grass",
  },
  "nobleroar": {
    inherit: true,
    type: "Fire",
  },
  "playnice": {
    inherit: true,
    type: "Fairy",
  },
  "bide": {
    inherit: true,
    type: "Rock",
  },
  "megapunch": {
    inherit: true,
    type: "Fighting",
  },
  "bind": {
    inherit: true,
    type: "Poison",
  },
  "perishsong": {
    inherit: true,
    type: "Ghost",
  },
  "bestow": {
    inherit: true,
    type: "Ice",
  },
  "odorsleuth": {
    inherit: true,
    desc: "As long as the target remains active, its evasiveness stat stage is ignored during accuracy checks against it if it is greater than 0, and Fighting-type attacks can hit the target if it is a Ghost type. Fails if the target is already affected, or affected by Foresight or Miracle Eye.",
    shortDesc: "Fighting hits Ghost. Evasiveness ignored.",
    type: "Bug",
  },
  "slam": {
    inherit: true,
    type: "Grass",
  },
  "happyhour": {
    inherit: true,
    type: "Dark",
  },
  "guillotine": {
    inherit: true,
    type: "Steel",
  },
  "chipaway": {
    inherit: true,
    type: "Fighting",
  },
  "pound": {
    inherit: true,
    type: "Fighting",
  },
  "cometpunch": {
    inherit: true,
    type: "Fighting",
  },
  "block": {
    inherit: true,
    type: "Rock",
  },
  "growth": {
    inherit: true,
    type: "Grass",
  },
  "minimize": {
    inherit: true,
    type: "Psychic",
  },
  "recycle": {
    inherit: true,
    type: "Psychic",
  },
  "rage": {
    inherit: true,
    type: "Dark",
  },
  "holdback": {
    inherit: true,
    type: "Fighting",
  },
  "falseswipe": {
    inherit: true,
    type: "Steel",
  },
  "hiddenpower": {
    inherit: true,
    type: "Fairy",
  },
  "screech": {
    inherit: true,
    type: "Ghost",
  },
  "luckychant": {
    inherit: true,
    type: "Fairy",
  },
  "mimic": {
    inherit: true,
    type: "Psychic",
  },
  "copycat": {
    inherit: true,
    type: "Fairy",
  },
  "furyattack": {
    inherit: true,
    type: "Flying",
  },
  "furyswipes": {
    inherit: true,
    type: "Steel",
  },
  "tailwhip": {
    inherit: true,
    type: "Fairy",
  },
  "swagger": {
    inherit: true,
    type: "Dark",
  },
  "supersonic": {
    inherit: true,
    type: "Electric",
  },
  "safeguard": {
    inherit: true,
    type: "Psychic",
  },
  "swift": {
    inherit: true,
    type: "Fairy",
  },
  "constrict": {
    inherit: true,
    type: "Water",
  },
  "doubleslap": {
    inherit: true,
    type: "Fairy",
  },
  "cut": {
    inherit: true,
    type: "Steel",
  },
  "captivate": {
    inherit: true,
    type: "Fairy",
  },
  "celebrate": {
    inherit: true,
    type: "Fairy",
  },
  "confide": {
    inherit: true,
    type: "Dark",
  },
  "defensecurl": {
    inherit: true,
    type: "Rock",
  },
  "doubleteam": {
    inherit: true,
    type: "Ghost",
  },
  "encore": {
    inherit: true,
    type: "Fairy",
  },
  "endure": {
    inherit: true,
    type: "Fighting",
  },
  "flash": {
    inherit: true,
    type: "Electric",
  },
  "growl": {
    inherit: true,
    type: "Fairy",
  },
  "harden": {
    inherit: true,
    type: "Rock",
  },
  "healbell": {
    inherit: true,
    type: "Steel",
  },
  "helpinghand": {
    inherit: true,
    type: "Fairy",
  },
  "holdhands": {
    inherit: true,
    type: "Fairy",
  },
  "howl": {
    inherit: true,
    type: "Fire",
  },
  "leer": {
    inherit: true,
    type: "Dark",
  },
  "meanlook": {
    inherit: true,
    type: "Ghost",
  },
  "mindreader": {
    inherit: true,
    type: "Fighting",
  },
  "naturepower": {
    inherit: true,
    type: "Grass",
  },
  "reflecttype": {
    inherit: true,
    type: "Psychic",
  },
  "refresh": {
    inherit: true,
    type: "Psychic",
  },
  "laserfocus": {
    inherit: true,
    type: "Fighting",
  },
  "multiattack": {
    inherit: true,
    type: "Null",
  },
  "revelationdance": {
    inherit: true,
    type: "Flying",
  },
  "spotlight": {
    inherit: true,
    type: "Fairy",
  },
  "mefirst": {
    inherit: true,
    type: "Dark",
  },
  "tearfullook": {
    inherit: true,
    type: "Water",
  },
  "pulverizingpancake": {
    inherit: true,
    type: "Dark",
  },
  "breakneckblitz": {
    inherit: true,
    type: "Null",
  },
  "veeveevolley": {
    inherit: true,
    type: "Fairy",
  },
  "courtchange": {
    inherit: true,
    type: "Ground",
  },
  "maxstrike": {
    inherit: true,
    type: "Null",
  },
  "stuffcheeks": {
    inherit: true,
    type: "Grass",
  },
  "teatime": {
    inherit: true,
    type: "Water",
  },
  "gmaxgoldrush": {
    inherit: true,
    type: "Dark",
  },
  "gmaxreplenish": {
    inherit: true,
    type: "Grass",
  },
  "gmaxcuddle": {
    inherit: true,
    type: "Fairy",
  },
  "roost": {
    inherit: true,
    desc: "The user restores 1/2 of its maximum HP, rounded half up. Until the end of the turn, Flying-type users lose their Flying type and pure Flying-type users become Ground type. Does nothing if the user's HP is full.",
    condition: {
      duration: 1,
      onResidualOrder: 20,
      onStart(target) {
        this.add('-singleturn', target, 'move: Roost');
      },
      onTypePriority: -1,
      onType(types, pokemon) {
        this.effectData.typeWas = types;
        return types.filter(type => type !== 'Flying').map(type => type === "Normal" ? "Ground" : type);
      },
    },
  },
};