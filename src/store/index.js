import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import VueLocalStorage from 'vue-localstorage'
Vue.use(VueLocalStorage)

const ITEMS_DATA = 'items'
const LISTS_DATA = 'lists'
const LISTS_NUM = 'listid'


const state = {
  items: JSON.parse(window.localStorage.getItem(ITEMS_DATA) || '[]'),
  lists: JSON.parse(window.localStorage.getItem(LISTS_DATA) || '[]'),
  listnum: JSON.parse(window.localStorage.getItem(LISTS_NUM) || '[]'),
}
const getters = {
  items:  state => state.items,
  lists:  state => state.lists,
  islogin: state => state.islogin,
  getItemsbytitle: (state) => (title) => {
    var items = state.items.filter(item => {
        if (item.belongto == title){
          return true;
        }
        return false;
      });
    return items;
  }
}
const mutations = {
  addItem(state, obj) {
    let newItem = {
      text: obj.text,
      date: obj.date,
      description: obj.description,
      belongto: obj.belongto,
      isfinished: false
    }
    state.items.push(newItem)
  },
  addList(state, obj) {
    let newList = {
      title: obj.title,
      count: 0
    }
    state.lists.push(newList)
  },
  deleteItem(state, text) {
    state.items.splice(state.items.findIndex(item => item.text == text), 1)
  },
  deleteList(state, title) {
    state.lists.splice(state.lists.findIndex(list => list.title == title), 1)
  },
  setLogin (state, islogin) {
    state.islogin = islogin;
  },
  editItem(state, obj) {
    let text = obj.text;
    state.items.forEach((item) => {
      if(item.text === text) {
        item = obj;
      }
    })
  }
}
const localStoragePlugin = store => {
  store.subscribe((mutation, { lists, items, listnum }) => {
    window.localStorage.setItem(ITEMS_DATA, JSON.stringify(items))
    window.localStorage.setItem(LISTS_DATA, JSON.stringify(lists))
    window.localStorage.setItem(LISTS_NUM, JSON.stringify(listnum))

  })
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  plugins: [localStoragePlugin]
})
