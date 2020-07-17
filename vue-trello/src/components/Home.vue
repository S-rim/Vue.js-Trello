<template>
    <div>
        <div class="homeTitle">Personal Boards</div>
        
        <div class="boardList" ref="boardList">
            <div class="boardItem" v-for="bd in boards" :key="bd.id" :data-bgcolor="bd.bgColor" ref="boardItem">
                <router-link :to="`/b/${bd.id}`">
                <div class="boardItemTitle">{{bd.title}}</div>
                </router-link>
            </div>

            <div class="boardItem boardItemNew">
                <a class="newBoardBtn" href="" @click.prevent="SET_IS_ADD_BOARD(true)">
                Create new board...
                </a>
            </div>
        </div>
        <AddBoard v-if="isAddBoard"></AddBoard>
  </div>
</template>

<script>
import {board} from '../api'
import AddBoard from './AddBoard.vue'
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'

export default {
    components : {AddBoard},
    data() {
        return {
            loading : false,
            error : ''
        }
    },
    computed : 
    {
        ...mapState([
        'isAddBoard',
        'boards'
    ])
    },
    created() 
    {
        this.fetchData();
    },
    updated() {
        this.$refs.boardItem.forEach(el => {
            el.style.backgroundColor = el.dataset.bgcolor
        })
    },
    methods : {
        ...mapMutations([
            'SET_IS_ADD_BOARD'
        ]),
        ...mapActions([
            'FETCH_BOARDS'
        ]),
        fetchData() {
            this.loading = true
            this.FETCH_BOARDS().finally(() => {
                this.loading = false
            })
        }
    }
}
</script>

<style>
.homeTitle 
{
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
}

.boardList 
{
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
}

.boardItem 
{
  width: 23%;
  height: 100px;
  margin: 0 2% 20px 0;
  border-radius: 3px;
}

.boardItem a 
{
  text-decoration: none;
  display: block;
  width: 100%;
  height: 100%;
}

.boardItem a:hover,
.boardItem a:focus 
{
  background-color: rgba(0,0,0, .1);
  color: #666;
}

.boardItemTitle 
{
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  padding: 10px;
}

.boardItem a.newBoardBtn 
{
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  height: 100px;
  width: inherit;
  color: #888;
  font-weight: 700;
}
</style>