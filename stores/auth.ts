import type { TUser } from "~/types/user"

export const useAuthStore = defineStore("auth", () => {
    state: () => ({
        isAuthenticated: false,
        isLoggedIn: false,
        user: <TUser>{},
        authTokens: null
    })

    actions: { }
})