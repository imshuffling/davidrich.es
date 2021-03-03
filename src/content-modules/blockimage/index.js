import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'

export default function BlockImage({image}) {
  return (
    <div className="section image">
        <GatsbyImage fluid={image.fluid} />
    </div>
  );
}