import React, { useState, useEffect } from 'react'
import axios from 'axios'

import TopMenu from '../components/TopMenu'
import AssetCard from '../components/AssetCard'
import useSWR from 'swr'


export default function Home({gas, assets, collection, eth}) {
  const [custom, setCustom] = useState(false)
  
  const [address, setAddress] = useState('0x7f1884d93061ed1f44b65d537e782781bc728d58')

  const [userAssets, setUserAssets] = useState(assets)

  const [myData, setMyData] = useState()

  const [floors, setFloors] = useState()

  // remember to add back page index for offset
  async function getAssets() {
    await axios.get(`https://api.opensea.io/api/v1/assets?owner=${address}&order_direction=desc&offset=0&limit=12`)
       .then((res) => setMyData(res.data))
 }

 function getFloor() {
  myData.assets.map((item) => {
    axios.get(`https://api.opensea.io/api/v1/collection/${item.collection.name}/stats`).then((res) => setFloors((prev) => [...prev, res.status.floor_price]))
  })
}


  useEffect(() => {
    getAssets()
    myData != undefined ? getFloor() : null
    // getFloor()
  }, [address])


  return (
    <div className='overflow-hidden  h-full w-full'> 
      
      <TopMenu 
        gas={gas}
        assets={assets}
        eth={eth}
        custom={custom}
        setCustom={setCustom}
        address={address}
        setAddress={setAddress}
        // getAddress={getAddress}
        userAssets={userAssets}
        setUserAssets={setUserAssets}
        
      />
      <div className='flex overflow-hidden justify-center mainPageWrapper'>
           
      <AssetCard 
        gas={gas}
        assets={assets}
        collection={collection}
        eth={eth}
        custom={custom}
        setCustom={setCustom}
        userAssets={userAssets}
        setUserAssets={setUserAssets}
        address={address}
        myData={myData}
        getFloor={getFloor}
        floors={floors}
      />
      </div>
        
    </div>
  )
}

export const getStaticProps = async () => {
  
  const res =  await fetch('https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=TN6ASKREZBRDDQFR5BPA3DN489PP29X9C6')
  const res2 = await fetch(`https://api.opensea.io/api/v1/assets?owner=0x7f1884d93061ed1f44b65d537e782781bc728d58&order_direction=desc&offset=0&limit=20`)
  const res3 = await fetch('https://api.opensea.io/api/v1/collections?asset_owner=0xa64b407d4363e203f682f7d95eb13241b039e580&offset=0&limit=300')
  const res4 = await fetch('https://api.etherscan.io/api?module=stats&action=ethprice&apikey=TN6ASKREZBRDDQFR5BPA3DN489PP29X9C6')
          const data = await res.json()
          const data2 = await res2.json()
          const data3 = await res3.json()
          const data4 = await res4.json()
          

          if (!data) {
           return {
             notFound: true,
           }
         }

           return {
               props: { gas: data,
                        assets: data2,
                        collection: data3,
                        eth: data4,
                        
                        }
           }
}