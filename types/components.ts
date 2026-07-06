import type { ReactNode } from 'react';
import type { PortfolioItem, ContentfulBlock } from './contentful';

// Layout Component Props
export interface LayoutProps {
  children: ReactNode;
}

// Portfolio Card Props
export interface PortfolioCardProps {
  item: PortfolioItem;
  priority?: boolean;
  index?: number;
  loading?: 'lazy' | 'eager';
}

// Blocks Props
export interface BlocksProps {
  blocksCollection: {
    items: ContentfulBlock[];
  };
}
