const ORDINATEUR = 2;
const HUMAIN = 1;

const PROFONDEUR_ARBRE = 10;

var player = HUMAIN;
var plateau = [[0,0,0],[0,0,0],[0,0,0]];

var coup = 0;

$('.case').click(
    function() {
        if (player == HUMAIN) {
            player = ORDINATEUR;
            var id = $(this).attr('id');
            $(this).css('background-color', 'red');
            plateau[Math.trunc(id/10)][id%10] = HUMAIN;
            //console.log(evaluation(plateau));
            if (finPartie(plateau)) {
                if (evaluation(plateau)) {
                    $('#info').html('Partie remportée par toi');
                } else {
                    $('#info').html('Partie nulle');
                }
            } else {
                $('#info').html('A l\'ordinateur de jouer');
                computerPlay(plateau, PROFONDEUR_ARBRE);
            }
        }
    }
);

function computerPlay(p, profondeur) {
    //var bestCoup = maxScoreCoup(p, profondeur, true);
    var MIN_VALUE = -10000;
    var MAX_VALUE = 10000;

    coup = 0;
    //var bestCoup = bestCoupAlphaBeta(p, profondeur, ORDINATEUR, MIN_VALUE, MAX_VALUE);
    var bestCoup = alphaBeta(p, profondeur, MIN_VALUE, MAX_VALUE, true);

    var maxL = bestCoup[1];
    var maxC = bestCoup[2];

    plateau[maxL][maxC] = ORDINATEUR;
    $('#'+maxL+maxC).css('background-color', 'blue');
    if (finPartie(plateau)) {
        if (evaluation(plateau)) {
            $('#info').html('Partie remportée par l\'ordinateur');
        } else {
            $('#info').html('Partie nulle');
        }
    } else {
        player = HUMAIN;
        $('#info').html('A toi de jouer');
    }
}

function finPartie(plateau_a_tester) {
    for (var i = 0; i < 3; i++) {
        if (plateau_a_tester[i][0] != 0 && plateau_a_tester[i][0] == plateau_a_tester[i][1] && plateau_a_tester[i][0] == plateau_a_tester[i][2]) {
            return true;
        } else if (plateau_a_tester[0][i] != 0 && plateau_a_tester[0][i] == plateau_a_tester[1][i] && plateau_a_tester[0][i] == plateau_a_tester[2][i]) {
            return true;
        } else if (plateau_a_tester[0][0] != 0 && plateau_a_tester[0][0] == plateau_a_tester[1][1] && plateau_a_tester[0][0] == plateau_a_tester[2][2]) {
            return true;
        } else if (plateau_a_tester[0][2] != 0 && plateau_a_tester[0][2] == plateau_a_tester[1][1] && plateau_a_tester[0][2] == plateau_a_tester[2][0]) {
            return true;
        }
    }
    for (var j = 0; j < 3; j++) {
        for (var k = 0; k < 3; k++) {
            if (plateau_a_tester[j][k] == 0) {
                return false;
            }
        }
    }
    return true;
}

function evaluation(plateau_a_evaluer) {
    var nb_1_PC = 0;
    var nb_2_PC = 0;
    var nb_3_PC = 0;
    var nb_1_HU = 0;
    var nb_2_HU = 0;
    var nb_3_HU = 0;

    //Lignes
    for (var t = 0; t < 3; t++) {
        var pPC = 0;
        var pHU = 0;
        for (var s = 0; s < 3; s++) {
            pHU += plateau_a_evaluer[t][s] == HUMAIN ? 1 : 0;
            pPC += plateau_a_evaluer[t][s] == ORDINATEUR ? 1 : 0;
        }
        if (pHU == 1 && !pPC) {
            nb_1_HU++;
        } else if (pHU == 2 && !pPC) {
            nb_2_HU++;
        } else if (pHU == 3 && !pPC) {
            nb_3_HU++;
        } else if (pPC == 1 && !pHU) {
            nb_1_PC++;
        } else if (pPC == 2 && !pHU) {
            nb_2_PC++;
        } else if (pPC == 3 && !pHU) {
            nb_3_PC++;
        }
    }

    //Colonnes
    for (var s = 0; s < 3; s++) {
        pPC = 0;
        pHU = 0;
        for (var t = 0; t < 3; t++) {
            pHU += plateau_a_evaluer[t][s] == HUMAIN ? 1 : 0;
            pPC += plateau_a_evaluer[t][s] == ORDINATEUR ? 1 : 0;
        }
        if (pHU == 1 && !pPC) {
            nb_1_HU++;
        } else if (pHU == 2 && !pPC) {
            nb_2_HU++;
        } else if (pHU == 3 && !pPC) {
            nb_3_HU++;
        } else if (pPC == 1 && !pHU) {
            nb_1_PC++;
        } else if (pPC == 2 && !pHU) {
            nb_2_PC++;
        } else if (pPC == 3 && !pHU) {
            nb_3_PC++;
        }
    }

    //Diagonale
    pPC = 0;
    pHU = 0;
    for (var s = 0; s < 3; s++) {
        pHU += plateau_a_evaluer[s][s] == HUMAIN ? 1 : 0;
        pPC += plateau_a_evaluer[s][s] == ORDINATEUR ? 1 : 0;
    }

    if (pHU == 1 && !pPC) {
        nb_1_HU++;
    } else if (pHU == 2 && !pPC) {
        nb_2_HU++;
    } else if (pHU == 3 && !pPC) {
        nb_3_HU++;
    } else if (pPC == 1 && !pHU) {
        nb_1_PC++;
    } else if (pPC == 2 && !pHU) {
        nb_2_PC++;
    } else if (pPC == 3 && !pHU) {
        nb_3_PC++;
    }

    pPC = 0;
    pHU = 0;
    pHU += plateau_a_evaluer[0][2] == HUMAIN ? 1 : 0;
    pHU += plateau_a_evaluer[1][1] == HUMAIN ? 1 : 0;
    pHU += plateau_a_evaluer[2][0] == HUMAIN ? 1 : 0;
    pPC += plateau_a_evaluer[0][2] == ORDINATEUR ? 1 : 0;
    pPC += plateau_a_evaluer[1][1] == ORDINATEUR ? 1 : 0;
    pPC += plateau_a_evaluer[2][0] == ORDINATEUR ? 1 : 0;
    if (pHU == 1 && !pPC) {
        nb_1_HU++;
    } else if (pHU == 2 && !pPC) {
        nb_2_HU++;
    } else if (pHU == 3 && !pPC) {
        nb_3_HU++;
    } else if (pPC == 1 && !pHU) {
        nb_1_PC++;
    } else if (pPC == 2 && !pHU) {
        nb_2_PC++;
    } else if (pPC == 3 && !pHU) {
        nb_3_PC++;
    }

    if (nb_3_HU > 0) return -1000;
    if (nb_3_PC > 0) return 1000;
    return 10*nb_1_PC + 30*nb_2_PC - 10*nb_1_HU - 30*nb_2_HU;
}

function debug(p) {
    for (r = 0; r < 3; r++) {
        console.debug(p[r][0] + ' - ' + p[r][1] + ' - ' + p[r][2])
    }
}

function alphaBeta(p, profondeur, alpha, beta, maximisingPlayer) {
    var bestValue;
    var bestL = -1;
    var bestC = -1;
    var coupsPossible = [];
    for (var r = 0; r < 3; r++) {
        for (var d = 0; d < 3; d++) {
            if (p[r][d] == 0) {
                coupsPossible.push([r, d]);
            }
        }
    }
    coup++;

    if (finPartie(p) || profondeur == 0) {
        //bestValue = evaluation(p);
        return [evaluation(p), bestL, bestC];
    }
    else if (maximisingPlayer) {
        bestValue = alpha;
        // Recurse for all children of node.
        for (var i = 0; i < coupsPossible.length; i++) {
            var p1 = p;
            p1[coupsPossible[i][0]][coupsPossible[i][1]] = ORDINATEUR;
            var childValue = alphaBeta(p1, profondeur -1, bestValue, beta, false)[0];


            //bestValue = Math.max(bestValue, childValue);
            if (childValue > bestValue) {
                bestValue = childValue;
                bestL = coupsPossible[i][0];
                bestC = coupsPossible[i][1];
            }
            // console.log(tiret(profondeur) + ' PC ', coupsPossible[i][0], coupsPossible[i][1],  bestValue);
            p1[coupsPossible[i][0]][coupsPossible[i][1]] = 0;
            if (beta <= bestValue) {
                break;
            }
        }
    }
    else {
        bestValue = beta;

        // Recurse for all children of node.
        for (var i = 0; i < coupsPossible.length; i++) {
            var p2 = p;
            p2[coupsPossible[i][0]][coupsPossible[i][1]] = HUMAIN;
            var childValue = alphaBeta(p2, profondeur -1,alpha, bestValue, true)[0];
            //bestValue = Math.min(bestValue, childValue);



            if (childValue < bestValue) {
                bestValue = childValue;
                bestL = coupsPossible[i][0];
                bestC = coupsPossible[i][1];
            }
            // console.log(tiret(profondeur) + ' HU', coupsPossible[i][0], coupsPossible[i][1], bestValue);
            p2[coupsPossible[i][0]][coupsPossible[i][1]] = 0;
            if (bestValue <= alpha) {
                break;
            }
        }
    }
    return [bestValue, bestL, bestC];
}

function tiret(p) {
    var t = '';
    for (var f = 0; f < Math.abs(PROFONDEUR_ARBRE - p); f++) {
        t = t + '---';
    }
    return t;
}