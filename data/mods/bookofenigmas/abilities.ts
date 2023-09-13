import {consoleips} from "../../../config/config-example";

const slicing = [
	'cut', 'razorleaf', 'slash', 'furycutter', 'aircutter', 'aerialace',
	'leafblade', 'nightslash', 'airslash', 'xscissor', 'psychocutter',
	'crosspoison', 'sacredsword', 'razorshell', 'solarblade', 'behemothblade',
	'stoneaxe', 'ceaselessedge', 'populationbomb', 'kowtowcleave', 'bitterblade',
	'aquacutter',
];
export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	// Paradoxes abilities
	cleansingfire: {
		onAnyFaintPriority: 1,
		onAnyFaint() {
			if (!this.effectState.target.hp) return;
			this.debug('cleansingfire');
			this.add('-activate', this.effectState.target, 'ability: Cleansing Fire');
			this.effectState.target.cureStatus();
		},
		name: "Cleansing Fire",
		shortDesc: "When a Pokemon faints, this Pokemon's status is cured.",
		rating: 3.5,
		num: -1,
	},
	corruptingstorm: {
		onDamagingHitOrder: 2,
		onDamagingHit(damage, target, source, move) {
			if (!target.hp) {
				this.add('-activate', target, 'ability: Corrupting Storm');
				source.addVolatile('storm');
			}
		},
		name: "Corrupting Storm",
		shortDesc: "When this Pokemon is KOed by another Pokemon, the attacker loses 1/8 max HP every turn until it switches out.",
		rating: 2.5,
		num: -2,
	},
};
