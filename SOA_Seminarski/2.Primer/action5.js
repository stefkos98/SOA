function main(params) {
    var h = [];

    for (let j = 0; j < params.unigram.length; j++) {
        function f(e) {
            return e.key === params.unigram[j];
        }
        var i = h.findIndex(f);
        var g = h.find(f);
        var num = 1;
        if (g != undefined)
            num = g.number + 1;
        if (i == -1) {
            h.push({ key: params.unigram[j], number: 1 });
        }
        else {
            h.splice(i, 1, { key: g.key, number: num });
        }
    }
    for (let j = 0; j < params.bigram.length; j++) {
        function f(e) {
            return e.key === params.bigram[j];
        }
        var i = h.findIndex(f);
        var g = h.find(f);
        var num = 1;
        if (g != undefined)
            num = g.number + 1;
        if (i == -1) {
            h.push({ key: params.bigram[j], number: 1 });
        }
        else {
            h.splice(i, 1, { key: g.key, number: num });
        }
    }
    for (let j = 0; j < params.trigram.length; j++) {
        function f(e) {
            return e.key === params.trigram[j];
        }
        var i = h.findIndex(f);
        var g = h.find(f);
        var num = 1;
        if (g != undefined)
            num = g.number + 1;
        if (i == -1) {
            h.push({ key: params.trigram[j], number: 1 });
        }
        else {
            h.splice(i, 1, { key: g.key, number: num });
        }
    }
    for (let j = 0; j < params.kvadrigram.length; j++) {
        function f(e) {
            return e.key === params.kvadrigram[j];
        }
        var i = h.findIndex(f);
        var g = h.find(f);
        var num = 1;
        if (g != undefined)
            num = g.number + 1;
        if (i == -1) {
            h.push({ key: params.kvadrigram[j], number: 1 });
        }
        else {
            h.splice(i, 1, { key: g.key, number: num });
        }
    }
    function compareNumbers(a, b) {
        return b.number - a.number;
    }
    let h1 = h.sort(compareNumbers);
    return {
        h: h
    };
}