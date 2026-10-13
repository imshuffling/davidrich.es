import { BLOCKS_FRAGMENT } from "@/blocks/registry";

export const HOME_QUERY = `
  query {
    featuredProjectsCollection(limit: 10) {
      items {
        itemCollection {
          items {
            title
            slug
            client
            agency
            industry
            services
            body { json }
            media { url }
            image { url fileName width height }
          }
        }
      }
    }
    sideProjectsCollection(limit: 10) {
      items {
        title
        description
        link
        githubUrl
      }
    }
  }
`;

export const FEATURED_ORDER_QUERY = `
  query {
    featuredProjectsCollection(limit: 10) {
      items {
        itemCollection {
          items {
            title
            slug
          }
        }
      }
    }
  }
`;

export const PORTFOLIO_QUERY = `
  query GetPortfolioItem($slug: String!) {
    portfolioCollection(where: { slug: $slug }, limit: 1) {
      items {
        title
        seoTitle
        body { json }
        slug
        link
        agency
        client
        industry
        timeframe
        completed
        services
        sys {
          publishedAt
          firstPublishedAt
        }
        blocksCollection {
          items {
            __typename
            ${BLOCKS_FRAGMENT}
          }
        }
        footerCollection {
          items {
            title
            slug
            link
            agency
            industry
            image { url fileName width height }
            media { url }
          }
        }
      }
    }
  }
`;

export const PORTFOLIO_SLUGS_QUERY = `
  query {
    portfolioCollection(limit: 100) {
      items {
        slug
        sys { publishedAt }
      }
    }
  }
`;

export const SERVICES_QUERY = `
  {
    servicesCollection {
      items {
        title
        body { json }
      }
    }
  }
`;

export const ABOUT_QUERY = `
  {
    resumeCollection(limit: 1) {
      items {
        image { url fileName width height }
      }
    }
    jobCollection(order: date_DESC, limit: 20) {
      items { title company companyLink date to }
    }
    skillsCollection(limit: 1) {
      items { skill }
    }
  }
`;
