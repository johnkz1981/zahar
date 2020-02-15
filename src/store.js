import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {name},
    info: {},
    elementsArr: [],
    analogsArr: [],
    groupsArr: [],
    countElements: 0,
    nameSection: '',
  },
  mutations: {
    setElements(state, payload) {
      state.elementsArr = payload.IBLOCK_DATA.slice();
      state.countElements = payload.COUNT_ELEMENTS;
      state.nameSection = payload.NAME_SECTION;
    },
    setAnalogs(state, payload) {
      state.analogsArr = payload.slice();
    },
    setGroups(state, payload) {
      state.groupsArr = payload.slice();
    },
  },
  actions: {
    async getElements({dispatch, commit, state}, payload){
      const data = await fetch('https://ugautodetal.ru/api2/catalog/elements?id_section=' + payload.idSection).then(res => res.json());
      const {IBLOCK_DATA, COUNT_ELEMENTS, NAME_SECTION} = data.result;
      commit('setElements', {IBLOCK_DATA, COUNT_ELEMENTS, NAME_SECTION});
    },
    async getAnalogs({commit}, payload){
      const data = await fetch('https://ugautodetal.ru/api2/catalog/analogs?id=' + payload.id).then(res => res.json());
      commit('setAnalogs', data.result.IBLOCK_DATA);
    },
    async getGroups({commit}, payload){
      const data = await fetch('https://ugautodetal.ru/api2/catalog/groups?id=' + payload.id).then(res => res.json());
      commit('setGroups', data.result.IBLOCK_DATA);
    }
  },
  getters: {
    user: s => s.user,
    elements: s => s.elementsArr,
    countElements: s => s.countElements,
    analogs: s => s.analogsArr,
    groups: s => s.groupsArr,
    nameSection: s => s.nameSection,
  }
})
