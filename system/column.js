function Column(resources, media, name, num) {
    this.resources = resources;
    this.media = media;
    this.name = name + '-' + num;
    this.offset = resources.settings.offset;
    this.width = ((100 / resources.settings.columns) * num) + "%";
}

Column.prototype.render = function () {
    var width = '{{i}}' + this.resources.helpers.smartCalc(this.width, this.offset, '-') + '{{/i}}';
    var style = this.resources.styles.objToStyles({width: width});
    var mixin = new this.resources.mixin.create(this.resources.patterns.mixin, this.name, '', this.media.wrap(style, 1));
    return mixin.render(this.resources.settings.outputStyle);
};

module.exports.gen = Column;