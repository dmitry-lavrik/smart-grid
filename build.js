function Build(settings, patterns) {
    let resources = {};
    
    resources.settings = settings;
    resources.patterns = patterns;
    resources.mixin = require('./system/mixin.js');
    resources.media = require('./system/media.js');
    resources.helpers = require('./system/helpers.js');
    resources.size = require('./system/size.js');
    resources.shift = require('./system/shift.js');
    resources.styles = require('./system/styles.js');
    resources.replaces = require('./system/replaces.js');
   
    let base = require('./system/base.js');
    let globalMediaCondition = settings.mobileFirst ? 'min-width' : 'max-width';
  
    let str = '';
   
    str += "{{var}}columns{{=}}" + resources.settings.columns + '{{;}}\n';
    str += "{{var}}atom{{=}}(100% / {{var}}columns){{;}}\n";
    
    str += '\n';
    
    for (let name in resources.settings.breakPoints) {
        str += "{{var}}break_" + name + '{{=}}' + resources.settings.breakPoints[name].width + "{{;}}\n";
    }
    
    str += '\n';
    
    str += "{{var}}offset{{=}}" + resources.settings.offset + '{{;}}\n';
    
    let last_offset = "{{var}}offset";

    for (let name in resources.settings.breakPoints) {
        let br = resources.settings.breakPoints[name];
        
        if(br.offset !== undefined){
            str += "{{var}}offset_" + name + '{{=}}' + br.offset + "{{;}}\n";
            last_offset = "{{var}}offset_" + name;
        }
        else{
            str += "{{var}}offset_" + name + '{{=}}' + last_offset + "{{;}}\n";
        }
    }

    str += '\n';

    str += "{{var}}offset_one_side{{=}}({{var}}offset / 2){{;}}\n";
    
    for (let name in resources.settings.breakPoints) {
        str += `{{var}}offset_${name}_one_side{{=}}({{var}}offset_${name} / 2){{;}}\n`;
    }

    str += '\n';

    str += "{{var}}fields{{=}}" + resources.settings.container.fields + '{{;}}\n';
    
    for (let name in resources.settings.breakPoints) {
        let br = resources.settings.breakPoints[name];
        
        if(br.fields !== undefined){
            str += "{{var}}fields_" + name + '{{=}}' + br.fields + "{{;}}\n";
        }
    }
    
    str += '\n';
    
    str += (new base(resources)).render();
    
    let size = new resources.size(resources, resources.settings.mixinNames.size);
    str += size.render() + "\n\n";
    
    for (let name in resources.settings.breakPoints) {
        size = new resources.size(resources, resources.settings.mixinNames.size, name);
        str += size.render() + "\n\n";
    }
    
    let shift = new resources.shift(resources, resources.settings.mixinNames.shift);
    str += shift.render() + "\n\n";
    
    for (let name in resources.settings.breakPoints) {
        shift = new resources.shift(resources, resources.settings.mixinNames.shift, name);
        str += shift.render() + "\n\n";
    }
    
    for (let name in resources.settings.breakPoints) {
        let media = new resources.media("{{var}}break_" + name, globalMediaCondition, resources.settings.defaultMediaDevice);
        
        let styles = "{{string-var}}name{{/string-var}}{{:}}{{var}}value{{;}}\n";
        let mix = new resources.mixin(resources.patterns.mixin, name, '{{var}}name, {{var}}value', media.wrap(styles, 1));
        str += mix.render(resources.settings.outputStyle) + "\n\n";

        styles = "{{block-content-extract}}{{;}}\n";
        mix = new resources.mixin(resources.patterns.mixin, name + '-block', '{{block-content-var}}', media.wrap(styles, 1));
        str += mix.render(resources.settings.outputStyle) + "\n\n";
    }
    
    let fromMedia = new resources.media("{{var}}min_width", 'min-width', resources.settings.defaultMediaDevice);
    let fromCommand = '{{block-content-extract}}{{;}}\n';
    let from = new resources.mixin(resources.patterns.mixin, resources.settings.mixinNames.from, '{{var}}min_width{{block-content-var-delimeter}}{{block-content-var}}', fromMedia.wrap(fromCommand, 1));
    str += from.render();
    str += "\n\n";
    
    let toMedia = new resources.media("{{var}}max_width", 'max-width', resources.settings.defaultMediaDevice);
    let toCommand = '{{block-content-extract}}{{;}}\n';
    let to = new resources.mixin(resources.patterns.mixin, resources.settings.mixinNames.to, '{{var}}max_width{{block-content-var-delimeter}}{{block-content-var}}', toMedia.wrap(toCommand, 1));
    str += to.render();
    str += "\n\n";
    
    let fromTo = new resources.mixin(resources.patterns.mixin, resources.settings.mixinNames.fromTo, '{{var}}min_width, {{var}}max_width{{block-content-var-delimeter}}{{block-content-var}}', resources.patterns.fromTo);
    str += fromTo.render();
    str += "\n\n";
    
    let reset = new resources.mixin(resources.patterns.mixin, resources.settings.mixinNames.reset, '', resources.patterns.reset);
    str += reset.render();
    str += "\n\n";
    
    let debug = new resources.mixin(resources.patterns.mixin, resources.settings.mixinNames.debug, '{{var}}background, {{var}}outline', resources.patterns.debug);
    str += debug.render();
    str += "\n\n";
    
    let clearfix = new resources.mixin(resources.patterns.mixin, resources.settings.mixinNames.clearfix, '', resources.patterns.clearfix);
    str += clearfix.render();
    
    let replaces = new resources.replaces(resources);
    str = replaces.all(str, resources.settings.outputStyle);
    str = replaces.fixLines(str);
    
    return {
        res: true,
        grid: str,
        type: resources.settings.outputStyle
    };
}

module.exports = Build;
