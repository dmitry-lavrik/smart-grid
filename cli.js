const inquirer = require('inquirer');
const baseConfig = require('./system/defaults/settings');

module.exports = async function smartGridCli() {
	const config = {};

  	const answers = await inquirer.prompt([
		{
			type: 'confirm',
			name: 'mobileFirst',
			message: 'Use mobileFirst by default? If not, it will be desktopFirst.',
		}
	]);

	config.mobileFirst = answers.mobileFirst;

	return {
		...baseConfig,
		...config
	}
};
