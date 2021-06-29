function main(params) {
    let unigram = [];
    let bigram = [];
    let trigram = [];
    let kvadrigram = [];

    let pom = " ";
    let l = 1;

    let pom3 = " ";
    let l3 = 1;

    let pom4 = " ";
    let l4 = 1;
    for (let i = 0; i < params.text.length; i++) {
        if ((/[a-zA-Z]/).test(params.text[i]) || (/[^\u0000-\u00ff]/).test(params.text[i]) || (/ /).test(params.text[i])) {
            unigram.push(params.text[i].toLowerCase());
            if (l == 1) {
                pom += params.text[i].toLowerCase();
                bigram.push(pom);
                l = 0;
            }
            else if (l == 0) {
                pom = pom[1] + params.text[i].toLowerCase();
                bigram.push(pom);
                l = 0;
            }
            if (l3 == 1) {
                pom3 += params.text[i].toLowerCase();
                l3 = 2;
            }
            else if (l3 == 2) {
                pom3 += params.text[i].toLowerCase();
                trigram.push(pom3);
                l3 = 0;
            }
            else if (l3 == 0) {
                pom3 = pom3[1] + pom3[2] + params.text[i].toLowerCase();
                trigram.push(pom3);
                l3 = 0;
            }
            if (l4 == 1) {
                pom4 += params.text[i].toLowerCase();
                l4 = 2;
            }
            else if (l4 == 2) {
                pom4 += params.text[i].toLowerCase();
                l4 = 3;
            }
            else if (l4 == 3) {
                pom4 += params.text[i].toLowerCase();
                kvadrigram.push(pom4);
                l4 = 0;
            }
            else if (l4 == 0) {
                pom4 = pom4[1] + pom4[2] + pom4[3] + params.text[i].toLowerCase();
                kvadrigram.push(pom4);
                l4 = 0;
            }
        }
    }
    if (!(pom === " ")) {
        pom = pom[1] + " ";
        bigram.push(pom);
    }
    if (l3 == 2) {
        pom3 += " ";
        trigram.push(pom3);
    }
    else if (!(pom3 === " ")) {
        pom3 = pom3[1] + pom3[2] + " ";
        trigram.push(pom3);
        pom3 = pom3[1] + " " + " ";
        trigram.push(pom3);
    }
    if (l4 == 2) {
        pom4 += " " + " ";
        kvadrigram.push(pom4);
    }
    else if (l4 == 3) {
        pom4 += " ";
        kvadrigram.push(pom4);
    }
    else if (!(pom4 === " ")) {
        pom4 = pom4[1] + pom4[2] + pom4[3] + " ";
        kvadrigram.push(pom4);
        pom4 = pom4[1] + pom4[2] + " " + " ";
        kvadrigram.push(pom4);
        pom4 = pom4[1] + " " + " " + " ";
        kvadrigram.push(pom4);
    }
    return {
        unigram: unigram,
        bigram: bigram,
        trigram: trigram,
        kvadrigram: kvadrigram
    };
}