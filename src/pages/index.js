import React from 'react'
import Link from 'gatsby-link'
import Scrollchor from 'react-scrollchor';

const IndexPage = () => (
  <section id='home' className="animated fadeIn">
      <div className="control-width">
        <h1 className="page-title">Hello I'm David.</h1>
        <h2 className="strap-line">A Front-end developer&nbsp;&amp; part-time hockey player from London.<br />
          <span>I like making things on the web,&nbsp;
          <Scrollchor to="#case-studies" animate={{offset: -30, duration: 500}}>view my portfolio</Scrollchor>
          &nbsp;or&nbsp;
          <a target="_blank" rel="noopener" href="https://www.github.com/imshuffling">follow me on Github.</a></span>
        </h2>
        <h2>This site is built using <a target="_blank" rel="noopener" href="https://www.gatsbyjs.org/">Gatsby.js.</a></h2>
      </div>

      <section id="case-studies" className="control-width">
        <div className="item" id="wateraid">
          <div className="item-inner">
          <video autoPlay loop playsInline muted className="case-study-video">
            <source src="https://player.vimeo.com/external/239986765.hd.?s=2502b606c4fd584dd00f0b0515456f5adeed5e35&amp;profile_id=175 " type="video/mp4" />
          </video>
          <span>Front end development | Drupal 8</span>
          <h3>WaterAid</h3>
          <p>Charity that works in partnership with local communities to establish water suppdives and toilets.</p>
          <p>As part of Mirum I worked on the Front-end using Drupal 8.</p>
          <a className="view-site" target="_blank" rel="noopener" href="https://www.wateraid.org/uk/">View site</a>
          </div>
        </div>
        <div className="item" id="mj-speechtherapy">
          <div className="item-inner">
            <span>Front end development | Drupal 7</span>
            <h3>Mary Jane - Speech Therapy</h3>
            <p>Client wanted a fun looking website for her Speech therapy business based in Kent.</p>
            <a className="view-site" target="_blank" rel="noopener" href="http://mj-speechtherapy.co.uk/">View site</a>
          </div>
        </div>
        <div className="item" id="hb-cleaning">
          <div className="item-inner">
            <span>Front end development | Drupal 7</span>
            <h3>HB Cleaning</h3>
            <p>A carpet and upholstery cleaning company based in Portsmouth.</p>
            <a className="view-site" target="_blank" rel="noopener" href="http://www.hb-cleaningltd.co.uk/">View site</a>
          </div>
        </div>
        <div className="item" id="brand-hub">
          <div className="item-inner">
            <span>Branding | Front end development | Drupal 7</span>
            <h3>Brand Hub</h3>
            <p>The client needed a website and a logo for his startup business. The site is built was Drupal 7, using the omega boilerplate.</p>
          </div>
        </div>
      </section>
    </section>
)

export default IndexPage
