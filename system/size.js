class Size{
    
    constructor(resources, name, postfix = '') {
        this.resources = resources;
        this.name = postfix === '' ? name : name + '-' + postfix;
        this.postfix = postfix;
    }
    
    render(){
        let style = '';

        if(this.resources.helpers.isPercentage(this.resources.settings.offset)){
            if(this.postfix === ''){
                style += 'width{{:}}{{var}}atom * {{var}}n - {{var}}offset{{;}}\n';
            }
            else{
                style += `{{call}}${this.postfix}(width, {{var}}atom * {{var}}n - {{var}}offset){{;}}\n`;
            }
        }
        else{
            if(this.postfix === ''){
                style += 'width{{:}}{{i}}calc(100% / {{string-var}}columns{{/string-var}} * {{string-var}}n{{/string-var}} - {{string-var}}offset{{/string-var}}){{/i}}{{;}}\n';
            }
            else{
                style += `{{call}}${this.postfix}(width, {{i}}calc(100% / {{string-var}}columns{{/string-var}} * {{string-var}}n{{/string-var}} - {{string-var}}offset{{/string-var}}){{/i}}){{;}}\n`;
            }
        }

        let mixin = new this.resources.mixin(this.resources.patterns.mixin, this.name, '{{var}}n', (new this.resources.media()).wrap(style, 1));
        return mixin.render(this.resources.settings.outputStyle);
    }
}

module.exports = Size;