import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: '',
        type: '',
    }),
    actions: {
        setToken(newToken) {
            this.token = newToken;
        },
        clearToken() {
            this.token = '';
        },
        setType(newType) {
            this.type = newType;
        },
        clearType() {
            this.type = '';
        },
        updateAuth(newToken, newType) {
            this.token = newToken;
            this.type = newType;
        },
    },
});
