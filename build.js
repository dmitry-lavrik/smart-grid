function Build(settings, patterns){
    var resources = {};

    resources.settings = settings;
    resources.helpers = new (require('./system/helpers.js').instance)();
    resources.base = new (require('./system/base.js').instance)(resources);
    resources.column = require('./system/column.js');
    resources.mediaQuery = require('./system/media.js');
    resources.patterns = patterns;
    resources.mixin = require('./system/mixin.js');
    resources.replaces = new (require('./system/replaces.js').instance)(resources);
    resources.properties = new (require('./system/properties.js').instance)(resources);
    resources.styles = new (require('./system/styles.js').instance)();

    var str = '';

    str += "{{var}}columns{{=}}" + resources.settings.columns + '{{;}}\n';
    str += "{{var}}offset{{=}}" + resources.settings.offset + '{{;}}\n';

    str += '\n';

    for (var name in resources.settings.breakPoints) {
        str += "{{var}}break_" + name + '{{=}}' + resources.settings.breakPoints[name].width + "{{;}}\n";
    }

    var reset_mixin = new resources.mixin.create(resources.patterns.mixin, 'reset', '', resources.patterns.reset);
    str += '\n' + reset_mixin.render() + '\n';

    str += "\n" + resources.base.render();

    function generateOneMedia(resources, media, postfix) {
        var inner = '';

        for (var i = 1; i <= resources.settings.columns; i++) {
            var col = new resources.column.gen(resources, media, resources.settings.mixinNames.column + postfix, i);
            var width = col.render();
            inner += width + "\n";
        }

        return inner;
    }

    var media = new resources.mediaQuery.gen();

    str += generateOneMedia(resources, media, '');
    str += resources.properties.render(media, '');

    for (var name in resources.settings.breakPoints) {
        var media = new resources.mediaQuery.gen("{{var}}break_" + name);

        str += generateOneMedia(resources, media, '-' + name);
        str += resources.properties.render(media, name);
    }

    var debug_mixin = new resources.mixin.create(resources.patterns.debug, 'debug', '', resources.patterns.reset);
    str += '\n' + debug_mixin.render() + '\n';
    
    var clearfix_mixin = new resources.mixin.create(resources.patterns.mixin, 'clearfix', '', resources.patterns.clearfix);
    str += '\n' + clearfix_mixin.render() + '\n';

    str = resources.replaces.all(str, resources.settings.outputStyle);
    
    return {
        'res': true,
        'grid': str, 
        'type': resources.settings.outputStyle
    };
}

module.exports = Build;
