export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	init(){ 
		// Automatically construct fusion learnsets! (Thank u scoopapa)
		for (const id in this.dataCache.Pokedex) {//check the dex for fusions
			const fusionEntry = this.dataCache.Pokedex[id];
			if (fusionEntry.fusion) {//if the pokedex entry has a fusion field, it's a fusion
				const learnsetFusionList = [];//list of pokemon whose learnsets need to be fused
				for (let name of fusionEntry.fusion) {
					let prevo = true;
					while (prevo) {//make sure prevos of both fused pokemon are added to the list
						learnsetFusionList.push(name);
						const dexEntry = this.dataCache.Pokedex[this.toID(name)];
						if (dexEntry.prevo) name = dexEntry.prevo;
						else prevo = false;
					}
				}
				if (!this.dataCache.Learnsets[id]) this.dataCache.Learnsets[id] = { learnset: {}};//create a blank learnset entry so we don't need a learnsets file
				for (let name of learnsetFusionList) {					
					const learnset = this.dataCache.Learnsets[this.toID(name)].learnset;//get the learnset of each pokemon in the list
					for (const moveid in learnset) {
						if (this.dex.getMove(moveid).isNonstandard === 'Past') continue; //exclude dexited moves (I hope!) 
						this.modData('Learnsets', id).learnset[moveid] = ['8L1'];//all moves are compatible with the fusion's only ability, so just set it to 8L1
					}
				}
			}
		}
		
		//Now, case-by-case learnset revisions: 
		//Behemoth Bash and Behemoth Blade are added automatically to the Crowned dogs somewhere,
		//so we will simulate that here, instead of actually editing that. 
		this.modData('Learnsets', 'yaciancrowned').learnset.behemothblade = ['7L1'];
		this.modData('Learnsets', 'igglyzentacrowned').learnset.behemothbash = ['7L1'];
		delete this.modData('Learnsets', 'yaciancrowned').learnset.ironhead;
		delete this.modData('Learnsets', 'igglyzentacrowned').learnset.ironhead;
	},
	
	teambuilderConfig: {
        // for micrometas to only show custom tiers
        excludeStandardTiers: true,
        // only to specify the order of custom tiers
        customTiers: ['FEUU', 'Silvino', 'FEUUber'],
	},
	
	canMegaEvo(pokemon) {
		const altForme = pokemon.baseSpecies.otherFormes && this.dex.getSpecies(pokemon.baseSpecies.otherFormes[0]);
		const item = pokemon.getItem();
		if (
			altForme?.isMega && altForme?.requiredMove &&
			pokemon.baseMoves.includes(this.toID(altForme.requiredMove)) && !item.zMove
		) {
			return altForme.name;
		}
		if (item.name === "Audinite" && pokemon.baseSpecies.name === "Silvino-Bug") {
			return "Silvino-Bug-Mega";
		}
		if (item.name === "Audinite" && pokemon.baseSpecies.name === "Silvino-Dark") {
			return "Silvino-Dark-Mega";
		}
		if (item.name === "Audinite" && pokemon.baseSpecies.name === "Silvino-Dragon") {
			return "Silvino-Dragon-Mega";
		}
		if (item.name === "Audinite" && pokemon.baseSpecies.name === "Silvino-Electric") {
			return "Silvino-Electric-Mega";
		}
		if (item.name === "Audinite" && pokemon.baseSpecies.name === "Silvino-Fairy") {
			return "Silvino-Fairy-Mega";
		}
		if (item.name === "Audinite" && pokemon.baseSpecies.name === "Silvino-Fighting") {
			return "Silvino-Fighting-Mega";
		}
		if (item.name === "Audinite" && pokemon.baseSpecies.name === "Silvino-Fire") {
			return "Silvino-Fire-Mega";
		}
		if (item.name === "Audinite" && pokemon.baseSpecies.name === "Silvino-Flying") {
			return "Silvino-Flying-Mega";
		}
		if (item.name === "Audinite" && pokemon.baseSpecies.name === "Silvino-Ghost") {
			return "Silvino-Ghost-Mega";
		}
		if (item.name === "Audinite" && pokemon.baseSpecies.name === "Silvino-Grass") {
			return "Silvino-Grass-Mega";
		}
		if (item.name === "Audinite" && pokemon.baseSpecies.name === "Silvino-Ground") {
			return "Silvino-Ground-Mega";
		}
		if (item.name === "Audinite" && pokemon.baseSpecies.name === "Silvino-Ice") {
			return "Silvino-Ice-Mega";
		}
		if (item.name === "Audinite" && pokemon.baseSpecies.name === "Silvino-Poison") {
			return "Silvino-Poison-Mega";
		}
		if (item.name === "Audinite" && pokemon.baseSpecies.name === "Silvino-Psychic") {
			return "Silvino-Psychic-Mega";
		}
		if (item.name === "Audinite" && pokemon.baseSpecies.name === "Silvino-Rock") {
			return "Silvino-Rock-Mega";
		}
		if (item.name === "Audinite" && pokemon.baseSpecies.name === "Silvino-Steel") {
			return "Silvino-Steel-Mega";
		}
		if (item.name === "Audinite" && pokemon.baseSpecies.name === "Silvino-Water") {
			return "Silvino-Water-Mega";
		}
		
		return item.megaStone;
	},
	
	pokemon: {
		//Included for Magnetic Waves:
		//Levitate is checked for when running groundedness (ground immunity, iron ball, etc)
		//So we manually add a check for Magnetic Waves here as well,
		//Including a diffrent activation message 
		//so that the game doesn't report it as having Levitate when it procs.
		runImmunity(type: string, message?: string | boolean) {
			if (!type || type === '???') return true;
			if (!(type in this.battle.dex.data.TypeChart)) {
				if (type === 'Fairy' || type === 'Dark' || type === 'Steel') return true;
				throw new Error("Use runStatusImmunity for " + type);
			}
			if (this.fainted) return false;

			const negateResult = this.battle.runEvent('NegateImmunity', this, type);
			let isGrounded;
			if (type === 'Ground') {
				isGrounded = this.isGrounded(!negateResult);
				if (isGrounded === null) {
					if (message) {
						if (this.hasAbility('magneticwaves')) {
							this.battle.add('-immune', this, '[from] ability: Magnetic Waves');
						} else {
							this.battle.add('-immune', this, '[from] ability: Levitate');
						}
					}
					return false;
				}
			}
			if (!negateResult) return true;
			if ((isGrounded === undefined && !this.battle.dex.getImmunity(type, this)) || isGrounded === false) {
				if (message) {
					this.battle.add('-immune', this);
				}
				return false;
			}
			return true;
		},
		
		
		isGrounded(negateImmunity = false) {
			if ('gravity' in this.battle.field.pseudoWeather) return true;
			if ('ingrain' in this.volatiles && this.battle.gen >= 4) return true;
			if ('smackdown' in this.volatiles) return true;
			const item = (this.ignoringItem() ? '' : this.item);
			if (item === 'ironball') return true;
			// If a Fire/Flying type uses Burn Up and Roost, it becomes ???/Flying-type, but it's still grounded.
			if (!negateImmunity && this.hasType('Flying') && !('roost' in this.volatiles)) return false;
			if ((this.hasAbility('levitate') || this.hasAbility('magneticwaves'))&& !this.battle.suppressingAttackEvents()) return null;
			if ('magnetrise' in this.volatiles) return false;
			if ('telekinesis' in this.volatiles) return false;
			return item !== 'airballoon';
		},
		
		
		ignoringAbility() {
			// Check if any active pokemon have the ability Neutralizing Gas
			let neutralizinggas = false;
			for (const pokemon of this.battle.getAllActive()) {
				// can't use hasAbility because it would lead to infinite recursion
				if (pokemon.ability === ('neutralizinggas' as ID) && !pokemon.volatiles['gastroacid'] &&
					!pokemon.abilityData.ending) {
					neutralizinggas = true;
					break;
				}
			}

			return !!(
				(this.battle.gen >= 5 && !this.isActive) ||
				((this.volatiles['gastroacid'] || (neutralizinggas && this.ability !== ('neutralizinggas' as ID))) &&
				!this.getAbility().isPermanent
				)
			);
		}
	},
	
	battle: {
		//Included for Therapeutic:
		//Burn status' Atk reduction and Guts users' immunity to it is hard-coded in battle.ts,
		//So we have to bypass it manually here.
		modifyDamage(
			baseDamage: number, pokemon: Pokemon, target: Pokemon, move: ActiveMove, suppressMessages = false
		) {
			const tr = this.trunc;
			if (!move.type) move.type = '???';
			const type = move.type;

			baseDamage += 2;

			// multi-target modifier (doubles only)
			if (move.spreadHit) {
				const spreadModifier = move.spreadModifier || (this.gameType === 'free-for-all' ? 0.5 : 0.75);
				this.debug('Spread modifier: ' + spreadModifier);
				baseDamage = this.modify(baseDamage, spreadModifier);
			}

			// weather modifier
			baseDamage = this.runEvent('WeatherModifyDamage', pokemon, target, move, baseDamage);

			// crit - not a modifier
			const isCrit = target.getMoveHitData(move).crit;
			if (isCrit) {
				baseDamage = tr(baseDamage * (move.critModifier || (this.gen >= 6 ? 1.5 : 2)));
			}

			// random factor - also not a modifier
			baseDamage = this.randomizer(baseDamage);

			// STAB
			if (move.forceSTAB || (type !== '???' && pokemon.hasType(type))) {
				// The "???" type never gets STAB
				// Not even if you Roost in Gen 4 and somehow manage to use
				// Struggle in the same turn.
				// (On second thought, it might be easier to get a MissingNo.)
				baseDamage = this.modify(baseDamage, move.stab || 1.5);
			}
			// types
			let typeMod = target.runEffectiveness(move);
			typeMod = this.clampIntRange(typeMod, -6, 6);
			target.getMoveHitData(move).typeMod = typeMod;
			if (typeMod > 0) {
				if (!suppressMessages) this.add('-supereffective', target);

				for (let i = 0; i < typeMod; i++) {
					baseDamage *= 2;
				}
			}
			if (typeMod < 0) {
				if (!suppressMessages) this.add('-resisted', target);

				for (let i = 0; i > typeMod; i--) {
					baseDamage = tr(baseDamage / 2);
				}
			}

			if (isCrit && !suppressMessages) this.add('-crit', target);

			if (pokemon.status === 'brn' && move.category === 'Physical' && !pokemon.hasAbility('guts') && !pokemon.hasAbility('therapeutic')) {
				if (this.gen < 6 || move.id !== 'facade') {
					baseDamage = this.modify(baseDamage, 0.5);
				}
			}

			// Generation 5, but nothing later, sets damage to 1 before the final damage modifiers
			if (this.gen === 5 && !baseDamage) baseDamage = 1;

			// Final modifier. Modifiers that modify damage after min damage check, such as Life Orb.
			baseDamage = this.runEvent('ModifyDamage', pokemon, target, move, baseDamage);

			if (move.isZOrMaxPowered && target.getMoveHitData(move).zBrokeProtect) {
				baseDamage = this.modify(baseDamage, 0.25);
				this.add('-zbroken', target);
			}

			// Generation 6-7 moves the check for minimum 1 damage after the final modifier...
			if (this.gen !== 5 && !baseDamage) return 1;

			// ...but 16-bit truncation happens even later, and can truncate to 0
			return tr(baseDamage, 16);
		},
	},
}; 