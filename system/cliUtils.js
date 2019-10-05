function getArgumentsFromConsole() {
    return [...process.argv];
}
  
function setTabFromChoises(choise){
    const tabs = {
        '1 spaces': ' ',
        '2 spaces': '  ',
        '3 spaces': '   ',
        '4 spaces': '    ',
        '1 tab': '\t'
    }
    return tabs[choise];
}

module.exports = { getArgumentsFromConsole, setTabFromChoises };
  