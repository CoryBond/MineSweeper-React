

export function SET_TILES(tiles){
    return{
        type: "SET_TILES",
        tiles
    }
}

export function CASCADE_BLANKS(x, y){
    return{
        type: "CASCADE_BLANKS"
    }
}


export function DECREASE_CLICKED(){
    return{
        type: "DECREASE_CLICKED"
    }
}

export function INCREASE_CLICKED(){
    return{
        type: "INCREASE_CLICKED"
    }
}

export function FLAGED(isFlaged){
    return{
        type: "FLAGED",
        isFlaged
    }
}

export function WON(){
    return{
        type: "WON",
        won: true
    }
}

export function LOST(){
    return{
        type: "LOST",
        gameOver: true
    }
}