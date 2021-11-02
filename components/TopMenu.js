import React, { useState, useEffect } from "react";

export default function TopMenu({
  gas,
  eth,
  custom,
  setCustom,
  setAddress,
}) {
  const [inputValue, setInputValue] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setCustom(!custom);
    setAddress(inputValue);
  }

  //  useEffect(() => {
  //     getCollection()
  //  },[address, custom])
  return (
    <div className="flex headerWrapper">
      <div className="bg-indigo-400 w-2/6 h-20 font-bold text-4xl text-center headerTitle">
        NFT-TRACKER
      </div>

      <div className="bg-gray-400 w-5/6 px-8 pt-2 headerInfo">
        <div className="flex">
          <div className="font-semibold">
            {`Gas: ${gas.result.ProposeGasPrice} gwei`}
          </div>

          <div className="ml-auto font-semibold">
            {`Current ETH price: $${eth.result.ethusd}`}
          </div>
        </div>

        <div className="bg-gray-400">
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
  );
}
