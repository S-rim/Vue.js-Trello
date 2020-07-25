<template>
    <div class="addList">
        <input v-if="isAddList" type="text" class="form-control" v-model="inputTitle" ref="inputTitle" @blur="restore" @keyup.enter="onSubmitTitle">
        <a v-else href="" @click.prevent="onClickAddList">+ Add another list</a>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
    data() {
        return {
            isAddList : false,
            inputTitle : ''
        }
    },
    computed : {
        ...mapState({
            board : 'board'
        })
    },
    methods : {
        ...mapActions([
            'ADD_LIST'
        ]),
        onClickAddList() {
            this.isAddList = true
            this.$nextTick(() => this.$refs.inputTitle.focus())
        },
        restore() {
            this.isAddList = false
            this.inputTitle = ''
        },
        onSubmitTitle() {
            this.inputTitle = this.inputTitle.trim()
            if(!this.inputTitle) return this.restore()

            const title = this.inputTitle
            const boardId = this.board.id
            const lastList = this.board.lists[this.board.lists.length - 1]
            const pos = lastList ? lastList.pos * 2 : 65535
            this.ADD_LIST({title, boardId, pos})
            .then(() => this.restore())
        }
    }
}
</script>

<style>
.addList 
{
    background-color: rgba(0,0,0, .1);
    padding : 12px;
    transition: all .3s
}

.addList a
{
    color: #ddd;
}

.addList:hover,.addList:focus
{
    background-color: rgba(0,0,0, .4);
}
</style>