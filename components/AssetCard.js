import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import useSWR from "swr";
import Pagination from "./Pagination";
import Loading from "./Loading";

const fetcher = (url) => {
  return axios.get(url).then((res) => res.data);
};



export default function AssetCard({
  custom,
  setCustom,
  address,
  myData,
  getFloor,
  floors,
  assets,
}) {
  const topRef = useRef();

  

  const [loading, setLoading] = useState(false);

  const scrollToTop = () => {
    topRef.current.scrollIntoView({ block: "start" });
  };

  const [pageIndex, setPageIndex] = useState(0);

  const [pageNumber, setPageNumber] = useState(1);

  const { data, error } = useSWR(
    `https://api.opensea.io/api/v1/assets?owner=${address}&order_direction=desc&offset=${pageIndex}&limit=12`,
    fetcher
  );

  

  if (error) return <div>failed to load</div>;
  if (!data) return <Loading type="spinningBubbles" />;
  

    // useEffect(() => {

    // }, [])
console.log(myData)
  return (
    <div className="flex flex-col overflow-y-hidden mainPage relative">
      <div
        className="flex gap-x-10 ml-4 mt-4 flex-wrap flex-4 gap-y-20 justify-center"
        ref={topRef}
      >
        {data.assets.map((item, index) => (
          <div className="border w-64 rounded-t-xl rounded-xl shadow-xl descBackground">
            <div className="h-64  rounded-t-xl">
              {/* <Loading style={{display: loading ? "block" : "none"}}/> */}
              <img
                src={
                  item.image_original_url
                    ? item.image_original_url
                    : item.asset_contract.image_url ? item.asset_contract.image_url : <Loading />
                }
                className="h-full w-full rounded-t-xl"
                style={{ display: loading ? "none" : "block" }}
                onLoad={() => setLoading(false)}
              />
            </div>
            <div className='cardName'><p>{item.name}</p></div>

            <div className="flex">
                {/* last sale tile */}
              <div className="border flex-3 rounded-bl-xl text-center bg-gray-200 hover:bg-blue-300 font-medium text-sm">
                <div className="mt-2">Last Sale</div>
                {`${
                  item.last_sale != null
                    ? `${(
                        item.last_sale.total_price * 0.000000000000000001
                      ).toFixed(2)}  ETH`
                    : "N/A"
                }`}
              </div>
              {/* floor tile */}
              <div className="border-l-2 border-r-2 flex-3 text-center bg-gray-200 hover:bg-blue-300 border-black font-medium text-sm">
                <button className="mt-2 border">Floor</button>
                {` ETH`}
              </div>
              {/* check rarity title */}
              <div className="border flex-3 rounded-br-xl text-center bg-gray-200 hover:bg-blue-300 flex items-center">
                <a
                  href={`https://rarity.tools/theninjahideout/view/${item.token_id}`}
                  className="underline font-medium text-sm "
                >
                  Check Rarity
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center paginationWrapper">
        <div className="mt-2 absolute bottom-0 pb-2  paginationBar">
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
  );
}
