function Media(breakPoint, device, condition) {
    this.breakPoint = breakPoint || null;
    this.device = device || 'screen';
    this.condition = condition || 'max-width';
}

Media.prototype.wrap = function (styles, left) {
    var offset = left || 0;
    
    if(this.breakPoint === null){
        if(styles.lastIndexOf("\n") === styles.length - 1){
            styles = styles.substr(0, styles.length - 1);
        }
        
        return this.left(offset) + styles;
    }

    var out = this.left(offset) + "@media " + this.device + " and (" + this.condition + ": " + this.breakPoint + "){{brace}}\n";
    
    var tmp = styles.split("\n");
    
    for(var i = 0; i < tmp.length; i++){
        if(tmp[i].length > 0){
            tmp[i] = this.left(offset + 1) + tmp[i];
        }
    }
    
    out += tmp.join("\n");
    out += this.left(offset) + "{{/brace}}"; 
    return out;
}

Media.prototype.left = function(val){
    var str = '';
    
    for(var i = 0; i < val; i++){
        str += '{{tab}}';
    }
    
    return str;
}

module.exports.gen = Media;