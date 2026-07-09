import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
        name: "[Gen 8] leif",
        mod: 'bobolieffakemon',
        desc: `<b>bobolieffakemon</b>: This is your mod!`,
		    threads: [
			  `&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/">Solomods Megathread</a>`,
		  ],
        ruleset: ['Standard NatDex', 'Dynamax Clause', 'Terastal Clause', 'Data Mod', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Baton Pass Clause', 'OHKO Clause'],
        banlist: ['All Pokemon', 'Rodiche', 'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Heavy-Duty Boots', 'Steelium Z'],
          unbanlist: [
             'Aeromo', 'Androsmos', 'Apparicious', 'Aquimanna', 'Breroot', 'Cephalethal', 'Cephalopath', 'Corazone', 'Croissansect', 'Cuzima', 'Dripig', 'Dustoph', 'Erverena', 'Espopod', 'Folivora', 'Formagia', 'Frog Aloft', 'Furiotl', 'Furnostrich', 'Galena', 'Gillomen', 'Glypdorsa', 'Grumplet', 'Gurso', 'Harmoth', 'Infekshi', 'Kakavo', 'Lightnimbus', 'Lunheron', 'Malizor', 'Mammicky', 'Marlion', 'Mowisp', 'Olfacrid', 'Osho', 'Peekoceros', 'Pelli', 'Phelpinch', 'Pichiri', 'Piedraderm', 'Quetzadrakon', 'Raiga', 'Rodiche-Hinterlands', 'Rodiche-Hive', 'Rodiche-Wildwood', 'Shiah', 'Shocbrute', 'Sholossus', 'Siltmanya', 'Sklea', 'Sodia', 'Teranim', 'Themon', 'Trybas', 'Tudek', 'Vambyss', 'Voraciousect', 'Wooliba', 'Woosher', 'Yolkai', 'Dudu-Doom', 'Tusslesprout', 'Wokmon', 'Kodamaton', 'Timbs Guy', "Wise Skeleton", "Vit", "Groverush", "Dezacaiman", "Igrozu", "Obsidiatra", "Cuca", "Nightwinx", "Bulbous", "Olmeria", "Girafadon", "Bloomorbid", "Chrysalisk"
			],
		onSwitchIn(pokemon) {
            this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
        }, 
	}
];
