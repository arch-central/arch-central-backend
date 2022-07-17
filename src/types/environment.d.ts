declare global {
    namespace NodeJS {
      interface ProcessEnv {
        DB: string
        USER: string
        PASSWORD: string
        HOST: string
      }
    }
  }
  
  export {}