class Mixin{
    constructor(pattern, name, params, content){
        this.pattern = pattern.toString();

        this.replaces = {
            name: name,
            params: params,
            content: content
        };
    }
    
    render(){
        let out = this.pattern;
    
        for(let key in this.replaces){
            out = out.replace('{{' + key + '}}', this.replaces[key]);
        }

        return out;
    }
}

module.exports = Mixin;