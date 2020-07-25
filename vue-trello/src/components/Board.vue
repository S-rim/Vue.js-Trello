<template>
    <div>
        <div class="boardWrapper">
            <div class="board">
                <div class="boardHeader">
                    <span class="boardTitle">{{board.title}}</span>
                    <a href="" class="boardHeaderBtn showMenu" @click.prevent="onShowSet">
                        ...Show Menu
                    </a>
                </div>

                <div class="listSectionWrapper">
                    <div class="listSection">
                        <div class="listWrapper" v-for="list in board.lists" :key="list.pos">
                            <List :data="list"></List>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <board-set v-if="isShowBoardSet"></board-set>
        <router-view></router-view>
    </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import BoardSet from './BoardSet'
import List from './List.vue'
import dragger from '../utils/dragger'

export default {
    components : {List, BoardSet},
    data() {
        return {
            bid : 0, 
            loading : false,
            dragger : null
        }
    },
    computed : {
        ...mapState({
            board : 'board',
            isShowBoardSet : 'isShowBoardSet'
        })
    },
    created() {
        this.fetchData().then(() => {
            this.SET_THEME(this.board.bgColor)
        })
        this.SET_IS_SHOW_BOARD_SET(false)
    },
    updated() {
        this.setCardDragabble();
    },
    methods : {
        ...mapActions([
            'FETCH_BOARD',
            'UPDATE_CARD'
        ]),
        ...mapMutations([
            'SET_THEME',
            'SET_IS_SHOW_BOARD_SET'
        ]),
        fetchData() {
            this.loading = true
            return this.FETCH_BOARD({id : this.$route.params.bid})
            .then(() => this.loading = false)
        },
        setCardDragabble() {
            if(this.dragger) this.dragger.destroy()
            this.dragger = dragger.init(Array.from(this.$el.querySelectorAll('.cardList')))

            this.dragger.on('drop', (el, wrapper, target, siblings) => {
            const targetCard = {
                id: el.dataset.cardId * 1,
                pos : 65535
            }
            const {prev, next} = dragger.sibling({
                el, 
                wrapper, 
                candidates : Array.from(wrapper.querySelectorAll('.cardItem')), 
                type : 'card'
            })
                if(!prev && next) targetCard.pos = next.pos / 2
                else if(!next && prev) targetCard.pos = prev.pos * 2
                else if(prev && next) targetCard.pos = (prev.pos + next.pos) /2
                this.UPDATE_CARD(targetCard)
            })
        },
        onShowSet() 
        {  
            this.SET_IS_SHOW_BOARD_SET(true)
        }
    }
}
</script>

<style>
.boardWrapper 
{
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
.board {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.boardHeader {
  flex: none;
  padding: 8px 4px 8px 8px;
  margin: 0;
  height: 32px;
  line-height: 32px;
} 
.boardHeader input[type=text] {
  width: 200px;
}
.boardHeaderBtn {
  border-radius: 4px;
  padding: 2px 10px;
  height: 30px;
  margin-bottom: 15px;
  display: inline-block;
  color: #fff;
}
.boardHeaderBtn:hover,
.boardHeaderBtn:focus {
  background-color: rgba(0,0,0,.15);
  cursor: pointer;
}
.boardTitle {
  font-weight: 700;
  font-size: 18px;
}
.showMenu {
  font-size: 14px;
  position: absolute;
  right: 15px;
}
.listSectionWrapper {
  flex-grow: 1;
  position: relative;
}
.listSection {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  padding: 0 10px;
}
.listWrapper {
  display: inline-block;
  height: 100%;
  width: 272px;
  vertical-align: top;
  margin-right: 5px;
}
.cardItem.guTransit {
  background-color: #555 !important;
}
.cardItem.guMirror {
  opacity: 1 !important;
  background-color: #fff !important;
  transform: rotate(3deg) !important;
}
</style>