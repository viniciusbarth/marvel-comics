<template>
  <v-layout>
    <v-dialog v-model="openModalComicDetail" persistent max-width="800">
      <v-card pa-3>
        <v-toolbar>
          <v-toolbar-title
            >Detalhes do comic:
            {{ selectedComic && selectedComic.title }}</v-toolbar-title
          >

          <v-spacer></v-spacer>

          <v-btn icon @click="closeModal">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-layout class="pa-4">
          <v-flex xs2 ml-2>
            <v-img
              width="150"
              :src="
                `${selectedComic &&
                  selectedComic.thumbnail.path}.${selectedComic &&
                  selectedComic.thumbnail.extension}`
              "
            ></v-img>
          </v-flex>
          <v-flex class="d-flex flex-column comic-detail" ml-2>
            <v-text xs12
              ><span>Título:</span>
              {{ selectedComic && selectedComic.title }}</v-text
            >
            <v-text xs12
              ><span>Descrição:</span>
              {{ selectedComic && selectedComic.description }}</v-text
            >
            <v-text xs12
              ><span>Preço:</span>
              {{ selectedComic && selectedComic.prices[0].price }}</v-text
            >
            <v-text xs12
              ><span>Quantidade de páginas:</span>
              {{ selectedComic && selectedComic.pageCount }}</v-text
            >
            <v-text xs12
              ><span>ISBN:</span>
              {{ selectedComic && selectedComic.isbn }}</v-text
            >
          </v-flex>
        </v-layout>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-text v-if="message" class="mr-2"
            >Comic adicionado ao carrinho!</v-text
          >
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="float-right"
                v-bind="attrs"
                v-on="on"
                @click="addIntoCart(selectedComic)"
                ><v-icon>mdi-cart</v-icon></v-btn
              >
            </template>
            <span>Adicionar ao carrinho</span>
          </v-tooltip>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      loadingSave: false,
      loading: false,
      details: [],
      message: false
    };
  },
  computed: {
    ...mapState(["openModalComicDetail", "selectedComic"])
  },
  methods: {
    ...mapActions(["OPEN_MODAL_COMIC_DETAIL", "SET_SHOPPING_CART"]),
    closeModal() {
      this.OPEN_MODAL_COMIC_DETAIL(false);
    },
    addIntoCart(selectedComic) {
      this.messageAdd();
      this.SET_SHOPPING_CART(selectedComic);
    },
    messageAdd() {
      this.message = true;
      setTimeout(() => {
        this.message = false;
      }, 5000);
    }
  }
};
</script>

<style lang="scss" scoped>
.comic-detail span {
  color: red;
  font-size: 18px;
}
</style>
