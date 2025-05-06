import type { TNewUser } from "~/types/user"

export const useAuthStore = defineStore("auth", {
    state: () => ({
        isAuthenticated: false,
        isLoggedIn: false,
        user: null,
        authTokens: null
    }),

    actions: {
        async registerUser(credentials: TNewUser) {

        },
    }
})