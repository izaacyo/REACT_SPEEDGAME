import React, { Component } from "react";
import './App.css';
import Circle from "./Circle";
import GameOver from "./GameOver";

import arrowSound from "./audio/arrow.mp3.mp3";
import backgroundSound from "./audio/backgroundSound.mp3"
import endSound from "./audio/endSound.mp3"

let ArrowSound = new Audio(arrowSound);
let BackgroundSound = new Audio(backgroundSound);
let EndSound = new Audio(endSound);

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class App extends Component {



  state = {
    score: 0,
    current: 0,
    circles: [
      { id: 1, color: "green" },
      { id: 2, color: "yellow" },
      { id: 3, color: " red " },
      { id: 4, color: "orange" },
    ],

    showGameOver: false,
    rounds: 0,
    disableStartBtn: false,
    clicked: false,
  }

  timer = undefined;
  pace = 1000;

  clickHandler = (id) => {
    console.log("wow" + id)

    ArrowSound.play()
    if (this.state.current !== id) {
      this.endHandler();
      return;
    }

    if (this.state.clicked === false) {
      this.setState({
        score: this.state.score + 1,
        rounds: 0,
        clicked: true
      })
    }
  }

  nextCircle = () => {
    if (this.state.rounds >= 3) {
      this.endHandler();
      return;
    }

    let nextActive = undefined;

    do {
      nextActive = randomInt(1, 4);

    } while (nextActive === this.state.current);

    this.setState({
      current: nextActive,
      rounds: this.state.rounds + 1,
      clicked: false
    });

    this.pace *= 1;

    this.timer = setTimeout(this.nextCircle, this.pace);

    console.log("active circle is" + this.state.current)
  };

  startHandler = () => {
    this.nextCircle()
    this.setState({
      disableStartBtn: true
    })
    BackgroundSound.play()
  };

  endHandler = () => {
    clearTimeout(this.timer)
    this.setState({
      showGameOver: true
    })
    EndSound.play()
  };


  render() {

    const circlesList = this.state.circles.map((c) => {
      return (<Circle
        id={c.id}
        key={c.color}
        color={c.color}
        click={() => this.clickHandler(c.id)}
        active={this.state.current === c.id}
        disabled={this.state.disableStartBtn} />
      )
    });


    return (
      <main>
        <h1>Speedtest</h1>
        <p> Your score is: {this.state.score} </p>
        <div className="circles">{circlesList}</div>
        <button className="button" onClick={this.startHandler} disabled={this.state.disableStartBtn}> Start</button>
        <button className="button" onClick={this.endHandler}> Stop</button>
        {this.state.showGameOver && <GameOver score={this.state.score} />}
      </main >
    )
  }
}

export default App;
