interface AuthProvider {
    isAuthenticated: boolean;
    user: null | string;
    signIn(username: string): Promise<void>;
    signOut(): Promise<void>;
}

export const AuthProvider: AuthProvider = {
    isAuthenticated: true,
    user: null,
    async signIn(user: string) {
        this.isAuthenticated = true;
        this.user = user;
    },
    async signOut() {
        this.isAuthenticated = false;
        this.user = null;
    }
}