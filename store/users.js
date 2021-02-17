import {
    SET_USERS,
} from '@/store/types/mutations.type'

import {
    GET_USERS,
} from '@/store/types/actions.type'

export const state = () => ({
    data: [],
})

export const mutations = {
    [SET_USERS](state, value) {
        state.data = value
    }
}

export const actions = {
    [GET_USERS]({ commit }, value) {
        commit(SET_USERS, value)
    },
}

export const getters = {
    getUsers: state => state.data,
    getUsersWithoutMe : state => (id) => state.data.filter(user => user.id !== id)
}