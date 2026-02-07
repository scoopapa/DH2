import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
		name: "[Gen 9] Megas for All: Paldea",
		desc: ["<b>Megas for All</b>: A Pet Mod that aims to create unique Mega Evolutions for every fully evolved Pokémon. Current season is focused on the Paldea dex, pre DLC!",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/3671140/">Megas for All v7 on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TdeAUUtjh0f_tcIBllbF_imgepwV-dV2YomoTCRlPgI/edit?usp=sharing">Spreadsheet</a>`,
				`&bullet; <a href="http://megasforall.wikidot.com/">Wiki</a>`
		      ],
		ruleset: ['Standard', 'Z-Move Clause', 'Terastal Clause', 'Mega Data Mod'],
		banlist: [
			'AG', 'Uber',
			'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag',
			'Baton Pass', 'Last Respects', 'Shed Tail',
			'King\'s Rock', 'Razor Fang', 'Quick Claw',
		],
		onValidateSet(set) {
			const problems: string[] = [];
			const setHas: {[k: string]: true} = {};
			let species = this.dex.species.get(set.species);
			let item = this.dex.items.get(set.item);
			let tierSpecies = species;

			if (item.megaEvolves === species.name) {
				if (item.megaStone && this.dex.species.get(item.megaStone).tier !== 'Mega') return [item.name + ' is not a legal Mega Stone.'];
			}
		},
		onHitPriority: 1,
		onHit(target, source, move) {
			const forte = source.m.forte;
			if (move?.category !== 'Status' && forte) {
				this.singleEvent('Hit', forte, {}, target, source, move);
				if (forte.self) this.singleEvent('Hit', forte.self, {}, source, source, move);
				this.singleEvent('AfterHit', forte, {}, target, source, move);
			}
		},
		onAfterSubDamage(damage, target, source, move) {
			const forte = source.m.forte;
			if (move?.category !== 'Status' && forte) {
				this.singleEvent('AfterSubDamage', forte, null, target, source, move, damage);
			}
		},
		onModifySecondaries(secondaries, target, source, move) {
			if (secondaries.some(s => !!s.self)) move.selfDropped = false;
		},
		onAfterMoveSecondaryPriority: 1,
		onAfterMoveSecondarySelf(source, target, move) {
			const forte = source.m.forte;
			if (move?.category !== 'Status' && forte) {
				this.singleEvent('AfterMoveSecondarySelf', forte, null, source, target, move);
			}
		},
		onBasePowerPriority: 1,
		onBasePower(basePower, source, target, move) {
			const forte = source.m.forte;
			if (move.category !== 'Status' && forte?.onBasePower) {
				forte.onBasePower.call(this, basePower, source, target, move);
			}
		},
		pokemon: {
			getItem() {
				const move = this.battle.dex.moves.get(this.m.forte);
				if (!move.exists) return Object.getPrototypeOf(this).getItem.call(this);
				return {
					...this.battle.dex.items.get('mail'),
					name: move.name, id: move.id, ignoreKlutz: true, onTakeItem: false,
				};
			},
		},
		mod: 'm4apaldea',
	};