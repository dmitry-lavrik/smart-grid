function Mixin(pattern, name, params, content) {
    this.pattern = pattern.toString();
    this.name = name;
    this.params = params;
    this.content = content;    
    
    this.replaces = {
        name: this.name,
        params: this.params,
        content: this.content
    };
}

Mixin.prototype.render = function(){
    var out = this.pattern;
    
    for(var key in this.replaces){
        out = out.replace('{{' + key + '}}', this.replaces[key]);
    }
    
    return out;
}

module.exports.create = Mixin;