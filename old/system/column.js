function Column(resources, name, postfix, num) {
    this.resources = resources;
    this.name = name;
    this.postfix = postfix;
    this.num = num;
}

Column.prototype.render = function () {
    var style = "{{tab}}{{call}}" + this.resources.settings.mixinNames.size + this.postfix + "(" + this.num + ")" + "{{;}}";
    var mixin = new this.resources.mixin.create(this.resources.patterns.mixin, this.name + this.postfix + '-' + this.num, '', style);
    return mixin.render(this.resources.settings.outputStyle);
};

module.exports.gen = Column;