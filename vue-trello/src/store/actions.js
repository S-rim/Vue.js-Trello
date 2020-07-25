import { auth, board, list, card } from '../api'

const actions = {
    ADD_BOARD(_, {title})
    {
        return board.create(title).then(data => data.item)
    },
    FETCH_BOARDS({commit})
        {
            return board.fetch().then(data => {
            commit('SET_BOARDS', data.list)
        })
    }, 
    LOGIN({commit}, {email, password}) 
    {
        return auth.login(email, password)
        .then(({accessToken}) => commit('LOGIN', accessToken))
    },
    FETCH_BOARD({commit}, {id}) {
        return board.fetch(id)
        .then(data => {
            commit('SET_BOARD', data.item)
        })
    },
    DELETE_BOARD(_,{id})
    {
        return board.destroy(id)
    },
    UPDATE_BOARD({dispatch, state}, {id,title,bgColor})
    {
        return board.update(id, {title, bgColor})
        .then(() => dispatch('FETCH_BOARD', {id : state.board.id}))
    },
    ADD_LIST({dispatch, state},{title, boardId, pos})
    {
        return list.create({title, boardId, pos})
        .then(() => dispatch('FETCH_BOARD', {id : state.board.id}))
    },
    ADD_CARD ({dispatch, state}, {title, listId, pos}) 
    {
        return card.create(title, listId, pos)
          .then(() => dispatch('FETCH_BOARD', {id : state.board.id}))
    },
    FETCH_CARD({commit}, {id})
    {
        return card.fetch(id)
        .then(data => {
            commit('SET_CARD', data.item)
        })
    },
    UPDATE_CARD({ state, dispatch }, {id, pos, title, description, listId}) {
        return card.update(id, { pos, title, description, listId})
          .then(_ => dispatch('FETCH_BOARD', {id : state.board.id}))
    },
    DELETE_CARD({dispatch, state}, {id}) {
        return card.destroy(id)
        .then(_ => dispatch('FETCH_BOARD', {id : state.board.id}))
    }
}

export default actions