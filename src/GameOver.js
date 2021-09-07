import React from 'react';
import './Over.css'

const closeHandler = () => {
    window.location.reload();
}

let endText = (score) => {
    {
        if (score < 5) {
            return `You can do better than this! Your score is ${score}. Press "Close" and try again!`

        }
        else if (5 < score < 15) {
            return `Well done! Your score is ${score}. You are almost a pro!  Press "Close" and try again!`
        }
        else if (score > 15) {
            return `Congratulations you mastered this game! Your score is ${score}. Press "Close" and try again!`
        }
    }
}

const GameOver = (props) => {
    return (
        <div className="overlay">
            <div className="gameover_box">
                <h2 className="gameover_text"> Game Over</h2>
                <p> {endText(props.score)}</p>

                <button className="over_button" onClick={closeHandler}> X </button>

            </div>

        </div >
    );
};



export default GameOver;