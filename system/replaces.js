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

        return out;
    }
}

module.exports = Replaces;