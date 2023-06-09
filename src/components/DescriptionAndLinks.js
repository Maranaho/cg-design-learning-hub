import Wisiwyg from './Wisiwyg'
import Links from './Links'
import { useState } from 'react'

const DescriptionAndLinks = ()=>{

    const [showDescription, setShowDescription] = useState(true)
    const handleTabClick = e => {
        if(e.target.nodeName === "LABEL")setShowDescription(e.target.innerText === "Description")
    }

    return (
        <div className="DescriptionAndLinks" onClick={handleTabClick}>
            <div className="tabs">
                <label className={`${showDescription?"active":""}`}>Description</label>
                <label className={`${!showDescription?"active":""}`}>Links</label>
            </div>
            {showDescription?<Wisiwyg/>:<Links/>}
        </div>
    )
}
export default DescriptionAndLinks