class Styles{
    
    static objToStyles(obj, left = 0) {
        let styles = '';
        let offset = left;

        for (let propetry in obj) {
            styles += this.left(offset) + propetry;

            if (obj[propetry] !== null) {
                styles += '{{:}}' + obj[propetry];
            }

            styles += "{{;}}\n";
        }

        return styles;
    }
    
    static objToCallMedia(callable, obj, left = 0) {
        let styles = '';
        let offset = left;
        let length = 0;
        let properties = [];
        let values = [];
        
        for (let propetry in obj) {
            properties.push(propetry);
            values.push(obj[propetry]);
        }

        if(properties.length === 1){
            styles += this.left(offset);
            
            if(callable === ''){
                styles += `${properties[0]}{{:}}${values[0]}{{;}}`;
            } 
            else{
                styles += `{{call}}${callable}(${properties[0]}, ${values[0]}){{;}}`;
            }
        }
        else if(properties.length > 1){
            
        }

        return styles;
    }
    
    static left(val){
        var str = '';

        for(var i = 0; i < val; i++){
            str += '{{tab}}';
        }

        return str;
    }
}

module.exports = Styles;