import React from "react";
import "./App.css";
import CurrencyDisplay from "./CurrencyDisplay/CurrencyDisplay";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      amountEntered: 0,
      baseCountry: "",
      targetCountry: "",
      result: null,
    };
  }

  handlebaseCountrySelect = (e) => {
    this.setState({ baseCountry: e.target.value });
  };

  handleTargetCountrySelect = (e) => {
    this.setState({ targetCountry: e.target.value });
  };

  handleAmountEntered = (e) => {
    this.setState({ amountEntered: e.target.value });
  };

  handleResult = () => {
    if (this.state.amountEntered > 0) {
      let myHeaders = new Headers();
      myHeaders.append("apiKey", "x9fuNjR6dMQzWqoKm8TdE2koHIA1vpGG");

      let requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: myHeaders,
      };

      fetch(
        `https://api.apilayer.com/exchangerates_data/convert?to=${this.state.targetCountry}&from=${this.state.baseCountry}&amount=${this.state.amountEntered}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          this.setState({ result: result.result });
        })
        .catch((error) => {
          this.setState({ result: "ERROR" });
          console.log(error);
        });
    } else {
      this.setState({ result: "invalid" });
    }
  };

  render() {
    return (
      <div className="App">
        <h1>Currency Converter</h1>
        <label htmlFor="amount">
          <strong>Enter Amount</strong>
        </label>
        <input
          type="text"
          id="amount"
          onChange={this.handleAmountEntered}
          value={this.state.amountEntered}
        />
        <div id="displays">
          <CurrencyDisplay handleCountrySelect={this.handlebaseCountrySelect} />
          TO
          <CurrencyDisplay
            handleCountrySelect={this.handleTargetCountrySelect}
          />
        </div>
        <button onClick={this.handleResult}>calculate</button>
        <div id="result">{this.state.result}</div>
      </div>
    );
  }
}

export default App;
