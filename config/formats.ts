// Note: This is the visual table of formats
// The rules that formats use are stored in data/rulesets.ts
/*
If you want to add custom formats, create a file in your mod's folder named "formats.ts"

Paste the following code into the file and add your desired information to each format
--------------------------------------------------------------------------------
import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen GEN NUMBER] My First Solomod",
		desc: `Elevator-pitch verison of what your mod's all about.`,
		threads: [ //This shows up when using /tier on the format and is normally used for resource links
			`&bullet; <a href="URL of your resource here">Name of your resource here</a>`,
		],
		mod: 'MOD FOLDER NAME HERE',
		ruleset: [ Use names (not ids) from data/rulesets.ts and your mod's rulesets.ts files. Additionally, by putting in the name of another format, you can inherit all rules and bans of that format. ],
		banlist: [ Use names (not ids) to ban Mons, moves, etc. here. Can use 'All Pokemon' or similar to blanket ban. 
		For a Pokemon with multiple formes, putting just the name bans them all. Use the '-Base' suffix to ban only the base forme. ],
		unbanlist: [ Specific unbans if using 'All Pokemon', etc., or if unbanning from an inherited ruleset. ],
		gameType: 'doubles/triples/free-for-all' //Only include this line to choose the type of battle
		teambuilderFormat: 'Uber/National Dex', //Only include this line to have the teambuilder include Ubers/Nonstandard stuff, respectively 
		team: 'random', //Only include this line to declare a Random Battle format, which has extra steps
	},
];
--------------------------------------------------------------------------------
Then, add a line to the import statements below (which is sorted alphabetically) with the same formatting and your mod's name.
After that, find the right section within the formats list that describes your mod and add a new line with the code "...'NAME USED FOR [Formats as _____]'",
*/

// Imports
import { Formats as Abilitypos                  } from '../data/mods/abilitypos/formats';
import { Formats as AGoldenExperience           } from '../data/mods/agoldenexperience/formats';
import { Formats as Alternatium                 } from '../data/mods/alternatium/formats';
import { Formats as AlternatiumEX               } from '../data/mods/alternatiumex/formats';
import { Formats as Animemons                   } from '../data/mods/animemons/formats';
import { Formats as BackToSinnoh                } from '../data/mods/backtosinnoh/formats';
import { Formats as Balls                       } from '../data/mods/balls/formats';
import { Formats as BanHammersC3                } from '../data/mods/banhammersc3/formats';
import { Formats as Beaftopia                   } from '../data/mods/beaftopia/formats';
import { Formats as BearticPhone                } from '../data/mods/bearticphone/formats';
import { Formats as BlackMarket                 } from '../data/mods/blackmarket/formats';
import { Formats as BlankCanvas                 } from '../data/mods/blankcanvas/formats';
import { Formats as BookOfEnigmas               } from '../data/mods/bookofenigmas/formats';
import { Formats as BreedingVariants            } from '../data/mods/breedingvariants/formats';
import { Formats as BreedingVariantsNatDex      } from '../data/mods/breedingvariantsnatdex/formats';
import { Formats as BustAMove                   } from '../data/mods/bustamove/formats';
import { Formats as CCaPM2022                   } from '../data/mods/ccapm2022/formats';
import { Formats as CCaPM2024                   } from '../data/mods/ccapm2024/formats';
import { Formats as ChatBats                    } from '../data/mods/chatbats/formats';
import { Formats as ClubmonsRequiem             } from '../data/mods/clubmonsrequiem/formats';
import { Formats as CommunityUsed2              } from '../data/mods/communityused2/formats';
import { Formats as ConquestDex                 } from '../data/mods/conquestdex/formats';
import { Formats as CleanSlateMicro2            } from '../data/mods/csm2/formats';
import { Formats as DenseAF                     } from '../data/mods/denseaf/formats';
import { Formats as DLCmons                     } from '../data/mods/dlcmons/formats';
import { Formats as Dollhouse                   } from '../data/mods/dollhouse/formats';
import { Formats as FusionEvolutionDondozo      } from '../data/mods/dondozo/formats';
import { Formats as DoNotUse                    } from '../data/mods/donotuse/formats';
import { Formats as DoNotUsetPMtM               } from '../data/mods/donotusetmptm/formats';
import { Formats as DoNotUseUU                  } from '../data/mods/donotuseuu/formats';
import { Formats as DoNotUseVGC                 } from '../data/mods/donotusevgc/formats';
import { Formats as DoNotUseRandoms             } from '../data/mods/donotuse/formats';
import { Formats as DoubleTrouble               } from '../data/mods/doubletrouble/formats';
import { Formats as Duomod                      } from '../data/mods/duomod/formats';
import { Formats as EarthSky                    } from '../data/mods/earthsky/formats';
import { Formats as EbbAndFlow                  } from '../data/mods/ebbandflow/formats';
import { Formats as EliminationWar              } from '../data/mods/eliminationwar/formats';
import { Formats as EmaMod                      } from '../data/mods/emamod/formats';
import { Formats as Eramons                     } from '../data/mods/eramons/formats';
import { Formats as EternalPokemon              } from '../data/mods/eternalpokemon/formats';
import { Formats as EvolutionProject            } from '../data/mods/evolutionproject/formats';
import { Formats as ExtremeReboot               } from '../data/mods/extremereboot/formats';
import { Formats as FakemonFrontier             } from '../data/mods/fakemonfrontier/formats';
import { Formats as FusionEvoCorruptCouncil     } from '../data/mods/fecc/formats';
import { Formats as ForgottenMons               } from '../data/mods/forgottenmons/formats';
import { Formats as FurfrOU                     } from '../data/mods/furfrou/formats';
import { Formats as Blindsided                  } from '../data/mods/g9blindsided/formats';
import { Formats as gen9Duomod                  } from '../data/mods/g9duomod/formats';
import { Formats as gen1Azure                   } from '../data/mods/gen1azure/formats';
import { Formats as gen1BacktothePast           } from '../data/mods/gen1backtothepast/formats';
import { Formats as gen1Burgundy                } from '../data/mods/gen1burgundy/formats';
import { Formats as gen1KantoExpansionPack      } from '../data/mods/gen1expansionpack/formats';
import { Formats as gen1FutureProofing          } from '../data/mods/gen1futureproofing/formats';
import { Formats as gen1JohtoMons               } from '../data/mods/gen1johtomons/formats';
import { Formats as gen1JumpStarted             } from '../data/mods/gen1jumpstarted/formats';
import { Formats as gen1Metronome               } from '../data/mods/gen1metronome/formats';
import { Formats as gen1Moonside                } from '../data/mods/gen1moonside/formats';
import { Formats as gen1RBYCAP                  } from '../data/mods/gen1rbycap/formats';
import { Formats as gen1Recolored               } from '../data/mods/gen1recolored/formats';
import { Formats as gen1Stadium                 } from '../data/mods/gen1stadium/formats';
import { Formats as gen1TradebacksExpanded      } from '../data/mods/gen1tradebacksexpanded/formats';
import { Formats as gen1VioletVersion           } from '../data/mods/gen1violetversion/formats';
import { Formats as gen2CrystalLegacy           } from '../data/mods/gen2crystallegacy/formats';
import { Formats as gen2CrystalSeviiIslands     } from '../data/mods/gen2crystalseviiislands/formats';
import { Formats as gen2GSCDoubles              } from '../data/mods/gen2doubles/formats';
import { Formats as gen2JohtoExpansionPack      } from '../data/mods/gen2expansionpack/formats';
import { Formats as gen2Stadium2                } from '../data/mods/gen2stadium2/formats';
import { Formats as gen2TeraCrystal             } from '../data/mods/gen2teracrystal/formats';
import { Formats as gen3AdvDeluxe               } from '../data/mods/gen3advdx/formats';
import { Formats as gen3AdvPlus                 } from '../data/mods/gen3advplus/formats';
import { Formats as gen3AdvToThePast            } from '../data/mods/gen3advttp/formats';
import { Formats as gen3HoennEchoes             } from '../data/mods/gen3hoennechoes/formats';
import { Formats as gen3HoennGaiden             } from '../data/mods/gen3hoenngaiden/formats';
import { Formats as gen3OURandomSampleTeam      } from '../data/mods/gen3ourstb/formats';
import { Formats as gen3ShadowColosseum         } from '../data/mods/gen3shadowcolosseum/formats';
import { Formats as gen3Tradebacks              } from '../data/mods/gen3tradebacks/formats';
import { Formats as gen3UUHoennGaiden           } from '../data/mods/gen3uuhoenngaiden/formats';
import { Formats as gen5BestWishesYoshiblaze    } from '../data/mods/gen5unovayb/formats';
import { Formats as gen533Valuemons             } from '../data/mods/gen5valuemons/formats';
import { Formats as gen6MegasRevisited          } from '../data/mods/gen6megasrevisited/formats';
import { Formats as gen6MixAndMegasRevisited    } from '../data/mods/gen6mixandmegasrevisited/formats';
import { Formats as gen8FusionEvolution         } from '../data/mods/gen8feuu/formats';
import { Formats as gen8HaxMeters               } from '../data/mods/gen8haxmeters/formats';
import { Formats as gen8Lucklessplay            } from '../data/mods/gen8lucklessplay/formats';
import { Formats as gen8MaxMeter                } from '../data/mods/gen8maxmeter/formats';
import { Formats as gen9CrossoverChaos          } from '../data/mods/gen9crossoverchaos/formats';
import { Formats as gen9CrossoverChaosC         } from '../data/mods/gen9crossoverchaosc/formats';
import { Formats as gen9EvolutionProject        } from '../data/mods/gen9evolutionproject/formats';
import { Formats as gen9FusionEvolution         } from '../data/mods/gen9fe/formats';
import { Formats as gen9FusionEvolutionR        } from '../data/mods/gen9ferestrictions/formats';
import { Formats as gen9FusionEvolutionVGC      } from '../data/mods/gen9fevgc/formats';
import { Formats as gen9Multiverse              } from '../data/mods/gen9multiverse/formats';
import { Formats as gen9SSB                     } from '../data/mods/gen9ssb/formats';
import { Formats as gen9Strong                  } from '../data/mods/gen9strong/formats';
import { Formats as gen9Ubermons                } from '../data/mods/gen9ubermons/formats';
import { Formats as VaporeMons                  } from '../data/mods/gen9vaporemons/formats';
import { Formats as gen9VGC20XX                 } from '../data/mods/gen9vgc20xx/formats';
import { Formats as GenNext                     } from '../data/mods/gennext/formats';
import { Formats as genXBrunica                 } from '../data/mods/genxbrunica/formats';
import { Formats as genXDesvega                 } from '../data/mods/genxdesvega/formats';
import { Formats as GenXLoria                   } from '../data/mods/genxloria/formats';
import { Formats as GlaceMons                   } from '../data/mods/glacemons/formats';
import { Formats as GlaceMonsUber               } from '../data/mods/glacemonsuber/formats';
import { Formats as HaxMeters                   } from '../data/mods/haxmeters/formats';
import { Formats as HiddenGems                  } from '../data/mods/hiddengems/formats';
import { Formats as HideAndSeaking              } from '../data/mods/hideandseaking/formats';
import { Formats as HideAndSeakingSlate5Clauses } from '../data/mods/hideandseakingslate5clauses/formats';
import { Formats as iforgor                     } from '../data/mods/iforgor/formats';
import { Formats as imando                      } from '../data/mods/imando/formats';
import { Formats as IronFist                    } from '../data/mods/ironfist/formats';
import { Formats as Ironmons                    } from '../data/mods/ironmons/formats';
import { Formats as Jollymod                    } from '../data/mods/jollymod/formats';
import { Formats as JolteMons                   } from '../data/mods/joltemons/formats';
import { Formats as KaensDex                    } from '../data/mods/kaensdex/formats';
import { Formats as FakemonKitchen              } from '../data/mods/kitchen/formats';
import { Formats as LegendsHoopa                } from '../data/mods/legendshoopa/formats';
import { Formats as LetsGo                      } from '../data/mods/letsgo/formats';
import { Formats as LittleColosseum             } from '../data/mods/littlecolosseum/formats';
import { Formats as Littleestcup                } from '../data/mods/littleestcup/formats';
import { Formats as LittlestCup                 } from '../data/mods/littlestcup/formats';
import { Formats as LucklessPlay                } from '../data/mods/lucklessplay/formats';
import { Formats as LukeMod                     } from '../data/mods/lukemod/formats';
import { Formats as gen9MegasForAll             } from '../data/mods/m4ag9/formats';
import { Formats as MegasForAllKalos            } from '../data/mods/m4akalos/formats';
import { Formats as MegasForAllPaldea           } from '../data/mods/m4apaldea/formats';
import { Formats as MegasForAllSandbox          } from '../data/mods/m4asandbox/formats';
import { Formats as gen8MegasForAllv6           } from '../data/mods/m4av6/formats';
import { Formats as Maadowr                     } from '../data/mods/maadowr/formats';
import { Formats as MaadowrLostZone             } from '../data/mods/maadowrlostzone/formats';
import { Formats as Masquerade                  } from '../data/mods/masquerade/formats';
import { Formats as MegaMania                   } from '../data/mods/megamania/formats';
import { Formats as MetaMons                    } from '../data/mods/metamons/formats';
import { Formats as MixAndMega                  } from '../data/mods/mixandmega/formats';
import { Formats as MixAndMegaBalls             } from '../data/mods/mixandmegaballs/formats';
import { Formats as MixAndMegasForAll           } from '../data/mods/mixandmegasforall/formats';
import { Formats as MicrometaMafia2             } from '../data/mods/mmm2/formats';
import { Formats as MicrometaMafia3             } from '../data/mods/mmm3/formats';
import { Formats as ModernGen1                  } from '../data/mods/moderngen1/formats';
import { Formats as ModernGen2                  } from '../data/mods/moderngen2/formats';
import { Formats as ModernGen2Birds             } from '../data/mods/moderngen2birds/formats';
import { Formats as ModernGen3                  } from '../data/mods/moderngen3/formats';
import { Formats as ModernGen4                  } from '../data/mods/moderngen4/formats';
import { Formats as MonsterHunter               } from '../data/mods/monsterhunter/formats';
import { Formats as MonsterHunterOUSoloPLIII    } from '../data/mods/monsterhuntersl/formats';
import { Formats as MoreBalancedHackmons        } from '../data/mods/morebalancedhackmons/formats';
import { Formats as NaturalSelection            } from '../data/mods/naturalselection/formats';
import { Formats as NotMyType                   } from '../data/mods/notmytype/formats';
import { Formats as OUTheorymons                } from '../data/mods/outheorymons/formats';
import { Formats as Paleomons                   } from '../data/mods/paleomons/formats';
import { Formats as Patratdex                   } from '../data/mods/patratdex/formats';
import { Formats as PLZA                        } from '../data/mods/plza/formats';
import { Formats as Pokebilities                } from '../data/mods/pokebilities/formats';
import { Formats as PokebilitiesBanhammers      } from '../data/mods/pokebilitiesbanhammers/formats';
import { Formats as PokemoNorthSouthEastWest    } from '../data/mods/pokemonorthsoutheastwest/formats';
import { Formats as Pokemorty                   } from '../data/mods/pokemorty/formats';
import { Formats as PokeTypos                   } from '../data/mods/poketypos/formats';
import { Formats as PonymonShowdown             } from '../data/mods/ponymonshowdown/formats';
import { Formats as PublicDomain                } from '../data/mods/publicdomain/formats';
import { Formats as RandomTandem                } from '../data/mods/randomtandem/formats';
import { Formats as ReGeneration                } from '../data/mods/regeneration/formats';
import { Formats as RegionalEvolutions          } from '../data/mods/regionalevolutions/formats';
import { Formats as Restrictions                } from '../data/mods/restrictions/formats';
import { Formats as ReturnToOrreTercera         } from '../data/mods/returntoorretercera/formats';
import { Formats as RockBottom                  } from '../data/mods/rockbottom/formats';
import { Formats as Roulettemons                } from '../data/mods/roulettemons/formats';
import { Formats as Roulettemons2               } from '../data/mods/roulettemons2/formats';
import { Formats as Roulettemons2Ubers          } from '../data/mods/roulettemons2/formats';
import { Formats as Scootopia                   } from '../data/mods/scootopia/formats';
import { Formats as ScootopiaV4                 } from '../data/mods/scootopiav4/formats';
import { Formats as SecretSanta                 } from '../data/mods/secretsanta/formats';
import { Formats as SetInStone                  } from '../data/mods/setinstone/formats';
import { Formats as SharedPower                 } from '../data/mods/sharedpower/formats';
import { Formats as SharedPowerIronFist         } from '../data/mods/sharedpowerironfist/formats';
import { Formats as Shinymons                   } from '../data/mods/shinymons/formats';
import { Formats as SignatureMons               } from '../data/mods/signaturemons/formats';
import { Formats as SignatureRestrictions       } from '../data/mods/signaturerestrictions/formats';
import { Formats as SixBySix                    } from '../data/mods/sixbysix/formats';
import { Formats as SmashModsBrawl              } from '../data/mods/smashmodsbrawl/formats';
import { Formats as SmashModsMelee              } from '../data/mods/smashmodsmelee/formats';
import { Formats as SmashStereotypes            } from '../data/mods/smashstereotypes/formats';
import { Formats as Solopet                     } from '../data/mods/solopet/formats';
import { Formats as SpookyMod                   } from '../data/mods/spookymod/formats';
import { Formats as Stadium                     } from '../data/mods/stadium/formats';
import { Formats as StadiumYB                   } from '../data/mods/stadiumyb/formats';
import { Formats as Stereotypes                 } from '../data/mods/stereotypes/formats';
import { Formats as SuperSmashOMs               } from '../data/mods/supersmashoms/formats';
//import { Formats as SuperTypesOU                } from '../data/mods/supertypesou/formats';
import { Formats as SylveMonsTest               } from '../data/mods/sylvemonstest/formats';
import { Formats as Tamagotchi                  } from '../data/mods/tamagotchi/formats';
import { Formats as TeraForming                 } from '../data/mods/teraforming/formats';
import { Formats as TeraMax                     } from '../data/mods/teramax/formats';
import { Formats as The331TypeChart             } from '../data/mods/the331typechartg9/formats';
import { Formats as TheBore                     } from '../data/mods/thebore/formats';
import { Formats as TierSovereign               } from '../data/mods/tiersovereign/formats';
import { Formats as Touhou                      } from '../data/mods/toho/formats';
import { Formats as TPDP                        } from '../data/mods/tpdp/formats';
import { Formats as TradingPost                 } from '../data/mods/tradingpost/formats';
import { Formats as TrainerSupport              } from '../data/mods/trainersupport/formats';
import { Formats as TripleThreat                } from '../data/mods/triplethreat/formats';
import { Formats as TwoStepMonsV3               } from '../data/mods/twostepmonsv3/formats';
import { Formats as UpsideDown                  } from '../data/mods/upsidedown/formats';
import { Formats as WeatherWar                  } from '../data/mods/weatherwar/formats';
import { Formats as Weedmons                    } from '../data/mods/weedmons/formats';
import { Formats as WhiteTusk                   } from '../data/mods/whitetusk/formats';
import { Formats as Woomod                      } from '../data/mods/woomod/formats';
import { Formats as Worldbuilding               } from '../data/mods/worldbuilding/formats';
//import { Formats as YayaMons                    } from '../data/mods/yayamons/formats';

export const Formats: FormatList = [
	///////////////////////////////////////////////////////////////
	///////////////////// Gen 9 Pet Mods //////////////////////////
	///////////////////////////////////////////////////////////////
	{
		section: "Gen 9 Pet Mods",
		column: 1,
	},
	...AlternatiumEX,
	...gen1Azure,
	...BackToSinnoh,
	...gen1BacktothePast,
	...BanHammersC3,
	...BearticPhone,
	...BlankCanvas,
	...Blindsided,
	...gen1Burgundy,
	...BookOfEnigmas,
	...BreedingVariantsNatDex,
	...CCaPM2024,
	...CleanSlateMicro2,
	...gen9CrossoverChaosC,
	...DLCmons,
	...Dollhouse,
	...DoNotUsetPMtM,
	...EbbAndFlow,
	...EliminationWar,
	...Eramons,
	...EternalPokemon,
	...FakemonFrontier,
	...gen9FusionEvolution,
	...gen9FusionEvolutionR,
	...genXBrunica,
	...genXDesvega,
	...GlaceMons,
	...GlaceMonsUber,
	...HiddenGems,
	...HideAndSeaking,
	...gen3HoennEchoes,
	...gen3HoennGaiden,
	...SharedPowerIronFist,
	...Ironmons,
	...LittleColosseum,
	...Masquerade,
	...MegasForAllPaldea,
	...gen9MegasForAll,
	...gen8MegasForAllv6,
	...gen6MegasRevisited,
	...MetaMons,
	...MicrometaMafia2,
	...MicrometaMafia3,
	...MoreBalancedHackmons,
	...gen9Multiverse,
	...NaturalSelection,
	...GenNext,
	...NotMyType,
	...OUTheorymons,
	...Paleomons,
	...PokeTypos,
	...PublicDomain,
	...RandomTandem,
	...gen1RBYCAP,
	...ReGeneration,
	...RegionalEvolutions,
	...ReturnToOrreTercera,
	...Roulettemons2,
	...SecretSanta,
	...SetInStone,
	...gen3ShadowColosseum,
	...SixBySix,
	...SmashModsBrawl,
	...SuperSmashOMs,
	...SmashStereotypes,
	...TeraForming,
	...TeraMax,
	...TierSovereign,
	...TradingPost,
	...TrainerSupport,
	...TripleThreat,
	...TwoStepMonsV3,
	...gen9Ubermons,
	...VaporeMons,
	...Worldbuilding,
	...gen9VGC20XX,
	
	///////////////////////////////////////////////////////////////
	///////////////////// Gen 8 Pet Mods //////////////////////////
	///////////////////////////////////////////////////////////////
	{
		section: "Gen 8 Pet Mods",
		column: 1,
	},
	...Abilitypos,
	...Alternatium,
	...BlackMarket,
	...BustAMove,
	...CCaPM2022,
	...gen2CrystalSeviiIslands,
	...ExtremeReboot,
	...gen8FusionEvolution,
	...gen1FutureProofing,
	...JolteMons,
	...MegasForAllKalos,
	...Restrictions,
	...SignatureRestrictions,
	...Stereotypes,

	///////////////////////////////////////////////////////////////
	//////////////////////// Solomods /////////////////////////////
	///////////////////////////////////////////////////////////////
	{
		section: "Solomods",
		column: 2,
	},
	...gen533Valuemons,
	...AGoldenExperience,
    //...gen3AdvPlus,
	...gen3AdvDeluxe,
	...gen3Tradebacks,
	...gen3AdvToThePast,
	...Animemons,
	...Balls,
	//...BareBones
    ...Beaftopia,
	...gen5BestWishesYoshiblaze,
	...ChatBats,
	...ClubmonsRequiem,
	...CommunityUsed2,
	...ConquestDex,
	...gen2CrystalLegacy,
	//...DexReversal
	...DenseAF,
	...DoNotUse,
	...DoubleTrouble,
    ...EarthSky,
	...EvolutionProject,
	...gen9EvolutionProject,
	...ForgottenMons,
	...FusionEvoCorruptCouncil,
	...FusionEvolutionDondozo,
	...gen9FusionEvolutionVGC,
	//...gen1Glitch,
	...gen2GSCDoubles,
	...gen8HaxMeters,
	//...gen3Hoennification, 
	//...iforgor,
	...gen1JohtoMons,
	...gen2JohtoExpansionPack,
	...Jollymod,
	...gen1JumpStarted,
	...KaensDex,
	...gen1KantoExpansionPack,
	...LucklessPlay,
	...Maadowr,
	...MaadowrLostZone,
	...MegaMania,
	...gen1Metronome,
	...Solopet,
	...gen1Moonside,
	...TheBore,
	...Patratdex,
	...PokemoNorthSouthEastWest,
	...Tamagotchi,
	...PonymonShowdown,
	...gen9Strong,
	...Pokemorty,
	...gen1Recolored,
	...RockBottom,
	//...RoulettemonsSolomod,
	...Scootopia,
	...ScootopiaV4,
	...Shinymons,
	...SignatureMons,
	...SpookyMod,
	...StadiumYB,
	//...SuperTypesOU,
	...gen2TeraCrystal,
	...The331TypeChart,
	...Touhou,
	...gen1TradebacksExpanded,
	...UpsideDown,
	...gen1VioletVersion,
	...WeatherWar,
	...Weedmons,
	...Woomod,
	//...YayaMons

	/*{
		section: "Randbats",
		column: 2,
	},
	...gen9Duomod,
	...Duomod,
	...Roulettemons,*/

	///////////////////////////////////////////////////////////////
	////////////////// Pet Mods Bonus Formats /////////////////////
	///////////////////////////////////////////////////////////////
	{
		section: "Pet Mods Bonus Formats",
		column: 3,
	},
	...BreedingVariants,
	//...CrossoverChaos,
	...gen3UUHoennGaiden,
	...gen6MixAndMegasRevisited,
	
	///////////////////////////////////////////////////////////////
	////////////////// Monster Hunter Solomod /////////////////////
	///////////////////////////////////////////////////////////////
	{
		section: "Monster Hunter Solomod",
		column: 3,
	},
	...MonsterHunter,
	...MonsterHunterOUSoloPLIII,
	
	{
		section: "Modern Gen Series",
		column: 3,
	},
	...ModernGen1,
	...ModernGen2,
	...ModernGen2Birds,
	...ModernGen3,
	...ModernGen4,
	
	/*{
		section: "ROPMM Formats",
		column: 3,
	},*/

	///////////////////////////////////////////////////////////////
	//////////////// Unofficial Pet Mod Formats ///////////////////
	///////////////////////////////////////////////////////////////
	{
		section: "Unofficial Pet Mod Formats",
		column: 3,
	},
	...gen8MaxMeter,
	...FakemonKitchen,
	...FurfrOU,
	...LittlestCup,
	...PLZA,
	...TPDP,
	{
		name: "[Gen 2] VGC 2001",
		mod: 'gen2doubles',
		gameType: 'doubles',
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'VGC Timer', 'Open Team Sheets', 'Team Preview', 'Picked Team Size = 4', 'Min Source Gen = 2'],
		banlist: [],
		teambuilderFormat: 'OU',
	},
	...WhiteTusk,
	
	{
		section: "Sample Teams Random Battles",
		column: 3,
	},
	...gen3OURandomSampleTeam,
];
