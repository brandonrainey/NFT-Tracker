import React, { useState, useEffect } from 'react'

export default function TopMenu({gas, assets, eth, custom, setCustom, getAddress, userAssets, setUserAssets, setAddress, address, getCollection, coll, setColl}) {
    const [inputValue, setInputValue] = useState('')
    


    function handleSubmit(e) {
        e.preventDefault()
        setCustom(!custom)
        setAddress(inputValue)
        
        
    }

    
    useEffect(async () => {
        await getAddress()
        setColl([])
        getCollection()
        
        
    },[custom])
    return (

        <div className='flex '>
                
                <div className='bg-gray-700 w-1/6 h-24 font-bold'>
                NFT-TRACKER 
                </div>
       
            <div className='bg-gray-400 w-5/6'>
                    {`Gas: ${gas.result.ProposeGasPrice} gwei`}
                <div className='bg-gray-400'>
                    <form onSubmit={handleSubmit}>
                        <label>ETH address:</label>
                        <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} className='mr-4  ml-4 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
                        <button type='submit' className='bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded'>Enter</button>
                    </form>
                </div>
            </div>

                
            </div>

        
       
    )
}
