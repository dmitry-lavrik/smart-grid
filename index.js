module.exports = function (dest, options) {
    try {
        let root = __dirname;
        let fs = require('fs');
        let defaults = require('./system/defaults/settings.js');

        let innerMerge = {
            container: true,
            breakPoints: false,
            mixinNames: true
        };

        if (typeof options !== "object") {
            options = defaults;
        } else {
            for (let key in defaults) {
                if (typeof (options[key]) === "undefined") {
                    options[key] = defaults[key];
                } 
                else if (typeof options[key] === "object" && innerMerge[key]) {
                    for (let k in defaults[key]) {
                        if (typeof (options[key][k]) === "undefined") {
                            options[key][k] = defaults[key][k];
                        }
                    }
                }
            }
        }
        
        let patterns = {};
        patterns.mixin = fs.readFileSync(root + '/system/patterns/minix');
        patterns.clearfix = fs.readFileSync(root + '/system/patterns/clearfix');
        patterns.reset = fs.readFileSync(root + '/system/patterns/reset');
        patterns.debug = fs.readFileSync(root + '/system/patterns/debug');

        let build = require('./build.js');
        let res = build(options, patterns);

        if (dest === undefined) {
            console.log('It`s test mode, because you don`t set destination folder');
        } else {
            let buildFile = dest + '/' + options.filename + '.' + res.type;
            fs.writeFileSync(buildFile, res.grid);
            console.log('Grid placed into ' + buildFile);
        }

        console.log('Grid length is ' + res.grid.length + ' :)');
        console.log("Its work! Good day!");
    } catch (err) {
        console.log("Oops -> " + err);
    }
}