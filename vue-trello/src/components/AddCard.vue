<template>
    <div class="addCard">
        <form>
            <input type="text" class="form-control" v-model="inputTitle" ref="inputText">
            <button class="btn btn-success" type="submit" :disabled="invalidInput">Add Card</button>
            <a class="cancelAddBtn" @click.prevent="$emit('close')" href="">&times;</a>
        </form>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    props : [],
    data() {
        return {
            inputTitle : ''
        }
    },
    mounted() {
        this.$refs.inputText.focus()
    },
    computed : {
        invalidInput() {
            return !this.inputTitle.trim()
        }
    },
    methods : {
        ...mapActions([
            'ADD_CARD'
        ]),
        onSubmit() {
            if(this.invalidInput) return
            const {inputTitle, listId} = this
            this.ADD_CARD({title : inputTitle, listId})
            .finally(() => this.inputTitle = '')
        }
    }
}
</script>

<style>
.addCard 
{
  padding: 10px;
  display: block;
  position: relative;
}

.addCard .cancelAddBtn {
  display: inline-block;
  margin-left: 10px;
  vertical-align: middle;
  text-decoration: none;
  color: #888;
  font-size: 24px;
}

.addCard .cancelAddBtn:hover,
.addCard .cancelAddBtn:focus 
{
    color: #666;
}
</style>