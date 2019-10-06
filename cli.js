const inquirer = require('inquirer');
const baseConfig = require('./system/defaults/settings');
const { getTabFromChoises, setContainerParamsFromInput, getBreakpointsObjectFromString } = require('./system/cliUtils');

module.exports = async function smartGridCli() {
	let config = {};

  	const answers = await inquirer.prompt([
		{
			type: 'confirm',
			name: 'mobileFirst',
			default: baseConfig.mobileFirst,
			message: 'Use mobileFirst by default? If not, it will be desktopFirst.',
		},
		{
			type: 'input',
			name: 'filename',
			default: baseConfig.filename,
			message: 'Output file name? (without extension)'
		},
		{
			type: 'list',
			name: 'outputStyle',
			message: "CSS-preprocessor...",
			choices: [
				"less",
				"scss",
				"sass",
				"styl"
			]
		},
		{
			type: 'list',
			name: 'tab',
			message: 'Tab style?',
			default: '4 spaces',
			choices: [
				"1 spaces",
				"2 spaces",
				"3 spaces",
				"4 spaces",
				"1 tab"
			]
		},
		{
			type: 'input',
			name: 'columns',
			message: 'Columns? (popular 12 and 24)',
			default: baseConfig.columns
		},
		{
			type: 'input',
			name: 'offset',
			message: 'Padding between columns? (px|rem|%)',
			default: baseConfig.offset
		},
		{
			type: 'confirm',
			name: 'detailedCalc',
			default: baseConfig.detailedCalc,
			message: 'Use detailedCalc for calc()?',
		},
		{
			type: 'list',
			name: 'defaultMediaDevice',
			message: 'What is default media device for media query?',
			default: baseConfig.defaultMediaDevice,
			choices: [
				"screen",
				"only screen",
				"all",
			]
		},
		{
			type: 'input',
			name: 'container',
			default: '1280px 30px',
			message: 'Please enter container params e.g. 1280px 30px'
		},
		{
			type: 'confirm',
			name: 'breakPoints',
			message: 'Use default breakpoints?',
			default: true
		}
	]);

	config = { ...answers }
	config.tab = getTabFromChoises(answers.tab)
	config.container = setContainerParamsFromInput(answers.container)

	if (answers.breakPoints) {
		config.breakPoints = baseConfig.breakPoints;
	} else {
		const breakpoints = await inquirer.prompt([
			{
				type: 'editor',
				name: 'raw',
				message: 'Enter breakpoints'
			}
		])
		config.breakPoints = getBreakpointsObjectFromString(breakpoints.raw);
	}

	return {
		...baseConfig,
		...config
	}
};