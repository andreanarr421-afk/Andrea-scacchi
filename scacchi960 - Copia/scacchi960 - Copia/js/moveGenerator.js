function insideBoard(row,col){

    return (
        row >= 0 &&
        row < 8 &&
        col >= 0 &&
        col < 8
    );

}

function isEnemy(piece,color){

    if(!piece) return false;

    return piece[0] !== color;

}

function isFriend(piece,color){

    if(!piece) return false;

    return piece[0] === color;

}

function getPseudoLegalMoves(row,col){

    const piece = board[row][col];

    if(!piece) return [];

    const color = piece[0];

    const type = piece[1];

    const moves = [];

    if(type === "p"){

        const dir =
        color === "w" ? -1 : 1;

        const startRow =
        color === "w" ? 6 : 1;

        const oneStep =
        row + dir;

        if(
            insideBoard(oneStep,col) &&
            !board[oneStep][col]
        ){

            moves.push([oneStep,col]);

            if(row === startRow){

                const twoStep =
                row + dir * 2;

                if(!board[twoStep][col]){

                    moves.push([twoStep,col]);

                }

            }

        }

        for(const dc of [-1,1]){

            const r = row + dir;
            const c = col + dc;

            if(
                insideBoard(r,c) &&
                board[r][c] &&
                isEnemy(board[r][c],color)
            ){

                moves.push([r,c]);

            }

        }

        if(lastMove){

            const enemyPawn =
            color === "w"
            ? "bp"
            : "wp";

            if(
                lastMove.piece === enemyPawn &&
                Math.abs(
                    lastMove.fromRow -
                    lastMove.toRow
                ) === 2
            ){

                if(
                    row === lastMove.toRow &&
                    Math.abs(
                        col -
                        lastMove.toCol
                    ) === 1
                ){

                    moves.push([
                        row + dir,
                        lastMove.toCol
                    ]);

                }

            }

        }

    }

    if(type === "n"){

        const jumps = [
            [-2,-1],
            [-2,1],
            [-1,-2],
            [-1,2],
            [1,-2],
            [1,2],
            [2,-1],
            [2,1]
        ];

        for(const jump of jumps){

            const r =
            row + jump[0];

            const c =
            col + jump[1];

            if(!insideBoard(r,c))
            continue;

            if(
                !board[r][c] ||
                isEnemy(board[r][c],color)
            ){

                moves.push([r,c]);

            }

        }

    }

    const bishopDirs = [
        [-1,-1],
        [-1,1],
        [1,-1],
        [1,1]
    ];

    const rookDirs = [
        [-1,0],
        [1,0],
        [0,-1],
        [0,1]
    ];

    if(
        type === "b" ||
        type === "r" ||
        type === "q"
    ){

        let dirs = [];

        if(type === "b")
        dirs = bishopDirs;

        if(type === "r")
        dirs = rookDirs;

        if(type === "q")
        dirs = [
            ...bishopDirs,
            ...rookDirs
        ];

        for(const dir of dirs){

            let r =
            row + dir[0];

            let c =
            col + dir[1];

            while(
                insideBoard(r,c)
            ){

                if(!board[r][c]){

                    moves.push([r,c]);

                }
                else{

                    if(
                        isEnemy(
                            board[r][c],
                            color
                        )
                    ){

                        moves.push([r,c]);

                    }

                    break;

                }

                r += dir[0];
                c += dir[1];

            }

        }

    }

    if(type === "k"){

        for(let dr=-1; dr<=1; dr++){

            for(let dc=-1; dc<=1; dc++){

                if(
                    dr===0 &&
                    dc===0
                ) continue;

                const r =
                row + dr;

                const c =
                col + dc;

                if(
                    !insideBoard(r,c)
                ) continue;

                if(
                    !board[r][c] ||
                    isEnemy(
                        board[r][c],
                        color
                    )
                ){

                    moves.push([r,c]);

                }

            }

        }

        if(color === "w" && !whiteKingMoved){

            if(
                !board[7][5] &&
                !board[7][6] &&
                board[7][7] === "wr" &&
                !whiteRightRookMoved
            ){

                moves.push([7,6]);

            }

            if(
                !board[7][1] &&
                !board[7][2] &&
                !board[7][3] &&
                board[7][0] === "wr" &&
                !whiteLeftRookMoved
            ){

                moves.push([7,2]);

            }

        }

        if(color === "b" && !blackKingMoved){

            if(
                !board[0][5] &&
                !board[0][6] &&
                board[0][7] === "br" &&
                !blackRightRookMoved
            ){

                moves.push([0,6]);

            }

            if(
                !board[0][1] &&
                !board[0][2] &&
                !board[0][3] &&
                board[0][0] === "br" &&
                !blackLeftRookMoved
            ){

                moves.push([0,2]);

            }

        }

    }

    return moves;

}