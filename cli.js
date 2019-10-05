const inquirer = require('inquirer');
const baseConfig = require('./system/defaults/settings');

module.exports = async function smartGridCli() {
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
		}
	]);

	return {
		...baseConfig,
		...answers
	}
};
