<template>
    <Modal>
        <div slot="header">
            <h2>create new board
                <a href="" class="modalDefaultButton"
                    @click.prevent="SET_IS_ADD_BOARD(false)">&times;
                </a>
            </h2>
        </div>
        <div slot="body">
            <form id="addBoardForm" @submit.prevent="onSubmitAddBoard">
                <input class="form-control" type="text" v-model="input" ref="input">
            </form>
        </div>
        <div slot="footer">
            <button class="btn" :class="{'btn-success':valid}" type="submit" borm="addBoardForm" :disabled="!valid">
                create Board
            </button>
        </div>
    </Modal>
</template>

<script>
import Modal from './Modal.vue'
import {mapMutations , mapActions} from 'vuex'
export default {
    components : {Modal},
    data() {
        return {
            input : '',
            valid : false
        }
    },
    watch : {
        input(v) {
            this.valid = v.trim().length > 0
        }
    },
    mounted() {
        this.$refs.input.focus();
    },
    methods : {
        ...mapMutations([
            'SET_IS_ADD_BOARD'
        ]),
        ...mapActions([
            'ADD_BOARD',
            'FETCH_BOARDS'
        ]),
        // addBoard() {
        //     this.SET_IS_ADD_BOARD(false)
        //     this.ADD_BOARD({title : this.input}).then(({id}) => {
        //         this.$router.push(`/b/${id}`)
        //         this.FETCH_BOARDS()
        //     })
        // }
        onSubmitAddBoard() {
            if (!this.input.trim()) return 
            this.ADD_BOARD(this.input)
                .then(id => this.$router.push(`/board/${id}`))
                .catch(err => console.log(err))
                .finally(()=> (this.SET_IS_ADD_BOARD(false)))
        }
    }
}
</script>

<style>

</style>