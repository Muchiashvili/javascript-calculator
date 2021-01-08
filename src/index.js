import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const actions = ["+", "-", "*", "/"];
var finalResult;

class Calculator extends React.Component {
  constructor(props){
    super(props)
      this.state = {
        input: "0",
        output: "",
        calculated: 0
      }
      this.changeDisplay = this.changeDisplay.bind(this);
  }
  changeDisplay(e) {
    const { input, output, calculated } = this.state;
    const { value } = e.target;
    var lastInOutput = output[output.length-1];
    var previousLast = output[output.length-2];
    

    switch(value){
      case "AC":
        this.setState({
          input: '0',
          output: "",
          calculated: 0
        });
        finalResult = 0;
        break;



      case "0":
        if(calculated === 1) {
          this.setState({
            input: value,
            output: value,
            calculated: 0
          })
        } else if(input.length < 20) {
          if(actions.indexOf(input) !== -1) {
            this.setState({
              input: value,
              output: output + value
            });
          } else {
            if(input !== value && output !== "") {
              this.setState({
                input: input + value,
                output: output + value
              })
            } else if(input === value && output === "") {
              this.setState({
                output: value
              });
            }
          }
        }
        break;



      case ".":
        if(calculated === 1) {
          this.setState({
            input: finalResult + value,
            output: finalResult + value,
            calculated: 0
          })
        } else if(input.length < 20){
          if(input === "0" && output === ""){
            this.setState({
              input: "0.",
              output: "0."
            })
          } else if(!input.includes(value) && actions.indexOf(lastInOutput) === -1){
            this.setState({
              input: input + value,
              output: output + value
            });
          };
        }
        break;



      case "=":
        if(calculated === 0) {
          if(output === "") {
            finalResult = input
          } else if(actions.indexOf(lastInOutput) !== -1){
            if(lastInOutput === "+" || lastInOutput === "-") {
              finalResult = eval(output + "0");
            } else {
              finalResult = eval(output + "1");
            }
          } else {
            finalResult = eval(output)
          }
          this.setState({
            input: finalResult,
            output: output + " = " + finalResult,
            calculated: 1
          });
        } else {
          this.setState({
            input: "0",
            output: "",
            calculated: 0
          });
        }
        break;


      case "-":
        if(lastInOutput !== value) {
          if(calculated === 1){
            this.setState({
              input: value,
              output: finalResult + value,
              calcualted: 0
            });
          } else {
            this.setState({
              input: value,
              output: output + value
            });
          }
        }
        break;



      default:
        if(actions.indexOf(value) !== -1) {
          if(calculated === 1) {
              this.setState({
                input: value,
                output: finalResult + value,
                calculated: 0
              });
          } else {
            if(lastInOutput !== value && output !== "" && actions.indexOf(lastInOutput) === -1) {
              this.setState({
                input: value,
                output: output + value
              });
            } else if(actions.indexOf(lastInOutput) !== -1 && actions.indexOf(previousLast) === -1) {
              this.setState({
                input: value,
                output: output.slice(0, output.length - 1) + value
              });
            } else if(actions.indexOf(lastInOutput) !== -1 && actions.indexOf(previousLast) !== -1) {
              this.setState({
                input: value,
                output: output.slice(0, output.length - 2) + value
              })
            }
          } 
        } else if(input.length < 16){
          if(calculated === 0) {
            if(input == "0"){
              this.setState({
                input: value,
                output: value,
              });
            } else if(actions.indexOf(input) !== -1){
              this.setState({
                input: value,
                output: output + value
              });
            } else {
              this.setState({
                input: input + value,
                output: output + value
              })
            }
          } else {
            this.setState({
              input: value,
              output: value,
              calculated: 0
            });
          }
        }
        break;
    }
  }



  render() {
    return (
      <div className="main-box">
        <div className="display-box">
          <div id="output-display">
            <span className="output">
              {this.state.output}
            </span>
          </div>
          <div id="display"><span className="input">{this.state.input}</span></div>
        </div>
        <div className="buttons">
          <button id="clear" value="AC" className="big-width orange" onClick={this.changeDisplay}>AC</button>
          <button id="divide" value="/" className="standart-button light" onClick={this.changeDisplay}>/</button>
          <button id="multiply" value="*" className="standart-button light" onClick={this.changeDisplay}>X</button>
          <button id="seven" value="7" className="standart-button dark" onClick={this.changeDisplay}>7</button>
          <button id="eight" value="8" className="standart-button dark" onClick={this.changeDisplay}>8</button>
          <button id="nine" value="9" className="standart-button dark" onClick={this.changeDisplay}>9</button>
          <button id="add" value="+" className="standart-button light" onClick={this.changeDisplay}>+</button>
          <button id="four" value="4" className="standart-button dark" onClick={this.changeDisplay}>4</button>
          <button id="five" value="5" className="standart-button dark" onClick={this.changeDisplay}>5</button>
          <button id="six" value="6" className="standart-button dark" onClick={this.changeDisplay}>6</button>
          <button id="subtract" value="-" className="standart-button light" onClick={this.changeDisplay}>-</button>
          <div className="bottom">
            <div className="first-col">   
              <button id="one" value="1" className="standart-button dark" onClick={this.changeDisplay}>1</button>
              <button id="two" value="2" className="standart-button dark" onClick={this.changeDisplay}>2</button>
              <button id="three" value="3" className="standart-button dark" onClick={this.changeDisplay}>3</button>
              <button id="zero" value="0" className="big-width dark" onClick={this.changeDisplay}>0</button>
              <button id="decimal" value="." className="standart-button dark" onClick={this.changeDisplay}>.</button>
            </div>
            <div className="second-col">
              <button id="equals" value="=" className="orange"onClick={this.changeDisplay}>=</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render( <Calculator />, document.getElementById('root') );