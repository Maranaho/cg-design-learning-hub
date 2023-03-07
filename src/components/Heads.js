import { useState,useEffect } from 'react'
import chevron from '../assets/icons/chevron.svg'
import sort from '../assets/icons/sort.svg'





const Admin = ()=>{
  const [ sortKey,setSortKey ] = useState(null)
  const handleSort = key => {
    const newKey = sortKey !== key ? key : null
    window.localStorage.setItem("sortKey",newKey)
    setSortKey(newKey)
  }

  useEffect(()=>setSortKey(window.localStorage.getItem("sortKey")),[])

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