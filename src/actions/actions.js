
export function RESET_BOARD(){
    return{
        type: "SET_BOARD",
        tiles
    }
}

/*export function CASCADE_BLANKS(x, y){
    return{
        type: "CASCADE_BLANKS"
    }
}

export function INCREASE_CLICKED(){
    return{
        type: "INCREASE_CLICKED"
    }
}

export function DECREASE_CLICKED(){
    return{
        type: "DECREASE_CLICKED"
    }
}*/

export function FLAGED(x, y){
    return{
        type: "FLAGED",
        x: x,
        y: y
    }
}

export function DIG(x, y){
    return{
        type: "DIG",
        x: x,
        y: y
    }
}

/*export function WON(){
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
}*/