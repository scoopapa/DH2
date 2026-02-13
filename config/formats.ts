// Note: This is the list of formats
// Refactor: Import from mod folders (@iforgetwhyimhere, 02.--.26)
// DO NOT DELETE THE IMPORTS.

// Imports all formats from their folder, to be used as aliases.
import { format as AlternatiumEX               } from '../data/mods/alternatiumex/format';
import { format as Gen533Valuemons             } from '../data/mods/gen5valuemons/format';
import { format as AbilityPos                  } from '../data/mods/abilitypos/format';
import { format as AGoldenExperienceOU         } from '../data/mods/agoldenexperience/formats/format-ou';
import { format as AGoldenExperienceUU         } from '../data/mods/agoldenexperience/formats/format-uu';
import { format as AGoldenExperienceRU         } from '../data/mods/agoldenexperience/formats/format-ru';
import { format as AGoldenExperienceNU         } from '../data/mods/agoldenexperience/formats/format-nu';
import { format as AGoldenExperienceDoubles    } from '../data/mods/agoldenexperience/formats/format-doubles';
import { format as Alternatium                 } from '../data/mods/alternatium/format';
import { format as Animemons                   } from '../data/mods/animemons/format';
import { format as BackToSinnogh               } from '../data/mods/backtosinnoh/format';
import { format as BadNBoosted                 } from '../data/mods/badnboosted/format';
import { format as Balls                       } from '../data/mods/balls/format';
import { format as BanHammersC3                } from '../data/mods/banhammersc3/format';
import { format as Beaftopia                   } from '../data/mods/beaftopia/format';
import { format as BearticPhone                } from '../data/mods/bearticphone/format';
import { format as BlackMarket                 } from '../data/mods/blackmarket/format';
import { format as BlankCanvasA                } from '../data/mods/blankcanvas/format-meta-a';
import { format as BlankCanvasB                } from '../data/mods/blankcanvas/format-meta-b';
import { format as BlankCanvasC                } from '../data/mods/blankcanvas/format-meta-c';
import { format as BookOfEnigmas               } from '../data/mods/bookofenigmas/format';
import { format as BreedingVariants            } from '../data/mods/breedingvariants/format';
import { format as BreedingVariantsNatDex      } from '../data/mods/breedingvariantsnatdex/format';
import { format as BustAMove                   } from '../data/mods/bustamove/format';
import { format as ccapm2022                   } from '../data/mods/ccapm2022/format';
import { format as ccapm2024                   } from '../data/mods/ccapm2024/format';
import { format as ccapm2024rands              } from '../data/mods/ccapm2024/format-randoms';
import { format as ChatBats                    } from '../data/mods/chatbats/format';
import { format as ClubmonsRequiem             } from '../data/mods/clubmonsrequiem/format';
import { format as CommunityUsed2              } from '../data/mods/communityused2/format';
import { format as CommunityUsed2Randoms       } from '../data/mods/communityused2/format-randoms';
import { format as Conquestdex                 } from '../data/mods/conquestdex/format';
import { format as CleanSlateMicro2            } from '../data/mods/csm2/format';
import { format as DenseAF                     } from '../data/mods/denseaf/format';
import { format as DLCmons                     } from '../data/mods/dlcmons/format';
import { format as DLCmonsVGC                  } from '../data/mods/dlcmons/format-vgc';
import { format as Dollhouse                   } from '../data/mods/dollhouse/format';
import { format as Dondozo                     } from '../data/mods/dondozo/format';
import { format as DoNotUse                    } from '../data/mods/donotuse/format';
import { format as DoNotUsetPMtM               } from '../data/mods/donotusetmptm/format';
import { format as DoNotUseUU                  } from '../data/mods/donotuseuu/format';
import { format as DoNotUseVGC                 } from '../data/mods/donotusevgc/format';
import { format as DoNotUseRandoms             } from '../data/mods/donotuse/format-randoms';
import { format as doubletrouble               } from '../data/mods/doubletrouble/format';
import { format as duomod                      } from '../data/mods/duomod/format';
import { format as earthsky                    } from '../data/mods/earthsky/format';
import { format as EbbAndFlow                  } from '../data/mods/ebbandflow/format';
import { format as EliminationWar              } from '../data/mods/eliminationwar/format';
import { format as emamod                      } from '../data/mods/emamod/format';
import { format as Eramons                     } from '../data/mods/eramons/format';
import { format as EternalPokemon              } from '../data/mods/eternalpokemon/format';
import { format as evolutionproject            } from '../data/mods/evolutionproject/format';
import { format as ExtremeReboot               } from '../data/mods/extremereboot/format';
import { format as fakemonfrontier             } from '../data/mods/fakemonfrontier/format';
import { format as FusionEvoCorruptCouncil     } from '../data/mods/fecc/format';
import { format as forgottenmons               } from '../data/mods/forgottenmons/format';
import { format as furfrou                     } from '../data/mods/furfrou/format';
import { format as BlindsidedA                 } from '../data/mods/g9blindsided/format-group-a';
import { format as BlindsidedB                 } from '../data/mods/g9blindsided/format-group-b';
import { format as BlindsidedC                 } from '../data/mods/g9blindsided/format-group-c';
import { format as BlindsidedDraft             } from '../data/mods/g9blindsided/format-draft';
import { format as gen9duomod                  } from '../data/mods/g9duomod/format';
import { format as gen1                        } from '../data/mods/gen1/format';
import { format as gen1Azure                   } from '../data/mods/gen1azure/format';
import { format as gen1BacktothePast           } from '../data/mods/gen1backtothepast/format';
import { format as gen1Burgundy                } from '../data/mods/gen1burgundy/format';
import { format as gen1expansionpack           } from '../data/mods/gen1expansionpack/format';
import { format as gen1FutureProofing          } from '../data/mods/gen1futureproofing/format';
import { format as gen1johtomons               } from '../data/mods/gen1johtomons/format';
import { format as gen1jumpstarted             } from '../data/mods/gen1jumpstarted/format';
import { format as gen1metronome               } from '../data/mods/gen1metronome/format';
import { format as gen1moonside                } from '../data/mods/gen1moonside/format';
import { format as gen1rbycap                  } from '../data/mods/gen1rbycap/format';
import { format as gen1recolored               } from '../data/mods/gen1recolored/format';
import { format as gen1stadium                 } from '../data/mods/gen1stadium/format';
import { format as gen1tradebacksexpanded      } from '../data/mods/gen1tradebacksexpanded/format';
import { format as gen1violetversion           } from '../data/mods/gen1violetversion/format';
import { format as gen2                        } from '../data/mods/gen2/format';
import { format as gen2crystallegacy           } from '../data/mods/gen2crystallegacy/format';
import { format as gen2CrystalSeviiIslands     } from '../data/mods/gen2crystalseviiislands/format';
import { format as gen2doubles                 } from '../data/mods/gen2doubles/format';
import { format as gen2expansionpack           } from '../data/mods/gen2expansionpack/format';
import { format as gen2stadium2                } from '../data/mods/gen2stadium2/format';
import { format as gen2teracrystal             } from '../data/mods/gen2teracrystal/format';
import { format as gen3                        } from '../data/mods/gen3/format';
import { format as gen3advdeluxe               } from '../data/mods/gen3advdx/format';
import { format as gen3advdeluxedoubles        } from '../data/mods/gen3advplus/format-doubles';
import { format as gen3advplus                 } from '../data/mods/gen3advplus/format';
import { format as gen3advToThePast            } from '../data/mods/gen3advttp/format';
import { format as gen3colosseum               } from '../data/mods/gen3colosseum/format';
import { format as gen3HoennEchoes             } from '../data/mods/gen3hoennechoes/format';
import { format as gen3HoennGaiden             } from '../data/mods/gen3hoenngaiden/format';
import { format as gen3ourstb                  } from '../data/mods/gen3ourstb/format';
import { format as gen3ShadowColosseum         } from '../data/mods/gen3shadowcolosseum/format';
import { format as gen3tradebacks              } from '../data/mods/gen3tradebacks/format';
import { format as gen3uuhoenngaiden           } from '../data/mods/gen3uuhoenngaiden/format';
import { format as gen4                        } from '../data/mods/gen4/format';
import { format as gen4pt                      } from '../data/mods/gen4pt/format';
import { format as gen5                        } from '../data/mods/gen5/format';
import { format as gen5bw1                     } from '../data/mods/gen5bw1/format';
import { format as gen5BestWishesYoshiblaze    } from '../data/mods/gen5unovayb/format';
import { format as gen6                        } from '../data/mods/gen6/format';
import { format as gen6megasrevisited          } from '../data/mods/gen6megasrevisited/format';
import { format as gen6mixandmegasrevisited    } from '../data/mods/gen6mixandmegasrevisited/format';
import { format as gen6xy                      } from '../data/mods/gen6xy/format';
import { format as gen7                        } from '../data/mods/gen7/format';
import { format as gen7letsgo                  } from '../data/mods/gen7letsgo/format';
import { format as gen7sm                      } from '../data/mods/gen7sm/format';
import { format as gen8                        } from '../data/mods/gen8/format';
import { format as gen8bdsp                    } from '../data/mods/gen8bdsp/format';
import { format as gen8dlc1                    } from '../data/mods/gen8dlc1/format';
import { format as gen8FusionEvolutionUU       } from '../data/mods/gen8feuu/format';
import { format as gen8FusionEvolutionRU       } from '../data/mods/gen8feuu/format-ru';
import { format as gen8FusionEvolutionNU       } from '../data/mods/gen8feuu/format-nu';
import { format as gen8haxmeters               } from '../data/mods/gen8haxmeters/format';
import { format as gen8lucklessplay            } from '../data/mods/gen8lucklessplay/format';
import { format as gen8maxmeter                } from '../data/mods/gen8maxmeter/format';
import { format as gen9                        } from '../data/mods/gen9/format';
import { format as gen9crossoverchaos          } from '../data/mods/gen9crossoverchaos/format';
import { format as gen9crossoverchaosc         } from '../data/mods/gen9crossoverchaosc/format';
import { format as gen9dlc1                    } from '../data/mods/gen9dlc1/format';
import { format as gen9evolutionproject        } from '../data/mods/gen9evolutionproject/format';
import { format as gen9FusionEvolution         } from '../data/mods/gen9fe/format';
import { format as gen9FusionEvolutionRands    } from "../data/mods/gen9fe/format-randoms"
import { format as gen9FusionEvolutionUU       } from "../data/mods/gen9fe/format-uu";
import { format as gen9FusionEvolutionR        } from '../data/mods/gen9ferestrictions/format';
import { format as gen9FusionEvolutionVGC      } from '../data/mods/gen9fevgc/format';
import { format as gen9multiverse              } from '../data/mods/gen9multiverse/format';
import { format as gen9predlc                  } from '../data/mods/gen9predlc/format';
import { format as gen9ssb                     } from '../data/mods/gen9ssb/format';
import { format as gen9strong                  } from '../data/mods/gen9strong/format';
import { format as gen9UberMons                } from '../data/mods/gen9ubermons/format';
import { format as gen9Vaporemons              } from '../data/mods/gen9vaporemons/format';
import { format as gen9vgc20xx                 } from '../data/mods/gen9vgc20xx/format';
import { format as Gen6NextOU                  } from '../data/mods/gennext/format';
import { format as genXBrunicaOU               } from '../data/mods/genxdesvega/format-ou';
import { format as genXBrunicaUber             } from '../data/mods/genxbrunica/format-uber';
import { format as genXDesvegaOU               } from '../data/mods/genxdesvega/format-ou';
import { format as genXDesvegaUber             } from '../data/mods/genxdesvega/format-uber';
import { format as genxloria                   } from '../data/mods/genxloria/format';
import { format as Glacemons                   } from '../data/mods/glacemons/format';
import { format as GlacemonsUber               } from '../data/mods/glacemonsuber/format';
import { format as haxmeters                   } from '../data/mods/haxmeters/format';
import { format as hiddengems                  } from '../data/mods/hiddengems/format';
import { format as hideandseaking              } from '../data/mods/hideandseaking/format';
import { format as hideandseakingslate5clauses } from '../data/mods/hideandseakingslate5clauses/format';
import { format as iforgor                     } from '../data/mods/iforgor/format';
import { format as imando                      } from '../data/mods/imando/format';
import { format as ironfist                    } from '../data/mods/ironfist/format';
import { format as Ironmons                    } from '../data/mods/ironmons/format';
import { format as jollymod                    } from '../data/mods/jollymod/format';
import { format as JoltemonsOU                 } from '../data/mods/joltemons/formats/format-ou';
import { format as JoltemonsUU                 } from '../data/mods/joltemons/formats/format-uu';
import { format as JoltemonsRU                 } from '../data/mods/joltemons/formats/format-ru';
import { format as JoltemonsNU                 } from '../data/mods/joltemons/formats/format-nu';
import { format as kaensdex                    } from '../data/mods/kaensdex/format';
import { format as kitchen                     } from '../data/mods/kitchen/format';
import { format as legendshoopa                } from '../data/mods/legendshoopa/format';
import { format as letsgo                      } from '../data/mods/letsgo/format';
import { format as LittleColosseum             } from '../data/mods/littlecolosseum/format';
import { format as littleestcup                } from '../data/mods/littleestcup/format';
import { format as littlestcup                 } from '../data/mods/littlestcup/format';
import { format as lucklessplay                } from '../data/mods/lucklessplay/format';
import { format as lukemod                     } from '../data/mods/lukemod/format';
import { format as gen9MegasForAll             } from '../data/mods/m4ag9/format';
import { format as MegasForAllKalos            } from '../data/mods/m4akalos/format';
import { format as MegasForAllKalosVGC         } from '../data/mods/m4akalos/format-vgc';
import { format as MegasForAllPaldea           } from '../data/mods/m4apaldea/format';
import { format as MegasForAllPaldeaVGC        } from '../data/mods/m4apaldea/format-vgc';
import { format as m4asandbox                  } from '../data/mods/m4asandbox/format';
import { format as gen8MegasForAllv6           } from '../data/mods/m4av6/format';
import { format as gen8MegasForAllv6VGC        } from '../data/mods/m4av6/format-vgc';
import { format as maadowr                     } from '../data/mods/maadowr/format';
import { format as maadowrlostzone             } from '../data/mods/maadowrlostzone/format';
import { format as Masquerade                  } from '../data/mods/masquerade/format';
import { format as megamania                   } from '../data/mods/megamania/format';
import { format as metamons                    } from '../data/mods/metamons/format';
import { format as mixandmega                  } from '../data/mods/mixandmega/format';
import { format as mixandmegaballs             } from '../data/mods/mixandmegaballs/format';
import { format as mixandmegasforall           } from '../data/mods/mixandmegasforall/format';
import { format as MicrometaMafia2             } from '../data/mods/mmm2/format';
import { format as MicrometaMafia3             } from '../data/mods/mmm3/format';
import { format as moderngen1                  } from '../data/mods/moderngen1/format';
import { format as moderngen2                  } from '../data/mods/moderngen2/format';
import { format as moderngen2birds             } from '../data/mods/moderngen2birds/format';
import { format as moderngen3                  } from '../data/mods/moderngen3/format';
import { format as moderngen4                  } from '../data/mods/moderngen4/format';
// Monster Hunter
import { format as MonsterHunterAG             } from '../data/mods/monsterhunter/formats/format-ag';
import { format as MonsterHunterOU             } from '../data/mods/monsterhunter/formats/format-ou';
import { format as MonsterHunterUU             } from '../data/mods/monsterhunter/formats/format-uu';
import { format as MonsterHunterRU             } from '../data/mods/monsterhunter/formats/format-ru';
import { format as MonsterHunterDoubles        } from '../data/mods/monsterhunter/formats/format-doubles';
import { format as MonsterHunterFFA            } from '../data/mods/monsterhunter/formats/format-freeforall';
import { format as MonsterHunterFFARands       } from '../data/mods/monsterhunter/formats/format-ffarands';
import { format as MonsterHunterDoublesRands   } from '../data/mods/monsterhunter/formats/format-randoms-dubs';
import { format as MonsterHunterVGC            } from '../data/mods/monsterhunter/formats/format-vgc';
import { format as MonsterHunterRandoms        } from '../data/mods/monsterhunter/formats/format-randoms';
// Enough Monster Hunter
import { format as monsterhunterousolopliii    } from '../data/mods/monsterhuntersl/format-solopliii';
// Fuck
import { format as morebalancedhackmons        } from '../data/mods/morebalancedhackmons/format';
import { format as naturalselection            } from '../data/mods/naturalselection/format';
import { format as notmytype                   } from '../data/mods/notmytype/format';
import { format as outheorymons                } from '../data/mods/outheorymons/format';
import { format as paleomons                   } from '../data/mods/paleomons/format';
import { format as patratdex                   } from '../data/mods/patratdex/format';
// import { format as placeholder              } from '../data/mods/placeholder/format'; // Placeholder import
import { format as plza                        } from '../data/mods/plza/format';
import { format as pokebilities                } from '../data/mods/pokebilities/format';
import { format as pokebilitiesbanhammers      } from '../data/mods/pokebilitiesbanhammers/format';
import { format as pokemonorthsoutheastwest    } from '../data/mods/pokemonorthsoutheastwest/format';
import { format as pokemorty                   } from '../data/mods/pokemorty/format';
import { format as PokeTypos                   } from '../data/mods/poketypos/format';
import { format as ponymonshowdown             } from '../data/mods/ponymonshowdown/format';
import { format as publicdomain                } from '../data/mods/publicdomain/format';
import { format as randomtandem                } from '../data/mods/randomtandem/format';
import { format as ReGeneration                } from '../data/mods/regeneration/format';
import { format as regionalevolutions          } from '../data/mods/regionalevolutions/format';
import { format as restrictions                } from '../data/mods/restrictions/format';
import { format as ReturnToOrreTercera         } from '../data/mods/returntoorretercera/format';
import { format as rockbottom                  } from '../data/mods/rockbottom/format';
import { format as roulettemons                } from '../data/mods/roulettemons/format';
import { format as Roulettemons2               } from '../data/mods/roulettemons2/format';
import { format as Roulettemons2Ubers          } from '../data/mods/roulettemons2/format-ubers';
import { format as scootopia                   } from '../data/mods/scootopia/format';
import { format as scootopiav4                 } from '../data/mods/scootopiav4/format';
import { format as secretsanta                 } from '../data/mods/secretsanta/format';
import { format as setinstone                  } from '../data/mods/setinstone/format';
import { format as sharedpower                 } from '../data/mods/sharedpower/format';
import { format as SharedPowerIronFist         } from '../data/mods/sharedpowerironfist/format';
import { format as shinymons                   } from '../data/mods/shinymons/format';
import { format as signaturemons               } from '../data/mods/signaturemons/format';
import { format as signaturerestrictions       } from '../data/mods/signaturerestrictions/format';
import { format as SixBySix                    } from '../data/mods/sixbysix/format';
import { format as SmashModsBrawl              } from '../data/mods/smashmodsbrawl/format';
import { format as SmashModsMelee              } from '../data/mods/smashmodsmelee/format';
import { format as SmashStereotypes            } from '../data/mods/smashstereotypes/format';
import { format as solopet                     } from '../data/mods/solopet/format';
import { format as spookymod                   } from '../data/mods/spookymod/format';
import { format as stadium                     } from '../data/mods/stadium/format';
import { format as stadiumyb                   } from '../data/mods/stadiumyb/format';
import { format as stereotypes                 } from '../data/mods/stereotypes/format';
import { format as SuperSmashOMs               } from '../data/mods/supersmashoms/format';
import { format as supertypesou                } from '../data/mods/supertypesou/format';
import { format as sylvemonstest               } from '../data/mods/sylvemonstest/format';
import { format as tamagotchi                  } from '../data/mods/tamagotchi/format';
import { format as Teraforming                 } from '../data/mods/teraforming/format';
import { format as teramax                     } from '../data/mods/teramax/format';
import { format as the331typechartg9           } from '../data/mods/the331typechartg9/format';
import { format as thebore                     } from '../data/mods/thebore/format';
import { format as TierSovereign               } from '../data/mods/tiersovereign/format';
import { format as toho                        } from '../data/mods/toho/format';
import { format as tpdp                        } from '../data/mods/tpdp/format';
import { format as TradingPost                 } from '../data/mods/tradingpost/format';
import { format as TrainerSupport              } from '../data/mods/trainersupport/format';
import { format as TripleThreat                } from '../data/mods/triplethreat/format';
import { format as TwoStepMonsv3               } from '../data/mods/twostepmonsv3/format';
import { format as upsidedown                  } from '../data/mods/upsidedown/format';
import { format as weatherwar                  } from '../data/mods/weatherwar/format';
import { format as weedmons                    } from '../data/mods/weedmons/format';
import { format as whitetusk                   } from '../data/mods/whitetusk/format';
import { format as Woomod                      } from '../data/mods/woomod/format';
import { format as Worldbuilding               } from '../data/mods/worldbuilding/format';
// import can't hurt you anymore


/*
If you specify a section that already exists, your format will be added to the bottom of that section.
New sections will be added to the bottom of the specified column.
The column value will be ignored for repeat sections.
*/

///////////////////////////////////////////////////////////////////////
///////////////////// START ACTUAL LIST ///////////////////////////////
///////////////////////////////////////////////////////////////////////

export const Formats: FormatList = [

	///////////////////////////////////////////////////////////////
	////////////////// Pet Mods of the Month //////////////////////
	///////////////////////////////////////////////////////////////
	{
		section: "PMotM",
		column: 1,
		// name: "Pet Mod of the Month"
	},

	SixBySix,

	///////////////////////////////////////////////////////////////
	////////////////////// Popular Pet Mods ///////////////////////
	///////////////////////////////////////////////////////////////
	{
		section: "Popular",
		column: 1,
		// name: "popularpetmods",
	},

	FusionEvoCorruptCouncil,

	///////////////////////////////////////////////////////////////
	///////////////////// Spotlight Mods //////////////////////////
	///////////////////////////////////////////////////////////////
	{
		section: "Spotlights",
		column: 1,
		// name: "spotlightmods",
	},

	gen9Vaporemons,
	JoltemonsOU,

	///////////////////////////////////////////////////////////////
	///////////////// Monster Hunter Solomod //////////////////////
	///////////////////////////////////////////////////////////////
	{
		section: "Monster Hunter",
		column: 1,
		// name: "monsterhuntersolomod",
	},

	MonsterHunterOU,
	MonsterHunterUU,
	MonsterHunterRU,
	MonsterHunterAG,
	MonsterHunterDoubles,
	MonsterHunterFFA,
	MonsterHunterRandoms,
	MonsterHunterDoublesRands,
	MonsterHunterFFARands,
	MonsterHunterVGC,
	monsterhunterousolopliii,

	///////////////////////////////////////////////////////////////
	///////////////////// Gen 8 Pet Mods //////////////////////////
	///////////////////////////////////////////////////////////////
	{
		section: "Gen 8 Pet Mods",
		column: 2,
		// name: "gen8petmods",
	},

	///////////////////////////////////////////////////////////////
	//////////////////////// Solomods /////////////////////////////
	///////////////////////////////////////////////////////////////
	{
		section: "Solomods",
		column: 2,
	},
    {
 		name: "[Gen 9] Earth & Sky Horizons OU",
 		desc: `The metagame based on Pok&eacute;mon Earth & Sky, a set of theoretical games created by En Passant, with the Horizons Expansion for Gen 9.`,
 		threads: [
 			`&bullet; <a href="https:docs.google.com/spreadsheets/d/1zLXacuxUs05muhn3fTty_UW2ww3KSZCmnzdsUzVR-x8/edit?usp=sharing">Competitive Cheat Sheet</a>`,
 		],
 		mod: 'earthsky',
 		ruleset: [ 'Earth & Sky', 'Restricted Rules'],
 		banlist: [
 			'Alakazam-Mega', 'Arceus', 'Blaziken-Mega', 'Blastoise-Mega', 'Calyrex-Ice', 'Calyrex-Shadow', 'Chi-Yu', 'Chien-Pao', 'Darkrai',
 			'Deoxys-Attack', 'Deoxys-Base', 'Deoxys-Speed',	'Dialga', 'Eternatus', 'Flutter Mane', 'Genesect', 'Gengar-Mega', 'Giratina', 'Groudon',
 			'Ho-Oh', 'Kartana', 'Koraidon', 'Kyogre', 'Kyurem', 'Landorus-Base', 'Lucario-Mega', 'Lugia', 'Lunala', 'Marshadow', 'Mewtwo', 'Miraidon',
 			'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Robo Bundle',
 			'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom',
 			'Oceides', 'Hatar', 'Zuros', 'Norphaval', 'Khatrophys', 'Arena Trap', 'Power Construct', 'Shadow Tag', 'Baton Pass', 'Stellar Tera Shard'
 		],
 	},
	 {
	 	name: "[Gen 9] Earth & Sky Horizons Triples",
	 	threads: [
	 		`&bullet; <a href="https:docs.google.com/spreadsheets/d/1zLXacuxUs05muhn3fTty_UW2ww3KSZCmnzdsUzVR-x8/edit?usp=sharing">Competitive Cheat Sheet</a>`,
	 	],
	 	mod: 'earthsky',
	 	gameType: 'triples',
	 	ruleset: [ 'Earth & Sky', 'Restricted Rules', 'Gravity Sleep Clause'],
	 	banlist: [
	 		'Arceus', 'Calyrex-Ice', 'Calyrex-Shadow', 'Chi-Yu', 'Chien-Pao', 'Darkrai', 'Deoxys-Attack', 'Deoxys-Base', 'Deoxys-Speed',
	 		'Dialga', 'Eternatus', 'Genesect', 'Gengar-Mega', 'Giratina', 'Groudon', 'Ho-Oh', 'Koraidon', 'Kyogre', 'Kyurem', 'Landorus-Base',
	 		'Lugia', 'Lunala', 'Marshadow', 'Mewtwo', 'Miraidon', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa',
	 		'Rayquaza', 'Reshiram', 'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom',
	 		'Oceides', 'Hatar', 'Zuros', 'Norphaval', 'Khatrophys', 'Arena Trap', 'Power Construct', 'Shadow Tag', 'Baton Pass', 'Stellar Tera Shard'
	 	],
	 },
	 {
	 	name: "[Gen 9] Earth & Sky Horizons Dex",
	 	threads: [
	 		`&bullet; <a href="https:docs.google.com/spreadsheets/d/1zLXacuxUs05muhn3fTty_UW2ww3KSZCmnzdsUzVR-x8/edit?usp=sharing">Competitive Cheat Sheet</a>`,
	 	],
	 	mod: 'earthsky',
	 	ruleset: [ '[Gen 9] Earth & Sky Horizons OU', 'Horizons Pokedex',],
		banlist: [
			'Manaphy', 'Meloetta-Pirouette', 'Diancie-Mega', 'Melmetal', 'Enamorus-Base', 'Latias-Mega', 'Latios-Mega', 'Zygarde-Base', 'Hoopa-Unbound',
			'Spectrier', 'Roaring Moon', 'Valiant Droid', 'Terapagos-Terastal'],
	 },
	 {
	 	name: "[Gen 9] Earth & Sky Horizons Ubers",
	 	threads: [
	 		`&bullet; <a href="https:docs.google.com/spreadsheets/d/1zLXacuxUs05muhn3fTty_UW2ww3KSZCmnzdsUzVR-x8/edit?usp=sharing">Competitive Cheat Sheet</a>`,
	 	],
	 	mod: 'earthsky',
	 	ruleset: [ 'Earth & Sky',],
	 	banlist: ['Baton Pass'],
	 },
	 {
		name: "[Gen 8] Evolution Project",
		desc: [
			`<b>Evolution Project</b>: A small group's creative exercise.`,
		],
		ruleset: ['Standard NatDex', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod', 'Terastal Clause'],
		banlist: [
			'Alakazam', 'Excadrill-Base', 'Exploud', 'Lycanroc-Dusk', 'Naganadel-Base', 'Reuniclus-Base', 'Scizor', 'Scolipede-Base', 'Starmie-Base', 'Polteageist-Base',
			'Polteageist-Antique', 'Volcarona', 'Aegislash-Base', 'Gyarados', 'Moody', 'Baton Pass'
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'Evo!' && template.tier !== 'Evo (NFE)' && template.tier !== "Evo NFE!") {
					return [set.species + ' is not legal in the Evolution Project format.'];
				}
			}
		},
		onValidateSet(set) {
			const item = this.dex.items.get(set.item);
			if (item.megaStone) return [`${set.name || set.species} is not currently allowed to Mega Evolve.`];
		},
		mod: 'evolutionproject',
		searchShow: false,
	},
	{
		name: "[Gen 8] Evolution Project VGC",
		desc: [
			`<b>Evolution Project</b>: A small group's creative exercise.`,
		],
		gameType: 'doubles',
		banlist: ['Aegislash-Base', 'Scizor'],
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'VGC Timer', '+Unobtainable', '+Past', 'Dynamax Clause', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod', 'Terastal Clause'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'Evo!' && template.tier !== 'Evo (NFE)' && template.tier !== "Evo NFE!") {
					return [set.species + ' is not legal in the Evolution Project format.'];
				}
			}
		},
		onValidateSet(set) {
			const unobtainables = [
				'Eevee-Starter', 'Floette-Eternal', 'Pichu-Spiky-eared', 'Pikachu-Belle', 'Pikachu-Cosplay', 'Pikachu-Libre',
				'Pikachu-PhD', 'Pikachu-Pop-Star', 'Pikachu-Rock-Star', 'Pikachu-Starter', 'Eternatus-Eternamax',
			];
			const species = this.dex.species.get(set.species);
			if (unobtainables.includes(species.name)) {
				if (this.ruleTable.has(`+pokemon:${species.id}`)) return;
				return [`${set.name || set.species} does not exist in the National Dex.`];
			}
			if (species.tier === "Unreleased") {
				const basePokemon = this.toID(species.baseSpecies);
				if (this.ruleTable.has(`+pokemon:${species.id}`) || this.ruleTable.has(`+basepokemon:${basePokemon}`)) {
					return;
				}
				return [`${set.name || set.species} does not exist in the National Dex.`];
			}
			// Items other than Z-Crystals and Pokémon-specific items should be illegal
			if (!set.item) return;
			const item = this.dex.items.get(set.item);
			if (item.megaStone) return [`${set.name || set.species} is not currently allowed to Mega Evolve.`];
			if (!item.isNonstandard) return;
			if (['Past', 'Unobtainable'].includes(item.isNonstandard) && !item.zMove && !item.itemUser && !item.forcedForme) {
				if (this.ruleTable.has(`+item:${item.id}`)) return;
				return [`${set.name}'s item ${item.name} does not exist in Gen ${this.dex.gen}.`];
			}
		},
		mod: 'evolutionproject',
		searchShow: false,
	},
	 {
		name: "[Gen 9] Evolution Project 2",
		desc: [
			`<b>Evolution Project</b>: A small group's creative exercise.`,
		],
		teambuilderFormat: "National Dex",
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Dynamax Clause', 'Data Mod'],
		banlist: [
			'Toxapex-Base', 'Noivern-Variant', 'Chandelure', 'Corviknight-Base', 'Darmanitan-Base', 'Darmanitan-Galar', 'Excadrill-Base', 'Hawlucha-Base',
			'Garchomp', 'Velocinobi', 'Dragonite',
			'Tapu Koko', 'Tapu Lele', 'Tapu Bulu', 'Tapu Fini', 'Zacian', 'Zamazenta', 'Deoxys',
			'Moody', 'Baton Pass', 'Shed Tail', 'Last Respects',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			const customTiers = ['Pokémon of the Day!', 'Evo!', '(Prevo)'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!customTiers.includes(template.tier)) {
					return [set.species + ' is not legal in the Evolution Project format.'];
				}
			}
		},
		onValidateSet(set) {
			const item = this.dex.items.get(set.item);
			if (item.megaStone) return [`${set.name || set.species} is not allowed to Mega Evolve.`];
		},
		mod: 'gen9evolutionproject',
		searchShow: false,
	},
	{
		name: "[Gen 9] Evolution Project 2 VGC",
		desc: [
			`<b>Evolution Project</b>: A small group's creative exercise. Tera Blast is universal in VGC.`,
		],
		gameType: 'doubles',
		teambuilderFormat: "National Dex",
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'VGC Timer', '+Unobtainable', '+Past', 'Open Team Sheets', 'Dynamax Clause', 'Z-Move Clause', 'Data Mod'],
		banlist: [
			'Dragonite',
			'Tapu Koko', 'Tapu Lele', 'Tapu Bulu', 'Tapu Fini', 'Zacian', 'Zamazenta', 'Deoxys',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			const customTiers = ['Pokémon of the Day!', 'Evo!', '(Prevo)'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!customTiers.includes(template.tier)) {
					return [set.species + ' is not legal in the Evolution Project format.'];
				}
			}
		},
		checkCanLearn(move, species, lsetData, set) { // Tera Blast is universal in VGC, but not in singles
			const problem = this.checkCanLearn(move, this.dex.species.get(set.species));
			if (problem && move.name !== 'Tera Blast') return problem;
			return null;
		},
		onValidateSet(set) {
			const unobtainables = [
				'Eevee-Starter', 'Floette-Eternal', 'Pichu-Spiky-eared', 'Pikachu-Belle', 'Pikachu-Cosplay', 'Pikachu-Libre',
				'Pikachu-PhD', 'Pikachu-Pop-Star', 'Pikachu-Rock-Star', 'Pikachu-Starter', 'Eternatus-Eternamax',
			];
			const species = this.dex.species.get(set.species);
			if (unobtainables.includes(species.name)) {
				if (this.ruleTable.has(`+pokemon:${species.id}`)) return;
				return [`${set.name || set.species} does not exist in the National Dex.`];
			}
			if (species.tier === "Unreleased") {
				const basePokemon = this.toID(species.baseSpecies);
				if (this.ruleTable.has(`+pokemon:${species.id}`) || this.ruleTable.has(`+basepokemon:${basePokemon}`)) {
					return;
				}
				return [`${set.name || set.species} does not exist in the National Dex.`];
			}
			// Items other than Z-Crystals and Pokémon-specific items should be illegal
			if (!set.item) return;
			const item = this.dex.items.get(set.item);
			if (item.megaStone) return [`${set.name || set.species} is not allowed to Mega Evolve.`];
			if (!item.isNonstandard) return;
			if (['Past', 'Unobtainable'].includes(item.isNonstandard) && !item.zMove && !item.itemUser && !item.forcedForme) {
				if (this.ruleTable.has(`+item:${item.id}`)) return;
				return [`${set.name}'s item ${item.name} does not exist in Gen ${this.dex.gen}.`];
			}
		},
		mod: 'gen9evolutionproject',
		searchShow: false,
	},
	{
		name: "[Gen 9] Forgottenmons",
		desc: `A National Dex metagame featuring only Pokemon not in Gen 9.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-10106531">Forgottenmons in the Solomods Megathread</a>`,
		],
		mod: 'forgottenmons',
		teambuilderFormat: 'National Dex',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Mega Stone Clause'],
		banlist: [
			'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'King\'s Rock',
			'Quick Claw', 'Razor Fang', 'Assist', 'Baton Pass', 'Last Respects', 'Shed Tail',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['Forgottenmons','Forgottenmons NFE','Forgottenmons LC'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Forgottenmons.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Fusion Evolution Dondozo",
		mod: 'dondozo',
		desc: `dondozo`,
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Data Mod', 'Sleep Clause Mod', 'Z-Move Clause', /* 'Mega Data Mod' */],
		banlist: ['Shed Tail'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['Dondozo','FEDD'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Fusion Evolution.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Fusion Evolution VGC Reg A",
		desc: ["Fusion Evolution but it's a VGC format, and a solomod run by AquaticPanic",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-9929461">FEVGC on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1DoV2Vk9B2mYxwVQt9ebA2CvygBLk29az3iszycMAh2k/edit#gid=0">Spreadsheet</a>`,
		      ],
		searchShow: false,
		gameType: 'doubles',
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 9', 'VGC Timer', 'Open Team Sheets', 'Data Mod'],
		mod: 'gen9fevgc',
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['Reg A', 'Reg A NFE', 'Reg A LC'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Fusion Evolution.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Fusion Evolution VGC Reg A (Bo3)",
		desc: ["Fusion Evolution but it's a VGC format, and a solomod run by AquaticPanic",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-9929461">FEVGC on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1DoV2Vk9B2mYxwVQt9ebA2CvygBLk29az3iszycMAh2k/edit#gid=0">Spreadsheet</a>`,
		      ],
		searchShow: false,
		gameType: 'doubles',
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 9', 'VGC Timer', 'Data Mod', 'Force Open Team Sheets', 'Best of = 3'],
		mod: 'gen9fevgc',
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['Reg A', 'Reg A NFE', 'Reg A LC'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Fusion Evolution.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Fusion Evolution VGC Reg B",
		desc: ["Fusion Evolution but it's a VGC format, and a solomod run by AquaticPanic",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-9929461">FEVGC on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1DoV2Vk9B2mYxwVQt9ebA2CvygBLk29az3iszycMAh2k/edit#gid=0">Spreadsheet</a>`,
		      ],
		gameType: 'doubles',
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 9', 'VGC Timer', 'Open Team Sheets', 'Data Mod'],
		mod: 'gen9fevgc',
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['Reg A', 'Reg B', 'Reg A NFE', 'Reg A LC', 'Reg B LC'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Fusion Evolution.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Fusion Evolution VGC Reg B (Bo3)",
		desc: ["Fusion Evolution but it's a VGC format, and a solomod run by AquaticPanic",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-9929461">FEVGC on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1DoV2Vk9B2mYxwVQt9ebA2CvygBLk29az3iszycMAh2k/edit#gid=0">Spreadsheet</a>`,
		      ],
		gameType: 'doubles',
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 9', 'VGC Timer', 'Data Mod', 'Force Open Team Sheets', 'Best of = 3'],
		mod: 'gen9fevgc',
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['Reg A', 'Reg B', 'Reg A NFE', 'Reg A LC', 'Reg B LC'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Fusion Evolution.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Fusion Evolution VGC Reg C",
		desc: ["Fusion Evolution but it's a VGC format, and a solomod run by AquaticPanic",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/3748155/">FEVGC on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1DoV2Vk9B2mYxwVQt9ebA2CvygBLk29az3iszycMAh2k/edit#gid=0">Spreadsheet</a>`,
		      ],
		gameType: 'doubles',
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 9', 'VGC Timer', 'Open Team Sheets', 'Data Mod'],
		mod: 'gen9fevgc',
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['Reg A', 'Reg B', 'Reg C', 'Reg A NFE', 'Reg A LC', 'Reg B LC', 'Reg C LC'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Fusion Evolution.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Fusion Evolution VGC Reg C (Bo3)",
		desc: ["Fusion Evolution but it's a VGC format, and a solomod run by AquaticPanic",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/3748155/">FEVGC on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1DoV2Vk9B2mYxwVQt9ebA2CvygBLk29az3iszycMAh2k/edit#gid=0">Spreadsheet</a>`,
		      ],
		gameType: 'doubles',
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 9', 'VGC Timer', 'Data Mod', 'Force Open Team Sheets', 'Best of = 3'],
		mod: 'gen9fevgc',
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['Reg A', 'Reg B', 'Reg C', 'Reg A NFE', 'Reg A LC', 'Reg B LC', 'Reg C LC'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Fusion Evolution.'];
				}
			}
		},
	},
	/* {
		name: "[Gen 1] Glitch OU",
		mod: 'gen1glitch',
		ruleset: ['Standard', 'Data Mod'],
		banlist: ['Uber', 'Agility + Wrap', 'Agility + Fire Spin', 'Agility + Bind', 'Agility + Clamp', 'Amnesia', 'Sleep Powder', 'Self-Destruct', 'Explosion'],
	}, */
	{
		name: "[Gen 2] GSC Doubles Ubers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gsc-doubles-new-lcots.3755811/">Thread on Smogon</a>`,
		],

		mod: 'gen2doubles',
		gameType: 'doubles',
		ruleset: ['Standard Doubles', 'Swagger Clause'],
		banlist: ['Bright Powder', 'King\'s Rock', 'Quick Claw'],
	},
	{
		name: "[Gen 2] GSC Doubles OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gsc-doubles-new-lcots.3755811/">Thread on Smogon</a>`,
		],

		mod: 'gen2doubles',
		gameType: 'doubles',
		ruleset: ['Standard Doubles', 'Swagger Clause'],
		banlist: ['Uber', 'Bright Powder', 'King\'s Rock', 'Quick Claw'],
	},
	{
		name: "[Gen 2] GSC Doubles UU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gsc-doubles-new-lcots.3755811/">Thread on Smogon</a>`,
		],

		mod: 'gen2doubles',
		gameType: 'doubles',
		ruleset: ['Standard Doubles', 'Swagger Clause'],
		banlist: ['OU', 'Uber', 'Bright Powder', 'King\'s Rock', 'Quick Claw'],
	},
	{
		name: "[Gen 2] GSC Doubles Random Battle",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gsc-doubles-new-lcots.3755811/">Thread on Smogon</a>`,
		],

		mod: 'gen2doubles',
		gameType: 'doubles',
		team: 'random',
		ruleset: ['Standard Doubles', 'Swagger Clause'],
		banlist: ['Uber', 'Bright Powder', 'King\'s Rock', 'Quick Claw'],
	},
	{
		name: "[Gen 9] Hax Meters OU",
		mod: 'haxmeters',
		ruleset: ['Standard', '!Sleep Clause Mod', 'Sleep Moves Clause', '!Evasion Items Clause', 'Hax Meter Rule'],
		banlist: ['Uber', 'AG', 'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass', 'Last Respects', 'Shed Tail'],
	},
	{
		name: "[Gen 9] Hax Meters Doubles OU",
		mod: 'haxmeters',
		gameType: 'doubles',
		ruleset: ['Standard Doubles', 'Hax Meter Rule'],
		banlist: ['DUber', 'Shadow Tag'],
	},
	{
		name: "[Gen 8] Hax Meters OU",
		mod: 'gen8haxmeters',
		ruleset: ['Standard', '!Evasion Items Clause', 'Dynamax Clause', 'Hax Meter Rule'],          
		banlist: ['Uber', 'AG', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'Baton Pass'],
	},
	{
		name: "[Gen 8] Hax Meters Doubles OU",
		mod: 'gen8haxmeters',
		gameType: 'doubles',
		ruleset: ['Standard Doubles', 'Dynamax Clause', 'Hax Meter Rule'],
		banlist: ['DUber', 'Power Construct', 'Shadow Tag', 'Swagger'],
	},
	{
		name: "[Gen 9] Luckless Play OU",
		mod: 'lucklessplay',
		ruleset: ['Standard', '!Sleep Clause Mod', 'Sleep Moves Clause', '!Evasion Items Clause', 'Hax Meter Rule'],
		banlist: ['Uber', 'AG', 'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass', 'Last Respects', 'Shed Tail'],
	},
	{
		name: "[Gen 8] Luckless Play OU",
		mod: 'gen8lucklessplay',
		ruleset: ['Standard', '!Evasion Items Clause', 'Dynamax Clause', 'Hax Meter Rule'],          
		banlist: ['Uber', 'AG', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'Baton Pass'],
	},
   /* {
		name: "[Gen 3] Hoennification",
        mod: 'gen3hoennification',
		ruleset: ['Standard', 'One Boost Passer Clause', 'Freeze Clause Mod', 'Data Mod', 'Baton Pass Mod'],
		banlist: ['Uber', 'Soundproof', 'Assist', 'Baton Pass + Block', 'Baton Pass + Mean Look', 'Baton Pass + Spider Web', 'Smeargle + Ingrain', 'Starf Berry', 'Speed Boost + Blaziken', 'Drizzle', 'Drought'],
	}, 
	{
		name: "[Gen 9] i forgor OU",
		mod: 'iforgor',
		desc: `i forgor`,
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Data Mod', 'Sleep Clause Mod', 'Mega Data Mod'],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['IDK'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return ['you forgor ' + set.species + ' doesnt exist.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] i forgor Ubers",
		mod: 'iforgor',
		desc: `i forgor`,
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Data Mod', 'Sleep Clause Mod', 'Mega Data Mod'],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['EF', 'IDK'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return ['you forgor ' + set.species + ' doesnt exist.'];
				}
			}
		},
	}, */
	{
		name: "[Gen 1] JohtoMons",
		desc: '<b>[Gen 1] JohtoMons</b>: Adding the Johto mons to RBY',
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-1-futureproofing-slate-1-discussion.3703375/">FutureProofing on Smogon Forums</a>`,
		],
		mod: 'gen1johtomons',
		ruleset: ['Standard', 'Data Mod'],
		banlist: ['Uber'],
		unbanlist: ['Aeroblast', 'Sacred Fire', 'Sketch', 'Present', 'Megahorn', 'Steel Wing', 'Milk Drink', 'Metal Claw', 'Spider Web', 'Hidden Power', 'Octazooka', 'Triple Kick', 'Vital Throw', 'Extreme Speed', 'Mach Punch', 'Outrage', 'Morning Sun',
			'Chikorita', 'Bayleef', 'Meganium', 'Cyndaquil', 'Quilava', 'Typhlosion', 'Sentret', 'Furret', 'Hoothoot', 'Noctowl', 'Ledyba', 'Ledian', 'Spinarak', 'Ariados', 'Crobat', 'Chinchou', 'Lanturn', 'Pichu', 'Cleffa', 'Igglybuff', 'Togepi', 'Togetic',
			'Natu', 'Xatu', 'Mareep', 'Flaaffy', 'Ampharos', 'Bellossom', 'Marill', 'Azumarill', 'Sudowoodo', 'Politoed', 'Hoppip', 'Skiploom', 'Jumpluff', 'Aipom', 'Sunkern', 'Sunflora', 'Yanma', 'Wooper', 'Quagsire', 'Espeon', 'Umbreon', 'Murkrow', 'Slowking',
			'Misdreavus', 'Unown', 'Wobbuffet', 'Girafarig', 'Pineco', 'Forretress', 'Dunsparce', 'Gligar', 'Steelix', 'Snubbull', 'Granbull', 'Qwilfish', 'Scizor', 'Shuckle', 'Heracross', 'Sneasel', 'Teddiursa', 'Ursaring', 'Slugma', 'Magcargo', 'Swinub',
			'Piloswine', 'Corsola', 'Remoraid', 'Octillery', 'Delibird', 'Mantine', 'Skarmory', 'Houndour', 'Houndoom', 'Kingdra', 'Phanpy', 'Donphan', 'Porygon2', 'Stantler', 'Smeargle', 'Tyrogue', 'Hitmontop', 'Smoochum', 'Elekid', 'Magby', 'Miltank',
			'Blissey', 'Raikou', 'Entei', 'Suicune', 'Larvitar', 'Pupitar', 'Tyranitar', 'Lugia', 'Ho-Oh', 'Celebi',
		],
    },
	{
		name: "[Gen 2] Johto Expansion Pak (Alpha) OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/page-6#post-9880873">Post in Solomods Megathread</a>`,
      	`&bullet; <a href="https://docs.google.com/spreadsheets/d/1t54hCQrMGj102ck9L7mW47GJxrHMmJy5Ygum6ldWVX0/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'gen2expansionpack',
		ruleset: ['Standard', 'Data Mod', 'Welcome Message'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 2] Johto Expansion Pak Ubers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/page-6#post-9880873">Post in Solomods Megathread</a>`,
      	`&bullet; <a href="https://docs.google.com/spreadsheets/d/1t54hCQrMGj102ck9L7mW47GJxrHMmJy5Ygum6ldWVX0/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'gen2expansionpack',
		ruleset: ['Standard', 'Data Mod', 'Welcome Message'],
	},
	{
        name: "[Gen 9] Jollymod",
        desc: [
            "jumpscaare",
        ],
        threads: [
            `&bullet; <a href="https://www.youtube.com/shorts/bbZCltuyZlM">Jollymod on Smogon Forums</a>`,
              ],
        ruleset: ['Standard NatDex', 'Terastal Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod', 'Jolly'],
        banlist: ['Avalanche'],
		teambuilderFormat: "National Dex",
        onValidateTeam(team, format) {
            /**@type {{[k: string]: true}} */
            let speciesTable = {};
            for (const set of team) {
                let template = this.dex.species.get(set.species);
                if (template.tier !== 'JM') {
                    return [set.species + ' is not usable in Jollymod.'];
                }
            }
        },
        mod: 'jollymod',
    },
	{
		name: "[Gen 1] Jumpstarted",
		threads: [

		],
		mod: 'gen1jumpstarted',
		ruleset: ['Standard', 'Data Mod', 'Allow Tradeback'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 1] Kanto Expansion Pak OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-9233581">Post in Solomods Megathread</a>`,
      	`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TpTH9ksUWOOJJQK69RIcvnot_mH_JvfGfM4zra6V3Ec/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'gen1expansionpack',
		ruleset: ['Standard', 'Data Mod', 'Welcome Message', 'Allow Tradeback'],
		banlist: ['Uber'],
	},
		{
		name: "[Gen 1] Kanto Expansion Pak Ubers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-9233581">Post in Solomods Megathread</a>`,
      	`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TpTH9ksUWOOJJQK69RIcvnot_mH_JvfGfM4zra6V3Ec/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'gen1expansionpack',
		ruleset: ['Standard', 'Data Mod', 'Welcome Message', 'Allow Tradeback'],
	},
	{
		name: "[Gen 8] Kaen's Dex",
		mod: "kaensdex",
		ruleset: ['Standard NatDex', 'Z-Move Clause', 'Data Mod'],
		banlist: ['All Pokemon'],
		unbanlist: ['Luvdisc', 'Hypno','Arbok','Shuckle','Woodite','Manteaf','Fasmiwood','Smice','Ratevil','Burstrat',		'Doplash','Makid','Merdolph','Princeguin',
			'Kinguin','Ekidna','Porcusquill','Mop','Mopper','Puppessum','Grimssum','Spiball','Scopiball','Navird','Peckbeard','Bask','Peayes','Weaworm',
			'Lilfly','Koafly','Puptwin','Duog','Bureep','Parllama','Debi','Deecrust','Pickynest','Vulcdor','Buroach','Bugler','Roamai','Rack','Mountse',
			'Lacorn','Antney','Hairpu','Sockorm','Kibaion','Kibasol','Gnodog','Dressog','Tigle','Biitora','Psyguana','Forguana','Timk','Dynabite','Positt',
			'Frogassin','Jaklove','Wospark','Ravesp','Cabbitt','Haresprout','Seerd','Evialden','Ostranch','Pasuragu','Grussgu','Orvenom','Nerdium','Smartish',
			'Higarden','Unimount','Birnal','Yeagle','Flysh','Seaplane','Airpier','Likaba','Sucabra','Mousse','Donter','Melops','Harvetops','Pentamelop',
			'Scarferret','Lovefume','Smolle','Molvel','Toxtaur','Venotauro','Helmdillo','Rescurer','Crimske','Snagant','Zhulong','Yufo','Spavader','Grichick',
			'Grileo','Sbusho','Pangearth','Ankylonite','Champkylo','Slomoss','Milomoss','Rampeck','Terroccer','Tifrost','Smilofrost','Vizcachu','Paramer',
			'Toolsaur','Neuro','Brancell','Freezegon','Snoak','Coldrake','Capowt','Capoedar','Warcon','Istrebitel','Voltcro','Wirechomp','Thungator',
			'Scalpick','Roostlax','Eagatrice','Theri','Theriscyno','Ghoca','Moclaw','Jawlusk','Tumbna','Plesioskul','Laveel','Thermaque','Thermandril',
			'Tamantula','Spideth','Abomigo','Chillma','Wintber','Evergrowl','Stontler','Balatone','Coayena','Pherosmoke','Octovase','Cthulhurn','Shahood',
			'Karakasa','Grag','Kimokus','Toknight','Cowpy','Cowork','Barbecow','Hoorel','Baishark','Luviu','Shucklony','Dreamer','Nohtyp']
	},
// start: Ma'adowr
{
		name: "[Gen 9] Ma'adowr Singles",
		desc: 'Solomod mainly based on Ancient Egypt and run by BlueRay',
		threads: [
								`&bullet; <a href="https://docs.google.com/spreadsheets/d/1fE71uVoWpYSGSncowLJ6yc9gzfUdYYj9khn23r7gCtM/edit?gid=168383836#gid=168383836">Spreadsheet</a>`,
		      ],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Evasion Items Clause', 'Species Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod', 'Terastal Clause'],
		banlist: ['Arena Trap', 'Ill Wind', 'Moody', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Quick Claw', 'Baton Pass', 'Baxcalibur', 'Espathra', 'Gengarite', 'Lucarionite', 'Mawilite', 'Metagrossite', 'Sablenite', 'Chantyrus Engraving', 'Frustration', 'Hail', 'Hidden Power', 'Last Respects', 'Magic Powder', 'Pursuit', 'Return'],
		teambuilderFormat: 'National Dex',
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['MD', 'MD NFE']; // 'EXP'
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Maadowr.'];
				}
			}
		},
		/*onValidateSet(set) {
			const problems: string[] = [];
			const setHas: {[k: string]: true} = {};
			let species = this.dex.species.get(set.species);
			let item = this.dex.items.get(set.item);
			let tierSpecies = species;

			if (item.megaEvolves === species.name) {
				if (item.megaStone && this.dex.species.get(item.megaStone).tier !== 'Mega') return [item.name + ' is not a legal Mega Stone.'];
			}
		}, */
		mod: 'maadowr',
	},
	{
		name: "[Gen 9] Ma'adowr VGC",
		desc: 'Solomod mainly based on Ancient Egypt and run by BlueRay',
		threads: [
								`&bullet; <a href="https://docs.google.com/spreadsheets/d/1fE71uVoWpYSGSncowLJ6yc9gzfUdYYj9khn23r7gCtM/edit?gid=168383836#gid=168383836">Spreadsheet</a>`,
		      ],
		gameType: 'doubles',
		ruleset: ['Standard NatDex', 'Flat Rules', '!! Adjust Level = 50', 'VGC Timer', 'Open Team Sheets', 'Data Mod', 'Z-Move Clause', 'Dynamax Clause', 'Terastal Clause', 'Mega Data Mod'],
		banlist: ['Frustration', 'Hail', 'Hidden Power', 'Magic Powder', 'Pursuit', 'Return'],
		teambuilderFormat: 'National Dex',
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['MD', 'MD NFE']; // 'EXP'
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Maadowr.'];
				}
			}
		},
		/*onValidateSet(set) {
			const problems: string[] = [];
			const setHas: {[k: string]: true} = {};
			let species = this.dex.species.get(set.species);
			let item = this.dex.items.get(set.item);
			let tierSpecies = species;

			if (item.megaEvolves === species.name) {
				if (item.megaStone && this.dex.species.get(item.megaStone).tier !== 'Mega') return [item.name + ' is not a legal Mega Stone.'];
			}
		}, */
		mod: 'maadowr',
	},
	{
		name: "[Gen 9] Ma'adowr VGC Restricted",
		desc: 'Solomod mainly based on Ancient Egypt and run by BlueRay',
		threads: [
								`&bullet; <a href="https://docs.google.com/spreadsheets/d/1fE71uVoWpYSGSncowLJ6yc9gzfUdYYj9khn23r7gCtM/edit?gid=168383836#gid=168383836">Spreadsheet</a>`,
		      ],
		gameType: 'doubles',
		ruleset: ['Standard NatDex', 'Flat Rules', '!! Adjust Level = 50', 'VGC Timer', 'Open Team Sheets', 'Data Mod', 'Z-Move Clause', 'Dynamax Clause', 'Terastal Clause', 'Mega Data Mod', 'Limit Two Restricted'],
		banlist: ['Frustration', 'Hail', 'Hidden Power', 'Magic Powder', 'Pursuit', 'Return'],
		restricted: ['Restricted Legendary'],
		teambuilderFormat: 'National Dex',
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['MD', 'MD NFE', 'MD Ubers', 'EXP2']; // 'EXP'
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Maadowr.'];
				}
			}
		},
		mod: 'maadowr',
	},
	// start: Lost Zone
	{
		name: "[Gen 9] Ma'adowr VGC Lost Zone",
		desc: 'Solomod mainly based on cryptids, myths, and spiritualism and run by BlueRay',
		threads: [
								`&bullet; <a href="https://docs.google.com/spreadsheets/d/1oGLi8VC1af6SDyTwUNwoIFN0z868v477pXkIaVRDdDE/edit?gid=168383836#gid=168383836">Spreadsheet</a>`,
		      ],
		gameType: 'doubles',
		ruleset: ['Standard NatDex', 'Flat Rules', '!! Adjust Level = 50', 'VGC Timer', 'Open Team Sheets', 'Data Mod', 'Z-Move Clause', 'Dynamax Clause', 'Terastal Clause', 'Mega Data Mod'],
		banlist: ['Frustration', 'Hail', 'Hidden Power', 'Magic Powder', 'Pursuit', 'Return'],
		teambuilderFormat: 'National Dex',
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['LZ', 'LZ NFE'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Lost Zone.'];
				}
			}
		},
		mod: 'maadowrlostzone',
	},
	// end: Ma'adowr
	{
		name: "[Gen 9] Mega Mania",
		mod: "megamania",
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Clause Mod'],
		banlist: ['ND Uber', 'ND AG', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'Kings Rock', 'Quick Claw', 'Razor Fang', 'Assist', 'Baton Pass', 'Last Respects', 'Shed Tail'],
	},
	{
		name: "[Gen 1] Metronome Battle",
		mod: "gen1metronome",
		ruleset: ['HP Percentage Mod', 'Cancel Mod', 'Desync Clause Mod', 'Sleep Clause Mod', 'Nickname Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'Max Team Size = 1'],
		banlist: [`Mewtwo`, 'Unreleased', 'Unobtainable', 'Nonexistent'],
		unbanlist: [`Mew`, `MissingNo.`],
		onValidateSet(set) {
			if (set.moves.length !== 1 || this.dex.moves.get(set.moves[0]).id !== 'metronome') {
				return [`${set.name || set.species} has illegal moves.`, `(Pok\u00e9mon can only have one Metronome in their moveset)`];
			}
		},
	},
	{
		name: "[Gen 9] Monopet",
		desc: [
			`<b>Monopet</b>: A Gen 9 Solomod where you can only use teams consisting of the same kind of pet.`,
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-10394103">Post in the Solomods Megathread</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1P1yLe5b8Wy15v9zL0iAfa4P4rtd1K72YgMx8EZu_FbY/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'solopet',
		ruleset: ['Standard', 'Terastal Clause', 'Data Mod'],
		banlist: [
			'Arena Trap', 'Moody', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Razor Fang', 'Baton Pass', 'Last Respects',
			'Shed Tail', 'Power Construct', 'Sneasler', 'Mewtwo', 'Zacian', 'Zamazenta', 'Naganadel', 'Palkia-Origin', 'Spectrier', 'Chi-Yu',
			'Dracovish', 'Dragapult', 'Roaring Moon', 'Groudon', 'Miraidon', 'Koraidon', 'Zygarde-Base', 'Rayquaza', 'Battle Bond', 'Greninja-Bond',
		],
		onValidateTeam(team, format, teamHas) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			let era : string[] = [];
			let allowedTiers = ['Birds', 'Cats', 'Dogs', 'Farm', 'Fish', 'Fox', 'Frog', 'Lizard', 'Rock', 'Rodent', 'Turtle'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				let tier = template.tier;
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Solopet.'];
				}
				if (!(era.includes(tier))) {
					era.push(tier)
				}
			}
			if (era.length > 1) return ['Each Pokemon needs to be from the same category.'];
		},
	},
	{
		name: "[Gen 1] Moonside",
		desc: `<b>[Gen 1] Moonside</b>: Welcome to the otherside of RBY.`,
		threads: [
			 `&bullet; Fuzzy Pickles!`,
		],
		mod: 'gen1moonside',
		ruleset: ['Data Mod'],
		banlist: [],
		unbanlist: ['Mewtwo', 'Mew'],
    },
	{
		name: "[Gen 9] NatDex The Bore",
		threads: [
		],

		mod: 'thebore',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Moves Clause', 'Z-Move Clause', 'Terastal Clause'],
		banlist: ['AG', 'Uber', 'Arena Trap', 'Moody', 'Shadow Tag', 'Zen Mode', 'King\'s Rock', 'Light Clay', 'Quick Claw', 'Razor Fang', 'Baton Pass'],
		teambuilderFormat: 'National Dex',
	},
	{
		name: "[Gen 9] NatDex The Bore UU",
		threads: [
		],

		mod: 'thebore',
		ruleset: ['[Gen 9] NatDex The Bore'],
		banlist: ['OU', 'UUBL'],
		teambuilderFormat: 'National Dex UU',
	},
	{
		name: "[Gen 9] Patratdex",
		desc: `<b>Patratdex</b>: Galvantic's Solomod, containing a new regional dex with a bunch of new stuff, notably 151 Fakemon.`,
		mod: 'patratdex',
		ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Baton Pass Clause', 'OHKO Clause', 'Realmon Clause'],
		banlist: ['Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z',],
		onSwitchIn(pokemon) {
      	this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		},
	},
	{
		name: "[Gen 9] Patratdex Doubles",
		desc: `<b>Patratdex</b>: Galvantic's Solomod, containing a new regional dex with a bunch of new stuff, notably 151 Fakemon.`,
		mod: 'patratdex',
		gameType: 'doubles',
		ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Baton Pass Clause', 'OHKO Clause', 'Realmon Clause'],
		banlist: ['Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z',],
		onSwitchIn(pokemon) {
      	this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		},
	},
	{
		name: "[Gen 9] Pokémon North, South, East, West",
		teambuilderFormat: "National Dex",
		desc: 'The largest sprite project ever is now the largest Solomod ever...eventually. Content gradually releases in waves!',
		threads: [
			`&bullet; <a href="https://https://www.smogon.com/forums/threads/solomods-megathread.3711007/page-8#post-10197171"></a>`,
		],
		mod: 'pokemonorthsoutheastwest',
		ruleset: ['Standard NatDex', 'Data Mod', 'Terastal Clause'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['NSEW','NSEW2','NSEW3', 'NSEW4', 'NSEW5', 'NSEW6','NSEW7','NSEW8', 'NSEW9', 'NSEW10', 'NSEW11', 'NSEW12', 'NSEW13', 'NSEW14', 'NSEW15'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Pokémon North, South, East, and West.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Pokémon Go! Go! Tamagotchi!",
		desc: 'They did not deserve to be forgotten to Digimon...a Solomod that contains three hundred adult form Tamagotchi!',
		threads: [
		`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/page-9#post-10311554"></a>`,
		],
		mod: 'tamagotchi',
		ruleset: ['Standard', 'Data Mod', 'Terastal Clause'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['Go! Go! Tamagotchi!'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not a Tamagotchi.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Ponymon",
		mod: 'ponymonshowdown',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Terastal Clause', 'Sleep Clause Mod', 'Data Mod'],
		banlist: ['Darkrai', 'ND Uber', 'ND AG'],
		unbanlist: ['Gholdengo', 'Kingambit', 'Melmetal', 'Regieleki', 'Roaring Moon', 'Shedinja', 'Terapagos', 'Walking Wake'],
		teambuilderFormat: 'National Dex',
	},
	{
		name: "[Gen 9] Ponymon Ubers",
		mod: 'ponymonshowdown',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Ubers Terastal Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Rayquaza Clause'],
		banlist: ['Calyrex-Shadow', 'Gengarite'],
		teambuilderFormat: 'National Dex Ubers',
	},
	{
		name: "[Gen 9] Ponymon UU",
		mod: 'ponymonshowdown',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Terastal Clause', 'Sleep Clause Mod', 'Data Mod'],
		banlist: ['NDOU', 'UUBL', 'ND Uber', 'ND AG'],
		unbanlist: ['Regieleki', 'Shedinja', 'Banette-Mega', 'Ceruledge', 'Clodsire', 'Corviknight', 'Dondozo', 'Garganacl', 'Glimmora', 'Gyarados', 'Iron Crown', 'Iron Hands', 'Latios', 'Pinsir-Mega', 'Tapu Lele', 'Thundurus-Therian', 'Zapdos-Galar'],
		teambuilderFormat: 'National Dex UU',
	},
	{
		name: "[Gen 9] National Dex Strongest State",
		threads: [
		],

		mod: 'gen9strong',
		ruleset: ['Standard NatDex', 'Terastal Clause', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Moves Clause'/*, 'Para Moves Clause'*/],
		banlist: ['AG', 'Uber', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'King\'s Rock', 'Quick Claw', 'Razor Fang', 'Baton Pass',
				'Blizzard', 'Explosion', 'Self-Destruct', 'Drizzle', 'Drought', 'Sand Stream', 'Aguav Berry', 'Figy Berry', 'Iapapa Berry', 'Mago Berry', 'Soul Dew', 'Wiki Berry', 'Last Respects',
		],
		teambuilderFormat: 'National Dex',
	},
	{
		name: "[Gen 9] National Dex Strongest State Ubers",
		threads: [
		],

		mod: 'gen9strong',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Moves Clause'],
		banlist: ['AG', 'Baton Pass', 'Blizzard', 'Moody'],
		teambuilderFormat: 'National Dex Uber',
	},
	{
		name: "[Gen 9] PokeMorty",
		desc: `<b>PokeMorty</b>: A Gen 9 Mod made by SDM_0 heavily inspired by the video-game "Pocket Morty".`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-9880923">Post in Solomods Megathread</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1NwWodcuBmT4fFpgK0PNlr9MslCWm97J3_2YrYP6OZVQ/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'pokemorty',
		ruleset: ['Standard', 'Max Team Size = 5', '!Obtainable Abilities', 'Terastal Clause', '-All Items', 'Data Mod'],
		banlist: ['Implode', 'Negative Space', 'Time Dilation', 'Grill Season', 'Use The Light',
		'Unspoken Bond', 'Bird Lover', 'Apex Genius', 'Training Complete', 'Abstracted Form',
		'Higher Education', 'Cell Division', 'Infiltrate', 'Mirror Image', 'Fast Charging',
		'Death Crystal', 'Magic Door', 'Strip Dance', 'Squid Costume', 'Cut the Chut', 'Bold And Daring',
		'Attention', 'Wedgie-Proof', 'Anthocyanin', 'Grade A', 'Always Fresh', 'Present Portal', 'Impersonate',
		'Flavor Combo', 'Apology Video', 'Espionage', 'Entitlement', 'Hypnotize', 'Mouth Off', 'Doze',
		'Traumatize', 'Mind-Numbing Hello', 'Love Bug', 'Stare Down'],
		onValidateTeam(team) {
			let speciesTable = {};
			let allowedTiers = ['PM OU', 'PM NFE', 'PM LC'];
			let problems = [];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					problems.push(`${set.species} is not a Morty.`);
				}
				if (this.dex.abilities.get(set.ability).id !== "noability") {
					problems.push(`${set.species} can't have ${set.ability}.`);
				}
				if (!['bashful', 'docile', 'hardy', 'quirky', 'serious', ''].includes(this.toID(set.nature))) {
					problems.push(`${set.species} can't have a non-neutral nature.`);
				}
			}
			return problems;
		},
	},
	{
		name: "[Gen 1] RBY Recolored",
		threads: [
      	`&bullet; <a href="https://docs.google.com/document/d/1KqmnxRzM_v8FOWBM98axtIwA-LWeFEs1CUu2NFIdXwY/edit?usp=sharing">Document</a>`,
		],
		mod: 'gen1recolored',
		ruleset: ['Standard', 'Data Mod'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 9] Rock Bottom",
		desc: [
			"<b>Rock Bottom</b>: A micrometa with an extremely low powerlevel and typically common strong tools being thinly distributed.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-10151175">Post in the Solomods Megathread</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1BySngRBKJhUiq0-hynrDp2HVNqzWjL-8RaL8mQIyCqA/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'rockbottom',
		ruleset: ['Standard', 'Terastal Clause', 'Data Mod', 'Sleep Moves Clause', '!Sleep Clause Mod'],
		banlist: ['Arena Trap', 'Moody', 'Shadow Tag', 'King\'s Rock', 'Baton Pass', 'Last Respects', 'Shed Tail'],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['RB'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in [Gen 9] Rock Bottom.'];
				}
			}
		},
	},
	/*{
		name: "[Gen 8] Roulettemons The Solomod",
		desc: `<b>Roulettemons The Solomod</b>: literally roulettemons but a solomod + clean slate micro`,
		mod: 'roulettemonsthesolomod',
		ruleset: ['Standard NatDex', 'Data Mod'],
		banlist: ['All Pokemon'],
		unbanlist: [
			'Spinmadillo', 'Coyoctric', 'Spizelle', 'Fierhog', 'Elatuff', 'Glasyte', 'Bisong', 'Megalo', 'Oysteat', 'Ponymph', 'Hypepion', 'Chickola', 'Skelehawk', 'Catetar', 'Blastquito', 'Hawkward', 'Pandaid', 'Autoad', 'Skelephin', 'Doomossum', 'Llamagic', 'Venoroach', 'Salamados', 'Steelboon', 'Jaguaplume',
		],
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		},
	},*/
	{
		name: "[Gen 9] Scootopia V.2",
		desc: "The second iteration of the hit solomod Scootopia!",
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1khgnzqe3xldhLw1LbfjyYDcsltZrgyo8by4Y8EDE4vQ/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: "scootopia",
		ruleset: ['Standard NatDex', 'Terastal Clause', 'Z-Move Clause', 'Data Mod', 'Super Type Moves Rule', 'OHKO Clause'],
		banlist: ['All Pokemon', 'Crystal Heart', 'Wild Heart', 'Bright Powder', 'Lax Incense', 'King\'s Rock', 'Razor Fang', 'Baton Pass', 'Double Team', 'Snow Cloak', 'Sand Veil'],
		unbanlist: ["Arbrella", "Krachiten", "Scalaron", "Rantler", "Woolora", "Albatrygon", "Orchile",
		"Embuck", "Cindoe", "Cobracotta", "Minillow", "Crossont", "Torgeist", "Platypad", "Lumoth",
		"Aurorowl", "Carapex", "Dojodo", "Nunopod", "Zeploom", "Brawnkey", "Salamalix", "Cinnastar",
		"MuabBoa", "Sturgard", "Harzodia", "Cyllindrake", "Kodokai", "Electangle", "Dolphena", "Soleron",
		"Soleron-Awakened", "Jaegorm", "Jaegorm-Collective", "Elemadillo", "Axolacred", "Roscenti",
		"Blunderbusk", "Barracoth", "Jamborai", "Dracoil", "Celespirit", "Noxtrice", "Avastar",
		"Faerenheit", "Cellsius", "Kelven", "Salaos", "Morndos", "Pythos", "Corundell", "Quadringo",
		"Saphor", "Fenreil", "Efflor", "Flocura", "Flocura-Nexus"],
	},
	{
		name: "[Gen 9] Scootopia V.4",
		desc: "The fourth iteration of the hit solomod Scootopia!",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/scootopia.3742131/post-10103602">Thread</a>`,
		],
		mod: "scootopiav4",
		ruleset: ['Standard NatDex', 'Terastal Clause', 'Z-Move Clause', 'Data Mod', 'Super Type Moves Rule', 'Super Type Clause'],
		banlist: ['All Pokemon', 'Bright Powder', 'Lax Incense', 'King\'s Rock', 'Razor Fang', 'Baton Pass', 'Double Team', 'Snow Cloak', 'Sand Veil', 'Crystal Heart', 'Wild Heart'],
		unbanlist: [
			"Noxtrice", "Sturgard", "Embuck", "Cindoe", "Minillow", "Cinnastar", "Duratreme",
			"Sumolug", "Coraking", "Soleron", "Soleron-Awakened", "Zephyrmine", "Jamborai", 
			"Boreasel", "Skawamud", "Silvuna", "Noxon", "Xiphoil", "Dracoil",
			"Celespirit", "Zygola", "Quadringo", "Wingnut", "Corsegeist", "Smeltoise", 
			"Halbeetle", "Echologos", "Barbolt", "Dojodo", "Zeploom", "Kasappa", 
			"Cyllindrake", "Arbrella-North"
		],
	},
	// {
        // name: "[Gen 9] Scootopia Random Battle",
        // desc: [
            // "The second iteration of the hit solomod Scootopia! Now in randbats!",
        // ],
        // threads: [
			// `&bullet; <a href="https://docs.google.com/spreadsheets/d/1khgnzqe3xldhLw1LbfjyYDcsltZrgyo8by4Y8EDE4vQ/edit?usp=sharing">Spreadsheet</a>`,
		// ],
        // ruleset: ['Standard NatDex', 'Terastal Clause', 'Z-Move Clause', 'Data Mod', 'Super Type Moves Rule', 'OHKO Clause'],
		// banlist: [],
		// team: 'random',
        // mod: 'scootopia',
    // },
	{
		name: "[Gen 9] Shinymons",
		desc: `A Pet Mods Room Mod where every Pokemon receives a new Shiny form.`,
		mod: 'shinymons',
		ruleset: ['Standard', 'Data Preview', '!Team Preview'],
		banlist: ['Uber'],
		validateSet(set, teamHas) {
			let speciesName = set.species;
			if (set.shiny) speciesName += "-Shiny";
			set.species = speciesName;
			this.dex.data.Pokedex[this.toID(speciesName)].name = speciesName;
			return this.validateSet(set, teamHas);
		},
		onTeamPreview() {
			this.add('clearpoke');
			for (const pokemon of this.getAllPokemon()) {
				const details = pokemon.details
					.replace(/(Arceus|Genesect|Gourgeist|Pumpkaboo|Xerneas|Silvally|Urshifu|Dudunsparce)(-[a-zA-Z?-]+)?/g, '$1-*')
					.replace(/(Zacian|Zamazenta)(?!-Crowned)/g, '$1-*') // Hacked-in Crowned formes will be revealed
					.replace(/(Greninja)(?!-Ash)/g, '$1-*'); // Hacked-in Greninja-Ash will be revealed
				this.add('poke', pokemon.side.id, details, pokemon.item ? 'item' : '');
			}
			this.makeRequest('teampreview');
		},
	},
	{
		name: "[Gen 9] Signaturemons",
        desc: `National Dex solomod where new Signature moves are introduced for fully-evolved Pokémon that don't have any.`,
		mod: 'signaturemons',
		teambuilderFormat: 'National Dex',
		ruleset: ['Standard NatDex', 'Event Moves Clause', 'Species Clause', 'Terastal Clause', 'Z-Move Clause'],
		/*Tentative restrictions - will work on it later
		checkCanLearn(move, template, lsetData, set) {
			if (['terablast'].includes(move.id)) return null; //Tera Blast for everyone (except Magikarp, Ditto, Smeargle, Cosmog, Cosmoem and Terapagos)
			if (['hiddenpower'].includes(move.id)) return null; //Hidden power for no one (except Unown)
			return this.checkCanLearn(move, template, lsetData, set);
		},*/
	},
	{
		name: "[Gen 9] Signaturemons Doubles",
        desc: `National Dex solomod where new Signature moves are introduced for fully-evolved Pokémon that don't have any.`,
		mod: 'signaturemons',
		gameType: 'doubles',
		teambuilderFormat: 'National Dex',
		ruleset: ['Standard NatDex', 'Event Moves Clause', 'Species Clause', 'Terastal Clause', 'Z-Move Clause'],
	},
	/*{
		name: "[Gen 9] Signaturemons Random Doubles",
        desc: `National Dex solomod where new Signature moves are introduced for fully-evolved Pokémon that don't have any.`,
		mod: 'signaturemons',
		gameType: 'doubles',
		team: 'random',
		ruleset: ['Standard NatDex', 'Event Moves Clause', 'Species Clause', 'Terastal Clause', 'Z-Move Clause'],
	},*/
	{
        name: "[Gen 9] Spookymod",
        desc: [
            "jumpscaare",
        ],
        threads: [
            `&bullet; <a href="https://www.youtube.com/shorts/bbZCltuyZlM">Spookymod on Smogon Forums</a>`,
              ],
        ruleset: ['Standard NatDex', 'Terastal Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause','Spokymod'],
        banlist: [],
		teambuilderFormat: "National Dex",
        onValidateTeam(team, format) {
            /**@type {{[k: string]: true}} */
            let speciesTable = {};
            let f = false;
            let ff = false;
            for (const set of team) {
                if (set.species === 'Flutter Mane') f = true;
                else if (set.species === 'Flutter Mane 2') ff = true;
                if(f && ff) return ['Did you think you could bring two Flutter Manes to a game? Are you stupid?'];
                let template = this.dex.species.get(set.species);
                if (template.tier !== 'SM') {
                    return [set.species + ' is not usable in Spookymod.'];
                }
            }
        },
        mod: 'spookymod',
    },
	{
        name: "[Gen 9] Spookymod Random Battle",
        desc: [
            "jumpscaare",
        ],
        threads: [
            `&bullet; <a href="https://www.youtube.com/shorts/bbZCltuyZlM">Spookymod on Smogon Forums</a>`,
              ],
        ruleset: ['Standard NatDex', 'Terastal Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', '!Team Preview', 'Spokymod'],
        banlist: [],
		team: 'random',
        mod: 'spookymod',
    },
	{
		name: "[Gen 9] Stadium YB 3v3 Random Battle",
		desc: [
			"<b>Stadium YB</b>: A randomized metagame where each player is given a set of rental Pokemon to battle with."
		],
		threads: [
			`&bullet; <a href="placeholder">Stadium YB in the Solomods Megathread</a>`,
		],
		mod: 'stadiumyb',
		team: 'random',
		bestOfDefault: true,
		ruleset: [
			'Cancel Mod', 'Sleep Clause Mod', 'Endless Battle Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Team Preview',
			'Species Clause', 'Dynamax Clause', 'Exact HP Mod', 'Force Open Team Sheets', 'Picked Team Size = 3', 'Max Team Size = 6',
		],
		onSwitchIn(pokemon) {
			const speed = pokemon.getStat('spe', false, true);
			this.add('-message', `${pokemon.name}'s Speed stat is ${speed}!`);
		},
	},
	{
		name: "[Gen 9] Stadium YB 6v6 Random Battle",
		desc: [
			"<b>Stadium YB</b>: A randomized metagame where each player is given a set of rental Pokemon to battle with."
		],
		threads: [
			`&bullet; <a href="placeholder">Stadium YB in the Solomods Megathread</a>`,
		],
		mod: 'stadiumyb',
		team: 'random',
		bestOfDefault: true,
		ruleset: [
			'Cancel Mod', 'Sleep Clause Mod', 'Endless Battle Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Team Preview',
			'Species Clause', 'Dynamax Clause', 'Exact HP Mod', 'Force Open Team Sheets', 'Picked Team Size = 6', 'Max Team Size = 12',
		],
		onSwitchIn(pokemon) {
			const speed = pokemon.getStat('spe', false, true);
			this.add('-message', `${pokemon.name}'s Speed stat is ${speed}!`);
		},
	},
	// {
		// name: "[Gen 9] Super Types OU",
		// desc: "The Super Type mechanic from Scootopia, only it's applied to current gen 9 OU.",
		// threads: [
			// `&bullet; <a href="https://docs.google.com/spreadsheets/d/1khgnzqe3xldhLw1LbfjyYDcsltZrgyo8by4Y8EDE4vQ/edit#gid=1291687635">Types + Moves Explained</a>`,
			// `&bullet; <a href="https://docs.google.com/spreadsheets/d/1khgnzqe3xldhLw1LbfjyYDcsltZrgyo8by4Y8EDE4vQ/edit#gid=894228879">List of Defensive Type Combos</a>`,
		// ],
		// mod: "supertypesou",
		// ruleset: ['Standard NatDex', 'Z-Move Clause', 'Data Mod'],
	// },
	{
		name: "[Gen 2] Tera Crystal",
		desc: ["<b>Tera Crystal</b>- A Gen 2 solomod where the Gen 9 mechanic of Terastallization is added to the game."],
		mod: 'gen2teracrystal',
		ruleset: ['Standard', 'Data Mod', 'Can Terastal'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 9] The 3-3-1 Typechart",
		desc: [
			"<b>The 3-3-1 Typechart</b>: A solomod that gives every type 3 weaknesses, 3 resistances, and 1 immunity.",
			],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-9403413">Post in the Solomods Megathread</a>`,
		],

		mod: 'the331typechartg9',
		teambuilderFormat: 'National Dex',
		ruleset:['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'Uber', 'AG', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'King\'s Rock',
			'Quick Claw', 'Razor Fang', 'Assist', 'Baton Pass', 'Last Respects', 'Shed Tail',
			'Slowking-Base', 'Slowbro-Base'
		],
		onBegin() {
			this.add('-message', `Be sure to use /weak to find out everything's new type interactions!`);
		},
	},
	{
		name: "[Gen 9] Touhoumons",
		desc: `2hu`,
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1YJXE8wUNJijWSfNKIUqgObN5uEVgTliewTluGe0w4Y4/edit?usp=sharing">Spreadsheet for the mod</a>`,
		],
		mod: 'toho',
		ruleset: ['Standard NatDex', 'Terastal Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Data Mod', 'Mega Data Mod', 'Z-Move Clause'],
		banlist: ['Bug Gem', 'Dark Gem', 'Dragon Gem', 'Electric Gem', 'Fairy Gem', 'Fighting Gem', 'Fire Gem', 'Flying Gem', 'Ghost Gem', 'Grass Gem', 'Ground Gem', 'Ice Gem', 'Poison Gem', 'Psychic Gem', 'Rock Gem', 'Steel Gem', 'Water Gem'],
		unbanlist: ['Light of Ruin'],
		teambuilderFormat: 'National Dex',
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'Toho') {
					return [set.species + ' is not a Touhou character.'];
				}
				if (set.species == 'Cirno-Tanned' && set.ability !== 'Drought')
					 return ["Cirno-Tanned can only have Drought as its ability."]
				if ((set.species !== 'Cirno-Tanned' && set.species !== 'Cirno') && set.ability === 'Drought')
					 return ["Only Cirno-Tanned can have Drought as its ability."]
			}
		},
	},
	{
		name: "[Gen 9] Touhoumons Doubles",
		desc: `2hu`,
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1YJXE8wUNJijWSfNKIUqgObN5uEVgTliewTluGe0w4Y4/edit?usp=sharing">Spreadsheet for the mod</a>`,
		],
		mod: 'toho',
		gameType: 'doubles',
		ruleset: ['Standard NatDex', 'Terastal Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		banlist: [],
		unbanlist: [],
		teambuilderFormat: 'National Dex',
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'DToho') {
					return [set.species + ' is not a Touhou character.'];
				}
				if (set.species == 'Cirno-Tanned' && set.ability !== 'Drought')
					 return ["Cirno-Tanned can only have Drought as its ability."]
				if ((set.species !== 'Cirno-Tanned' && set.species !== 'Cirno') && set.ability === 'Drought')
					 return ["Only Cirno-Tanned can have Drought as its ability."]
			}
		},
	},
	{
		name: "[Gen 1] Tradebacks Expanded",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-9881531">Post in Solomods Megathread</a>`,
      	`&bullet; <a href="https://docs.google.com/spreadsheets/d/1F-e0PZF2LpVBS3yBzO-pCU6XPX1RfmoEucrhNgTco5Y/edit#gid=0">Spreadsheet</a>`,
		],
		mod: 'gen1tradebacksexpanded',
		ruleset: ['Standard'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 9] Upside Down OU",
		desc: `Modern Mechanics and Pokemon mixed with an Old Gen Powerlevel, complete with No Team Preview!`,
		threads: [
			`<a href="https://docs.google.com/spreadsheets/d/15PdTt3gUYmwb7UKwO-bmboIZOg9rRaC1vZhyXQRWbF0">Spreadsheet</a>`,
		],
		mod: 'upsidedown',
		teambuilderFormat: "National Dex",
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Clause Mod', 'Terastal Clause', '!Team Preview'],
		banlist: ['All Pokemon', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'King\'s Rock', 'item: Quick Claw', 'Razor Fang',
		'Assist', 'Last Respects', 'Shed Tail', 'Sticky Web', 'Victory Dance', 'Diancite', 'Mawilite', 'Heavy Duty Boots', 'Choice Specs', 'Choice Scarf',
		'Life Orb', 'Eviolite', 'Flame Orb', 'Toxic Orb', 'Air Balloon', 'Light Clay', 'Terrain Extender', 'Damp Rock', 'Heat Rock', 'Smooth Rock',
		'Icy Rock', 'Red Card', 'Eject Pack', 'Eject Button', 'Weakness Policy', 'Blunder Policy', 'Booster Energy', 'Throat Spray', 'Clear Amulet',
		'Custap Berry', 'Focus Sash', 'Occa Berry', 'Passho Berry', 'Rindo Berry', 'Wacan Berry', 'Yache Berry', 'Colbur Berry', 'Payapa Berry',
		'Roseli Berry', 'Haban Berry', 'Coba Berry', 'Charti Berry', 'Shuca Berry', 'Tanga Berry', 'Kebia Berry', 'Babiri Berry', 'Chople Berry',
		'Kasib Berry', 'Fire Gem', 'Water Gem', 'Grass Gem', 'Electric Gem', 'Ice Gem', 'Dark Gem', 'Psychic Gem', 'Dragon Gem', 'Flying Gem',
		'Bug Gem', 'Fighting Gem', 'Rock Gem', 'Ground Gem', 'Steel Gem', 'Ghost Gem', 'Poison Gem', 'Abomasite', 'Absolite', 'Aerodactylite',
		'Aggronite', 'Alakazite', 'Altarianite', 'Ampharosite', 'Banettite', 'Beedrillite', 'Blastoisinite', 'Blazikenite', 'Blue Orb',
		'Cameruptite', 'Charizardite X', 'Charizardite Y', 'Galladite', 'Garchompite', 'Gardevoirite', 'Gengarite', 'Glalitite', 'Gyaradosite',
		'Houndoominite', 'Kangaskhanite', 'Latiasite', 'Latiosite', 'Lopunnite', 'Lucarionite', 'Manectite', 'Medichamite', 'Metagrossite',
		'Mewtwonite X', 'Mewtwonite Y', 'Pidgeotite', 'Pinsirite', 'Red Orb', 'Sablenite', 'Salamencite', 'Sceptilite', 'Scizorite',
		'Sharpedonite', 'Slowbronite', 'Steelixite', 'Swampertite', 'Tyranitarite', 'Venusaurite',
		],
		unbanlist: ['Baton Pass', 'Wishiwashi', 'Mawile', 'Togepi', 'Togetic', 'Tarountula', 'Spidops', 'Pyukumuku', 'Cursola', 'Scatterbug', 'Spewpa', 'Vivillon', 'Bunnelby', 'Diggersby', 'Obstagoon',
		'Burmy', 'Wormadam', 'Mothim', 'Woobat', 'Swoobat', 'Wiglett', 'Wugtrio', 'Clodsire', 'Emolga', 'Cubone', 'Dedenne',
		'Togedemaru', 'Morpeko', 'Audino', 'Kecleon', 'Purrloin', 'Liepard', 'Honedge', 'Doublade', 'Snubbull', 'Granbull', 'Nymble',
		'Lokix', 'Nickit', 'Thievul', 'Gossifleur', 'Eldegoss', 'Finneon', 'Lumineon', 'Skwovet', 'Greedent', 'Spritzee', 'Aromatisse',
		'Espurr', 'Throh', 'Sawk', 'Klefki', 'Rellor', 'Rabsca', 'Trubbish', 'Garbodor', 'Stunfisk', 'Furfrou', 'Joltik', 'Galvantula',
		'Phantump', 'Trevenant', 'Tatsugiri', 'Deerling', 'Sawsbuck', 'Snom', 'Frosmoth', 'Cramorant', 'Oricorio', 'Veluza', 'Crabrawler',
		'Crabominable', 'Salandit', 'Salazzle', 'Orthworm', 'Swirlix', 'Slurpuff', 'Darumaka', 'Darmanitan', 'Helioptile', 'Heliolisk',
		'Flittle', 'Espathra', 'Golett', 'Golurk', 'Sandygast', 'Palossand', 'Runerigus', 'Heatmor', 'Durant', 'Venipede', 'Whirlipede',
		'Scolipede', 'Druddigon', 'Pikipek', 'Trumbeak', 'Toucannon', 'Turtonator', 'Pichu', 'Pikachu', 'Shroodle', 'Grafaiai', 'Chewtle',
		'Drednaw', 'Drampa', 'Dwebble', 'Crustle', 'Elgyem', 'Beheeyem', 'Capsakid', 'Scovillain', 'Munna', 'Musharna', 'Rockruff',
		'Greavard', 'Houndstone', 'Pidove', 'Tranquill', 'Unfezant', 'Lechonk', 'Pawmi', 'Pawmo', 'Pawmot', 'Bouffalant', 'Yamper', 'Boltund',
		'Skrelp', 'Dragalge', 'Pancham', 'Pangoro', 'Tirtouga', 'Carracosta', 'Mareanie', 'Toxapex', 'Rookidee', 'Corvisquire',
		'Corviknight', 'Blitzle', 'Zebstrika', 'Pansear', 'Panpour', 'Pansage', 'Simisear', 'Simipour', 'Simisage', 'Fletchling',
		'Fletchinder', 'Talonflame', 'Grubbin', 'Charjabug', 'Vikavolt', 'Varoom', 'Revavroom', 'Mudbray', 'Mudsdale', 'Sewaddle',
		'Swadloon', 'Leavanny', 'Cufant', 'Copperajah', 'Clauncher', 'Clawitzer', 'Carbink', 'Binacle', 'Barbaracle', 'Stufful', 'Bewear',
		'Hawlucha', 'Nacli', 'Naclstack', 'Garganacl', 'Toxel', 'Cubchoo', 'Beartic', 'Maschiff', 'Mabosstiff', 'Dracozolt', 'Arctovish',
		'Sirfetchd', 'Litleo', 'Pyroar', 'Sinistea', 'Polteageist', 'Tympole', 'Palpitoad', 'Seismitoad', 'Bounsweet', 'Steenee',
		'Tsareena', 'Blipbug', 'Dottler', 'Orbeetle', 'Rolycoly', 'Carkol', 'Coalossal', 'Rufflet', 'Silicobra', 'Sandaconda', 'Smoliv',
		'Dolliv', 'Arboliva', 'Impidimp', 'Morgrem', 'Grimmsnarl', 'Hatenna', 'Hattrem', 'Hatterene', 'Bergmite', 'Avalugg', 'Toedscool',
		'Toedscruel', 'Tynamo', 'Eelektrik', 'Eelektross', 'Mime Jr.', 'Mr. Rime', 'Girafarig', 'Farigiraf', 'Cetoddle', 'Cetitan',
		'Stantler', 'Wyrdeer', 'Sizzlipede', 'Centiskorch', 'Glimmet', 'Glimmora', 'Exeggcute', 'Dondozo', 'Noibat', 'Noivern',
		'Duraludon', 'Skiddo', 'Gogoat', 'Dunsparce', 'Dudunsparce', 'Poipole', 'Naganadel', 'Fuecoco', 'Crocalor', 'Skeledirge',
		'Rowlet', 'Dartrix', 'Scorbunny', 'Raboot', 'Cinderace', 'Popplio', 'Brionne', 'Primarina', 'Froakie', 'Frogadier', 'Greninja',
		'Snivy', 'Servine', 'Serperior', 'Flabébé', 'Floette', 'Florges', 'Archen', 'Archeops', 'Blacephalon', 'Celesteela',
		'Slither Wing', 'Iron Jugulis', 'Iron Bundle', 'Scream Tail', 'Sandy Shocks', 'Great Tusk', 'Iron Treads', 'Articuno', 'Virizion',
		'Iron Leaves', 'Brute Bonnet', 'Iron Thorns', 'Meloetta', 'Diancie', 'Goomy', 'Sliggoo', 'Goodra', 'Corsola-Galar',
		'Rattata-Alola', 'Raticate-Alola', 'Zigzagoon-Galar', 'Linoone-Galar', 'Wormadam-Sandy', 'Wormadam-Trash Cloak', 'Wooper-Paldea',
		'Marowak-Alola', 'Sneasel-Hisui', 'Sandshrew-Alola', 'Sandslash-Alola', 'Basculin-White-Striped', 'Basculegion', 'Basculegion-F',
		'Meowstic', 'Meowstic-F', 'Yamask-Galar', 'Raichu-Alola', 'Lycanroc', 'Lycanroc-Midnight', 'Oinkologne', 'Oinkologne-F',
		'Voltorb-Hisui', 'Electrode-Hisui', 'Pumpkaboo', 'Pumpkaboo-Small', 'Pumpkaboo-Large', 'Pumpkaboo-Super', 'Gourgeist',
		'Gourgeist-Small', 'Gourgeist-Large', 'Gourgeist-Super', 'Geodude-Alola', 'Graveler-Alola', 'Golem-Alola', 'Ponyta-Galar',
		'Rapidash-Galar', 'Toxtricity', 'Toxtricity-Low-Key', 'Farfetchd-Galar', 'Braviary-Hisui', 'Mr. Mime-Galar', 'Exeggutor-Alola',
		'Decidueye-Hisui', 'Ursaluna-Bloodmoon', 'Articuno-Galar', 'Audino-Mega', 'Petilil', 'Lilligant-Hisui', 'Clobbopus', 'Grapploct',
		'Amaura', 'Aurorus', 'Diglett-Alola', 'Dugtrio-Alola', 'Qwilfish-Hisui', 'Overqwil', 'Morelull', 'Shiinotic',
		'Wooloo', 'Dubwool', 'Bombirdier',
		],
		onValidateTeam(team, format) {
            /**@type {{[k: string]: true}}*/
            let speciesTable = {};
            let allowedTiers = ['Upside Down OU', 'Upside Down NFE', 'Upside Down LC']; //Upside Down Uber exists but not playable
            for (const set of team) {
                let template = this.dex.species.get(set.species);
                                //if (template === 'Ursaluna-Bloodmoon' && set.nature !== 'Hardy') return [set.species + ' must have a Hardy Nature.'];
									//non functional atm
								//if (template === 'Toxtricity' && ['Lonely', 'Bold', 'Relaxed', 'Timid', 'Serious', 'Modest', 'Mild', 'Quiet', 'Bashful', 'Calm', 'Gentle', 'Careful'].includes(set.nature)) return [set.nature + 'is not a valid nature for this form of Toxtricity.'];
									//non functional atm also amped tox keeps getting
								//if (template === 'Toxtricity-Low-Key' && ['Hardy', 'Brave', 'Adamant', 'Naughty', 'Docile', 'Impish', 'Lax', 'Hasty', 'Jolly', 'Naive', 'Rash', 'Sassy', 'Quirky'].includes(set.nature)) return [set.species + 'is not a valid nature for this form of Toxtricity.'];
                if (!allowedTiers.includes(template.tier)) {
                    return [set.species + ' is not legal in Upside Down OU.'];
                }
            }
        },
	},
	{
		name: "[Gen 1] Violet Version G1",
		desc: "Violet Version G1 Rainbow Edition is a balance mod focused on bringing wonderful new feelings and colors to RBY competitive play.",
		mod: "gen1violetversion",
		gen: 1,
		ruleset: ['Obtainable', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Species Clause', 'OHKO Clause', 'Evasion Moves Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['All Pokemon'],
		unbanlist: ['Aerodactyl', 'Alakazam', 'Arbok', 'Articuno', 'Beedrill', 'Blastoise', 'Butterfree', 'Chansey', 'Charizard', 'Cloyster', 'Dragonite', 'Dugtrio', 'Electabuzz', 'Electrode', 'Exeggutor', 'Flareon', 'Gengar', 'Golbat', 'Golduck', 'Golem', 'Gyarados', 'Hypno', 'Jynx', 'Kabutops', 'Machamp', 'Magmar', 'Magneton', 'Mew', 'Moltres', 'Muk', 'Nidoqueen', 'Ninetales', 'Parasect', 'Pidgeot', 'Pinsir', 'Poliwrath', 'Porygon', 'Slowbro', 'Snorlax', 'Starmie', 'Tangela', 'Tauros', 'Vileplume', 'Zapdos'],
	},
	{
		name: "[Gen 8] Weedmons",
		desc: `Weedmons is a SoloMod originally led by The Reptile, whose purpose is primarily to make a fun micrometa based on the	completely arbitrary limitations of the theme of Weed!.`,
		mod: 'weedmons',
		gen: 9,
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Species Clause', 'Sleep Clause Mod', 'Dynamax Clause'],
		banlist: ['All Pokemon', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'King\'s Rock', 'item: Quick Claw' /*Wtf is this validator on? What ability?*/, 'Razor Fang',
		'Assist', 'Baton Pass', 'Last Respects', 'Shed Tail', 'Altarianite', 'Charizardite X', 'Charizardite Y', 'Blazikenite',],
		unbanlist: ['Altaria', 'Azumarill', 'Azurill', 'Blaziken', 'Braixen', 'Brionne', 'Blitzle', 'Bouffalant', 'Castform', 'Centiskorch', 'Charizard', 'Charmander', 'Charmeleon', 'Cherubi',
		'Chimchar', 'Cinderace', 'Combusken', 'Crocalor', 'Cyndaquil', 'Dartrix', 'Deerling', 'Delphox', 'Dragonair', 'Drampa', 'Drizzile', 'Emboar', 'Farigiraf', 'Fennekin', 'Fuecoco', 'Girafarig',
		'Gogoat', 'Golduck', 'Goodra', 'Goodra-Hisui', 'Goomy', 'Hakamo-O', 'Heatmor', 'Incineroar', 'Infernape', 'Lickilicky', 'Lickitung', 'Linoone', 'Linoone-Galar', 'Litten', 'Marill', 'Metang',
		'Mightyena', 'Miltank', 'Monferno', 'Oddish', 'Pansear', 'Pignite', 'Poipole', 'Psyduck', 'Quilava', 'Raboot', 'Sawsbuck', 'Scorbunny', 'Shelgon', 'Simisear', 'Sizzlipede', 'Skeledirge',
		'Skiddo', 'Sliggoo', 'Sliggoo-Hisui', 'Stantler', 'Swablu', 'Tepig', 'Thwackey', 'Torchic', 'Torkoal', 'Torracat', 'Typhlosion', 'Typhlosion-Hisui', 'Watchog', 'Wyrdeer', 'Zebstrika', 'Zweilous',
		],
	},
	/*
		{
		name: "[Gen 4] Yayamons",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-modern-gen-2.3725808/>Post in Solomods Megathread</a>`,
		],
// placeholder link
		mod: 'yayamons',
		gameType: 'doubles',
		ruleset: ['Standard Doubles', 'Swagger Clause'],
		banlist: ['Uber'],
	},*/
	///////////////////////////////////////////////////////////////
	///////////////////// Non-Smogon Mods /////////////////////////
	///////////////////////////////////////////////////////////////
	// {
		// section: "Non-Smogon Mods",
		// column: 2,
	// },

	///////////////////////////////////////////////////////////////
	//////////////////////// Randbats /////////////////////////////
	///////////////////////////////////////////////////////////////
	// {
		// section: "Randbats",
		// column: 2,
	// },
	// {
        // name: "[Gen 9] Duomod Random Battle",
        // desc: `<b>gen 9 duomod back and better than ever baybeeeeee</b>`,
        // threads: [
            // `&bullet; <a href="https://docs.google.com/spreadsheets/d/1VZp8emRachS_ieusnF8FWKFqTcOUjrVyr393J-J17pY/edit?usp=sharing">Spreadsheet</a>`,
        // ],
        // team: 'random',
        // mod: 'gen9duomod',
        // ruleset: ['Standard NatDex', 'Subscribe For More Content', 'Duomod Data Mod'],
        // onSwitchIn(pokemon) {
            // this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
        // },
    // },
	// {
		// name: "[Gen 8] Duomod Random Battle",
		// desc: `<b>Duomod</b>: Legendary YouTuber and professional Smash player DuoM2's solomod, build around the idea where nobody is ever truly losing.`,
        // threads: [
            // `&bullet; <a href="https://docs.google.com/spreadsheets/d/1lguyF31tjV8f-Gv3uLxmZXGAlg23k2fkF_nBqevJouM/edit?usp=sharing">Spreadsheet</a>`,
        // ],
		// team: 'random',
		// mod: 'duomod',
		// ruleset: ['Standard NatDex', 'Subscribe For More Content', 'Duomod Data Mod'],
		// onSwitchIn(pokemon) {
			// this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		// },
	// },
	// {
		// name: "[Gen 8] Fusion Evolution UU Random Battle",
		// threads: [
			// `&bullet; <a href="https://www.smogon.com/forums/threads/fusion-evolution-under-used-submission-slate-3.3674163/">Fusion Evolution Under Used on Smogon Forums</a>`,
			// `&bullet; <a href="https://docs.google.com/spreadsheets/d/1zFk1_DBIoXFFn_7JpvYbVBrW-f1oFFh80Wn0CJNnbVo/edit#gid=0">Spreadsheet</a>`,
		// ],
		// mod: 'feuu',
		// team: 'random',
		// ruleset: ['OHKO Clause', 'Obtainable', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod', 'Cancel Mod'],
	// },
	// {
		// name: "[Gen 1] FutureProofing Random Battle",
	   // desc: `<b>[Gen 1] FutureProofing</b>: Adapting Dark, Steel, and Fairy-type moves and Pokemon to the Gen 1 OU metagame.`,
	   // threads: [
			// `&bullet; <a href="https://www.smogon.com/forums/threads/gen-1-futureproofing-slate-1-discussion.3703375/">FutureProofing on Smogon Forums</a>`,
	   // ],
		// mod: 'gen1futureproofing',
		// team: 'random',
		// ruleset: ['Standard', 'Data Mod'],
	// },
	// {
		// name: "[Gen 8] JolteMons Random Battle",
		// desc: [
			// "<b>JolteMons</b>: A sequel to SylveMons where Pokemon, items, abilities and moves are redesigned for OU (and new items, abilities and moves are added) without changing base stats.",
		// ],
		// threads: [
			// `&bullet; <a href="https://www.smogon.com/forums/threads/joltemons-slate-1-distribution-phase.3694234/">Thread on the Smogon Forums</a>`,
			// `&bullet; <a href="https://docs.google.com/spreadsheets/d/149ZlQY0bJIAqfWB_233Dvbpqs3pVSHYpIoAQQkwquls/edit?usp=sharing">Spreadsheet</a>`,
		// ],
		// mod: 'joltemons',
		// team: 'random',
		// ruleset: ['Dynamax Clause', 'Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Mega Data Mod', 'Data Mod', 'Z-Move Clause'],
	// },
	// {
// name: "[Gen 1] Modern Gen 1 Random Battle",
		// desc: [
			// "<b>Modern Gen 1</b>: Gen 1 with all Pokemon and moves from Gen 9 Natdex added.",
		// ],
		// threads: [
			// `&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-modern-gen-1.3711533/">Thread on the Smogon Forums</a>`,
		// ],
		// mod: 'moderngen1',
		// team: 'random',
		// ruleset: ['Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod'],
	// },
	// {
// name: "[Gen 2] GSC Doubles Random Battle",
		// desc: [
			// "GSC Doubles with random teams.",
		// ],
		// threads: [
			// `&bullet; <a href="https://www.smogon.com/forums/threads/gsc-doubles-new-lcots.3755811/">Thread on the Smogon Forums</a>`,
		// ],
		// mod: 'gen2doubles',
		// gameType: 'doubles',
		// team: 'random',
		// ruleset: ['Standard Doubles', 'Swagger Clause'],
		// banlist: ['Uber', 'Bright Powder', 'King\'s Rock', 'Quick Claw'],
	// },
	// {
		// name: "[Gen 8] Roulettemons Random",
		// threads: [
			// `&bullet; <a href="https://www.smogon.com/forums/threads/3649106/">Roulettemons on Smogon Forums</a>`,
			// `&bullet; <a href="https://docs.google.com/spreadsheets/d/1EOA1m7JXTq7Zz0ViVI4n6lBppFjVBa4S1GqhAwkPTZQ/edit?usp=sharing">Spreadsheet</a>`,
			// `&bullet; <a href="https://docs.google.com/spreadsheets/d/1J5ZMVzTAfJ48KQWVE7jt1S6fm7Y8DQX1tFX0-iENWiw/edit?usp=sharing">Bonus Random Team Generator</a>`,
		// ],
		// team: 'random',
		// mod: 'roulettemons',
		// ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod'],
		// onSwitchIn(pokemon) {
			// this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		// },
		// onChangeSet(set) {
			// if (set.species === 'Chillyte-Mega') {
				// set.species = 'Chillyte';
				// set.ability = 'Grassy Surge';
			// }
		// },
	// },
	// {
      // name: "[Gen 8] OU Theorymons Random Battle",
      // threads: [
          // `&bullet; <a href="https://www.smogon.com/forums/threads/ss-ou-theorymon.3695574/">OU Theorymons on Smogon Forums</a>`,
          // `&bullet; <a href="https://docs.google.com/spreadsheets/d/1AgqKo8IiXky8apuu0FUgx4MJRVtsVwtuhg_Wj_ACgao/edit#gid=0">Spreadsheet</a>`,
      // ],
      // team: 'random',
		// mod: 'outheorymons',
		// ruleset: ['Dynamax Clause', 'Data Mod', 'Species Clause'],
	// },
	// {
		// name: "[Gen 8] Roulettemons Random Doubles",
		// threads: [
		   // `&bullet; <a href="https://www.smogon.com/forums/threads/3649106/">Roulettemons on Smogon Forums</a>`,
			// `&bullet; <a href="https://docs.google.com/spreadsheets/d/1EOA1m7JXTq7Zz0ViVI4n6lBppFjVBa4S1GqhAwkPTZQ/edit?usp=sharing">Spreadsheet</a>`,
			// `&bullet; <a href="https://docs.google.com/spreadsheets/d/1J5ZMVzTAfJ48KQWVE7jt1S6fm7Y8DQX1tFX0-iENWiw/edit?usp=sharing">Bonus Random Team Generator</a>`,
		// ],
		// team: 'random',
		// gameType: 'doubles',
		// mod: 'roulettemons',
		// ruleset: ['Standard NatDex', 'Sleep Clause Mod'],
		// onSwitchIn(pokemon) {
			// this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		// },
		// onChangeSet(set) {
			// if (set.species === 'Chillyte-Mega') {
				// set.species = 'Chillyte';
			// }
		// },
	// },
	///////////////////////////////////////////////////////////////
	/////////////// Pet Mods Bonus Formats //////////////////
	///////////////////////////////////////////////////////////////
	{
		section: "Pet Mods Bonus Formats",
		column: 3,
		// name: "petmodsbonusformats",
	},
	{
		name: "[Gen 9] Blank Canvas Random Battle",
		desc: `A Gen 9 micrometa feautring only Fakemon made by teams of players with a limited budget.`,
		threads: [
			`<a href="https://www.smogon.com/forums/threads/3748841/">Blank Canvas</a>`,
		],
		mod: 'blankcanvas',
		team: 'randomBLC',
		ruleset: ['Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Illusion Level Mod', 'Terastal Clause', 'Data Mod'],
	},
	{
		name: "[Gen 9] Breeding Variants V4 No Megas",
		desc: `A NatDex format that adds alternate forms for Pokemon based around inheriting elements from a possible breeding partner.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/breeding-variants-v4.3760184/">Breeding Variants V4</a>`,
		],
		mod: 'breedingvariantsnatdex',
		teambuilderFormat: "National Dex",
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Data Mod', 'Sleep Clause Mod', 'Terastal Clause', 'Mega Data Mod'],
		banlist: [
			'Uber', 'AG', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'King\'s Rock',
			'Quick Claw', 'Razor Fang', 'Assist', 'Baton Pass', 'Last Respects', 'Shed Tail',
		],
		onValidateSet(set) {
			const problems: string[] = [];
			const setHas: {[k: string]: true} = {};
			let species = this.dex.species.get(set.species);
			let item = this.dex.items.get(set.item);
			let tierSpecies = species;

			if (item.megaStone) {
				[item.name + ' is banned as this is a no mega format.'];
			}
		},
	},
	{
		name: "[Gen 9] Breeding Variants V4 SV Cup",
		desc: `A SV OU format that adds alternate forms for Pokemon based around inheriting elements from a possible breeding partner.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/breeding-variants-v4.3760184/">Breeding Variants V4</a>`,
		],
		mod: 'breedingvariants',
		teambuilderFormat: "OU",
		ruleset: ['Standard', 'Data Mod', 'Sleep Moves Clause', '!Sleep Clause Mod'],
		banlist: ['Uber', 'AG', 'Arena Trap', 'Moody', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Razor Fang', 'Baton Pass', 'Last Respects', 'Shed Tail'],
	},
	{
		name: "[Gen 9] Crossover Chaos [Defunct]",
		desc: `Crossover Chaos, a micrometa designed to crossover characters from video game titles.`,
		threads: [
			`<a href="https://www.smogon.com/forums/threads/gen-9-crossover-chaos.3711854/#post-9421623">Gen 9 Crossover Chaos</a>`,
		],
		mod: 'gen9crossoverchaos',
		teambuilderFormat: "National Dex",
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Data Mod', 'Sleep Clause Mod', 'Terastal Clause', /* 'Mega Data Mod' */],
		onChangeSet(set) {
			const item = this.toID(set.item);
			if (set.species === 'King Dedede' || set.species === 'Masked Dedede') {
				if (item === 'dededesmask') {
					set.species = 'Masked Dedede';
					let attackOrder = set.moves.indexOf('attackorder');
					if (attackOrder >= 0) {
						set.moves[attackOrder] = 'gigatonhammer';
					}
					let beatup = set.moves.indexOf('beatup');
					if (beatup >= 0) {
						set.moves[beatup] = 'electrohammer';
					}
				}
				else {
					set.species = 'King Dedede';
				}
			}
		},
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['CC OU', 'CC UU'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Crossover Chaos Gen 9.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Crossover Chaos AG [Defunct]",
		desc: `Crossover Chaos, allowing mons in CC Ubers and unintroduced to be used.`,
		threads: [
			`<a href="https://www.smogon.com/forums/threads/gen-9-crossover-chaos.3711854/#post-9421623">Gen 9 Crossover Chaos</a>`,
		],
		mod: 'gen9crossoverchaos',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Data Mod', 'Sleep Clause Mod', 'Terastal Clause', /* 'Mega Data Mod' */],
		onChangeSet(set) {
			const item = this.toID(set.item);
			if (set.species === 'King Dedede' || set.species === 'Masked Dedede') {
				if (item === 'dededesmask') {
					set.species = 'Masked Dedede';
					let attackOrder = set.moves.indexOf('attackorder');
					if (attackOrder >= 0) {
						set.moves[attackOrder] = 'gigatonhammer';
					}
					let beatup = set.moves.indexOf('beatup');
					if (beatup >= 0) {
						set.moves[beatup] = 'electrohammer';
					}
				}
				else {
					set.species = 'King Dedede';
				}
			}
		},
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['CC OU', 'CC UU', 'CC Ubers', 'unintroduced'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Crossover Chaos Gen 9 AG.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Crossover Chaos [Ver. C] Random Battle",
		mod: 'gen9crossoverchaosc',
		team: 'random',
		desc: `gen9crossoverchaosc`,
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Data Mod', 'Sleep Moves Clause', 'Terastal Clause', 'Mega Data Mod', '!Team Preview'],
	},
	{
		name: "[Gen 9] Dream World Theorymons",
		desc: '<b>[Gen 8] Gen 9 Dream World Theorymons</b>: A testing ground for the Gen 9 OU Theorymons metagame.',
		mod: 'outheorymons',
		ruleset: ['Standard', 'Data Mod'],
		banlist: ['Uber', 'AG', 'Arena Trap', 'Moody', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Baton Pass', 'Last Respects'],
	},
	{
		name: "[Gen 9] Glacemons Balanced Hackmons",
		desc: `Balanced Hackmons with Glacemons elements mixed in.`,
		mod: 'glacemons',
		searchShow: false,
		ruleset: ['-Nonexistent', 'Standard NatDex', 'Forme Clause', 'Sleep Moves Clause', 'Ability Clause = 2', 'OHKO Clause', 'Evasion Moves Clause', 'Dynamax Clause', 'CFZ Clause', 'Terastal Clause', '!Obtainable'],
		banlist: [
			'Cramorant-Gorging', 'Calyrex-Shadow', 'Darmanitan-Galar-Zen', 'Eternatus-Eternamax', 'Greninja-Ash', 'Groudon-Primal', 'Rayquaza-Mega', 'Shedinja', 'Arena Trap',
			'Contrary', 'Gorilla Tactics', 'Huge Power', 'Illusion', 'Innards Out', 'Magnet Pull', 'Neutralizing Gas', 'Parental Bond', 'Pure Power', 'Shadow Tag',
			'Stakeout', 'Water Bubble', 'Wonder Guard', 'Gengarite', 'Berserk Gene', 'Belly Drum', 'Bolt Beak', 'Ceaseless Edge', 'Chatter', 'Double Iron Bash', 'Electrify',
			'Last Respects', 'Octolock', 'Rage Fist', 'Revival Blessing', 'Shed Tail', 'Shell Smash', 'Comatose + Sleep Talk', 'Imprison + Transform',
			// Glacemons bans
			'Cosmic Energy', 'Light Power', 'Run It Back', 'Dungeon\'s Looplet', 'Neutralizer', 'Puppet Strings',
		],
		restricted: ['Arceus'],
		onValidateTeam(team, format) {
			// baseSpecies:count
			const restrictedPokemonCount = new this.dex.Multiset<string>();
			for (const set of team) {
				const species = this.dex.species.get(set.species);
				if (!this.ruleTable.isRestrictedSpecies(species)) continue;
				restrictedPokemonCount.add(species.baseSpecies);
			}
			for (const [baseSpecies, count] of restrictedPokemonCount) {
				if (count > 1) {
					return [
						`You are limited to one ${baseSpecies} forme.`,
						`(You have ${count} ${baseSpecies} forme${count === 1 ? '' : 's'}.)`,
					];
				}
			}
		},
	},
	{
		name: "[Gen 3] Hoenn Gaiden UU",
		desc: ["<b>Hoenn Gaiden</b>: A Gen 3 pet mod that aims to devamp Gen 4-8 Pokemon, moves and items into the Gen 3 mechanics."],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/hoenn-gaiden-pet-mod-of-the-season.3714737/">Hoenn Gaiden on Smogon Forums</a>`,
		],

		mod: 'gen3uuhoenngaiden',
		ruleset: ['Standard', 'Data Mod', 'Freeze Clause Mod'],
		banlist: [
				'Uber', 'OU', 'UUBL', 'Snow Warning', 'Air Balloon',
				'Babiri Berry', 'Charti Berry', 'Chilan Berry', 'Chople Berry', 'Coba Berry', 'Colbur Berry',
				'Haban Berry', 'Kasib Berry', 'Kebia Berry', 'Occa Berry', 'Passho Berry', 'Payapa Berry',
				'Rindo Berry', 'Roseli Berry', 'Shuca Berry', 'Tanga Berry', 'Wacan Berry', 'Yache Berry',
		],
		unbanlist: [],
	},
	{
		name: "[Gen 9] Iron Fist Doubles",
		threads: [
			`<a href="https://www.smogon.com/forums/threads/.3748853/">Iron Fist</a>`,
		],
		mod: 'sharedpowerironfist',
		teambuilderFormat: "National Dex",
		gameType: 'doubles',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod', 'Big Button Rule', 'MILF Rule', 'Ohmyrod Rule', 'Serious Rule', 'I love refrigerators Rule', 'Mario Kart Wii Clause'],
		banlist: ['Baton Pass', 'King\'s Rock', 'Razor Fang', 'Moody',
		'Buginium Z', 'Darkinium Z', 'Dragonium Z', 'Electrium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Normalium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z', 'Waterium Z',
		'Abomasite', 'Absolite', 'Red Orb', 'Fish', 'Diamond Hand', 'Hoenn'],
		unbanlist: ['Light of Ruin', 'Baddy Bad'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['IF'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Iron Fist.'];
				}
			}
		},
	},
	{
		name: "[Gen 8] JolteMons Random Battle",
		desc: `Pok&eacute;mon, items, abilities, and moves are redesigned for OU, and new items, abilities, and moves are added, all without changing base stats.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3694234/">JolteMons</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/149ZlQY0bJIAqfWB_233Dvbpqs3pVSHYpIoAQQkwquls/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'joltemons',
		team: 'random',
		ruleset: ['Dynamax Clause', 'Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Mega Data Mod', 'Z-Move Clause'],
	},
	{
		name: "[Gen 9] MetaMons Expanded",
		desc: [
			"In this Pet Mod, we will aim to create a decently-sized micrometa that will expand in the unique niches of some Pokémon, giving them the spotlight after all the time they have been waiting.",
		],
		threads: [
			'&bullet; <a href="https://www.smogon.com/forums/threads/metamons-slate-3-galarian-slowbro-sableye-grapploct.3703361/">MetaMons</a>',
			'&bullet; <a href="https://docs.google.com/spreadsheets/d/142lxuFtTgQCY56Wz_ZjAGaqlk7HgJj0CVKMChQcei1U/edit#gid=0">Spreadsheet</a>',
		],
		mod: 'metamons',
		ruleset:['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Terastal Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod', 'Z-Move Clause'],
		banlist: [
			'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass', 'Beedrillite'
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'MetaMons' && template.tier !== 'Gen 8 MetaMons' && template.tier !== 'Gen 7 MetaMons') {
					return [set.species + ' is not usable in MetaMons Expanded.'];
				}
			}
		},
	},
	{
		name: "[Gen 6] Mix and Megas Revisited",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3713949/">Megas Revisited on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1wK11cPHnPCmH7JFss6leKW6_-cumn3DuZA-YMzrzF-U/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'gen6mixandmegasrevisited',
		ruleset: ['Standard', 'Swagger Clause', 'Mega Data Mod'],
		banlist: [
			'Medichamite', 'Glalitite', 'Altarianite', 'Mawilite',
		],
		restricted: [
			'Arceus', 'Cresselia', 'Darkrai', 'Deoxys-Attack', 'Deoxys-Normal', 'Deoxys-Speed', 'Dialga', 'Dragonite', 'Genesect',
			'Giratina', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Lugia', 'Manaphy', 'Mewtwo',
			'Palkia', 'Rayquaza', 'Regigigas', 'Reshiram', 'Shaymin-Sky', 'Slaking', 'Xerneas', 'Yveltal', 'Zekrom',
		],
		onValidateTeam(team) {
			const itemTable = new Set<ID>();
			for (const set of team) {
				const item = this.dex.items.get(set.item);
				if (!item.megaStone && !item.onPrimal &&
					!item.forcedForme?.endsWith('Origin') && !item.name.startsWith('Rusted')) continue;
				const natdex = this.ruleTable.has('standardnatdex');
				if (natdex && item.id !== 'ultranecroziumz') continue;
				const species = this.dex.species.get(set.species);
				if (species.isNonstandard && !this.ruleTable.has(`+pokemontag:${this.toID(species.isNonstandard)}`)) {
					return [`${species.baseSpecies} does not exist in gen 9.`];
				}
				if ((item.itemUser?.includes(species.name) && !item.megaStone && !item.onPrimal) ||
					(natdex && species.name.startsWith('Necrozma-') && item.id === 'ultranecroziumz')) {
					continue;
				}
				if (this.ruleTable.isRestrictedSpecies(species) || this.toID(set.ability) === 'powerconstruct') {
					return [`${species.name} is not allowed to hold ${item.name}.`];
				}
				if (itemTable.has(item.id)) {
					return [
						`You are limited to one of each mega stone/orb/rusted item/sinnoh item.`,
						`(You have more than one ${item.name})`,
					];
				}
				itemTable.add(item.id);
			}
		},
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				pokemon.m.originalSpecies = pokemon.baseSpecies.name;
			}
		},
		onSwitchIn(pokemon) {
			// @ts-ignore
			const originalFormeSpecies = this.dex.species.get(pokemon.species.originalSpecies);
			if (originalFormeSpecies.exists && pokemon.m.originalSpecies !== originalFormeSpecies.baseSpecies) {
				// Place volatiles on the Pokémon to show its mega-evolved condition and details
				this.add('-start', pokemon, originalFormeSpecies.requiredItem || originalFormeSpecies.requiredMove, '[silent]');
				const oSpecies = this.dex.species.get(pokemon.m.originalSpecies);
				if (oSpecies.types.length !== pokemon.species.types.length || oSpecies.types[1] !== pokemon.species.types[1]) {
					this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
				}
			}
		},
		// Starting innate abilities in scripts#actions
		onSwitchOut(pokemon) {
			// @ts-ignore
			const oMegaSpecies = this.dex.species.get(pokemon.species.originalSpecies);
			if (oMegaSpecies.exists && pokemon.m.originalSpecies !== oMegaSpecies.baseSpecies) {
				this.add('-end', pokemon, oMegaSpecies.requiredItem || oMegaSpecies.requiredMove, '[silent]');
			}
		},
	},
	{
		name: "[Gen 9] TeraMax VGC",
		mod: 'teramax',
		gameType: 'doubles',
		bestOfDefault: true,
		ruleset: ['Obtainable', 'Team Preview', 'Species Clause', 'Nickname Clause', 'Item Clause', 'Cancel Mod', 'Picked Team Size = 4', 'Adjust Level = 50', 'VGC Timer', 'Open Team Sheets', 'Data Mod'],
		banlist: [
			'Battle Bond', 'Melmetal-Gmax', 'Ogerpon-Hearthflame + Close Combat', 'Ogerpon-Hearthflame + Rock Blast',
			'Ogerpon-Wellspring + Close Combat', 'Ogerpon-Wellspring + Rock Blast', 'Ogerpon-Cornerstone + Rock Blast',
			'Restricted Legendary', 'Mythical',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['TMOU', 'TMFE', 'TMNFE', "TMLC"];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in TeraMax.'];
				}
			}
		},
		onSwitchOut(pokemon) {
			const isTeraStellar = pokemon.terastallized === 'Stellar';
			if (isTeraStellar) {
			   pokemon.stellarBoostedTypes = [];
			}
		},
	},
	{
		name: "[Gen 9] VaporeMons Random Battle (Beta)",
		desc: [
			"<b>VaporeMons</b>: The third mod in the SylveMons series where Pokemon, items, abilities and moves are redesigned for OU (and new items, abilities and moves are added) without changing base stats.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/vaporemons-slate-1-discussion-phase.3722917/">Thread on the Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1_5AwZ24dPu3-5m5yOyIO4OTPmW9OwIWXXzZ5IJZkj4c/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'gen9vaporemons',
		team: 'random',
		ruleset: ['Data Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Endless Battle Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Terastal Clause'],
	},
	{
		name: "[Gen 9] VaporeMons UU",
		desc: [
			"<b>VaporeMons</b>: The third mod in the SylveMons series where Pokemon, items, abilities and moves are redesigned for OU (and new items, abilities and moves are added) without changing base stats.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/vaporemons-slate-1-discussion-phase.3722917/">Thread on the Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1_5AwZ24dPu3-5m5yOyIO4OTPmW9OwIWXXzZ5IJZkj4c/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'gen9vaporemons',
		teambuilderFormat: 'UU',
		ruleset: ['Standard', 'Terastal Clause', 'Data Mod', 'Sleep Moves Clause', '!Sleep Clause Mod'],
		banlist: ['OU', 'UUBL', 'Uber', 'AG', 'Arena Trap', 'Moody', 'Shadow Tag', 'King\'s Rock', 'Baton Pass', 'Last Respects', 'Shed Tail', 'Light Clay', 'Dancing Shoes', 'Fling + Segin Star Shard', 'Charizardite Shard X'],
	},
	///////////////////////////////////////////////////////////////
	/////////////// Monster Hunter Solomod //////////////////
	///////////////////////////////////////////////////////////////
/*	{
		section: "Monster Hunter Solomod",
		column: 3,
		// name: "monsterhuntersolomod",
	},	*/

	///////////////////////////////////////////////////////////////
	/////////////// Unofficial Pet Mod Formats //////////////////
	///////////////////////////////////////////////////////////////
	{
		section: "Unofficial Pet Mod Formats",
		column: 3,
		// name: "unofficialpetmodformats",
	},
	{
		name: "[Gen 8] Dynamax Meter",
		mod: 'gen8maxmeter',
		ruleset: ['Standard'],
		banlist: ['Uber', 'AG', 'Arena Trap', 'Moody', 'Power Construct', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Baton Pass'],
		onBegin() {
			for (const side of this.sides) {
				if (!side.getSideCondition('maxmeter5')) {
					side.dynamaxUsed = true;
				}
			}
		},
		onAfterMoveSecondarySelf(source, target, move) {
			if (!move || !target) return;
			if (source.side.getSideCondition('maxmeter1') || source.side.getSideCondition('maxmeter2') || source.side.getSideCondition('maxmeter3') || source.side.getSideCondition('maxmeter4') || source.side.getSideCondition('maxmeter5')) return;
			if (source.hasType(move.type)) {
				source.side.addSideCondition('maxmeter1');
			}
		},
	},
	{
		name: "[Gen 9] Fakemon Kitchen",
		desc: `A Metagame consisting of Fakemon created in a Flash-CAP styled process, revolving around flavor first.`,
		threads: [
			`None`,
		],
		mod: 'kitchen',
		ruleset: ['Standard'],
		banlist: ['Uber', 'AG', 'Arena Trap', 'Moody', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Baton Pass'],
		unbanlist: ['Athleetah'],
	},
	{
		name: "[Gen 9] FurfrOU",
		mod: 'furfrou',
		desc: `A micrometagame balanced and designed around furry-adjacent Pokemon, as well as the OCs/sonas of Smogon's Furry userbase.`,
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Evasion Items Clause', 'Species Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod', 'Terastal Clause'],
		threads: [
			`None`,
		],
		banlist: ['Arena Trap', 'Moody', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Quick Claw', 'Baton Pass', 'Last Respects', 'Hidden Power', 'Lucarionite'],
		teambuilderFormat: 'National Dex',
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['FROU', 'FROU (NFE)'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in FurfrOU.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Littlest Cup",
		desc: [
			"<b>Littlest Cup</b>: A National Dex metagame where only Baby Pokemon are allowed."
		],
		threads: [
			`&bullet; <a href="https://pastebin.com/PtqmRUhG">Littlest Cup VR and Sample Sets</a>`,
		],
		mod: 'littlestcup',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Evasion Items Clause', 'Species Clause', 'Sleep Clause Mod', 'Mega Rayquaza Clause', 'Max Level = 1'],
		teambuilderFormat: 'National Dex',
		banlist: ['All Pokemon', 'Belly Drum', 'Huge Power', 'Shadow Tag'],
		unbanlist: ['Pichu', 'Cleffa', 'Igglybuff', 'Togepi', 'Tyrogue', 'Smoochum', 'Elekid', 'Magby', 'Azurill', 'Wynaut', 'Budew', 'Chingling', 'Bonsly', 'Mime Jr.', 'Happiny', 'Munchlax', 'Riolu', 'Mantyke', 'Toxel'],
  },
	{
		name: "[Gen 9] Littlest Cup (No Tera)",
		desc: [
			"<b>Littlest Cup</b>: A National Dex metagame where only Baby Pokemon are allowed."
		],
		threads: [
			`&bullet; <a href="https://pastebin.com/PtqmRUhG">Littlest Cup VR and Sample Sets</a>`,
		],
		mod: 'littlestcup',
		searchShow: false,
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Evasion Items Clause', 'Species Clause', 'Sleep Clause Mod', 'Mega Rayquaza Clause', 'Max Level = 1', 'Terastal Clause'],
		teambuilderFormat: 'National Dex',
		banlist: ['All Pokemon', 'Belly Drum', 'Huge Power', 'Shadow Tag'],
		unbanlist: ['Pichu', 'Cleffa', 'Igglybuff', 'Togepi', 'Tyrogue', 'Smoochum', 'Elekid', 'Magby', 'Azurill', 'Wynaut', 'Budew', 'Chingling', 'Bonsly', 'Mime Jr.', 'Happiny', 'Munchlax', 'Riolu', 'Mantyke', 'Toxel'],
  },
	{
		name: "[Gen 9] Littlest Cup Random Battle",
		desc: [
			"<b>Littlest Cup</b>: A National Dex metagame where only Baby Pokemon are allowed."
		],
		threads: [
			`&bullet; <a href="https://pastebin.com/PtqmRUhG">Littlest Cup VR and Sample Sets</a>`,
		],
		mod: 'littlestcup',
		team: 'random',
		ruleset: ['Data Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Endless Battle Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Z-Move Clause', 'Max Level = 1'],
	},
	{
		name: "[Gen 9] Speculative Legends Z-A OU",
		mod: 'plza',
		ruleset: ['Standard', 'Terastal Clause', 'Sleep Moves Clause', '!Sleep Clause Mod', 'Mega Data Mod'],
		banlist: [
			'Arena Trap', 'Moody', 'Shadow Tag', 'King\'s Rock', 'Baton Pass', 'Last Respects', 'Shed Tail',
			'Alakazite', 'Blastoisinite', 'Gengarite', 'Salamencite', 'Metagrossite', 'Lucarionite', 'Power Construct',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['FE ZA', 'NFE ZA', 'LC ZA', 'Transfer'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in PLZA.'];
				}
			}
		},
  	},
	{
		name: "[Gen 9] Speculative Legends Z-A VGC",
		gameType: 'doubles',
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 9', 'VGC Timer', 'Open Team Sheets', 'Mega Data Mod', 'Terastal Clause'],
		banlist: [
			'Mewtwo', 'Xerneas', 'Yveltal', 'Zygarde', 'Diancie', 'Hoopa', 'Volcanion',
		],
		mod: 'plza',
		bestOfDefault: true,
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['FE ZA', 'NFE ZA', 'LC ZA', 'Uber ZA', 'Transfer'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in PLZA.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Speculative Legends Z-A FFA Royale",
		gameType: 'freeforall',
		mod: 'plza',
		ruleset: ['Standard', 'Terastal Clause', 'Sleep Moves Clause', '!Sleep Clause Mod', 'Mega Data Mod'],
		banlist: [
			'Arena Trap', 'Moody', 'Shadow Tag', 'King\'s Rock', 'Baton Pass', 'Last Respects', 'Shed Tail',
			'Alakazite', 'Gengarite', 'Salamencite', 'Metagrossite', 'Lucarionite', 'Power Construct',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['FE ZA', 'NFE ZA', 'LC ZA', 'Transfer'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in PLZA.'];
				}
			}
		},
  	},
	{
		name: "[Gen 9] PLZA Custom Game",
		mod: 'plza',
		searchShow: false,
		debug: true,
		battle: {trunc: Math.trunc},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100', 'Mega Data Mod'],
	},
	{
		name: "[Gen 6] TPDP Open",
		mod: 'tpdp',
		debug: true,
		desc: `a close approximation of Touhou Puppet Dance Performance`,
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Data Mod', 'Sleep Clause Mod', 'Status Mod'],
		banlist: ['Boundary Trance', 'Dream Shard',
		'Camouflage', 'Favorable Wind', 'Dead of Night', 'Sand Mask', 'Echelon Charm', //evasion
		'Poison Labyrinth', 'Adverse Wind', //trapping
		'Moody',
		'Backup Plan', //baton pass
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['TPDP OU', 'TPDP LC'];
			let natures = ['Red', 'Blue', 'Black', 'Green', 'White'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not allowed in TPDP.'];
				}
				if (!natures.includes(set.nature)) {
					return [set.nature + ' is not a valid nature in TPDP. Hint: to set Red, Blue, Black, White, or Green nature, use the Import/Export button.'];
				}
			}
		},
	},
	{
		name: "[Gen 6] TPDP AAA",
		mod: 'tpdp',
		debug: true,
		desc: `a close approximation of Touhou Puppet Dance Performance`,
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Data Mod', 'Sleep Clause Mod', '!Obtainable Abilities', 'Status Mod'],
		banlist: ['Boundary Trance', 'Dream Shard',
		'Camouflage', 'Favorable Wind', 'Dead of Night', 'Sand Mask', 'Echelon Charm', //evasion
		'Poison Labyrinth', 'Adverse Wind', //trapping
		'Moody',
		'Backup Plan', //baton pass

		'Power Suika', 'Power Yukari', 'Power Miko', 'Assist Akyuu', //mons
		'Miracle Mallet', 'Unique Shield', 'Forward Dash', 'Up Tempo', 'Good Management', 'Usurpation', 'Boundary Blurrer', 'ability:Serious', //stat boosting
		'Hobgoblin', 'Shadow Stitch', 'Frail Health', 'Vanishing Act', 'Stone Stacker', //misc
		'Adaptability', 'Aerilate', 'Aftermath', 'Air Lock', 'Analytic', 'Anger Point', 'Anger Shell', 'Anticipation', 'Arena Trap', 'Armor Tail', 'Aroma Veil', 'As One (Glastrier)', 'As One (Spectrier)', 'Aura Break', 'Bad Dreams', 'Ball Fetch', 'Battery', 'Battle Armor', 'Battle Bond', 'Beads of Ruin', 'Beast Boost', 'Berserk', 'Big Pecks', 'Blaze', 'Bulletproof', 'Cheek Pouch', 'Chilling Neigh', 'Chlorophyll', 'Clear Body', 'Cloud Nine', 'Color Change', 'Comatose', 'Commander', 'Competitive', 'Compound Eyes', 'Contrary', 'Corrosion', 'Costar', 'Cotton Down', 'Cud Chew', 'Curious Medicine', 'Cursed Body', 'Cute Charm', 'Damp', 'Dancer', 'Dark Aura', 'Dauntless Shield', 'Dazzling', 'Defeatist', 'Defiant', 'Delta Stream', 'Desolate Land', 'Disguise', 'Download', 'Dragon\'s Maw', 'Drizzle', 'ability:Drought', 'Dry Skin', 'Early Bird', 'Earth Eater', 'Effect Spore', 'Electric Surge', 'Electromorphosis', 'Embody Aspect (Teal)', 'Embody Aspect (Hearthflame)', 'Embody Aspect (Cornerstone)', 'Embody Aspect (Wellspring)', 'Emergency Exit', 'Fairy Aura', 'Filter', 'Flame Body', 'Flare Boost', 'Flash Fire', 'Flower Gift', 'Flower Veil', 'Fluffy', 'Forecast', 'Forewarn', 'Friend Guard', 'Frisk', 'Full Metal Body', 'Fur Coat', 'Gale Wings', 'Galvanize', 'Gluttony', 'Good as Gold', 'Gooey', 'Gorilla Tactics', 'Grass Pelt', 'Grassy Surge', 'Grim Neigh', 'Guard Dog', 'Gulp Missile', 'Guts', 'Hadron Engine', 'Harvest', 'Healer', 'Heatproof', 'Heavy Metal', 'Honey Gather', 'Hospitality', 'Huge Power', 'Hunger Switch', 'Hustle', 'Hydration', 'Hyper Cutter', 'Ice Body', 'Ice Face', 'Ice Scales', 'Illuminate', 'Illusion', 'Immunity', 'Imposter', 'Infiltrator', 'Innards Out', 'Inner Focus', 'Insomnia', 'Intimidate', 'Intrepid Sword', 'Iron Barbs', 'Iron Fist', 'Justified', 'Keen Eye', 'Klutz', 'Leaf Guard', 'Levitate', 'Libero', 'Light Metal', 'Lightning Rod', 'Limber', 'Lingering Aroma', 'Liquid Ooze', 'Liquid Voice', 'Long Reach', 'Magic Bounce', 'Magic Guard', 'Magician', 'Magma Armor', 'Magnet Pull', 'Marvel Scale', 'Mega Launcher', 'Merciless', 'Mimicry', 'Mind\s Eye', 'Minus', 'Mirror Armor', 'Misty Surge', 'Mold Breaker', 'Motor Drive', 'Moxie', 'Multiscale', 'Multitype', 'Mummy', 'Mycelium Might', 'Natural Cure', 'Neuroforce', 'Neutralizing Gas', 'No Guard', 'Normalize', 'Oblivious', 'Opportunist', 'Orichalcum Pulse', 'Overcoat', 'Overgrow', 'Own Tempo', 'Parental Bond', 'Pastel Veil', 'Perish Body', 'Pickpocket', 'Pickup', 'Pixilate', 'Plus', 'Poison Heal', 'Poison Point', 'Poison Puppeteer', 'Poison Touch', 'Power Construct', 'Power of Alchemy', 'ability:Power Spot', 'Prankster', 'Pressure', 'Primordial Sea', 'Prism Armor', 'Propeller Tail', 'Protean', 'Protosynthesis', 'Psychic Surge', 'Punk Rock', 'Pure Power', 'Purifying Salt', 'Quark Drive', 'Queenly Majesty', 'Quick Draw', 'Quick Feet', 'Rain Dish', 'Rattled', 'Receiver', 'Reckless', 'Refrigerate', 'Regenerator', 'Ripen', 'Rivalry', 'RKS System', 'Rock Head', 'Rocky Payload', 'Rough Skin', 'Run Away', 'Sand Force', 'Sand Rush', 'Sand Spit', 'Sand Stream', 'Sand Veil', 'Sap Sipper', 'Schooling', 'Scrappy', 'Screen Cleaner', 'Seed Sower', 'Serene Grace', 'Shadow Shield', 'Shadow Tag', 'Sharpness', 'Shed Skin', 'Sheer Force', 'Shell Armor', 'Shield Dust', 'Shields Down', 'Simple', 'Skill Link', 'Slow Start', 'Slush Rush', 'Sniper', 'Snow Cloak', 'Snow Warning', 'Solar Power', 'Solid Rock', 'Soul-Heart', 'Soundproof', 'Speed Boost', 'Stakeout', 'Stall', 'Stalwart', 'Stamina', 'Stance Change', 'Static', 'Steadfast', 'Steam Engine', 'Steelworker', 'Steely Spirit', 'Stench', 'Sticky Hold', 'Storm Drain', 'Strong Jaw', 'Sturdy', 'Suction Cups', 'Super Luck', 'Supersweet Syrup', 'Supreme Overlord', 'Surge Surfer', 'Swarm', 'Sweet Veil', 'Swift Swim', 'Sword of Ruin', 'Symbiosis', 'Synchronize', 'Tablets of Ruin', 'Tangled Feet', 'Tangling Hair', 'Technician', 'Telepathy', 'Tera Shell', 'Tera Shift', 'Teraform Zero', 'Teravolt', 'Thermal Exchange', 'Thick Fat', 'Tinted Lens', 'Torrent', 'Tough Claws', 'Toxic Boost', 'Toxic Chain', 'Toxic Debris', 'Trace', 'Transistor', 'Triage', 'Truant', 'Turboblaze', 'Unaware', 'Unburden', 'Unnerve', 'Unseen Fist', 'Vessel of Ruin', 'Victory Star', 'Vital Spirit', 'Volt Absorb', 'Wandering Spirit', 'Water Absorb', 'Water Bubble', 'Water Compaction', 'Water Veil', 'Weak Armor', 'Well-Baked Body', 'White Smoke', 'Wimp Out', 'Wind Power', 'Wind Rider', 'Wonder Guard', 'Wonder Skin', 'Zen Mode', 'Zero to Hero' //vanilla abils
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['TPDP OU', 'TPDP LC'];
			let natures = ['Red', 'Blue', 'Black', 'Green', 'White'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not allowed in TPDP.'];
				}
				if (!natures.includes(set.nature)) {
					return [set.nature + ' is not a valid nature in TPDP. Hint: to set Red, Blue, Black, White, or Green nature, use the Import/Export button.'];
				}
			}
		},
	},
	{
		name: "[Gen 6] TPDP Stylemons",
		mod: 'tpdp',
		debug: true,
		desc: `TPDP Stylemons`,
		ruleset: ['Standard NatDex', 'Stylemons Move Legality', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Data Mod', 'Sleep Clause Mod', 'Status Mod'],
		banlist: ['Boundary Trance', 'Dream Shard',
		'Camouflage', 'Favorable Wind', 'Dead of Night', 'Sand Mask', 'Echelon Charm', //evasion
		'Poison Labyrinth', 'Adverse Wind', //trapping
		'Moody',
		'Backup Plan', //baton pass
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['TPDP OU', 'TPDP LC'];
			let natures = ['Red', 'Blue', 'Black', 'Green', 'White'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not allowed in TPDP.'];
				}
				if (!natures.includes(set.nature)) {
					return [set.nature + ' is not a valid nature in TPDP. Hint: to set Red, Blue, Black, White, or Green nature, use the Import/Export button.'];
				}
			}
		},
	},
	{
		name: "[Gen 6] TPDP Shared Power",
		mod: 'tpdp',
		debug: true,
		desc: `TPDP Shared Power`,
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Data Mod', 'Sleep Clause Mod', 'Status Mod'],
		banlist: ['Boundary Trance', 'Dream Shard',
		'Camouflage', 'Favorable Wind', 'Dead of Night', 'Sand Mask', 'Echelon Charm', //evasion
		'Poison Labyrinth', 'Adverse Wind', //trapping
		'Moody',
		'Backup Plan', //baton pass
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['TPDP OU', 'TPDP LC'];
			let natures = ['Red', 'Blue', 'Black', 'Green', 'White'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not allowed in TPDP.'];
				}
				if (!natures.includes(set.nature)) {
					return [set.nature + ' is not a valid nature in TPDP. Hint: to set Red, Blue, Black, White, or Green nature, use the Import/Export button.'];
				}
			}
		},
		getSharedPower(pokemon) {
			const sharedPower = new Set<string>();
			for (const ally of pokemon.side.pokemon) {
				if (pokemon.battle.ruleTable.isRestricted(`ability:${ally.baseAbility}`)) continue;
				if (ally.previouslySwitchedIn > 0) {
					if (pokemon.battle.dex.currentMod !== 'sharedpower' && ['trace', 'mirrorarmor'].includes(ally.baseAbility)) {
						sharedPower.add('noability');
						continue;
					}
					sharedPower.add(ally.baseAbility);
				}
			}
			sharedPower.delete(pokemon.baseAbility);
			return sharedPower;
		},
		onBeforeSwitchIn(pokemon) {
			let format = this.format;
			if (!format.getSharedPower) format = this.dex.formats.get('gen9sharedpower');
			for (const ability of format.getSharedPower!(pokemon)) {
				const effect = 'ability:' + ability;
				pokemon.volatiles[effect] = {id: this.toID(effect), target: pokemon};
				if (!pokemon.m.abils) pokemon.m.abils = [];
				if (!pokemon.m.abils.includes(effect)) pokemon.m.abils.push(effect);
			}
		},
		onSwitchInPriority: 2,
		onSwitchIn(pokemon) {
			let format = this.format;
			if (!format.getSharedPower) format = this.dex.formats.get('gen9sharedpower');
			for (const ability of format.getSharedPower!(pokemon)) {
				if (ability === 'noability') {
					this.hint(`Mirror Armor and Trace break in Shared Power formats that don't use Shared Power as a base, so they get removed from non-base users.`);
				}
				const effect = 'ability:' + ability;
				delete pokemon.volatiles[effect];
				pokemon.addVolatile(effect);
			}
		},
	},
	{
		name: "[Gen 6] TPDP Netplay",
		mod: 'tpdp',
		debug: true,
		desc: `a close approximation of Touhou Puppet Dance Performance`,
		ruleset: ['Obtainable', 'Team Preview', 'Cancel Mod', 'Species Clause', 'Item Clause', 'Adjust Level Down = 50', 'OHKO Clause', 'Evasion Moves Clause', 'Dynamax Clause', 'Data Mod', 'Sleep Clause Mod', 'Status Mod'],
		banlist: ['Boundary Trance', 'Dream Shard',
		'Camouflage', 'Favorable Wind', 'Dead of Night', 'Sand Mask', 'Echelon Charm', //evasion
		'Poison Labyrinth', 'Adverse Wind', //trapping
		'Moody',
		'Backup Plan', //baton pass
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['TPDP OU', 'TPDP LC'];
			let natures = ['Red', 'Blue', 'Black', 'Green', 'White'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not allowed in TPDP.'];
				}
				if (!natures.includes(set.nature)) {
					return [set.nature + ' is not a valid nature in TPDP. Hint: to set Red, Blue, Black, White, or Green nature, use the Import/Export button.'];
				}
			}
		},
	},
	{
		name: "[Gen 2] VGC 2001",
		mod: 'gen2doubles',
		gameType: 'doubles',
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'VGC Timer', 'Open Team Sheets', 'Team Preview', 'Picked Team Size = 4', 'Min Source Gen = 2'],
		banlist: [],
		teambuilderFormat: 'OU',
	},
	{
		name: "[Gen 9] White Tusk",

		mod: 'whitetusk',
		ruleset: ['Standard', 'Data Mod'],
		banlist: ['All Pokemon', 'King\'s Rock', 'Baton Pass'],
		unbanlist: ['Dust Bunnie', 'Rebirb', 'Strummingbird', 'Strummingbird-Viola', 'Strummingbird-Cello', 'Strummingbird-Contrabass', 'Strummingbird-Acoustic', 'Strummingbird-Electric', 'Strummingbird-Bass', 'Xylomist', 'Yeomelt', 'Zoplite', 'Yeoxylo', 'Xylozop', 'Zopyeo', 'Xylyeozop', 'Xylobone', 'Dormirr', 'Pufferfinch', 'Gumbawl', 'Gumbrawl', 'Gumbrawl-Bubble', 'Gumbrawl-Fresh', 'Gnawing Bark', 'Iron Mint', 'Caramilitant', 'Toughfee', 'Gasharmoir', 'Gumbrawl-Gachamech', 'Tartridge', 'Opixsi', 'Pinfrino', 'Leagle', 'Kuadrosin', 'Blite', 'Doctoxin', 'Moosquito', 'Parrox'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			const combinationTable = ['Xylomist', 'Yeomelt', 'Zoplite', 'Yeoxylo', 'Xylozop', 'Zopyeo', 'Xylyeozop'];
			let combinationTest = [];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				console.log(template.name);
				if (combinationTable.includes(template.name)) {
					combinationTest.push(template.name);
				}
			}
			if (combinationTest.length > 1) {	//Skip the check if only one was found at most
				if ((combinationTest.includes('Xylomist') && (combinationTest.includes('Yeoxylo') || combinationTest.includes('Xylozop') || combinationTest.includes('Xylyeozop')))
					|| (combinationTest.includes('Yeomelt') && (combinationTest.includes('Yeoxylo') || combinationTest.includes('Zopyeo') || combinationTest.includes('Xylyeozop')))
					|| (combinationTest.includes('Zoplite') && (combinationTest.includes('Xylozop') || combinationTest.includes('Zopyeo') || combinationTest.includes('Xylyeozop')))) {
					return ['You cannot have XYZ Pokemon with their combined forms.'];
				}
			}
		},
	},
	{
		section: "Modern Gen Series",
		column: 3,
		// name: "moderngenseries",
	},
	{
		name: "[Gen 1] Modern Gen 1",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-modern-gen-1.3711533/">Smogon Thread</a>`,
		],
		mod: 'moderngen1',
		searchShow: false,
		ruleset: ['Standard', 'Partial Trapping Clause', 'Protect Clause', 'Field Effect Clause', 'Sleep Moves Clause', '+No Ability', '-All Abilities', '-All Items'],
		banlist: ['Uber', 'Fake Out', 'Confuse Ray', 'Supersonic', 'Swagger', 'Sweet Kiss', 'Shell Smash', 'Teeter Dance', 'Flatter'],
	},
	{
		name: "[Gen 1] Modern Gen 1 Random Battle",
		desc: `Pok&eacute;mon, items, abilities, and moves are redesigned for OU, and new items, abilities, and moves are added, all without changing base stats.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-modern-gen-1.3711533/">MG1</a>`,
		],
		mod: 'moderngen1',
		team: 'random',
		ruleset: ['Obtainable', 'Species Clause', 'HP Percentage Mod', 'Freeze Clause Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 1] Modern Gen 1 Ubers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-modern-gen-1.3711533/">Smogon Thread</a>`,
		],
		mod: 'moderngen1',
		searchShow: false,
		ruleset: ['Standard', 'Partial Trapping Clause', 'Protect Clause', 'Field Effect Clause', 'Sleep Moves Clause', '+No Ability', '-All Abilities', '-All Items'],
		banlist: ['AG', 'Fake Out', 'Confuse Ray', 'Supersonic', 'Swagger', 'Sweet Kiss', 'Flatter'],
		teambuilderFormat: 'Uber',
	},
	{
		name: "[Gen 1] Modern Gen 1 UU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-modern-gen-1.3711533/">Smogon Thread</a>`,
		],
		mod: 'moderngen1',
		searchShow: false,
		ruleset: ['Standard', 'Partial Trapping Clause', 'Protect Clause', 'Field Effect Clause', 'Sleep Moves Clause', '+No Ability', '-All Abilities', '-All Items'],
		banlist: ['Uber', 'OU', 'UUBL', 'Fake Out', 'Confuse Ray', 'Supersonic', 'Swagger', 'Sweet Kiss', 'Flatter'],
	},
	{
		name: "[Gen 1] Modern Gen 1 LC",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-modern-gen-1.3711533/">Smogon Thread</a>`,
		],
		mod: 'moderngen1',
		searchShow: false,
		ruleset: ['Standard', 'Little Cup', 'Partial Trapping Clause', 'Field Effect Clause', 'Sleep Moves Clause', '+No Ability', '-All Abilities', '-All Items'],
		banlist: ['Basculin-White-Striped', 'Qwilfish-Hisui', 'Sneasel', 'Stantler', 'Tangela', 'Sneasel-Hisui', 'Dunsparce', 'Scyther', 'Girafarig', 'Type: Null', 'Fake Out'],
	},
	{
		name: "[Gen 2] Modern Gen 2",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-modern-gen-2.3725808/">Smogon Thread</a>`,
		],
		mod: 'moderngen2',
		searchShow: false,
		ruleset: ['Standard MG2', 'Sleep Moves Clause', '+No Ability', '-All Abilities', 'Gems Clause', '+Normal Gem'],
		banlist: ['AG', 'Uber', 'Fake Out', 'Shell Smash', 'Last Respects', 'Baton Pass', 'Alakazite', 'Soul Dew'],
	},
	{
		name: "[Gen 2] Modern Gen 2 Ubers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-modern-gen-2.3725808/">Smogon Thread</a>`,
		],
		mod: 'moderngen2',
		searchShow: false,
		ruleset: ['Standard', '+No Ability', '-All Abilities', 'Gems Clause'],
		banlist: ['AG', 'Fake Out', 'Baton Pass', 'Rusted Sword'],
		teambuilderFormat: 'Uber',
	},
	{
		name: "[Gen 2] Modern Gen 2 LC",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-modern-gen-2.3725808/">Smogon Thread</a>`,
		],
		mod: 'moderngen2',
		searchShow: false,
		ruleset: ['Standard', 'Little Cup', '+No Ability', '-All Abilities', 'Gems Clause'],
		banlist: ['Basculin-White-Striped', 'Qwilfish-Hisui', 'Sneasel-Hisui', 'Dunsparce', 'Scyther', 'Girafarig', 'Type: Null', 'Fake Out', 'Sonic Boom', 'Dragon Rage'],
	},
	{
		name: "[Gen 3] Modern Gen 3",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-modern-gen-3.3713372/">Smogon Thread</a>`,
		],
		mod: 'moderngen3',
		searchShow: false,
		ruleset: ['Standard', 'Z-Move Clause', 'Gems Clause'],
		banlist: ['AG', 'Uber', 'Assist', 'Baton Pass', 'Arena Trap', 'Shadow Tag', 'Sand Veil', 'Snow Cloak', 'Moody', 'Sand Rush', 'Power Construct', 'Battle Bond', 'King\'s Rock', 'Razor Fang', 'Soul Dew', 'Shed Tail'],
	},
	{
		name: "[Gen 3] Modern Gen 3 Ubers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-modern-gen-3.3713372/">Smogon Thread</a>`,
		],
		mod: 'moderngen3',
		searchShow: false,
		ruleset: ['Standard', 'Z-Move Clause', 'Gems Clause'],
		banlist: ['AG'],
		teambuilderFormat: 'Uber',
	},
	{
		name: "[Gen 3] Modern Gen 2 The Sequel: Just The Birds",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-10203354">Post in the Solomods Megathread</a>`,
		],
		mod: 'moderngen2birds',
		searchShow: false,
		ruleset: ['Standard', 'Z-Move Clause', '!Obtainable Abilities', 'Gems Clause'], // temporary until I can figure why HAs work in MG3 but not here
		banlist: [
			'Assist', 'Baton Pass', 'Arena Trap', 'Shadow Tag', 'Sand Veil', 'Snow Cloak', 'Moody', 'Sand Rush',
			'Power Construct', 'Battle Bond', 'King\'s Rock', 'Razor Fang', 'Soul Dew', 'Shed Tail',
		],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['Birds'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not a bird (according to the mod leader).'];
				}
			}
		},
	},
	{
		name: "[Gen 4] Modern Gen 4",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-9837342">Smogon Post</a>`,
		],
		mod: 'moderngen4',
		searchShow: false,
		ruleset: ['Standard', 'Sleep Moves Clause', '!Sleep Clause Mod', 'Z-Move Clause', 'Gems Clause'],
		banlist: ['AG', 'Uber', 'Arena Trap', 'Drizzle', 'Drought', 'Shadow Tag', 'Moody', 'Sand Rush', 'Power Construct', 'King\'s Rock', 'Quick Claw', 'Razor Fang', 'Assist', 'Baton Pass', 'Last Respects', 'Shed Tail', 'Toxic Spikes'],
	},
	{
		name: "[Gen 4] Modern Gen 4 Ubers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-9837342">Smogon Post</a>`,
		],
		mod: 'moderngen4',
		searchShow: false,
		ruleset: ['Standard', 'Sleep Moves Clause', '!Sleep Clause Mod', 'Gems Clause'],
		banlist: ['AG'],
		teambuilderFormat: 'Uber',
	},
	{
		section: "Sample Teams Random Battles",
		column: 3,
	},
	{
		name: "[Gen 3] OU Random Sample Team Battle",
		team: 'random',
		mod: 'gen3ourstb',
		ruleset: ['Standard', 'Freeze Clause Mod'],
	},
];