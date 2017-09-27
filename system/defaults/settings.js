module.exports = {
    filename: "smart-grid",
    outputStyle: "less",
    columns: 12,
    offset: "30px",
    mobileFirst: false,
    container: {
        maxWidth: "1280px",
        fields: "30px"
    },
    breakPoints: {
        lg: {
            width: "1200px"
        },
        md: {
            width: "992px",
            fields: "15px"
        },
        sm: {
            width: "720px"
        },
        xs: {
            width: "576px"
        }
    },
    mixinNames: {
        container: "wrapper",
        row: "row-flex",
        rowFloat: "row-float",
        column: "col",
        size: "size",
        columnFloat: "col-float",
        columnPadding: "col-padding",
        offset: "offset",
        reset: "reset",
        clearfix: "clearfix",
        debug: "debug"
    },
    tab: "    "
};