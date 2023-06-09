import { useState } from "react"
import uuidv4 from "uuid/v4"
const AddLink = ({handleUpdateData}) =>{
    const [link,setLink] = useState({
        label:"",
        url:""
    })

    const handleAdd = ()=>{
        const {label,url} = link
        if(label !== "" && url!=="") handleUpdateData(uuidv4(),link)
        setLink({
            label:"",
            url:""
        })
    }
    return (
        <div className="AddLink">
            <input
                type="text"
                value={link.label}
                placeholder="Text to display"
                onChange={e=>setLink({label:e.target.value,url:link.url})}/>
            <input
                type="url"
                value={link.url}
                placeholder="http://someurl.com"
                onChange={e=>setLink({label:link.label,url:e.target.value})}/>
            <button onClick={handleAdd}>Add</button>
        </div>
    )
}
export default AddLink