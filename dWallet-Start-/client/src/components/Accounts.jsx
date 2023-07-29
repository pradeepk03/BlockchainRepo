import { useEffect,useState } from "react";
import "./Main.css";

function Accounts({web3,setAddress}) {

const [options, setOptions] = useState([]);
const [provider,setProvider] = useState(null);
const [balance,setBalance] = useState(null);
const [account,setAccount] = useState(null);

useEffect(() => {
    async function allAccounts(){
      const select = document.querySelector("#selectNumber")
      try{
        const data = await web3.eth.getAccounts();
        setProvider("Ganache");
        const results = []
        // Store results in the results array
        data.forEach((value) => {
          results.push({
            key: value,
            value: value,
          });
        });
  
        // Update the options state
        setOptions([
          {key: 'Select a account', value: ''}, 
          ...results
        ])
      }
      catch(error){
          setProvider("not connected");
      }
      
    }

    web3 && allAccounts();
  },[web3])

 async function selectedAccount(event){
    setAddress(event.target.value);
    setAccount(event.target.value);
    let accountBalance = await web3.eth.getBalance(event.target.value);
    console.log(accountBalance);
    const etherBalance = web3.utils.fromWei(accountBalance,"ether");
    setBalance(etherBalance);
  }
  
  return (
    <>
      <form className="label1" id="myForm">
        <label htmlFor="">Select an account</label>
        <select className="innerBox" id="selectNumber" onChange={selectedAccount}>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          );
        })}
        </select>
      </form>
      <span className="conAc">Connected Account: {account}</span>
      <br></br>
      <span className="acBal">Account Balance: {balance}</span>
      <br></br>
      <span className="provider">Provider : {provider}</span>
    </>
  );
}

export default Accounts;
