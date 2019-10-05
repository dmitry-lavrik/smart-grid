const inquirer = require('inquirer');
const baseConfig = require('./system/defaults/settings');
const { setTabFromChoises } = require('./system/cliUtils');

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
	]);

	config = { ...answers }
	config.tab = setTabFromChoises(answers.tab)

	return {
		...baseConfig,
		...config
	}
};
