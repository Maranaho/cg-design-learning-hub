import { useState,useEffect } from 'react'
import chevron from '../assets/icons/chevron.svg'
import sort from '../assets/icons/sort.svg'
import { useGalleryState } from '../context/gallery-context'


const Admin = ()=>{
  const { state:{ sortKey },dispatch } = useGalleryState()

  const handleSort = key => {
    const newKey = sortKey !== key ? key : null
    window.localStorage.setItem("sortKey",newKey)
    dispatch({type:"SORT_KEY",payload:newKey})
  }

  useEffect(()=>dispatch({type:"SORT_KEY",payload:window.localStorage.getItem("sortKey")}),[])

  return (
    <thead>
      <tr>
        <th>
          <div className="sort"><img width="20" src={sort}/></div>
        </th>
        <th>
          <div onClick={()=>handleSort("title")}>
            <span>Title</span>
            <img className={`sortChevron ${sortKey === "title" ? "active" : ""}`} src={chevron}/>
          </div>
        </th>
        <th>
          <div>
            <span>Tags</span>
          </div>
        </th>
        <th>
          <div onClick={()=>handleSort("views")}>
            <span>Views</span>
            <img className={`sortChevron ${sortKey === "views" ? "active" : ""}`} src={chevron}/>
          </div>
        </th>
        <th>
          <div onClick={()=>handleSort("uploader")}>
            <span>Uploader</span>
            <img className={`sortChevron ${sortKey === "uploader" ? "active" : ""}`} src={chevron}/>
          </div>
        </th>
      </tr>
    </thead>
  )
}
export default Admin