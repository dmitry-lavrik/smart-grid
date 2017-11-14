class Shift{
    
    constructor(resources, name, postfix = '') {
        this.resources = resources;
        this.name = postfix === '' ? name : name + '-' + postfix;
        this.postfix = postfix;
        
        this.map = [
            {
                name: '',
                props: ['margin-left', 'margin-right']
            },
            {
                name: '-left',
                props: ['margin-left']
            },
            {
                name: '-right',
                props: ['margin-right']
            },
            {
                name: '-padding',
                props: ['padding-left', 'padding-right']
            },
            {
                name: '-padding-left',
                props: ['padding-left']
            },
            {
                name: '-padding-right',
                props: ['padding-right']
            }
        ];
    }
    
    render(){
        let mixins = '';
        let mediaPostfix = this.postfix === '' ? '' : '_' + this.postfix;

        for(let i = 0; i < this.map.length; i++){
            let styles = '';

            if(this.resources.helpers.isPercentage(this.resources.settings.offset)){
                for(let j = 0; j < this.map[i].props.length; j++){
                    if(j > 0){
                        styles += '\n';
                    }
                    
                    styles += this.resources.styles.objToCallMedia(this.postfix, {
                        [this.map[i].props[j]]: `{{var}}atom * {{var}}n + {{var}}offset${mediaPostfix}_one_side`
                    });
                }
            }
            else if(this.resources.settings.detailedCalc){
                styles += `{{var}}val{{=}}{{i}}calc(100% / {{string-var}}columns{{/string-var}} * {{string-var}}n{{/string-var}} + {{string-var}}offset${mediaPostfix}_one_side{{/string-var}}){{/i}}{{;}}\n`;
                
                for(let j = 0; j < this.map[i].props.length; j++){
                    if(j > 0){
                        styles += '\n';
                    }
                    
                    styles += this.resources.styles.objToCallMedia(this.postfix, {
                        [this.map[i].props[j]]: '{{var}}val'
                    });
                }
            }
            else{
                styles += `{{var}}val{{=}}100% / {{var}}columns * {{var}}n{{;}}\n`;
                
                for(let j = 0; j < this.map[i].props.length; j++){
                    if(j > 0){
                        styles += '\n';
                    }
                    
                    styles += this.resources.styles.objToCallMedia(this.postfix, {
                        [this.map[i].props[j]]: `{{i}}calc({{string-var}}val{{/string-var}} + {{string-var}}offset${mediaPostfix}_one_side{{/string-var}}){{/i}}`
                    });
                }
            }
            
            let mixin = new this.resources.mixin(this.resources.patterns.mixin, this.name + this.map[i].name, '{{var}}n', (new this.resources.media()).wrap(styles, 1));
            mixins += mixin.render(this.resources.settings.outputStyle) + '\n\n';
        }
        
        
        return mixins;
    }
}

module.exports = Shift;