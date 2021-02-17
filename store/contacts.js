import {
    SET_CONTACTS,
    SET_ADD_CONTACT,
    SET_DEL_CONTACT,
} from '@/store/types/mutations.type'

import {
    GET_CONTACTS,
    GET_ADD_CONTACT,
    GET_DEL_CONTACT,
} from '@/store/types/actions.type'

export const state = () => ({
    data: [],
})

export const mutations = {
    [SET_CONTACTS](state, value) {
        state.data = value
    },
    [SET_ADD_CONTACT](state, value) {
        state.data.push(value);
    },
    [SET_DEL_CONTACT](state, id) {
        let contactIndex = state.data.findIndex(contact => contact.id === id);
        state.data.splice(contactIndex, 1)
    },
}

export const actions = {
    [GET_CONTACTS]({ commit }, value) {
        commit(SET_CONTACTS, value)
    },
    [GET_ADD_CONTACT]({ commit }, value) {
        commit(SET_ADD_CONTACT, value)
    },
    [GET_DEL_CONTACT]({ commit }, id) {
        commit(SET_DEL_CONTACT, id)
    }
}

export const getters = {
    getContacts: state => state.data,
    // getCategory: state => (id) => state.data.find(obj => obj.id == id),
}