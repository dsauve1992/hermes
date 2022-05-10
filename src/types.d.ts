import session from 'express-session'

declare module 'express-session' {
  export interface SessionData {
    messages: string[]
  }
}

declare global {
  namespace Express {
    interface User {
      id: string
      username: string
      displayName: string
    }
  }
}
