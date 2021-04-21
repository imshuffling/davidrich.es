import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";

export default function BlockTwoColumn({ image, body, imageFirst }) {
  return (
    <div
      className={
        imageFirst ? "section two-column" : "section two-column__reversed"
      }
      data-aos="fade-in"
      data-aos-delay="300"
      data-aos-once="true"
    >
      <GatsbyImage
        image={image.gatsbyImageData}
        alt={image.file.fileName}
        lazy="lazy"
      />
      <div
        dangerouslySetInnerHTML={{ __html: body.childMarkdownRemark.html }}
      />
    </div>
  );
}
