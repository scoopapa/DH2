import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 8] Dynamax Meter",
		mod: 'gen8maxmeter',
		ruleset: ['Standard'],
		banlist: ['Uber', 'AG', 'Arena Trap', 'Moody', 'Power Construct', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Baton Pass'],
		onBegin() {
			for (const side of this.sides) {
				if (!side.getSideCondition('maxmeter5')) {
					side.dynamaxUsed = true;
				}
			}
		},
		onAfterMoveSecondarySelf(source, target, move) {
			if (!move || !target) return;
			if (source.side.getSideCondition('maxmeter1') || source.side.getSideCondition('maxmeter2') || source.side.getSideCondition('maxmeter3') || source.side.getSideCondition('maxmeter4') || source.side.getSideCondition('maxmeter5')) return;
			if (source.hasType(move.type)) {
				source.side.addSideCondition('maxmeter1');
			}
		},
	}
];