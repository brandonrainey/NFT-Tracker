import React, { useState, useEffect } from 'react'

export default function TopMenu({gas, assets, eth, custom, setCustom, getAddress, userAssets, setUserAssets, setAddress, address, getCollection, coll, setColl, data}) {
    const [inputValue, setInputValue] = useState('')
    


    async function handleSubmit(e) {
        e.preventDefault()
        setCustom(!custom)
        setAddress(inputValue)
        
        
    }

    
   
     useEffect(() => {
        getCollection() 
     },[address, custom])
    return (

        <div className='flex '>
                
                <div className='bg-blue-900 w-2/6 h-18 font-bold text-4xl '>
                NFT-TRACKER 
                </div>
       
            <div className='bg-gray-400 w-5/6'>
                <div className='flex'>
                    <div className='font-semibold'>
                        {`Gas: ${gas.result.ProposeGasPrice} gwei`}
                    </div>
                     
                    <div className='ml-auto font-semibold'>
                       {`Current ETH price: $${eth.result.ethusd}`} 
                    </div>
                </div>
                   
                    
                <div className='bg-gray-400'>
                    <form onSubmit={handleSubmit}>
                        <label className='font-semibold'>ETH address:</label>
                        <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} className='mr-4  mb-2 ml-4 shadow appearance-none border rounded py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
                        <button type='submit' className='bg-blue-700 hover:bg-blue-500 text-white font-bold py-1 px-4 rounded'>Enter</button>
                    </form>
                </div>
            </div>

                
            </div>

        
       
    )
}
