const boardElement =
document.getElementById("board");

const turnDisplay =
document.getElementById(
    "turnDisplay"
);

const evaluationDisplay =
document.getElementById(
    "evaluationDisplay"
);

const promotionModal =
document.getElementById(
    "promotionModal"
);

const promotionButtons =
document.querySelectorAll(
    ".promotionPiece"
);

function createBoard(){

    boardElement.innerHTML = "";

    for(
        let row=0;
        row<8;
        row++
    ){

        for(
            let col=0;
            col<8;
            col++
        ){

            const square =
            document.createElement(
                "div"
            );

            square.classList.add(
                "square"
            );

            if(
                (row + col) % 2 === 0
            ){

                square.classList.add(
                    "light"
                );

            }
            else{

                square.classList.add(
                    "dark"
                );

            }

            square.dataset.row =
            row;

            square.dataset.col =
            col;

            boardElement.appendChild(
                square
            );

        }

    }

}

function renderPieces(){

    const squares =
    document.querySelectorAll(
        ".square"
    );

    squares.forEach(square=>{

        square.innerHTML = "";

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

        if(piece){

            const pieceElement =
            document.createElement(
                "div"
            );

            pieceElement.classList.add(
                "piece"
            );

            if(
                piece[0] === "w"
            ){

                pieceElement.classList.add(
                    "whitePiece"
                );

            }
            else{

                pieceElement.classList.add(
                    "blackPiece"
                );

            }

            pieceElement.textContent =
            PIECES[piece];

            square.appendChild(
                pieceElement
            );

        }

    });

}

function updateTurnDisplay(){

    if(
        currentTurn === "w"
    ){

        turnDisplay.textContent =
        "Bianco";

    }
    else{

        turnDisplay.textContent =
        "Nero";

    }

}

function renderBoard(){

    renderPieces();

    updateTurnDisplay();

}

function clearHighlights(){

    document
    .querySelectorAll(
        ".square"
    )
    .forEach(square=>{

        square.classList.remove(
            "selected",
            "legal",
            "capture"
        );

    });

}

function showLegalMoves(){

    clearHighlights();

    if(
        !selectedSquare
    ) return;

    const selectedIndex =

    selectedSquare.row * 8 +

    selectedSquare.col;

    document
    .querySelectorAll(
        ".square"
    )
    [selectedIndex]
    .classList.add(
        "selected"
    );

    legalMoves.forEach(move=>{

        const row =
        move[0];

        const col =
        move[1];

        const index =
        row * 8 + col;

        const square =
        document
        .querySelectorAll(
            ".square"
        )
        [index];

        if(
            board[row][col]
        ){

            square.classList.add(
                "capture"
            );

        }
        else{

            square.classList.add(
                "legal"
            );

        }

    });

}

function showPromotionModal(
    color
){

    promotionModal
    .classList
    .remove(
        "hidden"
    );

    const pieces =

    color === "w"

    ? [
        "♕",
        "♖",
        "♗",
        "♘"
    ]

    : [
        "♛",
        "♜",
        "♝",
        "♞"
    ];

    promotionButtons
    .forEach(
        (
            button,
            index
        )=>{

            button.textContent =
            pieces[index];

        }
    );

}

function hidePromotionModal(){

    promotionModal
    .classList
    .add(
        "hidden"
    );

}