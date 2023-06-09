import trash from '../assets/icons/trash.svg'
import { useState } from "react"

const LinkEditor = ({
    handleUpdateData,
    link,
    linkKey,
    handleRemoveLink}) => {
        const [labelFocus,setLabelFocus] = useState(false)
        const [urlFocus,setUrlFocus] = useState(false)
    const handleLinkEdit = (isLabel,val) =>{
        const tmpLink = {...link}
        tmpLink[isLabel?"label":"url"] = val
        handleUpdateData(linkKey,tmpLink)
    }
    return (
        <div className="LinkEditor">
            {labelFocus?(
                <input
                    type="text"
                    onMouseOver={e=>e.target.focus()}
                    onBlur={()=>setLabelFocus(false)}
                    onChange={e=>handleLinkEdit(true,e.target.value)}
                    value={link.label}/>
            ):(
                <span
                    onClick={()=>setLabelFocus(true)}
                    className="labelBlur">{link.label}</span>
            )}
            {urlFocus?(
                <input
                    type="url"
                    onMouseOver={e=>e.target.focus()}
                    onBlur={()=>setUrlFocus(false)}
                    onChange={e=>handleLinkEdit(false,e.target.value)}
                    value={link.url}/>
            ):(
                <span
                    onClick={()=>setUrlFocus(true)}
                    className="urlBlur">{link.url}</span>
            )}
            <button onClick={()=>handleRemoveLink(linkKey)}><img src={trash}/></button>
        </div>
    )
}

export default LinkEditor