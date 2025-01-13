
export default interface AuthState {
    token: string | null;
    status: 'idle' | 'signOut' | 'signIn';
    signIn: (data: string) => void;
    signOut: () => void;
    hydrate: () => void;
  }
