import React from 'react'

export default function BlockImage({image}) {
  return (
    <div className="section image" data-aos="fade-in" data-aos-delay="300" data-aos-once="true">
        <img src={image.file.url} alt={image.file.alt} />
    </div>
  );
}