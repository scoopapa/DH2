export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	/*init() {
		const newMoves = (pokemonid: string, moveids: string[]) => {
			for (const moveid of moveids) {
				this.modData('Learnsets', pokemonid).learnset[moveid] = ['9L1'];
			}
		};
			
		newMoves('absol', ['comeuppance', 'postponerage']);
		newMoves('aerodactyl', ['soaringassault']);
		newMoves('anorith', ['pounce', 'trailblaze']);
		newMoves('arctovish', ['aquacutter', 'chillingwater']);
		newMoves('axew', ['battleaxe']);
		newMoves('beldum', ['steelbullets']);
		newMoves('bellsprout', ['branchpoke', 'corrosivegas', 'skittersmack', 'trailblaze']);
		newMoves('breloom', ['backupcall']);
		newMoves('bruxish', ['bubblejet']);
		newMoves('carnivine', ['branchpoke', 'jawlock', 'pounce', 'skittersmack', 'snaptrap', 'trailblaze']);
		newMoves('celebi', ['trailblaze']);
		newMoves('ceruledge', ['postponerage']);
		newMoves('chienpao', ['postponerage']);
		newMoves('chimchar', ['backupcall', 'burningjealousy', 'coaching']);
		newMoves('chinchou', ['bubblejet', 'lightabsorption']);
		newMoves('chiyu', ['postponerage']);
		newMoves('cleffa', ['fairdeal']);
		newMoves('comfey', ['fairdeal']);
		newMoves('corpish', ['bubblejet']);
		newMoves('cramorant', ['aquacutter', 'bubblejet', 'chillingwater', 'soaringassault']);
		newMoves('cufant', ['steelbullets']);
		newMoves('cutiefly', ['fairdeal']);
		newMoves('deoxys', ['bodypress', 'corrosivegas']);
		newMoves('dhelmise', ['steelbullets']);
		newMoves('dracovish', ['aquacutter', 'chillingwater']);
		newMoves('dragonite', ['soaringassault']);
		newMoves('drifloon', ['poltergeist', 'soaringassault']);
		newMoves('dusclops', ['ragefist']);
		newMoves('dwebble', ['pounce', 'silktrap']);
		newMoves('empoleon', ['wavecrash', 'steelbullets']);
		newMoves('fidough', ['fairdeal']);
		newMoves('flabebe', ['soaringassault']);
		newMoves('fletchling', ['soaringassault']);
		newMoves('fomantis', ['closecombat']);
		newMoves('gallade', ['backupcall']);
		newMoves('gholdengo', ['steelbullets']);
		newMoves('gligar', ['soaringassault']);
		newMoves('golett', ['ragefist']);
		newMoves('gyarados', ['soaringassault']);
		newMoves('honedge', ['lastrespects', 'postponerage', 'steelbullets']);
		newMoves('impidimp', ['fairdeal', 'postponerage']);
		newMoves('infernape', ['ragingfury']);
		newMoves('inkay', ['closecombat', 'comeuppance']);
		newMoves('jangmoo', ['backupcall', 'steelbullets']);
		newMoves('karrablast', ['pounce', 'trailblaze']);
		newMoves('kleavor', ['battleaxe']);
		newMoves('klefki', ['fairdeal', 'steelbullets']);
		newMoves('koraidon', ['armthrust', 'backupcall', 'soaringassault']);
		newMoves('lapras', ['bubblejet']);
		newMoves('latias', ['twinbeam']);
		newMoves('latios', ['twinbeam']);
		newMoves('lileep', ['trailblaze']);
		newMoves('lotad', ['aquacutter', 'bubblejet', 'chillingwater', 'trailblaze']);
		newMoves('lucario', ['steelbullets']);
		newMoves('lugia', ['chillingwater', 'soaringassault']);
		newMoves('lunatone', ['glassshimmer', 'luminacrash', 'moonlight']);
		newMoves('magikarp', ['bubblejet']);
		newMoves('magnemite', ['overheat']);
		newMoves('manaphy', ['aquacutter', 'bubblejet', 'chillingwater', 'flipturn', 'icespinner', 'takehearts']);
		newMoves('mankey', ['backupcall', 'postponerage']);
		newMoves('maschiff', ['comeuppance']);
		newMoves('mawile', ['steelbullets']);
		newMoves('melmetal', ['bulletpunch', 'rapidspin']);
		newMoves('meltan', ['steelbullets']);
		newMoves('meowscarada', ['postponerage']);
		newMoves('mienfoo', ['backupcall']);
		newMoves('miraidon', ['soaringassault', 'steelbullets']);
		newMoves('morelull', ['fairdeal', 'trailblaze']);
		newMoves('munchlax', ['slackoff']);
		newMoves('nacli', ['glassshimmer']);
		newMoves('natu', ['soaringassault']);
		newMoves('noibat', ['soaringassault']);
		newMoves('nuzleaf', ['postponerage']);
		newMoves('pancham', ['backupcall']);
		newMoves('paras', ['branchpoke', 'skittersmack', 'pounce', 'trailblaze']);
		newMoves('passimian', ['backupcall']);
		newMoves('pawniard', ['postponerage', 'steelbullets']);
		newMoves('phantump', ['trailblaze']);
		newMoves('phione', ['aquacutter', 'bubblejet', 'chillingwater', 'flipturn', 'icespinner', 'tailglow', 'takehearts']);
		newMoves('pidgey', ['dualwingbeat', 'soaringassault']);
		newMoves('piloswine', ['headlongrush']);
		newMoves('piplup', ['aquacutter', 'bubblejet', 'chillingwater', 'flipturn', 'icespinner', 'snowscape']);
		newMoves('quaxly', ['bubblejet']);
		newMoves('raikou', ['doubleshock']);
		newMoves('ralts', ['fairdeal']);
		newMoves('riolu', ['backupcall']);
		newMoves('roggenrola', ['glassshimmer']);
		newMoves('sableye', ['postponerage']);
		newMoves('sandygast', ['postponerage']);
		newMoves('scyther', ['soaringassault']);
		newMoves('seedot', ['trailblaze']);
		newMoves('sewaddle', ['pounce', 'quiverdance', 'skittersmack', 'trailblaze']);
		newMoves('shaymin', ['soaringassault', 'trailblaze']);
		newMoves('shellos', ['bubblejet']);
		newMoves('shelmet', ['pounce', 'trailblaze']);
		newMoves('sigilyph', ['luminacrash', 'soaringassault']);
		newMoves('sinistea', ['postponerage']);
		newMoves('skeledirge', ['postponerage']);
		newMoves('slowpoke', ['bubblejet']);
		newMoves('slowpokegalar', ['bubblejet']);
		newMoves('solrock', ['glassshimmer', 'luminacrash', 'morningsun']);
		newMoves('spiritomb', ['postponerage']);
		newMoves('spritzee', ['fairdeal']);
		newMoves('steenee', ['backupcall', 'fairdeal']);
		newMoves('stufful', ['backupcall']);
		newMoves('stunky', ['postponerage']);
		newMoves('suicune', ['aquacutter', 'bubblejet', 'chillingwater']);
		newMoves('swinub', ['icespinner', 'snowscape']);
		newMoves('tandemaus', ['happyliving']);
		newMoves('tauros', ['backupcall', 'hornleech']);
		newMoves('taurospaldeaaqua', ['backupcall', 'hornleech', 'bubblejet']);
		newMoves('taurospaldeablaze', ['backupcall', 'hornleech', 'burningjealousy']);
		newMoves('taurospaldeacombat', ['backupcall', 'hornleech']);
		newMoves('tentacool', ['aquacutter', 'bubblejet', 'chillingwater', 'mortalspin']);
		newMoves('timburr', ['backupcall']);
		newMoves('tinglu', ['postponerage']);
		newMoves('tinkatink', ['steelbullets']);
		newMoves('torterra', ['headlongrush']);
		newMoves('trapinch', ['pounce', 'trailblaze']);
		newMoves('tropius', ['soaringassault']);
		newMoves('turtwig', ['branchpoke', 'trailblaze']);
		newMoves('tyranitar', ['postponerage']);
		newMoves('tyrogue', ['backupcall']);
		newMoves('unown', ['cosmicpower', 'recover', 'storedpower']);
		newMoves('vanillite', ['icespinner', 'snowscape']);
		newMoves('vaporeon', ['bubblejet']);
		newMoves('varoom', ['blazingtorque', 'combattorque', 'magicaltorque', 'noxioustorque', 'steelbullets', 'wickedtorque']);
		newMoves('veluza', ['bubblejet']);
		newMoves('venipede', ['mortalspin', 'pounce']);
		newMoves('volcarona', ['soaringassault']);
		newMoves('vullaby', ['soaringassault']);
		newMoves('vulpixalola', ['icespinner', 'snowscape']);
		newMoves('wochien', ['postponerage']);
		newMoves('wooper', ['bubblejet']);
		newMoves('wooperpaldea', ['bubblejet']);
		newMoves('xerneas', ['fairdeal']);
		newMoves('yamask', ['postponerage']);
		newMoves('yamaskgalar', ['postponerage']);
		newMoves('yanma', ['dualwingbeat', 'pounce', 'skittersmack', 'soaringassault']);
		newMoves('yveltal', ['comeuppance', 'postponerage', 'soaringassault']);
		newMoves('zubat', ['soaringassault']);
		newMoves('zygarde', ['spikes', 'stealthrock']);
		
		
		this.modData('Learnsets', 'lugia').learnset.psychicfangs = ['9S12'];
		this.modData('Learnsets', 'lugia').learnset.aeroblast = ['9S12'];
		this.modData('Learnsets', 'lugia').learnset.bravebird = ['9S12'];
		this.modData('Learnsets', 'lugia').learnset.dragondance = ['9S12'];
		
		this.modData('Learnsets', 'hooh').learnset.sacredfire = ['9S11'];
		this.modData('Learnsets', 'hooh').learnset.hurricane = ['9S11'];
		this.modData('Learnsets', 'hooh').learnset.sunnyday = ['9S11'];
		this.modData('Learnsets', 'hooh').learnset.revivalblessing = ['9S11'];
	},*/
	
	hitStepInvulnerabilityEvent(targets, pokemon, move) {
		if (move.id === 'helpinghand' || (this.gen >= 6 && (move.id === 'toxic' || move.id === 'poisongas') && pokemon.hasType('Poison')) 
			|| (this.gen >= 6 && move.id === 'thunderwave' && pokemon.hasType('Electric')) 
			|| (this.gen >= 6 && move.id === 'willowisp' && pokemon.hasType('Fire'))
			|| (this.gen >= 6 && move.flags['powder'] && pokemon.hasType('Grass')) ) {
			return new Array(targets.length).fill(true);
		}
		const hitResults = this.runEvent('Invulnerability', targets, pokemon, move);
		for (const [i, target] of targets.entries()) {
			if (hitResults[i] === false) {
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					if (!move.spreadHit) this.attrLastMove('[miss]');
					this.add('-miss', pokemon, target);
				}
			}
		}
		return hitResults;
	},
};