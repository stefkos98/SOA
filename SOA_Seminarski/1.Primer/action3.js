function main(params) {
    var numbers=[];
    params.mat.forEach(e => {
        numbers.push(e.length);
    });
    return {
        numbers: numbers
    };
}