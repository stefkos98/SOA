function main(params) {
    var result = params.text.match( /[^\.!\?]+[\.!\?]+/g );
    return {
        array: result
    };
}