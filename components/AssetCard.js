import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function AssetCard({gas, assets, collection, custom, setCustom, userAssets, address, coll}) {

    
    

    useEffect(() => {
        
        
    },[address])
    
    return (
        <div className='flex gap-x-4 ml-4 mt-4 flex-wrap flex-4 gap-y-20'>
           {userAssets.assets.map((item, index) => (
               <div className='border h-96 w-60 rounded-t-xl'>
            <div className='h-60  rounded-t-xl'>
                <img src={item.image_original_url ? item.image_original_url : item.asset_contract.image_url} className='h-full w-full rounded-t-xl'/>
            </div>
            <div className='h-36  flex flex-col border-b-2 border-black'>
                
                <div className='flex justify-center font-bold'>
                    {item.name}
                </div>
                <div className='flex justify-center text-xs text-center '>
                    {item.collection.description}
                </div>
            </div>
            <div className='flex'>
                
                <div className='border flex-3 h-16 rounded-bl-xl text-center bg-blue-200 hover:bg-blue-300 font-medium text-sm'>
                    <div className='mt-2'>Last Sale</div>
                    {`${item.last_sale != null ? (item.last_sale.total_price * .000000000000000001).toFixed(2) : 'N/A'} ETH`}
                </div>
                <div className='border-l-2 border-r-2 flex-3 text-center bg-blue-200 hover:bg-blue-300 border-black font-medium text-sm'> 
                    <div className='mt-2'>Floor</div>
                    {`${coll[index]} ETH` }
                </div>
                <div className='border flex-3 rounded-br-xl text-center bg-blue-200 hover:bg-blue-300'>
                    <a href={`https://rarity.tools/theninjahideout/view/${item.token_id}`} className='underline font-medium text-sm ' >Check Rarity</a>
                </div>
            </div>
        </div> 
           ))} 
       
        
        
        
        </div>
    )
}
