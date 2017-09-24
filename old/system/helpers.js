function Helpers(){
    
}

Helpers.prototype.smartCalc = function(w, o, operation){
    var output = "";
    var width = this.parseUnit(w);
    var offset = this.parseUnit(o);
    
    if(width.unit === offset.unit){
        var value = this.math(width.value, offset.value, operation);
        output = value + width.unit;
    }
    else{
        output = 'calc(' + width.value + width.unit + ' ' + operation + ' {{string-var}}offset{{/string-var}})';
    }
    
    return output;
};

Helpers.prototype.parseUnit = function(str){
    var res = {};
    
    if(this.isPixel(str)){
        res.value = str.substr(0, str.length - 2);
        res.unit = 'px';
    }
    else if(this.isPercentage(str)){
        res.value = str.substr(0, str.length - 1);
        res.unit = '%';
    }
    else if(this.isRem(str)){
        res.value = str.substr(0, str.length - 3);
        res.unit = 'rem';
    }
    else{
        throw new Error('what is "' + str + '" value? We use px, % and rem.');
    }
    
    return res;
}

Helpers.prototype.isPixel = function(str){
    return str.substr(-2) === 'px';
}

Helpers.prototype.isPercentage = function(str){
    return str.substr(-1) === '%';
}

Helpers.prototype.isRem = function(str){
    return str.substr(-3) === 'rem';
}

Helpers.prototype.math = function(a, b, op){
    var res = null;
    
    switch(op){
        case '+':
            res = +a + b;
            break;
        case '-':
            res = a - b;
            break;
        case '*':
            res = a * b;
            break;
        case '/':
            res = a / b;
            break;
    }
    
    return res;
}

module.exports.instance = Helpers;