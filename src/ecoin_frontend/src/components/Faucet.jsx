import React, {useState} from "react";
import { ecoin_backend } from '../../../declarations/ecoin_backend'

function Faucet() {

  const [isHidden, setHidden] = useState(false);
  const [btnText, setText] = useState("Gimme gimme");

  async function handleClick(event) {
    setHidden(true);
    const result = await ecoin_backend.payOut();
    setText(result);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free Saturn tokens here! Claim 10,000 Saturn tokens to your account.</label>
      <p className="trade-buttons">
        <button 
        id="btn-payout" 
        onClick={handleClick}
        disabled={isHidden}>
          {btnText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
