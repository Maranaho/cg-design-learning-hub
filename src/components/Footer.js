import React from 'react';
import footerJson from '../footer-json.json';
import FooterItm from './FooterItm';

const Footer = () => (
  <footer className="Footer">
    <section className="center">
      <div className="footerInner">
        <article>
          <h4>
            Have questions? Contact us on Slack <br />
            or swing by office hours!
          </h4>
          <h5>
            <span>Office hours every Thursday 11:05am PST</span>
            <a target="_blank" href="https://intuit.zoom.us/j/96903608926">
              Zoom link
            </a>
          </h5>
          <ul>
            <li>
              <a
                target="_blank"
                href="https://app.slack.com/client/T2G8RTHAM/C8AH11MF1"
              >
                #ask-cgds-design
              </a>
              : design questions for components
            </li>
            <li>
              <a
                target="_blank"
                href="https://app.slack.com/client/T2G8RTHAM/C3TDVMTKQ"
              >
                #ask-cg-visualdesign
              </a>
              : visual design questions
            </li>
            <li>
              <a
                target="_blank"
                href="https://app.slack.com/client/T2G8RTHAM/C01F1NTPYNP"
              >
                #cg-motion
              </a>
              : questions for motion/animations
            </li>
          </ul>
        </article>
        {footerJson.map((itm) => (
          <FooterItm itm={itm} key={itm.title} />
        ))}
      </div>
      <span>© 2023 Intuit Inc. All rights reserved.</span>
    </section>
  </footer>
);
export default Footer;
