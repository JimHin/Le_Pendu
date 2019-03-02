import React, { Component } from 'react';
import './App.css';
import Letter from './Letter.js';
import Keyboard from './Keyboard.js';
import Counter from './Counter.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const allword = ["POURRITURE","EQUILIBRISTE","GEANTS","HELICOPTERE","ROULADE","EJECTION","LIVRETS",
              "MULTIPLICATION","LICORNES","CASQUETTE","RHINOCEROS","PAPILLON","INDIGENES",
              "STUPEFIANT","MATERIAUX","PROGRAMMATION","ANAGRAMME","ULTERIEURE","FACTORISER",
              "RACCROCHER","HIPPOPOTAME","SAUTERELLES","PRINCIPAL",]

class App extends Component {
  state = {
    letters: this.generateWords(),
    keyboard : this.generateKeyboard(),
    selection : [],
    gameState : "partie en cours",
  }

  generateWords() {
    const result = []
    let oneWord = Math.floor(Math.random()* allword.length)
    oneWord = allword[oneWord]
    const word = oneWord.split('')
    while (word.length>0) {
      const letter = word.shift()
      result.push(letter)
    }
    return result
  }

  generateKeyboard() {
    const result = []
    const size = 26
    const allLetters = alphabet.split('')
    while (result.length < size) {
      const letter = allLetters.shift()
      result.push(letter)
    }
    return result
  }

  getFeedback(letter) {
    const { selection } = this.state
    return selection.includes(letter)
  }

  handleClick = letter => {
    const { selection, gameState } = this.state
    if(gameState === "partie en cours") {
      this.setState({selection: [...selection, letter]}, this.gameState)
    }
  }

  newGame = () => {
    this.setState({selection: [], letters: this.generateWords(), gameState : "partie en cours" })
  }

  trying = () => {
    const {letters, selection} = this.state
    return selection.filter(elt => !letters.includes(elt)).length
  }


  gameState = () => {
    const {letters, selection} = this.state
    const lastTests = 10 - this.trying()
    const findWord = letters.filter(elt => selection.includes(elt)).length === letters.length
    if (lastTests > 0 && findWord) {
      this.setState({gameState : "gagnée"})
    } else if (lastTests > 0 ) {
      return
    } else {
      this.setState({gameState : "perdue"})
    }
  }

  render() {
    const { letters, keyboard } = this.state

    return (
      <div className="hangman">
      <img src={ require('./pendu' + this.trying() + '.png') } alt="pendu" className="logo" />
        <div className="header">
          
          <button className="btn btn-dark" onClick={this.newGame}>Nouvelle partie</button>
        </div>
        <div className="game">
          <div className="content">
          
            <div className="hiddenword">
              Trouvez ce mot: { letters.map((letter, index) => (
              <Letter
                letter={letter}
                feedback={this.getFeedback(letter) ? "visible" : "hidden"}
                key={index}
              />
            ))}
            </div>
            
            <Counter
              counter = {this.trying()}
              gameState = {this.state.gameState}
              />
          </div>
        </div>

        <div className="keyboard">
          { keyboard.map((letter, index) => (
            <Keyboard
              letter={letter}
              key={index}
              onClick={this.handleClick}
              feedback={this.getFeedback(letter) ? "grey" : "#000000"}
              />
          ))}
        </div>
      </div>

    )
  }
}

export default App;