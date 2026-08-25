import type { ReactNode } from 'react';
import type { PortfolioItem, ContentfulBlock } from './contentful';
import type { ImageVariant } from '@/components/ImageWrapper';

// Layout Component Props
export interface LayoutProps {
  children: ReactNode;
}

// Portfolio Card Props
export interface PortfolioCardProps {
  item: PortfolioItem;
  priority?: boolean;
  index?: number;
  imageVariant?: ImageVariant;
}

// Blocks Props
export interface BlocksProps {
  blocksCollection: {
    items: ContentfulBlock[];
  };
}
