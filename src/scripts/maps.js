const emojis = {
    "-": " ",
    "_": " ",
    O: "🏠",
    X: "🌳",
    I: "🐟",
    E: "🐕‍🦺",
    PLAYER: "🐈",
    BOMB_COLLISION: "🔥",
    GAME_OVER: "👎",
    WIN: "🏆",
    HEART: '🧡'
};

const maps = [];
//1
maps.push(`
    XXXXXXX--I
    X-------X-
    X-XX-XX-X-
    X-XX-XX---
    ----_---XX
    -X---XX-XX
    -X-X-XX--X
    -XXX-XX-XX
    -------XXX
    OXX-XXXXXX
`);

//2
maps.push(`
    O--XXXXXXX
    X--XXXXXXX
    XX----X--X
    XX-XX-XXXX
    X--XX-_XXX
    X--XXX-XXX
    XX------XX
    XX---XX-XX
    X--X---IXX
    XX---XXXXX
`);

//3
maps.push(`
    I-------XX
    -X-XX-X-XX
    -X-XX-X-XX
    --_----XXX
    XX-XXX-XXX
    XX-----XXX
    XX-XXX-XXX
    XX-XXX-XXX
    XX-----OXX
    XXXXXXXXXX
`);

//4
maps.push(`
    X-------XX
    XX-XX-X-XX
    XX-XX-XIXX
    XX-----XXX
    XX-XXX-XXX
    XX--_--XXX
    XX-XXX-XXX
    XO-XXX-XXX
    XX-----XXX
    XXXXXXXXXX
`);

//5
maps.push(`
    XXXXXXXXXX
    XX-XXIX-XX
    XX-XX-X-XX
    --_----XXX
    XX-XXX--XX
    XX------XX
    XX-XOX-XXX
    XX-XXX-XXX
    XX-----OXX
    XXXXXXXXXX
`);

//6
maps.push(`
    I--XXXXXXX
    -X----X-XX
    -X_XX-X-XX
    ----X--XXX
    XX-XXX-XXX
    XX-------X
    XX-XXX-X-X
    XX-XXX-XXX
    XO-----XXX
    XXXXXXXXXX
`);

//7
maps.push(`
    O--XXX--XX
    -X----X--I
    -X-XX-X-XX
    ---XX---XX
    XX-XXX-XXX
    XX_----XXX
    XX-XXX-XXX
    XX-XXX-XXX
    XX--X--XXX
    XXXXXXXXXX
`);

//8
maps.push(`
    XXX--XXXXX
    XX-XXX--XX
    XXI-----XX
    X-X-XX-XXX
    X--_-----X
    XX-XXX-X-X
    XX-XXX-X-X
    XX-XXX-X-X
    XXO------X
    XXXXXXXXXX
`);

//9
maps.push(`
    XXXXXXXXXX
    XX-XX-X-XX
    XX-XX-X-XX
    ---XX-----
    XX-XXX-XX-
    O------XX-
    XX-XXX_XI-
    XX-XXX-XX-
    XX--------
    XXXXXXXXXX
`);

//10
maps.push(`
    XX--X---XI
    X-X-X-XX--
    -X-XX-X--X
    ---XX---XX
    -X_X-X-XXX
    -X-----XXX
    -X-XXX-XXX
    ---XXX-XXX
    -X-----XX-
    O-XX-XXXX-
`);

//11
maps.push(`
    OX--XXX---
    --XX----X-
    X----XX-X-
    X--XXXX_--
    -X-XI---XX
    XX-X-XX-XX
    ---X-XX--X
    XX-X-XX-XX
    XX-----XXX
    -XX-XXXXXX
`);

//12
maps.push(`
    X-XXOXXXXX
    X----XXXXX
    XX-X-X--XX
    XX------XX
    X--_X-X-XX
    X-X-XX--XX
    XX------XX
    XX---XX-XX
    X--XI--XXX
    XX---XXXXX
`);

//13
maps.push(`
    X-X-----XX
    -X--X-XIXX
    ---XX---X-
    -X-----XX-
    -X-X_X-XX-
    -X--X--XX-
    -X-XXX-XXX
    XX-XXX---X
    XX-----X-X
    XXO-X-XX-X
`);

//14
maps.push(`
    --X-XX--XX
    XX-XX-X-XX
    XX-XX-XXXX
    -X--_-----
    ---XXX-XX-
    -X-----XX-
    ---XXX--X-
    IX-X---XX-
    ---XX-----
    -XXX-OXXXX
`);

//15
maps.push(`
    XXXXXXXXXX
    XXO-----XX
    X--XX-X--X
    --X-X-XX-X
    X--XX-X-XX
    XX-_----X-
    -X-XXX-XX-
    XX-XXX-XXX
    ----X--XXX
    IXXX--XXXX
`);

//16
maps.push(`
    I-----XXXX
    -X-X-_--XX
    -X-XX-X--X
    -X-X---X-X
    ---X-X-X-X
    XX--X-X-OX
    XX-------X
    XX-XXX-XXX
    XX-----XXX
    XXXXXXXXXX
`);

//17
maps.push(`
    X--XXX-OXX
    -X-XX-X--X
    -X----X-XX
    --_X----X-
    XX-X-X--X-
    X-----X--
    XX-X-XX--X
    XX-X-X-XXX
    XX---I-XXX
    XXXXXXXXXX
`);

//18
maps.push(`
    XXX--XXOXX
    X--XXX--XX
    X-X-----XX
    X-X-XXXXXX
    _--------X
    XXXXXX-X-X
    --X-XXXI--
    --XXX-X-X-
    -XX------X
    X-X-XXXX-X
`);

//19
maps.push(`
    XXXXXXX--O
    XX-XX---X-
    XX-XX-XXX-
    ---XX-----
    XX-XXX-XX-
    I-X--X-XX-
    X--XXX-_--
    XX--XX-XX-
    X-X-------
    X-X-XX-XXX
`);

//20
maps.push(`
    XX--O---XX
    X-X-X-XX--
    -X----X--X
    ---XX---XX
    -XXXIX_X-X
    -X-----X-X
    -X-XXX---X
    ---XXX-XXX
    -X----XXX-
    XXXX-XXXXX
`);