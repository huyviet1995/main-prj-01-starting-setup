export default {
    async login(context, payload) {
        context.dispatch('auth', { ...payload, mode: 'login' });
    },
    async signup(context, payload) {
        context.dispatch('auth', { ...payload, mode: 'signup' });
    },
    async auth(context, payload) {
        const mode = payload.mode;
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCVlygBg2OVSO24rb2t_w5Hfqy87wJOT-Q';
        if (mode === 'signup') {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCVlygBg2OVSO24rb2t_w5Hfqy87wJOT-Q';
        }
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true,
            })
        })

        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to authenticate');
            throw error;
        }

        localStorage.setItem('token', responseData.idToken);
        localStorage.setItem('userId', responseData.localId);

        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiredIn,
        });
    },
    tryLogin(context) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (token && userId) {
            context.commit('setUser', {
                token,
                userId,
                tokenExpiration: null,
            });
        }
    },
    logout(context) {
        context.commit('setUser', {
            token: null,
            userId: null,
            tokenExpiration: null,
        })
    }
}