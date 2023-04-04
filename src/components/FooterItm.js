import React, { useState } from 'react';
import chevron from '../assets/icons/chevron.svg';

const FooterItm = ({ itm }) => {
  const { title, links } = itm;
  const [active, setActive] = useState(false);
  return (
    <article className={`FooterItm ${active ? 'active' : ''}`}>
      <h4 onClick={() => setActive(!active)}>
        <span>{title}</span>
        <img src={chevron} />
      </h4>
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            <a target="_blank" href={link.url}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
};
export default FooterItm;
