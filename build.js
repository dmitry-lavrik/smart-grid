function Build(settings, patterns) {
    let resources = {};
    
    resources.settings = settings;
    resources.patterns = patterns;
    resources.mixin = require('./system/mixin.js');
    resources.media = require('./system/media.js');
    resources.helpers = require('./system/helpers.js');
    resources.size = require('./system/size.js');
    resources.replaces = require('./system/replaces.js');
   
    let globalMediaCondition = settings.mobileFirst ? 'min-width' : 'max-width';
  
    let str = '';
   
    str += "{{var}}columns{{=}}" + resources.settings.columns + '{{;}}\n';
    str += "{{var}}offset{{=}}" + resources.settings.offset + '{{;}}\n';
    str += "{{var}}offset_one_side{{=}}({{var}}offset / 2){{;}}\n";
    str += "{{var}}atom{{=}}(100% / {{var}}columns){{;}}\n";

    str += '\n';

    for (let name in resources.settings.breakPoints) {
        str += "{{var}}break_" + name + '{{=}}' + resources.settings.breakPoints[name].width + "{{;}}\n";
    }
    
    str += '\n';
    
    let size = new resources.size(resources, resources.settings.mixinNames.size);
    str += size.render() + "\n\n";
    
    for (let name in resources.settings.breakPoints) {
        size = new resources.size(resources, resources.settings.mixinNames.size, name);
        str += size.render() + "\n\n";
    }
    
    for (let name in resources.settings.breakPoints) {
        let media = new resources.media("{{var}}break_" + name, globalMediaCondition);
        
        let styles = "{{string-var}}name{{/string-var}}{{:}}{{var}}value{{;}}\n";
        let mix = new resources.mixin(resources.patterns.mixin, name, '{{var}}name, {{var}}value', media.wrap(styles, 1));
        str += mix.render(resources.settings.outputStyle) + "\n\n";

        styles = "{{block-content-extract}}{{;}}\n";
        mix = new resources.mixin(resources.patterns.mixin, name + '-block', '{{block-content-var}}', media.wrap(styles, 1));
        str += mix.render(resources.settings.outputStyle) + "\n\n";
    }
    
    let reset = new resources.mixin(resources.patterns.mixin, resources.settings.mixinNames.reset, '', resources.patterns.reset);
    str += reset.render();
    
    str = (new resources.replaces(resources)).all(str, resources.settings.outputStyle);
    
    return {
        res: true,
        grid: str,
        type: resources.settings.outputStyle
    };
}

module.exports = Build;
