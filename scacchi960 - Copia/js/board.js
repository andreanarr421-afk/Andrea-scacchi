const PIECES = {

    wp:"♙",
    wr:"♖",
    wn:"♘",
    wb:"♗",
    wq:"♕",
    wk:"♔",

    bp:"♟",
    br:"♜",
    bn:"♞",
    bb:"♝",
    bq:"♛",
    bk:"♚"

};

let board = [

    ["br","bn","bb","bq","bk","bb","bn","br"],
    ["bp","bp","bp","bp","bp","bp","bp","bp"],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    ["wp","wp","wp","wp","wp","wp","wp","wp"],
    ["wr","wn","wb","wq","wk","wb","wn","wr"]

];

let currentTurn = "w";

let selectedSquare = null;

let legalMoves = [];

let capturedWhite = [];

let capturedBlack = [];

let lastMove = null;

let pendingPromotion = null;

let whiteKingMoved = false;
let blackKingMoved = false;

let whiteLeftRookMoved = false;
let whiteRightRookMoved = false;

let blackLeftRookMoved = false;
let blackRightRookMoved = false;

const FILES = [
    "a","b","c","d",
    "e","f","g","h"
];

function resetBoard(){

    board = [

        ["br","bn","bb","bq","bk","bb","bn","br"],
        ["bp","bp","bp","bp","bp","bp","bp","bp"],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        ["wp","wp","wp","wp","wp","wp","wp","wp"],
        ["wr","wn","wb","wq","wk","wb","wn","wr"]

    ];

    currentTurn = "w";

    selectedSquare = null;

    legalMoves = [];

    capturedWhite = [];

    capturedBlack = [];

    lastMove = null;

    pendingPromotion = null;

    whiteKingMoved = false;
    blackKingMoved = false;

    whiteLeftRookMoved = false;
    whiteRightRookMoved = false;

    blackLeftRookMoved = false;
    blackRightRookMoved = false;

    renderBoard();

}

/* =========================================
   CONVERSIONE SCACCHIERA → FEN
   ========================================= */

function boardToFen(){

    let fen = "";

    const pieceMap = {

        wp:"P",
        wn:"N",
        wb:"B",
        wr:"R",
        wq:"Q",
        wk:"K",

        bp:"p",
        bn:"n",
        bb:"b",
        br:"r",
        bq:"q",
        bk:"k"

    };

    for(
        let row = 0;
        row < 8;
        row++
    ){

        let emptySquares = 0;

        for(
            let col = 0;
            col < 8;
            col++
        ){

            const piece =
            board[row][col];

            if(!piece){

                emptySquares++;

                continue;

            }

            if(
                emptySquares > 0
            ){

                fen +=
                emptySquares;

                emptySquares = 0;

            }

            fen +=
            pieceMap[piece];

        }

        if(
            emptySquares > 0
        ){

            fen +=
            emptySquares;

        }

        if(
            row < 7
        ){

            fen += "/";

        }

    }

    fen +=
    currentTurn === "w"
    ? " w "
    : " b ";

    fen += "- - 0 1";

    return fen;

}