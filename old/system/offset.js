function Offset(resources, media, name, direction) {
    this.resources = resources;
    this.media = media;
    this.name = name;
    this.offset = resources.settings.offset;
    this.value = (100 / resources.settings.columns) + "%";
    this.properties = [];
    
    switch(direction){
        case 'left':
            this.properties.push('margin-left');
            break;
        case 'right':
            this.properties.push('margin-right');
            break;
        case 'same':
            this.properties.push('margin-left');
            this.properties.push('margin-right');
            break;
        case 'left-padding':
            this.properties.push('padding-left');
            break;
        case 'right-padding':
            this.properties.push('padding-right');
            break;
        case 'same-padding':
            this.properties.push('padding-left');
            this.properties.push('padding-right');
            break;
        default:
            throw new Error('what is "' + direction + '" value? We use [left, right, same, left-padding, right-padding or same-padding] directions in offsets.');
    }
}

Offset.prototype.render = function () {
    var style = '{{var}}value{{=}}{{var}}atom * {{var}}n{{;}}\n';
   
    for(var i = 0; i < this.properties.length; i++){
        if(this.resources.helpers.isPercentage(this.offset)){
            style += this.properties[i] + '{{:}}{{var}}value + {{var}}offset_one_side{{;}}\n';
        }
        else{
            style += this.properties[i] + '{{:}}{{i}}calc({{string-var}}value{{/string-var}} + {{string-var}}offset_one_side{{/string-var}}){{/i}}{{;}}\n';
        }
    }

    var mixin = new this.resources.mixin.create(this.resources.patterns.mixin, this.name, '{{var}}n', this.media.wrap(style, 1));
    return mixin.render(this.resources.settings.outputStyle);
};

module.exports.gen = Offset;