import React from 'react'

export default function BlockTextArea({title, body, centerText}) {
  return (
    <div className={centerText ? 'section text-area__center' : 'section text-area'} data-aos="fade-in" data-aos-once="true">
        <h3>{title}</h3>
        <div dangerouslySetInnerHTML={{__html:body.childMarkdownRemark.html}} />
    </div>
  );
}