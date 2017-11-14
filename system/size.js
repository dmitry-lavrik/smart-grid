class Size{
    
    constructor(resources, name, postfix = '') {
        this.resources = resources;
        this.name = postfix === '' ? name : name + '-' + postfix;
        this.postfix = postfix;
    }
    
    render(){
        let style = '';
        let mediaPostfix = this.postfix === '' ? '' : '_' + this.postfix;

        if(this.resources.helpers.isPercentage(this.resources.settings.offset)){
            style += this.resources.styles.objToCallMedia(this.postfix, {
                width: `{{var}}atom * {{var}}n - {{var}}offset${mediaPostfix}`
            });
        }
        else if(this.resources.settings.detailedCalc){
            style += `{{var}}val{{=}}{{i}}calc(100% / {{string-var}}columns{{/string-var}} * {{string-var}}n{{/string-var}} - {{string-var}}offset${mediaPostfix}{{/string-var}}){{/i}}{{;}}\n`;
            
            style += this.resources.styles.objToCallMedia(this.postfix, {
                width: '{{var}}val'
            });
        }
        else{
            style += `{{var}}val{{=}}100% / {{var}}columns * {{var}}n{{;}}\n`;
            
            style += this.resources.styles.objToCallMedia(this.postfix, {
                width: `{{i}}calc({{string-var}}val{{/string-var}} - {{string-var}}offset${mediaPostfix}{{/string-var}}){{/i}}`
            });
        }

        let mixin = new this.resources.mixin(this.resources.patterns.mixin, this.name, '{{var}}n', (new this.resources.media()).wrap(style, 1));
        return mixin.render(this.resources.settings.outputStyle);
    }
}

module.exports = Size;