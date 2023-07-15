export const Formats: {[k: string]: FormatData} = {

	permasnow: {
		effectType: 'Rule',
		name: 'Permasnow',
		desc: "It's always hailing!",
		onBegin() {
			this.add('rule', "Permasnow: The weather will always be Hail");
			this.field.setWeather('hail');
		},
	},
	
	permasand: {
		effectType: 'Rule',
		name: 'Permasand',
		desc: "There's a sandstorm!",
		onBegin() {
			this.add('rule', "Permasnow: The weather will always be Sandstorm");
			this.field.setWeather('sandstorm');
		},
	},
	
	permarain: {
		effectType: 'Rule',
		name: 'Permarain',
		desc: "It's always raining!",
		onBegin() {
			this.add('rule', "Permarain: The weather will always be Rain");
			this.field.setWeather('rain');
		},
	},
	
	permasun: {
		effectType: 'Rule',
		name: 'Permasun',
		desc: "The sun is shining brightly!",
		onBegin() {
			this.add('rule', "Permasun: The weather will always be Sun");
			this.field.setWeather('sunnyday');
		},
	},
};

