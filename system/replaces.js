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
            '{{;}}': ';'
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
            '{{;}}': ';'
        },
        styl: {
            '{{var}}': '$',
            '{{=}}': ' = ',
            '{{string-var}}': '{$',
            '{{/string-var}}': '}',
            '{{i}}': 's("',
            '{{/i}}': '")',
            '{{before_mixin}}': '',
            '{{call}}': '',
            '{{brace}}': '',
            '{{/brace}}': '',
            '{{:}}': ' ',
            '{{;}}': ''
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
            '{{;}}': ''
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
    
    return out;
}

module.exports.instance = Replaces;