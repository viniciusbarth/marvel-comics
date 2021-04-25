<template>
  <v-card
    class="mx-auto elevation-4 comic"
    max-width="374"
    height="508"
    @click="openComicDetail(comic)"
  >
    <v-img
      height="350"
      :src="`${comic.thumbnail.path}.${comic.thumbnail.extension}`"
      :gradient="
        comic.rarity
          ? 'to top right, rgb(183 206 91 / 69%), rgb(201 226 60 / 62%)'
          : ''
      "
    ></v-img>

    <v-card-title class="comic-title">Título: {{ comic.title }}</v-card-title>

    <v-card-text>
      <v-row>
        <v-col>
          <v-text>Preço: {{ comic.prices[0].price }}</v-text>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    comic: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions(["SET_SELECTED_COMIC", "OPEN_MODAL_COMIC_DETAIL"]),
    openComicDetail(comicDetail) {
      this.SET_SELECTED_COMIC(comicDetail);
      this.OPEN_MODAL_COMIC_DETAIL(true);
    },
    setComicInCart() {
      this.comic.addIntoCart = true;
    }
  }
};
</script>
<style lang="scss">
.comic-title {
  font-size: 16px;
}
.comic:hover {
  box-shadow: 0 0 1em red !important;
}
</style>
