<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>Loja de quadrinhos</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text>Qtd. itens: {{ itemsCart }}</v-text>
      <v-icon class="ml-3" @click="openCheckout">mdi-cart</v-icon>
    </v-toolbar>
    <modal-comic-detail></modal-comic-detail>
    <loader :loading="loadingComics"></loader>
    <comicList v-if="allComics.length" :comics="getpercentComics"></comicList>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import ComicList from "../../components/comicList/ComicList";
import Loader from "../../components/loader";
import ModalComicDetail from "../../components/modalComicDetail/ModalComicDetail.vue";
import { PARAMS } from "../../config/routeParam";
export default {
  components: { ComicList, Loader, ModalComicDetail },
  data() {
    return {
      comics: [],
      loadingComics: false,
      listRandoms: []
    };
  },
  computed: {
    ...mapState(["allComics", "itemsCart"]),
    getpercentComics() {
      // verifica se já existem itens raros, somente se não for encontrado irá gerar novos
      if (this.allComics.findIndex(item => item.rarity === true) == -1) {
        for (let i = 0; i < this.allComics.length * 0.1; i++) {
          this.generateComicRarity();
        }
      }
      return this.allComics;
    }
  },
  mounted() {
    if (!this.allComics.length) {
      this.loadComics();
    }
  },
  methods: {
    ...mapActions(["GET_COMICS"]),
    verifyRandom(random) {
      return this.listRandoms.findIndex(item => item === random) == -1;
    },
    generateComicRarity() {
      let random = Math.floor(Math.random() * (this.allComics.length - 1));
      if (this.verifyRandom(random)) {
        this.listRandoms.push(random);
        this.allComics[random].rarity = true;
      } else {
        this.generateComicRarity();
      }
    },
    async loadComics() {
      this.loadingComics = true;
      try {
        await this.GET_COMICS(PARAMS);
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingComics = false;
      }
    },
    openCheckout() {
      this.$router.push("checkout");
    }
  }
};
</script>

<style></style>
