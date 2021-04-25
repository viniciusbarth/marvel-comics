<template>
  <v-container fluid>
    <v-row justify="space-around">
      <v-col v-for="(comic, index) in comics" :key="comic.id" cols="3">
        <Comic :comic="comic" :index="index" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Comic from "../comic/Comic";
export default {
  components: { Comic },
  props: {
    comics: {
      type: Array,
      default: () => []
    }
  }
};
</script>
<style></style>
