class Helpers{
    static smartCalc(w, o, operation){
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
    }
    
    static parseUnit(str){
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
    
    static isPixel(str){
        return str.substr(-2) === 'px';
    }

    static isPercentage(str){
        return str.substr(-1) === '%';
    }

    static isRem(str){
        return str.substr(-3) === 'rem';
    }

    static math(a, b, op){
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
}

module.exports = Helpers;