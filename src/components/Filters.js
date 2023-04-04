import React from 'react';
import { useHubState } from '../hub-context';

const Filters = () => {
  const {
    state: { tags, currentTag },
    dispatch,
  } = useHubState();

  return (
    <section className="Filters center">
      {Object.keys(tags).map((tagKey) => (
        <button
          className={`tag ${currentTag === tagKey ? 'selected' : ''}`}
          onClick={() =>
            dispatch({
              type: 'CURRENT_TAG',
              payload: currentTag === tagKey ? null : tagKey,
            })
          }
          key={tagKey}
        >
          {tags[tagKey]}
        </button>
      ))}
    </section>
  );
};
export default Filters;
