import React, {useState} from "react";
import { Principal } from '@dfinity/principal'
import { ecoin_backend } from '../../../declarations/ecoin_backend'

function Transfer() {
  const [inputV, setInput] = useState("");
  const [amount, setAmount] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const [isHidden, setHidden] = useState(true);
  const [Text, setText] = useState("");

  async function handleClick() {
    setHidden(true);
    setDisabled(true);
    const result = await ecoin_backend.transfer(Principal.fromText(inputV), Number(amount));
    setText(result);
    setHidden(false);
    setDisabled(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={inputV}
                onChange={(event)=> setInput(event.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(event)=> setAmount(event.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button 
          id="btn-transfer" 
          onClick={handleClick} 
          disabled={isDisabled}>
            Transfer
          </button>
        </p>
        <p hidden = {isHidden}>{Text}</p>
      </div>
    </div>
  );
}

export default Transfer;
