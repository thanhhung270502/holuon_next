import { Session } from '@/types';

export class Token {
  getSession(): Session {
    const getSession = localStorage.getItem('session');
    const session: Session = getSession ? JSON.parse(getSession) : null;
    return session;
  }

  getAccessToken(): string {
    const session: Session = this.getSession();
    return session.accessToken;
  }

  setAccessToken(token: string) {
    const session: Session = this.getSession();
    session.accessToken = token;
    localStorage.setItem('session', JSON.stringify(session));
  }

  getRefreshToken(): string {
    const session: Session = this.getSession();
    return session.refreshToken;
  }

  setRefreshToken(token: string) {
    const session: Session = this.getSession();
    session.refreshToken = token;
    localStorage.setItem('session', JSON.stringify(session));
  }
}
