export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	init() {
		const newMoves = (mon: string, moves: string[]) => {
			for (const move of moves) {
				this.modData('Learnsets', this.toID(mon)).learnset[this.toID(move)] = ["8M"];
			}
		};
    //newMoves("pkmn", ["move"]);
	//Burning Jealousy
	newMoves("houndoom", ["burningjealousy"]);
	newMoves("infernape", ["burningjealousy"]);
	newMoves("pyroar", ["burningjealousy"]);
	
	//Decorate
	newMoves("hatterene", ["decorate"]);
	newMoves("jirachi", ["decorate"]);
	newMoves("victini", ["decorate"]);
	
	//Eerie Spell
	newMoves("delphox", ["eeriespell"]);
	newMoves("hatterene", ["eeriespell"]);
	newMoves("mismagius", ["eeriespell"]);
	
	//Fairy Wind
	newMoves("celffa", ["fairywind"]);
	newMoves("clefairy", ["fairywind"]);
	newMoves("clefable", ["fairywind"]);
	newMoves("hatenna", ["fairywind"]);
	newMoves("hattrem", ["fairywind"]);
	newMoves("hatterene", ["fairywind"]);
	newMoves("primarina", ["fairywind"]);
	newMoves("mew", ["fairywind"]);
	
	//Jaw Lock
	newMoves("rockruff", ["jawlock"]);
	newMoves("lycanroc", ["jawlock"]);
	newMoves("lycanrocdusk", ["jawlock"]);
	newMoves("lycanrocmidnight", ["jawlock"]);
	newMoves("tyrunt", ["jawlock"]);
	newMoves("tyrantrum", ["jawlock"]);
	
	//Razor Wind
	newMoves("tornadus", ["razorwind"]);
	newMoves("thundurus", ["razorwind"]);
	newMoves("landorus", ["razorwind"]);
	newMoves("articunogalar", ["razorwind"]);
	newMoves("zapdosgalar", ["razorwind"]);
	newMoves("moltresgalar", ["razorwind"]);
	newMoves("celesteela", ["razorwind"]);
	newMoves("xatu", ["razorwind"]);
	
	//Strength
	newMoves("beedrill", ["strength"]);
  },
};
