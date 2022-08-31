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

maps.push(`
    XXXXXXXX-I
    X--------X
    X-XX-XXXXX
    X-XX-XXXXX
    ----_XXXXX
    -XXX-XXXXX
    -XXX-XXXXX
    -----XXXXX
    -XXXXXXXXX
    OXXXXXXXXX
`);
  
maps.push(`
    O--XXXXXXX
    X--XXXXXXX
    XX----XXXX
    XX-XX-XXXX
    X--XX-_XXX
    X--XXX-XXX
    XX------XX
    XX--XXX-XX
    XXXX---IXX
    XXXXXXXXXX
`);

maps.push(`
    I-----XXXX
    XX-XX-XXXX
    XX-XX-XXXX
    --_----XXX
    XX-XXX-XXX
    XX-XXX-XXX
    XX-----XXX
    XX-XXXXXXX
    XX-----OXX
    XXXXXXXXXX
`);