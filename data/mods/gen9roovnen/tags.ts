export const Tags: {[id: string]: ModdedTagData} = {
	corrupt: {
		name: "Corrupt",
		speciesFilter: species => species.tags.includes("Corrupt"),
	},
};
