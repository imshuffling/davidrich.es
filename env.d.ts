declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CONTENTFUL_SPACE_ID: string;
      CONTENTFUL_ACCESS_KEY: string;
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

export {};
