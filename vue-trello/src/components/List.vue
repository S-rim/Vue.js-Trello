<template>
  <div class="list">
    <div class="listHeader">
        <div class="listHeaderTitle">
            {{data.title}}
        </div>
    </div>
    <div class="cardList">
        <card-item v-for="card in data.cards" :key="card.id" :data="card"></card-item>
    </div>
    <div v-if="isAddCard">
        <add-card :list-id="data.list" @close="isAddCard=false"></add-card>
    </div>
    <div v-else>
        <a class="addCardBtn" href="" @click.prevent="isAddCard=true">+ Add a card...</a>
    </div>
  </div>
</template>

<script>
import {card} from '../api'
import CardItem from './CardItem.vue'
import AddCard from './AddCard'
export default {
  components: {AddCard, CardItem},
  props: [
    'data'
  ],
  data() {
    return {
      inputCardTitle: '',
      isAddCard: false
    }
  },
  computed: {
    invalidInput() {
      return !this.inputCardTitle.trim()
    }
  },
  methods: {
    onClickAddCard() {
      this.isAddCard = true
      setTimeout(_=> this.$refs.inputCardTitle.focus(), 1)
    },
    onCancelAddCard(){
      this.isAddCard = false
    },
    onSubmitNewCard() {
      if (this.invalidInput) return 
      card.create(this.inputCardTitle, this.list.id).then(data => {
        console.log(data)
        this.$emit('doneAddCard')
      }).catch(err => {
        console.log(err)
      }).finally(_=>{
        this.inputCardTitle = ''
        this.isAddCard = false
      })
    },
  }
}
</script>

<style>
.list {
  background-color: #e2e4e6;
  border-radius: 3px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  vertical-align: top;
  width: 100%;
  max-height: 100%;
}
.listHeader {
  flex: 0 0 auto;
  height: 30px;
  padding: 10px 8px 8px;
  position: relative;
}
.listHeaderTitle {
  font-size: 16px;
  font-weight: 700;
  padding-left: 8px;
  line-height: 30px;
}
.inputTitle {
  width: 90%;
}
.deleteListBtn {
  position: absolute;
  right: 10px;
  top: 8px;
  text-decoration: none;
  color: #aaa;
  font-size: 24px;
}
.cardList {
  flex: 1 1 auto;
  overflow-y: scroll;
}
.emptyCardItem   {
  height: 10px;
  width: 100%;
  background-color: rgba(0,0,0, 0);
}
.addCardBtn {
  flex: 0 0 auto;
  display: block;
  padding: 8px 10px;
  color: #8c8c8c;
  text-decoration: none;
}
.addCardBtn:focus,
.addCardBtn:hover {
  background-color: rgba(0,0,0, .1);
}
</style>
