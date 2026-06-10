function findKing(color){

    for(let row=0; row<8; row++){

        for(let col=0; col<8; col++){

            const piece = board[row][col];

            if(piece === color + "k"){

                return {
                    row,
                    col
                };

            }

        }

    }

    return null;

}

function isSquareAttacked(
    row,
    col,
    attackerColor
){

    for(let r=0; r<8; r++){

        for(let c=0; c<8; c++){

            const piece =
            board[r][c];

            if(!piece)
            continue;

            if(
                piece[0] !== attackerColor
            )
            continue;

            const moves =
            getPseudoLegalMoves(
                r,
                c
            );

            for(
                const move of moves
            ){

                if(
                    move[0] === row &&
                    move[1] === col
                ){

                    return true;

                }

            }

        }

    }

    return false;

}

function isKingInCheck(color){

    const king =
    findKing(color);

    if(!king)
    return false;

    const enemy =
    color === "w"
    ? "b"
    : "w";

    return isSquareAttacked(
        king.row,
        king.col,
        enemy
    );

}

function simulateMove(
    fromRow,
    fromCol,
    toRow,
    toCol
){

    const movingPiece =
    board[fromRow][fromCol];

    const capturedPiece =
    board[toRow][toCol];

    board[toRow][toCol] =
    movingPiece;

    board[fromRow][fromCol] =
    null;

    return {

        undo(){

            board[fromRow][fromCol] =
            movingPiece;

            board[toRow][toCol] =
            capturedPiece;

        }

    };

}

function getLegalMovesFiltered(
    row,
    col
){

    const piece =
    board[row][col];

    if(!piece)
    return [];

    const color =
    piece[0];

    const pseudoMoves =
    getPseudoLegalMoves(
        row,
        col
    );

    const legalMoves = [];

    for(
        const move of pseudoMoves
    ){

        const simulation =
        simulateMove(
            row,
            col,
            move[0],
            move[1]
        );

        const check =
        isKingInCheck(
            color
        );

        simulation.undo();

        if(!check){

            legalMoves.push(
                move
            );

        }

    }

    return legalMoves;

}

function hasAnyLegalMove(color){

    for(let row=0; row<8; row++){

        for(let col=0; col<8; col++){

            const piece =
            board[row][col];

            if(!piece)
            continue;

            if(
                piece[0] !== color
            )
            continue;

            const moves =
            getLegalMovesFiltered(
                row,
                col
            );

            if(
                moves.length > 0
            ){

                return true;

            }

        }

    }

    return false;

}

function isCheckmate(color){

    return (
        isKingInCheck(color)
        &&
        !hasAnyLegalMove(color)
    );

}

function isStalemate(color){

    return (
        !isKingInCheck(color)
        &&
        !hasAnyLegalMove(color)
    );

}