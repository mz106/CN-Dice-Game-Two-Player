
////// Buttons

const btnRollOne = document.getElementById('btn-roll-one');
const btnReset = document.getElementById('btn-reset');

/////// Text
//Player One

const paraRollOne = document.getElementById('para-roll-one');
const paraTallyOne = document.getElementById('para-tally-one');
const paraScoreOne = document.getElementById('para-score-one');

//Player Two

const paraRollTwo = document.getElementById('para-roll-two');
const paraTallyTwo = document.getElementById('para-tally-two');
const paraScoreTwo = document.getElementById('para-score-two');

// Text Box

const paraText = document.getElementById('para-text');

//Die images

const dieOne = 'images/dieOne.svg';
const dieTwo = 'images/dieTwo.svg'
const dieThree = 'images/dieThree.svg'
const dieFour = 'images/dieFour.svg'
const dieFive = 'images/dieFive.svg'
const dieSix = 'images/dieSix.svg'

// Die Image Array

const dieArr = [dieOne, dieTwo, dieThree, dieFour, dieFive, dieSix];

// Player turn counter - 0 is player one, 1 is player two

let turnCount = 0;
let gameOverTally = 0;

class PlayerRoller {
    constructor(player, roll, tally, score, win, lose) {
        this._player = player;
        this._roll = roll;
        this._tally = tally;
        this._score = tally;
        this._win = score;
        this._lose =lose;
    }

    get player() {
        return this._player;
    }

    get roll() {
        return this._roll;
    }

    get tally() {
        return this._tally;
    }

    get score() {
        return this._score;
    }

    get win() {
        return this._win;
    }

    get lose() {
        return this._lose;
    }

    set roll(par) {
        return this._roll = par;
    }

    set tally(par) {
        return this._tally = par;
    }

    set score(par) {
        return this._score = par;
    }

    set win(par) {
        return this._win = par;
    } 

    set lose(par) {
        return this._lose = par;
    }

    rollDie() {
        return Math.floor(Math.random() * 6 + 1);
    }

    process() {
        let dieRoll = this.rollDie();
        if (turnCount === 0) {
            document.getElementById('img-die-one').src = dieArr[dieRoll - 1];
        } else if (turnCount === 1) {
            document.getElementById('img-die-two').src = dieArr[dieRoll - 1];
        }

        if (dieRoll === 1) {
            
            this.roll = dieRoll;
            this.tally ++;

            if (turnCount === 0) {
                paraRollOne.textContent = this.roll;
                paraTallyOne.textContent = this.tally;
            } else if (turnCount === 1) {
                paraRollTwo.textContent = this.roll;
                paraTallyTwo.textContent = this.tally;
            }

            this.lost();

        } else {
            this.roll = dieRoll;
            this.tally ++;
            this.score = this.score + dieRoll;
            console.log(this.player, this.roll, this.tally, this.score)
            paraText.textContent = `${this.player} has rolled a ${dieRoll}.`
            
            if (turnCount === 0) {
                paraRollOne.textContent = this.roll;
                paraTallyOne.textContent = this.tally;
                paraScoreOne.textContent = this.score;
            } else if (turnCount === 1) {
                paraRollTwo.textContent = this.roll;
                paraTallyTwo.textContent = this.tally;
                paraScoreTwo.textContent = this.score;
            }

            this.won(this.score);
        }
    }

    lost() {
        paraText.textContent = `${this._player}, you have rolled a 1 and lost. Click reset to play again.`;
        console.log(`${this._player}, you have rolled a 1 and lost. Click reset to play again.`)
        gameOverTally++;
    }

    won(par) {
        if (par >= 10) {
            paraText.textContent = `${this.player}, you have scored ${par}. You have won!`;
            gameOverTally++;
        }
       
    }

};

const playerOne = new PlayerRoller('Player One', 0, 0, 0, false, false);
const playerTwo = new PlayerRoller('Player Two', 0, 0, 0, false, false);

// Button Event Listeners

// functions 

// function stop - prevents continuing score if game is over

const stop = () => {
    
    paraText.textContent = `Click reset to begin another game.`        
};


btnRollOne.addEventListener('click', () => {
    console.log(gameOverTally)
    if (gameOverTally === 1) {
        stop();
    } else if (gameOverTally === 0) {
        if (turnCount === 0) {
            playerOne.process();
            turnCount++;
        } else if (turnCount === 1) {
            playerTwo.process();
            turnCount--;
        }
    }    
});

btnReset.addEventListener('click', () => {

    paraRollOne.textContent = 0;
    paraTallyOne.textContent = 0;
    paraScoreOne.textContent = 0;

    paraRollTwo.textContent = 0;
    paraTallyTwo.textContent = 0;
    paraScoreTwo.textContent = 0;

    playerOne.score = 0;
    playerOne.tally = 0;

    playerTwo.score = 0;
    playerTwo.tally = 0;

    turnCount = 0;
    gameOverTally = 0;

    document.getElementById('img-die-one').src = dieArr[0];
    document.getElementById('img-die-two').src = dieArr[0];

    paraText.textContent = `Player one starts. To play, Roll.`;
});









