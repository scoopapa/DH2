export const Abilities: {[k: string]: ModdedAbilityData} = {
	/*
	placeholder: {
		//tbd
		flags: {},
		name: "",
		shortDesc: "",
	},
	*/
	incompletearbiter: {
		onAllyDamage(damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				if (effect.effectType === 'Ability') this.add('-activate', source, 'ability: ' + effect.name);
				this.add('-message', `Incomplete Arbiter protected ${target.name}`);
				return this.chainModify(0.5)
			}
		},
		flags: {},
		name: "Incomplete Arbiter",
		shortDesc: "Allies receive half indirect damage",
	},
	adoration: {
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('erd', target);
				}
			}
		},
		flags: {},
		name: "Adoration",
		shortDesc: "30% chance anyone making contact with the user is Eroded",
	},
	returningbloodlust: {
		//hp setting in rulesets.ts
		onSourceDamagingHit (damage,target,source,move) {
			if (this.checkMoveMakesContact(move,source,target)){
				source.heal(Math.floor(damage/4));
			}
		},
		flags: {},
		name: "Returning Bloodlust",
		shortDesc: "Start the battle at 50% hp, contact moves heal for 1/4 of damage dealt",
	},
	attentionandfocus: {
		onModifyMove(move) {
			move.flags.overrideOffensiveStatdef = 1
		},
		flags: {},
		name: "Attention and Focus",
		shortDesc: "All of the user's moves use the user's defense stat to calculate damage",
	},
	malice: {
		onResidualOrder:9,
		onResidual(pokemon) {
			if (pokemon.hp === 1) {
				var maliceDamage = 0.25;
			} else {
				let hpPercent = (pokemon.hp/pokemon.baseMaxhp);
				if (hpPercent > 0.75) {
					return
				} else if (hpPercent < 0.75 && hpPercent > 0.5) {
					var maliceDamage = 0.833;
				} else if (hpPercent < 0.5 && hpPercent > 0.25) {
					var maliceDamage = 0.125;
				} else {
					var maliceDamage = 0.333;
				}
			}
			for (const target of pokemon.foes()) {
				this.damage (target.baseMaxHp * maliceDamage, target, pokemon);
			}
		},
		flags: {},
		name: "Malice",
		shortDesc: "At end of turn, opponents lose health based on the user's current HP",
	},
	nix: {
		onStart(pokemon) {
			const magicalGirl = pokemon.side.pokemon.filter(p => p != pokemon && p.baseSpecies.magicalGirl);
			if (magicalGirl.length === 4) {
				this.add('-activate', pokemon, 'ability: Nix');
				this.boost({atk: 1, def: 1, spa: 1, spd:1, spe:1}, pokemon, pokemon);
				this.add('-start', pokemon, 'typeadd', 'Ghost', '[from] ability: Nix');
			}
		},
		flags: {},
		name: "Nix",
		shortDesc: "If all four Magical Girls are transformed, gain +1 to all stats and Ghost typing",
	}, 
	thestrongest: {
		onModifyMovePriority(target, source, move) {
			if (move.moveSlot === 3) {
				return this.priority + 1;
			}
		},
		onModifyMove (move) {
			if (move.moveSlot === 3 && move.category != status) {
				if (move.basePower > 50) {
					move.basePower = 50;
				}
			}
		},
		flags: {},
		name: "The Strongest",
		shortDesc: "The move in the user's 4th moveslot has +1 priority, but has its BP capped at 50",
	},
	willofthecity: {
		onAnyDamage (damage, target, effect) {
			if (!target.isAlly(this) && effect.effectType !== 'Move' && effect.effectType !== 'sideCondition') {
				this.heal(damage);
			}
		},
		flags: {},
		name: "Will Of The City",
		shortDesc: "Heal HP equal to the amount of non-hazard indirect damage dealt to opponents",
	},
	surprisegift: {
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('surprisegift', target);
				}
			}
		},
		flags: {},
		name: "Surprise Gift",
		shortDesc: "30% chance anyone making contact with the user will take 1/8th of their max HP and be Bled if switching out while the User is active",
	},
	courage: {
		onModifyAtk(atk, pokemon) {
			allies = pokemon.side.pokemon.filter(ally => ally === pokemon || !ally.fainted);
			return this.chainModify(1 + (0.1 * (allies.length - 2)));
		},
		onModifyDef(def, pokemon) {
			allies = pokemon.side.pokemon.filter(ally => ally === pokemon || !ally.fainted);
			return this.chainModify(1 + (0.1 * (allies.length - 2)));
		},
		flags: {},
		name: "Courage",
		shortDesc: "The user's attack and defense are multiplied by (1 + (0.1 * # of living allies - 2)",
	},
	separatingminds: {
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'phillipchild'|| pokemon.transformed) return;
			if (pokemon.hp > pokemon.maxhp / 4) {
				if (pokemon.species.id === 'phillipchild') {
					pokemon.formeChange('phillipangel');
				}
			} else {
				if (pokemon.species.id === 'phillipangel') {
					pokemon.formeChange('phillipchild');
				}
			}
		},
		onResidualOrder: 29,
		onResidual(pokemon) {
			if (
				pokemon.baseSpecies.baseSpecies !== 'phillipchild' || pokemon.transformed || !pokemon.hp) return;
			if (pokemon.hp > pokemon.maxhp / 4) {
				if (pokemon.species.id === 'phillipchild') {
					pokemon.formeChange('phillipangel');
				}
			} else {
				if (pokemon.species.id === 'phillipangel') {
					pokemon.formeChange('phillipchild');
				}
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Separating Minds",
		shortDesc: "If User is Phillip-Child, changes to Angel form if HP > 1/4, else Child form."
	},
	sharkskin: {
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0 && !target.status) {
				this.debug('Sharkskin trigger');
				return this.chainModify(0.66);
			}
		},
		flags: {},
		name: "Sharkskin",
		shortDesc: "The User takes 1/3 less damage from Super-Effective hits if unstatused",
	},
	puffybrume: {
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				let success = false;
				let i: BoostID;
				for (i in target.boosts) {
				if (target.boosts[i] === 0) continue;
				target.boosts[i] = -target.boosts[i];
				success = true;
			}
			if (!success) return false;
			this.add('-invertboost', target, '[from] ability: Puffy Brume');
			}
		},
		flags: {},
		name: "Puffy Brume",
		shortDesc: "Opponents who contact the User have their stat stage changes inverted",
	},
	triarchy: {
		onStart(pokemon) {
			pokemon.triarchy = false;
			const triarchySlot = 0;
		},
		onResidual(pokemon) {
			pokemon.triarchy = false;
		},
		onAfterMoveSecondary(target, source, move) {
			if (move.flags['Sound']) {
				if (!source.triarchy) {
					triarchySelected = pokemon.moveSlots[triarchySlot]
					if (triarchySelected.flags['Sound']) {
					source.triarchy = true;
					this.actions.useMove(triarchySelected, source);
					}
					triarchySlot++
					if (triarchySlot > 2) {
						triarchySlot = 0
					}
				}
			}
		},
		onSourceModifyDamage(move, target, pokemon) {
			if (pokemon.triarchy) {
				return this.chainModify(0.2);
			}
		},
		flags: {},
		name: "Triarchy",
		shortDesc: "After using a damaging move, perform a follow-up attack with the sound move in your first moveslot at 0.2x power. Slot increases by one each trigger and resets back to one after the third.",
	},
	showtime: {
		onStart(pokemon) {
			const nextMove = this.dex.moves.get(pokemon.opponent.lastMove);
			if (move.flags['nocopycat']) {
				return
			}
			const copiedMove = {
				move: nextMove.name,
				id: nextMove.id,
				pp: 5,
				maxpp: 5,
				target: nextMove.target,
				disabled: false,
				used: false,
				virtual: true,
			};
			pokemon.moveSlots[4] = copiedMove;
			pokemon.baseMoveSlots[4] = copiedMove;
		},
		onResidualOrder:30,
		onResidual(pokemon) {
			const nextMove = this.dex.moves.get(pokemon.opponent.lastMove);
			if (move.flags['nocopycat']) {
				return
			}
			const endCopiedMove = {
				move: nextMove.name,
				id: nextMove.id,
				pp: pokemon.moveSlots[4].pp,
				maxpp: 5,
				target: nextMove.target,
				disabled: false,
				used: false,
				virtual: true,
			};
			pokemon.moveSlots[4] = endCopiedMove;
			pokemon.baseMoveSlots[4] = endCopiedMove;
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Showtime~",
		shortDesc: "The user gains a 5th moveslot that is a copy of whatever move was last used by the adjacent opponent",
	},
	puppeteer: {
		onFoeAfterBoost(boost, target, source, effect) {
			const pokemon = this.effectState.target;
			if (source != pokemon) return;
			for (i in boost) {
				if (boost[i]! < 0) {
					negativeBoosts[i] = boost[i];
				}
			}
			if (Object.keys(negativeBoosts).length < 1) return;
			this.boost({spe: Object.keys(negativeBoosts).length}, pokemon.allies);
		},
		flags: {},
		name: "Puppeteer",
		shortDesc: "Lowering an enemy's stats raises the speed of an ally",
	},
	entangledstrings: {
		onStart (pokemon) {
			this.addVolatile('entangledstrings')
		},
		onAllySwitchIn (ally) {
			ally.addVolatile('entangledstrings')
		},
		onSwitchOut (pokemon) {
			for (target in pokemon.allySide){
				target.removeVolatile('entangledstrings')
			}
		},
		condition:{
			name: 'Entangled Strings',
			onModifyCritRatio (pokemon) {
				return critRatio +1;
			},
			onCriticalHit: false,
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Entangled Strings');
			},
		},
		flags: {},
		name: "Entangled Strings",
		shortDesc: "Allies gain +1 Critical Hit Rate and cannot be critically hit",
	},
	stygianshade: {
		onSwitchIn(source) {
			const target = source.side.foe.active[source.side.foe.active.length - 1 - source.position];
			if (target && source.speciesid === 'distortedplutoshade') {
				for (let i = 0; i < Math.min(target.moveSlots.length, 4); i ++) {
					const moveSlot = target.moveSlots[i];
					if (source.moveSlots.filter(m => m.id === moveSlot.id).length) continue;
					if (moveSlot === null) break;
					this.attrLastMove('[still]');
					if (source.moveSlots.length < 0) return;
					const learnedMove = {
						move: this.dex.moves.get(moveSlot.id),
						id: moveSlot.id,
						pp: 5,
						maxpp: 5,
						target: moveSlot.target,
						disabled: false,
						used: false,
					};
					source.moveSlots[source.moveSlots.length] = learnedMove;
				}
			}
		},
		onStart(pokemon){
			if (pokemon.speciesid === 'distortedplutoshade') {
				let i: BoostID;
			for (i in pokemon.opponent.boosts) {
				pokemon.boosts[i] = pokemon.opponent.boosts[i];
			}
			const volatilesToCopy = ['dragoncheer', 'focusenergy', 'gmaxchistrike', 'laserfocus'];
			for (const volatile of volatilesToCopy) {
				if (pokemon.opponent.volatiles[volatile]) {
					pokemon.addVolatile(volatile);
					if (volatile === 'gmaxchistrike') pokemon.volatiles[volatile].layers = pokemon.opponent.volatiles[volatile].layers;
					if (volatile === 'dragoncheer') pokemon.volatiles[volatile].hasDragonType = pokemon.opponent.volatiles[volatile].hasDragonType;
				} else {
					pokemon.removeVolatile(volatile);
				}
			}
			this.add('-copyboost', source, target, '[from] ability: Stygian Shade');
			}

		},
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (effect?.effectType === 'Move' && pokemon.speciesid === 'distortedplutoshade') {
				this.add('-activate', target, 'ability: Disguise');
				this.effectState.busted = true;
				return 0;
			}
		},
		onCriticalHit(target, source, move) {
			if (!target) return;
			if (!pokemon.speciesid === 'distortedplutoshade') {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target || move.category === 'Status') return;
			if (!pokemon.speciesid === 'distortedplutoshade') {
				return;
			}

			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (pokemon.speciesid === 'distortedplutoshade' && this.effectState.busted) {
				pokemon.formeChange(distortedpluto, this.effect, true);
				this.damage(pokemon.baseMaxhp / 8, pokemon, pokemon, this.dex.species.get(speciesid));
				pokemon.clearBoosts();
				pokemon.moveSlots.splice(pokemon.baseMoveSlots.length, pokemon.moveSlots.length - pokemon.baseMoveSlots.length);
			}
		},
		flags: {
			failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1,
			breakable: 1, notransform: 1,
		},
		name: "Stygian Shade",
		shortDesc: "The first hit taken is blocked by a Shade of the opponent",
	},
	bloodfiendish: {
		onSourceDamagingHit (damage,target,source,move) {
			if (!move.flags('drain')){
				source.heal(Math.floor(damage/4));
			}
		},
		onSourceModifyDamage(pokemon, target, move) {
			if (move.flags('drain') && source.hp == source.baseMaxHp){
				return this.chainModify(1.3)
			}
		},
		flags: {},
		name: "Bloodfiendish",
		shortDesc: "Non-draining moves heal the user equal to 25% of the damage dealt, while at full hp Draining moves deal 1.3x Damage",
	},
	resonance: {
		onModifyMove(source, target, move){
			if (move.flag('Slicing')){
				move.flags.sound = 1
				move.flags.bypasssub = 1
			}
		},
		onModifyDamage (source,target,move){
			if (move.flag('sound') && (target.newlySwitched || this.queue.willMove(target))) {
				return this.chainModify(1.3)
			}
		},
		flags: {},
		name: "Resonance",
		shortDesc: "Slicing moves gain the Sound Flag and Bypass Substitute, Sound Moves deal 1.3x damage if moving before the target",
	},
	theconductor: {
		onModifyMove(source, target, move){
			if (move.flag('Slicing')){
				move.flags.sound = 1
				move.flags.bypasssub = 1
			}
		},
		onModifyDamage (source,target,move){
			if (move.flag('sound') && (target.newlySwitched || this.queue.willMove(target))) {
				return this.chainModify(1.3)
			}
		},
		onFoeTryMove(target, source, move) {
			const targetAllExceptions = ['perishsong', 'flowershield', 'rototiller'];
			if (move.target === 'foeSide' || (move.target === 'all' && !targetAllExceptions.includes(move.id))) {
				return;
			}

			const dazzlingHolder = this.effectState.target;
			if ((source.isAlly(dazzlingHolder) || move.target === 'all') && move.priority > 0.1) {
				this.attrLastMove('[still]');
				this.add('cant', dazzlingHolder, 'ability: The Conductor', move, '[of] ' + target);
				return false;
			}
		},
		flags: {},
		name: "The Conductor",
		shortDesc: "Combination of the Dazzling and Resonance abilities",
	},
	vroomvroom: {
		onAfterMoveSecondarySelf(pokemon) {
			if (!pokemon.boosts.spe > 0) {
				this.boost({spe: 1});
			}
		},
		flags: {},
		name: "Vroom-Vroom",
		shortDesc: "After dealing damage with a move, if the User's is at less than +1 speed, gain +1 speed",
	},
	bigbrotherofthemiddle: {
		onFractionalPriority: -0.1,
		onStart (pokemon) {
			pokemon.hitThisTurn = 0;
		},
		onSourceDamagingHit (pokemon, source) {
			if (source.effectType === 'Move') {
				pokemon.hitThisTurn = 1
			}
		},
		onModifyDamage (pokemon) {
			if (pokemon.hitThisTurn === 1) {
				return this.chainModify(1+(pokemon.side.totalFainted * 0.1));
			}
		},
		onResidualOrder: 30,
		onResidual (pokemon) {
			pokemon.hitThisTurn = 0;
		},
		flags: {},
		name: "Big Brother of The Middle",
		shortDesc: "The user's moves move last in their priority bracket, if the user is damaged by an opponent, their offensive moves gain 0.1x power for each fainted ally until the end of turn",
	},
	shatteredmirror: {
		onAfterMoveSecondarySelf(pokemon, move) {
			if ((pokemon.baseSpeciesName == 'yisang' || pokemon.baseSpeciesName == 'sangyi') && (move.id == mirrosgaze) ){
				pokemon.heal(Math.floor (pokemon.baseMaxHp / 4)) ;
			}
		},
		flags: {},
		name: "Shattered Mirror",
		shortDesc: "Yi Sang/ Sang Yi: After changing forms, heal 1/4th Max HP",
	},
	hardblood: {
		onAfterMoveSecondary(user,target,move) {
			if (move.flags['Biting']) {
				user.addVolatile('hardblood')
			}
		},
		volatileStatus: 'Hardblood',
		condition: {
			noCopy: true,
			onStart(target) {
				this.effectState.layers = 1;
				this.effectState.def = 0;
				this.effectState.spd = 0;
				this.add('-start', target, 'Hardblood' + this.effectState.layers);
				const [curDef, curSpD] = [target.boosts.def, target.boosts.spd];
				this.boost({def: 1, spd: 1}, target, target);
				if (curDef !== target.boosts.def) this.effectState.def--;
				if (curSpD !== target.boosts.spd) this.effectState.spd--;
			},
			onRestart(target) {
				if (this.effectState.layers >= 3) return false;
				this.effectState.layers++;
				this.add('-start', target, 'Hardblood' + this.effectState.layers);
				const curDef = target.boosts.def;
				const curSpD = target.boosts.spd;
				this.boost({def: 1, spd: 1}, target, target);
				if (curDef !== target.boosts.def) this.effectState.def--;
				if (curSpD !== target.boosts.spd) this.effectState.spd--;
			},
			onEnd(target) {
				if (this.effectState.def || this.effectState.spd) {
					const boosts: SparseBoostsTable = {};
					if (this.effectState.def) boosts.def = this.effectState.def;
					if (this.effectState.spd) boosts.spd = this.effectState.spd;
					this.boost(boosts, target, target);
				}
			},
		},
		flags: {},
		name: "Hardblood",
		shortDesc: "Dealing damage with a biting move gives the user one stack of Hardblood (Max. 3)",
	},
	immovable: {
		onTryAddVolatile (status, pokemon) {
			const lockingVolatiles = ['choicelock', 'encore', 'taunt', 'disable', 'healblock', 'torment']
			if (lockingVolatiles.includes(status.id)) {
				return null
			}
		},
		onModifyMovePriority: 1,
		onModifyMove(move) {
			// most of the implementation is in Battle#getTarget
			move.tracksTarget = move.target !== 'scripted';
		},
		flags: {},
		name: "Immovable",
		shortDesc: "The User's moves cannot be redirected, disabled, or locked.",
	},
	resentment: {
		onStart(pokemon) {
			pokemon.addVolatile('taunt');
		},
		onModifyAtk(pokemon){
			var lockedMoveNum = 0;
			for (move in pokemon.moveSlots) {
				if (move.disabled) {
					lockedMoveNum++
				}
			}
			return(1+(lockedMoveNum/6));
		},
		flags: {},
		name: "Resentment",
		shortDesc: "When switching in, taunt self for 3 turns. ATK increased by 1/6 for every move disabled by a volatile status condition",
	},
	protectingpests: {
		onAllyTryBoost(boost, target, source, effect) {
			if ((source && target === source) || !target.hasType('Bug')) return;
			let showMsg = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries) {
				const effectHolder = this.effectState.target;
				this.add('-block', target, 'ability: Protecting Pests', '[of] ' + effectHolder);
			}
		},
		onAllySetStatus(status, target, source, effect) {
			if (target.hasType('Bug') && source && target !== source && effect && effect.id !== 'yawn') {
				this.debug('interrupting setStatus with Flower Veil');
				if (effect.name === 'Synchronize' || (effect.effectType === 'Move' && !effect.secondaries)) {
					const effectHolder = this.effectState.target;
					this.add('-block', target, 'ability: Protecting Pests', '[of] ' + effectHolder);
				}
				return null;
			}
		},
		onAllyTryAddVolatile(status, target) {
			if (target.hasType('Bug') && status.id === 'yawn') {
				this.debug('Protecting Pests blocking yawn');
				const effectHolder = this.effectState.target;
				this.add('-block', target, 'ability: Protests', '[of] ' + effectHolder);
				return null;
			}
		},
		flags: {},
		name: "Protecting Pests",
		shortDesc: "This side's Bug Types can't have their stats lowered or have non-volatile statuses applied",
	},
	captainofthepequod: {
		onAfterMoveSecondaryPriority(target, user) {
			target.addVolatile('captainofthepequod')
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'ability: Captain of the Pequod');
			},
			onSourceModifyDamage(damage, source, target, move) {
				return this.chain(1.25)
			},
		},
		flags: {},
		name: "Captain Of The Pequod",
		shortDesc: "After the user damages an opponent with a move, they take 25% increased damage for the rest of the turn",
	},
	obsession: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				if (target.baseSpeciesName === 'ishmael') {
					this.boost({atk: 1}, source);
					this.boost({spa: 1}, source);
					this.boost({def: 1}, source);
					this.boost({spd: 1}, source);
					this.boost({spe: 1}, source);
				} else {
					this.boost({atk: 1}, source);
					this.boost({spa: 1}, source);
				}
			}
		},
		flags: {},
		name: "Obsession",
		shortDesc: "When the user knocks out an opponent, raise attack and special attack by one. If Ishmael was knocked out in this way, raise all stats by one instead",
	},
	cultivate: {
		onAfterMoveSecondary (pokemon, target, move) {
			if (move.flags['slicing']){
				target.addVolatile('cultivate');
			}
		},
		condition: {
			name: 'Seeds',
			onDamagingHit (target, move) {
				if (move.type = ['Grass']) {
					this.add('-start', target, 'move: Leech Seed');
					this.addVolatile('leechseed');
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Seeds');
			}
		},
		flags: {},
		name: "Cultivate",
		shortDesc: "After dealing damage with a Slicing move, apply Seeds (Seeds: When Hit with a Grass Type move, gain the Leech Seed effect)",
	},
	hysteria: {
		onResidualOrder: 29,
		onResidual(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'magicalgirloflove' || pokemon.transformed || !pokemon.hp) return;
			if (pokemon.species.id === 'thequeenofhatred' || pokemon.hp > pokemon.maxhp / 2) return;
			this.add('-activate', pokemon, 'ability: Hysteria');
			pokemon.formeChange('The Queen of Hatred', this.effect, true);
			pokemon.baseMaxhp = Math.floor(Math.floor(
				2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100
			) * pokemon.level / 100 + 10);
			const newMaxHP = pokemon.volatiles['dynamax'] ? (2 * pokemon.baseMaxhp) : pokemon.baseMaxhp;
			pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
			pokemon.maxhp = newMaxHP;
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
		},
		flags: {},
		name: "Hysteria",
		shortDesc: "If the User ends the turn at or below 50% HP, heal 50% hp and transform into The Queen of Hatred",
	},
	desire: {
		onResidualOrder: 29,
		onResidual(pokemon) {
			for (i in pokemon.boosts) {
				if (pokemon.boosts[i] > 1) continue;
				success = true;
			}
			if (!success) return;
			if (pokemon.baseSpecies.baseSpecies !== 'magicalgirlofhappiness' || pokemon.transformed || !pokemon.hp) return;
			if (pokemon.species.id === 'thekingofgreed') return;
			this.add('-activate', pokemon, 'ability: Desire');
			pokemon.formeChange('The Queen of Hatred', this.effect, true);
			pokemon.baseMaxhp = Math.floor(Math.floor(
				2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100
			) * pokemon.level / 100 + 10);
			const newMaxHP = pokemon.volatiles['dynamax'] ? (2 * pokemon.baseMaxhp) : pokemon.baseMaxhp;
			pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
			pokemon.maxhp = newMaxHP;
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
		},
		flags: {},
		name: "Desire",
		shortDesc: "If the User ends the turn with any stat at +2 or greater, heal 50% hp and transform into The King of Greed",
	},
	sorrow: {
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'magicalgirlofjustice' || pokemon.transformed || !pokemon.hp) return;
			if (pokemon.species.id === 'theknightofdespair' || !pokemon.side.pokemon[0].hp === 0) return;
			this.add('-activate', pokemon, 'ability: Sorrow');
			pokemon.formeChange('The Knight of Despair', this.effect, true);
			pokemon.baseMaxhp = Math.floor(Math.floor(
				2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100
			) * pokemon.level / 100 + 10);
			const newMaxHP = pokemon.volatiles['dynamax'] ? (2 * pokemon.baseMaxhp) : pokemon.baseMaxhp;
			pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
			pokemon.maxhp = newMaxHP;
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
		},
		onResidualOrder: 29,
		onResidual(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'magicalgirlofjustice' || pokemon.transformed || !pokemon.hp) return;
			if (pokemon.species.id === 'theknightofdespair' || !pokemon.side.pokemon[0].hp === 0) return;
			this.add('-activate', pokemon, 'ability: Sorrow');
			pokemon.formeChange('The Knight of Despair', this.effect, true);
			pokemon.baseMaxhp = Math.floor(Math.floor(
				2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100
			) * pokemon.level / 100 + 10);
			const newMaxHP = pokemon.volatiles['dynamax'] ? (2 * pokemon.baseMaxhp) : pokemon.baseMaxhp;
			pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
			pokemon.maxhp = newMaxHP;
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
		},
		flags: {},
		name: "Sorrow",
		shortDesc: "When switching in or at end of turn, if the first ally is fainted, heal 50% hp and transform into The Knight of Despair",
	},
	boilingrage: {
		onSourceAfterFaint (effect, target, pokemon, length) {
			if (effect && effect.effectType === 'Move') {
				this.add('-activate', pokemon, 'ability: Sorrow');
				pokemon.formeChange('The Knight of Despair', this.effect, true);
				pokemon.baseMaxhp = Math.floor(Math.floor(
					2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100
				) * pokemon.level / 100 + 10);
				const newMaxHP = pokemon.volatiles['dynamax'] ? (2 * pokemon.baseMaxhp) : pokemon.baseMaxhp;
				pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
				pokemon.maxhp = newMaxHP;
				this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
			}
		},
		flags: {},
		name: "Boiling Rage",
		shortDesc: "If the User attacks and knocks out a pokemon, heal 50% hp and transform into The Servant of Wrath",
		
	},
	switchingstances: {
		onModifyMovePriority: 1,
		onModifyMove(move, attacker, defender) {
			if (attacker.species.baseSpecies !== 'The Purple Tear' || attacker.transformed) return;
			if (move.category === 'Status' && move.id !== 'serpentsbarrier') return;
			const targetForme = (move.id === 'serpentsbarrier' ? 'thepurpletear' : 'thepurpletearslash');
			if (attacker.species.name !== targetForme) attacker.formeChange(targetForme);
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Switching Stances",
		shortDesc: "Purple Tear: Changes stance to Slash before attacks and Block before Serpent's Barrier",
	},
	bindingchains: {
		onBeforeMovePriority: 5,
		onBeforeMove(attacker, defender, move){
			if (move.moveSlot = attacker.buffedSlot) {
				attacker.addVolatile('bindingchains');
			}
		},
		condition :{
			duration: 1,
			onSourceModifyDamage(source, target){
				return this.chainModify(0.75);
			}
		},
		flags: {},
		name: "Binding Chains",
		shortDesc: "The user takes 33% less damage on turns they followed their prescript",
	},
	breakingpressure: {
		onBeforeMove(attacker, defender, move){
			if (move.moveSlot = attacker.buffedSlot) {
				attacker.addVolatile('breakingpressure');
			}
		},
		condition :{
			duration: 1,
			onModifyDamage(damage, source, target, move, typeMod) {
            if (typeMod = 2) {
                return this.chainModify(1.5);
         	   }
        	},
		},
		flags: {},
		name: "Breaking Pressure",
		shortDesc: "The user deals 50% more damage to resisted targets on turns they followed the prescript",
	},
	ragingtorrent: {
		onModifyDamage(source, target, move){
			if (source.prescriptCombo > 0) {
				return this.chainModify(1+source.prescriptCombo*0.1);
			}
		},
		flags: {},
		name: "ragingtorrent",
		shortDesc: "The user's moves deal +0.1x damage for each turn in a row you've followed the prescript",
	},
	shell: {
		onStart(pokemon) {
			if( pokemon.baseSpecies.baseSpecies === 'nothingtherebreaching'){
				this.add('-start', pokemon, 'typechange', pokemon.savedTypes, '[from] ability: Shell');
			}
		},
		onSourceAfterFaint (effect, target, pokemon, length) {
			if (effect && effect.effectType === 'Move') {
				if (pokemon.baseSpecies.baseSpecies !== 'nothingthere' || pokemon.transformed || !pokemon.hp) return;
				for (let i = 0; i < Math.min(target.moveSlots.length, 4); i ++) {
					const moveSlot = target.moveSlots[i];
					if (pokemon.moveSlots.filter(m => m.id === moveSlot.id).length) continue;
					if (moveSlot === null) break;
					this.attrLastMove('[still]');
					if (pokemon.moveSlots.length < 0) return;
					const learnedMove = {
						move: this.dex.moves.get(moveSlot.id),
						id: moveSlot.id,
						pp: 5,
						maxpp: 5,
						target: moveSlot.target,
						disabled: false,
						used: false,
					};
					pokemon.baseMoveSlots[pokemon.baseMoveSlots.length] = learnedMove;
				}
				pokemon.formeChange('nothingtherebreaching')
				const victimTypes = target.getTypes();
				pokemon.savedTypes = victimTypes.join('/');
				this.add('-start', pokemon, 'typechange', victimTypes.join('/'), '[from] ability: Shell');
			}
		},
		flags: {},
		name: "Shell",
		shortDesc: "When knocking out an opponent, transform into Nothing There-Breaching, gain the target's typing and copies of all their moves. All changes are permanent.",
	}
};
