function Styles() {

}

Styles.prototype.objToStyles = function (obj, left) {
    var styles = '';
    var offset = left || 0;

    for (var propetry in obj) {
        styles += this.left(offset) + propetry;

        if (obj[propetry] !== null) {
            styles += '{{:}}' + obj[propetry];
        }

        styles += "{{;}}\n";
    }
    
    return styles;
};

Styles.prototype.left = function(val){
    var str = '';
    
    for(var i = 0; i < val; i++){
        str += '{{tab}}';
    }
    
    return str;
}

module.exports.instance = Styles;