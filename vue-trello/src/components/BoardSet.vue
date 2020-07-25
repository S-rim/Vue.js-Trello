<template>
  <div class="settings">
    <a href="" @click.prevent="onClickClose">X</a>
    <h2>Menu</h2>
  <div class="boardMenu">
    <header class="boardMenuHeader">
      <div class="headerTitle">Menu</div>
      <a class="headerCloseBtn" href="" @click.prevent="onClickClose">&times;</a>
    </header>
    
    
  </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
    methods : {
        ...mapMutations([
            'SET_IS_SHOW_BOARD_SET'
        ]),
        onClickClose() {
            this.SET_IS_SHOW_BOARD_SET(false)
        }
    }
}
</script>

<style scoped>
.boardMenu {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  background-color: gray;
  background-color: #edeff0;
  width: 300px;
  transition: all .3s;
}
.boardMenuHeader {
  height: 46px;
  padding: 0 6px 0 12px;
  border-bottom: #bbb solid 1px;
}
.headerTitle {
  font-size: 18px;
  text-align: center;
  line-height: 46px;
  font-weight:700;
}
.headerCloseBtn {
  position: absolute;
  top: 10px;
  right: 10px;
  text-decoration: none;
  font-size: 24px;
  color: #999;
}
.menuList {
  list-style: none;
  padding-left: 0px;
}
.menuList li {
  height: 18px;
  line-height: 18px;
  padding: 10px;
  margin: 5px;
  border-radius: 3px;
  font-size: 18px;
  font-weight: 700;
  color: #111;
  margin-bottom: 5px;
  cursor: pointer;
}
.menuList li:hover,
.menuList li:focus {
  background-color: rgba(0,0,0, .1);
}
.menuList li a {
  text-decoration: none;
  color: inherit;
}
.colorPicker {
  margin: 0 15px;
}
.colorPicker a {
  display: inline-block;
  width: 49%;
  height: 100px;
  border-radius: 8px;
}
.colorPicker a:hover,
.colorPicker a:focus {
  cursor: pointer;
  /* background-color: rgba(0,0,0,.9); */
}
</style>
