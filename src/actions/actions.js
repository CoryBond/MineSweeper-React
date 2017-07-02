
export function RESET_BOARD(){
    return{
        type: "SET_BOARD",
        tiles
    }
}

export function PRE_FLAG(){
    return{
        type: "PRE_FLAG"
    }
}

export function PRE_DIG(){
    return{
        type: "PRE_DIG"
    }
}

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