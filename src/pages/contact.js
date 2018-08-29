import React from 'react'
import { navigateTo } from 'gatsby-link'
import Helmet from 'react-helmet';
import Layout from "../components/layout"

function encode(data) {
  return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
}

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit = e => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...this.state })
    })
      .then(() => navigateTo('/thanks/'))
      .catch(error => alert(error));

    e.preventDefault();
  };

  render() {
    return (
      <Layout>
      <Helmet
        title="Contact | David Riches"
      />
      <section id='contact' className="animated fadeIn">

        <section>
          <h1 className="page-title">Contact me</h1>
          <h2>I am available for small projects and contract work.<br />
            <span className="email">
              E-mail me at&nbsp;
              <a href="mailto:hi@davidrich.es"><span>hi</span>
              <span>@</span>
              <span>d</span>
              <span>a</span>
              <span>v</span>
              <span>i</span>
              <span>d</span>
              <span>r</span>
              <span>i</span>
              <span>c</span>
              <span>h</span>
              <span>.</span>
              <span>e</span>
              <span>s</span></a>
            </span>
          </h2>

          <form
            name="contact"
            method="post"
            action="/thanks"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={this.handleSubmit}
          >
            <p hidden>
              <label>
                Don’t fill this out: <input name="bot-field" onChange={this.handleChange} />
              </label>
            </p>
            <input type="email" name="email" placeholder="Your email" required onChange={this.handleChange}/>
            <textarea name="message" placeholder="Your message" required onChange={this.handleChange}/>
            <button type="submit">Send</button>
          </form>

        </section>
      </section>
      </Layout>
    );
  }
}
