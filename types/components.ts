import type { ReactNode } from 'react';
import type {
  PortfolioItem,
  SideProject,
  Service,
  ContentfulBlock,
} from './contentful';

// Layout Component Props
export interface LayoutProps {
  children: ReactNode;
}

// Portfolio Card Props
export interface PortfolioCardProps {
  item: PortfolioItem;
  priority?: boolean;
  index?: number;
}

// Blocks Props
export interface BlocksProps {
  blocksCollection: {
    items: ContentfulBlock[];
  };
}

// Side Projects Props
export interface SideProjectsProps {
  node: SideProject;
}

// Page Props
export interface HomePageProps {
  portfolioCollection: PortfolioItem[];
  sideProjectsCollection: SideProject[];
}

export interface ServicesPageProps {
  servicesCollection: Service[];
}

export interface PortfolioPageProps {
  portfolioItem: PortfolioItem;
}
