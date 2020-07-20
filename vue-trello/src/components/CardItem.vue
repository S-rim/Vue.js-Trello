<template>
    <div class="cardItem" :data-card-id="data.id" :data-card-pos="data.pos">
        <router-link to="`/b/${boardId}/c/${data.id}`">
            <div>{{data.title}}</div>
            <div class="cardItemMeta" v-if="data.description">&equiv;</div>
        </router-link>
        <a href="" class="deleteCardBtn" @click.prevent="onDelete">X</a>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
    props : ['data'],
    computed : {
        ...mapState({
            boardId : state => state.board.id
        })
    },
    methods : {
        ...mapActions([
            'DELETE_CARD'
        ]),
        onDelete() {
            if(window.confirm('Delete this card')) return
            this.DELETE_CARD({id : this.data.id})
        }
    }
}
</script>

<style>
.cardItem {
  background-color: #fff;
  border-radius: 3px;
  margin: 8px;
  padding: 6px 20px 2px 8px;
  box-shadow: 0 1px 0 #ccc;
  position: relative;
}
.cardItem a {
  text-decoration: none;
  color: #444;
  word-wrap: break-word;
  white-space: normal;
  overflow: hidden;
  display: block;
}
.cardItem:hover,
.cardItem:focus {
  background-color: rgba(0,0,0, .1);
  cursor: pointer;
}
.cardItemMeta {
  font-size: 26px;
  padding: 5px 0 0 3px;
  color: #8c8c8c;  
}
.deleteCardBtn {
  position: absolute;
  right: 10px;
  top: 4px;
  text-decoration: none;
  font-size: 18px;
  color: #aaa;
}
</style>