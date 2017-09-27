class Base{
    constructor(resources){
        this.resources = resources;
        let cfull = `{{call}}${this.resources.settings.mixinNames.container}-full()`;
        let clfix = `{{call}}${this.resources.settings.mixinNames.clearfix}()`;
        
        this.content = {
            container: {
                'max-width': this.resources.settings.container.maxWidth,
                margin: "0 auto",
                [cfull]: null
            },
            row: {
                display: "flex",
                'flex-wrap': "wrap",
                'margin-left': "({{var}}offset_one_side * -1)",
                'margin-right': "({{var}}offset_one_side * -1)"
            },
            rowFloat: {
                'margin-left': "({{var}}offset_one_side * -1)",
                'margin-right': "({{var}}offset_one_side * -1)",
                [clfix]: null
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

        let containerFull = {
            'padding-left': this.resources.settings.container.fields,
            'padding-right': this.resources.settings.container.fields
        };

        let wrapAndMixinWrap = '';

        let cont = this.resources.styles.objToStyles(containerFull, 1);
        let media = new this.resources.media();
        wrapAndMixinWrap += media.wrap(cont);

        for (let name in this.resources.settings.breakPoints) {
            let point = this.resources.settings.breakPoints[name];
            
            if(point.fields !== undefined){
                wrapAndMixinWrap += '\n\n' + this.resources.styles.objToCallMedia(name + '-block', {
                    'padding-left': point.fields,
                    'padding-right': point.fields
                }, 1);
            }
        }

        let mixinWrapper = new this.resources.mixin(this.resources.patterns.mixin, this.resources.settings.mixinNames.container + '-full', '', wrapAndMixinWrap);
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