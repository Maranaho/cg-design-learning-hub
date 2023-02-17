import { useState,useEffect } from 'react'
import { db,doc,getDoc } from '../utils/firebase'

const useAsset = assetID =>{

  const [asset,setAsset] = useState(null)


  useEffect(()=>{
    const getAssetFromFB = async()=> {

      const dbAsset = doc(db,"mg3/assetsData/assetList/"+assetID)
      const snap = await getDoc(dbAsset)
      if(snap.exists())setAsset(snap.data())
    }
    getAssetFromFB()
  },[])

  if(asset)return asset
}

export default useAsset
