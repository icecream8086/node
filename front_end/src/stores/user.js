import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
    type: '',
    name: '',
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
    setName(newName) {
      this.name = newName;
    },
    clearName() {
      this.name = '';
    },
    updateAuth(newToken, newType) {
      this.token = newToken;
      this.type = newType;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'auth',
        storage: localStorage,
      },
    ],
  },
});

