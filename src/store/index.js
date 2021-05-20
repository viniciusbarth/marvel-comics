import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedComic: null,
    shoppingCart: [],
    itemsCart: 0,
    openModalComicDetail: null,
    allComics: [],
    page: 1
  },
  mutations: {
    SET_SELECTED_COMIC(state, payload) {
      state.selectedComic = payload;
    },
    SET_PAGE(state, payload) {
      state.page = payload;
    },
    SET_SHOPPING_CART(state, payload) {
      state.itemsCart++;
      state.shoppingCart.push(payload);
    },
    OPEN_MODAL_COMIC_DETAIL(state, payload) {
      state.openModalComicDetail = payload;
    },
    REMOVE_COMIC_CART(state, payload) {
      let index = state.shoppingCart.findIndex(item => item.id === payload.id);
      if (index !== -1) {
        state.itemsCart--;
        state.shoppingCart.splice(index, 1);
      }
    },
    GET_COMICS(state, payload) {
      state.allComics = payload;
    }
  },
  actions: {
    SET_SELECTED_COMIC({ commit }, comic) {
      commit("SET_SELECTED_COMIC", comic);
    },
    SET_PAGE({ commit }, page) {
      commit("SET_PAGE", page);
    },
    SET_SHOPPING_CART({ commit }, selectedComic) {
      commit("SET_SHOPPING_CART", selectedComic);
    },
    OPEN_MODAL_COMIC_DETAIL({ commit }, modal) {
      commit("OPEN_MODAL_COMIC_DETAIL", modal);
    },
    REMOVE_COMIC_CART({ commit }, selectedComic) {
      commit("REMOVE_COMIC_CART", selectedComic);
    },
    async GET_COMICS({ commit, state }, params) {
      let comics = [];
      let limit = state.page * 20;
      let xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        `https://gateway.marvel.com:443/v1/public/comics?${params}&limit=${limit}`,
        true
      );
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          if (xhr.status === 200) {
            console.log(JSON.parse(xhr.responseText));
            comics = JSON.parse(xhr.responseText).data.results;
          }

          commit("GET_COMICS", comics);
        }
      };
      xhr.send();
    }
  }
});
