module.exports = {
    filename: "_smart-grid",
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
        rowInlineBlock: "row-ib",
        rowOffsets: "row-offsets",
        column: "col",
        size: "size",
        columnFloat: "col-float",
        columnInlineBlock: "col-ib",
        columnPadding: "col-padding",
        columnOffsets: "col-offsets",
        shift: "shift",
        from: "from",
        to: "to",
        fromTo: "from-to",
        reset: "reset",
        clearfix: "clearfix",
        debug: "debug",
        uRowFlex: "u-row-flex",
        uColumn: "u-col",
        uSize: "u-size"
    },
    tab: "    ",
    defaultMediaDevice: "screen",
    detailedCalc: false
};
