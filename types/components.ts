import type { ReactNode } from 'react';
import type { PortfolioItem, ContentfulBlock } from './contentful';
import type { CardSlot } from '@/utils/cardLayout';

// Layout Component Props
export interface LayoutProps {
  children: ReactNode;
}

// Portfolio Card Props
export interface PortfolioCardProps {
  item: PortfolioItem;
  slot: CardSlot;
}

// Blocks Props
export interface BlocksProps {
  blocksCollection: {
    items: ContentfulBlock[];
  };
}
