<template>
  <Modal class="modalCard">
    <div slot="header" class="modalCardHeader">
      <div class="modalCardHeaderTitle">
        <input class="form-control" type="text" ref="inputTitle" :value="card.title" :readonly="toggleTitle" @click="toggleTitle=true" @blur="onBlurTitle">
      </div>
      <a class="modalCloseBtn" href="" @click.prevent="onClose">&times;</a>
    </div>
    <div slot="body">
      <h3>Description</h3>
      <textarea :readonly="toggleDesc" class="form-control" cols="30" rows="3" placeholder="Add a more detailed description..." ref="inputDesc" @click="toggleDesc=true" @blur="onBlurDesc"></textarea>
    </div>
    <div slot="footer"></div>
  </Modal>  
</template>

<script>
import Modal from './Modal'
import {mapActions, mapState} from 'vuex'

export default {
    data() {
        return {
            toggleTitle : false,
            toggleDesc : false
        }
    },
    components : {Modal},
    computed : {
        ...mapState({
            card : 'card',
            board : 'board'
        })
    },
    created() {
        this.fetchCard()
    },
    methods : {
        ...mapActions([
            'FETCH_CARD',
            'UPDATE_CARD'
        ]),
        onClose() {
            this.$router.push(`/b/${this.board.id}`)
        },
        fetchCard() {
            const id = this.$route.params.cid
            this.FETCH_CARD({id})
        },
        onBlurTitle() {
            this.toggleTitle = false
            const title = this.$refs.inputTitle.value.trim() 
            if(!title) return
            this.UPDATE_CARD({id: this.card.id, title})
            .then(() => this.fetchCard())
        },
        onBlurDesc() {
            thie.toggleDesc = false
            const description = this.$refs.inputDesc.value.trim()
            if(!description) return
            this.UPDATE_CARD({id : this.card.id, description})
            .then(() => this.fetchCard())
        }
    }
}
</script>

<style>
.modalCard .modalContainer {
  min-width: 300px;
  max-width: 800px;
  width: 60%;
}
.modalCardHeaderTitle {
  padding-right: 30px;  
}
.modalCloseBtn {
  position: absolute;
  top: 0px;
  right: 0px;
  font-size: 24px;
  text-decoration: none;
}
.modalCardHeader {
  position: relative;
}
</style>
