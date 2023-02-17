import { useState,useEffect } from 'react'
import { db,collection, query, orderBy, startAfter, limit, getDocs } from '../utils/firebase'


const useAssets = ()=>{
  const [assets,setAssets] = useState(null)



  useEffect(()=>{
    const getAssetFromFB = async()=>{
      const firstPage = []
      const firstAsset = query(collection(db, "mg3/assetsData/assetList/"), orderBy("createdAt"), limit(40))
      const documentSnapshots = await getDocs(firstAsset)

      const lastVisibleAsset = documentSnapshots.docs[documentSnapshots.docs.length-1]

      const nextAsset = query(collection(db, "mg3/assetsData/assetList/"),
        orderBy("createdAt"),
        startAfter(lastVisibleAsset),
        limit(40))

      documentSnapshots.forEach(snap=> {
        const asset = snap.data()
        asset.assetID = snap.id
        firstPage.unshift(asset)
      })
      setAssets(firstPage)
    }
    getAssetFromFB()
  },[])

  if(assets)return assets
}

export default useAssets
