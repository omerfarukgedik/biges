import {
    GET_CONTACTS,
    GET_USERS,
} from '@/store/types/actions.type'

export const state = () => ({
    addContactModal: false,
    shareModal: false,
})

export const actions = {
    async nuxtServerInit({ dispatch }, { app, $axios, store, redirect, $auth }) {
        if($auth.user) {
            await $axios
                .get(`/contacts?user=${$auth.user.id}`)
                .then(response => dispatch(`contacts/${GET_CONTACTS}`, response.data))
                .catch(err => console.log(err));

            await $axios
                .get(`/users`)
                .then(response => dispatch(`users/${GET_USERS}`, response.data))
                .catch(err => console.log(err));
        }
    }
}