import React from 'react'
import PropTypes from 'prop-types'

import BlockTextLeft from './blocktextleft';
import BlockTextArea from './blocktextarea';
import BlockImage from './blockimage';
import BlockTwoColumn from './blocktwocolumn';

const MODULE_MAP = {
  ContentfulTextLeft: BlockTextLeft,
  ContentfulTextArea: BlockTextArea,
  ContentfulImage: BlockImage,
  ContentfulTwoColumn: BlockTwoColumn,
};

const propTypes = {
  blocks: PropTypes.any
};

export default function ContentModules({blocks}) {
  console.log('---', blocks);
  return (
    <>
      {blocks.map(({"__typename": type, ...props}, i) => {
        const Component = MODULE_MAP[type];
        return <Component key={i} {...props} />;
      })}
    </>
  );
}

ContentModules.propTypes = propTypes;
