import React from 'react'

export default function SideMenu({eth}) {
    return (
        
        <div className='w-1/6 bg-gray-200 h-screen'>
            {`Current ETH price: $${eth.result.ethusd}`}
        </div>
    
    )
}
