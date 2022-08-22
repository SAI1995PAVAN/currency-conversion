import React from "react";
import "./CurrencyDisplay.css";
import currencies from "../Currencies";

function CurrencyDisplay(props) {
  const { handleCountrySelect } = props;
  return (
    <div id="each-display">
      <select name="countries" id="countries" onChange={handleCountrySelect}>
        {Object.keys(currencies).map((currency, index) => {
          return (
            <option key={index} value={currency}>
              {currency}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default CurrencyDisplay;
