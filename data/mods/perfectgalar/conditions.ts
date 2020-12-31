'use strict';

export const Conditions: {[k: string]: ConditionData} = {
	dynamax: {
		name: 'Dynamax',
		id: 'dynamax',
		num: 0,
		noCopy: true,
		duration: 3,
		onStart(pokemon) {
			pokemon.hasDynamaxed = true;
			pokemon.volatileTag = 'maxstatboost';
			pokemon.removeVolatile('substitute');
			if (pokemon.illusion) this.singleEvent('End', this.dex.getAbility('Illusion'), pokemon.abilityData, pokemon);
			this.add('-start', pokemon, 'Dynamax');
			this.doMaxBoostFormeChange( pokemon, false );
			if (pokemon.gigantamax){
				this.add('-formechange', pokemon, pokemon.gigantamax);
				pokemon.volatileTag = 'gmaxstatboost';
			}
			if (pokemon.species === 'Shedinja') return;

			// Changes based on dynamax level, 2 is max (at LVL 10)
			const ratio = 2;

			pokemon.maxhp = Math.floor(pokemon.maxhp * ratio);
			pokemon.hp = Math.floor(pokemon.hp * ratio);
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
			pokemon.addVolatile( pokemon.volatileTag );
		},
		onBeforeSwitchOut(pokemon) {
			pokemon.removeVolatile('dynamax');
		},
		onTryHit( target, source, move ){
			if ( move.isMax || move.isZOrMaxPowered ){
				let str = move.name + ' was used at ' + move.basePower + ' base power.';
				this.addSplit( source.side.id, [str])
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.id === 'dynamaxcannon') {
				return this.chainModify(2);
			}
		},
		onTrapPokemon(pokemon) {
			pokemon.trapped = true;
		},
		onDragOutPriority: 2,
		onDragOut(pokemon) {
			if( !pokemon.redCardWhileDynamax ){
				this.add('-block', pokemon, 'Dynamax');
				return null;
			}
			pokemon.removeVolatile('dynamax');
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, 'Dynamax');
			this.add('-formechange', pokemon, pokemon.species.baseSpecies);
			if ( pokemon.species.name !== 'Shedinja' ) {
				pokemon.hp = pokemon.getUndynamaxedHP();
				pokemon.maxhp = pokemon.baseMaxhp;
				this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
			}
			this.doMaxBoostFormeChange( pokemon, true );
			if ( pokemon.usedMindstorm ) {
				pokemon.addVolatile( 'mustrecharge' );
			}
			pokemon.trapped = false;
		},
	},
	maxstatboost: {
		name: 'Max Stat Boost',
		id: 'maxstatboost',
		num: 0,
		onStart(pokemon) {
			this.add('-start', pokemon, 'Max Stat Boost');
		},
		onSwitchOut(pokemon){
			pokemon.lastFormeBoosted = null;
		}
	},
	gmaxstatboost: {
		name: 'G-Max Stat Boost',
		id: 'gmaxstatboost',
		num: 0,
		onStart(pokemon) {
			this.add('-start', pokemon, 'G-Max Stat Boost');
		},
		onSwitchOut(pokemon){
			pokemon.lastFormeBoosted = null;
		}
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
			if ( this.dex.getMove( this.effectData.move ).isMax ){
				this.effectData.move = this.activeMove.baseMove;
			}
		},
		onBeforeMove(pokemon, target, move) {
			if (!pokemon.getItem().isChoice) {
				pokemon.removeVolatile('choicelock');
				return;
			}
			let maxID = this.toID( this.getMaxMove( this.effectData.move, pokemon ))
			if ( !pokemon.ignoringItem() 
				&& ( move.id !== this.effectData.move
					&& move.id !== maxID )
				&& move.id !== 'struggle' ) 
			{
				// Fails unless the Choice item is being ignored, and no PP is lost
				this.addMove('move', pokemon, move.name);
				this.attrLastMove('[still]');
				this.debug("Disabled by Choice item lock");
				this.add('-fail', pokemon);
				return false;
			}
		},
		onDisableMove(pokemon) {
			if (!pokemon.getItem().isChoice || !pokemon.hasMove(this.effectData.move)){
				pokemon.removeVolatile('choicelock');
				return;
			}
			if (pokemon.ignoringItem()) {
				return;
			}
			for (const moveSlot of pokemon.moveSlots) {
				if ( moveSlot.id !== this.effectData.move ){
					pokemon.disableMove(moveSlot.id, false, this.effectData.sourceEffect);
				}
			}
		},
	},
	smackdown: {
		noCopy: true,
		onStart(pokemon) {
			let applies = false;
			if (pokemon.hasType('Flying') || pokemon.hasAbility('levitate')) applies = true;
			if (pokemon.hasItem('ironball') || pokemon.volatiles['ingrain'] || this.field.getPseudoWeather('gravity')) applies = false;
			if (pokemon.removeVolatile('fly') || pokemon.removeVolatile('bounce')) {
				applies = true;
				this.queue.cancelMove(pokemon);
				pokemon.removeVolatile('twoturnmove');
			}
			if (pokemon.volatiles['magnetrise']) {
				applies = true;
				delete pokemon.volatiles['magnetrise'];
			}
			if (pokemon.volatiles['telekinesis']) {
				applies = true;
				delete pokemon.volatiles['telekinesis'];
			}
			if (!applies) return false;
			this.add('-start', pokemon, 'Smack Down');
		},
		onRestart(pokemon) {
			if (pokemon.removeVolatile('fly') || pokemon.removeVolatile('bounce')) {
				this.queue.cancelMove(pokemon);
				this.add('-start', pokemon, 'Smack Down');
			}
		},
		// groundedness implemented in battle.engine.js:BattlePokemon#isGrounded
	},
};
