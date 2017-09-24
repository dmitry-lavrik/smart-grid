function Replaces(resources) {
    this.resources = resources;
}

Replaces.prototype.all = function(str, style){
    var replaces = {
        less: {
            '{{var}}': '@',
            '{{=}}': ': ',
            '{{string-var}}': '@{',
            '{{/string-var}}': '}',
            '{{i}}': '~"',
            '{{/i}}': '"',
            '{{before_mixin}}': '.',
            '{{call}}': '.',
            '{{brace}}': '{',
            '{{/brace}}': '}',
            '{{:}}': ': ',
            '{{;}}': ';',
            '{{block-content-var}}': '@content',
            '{{block-content-extract}}': '@content()'
        },
        scss: {
            '{{var}}': '$',
            '{{=}}': ': ',
            '{{string-var}}': '#{$',
            '{{/string-var}}': '}',
            '{{i}}': '#{',
            '{{/i}}': '}',
            '{{before_mixin}}': '@mixin ',
            '{{call}}': '@include ',
            '{{brace}}': '{',
            '{{/brace}}': '}',
            '{{:}}': ': ',
            '{{;}}': ';',
            '{{block-content-var}}': '',
            '{{block-content-extract}}': '@content'
        },
        styl: {
            '{{var}}': '$',
            '{{=}}': ' = ',
            '{{string-var}}': '{$',
            '{{/string-var}}': '}',
            '{{i}}': 'iopen',
            '{{/i}}': 'iclose',
            '{{before_mixin}}': '',
            '{{call}}': '',
            '{{brace}}': '',
            '{{/brace}}': '',
            '{{:}}': ' ',
            '{{;}}': '',
            '{{block-content-var}}': 'content',
            '{{block-content-extract}}': '{content}'
        },
        sass: {
            '{{var}}': '$',
            '{{=}}': ': ',
            '{{string-var}}': '#{$',
            '{{/string-var}}': '}',
            '{{i}}': '#{',
            '{{/i}}': '}',
            '{{before_mixin}}': '=',
            '{{call}}': '+',
            '{{brace}}': '',
            '{{/brace}}': '',
            '{{:}}': ': ',
            '{{;}}': '',
            '{{block-content-var}}': '',
            '{{block-content-extract}}': '@content'
        }
    };
    
    if(replaces[style] === undefined){
        throw new Error("smartgrid doesn't have output style \"" + style + "\"");
    }
    
    var active = replaces[style];
    active['{{tab}}'] = this.resources.settings.tab;
    
    var out = str;
    
    for(var key in active){
        var tmp = out.split(key);
        out = tmp.join(active[key]);
    }
    
    if(style === 'styl'){
        var pattern = new RegExp(replaces.styl['{{i}}'] + '(.+?)' + replaces.styl['{{/i}}'], 'g');
        var pattern_var = new RegExp("\{(.+?)\}", 'g');
        
        var ol = replaces.styl['{{i}}'].length;
        var cl = replaces.styl['{{/i}}'].length;

        out = out.replace(pattern, function (a){ 
            var clear = a.substr(ol, a.length - ol - cl);
            var one = '';
            var vars = [];

            clear = clear.replace(pattern_var, function(a){
                vars.push(a.substr(1, a.length - 2));
                return '%s';
            });
            
            one = '"' + clear + '" % (' + vars.join(' ') + ')'; 
            
            return one;
        });
    }
    
    return out;
}

module.exports.instance = Replaces;