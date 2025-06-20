import defaults from './system/defaults/settings.js';
import fs from 'fs'
import build from './build.js'

export default function smartgrid(dest, options) {
    try {
        let root = import.meta.dirname;

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
        
        let orderedBreakPointsArr = [];
        let i = 0;
        let sameUnits= true;
        
        for(let name in options.breakPoints){
            let tmp = {name: name};
            tmp.point = options.breakPoints[name];
            
            orderedBreakPointsArr.push(tmp);
            
            if(i > 0){
                let u1 = orderedBreakPointsArr[i].point.width.replace(/\d(.\d)*/g, '');
                let u2 = orderedBreakPointsArr[i - 1].point.width.replace(/\d(.\d)*/g, '');
                
                if(u1 !== u2){
                    console.log('Notice: we can`t to order breakPoints with different width units!');
                    sameUnits = false;
                    orderedBreakPointsArr = [];
                    break;
                }
            }

            i++;
        }
        
        if(sameUnits){
            orderedBreakPointsArr.sort(function(a, b){
                let w1 = parseFloat(a.point.width);
                let w2 = parseFloat(b.point.width);

                if(w1 > w2){
                    return options.mobileFirst ? 1 : -1;
                }
                else if(w1 < w2){
                    return options.mobileFirst ? -1 : 1;
                }
            });
            
            /* перезаписать options.breakPoints */
            let points = {};
            
            for(let i = 0; i < orderedBreakPointsArr.length; i++){
                points[orderedBreakPointsArr[i].name] = orderedBreakPointsArr[i].point;
            }
            
            options.breakPoints = points;
        }
        
        let patterns = {};
        patterns.mixin = fs.readFileSync(root + '/system/patterns/mixin.txt');
        patterns.clearfix = fs.readFileSync(root + '/system/patterns/clearfix.txt');
        patterns.reset = fs.readFileSync(root + '/system/patterns/reset.txt');
        patterns.fromTo = fs.readFileSync(root + '/system/patterns/fromTo.txt');

        let patternDebug = fs.readFileSync(root + '/system/patterns/debug.txt');
        let sizeCalling = ['(1)'];
        
        for(let name in options.breakPoints){
            if(options.breakPoints[name].offset !== undefined){
                sizeCalling.push(`-${name}(1)`);
            }
        }
        
        for(let i = 0; i < sizeCalling.length; i++){
            sizeCalling[i] = '{{tab}}{{tab}}{{tab}}{{tab}}{{call}}' + options.mixinNames.size + sizeCalling[i] + '{{;}}';
        }

        patterns.debug = patternDebug.toString()
                                     .replace('{{sizes}}', sizeCalling.join('\n'), 'g')
                                     .replace('{{mixinNames.container}}', options.mixinNames.container, 'g')
                                     .replace('{{mixinNames.row-flex}}', options.mixinNames.row, 'g')
                                     .replace('{{mixinNames.col}}', options.mixinNames.column, 'g');

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
        console.log("Oops -> " + err.stack);
    }
}