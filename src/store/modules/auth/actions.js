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

        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiredIn,
        });
    },
    logout(context) {
        context.commit('setUser', {
            token: null,
            userId: null,
            tokenExpiration: null,
        })
    }
}