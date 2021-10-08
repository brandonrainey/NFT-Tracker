import React, { useState } from 'react'
import MainContent from '../components/MainContent'
import SideMenu from '../components/SideMenu'
import axios from 'axios'

import TopMenu from '../components/TopMenu'
import AssetCard from '../components/AssetCard'

export default function Home({gas, assets, collection, eth}) {
  const [custom, setCustom] = useState(false)
  
const [address, setAddress] = useState('0x7f1884d93061ed1f44b65d537e782781bc728d58')

  const [userAssets, setUserAssets] = useState(assets)

  const [coll, setColl] = useState([])

  const getAddress = async () => {
    await axios.get(`https://api.opensea.io/api/v1/assets?owner=${address}&order_direction=desc&offset=0&limit=20`)
        .then((response) => {
            setUserAssets(response.data)
            
            console.log(userAssets)
        })
        .catch((error) => {
          console.log(error)
        })
}

const getCollection = async () => {
  setColl([])
  userAssets.assets.map(async (item) => {
    await axios.get(`https://api.opensea.io/api/v1/collections?asset_owner=${item.asset_contract.payout_address}&offset=0&limit=300`)
      .then((response) => {
        console.log(response)
        let newColl = response.data[0].stats.floor_price
        newColl === undefined ? 'N/A' : newColl = response.data[0].stats.floor_price
        setColl(coll => [...coll, newColl])
        
      })
  })
  
}
  
  return (
    <div > 
      
      <TopMenu 
        gas={gas}
        assets={assets}
        eth={eth}
        custom={custom}
        setCustom={setCustom}
        address={address}
        setAddress={setAddress}
        getAddress={getAddress}
        userAssets={userAssets}
        setUserAssets={setUserAssets}
        getCollection={getCollection}
        coll={coll}
        
      />
      <div className='flex '>
        <SideMenu 
          gas={gas}
          assets={assets}
          collection={collection}
          eth={eth}
        />
        
          <MainContent 
        gas={gas}
        assets={assets}
        collection={collection}
        eth={eth}
        address={address}
      />
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
        coll={coll}
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
