'use strict';

exports.BattleScripts = {
	getEffect: function (name) {
		if (name && typeof name !== 'string') {
			return name;
		}
		let id = toID(name);
		if (id.startsWith('ability')) return Object.assign(Object.create(this.getAbility(id.slice(7))), {id});
		return Object.getPrototypeOf(this).getEffect.call(this, name);
	},
	suppressingWeather() {
		for (const side of this.sides) {
			for (const pokemon of side.active) {
				if (pokemon && !pokemon.ignoringAbility() && pokemon.hasAbility('Cloud Nine')) {
					return true;
				}
			}
		}
		return false;
	},
	pokemon: {
		hasAbility: function (ability) {
			if (this.ignoringAbility()) return false;
			if (Array.isArray(ability)) return ability.some(ability => this.hasAbility(ability));
			ability = toID(ability);
			return this.ability === ability || !!this.volatiles['ability' + ability];
		},
	},
	init() {
		// Confidence Boost
		this.modData('Pokedex', 'victini').abilities['S'] = 'Confidence Boost';
		this.modData('Pokedex', 'plusle').abilities['S'] = 'Confidence Boost';
		this.modData('Pokedex', 'machop').abilities['S'] = 'Confidence Boost';
		this.modData('Pokedex', 'machoke').abilities['S'] = 'Confidence Boost';
		this.modData('Pokedex', 'machamp').abilities['S'] = 'Confidence Boost';
		this.modData('Pokedex', 'florges').abilities['S'] = 'Confidence Boost';
		
		// Protective Powder
		this.modData('Pokedex', 'vivillon').abilities['S'] = 'Protective Powder';
		this.modData('Pokedex', 'wurmple').abilities['S'] = 'Protective Powder';
		this.modData('Pokedex', 'cascoon').abilities['S'] = 'Protective Powder';
		this.modData('Pokedex', 'beautifly').abilities['S'] = 'Protective Powder';
		this.modData('Pokedex', 'ribombee').abilities['S'] = 'Protective Powder';
		
		// Arctic Armor
		this.modData('Pokedex', 'spheal').abilities['S'] = 'Arctic Armor';
		this.modData('Pokedex', 'sealeo').abilities['S'] = 'Arctic Armor';
		this.modData('Pokedex', 'walrein').abilities['S'] = 'Arctic Armor';
		this.modData('Pokedex', 'lapras').abilities['S'] = 'Arctic Armor';
		this.modData('Pokedex', 'rotomfrost').abilities['S'] = 'Arctic Armor';
		this.modData('Pokedex', 'kyurem').abilities['S'] = 'Arctic Armor';
		this.modData('Pokedex', 'eiscue').abilities['S'] = 'Arctic Armor';
		
		// Heavy Expert: Onix, Steelix, Rhyhorn, Rhydon, Rhyperior, Aron, Lairon, Aggron			
		this.modData('Pokedex', 'onix').abilities['S'] = 'Heavy Expert';
		this.modData('Pokedex', 'steelix').abilities['S'] = 'Heavy Expert';
		this.modData('Pokedex', 'rhyhorn').abilities['S'] = 'Heavy Expert';
		this.modData('Pokedex', 'rhydon').abilities['S'] = 'Heavy Expert';
		this.modData('Pokedex', 'rhyperior').abilities['S'] = 'Heavy Expert';
		this.modData('Pokedex', 'aron').abilities['S'] = 'Heavy Expert';
		this.modData('Pokedex', 'lairon').abilities['S'] = 'Heavy Expert';
		this.modData('Pokedex', 'aggron').abilities['S'] = 'Heavy Expert';
		this.modData('Pokedex', 'copperajah').abilities['S'] = 'Heavy Expert';
		
		// Ocean's Blessing: Lumineon, Alomomola, Mantine, Manaphy, Phione
		this.modData('Pokedex', 'lumineon').abilities['S'] = 'Ocean\'s Blessing';
		this.modData('Pokedex', 'alomomola').abilities['S'] = 'Ocean\'s Blessing';
		this.modData('Pokedex', 'mantine').abilities['S'] = 'Ocean\'s Blessing';
		this.modData('Pokedex', 'manaphy').abilities['S'] = 'Ocean\'s Blessing';
		this.modData('Pokedex', 'phione').abilities['S'] = 'Ocean\'s Blessing';
		
		// Spooky Encounter: Cacnea, Cacturne, Scraggy, Scrafty, Pinsir, Spiritomb
		this.modData('Pokedex', 'cacnea').abilities['S'] = 'Spooky Encounter';
		this.modData('Pokedex', 'cacturne').abilities['S'] = 'Spooky Encounter';
		this.modData('Pokedex', 'scraggy').abilities['S'] = 'Spooky Encounter';
		this.modData('Pokedex', 'scrafty').abilities['S'] = 'Spooky Encounter';
		this.modData('Pokedex', 'pinsir').abilities['S'] = 'Spooky Encounter';
		this.modData('Pokedex', 'spiritomb').abilities['S'] = 'Spooky Encounter';
		this.modData('Pokedex', 'impidimp').abilities['S'] = 'Spooky Encounter';
		this.modData('Pokedex', 'morgrem').abilities['S'] = 'Spooky Encounter';
		this.modData('Pokedex', 'grimmsnarl').abilities['S'] = 'Spooky Encounter';
		
		// Hand Off: Aipom, Ambipom,
		this.modData('Pokedex', 'aipom').abilities['S'] = 'Hand Off';
		this.modData('Pokedex', 'ambipom').abilities['S'] = 'Hand Off';
		
		// Torrential Will: Blastoise, Feraligatr, Swampert, Empoleon, Samurott, Simipour, Greninja, Primarina
		this.modData('Pokedex', 'blastoise').abilities['S'] = 'Torrential Will';
		this.modData('Pokedex', 'feraligatr').abilities['S'] = 'Torrential Will';
		this.modData('Pokedex', 'swampert').abilities['S'] = 'Torrential Will';
		this.modData('Pokedex', 'empoleon').abilities['S'] = 'Torrential Will';
		this.modData('Pokedex', 'samurott').abilities['S'] = 'Torrential Will';
		this.modData('Pokedex', 'simipour').abilities['S'] = 'Torrential Will';
		this.modData('Pokedex', 'greninja').abilities['S'] = 'Torrential Will';
		this.modData('Pokedex', 'primarina').abilities['S'] = 'Torrential Will';
		this.modData('Pokedex', 'inteleon').abilities['S'] = 'Torrential Will';
		
		// Overgrowing Will: Venusaur, Meganium, Sceptile, Torterra, Serperior, Simisage, Chesnaught, Decidueye
		this.modData('Pokedex', 'venusaur').abilities['S'] = 'Overgrowing Will';
		this.modData('Pokedex', 'meganium').abilities['S'] = 'Overgrowing Will';
		this.modData('Pokedex', 'sceptile').abilities['S'] = 'Overgrowing Will';
		this.modData('Pokedex', 'torterra').abilities['S'] = 'Overgrowing Will';
		this.modData('Pokedex', 'serperior').abilities['S'] = 'Overgrowing Will';
		this.modData('Pokedex', 'simisage').abilities['S'] = 'Overgrowing Will';
		this.modData('Pokedex', 'chesnaught').abilities['S'] = 'Overgrowing Will';
		this.modData('Pokedex', 'decidueye').abilities['S'] = 'Overgrowing Will';
		this.modData('Pokedex', 'rillaboom').abilities['S'] = 'Overgrowing Will';
		
		// Blazing Will: Charizard, Typhlosion, Blaziken, Infernape, Emboar, Simisear, Delphox, Incineroar
		this.modData('Pokedex', 'charizard').abilities['S'] = 'Blazing Will';
		this.modData('Pokedex', 'typhlosion').abilities['S'] = 'Blazing Will';
		this.modData('Pokedex', 'blaziken').abilities['S'] = 'Blazing Will';
		this.modData('Pokedex', 'infernape').abilities['S'] = 'Blazing Will';
		this.modData('Pokedex', 'simisear').abilities['S'] = 'Blazing Will';
		this.modData('Pokedex', 'emboar').abilities['S'] = 'Blazing Will';
		this.modData('Pokedex', 'delphox').abilities['S'] = 'Blazing Will';
		this.modData('Pokedex', 'incineroar').abilities['S'] = 'Blazing Will';
		this.modData('Pokedex', 'cinderace').abilities['S'] = 'Blazing Will';
	
		// Bomb Shelter: Natu, Xatu, Sigilyph, Chespin, Quilladin, Jangmo-o, Hakamo-o, Kommo-o, Octillery
		this.modData('Pokedex', 'natu').abilities['S'] = 'Bomb Shelter';
		this.modData('Pokedex', 'xatu').abilities['S'] = 'Bomb Shelter';
		this.modData('Pokedex', 'sigilyph').abilities['S'] = 'Bomb Shelter';
		this.modData('Pokedex', 'chespin').abilities['S'] = 'Bomb Shelter';
		this.modData('Pokedex', 'quilladin').abilities['S'] = 'Bomb Shelter';
		this.modData('Pokedex', 'jangmoo').abilities['S'] = 'Bomb Shelter';
		this.modData('Pokedex', 'hakamoo').abilities['S'] = 'Bomb Shelter';
		this.modData('Pokedex', 'kommoo').abilities['S'] = 'Bomb Shelter';
		this.modData('Pokedex', 'octillery').abilities['S'] = 'Bomb Shelter';
		
		// Guardian Angel: Ralts, Kirlia, Gardevoir, Togepi, Togetic, Togekiss
		this.modData('Pokedex', 'ralts').abilities['S'] = 'Guardian Angel';
		this.modData('Pokedex', 'kirlia').abilities['S'] = 'Guardian Angel';
		this.modData('Pokedex', 'gardevoir').abilities['S'] = 'Guardian Angel';
		this.modData('Pokedex', 'togepi').abilities['S'] = 'Guardian Angel';
		this.modData('Pokedex', 'togetic').abilities['S'] = 'Guardian Angel';
		this.modData('Pokedex', 'togekiss').abilities['S'] = 'Guardian Angel';
		
		//Retro Racer: Tauros, Dodrio, Aerodactyl
		this.modData('Pokedex', 'tauros').abilities['S'] = 'Retro Racer';
		this.modData('Pokedex', 'dodrio').abilities['S'] = 'Retro Racer';
		this.modData('Pokedex', 'aerodactyl').abilities['S'] = 'Retro Racer';
		
		// Omnimorph: Silvally
		this.modData('Pokedex', 'silvally').abilities['S'] = 'Omnimorph';
		this.modData('Pokedex', 'silvallybug').abilities['S'] = 'Omnimorph';
		this.modData('Pokedex', 'silvallydark').abilities['S'] = 'Omnimorph';
		this.modData('Pokedex', 'silvallydragon').abilities['S'] = 'Omnimorph';
		this.modData('Pokedex', 'silvallyelectric').abilities['S'] = 'Omnimorph';
		this.modData('Pokedex', 'silvallyfairy').abilities['S'] = 'Omnimorph';
		this.modData('Pokedex', 'silvallyfighting').abilities['S'] = 'Omnimorph';
		this.modData('Pokedex', 'silvallyfire').abilities['S'] = 'Omnimorph';
		this.modData('Pokedex', 'silvallyflying').abilities['S'] = 'Omnimorph';
		this.modData('Pokedex', 'silvallyghost').abilities['S'] = 'Omnimorph';
		this.modData('Pokedex', 'silvallygrass').abilities['S'] = 'Omnimorph';
		this.modData('Pokedex', 'silvallyground').abilities['S'] = 'Omnimorph';
		this.modData('Pokedex', 'silvallyice').abilities['S'] = 'Omnimorph';
		this.modData('Pokedex', 'silvallypoison').abilities['S'] = 'Omnimorph';
		this.modData('Pokedex', 'silvallypsychic').abilities['S'] = 'Omnimorph';
		this.modData('Pokedex', 'silvallyrock').abilities['S'] = 'Omnimorph';
		this.modData('Pokedex', 'silvallysteel').abilities['S'] = 'Omnimorph';
		this.modData('Pokedex', 'silvallypsychic').abilities['S'] = 'Omnimorph';
		
		// Crystalize: Carbink, Roggenrola, Boldore, Gigalith, Sableye, Spoink, Grumpig, Nihilego
		this.modData('Pokedex', 'carbink').abilities['S'] = 'Crystalize';
		this.modData('Pokedex', 'roggenrola').abilities['S'] = 'Crystalize';
		this.modData('Pokedex', 'boldore').abilities['S'] = 'Crystalize';
		this.modData('Pokedex', 'gigalith').abilities['S'] = 'Crystalize';
		this.modData('Pokedex', 'sableye').abilities['S'] = 'Crystalize';
		this.modData('Pokedex', 'spoink').abilities['S'] = 'Crystalize';
		this.modData('Pokedex', 'grumpig').abilities['S'] = 'Crystalize';
		this.modData('Pokedex', 'nihilego').abilities['S'] = 'Crystalize';
		
		// Ancient Awakening: Lunatone, Solrock, Regirock, Yamask, Cofagrigus, Golett, Golurk
		this.modData('Pokedex', 'lunatone').abilities['S'] = 'Ancient Awakening';
		this.modData('Pokedex', 'solrock').abilities['S'] = 'Ancient Awakening';
		this.modData('Pokedex', 'regirock').abilities['S'] = 'Ancient Awakening';
		this.modData('Pokedex', 'yamask').abilities['S'] = 'Ancient Awakening';
		this.modData('Pokedex', 'cofagrigus').abilities['S'] = 'Ancient Awakening';
		this.modData('Pokedex', 'golett').abilities['S'] = 'Ancient Awakening';
		this.modData('Pokedex', 'golurk').abilities['S'] = 'Ancient Awakening';
		
		// Miracle Fluff: Furfrou, Cottonee, Whimsicott, Swablu, Altaria, Mareep, Flaaffy, Ampharos
		this.modData('Pokedex', 'furfrou').abilities['S'] = 'Miracle Fluff';
		this.modData('Pokedex', 'cottonee').abilities['S'] = 'Miracle Fluff';
		this.modData('Pokedex', 'whimsicott').abilities['S'] = 'Miracle Fluff';
		this.modData('Pokedex', 'swablu').abilities['S'] = 'Miracle Fluff';
		this.modData('Pokedex', 'swablu').abilities['S'] = 'Miracle Fluff';
		this.modData('Pokedex', 'altaria').abilities['S'] = 'Miracle Fluff';
		this.modData('Pokedex', 'mareep').abilities['S'] = 'Miracle Fluff';
		this.modData('Pokedex', 'flaaffy').abilities['S'] = 'Miracle Fluff';
		this.modData('Pokedex', 'ampharos').abilities['S'] = 'Miracle Fluff';
		this.modData('Pokedex', 'eldegoss').abilities['S'] = 'Miracle Fluff';
		this.modData('Pokedex', 'wooloo').abilities['S'] = 'Miracle Fluff';
		this.modData('Pokedex', 'dubwool').abilities['S'] = 'Miracle Fluff';
		
		// Knighthood: Hitmonchan, Hitmontop, Hitmonlee, Tyrogue, Throh, Sawk, Riolu
		this.modData('Pokedex', 'hitmonchan').abilities['S'] = 'Knighthood';
		this.modData('Pokedex', 'hitmontop').abilities['S'] = 'Knighthood';
		this.modData('Pokedex', 'hitmonlee').abilities['S'] = 'Knighthood';
		this.modData('Pokedex', 'riolu').abilities['S'] = 'Knighthood';
		this.modData('Pokedex', 'tyrogue').abilities['S'] = 'Knighthood';
		this.modData('Pokedex', 'throh').abilities['S'] = 'Knighthood';
		this.modData('Pokedex', 'sawk').abilities['S'] = 'Knighthood';
		this.modData('Pokedex', 'sirfetchd').abilities['S'] = 'Knighthood';
		this.modData('Pokedex', 'corvisquire').abilities['S'] = 'Knighthood';
		this.modData('Pokedex', 'corviknight').abilities['S'] = 'Knighthood';
		
		// Hibernation: Teddiursa, Ursaring, Sentret, Furret, Sandshrew-Alola, Sandslash-Alola, Swinub, Piloswine
		this.modData('Pokedex', 'teddiursa').abilities['S'] = 'Hibernation';
		this.modData('Pokedex', 'ursaring').abilities['S'] = 'Hibernation';
		this.modData('Pokedex', 'sentret').abilities['S'] = 'Hibernation';
		this.modData('Pokedex', 'furret').abilities['S'] = 'Hibernation';
		this.modData('Pokedex', 'sandshrewalola').abilities['S'] = 'Hibernation';
		this.modData('Pokedex', 'sandslashalola').abilities['S'] = 'Hibernation';
		this.modData('Pokedex', 'swinub').abilities['S'] = 'Hibernation';
		this.modData('Pokedex', 'piloswine').abilities['S'] = 'Hibernation';
		this.modData('Pokedex', 'skwovet').abilities['S'] = 'Hibernation';
		this.modData('Pokedex', 'greedent').abilities['S'] = 'Hibernation';
		
		// Sinister Escort: Hydreigon, Misdreavus, Mismagius
		this.modData('Pokedex', 'hydreigon').abilities['S'] = 'Sinister Escort';
		this.modData('Pokedex', 'misdreavus').abilities['S'] = 'Sinister Escort';
		this.modData('Pokedex', 'mismagius').abilities['S'] = 'Sinister Escort';
		
		// Dragon Focus: Dragonite, Flygon, Goodra
		this.modData('Pokedex', 'dragonite').abilities['S'] = 'Dragon Focus';
		this.modData('Pokedex', 'goodra').abilities['S'] = 'Dragon Focus';
		this.modData('Pokedex', 'flygon').abilities['S'] = 'Dragon Focus';
		
		// Wind Tunnel: Ducklett, Swanna,
		this.modData('Pokedex', 'ducklett').abilities['S'] = 'Wind Tunnel';
		this.modData('Pokedex', 'swanna').abilities['S'] = 'Wind Tunnel';
		
		// Precocious Pupae: Metapod, Kakuna, Dottler, Swadloon,
		this.modData('Pokedex', 'metapod').abilities['S'] = 'Precocious Pupae';
		this.modData('Pokedex', 'kakuna').abilities['S'] = 'Precocious Pupae';
		this.modData('Pokedex', 'dottler').abilities['S'] = 'Precocious Pupae';
		this.modData('Pokedex', 'swadloon').abilities['S'] = 'Precocious Pupae';
		
		// Eviofite: Mankey, Doublade, Clobbopus
		// this.modData('Pokedex', 'doublade').abilities['S'] = 'Eviofite';
		// this.modData('Pokedex', 'mankey').abilities['S'] = 'Eviofite';
		// this.modData('Pokedex', 'clobbopus').abilities['S'] = 'Eviofite';
		
		// Deceptive Endurance: Ledyba, Ledian, Silcoon, Cascoon, Dustox
		 this.modData('Pokedex', 'ledyba').abilities['S'] = 'Deceptive Endurance';
		 this.modData('Pokedex', 'ledian').abilities['S'] = 'Deceptive Endurance';
		 this.modData('Pokedex', 'silcoon').abilities['S'] = 'Deceptive Endurance';
		 this.modData('Pokedex', 'cascoon').abilities['S'] = 'Deceptive Endurance';
		 this.modData('Pokedex', 'dustox').abilities['S'] = 'Deceptive Endurance';
		
		//Pecking Order: Pidgey, Pidgeotto, Pidgeot, Pidove, Tranquill, Unfezant, Vullaby, Mandibuzz, Fletchling, Fletchinder, Talonflame
		 this.modData('Pokedex', 'pidgey').abilities['S'] = 'Pecking Order';
		 this.modData('Pokedex', 'pidgeotto').abilities['S'] = 'Pecking Order';
		 this.modData('Pokedex', 'pidgeot').abilities['S'] = 'Pecking Order';
		 this.modData('Pokedex', 'pidove').abilities['S'] = 'Pecking Order';
		 this.modData('Pokedex', 'tranquill').abilities['S'] = 'Pecking Order';
		 this.modData('Pokedex', 'unfezant').abilities['S'] = 'Pecking Order';
		 this.modData('Pokedex', 'vullaby').abilities['S'] = 'Pecking Order';
		 this.modData('Pokedex', 'mandibuzz').abilities['S'] = 'Pecking Order';
		 this.modData('Pokedex', 'fletchling').abilities['S'] = 'Pecking Order';
		 this.modData('Pokedex', 'fletchinder').abilities['S'] = 'Pecking Order';
		 this.modData('Pokedex', 'talonflame').abilities['S'] = 'Pecking Order';
		
		//Instinctive Adjustment: Sneasel
		// this.modData('Pokedex', 'sneasel').abilities['S'] = 'Instinctive Adjustment';
		
		//Sunlight Supercharge: Vulpix, Ninetales, Torkoal, Lurantis
		// this.modData('Pokedex', 'vulpix').abilities['S'] = 'Sunlight Supercharge';
		// this.modData('Pokedex', 'ninetales').abilities['S'] = 'Sunlight Supercharge';
		// this.modData('Pokedex', 'torkoal').abilities['S'] = 'Sunlight Supercharge';
		// this.modData('Pokedex', 'lurantis').abilities['S'] = 'Sunlight Supercharge';
		
		//Alchemy: Solgaleo, Lunala, Grimer-Alola, Muk-Alola, Salandit, Salazzle, Croagunk, Toxicroak
		// this.modData('Pokedex', 'solgaleo').abilities['S'] = 'Alchemy';
		// this.modData('Pokedex', 'lunala').abilities['S'] = 'Alchemy';
		// this.modData('Pokedex', 'grimeralola').abilities['S'] = 'Alchemy';
		// this.modData('Pokedex', 'mukalola').abilities['S'] = 'Alchemy';
		// this.modData('Pokedex', 'salandit').abilities['S'] = 'Alchemy';
		// this.modData('Pokedex', 'salazzle').abilities['S'] = 'Alchemy';
		// this.modData('Pokedex', 'croagunk').abilities['S'] = 'Alchemy';
		// this.modData('Pokedex', 'toxicroak').abilities['S'] = 'Alchemy';
		
		//Surround: Wishiwashi
		// this.modData('Pokedex', 'wishiwashi').abilities['S'] = 'Surround';
		
		//Surface to Air: Geodude, Graveler, Golem, Larvitar, Pupitar, Silicobra, Sandaconda
		 this.modData('Pokedex', 'geodude').abilities['S'] = 'Surface to Air';
		 this.modData('Pokedex', 'graveler').abilities['S'] = 'Surface to Air';
		 this.modData('Pokedex', 'golem').abilities['S'] = 'Surface to Air';
		 this.modData('Pokedex', 'larvitar').abilities['S'] = 'Surface to Air';
		 this.modData('Pokedex', 'pupitar').abilities['S'] = 'Surface to Air';
		 this.modData('Pokedex', 'silicobra').abilities['S'] = 'Surface to Air';
		 this.modData('Pokedex', 'sandaconda').abilities['S'] = 'Surface to Air';
		
		//Combo Attacker: Shellder, Cloyster, Mincinno, Cincinno, Pikipek, Trumbeak, Toucannon
		 this.modData('Pokedex', 'shellder').abilities['S'] = 'Combo Attacker';
		 this.modData('Pokedex', 'cloyster').abilities['S'] = 'Combo Attacker';
		 this.modData('Pokedex', 'minccino').abilities['S'] = 'Combo Attacker';
		 this.modData('Pokedex', 'cinccino').abilities['S'] = 'Combo Attacker';
		 this.modData('Pokedex', 'pikipek').abilities['S'] = 'Combo Attacker';
		 this.modData('Pokedex', 'trumbeak').abilities['S'] = 'Combo Attacker';
		 this.modData('Pokedex', 'toucannon').abilities['S'] = 'Combo Attacker';
		
		//Fertilizer: Miltank, Mudbray, Mudsdale, Bouffalant, Comfey
		// this.modData('Pokedex', 'miltank').abilities['S'] = 'Fertilizer';
		// this.modData('Pokedex', 'mudbray').abilities['S'] = 'Fertilizer';
		// this.modData('Pokedex', 'mudsdale').abilities['S'] = 'Fertilizer';
		// this.modData('Pokedex', 'bouffalant').abilities['S'] = 'Fertilizer';
		// this.modData('Pokedex', 'comfey').abilities['S'] = 'Fertilizer';
		
		//Lunar Veil: Cresselia
		// this.modData('Pokedex', 'cresselia').abilities['S'] = 'Lunar Veil';
		
		//Electro Magnet: Magnemite, Magneton, Magnezone, Nosepass, Probopass, Geodude-Alola, Graveler-Alola, Golem-Alola
		 this.modData('Pokedex', 'magnemite').abilities['S'] = 'Electro Magnet';
		 this.modData('Pokedex', 'magneton').abilities['S'] = 'Electro Magnet';
		 this.modData('Pokedex', 'magnezone').abilities['S'] = 'Electro Magnet';
		 this.modData('Pokedex', 'nosepass').abilities['S'] = 'Electro Magnet';
		 this.modData('Pokedex', 'probopass').abilities['S'] = 'Electro Magnet';
		 this.modData('Pokedex', 'geodudealola').abilities['S'] = 'Electro Magnet';
		 this.modData('Pokedex', 'graveleralola').abilities['S'] = 'Electro Magnet';
		 this.modData('Pokedex', 'golemalola').abilities['S'] = 'Electro Magnet';
		
		//Legendary Presence: Moltres, Articuno, Zapdos, Mewtwo
		 this.modData('Pokedex', 'moltres').abilities['S'] = 'Legendary Presence';
		 this.modData('Pokedex', 'articuno').abilities['S'] = 'Legendary Presence';
		 this.modData('Pokedex', 'zapdos').abilities['S'] = 'Legendary Presence';
		 this.modData('Pokedex', 'mewtwo').abilities['S'] = 'Legendary Presence';
		
		//Ancestry: Horsea, Drampa
		// this.modData('Pokedex', 'horsea').abilities['S'] = 'Ancestry';
		// this.modData('Pokedex', 'drampa').abilities['S'] = 'Ancestry';
		
		//Phoneme Fantasy: Ditto, Smeargle
		// this.modData('Pokedex', 'ditto').abilities['S'] = 'Phoneme Fantasy';
		// this.modData('Pokedex', 'smeargle').abilities['S'] = 'Phoneme Fantasy';
		
		//Antivirus: Porygon, Porygon2, Porygon-Z, Rotom, Rotom-Wash, Rotom-Fan, Rotom-Heat, Rotom-Mow
		// this.modData('Pokedex', 'porygon').abilities['S'] = 'Antivirus';
		// this.modData('Pokedex', 'porygon2').abilities['S'] = 'Antivirus';
		// this.modData('Pokedex', 'porygonz').abilities['S'] = 'Antivirus';
		// this.modData('Pokedex', 'rotom').abilities['S'] = 'Antivirus';
		// this.modData('Pokedex', 'rotomwash').abilities['S'] = 'Antivirus';
		// this.modData('Pokedex', 'rotomfan').abilities['S'] = 'Antivirus';
		// this.modData('Pokedex', 'rotomheat').abilities['S'] = 'Antivirus';
		// this.modData('Pokedex', 'rotommow').abilities['S'] = 'Antivirus';
		
		// Fountain of Youth: Happiny, Cleffa, Igglybuff, Wynaut, Toxel
		// this.modData('Pokedex', 'happiny').abilities['S'] = 'Fountain of Youth';
		// this.modData('Pokedex', 'cleffa').abilities['S'] = 'Fountain of Youth';
		// this.modData('Pokedex', 'igglybuff').abilities['S'] = 'Fountain of Youth';
		// this.modData('Pokedex', 'wynaut').abilities['S'] = 'Fountain of Youth';
		// this.modData('Pokedex', 'toxel').abilities['S'] = 'Fountain of Youth';
		
		// Safe Space: Audino, Jigglypuff, Wigglytuff, Bonsly, Sudowoodo, Glameow, Purugly, Hattena, Hattrem, Hatterene, Indeedee (Male and Female)
		// this.modData('Pokedex', 'audino').abilities['S'] = 'Safe Space';
		// this.modData('Pokedex', 'jigglypuff').abilities['S'] = 'Safe Space';
		// this.modData('Pokedex', 'bonsly').abilities['S'] = 'Safe Space';
		// this.modData('Pokedex', 'sudowoodo').abilities['S'] = 'Safe Space';
		// this.modData('Pokedex', 'wigglytuff').abilities['S'] = 'Safe Space';
		// this.modData('Pokedex', 'glameow').abilities['S'] = 'Safe Space';
		// this.modData('Pokedex', 'purgly').abilities['S'] = 'Safe Space';
		// this.modData('Pokedex', 'hattena').abilities['S'] = 'Safe Space';
		// this.modData('Pokedex', 'hattrem').abilities['S'] = 'Safe Space';
		// this.modData('Pokedex', 'hatterene').abilities['S'] = 'Safe Space';
		// this.modData('Pokedex', 'indeedee').abilities['S'] = 'Safe Space';
		// this.modData('Pokedex', 'indeedeef').abilities['S'] = 'Safe Space';


	}
};
