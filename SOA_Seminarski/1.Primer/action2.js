function main(params) {
    var result=[];
    params.array.forEach(e => {
        var r=e.split(" ");
        result.push(r.filter(el => el.length>0));
    });
    return {
        mat: result
    };
}