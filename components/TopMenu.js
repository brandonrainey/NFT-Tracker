import React, { useState, useEffect } from "react";

export default function TopMenu({
  gas,
  eth,
  custom,
  setCustom,
  setAddress,
  address
}) {
  const [inputValue, setInputValue] = useState("");

  const [wallet, setWallet] = useState('')

  async function handleSubmit(e) {
    e.preventDefault();
    setCustom(!custom);
    setAddress(inputValue);
  }

   useEffect(() => {
      setWallet(inputValue)
   }, [address])
  return (
    <div className="flex headerWrapper">
     
      {/* gas and ETH price/ wallet */}
      <div className="bg-gray-400 w-2/6 px-8 pt-2 headerInfo flex justify-center items-center">
        <div className="flex flex-col">
          <div className="font-semibold">
            {`Gas: ${gas.result.ProposeGasPrice} gwei`}
          </div>

          <div className="font-semibold">
            {`Current ETH price: $${eth.result.ethusd}`}
          </div>

          <div className='font-semibold'>
            {`Current Wallet: ${wallet}`}
          </div>
        </div>

       
      </div>

      {/* title */}
      <div className="bg-indigo-400 w-2/6 h-36 font-bold text-5xl text-center headerTitle">
        NFT-TRACKER
      </div>

      {/* address bar */}
      <div className='flex w-2/6 items-center headerAddressBar'>
         <div className="bg-gray-400 h-full w-full flex justify-center items-center headerAddress">
           <div>
             <form onSubmit={handleSubmit}>
            <label className="font-semibold">ETH address:</label>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="mr-4  mb-2 ml-4 shadow appearance-none border rounded py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline inputBar"
            />
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-1 px-4 rounded addressButton"
            >
              Enter
            </button>
          </form>
           </div>
          
        </div>
      </div>
    </div>
  );
}
