class Base{
    constructor(resources){
        this.resources = resources;
        
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

    render() {
        let out = "";

        let container = {
            'max-width': this.resources.settings.container.maxWidth,
            'padding-left': this.resources.settings.container.fields,
            'padding-right': this.resources.settings.container.fields,
            margin: "0 auto"
        };

        let wrapAndMixinWrap = '';

        let cont = this.resources.styles.objToStyles(container, 1);
        let media = new this.resources.media();
        wrapAndMixinWrap += media.wrap(cont);

        for (let name in this.resources.settings.breakPoints) {
            let point = this.resources.settings.breakPoints[name];
            /*let media = new this.resources.media("{{var}}break_" + name);

            let containerMedia = {
                'padding-left': point.fields,
                'padding-right': point.fields
            };

            let cont = this.resources.styles.objToStyles(containerMedia);
            wrapAndMixinWrap += "\n\n" + media.wrap(cont, 1);*/
            wrapAndMixinWrap += '\n\n' + this.resources.styles.objToCallMedia(name + '-block', {
                'padding-left': point.fields,
                'padding-right': point.fields
            }, 1);
        }

        let mixinWrapper = new this.resources.mixin(this.resources.patterns.mixin, this.resources.settings.mixinNames.container, '', wrapAndMixinWrap);
        out += mixinWrapper.render(this.resources.settings.outputStyle) + '\n\n';

        for (let name in this.resources.settings.mixinNames) {
            if(this.content[name] !== undefined){
                let selector = this.resources.settings.mixinNames[name];
                let styles = this.resources.styles.objToStyles(this.content[name], 1);
                let media = new this.resources.media();
                let mixin = new this.resources.mixin(this.resources.patterns.mixin, selector, '', media.wrap(styles));

                out += mixin.render() + '\n\n';
            }
        }

        return out;
    }
}

module.exports = Base;