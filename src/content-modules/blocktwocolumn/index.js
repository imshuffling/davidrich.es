import React from "react";

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
      <img src={image.file.url} alt={image.file.fileName} />
      <div
        dangerouslySetInnerHTML={{ __html: body.childMarkdownRemark.html }}
      />
    </div>
  );
}
