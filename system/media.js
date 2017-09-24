class Media{
    
    constructor(breakPoint = null, condition = 'max-width', device = 'screen') {
        this.breakPoint = breakPoint;
        this.condition = condition;
        this.device = device;
    }
    
    wrap(styles, left) {
        var offset = left || 0;

        var start = '';
        var end = '';

        if(this.breakPoint === null){
            if(styles.lastIndexOf("\n") === styles.length - 1){
                styles = styles.substr(0, styles.length - 1);
            }
        }
        else{
            start = this.left(offset) + "@media " + this.device + " and (" + this.condition + ": " + this.breakPoint + "){{brace}}\n";
            end = this.left(offset) + "{{/brace}}";
            offset++;
        }

        var tmp = styles.split("\n");

        for(var i = 0; i < tmp.length; i++){
            if(tmp[i].length > 0){
                tmp[i] = this.left(offset) + tmp[i];
            }
        }

        start += tmp.join("\n");
        start += end;
        
        return start;
    }
    
    left(val){
        var str = '';

        for(var i = 0; i < val; i++){
            str += '{{tab}}';
        }

        return str;
    }
}

module.exports = Media;