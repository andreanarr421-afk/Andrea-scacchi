window.addEventListener("load",()=>{

    createBoard();

    renderBoard();

    document
    .querySelectorAll(".square")
    .forEach(square=>{

        square.addEventListener(
            "click",
            ()=>{

                const row =
                Number(
                    square.dataset.row
                );

                const col =
                Number(
                    square.dataset.col
                );

                const piece =
                board[row][col];

                if(selectedSquare){

                    const allowed =
                    legalMoves.some(
                        move =>
                        move[0] === row &&
                        move[1] === col
                    );

                    if(allowed){

                        const fromRow =
                        selectedSquare.row;

                        const fromCol =
                        selectedSquare.col;

                        const movingPiece =
                        board[fromRow][fromCol];

                        if(
                            movingPiece[1] === "p" &&
                            !board[row][col] &&
                            fromCol !== col
                        ){

                            board[fromRow][col] =
                            null;

                        }

                        board[row][col] =
                        movingPiece;

                        board[fromRow][fromCol] =
                        null;

                        lastMove = {

                            piece:movingPiece,

                            fromRow,

                            fromCol,

                            toRow:row,

                            toCol:col

                        };

                        if(
                            movingPiece === "wp" &&
                            row === 0
                        ){

                            pendingPromotion = {

                                row,
                                col,
                                color:"w"

                            };

                            showPromotionModal(
                                "w"
                            );

                            renderBoard();

                            return;

                        }

                        if(
                            movingPiece === "bp" &&
                            row === 7
                        ){

                            pendingPromotion = {

                                row,
                                col,
                                color:"b"

                            };

                            showPromotionModal(
                                "b"
                            );

                            renderBoard();

                            return;

                        }

                        if(movingPiece === "wk"){

                            whiteKingMoved =
                            true;

                            if(
                                fromCol === 4 &&
                                col === 6
                            ){

                                board[7][5] =
                                "wr";

                                board[7][7] =
                                null;

                            }

                            if(
                                fromCol === 4 &&
                                col === 2
                            ){

                                board[7][3] =
                                "wr";

                                board[7][0] =
                                null;

                            }

                        }

                        if(movingPiece === "bk"){

                            blackKingMoved =
                            true;

                            if(
                                fromCol === 4 &&
                                col === 6
                            ){

                                board[0][5] =
                                "br";

                                board[0][7] =
                                null;

                            }

                            if(
                                fromCol === 4 &&
                                col === 2
                            ){

                                board[0][3] =
                                "br";

                                board[0][0] =
                                null;

                            }

                        }

                        if(movingPiece === "wr"){

                            if(
                                fromRow === 7 &&
                                fromCol === 0
                            ){

                                whiteLeftRookMoved =
                                true;

                            }

                            if(
                                fromRow === 7 &&
                                fromCol === 7
                            ){

                                whiteRightRookMoved =
                                true;

                            }

                        }

                        if(movingPiece === "br"){

                            if(
                                fromRow === 0 &&
                                fromCol === 0
                            ){

                                blackLeftRookMoved =
                                true;

                            }

                            if(
                                fromRow === 0 &&
                                fromCol === 7
                            ){

                                blackRightRookMoved =
                                true;

                            }

                        }

                        currentTurn =
                        currentTurn === "w"
                        ? "b"
                        : "w";

                        selectedSquare =
                        null;

                        legalMoves = [];

                        renderBoard();

                        clearHighlights();

                        const fen =
                        boardToFen();

                        console.log(
                            "FEN:",
                            fen
                        );

                        stockfish.postMessage(
                            "position fen " + fen
                        );

                        stockfish.postMessage(
                            "go depth 10"
                        );

                        return;

                    }

                }

                if(
                    piece &&
                    piece[0] === currentTurn
                ){

                    selectedSquare = {

                        row,
                        col

                    };

                    legalMoves =
                    getLegalMovesFiltered(
                        row,
                        col
                    );

                    showLegalMoves();

                }

            }

        );

    });

});

document
.querySelectorAll(
    ".promotionPiece"
)
.forEach(button=>{

    button.addEventListener(
        "click",
        ()=>{

            if(
                !pendingPromotion
            ) return;

            const type =
            button.dataset.piece;

            board[
                pendingPromotion.row
            ][
                pendingPromotion.col
            ] =
            pendingPromotion.color +
            type;

            pendingPromotion =
            null;

            hidePromotionModal();

            currentTurn =
            currentTurn === "w"
            ? "b"
            : "w";

            selectedSquare =
            null;

            legalMoves = [];

            renderBoard();

            clearHighlights();

            const fen =
            boardToFen();

            console.log(
                "FEN:",
                fen
            );

            stockfish.postMessage(
                "position fen " + fen
            );

            stockfish.postMessage(
                "go depth 10"
            );

        }
    );

});