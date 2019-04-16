import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        recipes: [],
        apiUrl: 'https://api.edamam.com/search'
    },
    mutations: {
        setRecipes(state, payload) {
            state.recipes = payload;
        }
    },
    actions: {
        async getRecipes({
            state,
            commit
        }, plan) {
            try {
                let response = await axios.get(`${state.apiUrl}`, {
                    params: {
                        q: plan,
                        app_id: '800c8763',
                        app_key: 'd84f155dddf6b6c96b8e3907d2694dab',
                        from: 0,
                        to: 9
                    }
                });
                commit('setRecipes', response.data.hits);
            } catch (error) {
                commit('setRecipes', []);
            }
        }
    }
});