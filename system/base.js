function Base(resources) {
    this.resources = resources;

    var offset = this.resources.helpers.parseUnit(this.resources.settings.offset);

    this.content = {
        row: {
            display: "flex",
            'flex-wrap': "wrap",
            'margin-left': "({{var}}offset_one_side * -1)",
            'margin-right': "({{var}}offset_one_side * -1)"
        },
        rowFloat: {
            'margin-left': "({{var}}offset_one_side * -1)",
            'margin-right': "({{var}}offset_one_side * -1)",
            '{{call}}clearfix()': null,
        },
        column: {
            'box-sizing': "border-box",
            'margin-left': "{{var}}offset_one_side",
            'margin-right': "{{var}}offset_one_side",
            'word-wrap': "break-word"
        },
        columnFloat: {
            'float': 'left'
        },
        columnPadding: {
            'padding-left': "{{var}}offset_one_side",
            'padding-right': "{{var}}offset_one_side",
            'word-wrap': "break-word"
        }
    };
}

Base.prototype.render = function () {
    var out = "";

    var container = {
        'max-width': this.resources.settings.container.maxWidth,
        'padding-left': this.resources.settings.container.fields,
        'padding-right': this.resources.settings.container.fields,
        margin: "0 auto"
    };

    var wrapAndMixinWrap = '';

    var cont = this.resources.styles.objToStyles(container, 1);
    var media = new this.resources.mediaQuery.gen();
    wrapAndMixinWrap += media.wrap(cont);

    for (var name in this.resources.settings.breakPoints) {
        var point = this.resources.settings.breakPoints[name];
        var media = new this.resources.mediaQuery.gen("{{var}}break_" + name);
        
        var containerMedia = {
            'padding-left': point.fields,
            'padding-right': point.fields
        };
        
        var cont = this.resources.styles.objToStyles(containerMedia);
        wrapAndMixinWrap += "\n\n" + media.wrap(cont, 1);
    }

    var mixinWrapper = new this.resources.mixin.create(this.resources.patterns.mixin, this.resources.settings.mixinNames.container, '', wrapAndMixinWrap);
    out += mixinWrapper.render(this.resources.settings.outputStyle) + '\n';
    
    for (var name in this.resources.settings.mixinNames) {
        if(this.content[name] !== undefined){
            var selector = this.resources.settings.mixinNames[name];
            var styles = this.resources.styles.objToStyles(this.content[name], 1);
            var media = new this.resources.mediaQuery.gen();
            var mixin = new this.resources.mixin.create(this.resources.patterns.mixin, selector, '', media.wrap(styles));

            out += mixin.render() + '\n';
        }
    }

    return out;
}

module.exports.instance = Base;