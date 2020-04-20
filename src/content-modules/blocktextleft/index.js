import React from 'react'

export default function BlockTextLeft({title, body}) {
  return (
    <div className="section text-area-left" data-aos="fade-in" data-aos-once="true">
        <h3>{title}</h3>
        <div dangerouslySetInnerHTML={{__html:body.childMarkdownRemark.html}} />
    </div>
  );
}