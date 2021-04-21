import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";

export default function BlockImage({ image, lazyLoad }) {
  return (
    <div className="section image">
      <GatsbyImage
        image={image.gatsbyImageData}
        alt={image.file.fileName}
        lazy={lazyLoad ? "lazy" : "eager"}
      />
    </div>
  );
}
