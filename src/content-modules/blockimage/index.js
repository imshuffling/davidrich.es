import React from 'react'
import Img from 'gatsby-image'

export default function BlockImage({image}) {
  return (
    <div className="section image">
      <Img fluid={image.fluid} />
    </div>
  );
}