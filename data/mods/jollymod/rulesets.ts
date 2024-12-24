export const Rulesets: {[k: string]: ModdedFormatData} = {
	jolly: {
		name: 'Jolly',
		desc: "Jollymod",
		onBegin() {
			this.add('rule', 'Jollymod', 'uh santas really mad rn');
			this.field.setWeather('snow');
			this.sides[0].karma = 0;
			this.sides[1].karma = 0;
		},
		onAfterMove(source, target, move) {
			if (move.flags['extranice']) source.side.addKarma(2);
			else if (move.flags['nice']) source.side.addKarma(1);
			else if (move.flags['kindanice']) source.side.addKarma(0.5);
			else if (move.flags['naughty']) source.side.removeKarma(2);
			else if (move.category !== 'Status') source.side.removeKarma(1);
		},
	},
};