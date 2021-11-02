import React, { useState, useEffect } from 'react'
import MainContent from '../components/MainContent'
import SideMenu from '../components/SideMenu'
import axios from 'axios'

import TopMenu from '../components/TopMenu'
import AssetCard from '../components/AssetCard'
import useSWR from 'swr'


const fetcher = (url) => {
    
  return axios.get(url).then(res => res.data)
  
     }

export default function Home({gas, assets, collection, eth}) {
  const [custom, setCustom] = useState(false)
  
const [address, setAddress] = useState('0x7f1884d93061ed1f44b65d537e782781bc728d58')

  const [userAssets, setUserAssets] = useState(assets)

  // const [newData, setNewData] = useState()

  // const [renderData, setRenderData] = useState()

  const [coll, setColl] = useState([])

  

  const { data, error } = useSWR(`https://api.opensea.io/api/v1/assets?owner=${address}&order_direction=desc&offset=0&limit=8`, fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  

//   const getAddress = async () => {
    
    
//     await axios.get(`https://api.opensea.io/api/v1/assets?owner=${address}&order_direction=desc&offset=0&limit=20`)
//         .then((response) => {
//             setUserAssets(response.data)
            
            
//         })
//         .catch((error) => {
//           console.log(error)
//         })
// }

const getCollection = async () => {
  
  setColl([])
  assets.assets.map((item) => {
    axios.get(`https://api.opensea.io/api/v1/collections?asset_owner=${item.creator.address}&offset=0&limit=300`)
      .then((response) => {
        
        
        let newColl = response.data[0].stats.floor_price ? response.data[0].stats.floor_price : 'n/a'
        console.log(newColl)
        newColl === undefined ? 'N/A' : newColl = response.data[0].stats.floor_price
        setColl(coll => [...coll, newColl])
        
        
      })
  })
  
}

// useEffect(() => {
//   //newData ? setRenderData(newData) : setRenderData(assets)
  
//    //getCollection()
  
  
// },[])

  
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
        getCollection={getCollection}
        coll={coll}
        setColl={setColl}
        
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
        coll={coll}
        // newData={newData}
        // setNewData={setNewData}
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