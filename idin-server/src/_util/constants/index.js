const defaults = {
	appName: 'rabestudios-template-server',
};

const items = [
	{
		itemName: 'Long sleeved gowns',
		description: 'Designed to protect uniforms / clothing from moisture / soiling during direct patient care.'
	},
	{
		itemName: 'Surgical masks (Fluid Repellent)',
		description: 'Provide barrier protection to the wearer from splashes and droplets to ' +
			'the area of the wearer’s nose, mouth and respiratory tract. They do not provide protection against' +
			' aerosolised particles and are not classified as Respiratory Protective Equipment.'
	},
	{
		itemName: 'Eye goggles',
		description: 'Must be worn when there is risk of splashing body fluids onto mucous membranes e.g. eyes/nose.'
	},
	{
		itemName: 'Face visors',
		description: 'Must be worn when there is risk of splashing body fluids onto mucous membranes e.g. eyes/nose.'
	},
	{
		itemName: 'Full face protection',
		description: 'Must be worn when there is risk of splashing body fluids onto mucous membranes e.g. eyes/nose.'
	},
	{
		itemName: 'FFP3 respirator masks',
		description: 'Protects the wearer from pathogens spread by the airborne route e.g. measles, chickenpox,' +
			' tuberculosis, and when performing aerosol generating procedures on patients with suspected or known' +
			' influenza or other respiratory tract infections.'
	},
	{
		itemName: 'Polythene gloves',
		description: 'Thin and have a tendency to tear. They are not appropriate choice for healthcare settings'
	},
	{
		itemName: 'Vinyl gloves',
		description: 'Provides impermeable barrier against microorganisms. Loose fitting and unsuitable for ' +
			'procedures that require manual dexterity'
	},
	{
		itemName: 'Latex gloves',
		description: 'Effective barrier against microorganisms. If a healthcare worker has a suspected latex allergy,' +
			' they should not wear latex gloves.',
	},
	{
		itemName: 'Nitrile gloves',
		description: 'Common choice of gloves for use where a latex free environment is required.'
	},
	{
		itemName: 'Neoprene gloves',
		description: 'Has similar properties to natural rubber latex and are often a popular replacement in' +
			' situations when a latex-free glove is required and manual dexterity is important.'
	}
]

module.exports = {
	DEFAULT_APP_NAME: defaults.appName,
	ITEMS: items
};
