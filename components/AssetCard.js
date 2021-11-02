import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import useSWR from 'swr'
import Pagination from './Pagination'

const fetcher = (url) => {
    
    return axios.get(url).then(res => res.data)
    
       }

export default function AssetCard({gas, assets, collection, custom, setCustom, userAssets, address, coll}) {
    const topRef = useRef()

    const scrollToTop = () =>{
        topRef.current.scrollIntoView({ block: 'start' })
      };

    const [pageIndex, setPageIndex] = useState(0)

    const [pageNumber, setPageNumber] = useState(1)

    const { data, error } = useSWR(`https://api.opensea.io/api/v1/assets?owner=${address}&order_direction=desc&offset=${pageIndex}&limit=12`, fetcher)

      if (error) return <div>failed to load</div>
      if (!data) return <div>loading...</div>
      
    

    //   useEffect(() => {
    //     scrollToTop()
    //      //setNewData(data)
    //      //console.log(newData)
    //   },[custom])
    
    return (
        
        <div className='flex flex-col overflow-y-hidden mainPage relative' >
            <div className='flex gap-x-10 ml-4 mt-4 flex-wrap flex-4 gap-y-4 justify-center' ref={topRef}>
                {data.assets.map((item, index) => (
            <div className='border w-60 rounded-t-xl rounded-xl shadow-xl descBackground'>
                <div className='h-60  rounded-t-xl'>
                    <img src={item.image_original_url ? item.image_original_url : item.asset_contract.image_url} className='h-full w-full rounded-t-xl'/>
                </div>
               <div className='h-28  flex flex-col border-b-2 border-black'>
                
                <div className='flex justify-center font-bold'>
                    {item.name}
                </div>
                    <div className='flex justify-center text-xs text-center overflow-y-auto'>
                        {item.collection.description}
                    </div>
                </div>
            <div className='flex'>
                
                <div className='border flex-3 rounded-bl-xl text-center bg-blue-200 hover:bg-blue-300 font-medium text-sm'>
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
           
       <div className='flex justify-center paginationWrapper'>
           <div className='mt-2 absolute bottom-0 pb-2  paginationBar'>
                    
                    <Pagination 
                        data={data}
                        pageIndex={pageIndex}
                        setPageIndex={setPageIndex}
                        pageNumber={pageNumber}
                        setPageNumber={setPageNumber}
                        topRef={topRef}
                        setCustom={setCustom}
                        custom={custom}
                        scrollToTop={scrollToTop}
                    />
                    
                    </div>
       </div>
            
        
        
        </div>
    )
}