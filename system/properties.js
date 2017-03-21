function Properties(resources) {
    this.resources = resources;
}

Properties.prototype.render = function (media, name) {
    var out = '';
    var properties = this.resources.settings.properties;

    var nameD = (name === '') ? '' : ('-' + name);

    for (var i = 0; i < properties.length; i++) {
        var styles = properties[i] + "{{:}}{{var}}value{{;}}\n";
        var mix = new this.resources.mixin.create(this.resources.patterns.mixin, properties[i] + nameD, '{{var}}value', media.wrap(styles, 1));
        out += mix.render(this.resources.settings.outputStyle) + "\n";
    }
    
    if(name !== ''){
        var styles = "{{string-var}}name{{/string-var}}{{:}}{{var}}value{{;}}\n";
        var mix = new this.resources.mixin.create(this.resources.patterns.mixin, name, '{{var}}name, {{var}}value', media.wrap(styles, 1));
        out += mix.render(this.resources.settings.outputStyle) + "\n";
    }
    
    if(name !== ''){
        var styles = "{{block-content-extract}}{{;}}\n";
        var mix = new this.resources.mixin.create(this.resources.patterns.mixin, name + '-block', '{{block-content-var}}', media.wrap(styles, 1));
        out += mix.render(this.resources.settings.outputStyle) + "\n";
    }
    
    return out; 
}

module.exports.instance = Properties;