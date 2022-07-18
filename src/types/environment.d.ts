declare global {
    namespace NodeJS {
      interface ProcessEnv {
        DB: string
        DB_USER: string
        DB_PASSWORD: string
        DB_HOST: string
      }
    }
  }
  
  export {}