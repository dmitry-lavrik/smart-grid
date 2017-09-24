function Size(resources, media, name) {
    this.resources = resources;
    this.media = media;
    this.name = name;
    this.offset = resources.settings.offset;
    this.value = (100 / resources.settings.columns) + "%";
}

Size.prototype.render = function () {
    var style = '{{var}}value{{=}}{{var}}atom * {{var}}n{{;}}\n';

    if(this.resources.helpers.isPercentage(this.offset)){
        style +=  'width{{:}}{{var}}value - {{var}}offset{{;}}\n';
    }
    else{
        style += 'width{{:}}{{i}}calc({{string-var}}value{{/string-var}} - {{string-var}}offset{{/string-var}}){{/i}}{{;}}\n';
    }

    var mixin = new this.resources.mixin.create(this.resources.patterns.mixin, this.name, '{{var}}n', this.media.wrap(style, 1));
    return mixin.render(this.resources.settings.outputStyle);
};

module.exports.gen = Size;