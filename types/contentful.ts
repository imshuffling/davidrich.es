// Contentful Asset Types
export interface ContentfulImage {
  url: string;
  fileName: string;
  width: number;
  height: number;
  blurDataURL?: string;
}

export interface ContentfulVideo {
  url: string;
  fileName: string;
  description?: string;
}

// Rich Text Document Type
export interface RichTextDocument {
  json: any; // Contentful rich text JSON structure is complex
}

// Portfolio Types
export interface PortfolioItem {
  title: string;
  slug: string;
  seoTitle: string;
  client: string;
  agency: string;
  industry: string;
  link?: string;
  completed?: string;
  timeframe?: string;
  otherProjects?: boolean;
  media?: ContentfulVideo;
  image: ContentfulImage;
  body: RichTextDocument;
  blocksCollection?: {
    items: ContentfulBlock[];
  };
  footerCollection?: {
    items: PortfolioItem[];
  };
}

// Side Project Types
export interface SideProject {
  id?: string;
  title: string;
  description?: string;
  link?: string;
  githubUrl?: string;
}

// Service Types
export interface Service {
  title: string;
  emojiImage: string;
  body: RichTextDocument;
}

// Block Types
export type ContentfulBlock =
  | BlockTextLeft
  | BlockTextArea
  | BlockImage
  | BlockVideo
  | BlockTwoColumn;

export interface BlockTextLeft {
  __typename: 'TextLeft';
  title: string;
  body: string;
}

export interface BlockTextArea {
  __typename: 'TextArea';
  title: string;
  body: string;
  centerText?: boolean;
}

export interface BlockImage {
  __typename: 'Image';
  image: ContentfulImage;
  lazyLoad?: boolean;
  aspectRatio?: '16/9' | '4/3' | '1/1';
}

export interface BlockVideo {
  __typename: 'Video';
  video: ContentfulVideo;
  image: ContentfulImage;
}

export interface BlockTwoColumn {
  __typename: 'TwoColumn';
  image: ContentfulImage;
  body: string;
  imageFirst?: boolean;
}
