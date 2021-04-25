<template>
  <v-container>
    <v-flex class="d-flex justify-center">
      <v-card width="800px">
        <v-card-title>Checkout</v-card-title>
        <v-card-text>
          <v-list v-if="shoppingCart.length" subheader>
            <v-subheader>Itens do carrinho</v-subheader>

            <v-list-item v-for="comic in shoppingCart" :key="comic.title">
              <v-list-item-avatar>
                <v-img
                  :src="`${comic.thumbnail.path}.${comic.thumbnail.extension}`"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title
                  v-text="`Título: ${comic.title}`"
                ></v-list-item-title>
                <v-list-item-title
                  v-text="`Preço: ${comic.prices[0].price}`"
                ></v-list-item-title>
              </v-list-item-content>

              <v-list-item-icon>
                <v-icon @click="removeItem(comic)">
                  mdi-close
                </v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list>
          <v-text v-else class="d-flex justify-center message-not-items"
            >Ainda não foram adicionados itens ao carrinho =)</v-text
          >
          <v-divider></v-divider>
          <v-row>
            <v-text class="sum-products"
              >Sub-total dos produtos: {{ sumProducts | formatValue }}</v-text
            >
          </v-row>
          <v-row>
            <v-text class="sum-products"
              >Descontos: {{ sumDesconts | formatValue }}</v-text
            >
          </v-row>
          <v-row>
            <v-text class="sum-products"
              >Total dos produtos: {{ sumTotalproducts | formatValue }}</v-text
            >
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-btn color="primary" @click="generateCoupon()"
                >Gerar cupom</v-btn
              >
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="coupon"
                label="CUPOM"
                disabled="true"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row cols="12" sm="2">
            <v-btn color="primary" @click="backForList">
              <v-icon class="mr-2" dark>
                mdi-arrow-left
              </v-icon>
              Continuar comprando</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              justify-end
              :disabled="!shoppingCart.length"
              @click="finalizeBuy()"
            >
              <v-icon class="mr-2" dark>
                mdi-cash-check
              </v-icon>
              Finalizar compra</v-btn
            >
          </v-row>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-dialog v-model="openCoupon" width="400">
      <v-card>
        <v-toolbar>
          <v-toolbar-title>Cupom gerado</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon @click="openCoupon = !openCoupon">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="pa-8">
          <v-row>
            <v-text-field
              v-model="couponName"
              label="Cupom gerado"
            ></v-text-field>
            <v-chip
              class="mt-4"
              :style="couponRare ? 'color: gold' : 'color: blue'"
            >
              {{ couponRare ? "CUPOM RARO" : "CUPOM NORMAL" }}
            </v-chip>
          </v-row>
          <v-row>
            <v-row>
              <v-col>
                <v-btn color="primary" @click="addCoupon"
                  >Adicionar cupom</v-btn
                >
              </v-col>
            </v-row>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

import coupons from "../../mocks/coupons";
export default {
  filters: {
    formatValue(value) {
      return "$" + value.toFixed(2);
    }
  },
  data() {
    return {
      loadingSave: false,
      loading: false,
      details: [],
      coupon: null,
      openCoupon: false,
      couponName: null,
      couponRare: null
    };
  },
  computed: {
    ...mapState(["shoppingCart"]),
    sumProducts() {
      let sumItems = 0;
      this.shoppingCart.forEach(item => (sumItems += item.prices[0].price));
      return sumItems;
    },
    sumDesconts() {
      let desconts = 0;
      if (this.coupon !== null) {
        this.shoppingCart.forEach(item => {
          if (this.couponRare) {
            desconts += 2.5;
          } else if (!item.rarity) {
            desconts += 2.5;
          }
        });
      }
      return desconts;
    },
    sumTotalproducts() {
      let total = 0;
      total = this.sumProducts - this.sumDesconts;
      return total;
    }
  },
  methods: {
    ...mapActions(["REMOVE_COMIC_CART"]),
    addCoupon() {
      this.coupon = this.couponName;
      this.openCoupon = false;
    },
    generateCoupon() {
      let random = Math.floor(Math.random() * coupons.length);
      this.openCoupon = true;
      this.couponName = coupons[random].name;
      this.couponRare = coupons[random].rare;
    },
    addIntoCart(selectedComic) {
      this.SET_SHOPPING_CART(selectedComic);
      this.$router.push("checkout");
    },
    removeItem(selectedComic) {
      this.REMOVE_COMIC_CART(selectedComic);
    },
    backForList() {
      this.$router.push("/");
    },
    finalizeBuy() {
      this.$router.push("/");
      this.$router.go();
    }
  }
};
</script>

<style lang="scss">
.sum-products {
  font-size: 18px;
  color: black;
  margin-top: 8px;
  margin-left: 10px;
}
.message-not-items {
  font-size: 18px;
  padding: 10px;
  color: black;
}
</style>
