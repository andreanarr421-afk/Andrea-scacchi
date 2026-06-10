const stockfish = new Worker(
    "engine/stockfish-18-lite-single.js"
);

function updateEvaluation(score){

    const fill =
    document.getElementById(
        "evaluationFill"
    );

    const text =
    document.getElementById(
        "evaluationScore"
    );

    if(
        !fill ||
        !text
    ) return;

    let value =
    Number(score);

    let percent =
    50 + value * 8;

    percent =
    Math.max(
        0,
        Math.min(
            100,
            percent
        )
    );

    fill.style.height =
    percent + "%";

    text.textContent =
    score;

}

stockfish.onmessage = function(event){

    const text = event.data;

    console.log(
        "STOCKFISH:",
        text
    );

    if(
        text === "uciok"
    ){

        console.log(
            "Stockfish UCI pronto"
        );

    }

    if(
        text === "readyok"
    ){

        console.log(
            "Stockfish completamente pronto"
        );

    }

    const cpMatch =
    text.match(
        /score cp (-?\d+)/
    );

    if(cpMatch){

        const cp =
        Number(
            cpMatch[1]
        );

        const score =
        (
            cp / 100
        ).toFixed(2);

        console.log(
            "Valutazione:",
            score
        );

        updateEvaluation(
            score
        );

        const evaluationDisplay =
        document.getElementById(
            "evaluationDisplay"
        );

        if(
            evaluationDisplay
        ){

            evaluationDisplay.textContent =
            score;

        }

    }

    const mateMatch =
    text.match(
        /score mate (-?\d+)/
    );

    if(mateMatch){

        const mate =
        Number(
            mateMatch[1]
        );

        console.log(
            "MATTO IN:",
            mate
        );

        const evaluationDisplay =
        document.getElementById(
            "evaluationDisplay"
        );

        if(
            evaluationDisplay
        ){

            evaluationDisplay.textContent =
            "M" + mate;

        }

        const textBar =
        document.getElementById(
            "evaluationScore"
        );

        if(
            textBar
        ){

            textBar.textContent =
            "M" + mate;

        }

    }

    const pvMatch =
    text.match(
        /pv\s+(.+)/
    );

    if(pvMatch){

        console.log(
            "PV:",
            pvMatch[1]
        );

    }

    const bestMoveMatch =
    text.match(
        /bestmove\s+(\S+)/
    );

    if(bestMoveMatch){

        const bestMove =
        bestMoveMatch[1];

        console.log(
            "BEST MOVE:",
            bestMove
        );

    }

};

stockfish.postMessage(
    "uci"
);

stockfish.postMessage(
    "isready"
);