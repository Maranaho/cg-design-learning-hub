import React from 'react';
import { useHubState } from '../hub-context';

const Filters = () => {
  const {
    state: { tags, currentTag, path },
    dispatch
  } = useHubState();

  return (
    <section className="Filters center">
      {Object.keys(tags).map(tagKey => {
        if(tags[tagKey].craft !== path && path !== "") return null
        return (
          <button
            key={tagKey} 
            className={`tag ${currentTag === tagKey ? 'selected' : ''}`}
            onClick={()=>
              dispatch({
                type: 'CURRENT_TAG',
                payload: currentTag === tagKey ? null : tagKey,
              })
            }>{tags[tagKey].label}</button>
        )
      })}
    </section>
  );
};
export default Filters;
