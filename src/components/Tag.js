const Tag =({tagKey,tags,cb})=>{
    const { color,label } = tags[tagKey]
    const colors = ["red","green","purple","blue","yellow","pink"]
    const handleTagClick = ()=>{
      if(cb)cb(tagKey)
    }
    return (
      <article className={`Tag ${colors[color]}`} onClick={handleTagClick}>
        <span>#{label}</span>
      </article>
    )
  }
  export default Tag