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
    UPDATE_CARD({dispatch, state}, {id, title, description, pos, listId}) {
        return list.card.update(id, {title, description, pos, listId})
        .then(() => dispatch('FETCH_BOARD', {id : state.board.id}))
    }
}

export default actions