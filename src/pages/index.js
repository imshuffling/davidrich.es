import React from 'react'
import Link from 'gatsby-link'

const IndexPage = () => (
  <section id='home'>
      <div className="control-width animated pulse">
        <h1 className="page-title">Hello I'm David.</h1>
        <h2 className="strap-line">A Front-end developer&nbsp;&amp; part-time hockey player from London.<br />
          <span>I like making things on the web,&nbsp;<a href="#case-studies">view my portfolio</a>&nbsp;or&nbsp;
          <a href="https://www.github.com/imshuffling">follow me on Github.</a></span>
        </h2>
      </div>

      <section id="case-studies">
        <div className="item" id="wateraid">
          <div className="item-inner">
            <span>Front end development | Drupal 8</span>
            <h3>WaterAid</h3>
            <p>Charity that works in partnership with local communities to establish water suppdives and toilets.</p>
            <p>As part of Mirum I worked on the Front-end using Drupal 8.</p>
            <a className="view-site" target="_blank" href="https://www.wateraid.org/uk/">View site</a>
          </div>
        </div>
        <div className="item" id="hb-cleaning">
          <div className="item-inner">
            <span>Front end development | Drupal 7</span>
            <h3>HB Cleaning</h3>
            <p>A carpet and upholstery cleaning company based in Portsmouth.</p>
            <a className="view-site" target="_blank" href="http://www.hb-cleaningltd.co.uk/">View site</a>
          </div>
        </div>
        <div className="item" id="mj-speechtherapy">
          <div className="item-inner">
            <span>Front end development | Drupal 7</span>
            <h3>Mary Jane - Speech Therapy</h3>
            <p>Client wanted a fun looking website for her Speech therapy business based in Kent.</p>
            <a className="view-site" target="_blank" href="http://mj-speechtherapy.co.uk/">View site</a>
          </div>
        </div>
        <div className="item" id="tbl">
          <div className="item-inner">
            <span>Logo</span>
            <h3>TBL</h3>
            <p>A logo was needed for a festival hockey side. Team colours were orange, black and white. Here is the finished product.</p>
          </div>
        </div>
        <div className="item" id="southern-sports">
          <div className="item-inner">
            <span>Branding | Magento</span>
            <h3>Southern Sports</h3>
            <p>Online Sports shop using Magento CMS</p>
            <p>Logo and branding was given a refresh, PayPal payment gateway was bolted on for processing transactions.</p>
          </div>
        </div>
        <div className="item" id="sarah">
          <div className="item-inner">
            <span>Wordpress</span>
            <h3>Sarah Riches</h3>
            <p>The site was built for a relative who wanted to showcase some of her photos, media including videos and her achievements.</p>
          </div>
        </div>
        <div className="item" id="bailey">
          <div className="item-inner">
            <span>Branding | UX | Website</span>
            <h3>Bailey Photography</h3>
            <p>Portfolio photography website, cdivent wanted a simple yet effective way to show of his photographs.</p>
          </div>
        </div>
        <div className="item" id="brand-hub">
          <div className="item-inner">
            <span>Branding | Front end development | Drupal 7</span>
            <h3>Brand Hub</h3>
            <p>The client needed a website and a logo for his startup business. The site is built was Drupal 7, using the omega boilerplate.</p>
          </div>
        </div>
        <div className="item" id="thirsty-thursdays">
          <div className="item-inner">
            <span>Branding</span>
            <h3>Thirsty Thursdays</h3>
            <p>Logo concept for a night out called "Thirsty Thursdays".</p>
          </div>
        </div>
      </section>

      <section className="control-width" id='about'>
        <h1 className="page-title">About me</h1>
        <h2>This site is built using React.js / react-router, webpack &amp; Express + Babel/SASS.</h2>
        <h2>The main typeface is <a target="_blank" href="https://fonts.google.com/specimen/Karla">Karla</a>,
        with some <a target="_blank" href="https://fonts.google.com/specimen/Crimson+Text">Crimson text</a> for the
         main navigation and Bebas for the logo.</h2>

        <section id="what-ive-been">
          <h3>What have I been up to...</h3>
          <ul>
            <li>
              <span className="tag">March 2017 - current</span>
              <p>Mirum</p>
            </li>
            <li>
              <span className="tag">November 2013 - February 2017</span>
              <p>NDP - Drupal developer</p>
            </li>
            <li>
              <span className="tag">July 2012 - November 2013</span>
              <p>Tui travel - Front-end developer</p>
            </li>
            <li>
              <span className="tag">March 2010 - July 2012</span>
              <p>Tui travel - Junior Drupal developer</p>
            </li>
          </ul>
        </section>

      </section>


    </section>
)

export default IndexPage
