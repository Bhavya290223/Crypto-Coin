import React, {useState} from "react";
import { Principal } from '@dfinity/principal'
import { ecoin_backend } from '../../../declarations/ecoin_backend'

function Balance() {
  
  const [inputV, setInput] = useState("");
  const [balanceResult, setBalance] = useState("");
  const [cryptoS, setSymbol] = useState("");
  const [isHidden, setHidden] = useState(true);

  async function handleClick() {
    const principal = Principal.fromText(inputV);
    const balance = await ecoin_backend.balanceOf(principal);
    setBalance(balance.toLocaleString());
    setSymbol(await ecoin_backend.getSymbol());
    setHidden(false);
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputV}
          onChange={(event)=> setInput(event.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden={isHidden}>This account has a balance of {balanceResult} {cryptoS}.</p>
    </div>
  );
}

export default Balance;
