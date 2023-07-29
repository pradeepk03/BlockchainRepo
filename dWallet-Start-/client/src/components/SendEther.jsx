import { useState } from "react";
import "./Main.css";

function SendEther({web3,account}) {

  const [receipt,setReceipt] = useState({});
  const [receiverAddress,setReceiverAddress] = useState('');
  const [amount,setAmount] = useState('');
  const [toggle,setToggle] = useState(false);

  function sendEther(event){
    event.preventDefault();
    console.log(receiverAddress,amount);
    web3.eth.sendTransaction({
      from:account,
      to:receiverAddress,
      value:amount
    }).then(function(receipt){
        setToggle(true);
        setReceipt(receipt);
        console.log(receipt);
    });

    setReceiverAddress('');
    setAmount('');
  }

  return (
    <>
      <form className="box" onSubmit = {sendEther}>
        <p className="label">
          <label htmlFor="">Enter Receiver's Address</label>
          <input className="receiver" type="text" id="to"
          onChange={(event) =>
            setReceiverAddress(event.target.value)
          }></input>
        </p>

        <p className="label">
          <label htmlFor="">Enter Amount to Send (Ether)</label>
          <input className="receiver" type="text" id="value"
           onChange={(event) =>
            {
              setAmount(web3.utils.toWei(event.target.value,"ether"))
            }
          }
          ></input>
        </p>
        <button className="btn" type="submit">
          Send
        </button>
      </form>
      <div className="box">
        <pre className="json">
          <h3>(JSON Response)</h3>
          <code>{toggle && JSON.stringify(receipt,["transactionHash","blockHash","blockNumber","gasUsed"],2)}</code>
        </pre>
      </div>
    </>
  );
}

export default SendEther;
