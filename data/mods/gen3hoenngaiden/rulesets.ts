// Note: These are the rules that formats use
// The list of formats is stored in config/formats.js
export const Formats: {[k: string]: FormatData} = {

	// Rulesets
	///////////////////////////////////////////////////////////////////

	hoenngaidenmod: {
		effectType: 'Rule',
		name: 'Hoenn Gaiden Mod',
		desc: 'At the start of a battle, gives each player a link to the Hoenn Gaiden thread so they can use it to get information about new additions to the metagame.',
		unbanlist: [
			//Abilities
			'Sand Veil', 'Snow Warning', 'RKS System', 'Ice Body', 'Magic Guard', 'Galvanize', 'Overcoat', 'Desolate Land', 'Mold Breaker', 'Gulp Missile', 'Analytic', 'Protean', 'Neutralizing Gas',
			'Stakeout', 'Fur Coat',
			
			//Pokémon
			'Snover', 'Abomasnow', 'Gliscor', 'Frillish', 'Jellicent', 'Tynamo', 'Eelektrik', 'Eelektross', 'Cryogonal', 'Type: Null', 'Silvally', 'Silvally-Bug', 'Silvally-Dark',
			'Silvally-Dragon', 'Silvally-Electric', 'Silvally-Fighting', 'Silvally-Fire', 'Silvally-Flying', 'Silvally-Ghost', 'Silvally-Grass', 'Silvally-Ground', 'Silvally-Ice', 
			'Silvally-Poison', 'Silvally-Psychic', 'Silvally-Rock', 'Silvally-Steel', 'Silvally-Water', 'Golett', 'Golurk', 'Geodude-Alola', 'Graveler-Alola', 'Golem-Alola', 'Croagunk', 
			'Toxicroak', 'Crabrawler', 'Crabominable', 'Starly', 'Staravia', 'Staraptor', 'Fletchling', 'Fletchinder', 'Talonflame', 'Mawile', 'Stunky', 'Skuntank', 'Sylveon', 'Zarude',
			'Zarude-Dada', 'Buneary', 'Lopunny', 'Chespin', 'Quilladin', 'Chesnaught', 'Cramorant', 'Guzzlord',
			'Litten', 'Torracat', 'Incineroar', 'Mr. Mime-Galar', 'Mr. Rime', 'Uxie', 'Mime Jr.', 'Glaceon',
			'Dracovish', 'Slowpoke-Galar', 'Slowking-Galar', 'Marowak-Alola', 'Marowak-Alola-Totem',
			'Regieleki', 'Milcery', 'Alcremie',
			'Mamoswine', 'Roserade', 'Leafeon', 'Dusknoir', 'Slowbro-Galar', 'Mismagius', 'Honchkrow', 'Budew', 'Ambipom', 'Chingling', 'Munchlax', 'Weavile', 'Happiny', 'Lickilicky', 'Rhyperior', 'Tangrowth', 'Electivire', 'Magmortar', 'Togekiss', 'Yanmega', 'Porygon-Z', 'Magnezone', 'Gallade', 'Froslass', 'Probopass',
			'Rattata-Alola', 'Raticate-Alola', 'Raichu-Alola', 'Dugtrio-Alola', 'Persian-Alola', 'Diglett-Alola', 'Meowth-Alola', 'Meowth-Galar', 'Perrserker', 'Grimer-Alola', 'Muk-Alola', 'Exeggutor-Alola', 'Farfetchd-Galar', 'Weezing-Galar', 'Zigzagoon-Galar', 'Linoone-Galar', 'Corsola-Galar', 'Cursola', 'Obstagoon', 'Sirfetchd', 'Zapdos-Galar', 'Articuno-Galar', 'Moltres-Galar', 'Vulpix-Alola', 'Ninetales-Alola', 'Sandshrew-Alola', 'Sandslash-Alola', 'Ponyta-Galar', 'Rapidash-Galar',
			'Mantyke', 'Bonsly',
			'Stunfisk', 'Stunfisk-Galar', 'Regidrago', 'Skrelp', 'Dragalge', 'Sandile', 'Krokorok', 'Krookodile', 'Wimpod', 'Golisopod', 'Impidimp', 'Morgrem', 'Grimmsnarl', 'Pincurchin',
			
			//Moves
			'Multi-Attack', 'Ice Hammer', 'Acrobatics', 'Lunge', 'Foul Play', 'Spiky Shield', 'Sucker Punch', 'Jungle Healing', 'Ice Shard', 'Body Press', 'Boomburst', 'Spirit Break', 'Circle Throw',
			
			//Items
			'Expert Belt', 'Occa Berry', 'Passho Berry', 'Wacan Berry', 'Rindo Berry', 'Yache Berry', 'Chople Berry', 'Kebia Berry', 'Shuca Berry', 'Coba Berry', 'Payapa Berry', 'Tanga Berry', 
			'Charti Berry', 'Kasib Berry', 'Haban Berry', 'Colbur Berry', 'Babiri Berry', 'Chilan Berry', 'Custap Berry',
		],
		onBegin() {
			this.add(`raw|<img src="https://cdn.discordapp.com/attachments/510822010922860545/864665757446045716/Hoenn_Gaiden_Banner.png" height="213" width="381">`);
			this.add('-message', `Welcome to Hoenn Gaiden!`);
			this.add('-message', `This is a [Gen 3] OU-based format where we add later generation Pokemon, items, moves, and abilities, as well as change up existing ones!`);
			this.add('-message', `You can find our thread and metagame resources here:`);
			this.add('-message', `https://www.smogon.com/forums/threads/hoenn-gaiden-pet-mod-of-the-season-slate-8-concept-voting.3681339/`);
		},
	},
};
