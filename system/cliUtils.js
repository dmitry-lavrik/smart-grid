const baseConfig = require('./defaults/settings')

function getArgumentsFromConsole() {
    return [...process.argv];
}
  
function getTabFromChoises(choise){
    const tabs = {
        '1 spaces': ' ',
        '2 spaces': '  ',
        '3 spaces': '   ',
        '4 spaces': '    ',
        '1 tab': '\t'
    }
    return tabs[choise];
}

function setContainerParamsFromInput(input){
    const params = input.split(' ')
    if (params.length !== 2) return baseConfig.container;
    return {
        maxWidth: params[0].trim(),
        fields: params[1].trim()
    }
}

function getBreakpointsObjectFromString(breakpointsString){

    const breakpoints = {}

    const lines = breakpointsString.trim().split('\n');

    lines.forEach(breakpoint => {
        const [name, width, fields] = breakpoint.split(' ');

        breakpoints[name] = {
            width
        }

        if (fields) {
            breakpoints[name] = { width, fields }
        }
    })
    return breakpoints;
}

function validateByLengthWithMessage(validateValue, message){
    if (validateValue.length === 0) return message;
	return true;
}

module.exports = { 
    getArgumentsFromConsole, 
    getTabFromChoises, 
    setContainerParamsFromInput, 
    getBreakpointsObjectFromString,
    validateByLengthWithMessage 
};
  