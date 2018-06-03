class Replaces {
    constructor(resources) {
        this.resources = resources;
    }

    all(str, style) {
        let replaces = {
            less: {
                '{{var}}': '@',
                '{{=}}': ': ',
                '{{string-var}}': '@{',
                '{{/string-var}}': '}',
                '{{i}}': '~"',
                '{{/i}}': '"',
                '{{before_mixin}}': '.',
                '{{call}}': '.',
                '{{call_with_content}}': '.',
                '{{brace}}': '{',
                '{{/brace}}': '}',
                '{{:}}': ': ',
                '{{;}}': ';',
                '{{block-content-var-delimeter}}': ', ',
                '{{block-content-var}}': '@content',
                '{{block-content-extract}}': '@content()',
                '{{block_callable_brace}}': '({\n',
                '{{/block_callable_brace}}': '});'
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
                '{{call_with_content}}': '@include ',
                '{{brace}}': '{',
                '{{/brace}}': '}',
                '{{:}}': ': ',
                '{{;}}': ';',
                '{{block-content-var-delimeter}}': '',
                '{{block-content-var}}': '',
                '{{block-content-extract}}': '@content',
                '{{block_callable_brace}}': '(){\n',
                '{{/block_callable_brace}}': '}'
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
                '{{call_with_content}}': '+',
                '{{brace}}': '',
                '{{/brace}}': '',
                '{{:}}': ' ',
                '{{;}}': '',
                '{{block-content-var-delimeter}}': '',
                '{{block-content-var}}': '',
                '{{block-content-extract}}': '{block}',
                '{{block_callable_brace}}': '()\n',
                '{{/block_callable_brace}}': ''
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
                '{{call_with_content}}': '+',
                '{{brace}}': '',
                '{{/brace}}': '',
                '{{:}}': ': ',
                '{{;}}': '',
                '{{block-content-var-delimeter}}': '',
                '{{block-content-var}}': '',
                '{{block-content-extract}}': '@content',
                '{{block_callable_brace}}': '()\n',
                '{{/block_callable_brace}}': ''
            }
        };

        if (replaces[style] === undefined) {
            throw new Error("smartgrid doesn't have output style \"" + style + "\"");
        }

        let active = replaces[style];
        active['{{tab}}'] = this.resources.settings.tab;

        let out = str;

        for (let key in active) {
            let tmp = out.split(key);
            out = tmp.join(active[key]);
        }

        if (style === 'styl') {
            let pattern = new RegExp(replaces.styl['{{i}}'] + '(.+?)' + replaces.styl['{{/i}}'], 'g');
            let pattern_let = new RegExp("\{(.+?)\}", 'g');

            let ol = replaces.styl['{{i}}'].length;
            let cl = replaces.styl['{{/i}}'].length;

            out = out.replace(pattern, function (a) {
                let clear = a.substr(ol, a.length - ol - cl);
                let one = '';
                let lets = [];

                clear = clear.replace(pattern_let, function (a) {
                    lets.push(a.substr(1, a.length - 2));
                    return '%s';
                });

                one = '"' + clear + '" % (' + lets.join(' ') + ')';

                return one;
            });
        }

        out = out.replace('{{device}}', this.resources.settings.defaultMediaDevice, 'g');

        return out;
    }
    
    fixLines(str){
        let reg = new RegExp(`\n(${this.resources.settings.tab})*\n\n`, 'g');
        
        str = str.replace(/\r\n/g, '\n');
                
        while(str.match(reg) !== null){
            str = str.replace(reg, '\n\n');
        }
        
        return str;
    }
}

module.exports = Replaces;