export const Conditions = {
	par: {
		name: 'par',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'par', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'par');
			}
		},
		onModifySpe(spe, pokemon) {
			if (!pokemon.hasAbility('quickfeet')) {
				return this.chainModify(0.5);
			}
		},
		onBeforeMovePriority: 1,
		onBeforeMove(pokemon, target, move) {
            if(move.id === 'twist') return;
			if (this.randomChance(1, 4)) {
				this.add('cant', pokemon, 'par');
				return false;
			}
		},
	},
	slp: {
		name: 'slp',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'slp', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else if (sourceEffect && sourceEffect.effectType === 'Move') {
				this.add('-status', target, 'slp', '[from] move: ' + sourceEffect.name);
			} else {
				this.add('-status', target, 'slp');
			}
			// 1-3 turns
			this.effectData.startTime = this.random(2, 5);
			this.effectData.time = this.effectData.startTime;
		},
		onBeforeMovePriority: 10,
		onBeforeMove(pokemon, target, move) {
            if(move.id === 'twist') return;
			if (pokemon.hasAbility('earlybird')) {
				pokemon.statusData.time--;
			}
			pokemon.statusData.time--;
			if (pokemon.statusData.time <= 0) {
				pokemon.cureStatus();
				return;
			}
			this.add('cant', pokemon, 'slp');
			if (move.sleepUsable) {
				return;
			}
			return false;
		},
	},
	frz: {
		name: 'frz',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'frz', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'frz');
			}
			if (target.species.name === 'Shaymin-Sky' && target.baseSpecies.baseSpecies === 'Shaymin') {
				target.formeChange('Shaymin', this.effect, true);
			}
		},
		onBeforeMovePriority: 10,
		onBeforeMove(pokemon, target, move) {
            if(move.id === 'twist') return;
			if (move.flags['defrost']) return;
			if (this.randomChance(1, 5)) {
				pokemon.cureStatus();
				return;
			}
			this.add('cant', pokemon, 'frz');
			return false;
		},
		onModifyMove(move, pokemon) {
			if (move.flags['defrost']) {
				this.add('-curestatus', pokemon, 'frz', '[from] move: ' + move);
				pokemon.setStatus('');
			}
		},
		onHit(target, source, move) {
			if (move.thawsTarget || move.type === 'Fire' && move.category !== 'Status') {
				target.cureStatus();
			}
		},
    },
	confusion: {
		name: 'confusion',
		// this is a volatile status
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.id === 'lockedmove') {
				this.add('-start', target, 'confusion', '[fatigue]');
			} else {
				this.add('-start', target, 'confusion');
			}
			this.effectData.time = this.random(2, 6);
		},
		onEnd(target) {
			this.add('-end', target, 'confusion');
		},
		onBeforeMovePriority: 3,
		onBeforeMove(pokemon, target, move) {
            if(move.id === 'twist') return;
			pokemon.volatiles.confusion.time--;
			if (!pokemon.volatiles.confusion.time) {
				pokemon.removeVolatile('confusion');
				return;
			}
			this.add('-activate', pokemon, 'confusion');
			if (!this.randomChance(1, 3)) {
				return;
			}
			this.activeTarget = pokemon;
			const damage = this.getDamage(pokemon, pokemon, 40);
			if (typeof damage !== 'number') throw new Error("Confusion damage not dealt");
			const activeMove = {id: toID('confused'), effectType: 'Move', type: '???'};
			this.damage(damage, pokemon, pokemon, activeMove as ActiveMove);
			return false;
		},
	},
	choicelock: {
		name: 'choicelock',
		id: 'choicelock',
		num: 0,
		noCopy: true,
		onStart(pokemon) {
			if (!this.activeMove) throw new Error("Battle.activeMove is null");
			if (!this.activeMove.id || this.activeMove.hasBounced) return false;
			this.effectData.move = this.activeMove.id;
		},
		onBeforeMove(pokemon, target, move) {
			if(move.id === 'twist') return;
			if (!pokemon.getItem().isChoice) {
				pokemon.removeVolatile('choicelock');
				return;
			}
			if (!pokemon.ignoringItem() && !pokemon.volatiles['dynamax'] && move.id !== this.effectData.move && move.id !== 'struggle') {
				// Fails unless the Choice item is being ignored, and no PP is lost
				this.addMove('move', pokemon, move.name);
				this.attrLastMove('[still]');
				this.debug("Disabled by Choice item lock");
				this.add('-fail', pokemon);
				return false;
			}
		},
		onDisableMove(pokemon) {
			if (!pokemon.getItem().isChoice || !pokemon.hasMove(this.effectData.move)) {
				pokemon.removeVolatile('choicelock');
				return;
			}
			if (pokemon.ignoringItem() || pokemon.volatiles['dynamax']) {
				return;
			}
			for (const moveSlot of pokemon.moveSlots) {
				if (moveSlot.id !== this.effectData.move) {
					pokemon.disableMove(moveSlot.id, false, this.effectData.sourceEffect);
				}
			}
		},
	},
	flinch: {
		name: 'flinch',
		duration: 1,
		onBeforeMovePriority: 8,
		onBeforeMove(pokemon, target, move) {
            if(move.id === 'twist') return;
			this.add('cant', pokemon, 'flinch');
			this.runEvent('Flinch', pokemon);
			return false;
		},
	},
	trapped: {
		name: 'trapped',
		noCopy: true,
		onTrapPokemon(pokemon) {
			pokemon.tryTrap();
		},
		onStart(target) {
			let tw = target.moveSlots[target.moveSlots.length - 1];
			if(tw.id === 'twist'){
				tw.disabled = true;
				tw.disabledSource = 'trapped';
			}
			this.add('-activate', target, 'trapped');
		},
	},
	partiallytrapped: {
		name: 'partiallytrapped',
		duration: 5,
		durationCallback(target, source) {
			if (source?.hasItem('gripclaw')) return 8;
			return this.random(5, 7);
		},
		onStart(pokemon, source) {
			let tw = pokemon.moveSlots[pokemon.moveSlots.length - 1];
			if(tw.id === 'twist'){
				tw.disabled = true;
				tw.disabledSource = 'partiallytrapped';
			}
			this.add('-activate', pokemon, 'move: ' + this.effectData.sourceEffect, '[of] ' + source);
		},
		onResidualOrder: 11,
		onResidual(pokemon) {
			const source = this.effectData.source;
			if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns)) {
				// G-Max Centiferno and G-Max Sandblast continue even after the user leaves the field
				if (['gmaxcentiferno', 'gmaxsandblast'].includes(this.effectData.sourceEffect.id)) return;
				delete pokemon.volatiles['partiallytrapped'];
				this.add('-end', pokemon, this.effectData.sourceEffect, '[partiallytrapped]', '[silent]');
				return;
			}
			if (source.hasItem('bindingband')) {
				this.damage(pokemon.baseMaxhp / 6);
			} else {
				this.damage(pokemon.baseMaxhp / 8);
			}
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, this.effectData.sourceEffect, '[partiallytrapped]');
		},
		onTrapPokemon(pokemon) {
			if (this.effectData.source && this.effectData.source.isActive) pokemon.tryTrap();
		},
	},
	mustrecharge: {
		name: 'mustrecharge',
		duration: 2,
		onBeforeMovePriority: 11,
		onBeforeMove(pokemon, target, move) {
			if(move.id === 'twist') return;
			this.add('cant', pokemon, 'recharge');
			pokemon.removeVolatile('mustrecharge');
			pokemon.removeVolatile('truant');
			return null;
		},
		onStart(pokemon) {
			this.add('-mustrecharge', pokemon);
		},
		onLockMove: 'recharge',
	},
    twisted: {
        onStart(pokemon) {
			const hasTwist = ["Sudowoodo"];
            const side = pokemon.side;
            const twistlr = pokemon.canMegaEvo;
            var twistedSpecies, twistTyping = null, t;
			if(hasTwist.includes(pokemon.baseSpecies.name)){
				twistedSpecies = this.dex.getTemplate(pokemon.baseSpecies.name + "-" + twistlr + "T");
				pokemon.formeChange(twistedSpecies, this.effect, false, pokemon.name + 'twisted ' + twistlr);
			}
			else{
				twistedSpecies = this.dex.deepClone(pokemon.species);
				if (pokemon.types.length === 1 && pokemon.types[0] !== '???')
					twistedSpecies.types = [ getTwistedType(pokemon.types[0], twistlr as string ) ];
				else {
					twistTyping = [ getTwistedType(pokemon.types[0], twistlr as string ), getTwistedType( pokemon.types[1], twistlr as string) ];
					if(twistTyping[0] === twistTyping[1]) twistedSpecies.types = [ twistTyping[0] ];
					else twistedSpecies.types = twistTyping;
				}
				pokemon.canMegaEvo = null;
				for(const ally of side.pokemon) ally.canMegaEvo = null;
				pokemon.moveSlots.pop();
				pokemon.formeChange(twistedSpecies, this.effect, false, pokemon.name + 'twisted ' + twistlr);
			}
			this.add('-start', pokemon, twistlr + '-Twist', '[silent]');
            this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		},
        onModifyTypePriority: 2,
		onModifyType(move, pokemon) {
            let t = pokemon.baseSpecies.types.indexOf(move.type);
			if (t >= 0 && move.category !== 'Status' && pokemon.volatiles['twisted']) {
                move.type = (pokemon.types.length === 1) ? pokemon.types[0] : pokemon.types[t];
            }
		},
        onSwitchOut(pokemon) {
            pokemon.removeVolatile('twisted');
        },
        onEnd(pokemon) {
            var twistName;
			const move = this.dex.getMove('twist');
			const twistMove = {
				move: move.name,
				id: move.id,
				pp: 1,
				maxpp: 1,
				target: move.target,
				disabled: false,
				used: false
            };
            
            pokemon.moveSlots.push(twistMove);
            pokemon.canMegaEvo = null;
            this.add('-end', pokemon, 'Twist');
            this.add('-start', pokemon, 'typechange', pokemon.baseSpecies.types.join('/'), '[silent]');
            pokemon.formeChange(pokemon.baseSpecies);
        },
    },
};

function getTwistedType(type, lr){
	const TwistedType = {
		Grass: { L: 'Rock', R: 'Electric', prefix: 'Sprouting' },
		Fire: { L: 'Grass', R: 'Fighting', prefix: 'Blazing' },
		Water: { L: 'Fire', R: 'Poison', prefix: 'Soaking' },
		Electric: { L: 'Flying', R: 'Ice', prefix: 'Sparkling' },
		Psychic: { L: 'Dark', R: 'Bug', prefix: 'Mesmerizing' },
		Ice: { L: 'Psychic', R: 'Electric', prefix: 'Freezing' },
		Dragon: { L: 'Fairy', R: 'Fire', prefix: 'Roaring' },
		Dark: { L: 'Ghost', R: 'Fairy', prefix: 'Obscuring' },
		Fairy: { L: 'Water', R: 'Ground', prefix: 'Twinkling' },
		Normal: { L: 'Poison', R: 'Ghost', prefix: 'Stomping' },
		Fighting: { L: 'Steel', R: 'Dark', prefix: 'Blasting' },
		Flying: { L: 'Rock', R: 'Ground', prefix: 'Swirling' },
		Poison: { L: 'Bug', R: 'Grass', prefix: 'Polluting' },
		Ground: { L: 'Fighting', R: 'Ice', prefix: 'Desolating' },
		Rock: { L: 'Dragon', R: 'Steel', prefix: 'Crumbling' },
		Bug: { L: 'Water', R: 'Psychic', prefix: 'Infesting' },
		Ghost: { L: 'Normal', R: 'Flying', prefix: 'Terrifying' },
		Steel: { L: 'Dragon', R: 'Normal', prefix: 'Piercing' }
	}; return TwistedType[type][lr];

}