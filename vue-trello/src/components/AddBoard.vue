<template>
    <Modal>
        <div slot="header">
            <h2>create new board
                <a href="" class="modalDefaultButton"
                    @click.prevent="close">&times;
                </a>
            </h2>
        </div>
        <div slot="body">
            <form id="addBoardForm" @submit.prevent="addBoard">
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
        close() {
            this.$emit('close');
        },
        addBoard() {
            this.$emit('close');
            this.$emit('submit', this.input);
        }
    }
}
</script>

<style>

</style>