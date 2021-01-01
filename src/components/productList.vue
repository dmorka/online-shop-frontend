<template>
  <div class="productList">
    <b-table
      class="productsTable"
      small
      :fields="fields"
      :items="pagedProductList"
      responsive="sm"
    >
      <template #cell(name)="data">
        {{ data.item.name }}
      </template>
      <template #cell(description)="data">
        {{ data.item.description }}
      </template>
      <template #cell(price)="data">
        {{ data.item.price }}
      </template>
      <template #cell(action)="data">
        <b-row>
          <b-button v-if="showAddToCartButton" class="m-1" variant="info" @click="addProductToCart(data.item)">Add To
            Cart
          </b-button>
          <b-input v-if="showNumberOfItemsInput" v-model="data.item.quantity" class="m-1" max="999" min="1"
                   type="number" @change="quantityChanged(data.item)"></b-input>
          <b-button
              class="m-1"
              v-if="showEditButton"
              variant="warning"
              v-on:click="updateProduct(data.item)"
          >Edit</b-button>
          <b-button v-if="showRemoveButton" class="m-1" variant="danger" @click="removeProduct(data.item)">Remove
          </b-button>
        </b-row>
      </template>
    </b-table>
    <b-button v-if="productList.length > 5 && iterator*5 < productList.length "
              variant="info col-sm-12" type="button" v-on:click="addItem()">Show more</b-button>

    <b-modal ref="bv-modal-example" title="Update product" hide-footer>
      <Productdata />
    </b-modal>
  </div>
</template>

<script>
import { _ } from "vue-underscore";
import EventBus from "@/utils/event-bus";
import Productdata from "@/components/productData";
export default {
  components: { Productdata },
  props: {
    productList: {
      type: Array,
      required: false
    },
    showAddToCartButton: {
      type: Boolean,
      default: false
    },
    showEditButton: {
      type: Boolean,
      default: false
    },
    showRemoveButton: {
      type: Boolean,
      default: false
    },
    showNumberOfItemsInput: {
      type: Boolean,
      default: false
    }
  },
  name: "productList",
  data () {
    return {
      fields: [
        { key: "name", label: "Product name"},
        { key: "description", label: "Description"},
        { key: "price", label: "Price"},
        { key: "action", label: "Action"}
      ],
      iterator: 0,
      pagedProductList: null
    }
  },
  methods: {
    addItem: function () {
      this.iterator += 1;
      this.updateList();
    },
    updateList: function () {
      this.pagedProductList = _.first(this.productList, 5 * this.iterator);
    },
    addProductToCart: function (product) {
      this.$store.dispatch('addItemToCart', product);
    },
    removeProduct: function (product) {
      this.$emit('remove-product', product)
    },
    quantityChanged: function (product) {
      this.$store.dispatch('changeQuantity', product);
    },
    updateProduct(product) {
      setTimeout(function () {EventBus.$emit("UpdateProduct", product)}, 300)
      this.$refs["bv-modal-example"].show();

      console.log(product);
    },
  },
  mounted() {
    EventBus.$on("UpdateProductList", () => {
      this.$nextTick(() => {
        this.updateList();
      });
    });
    this.addItem();
  }
}
</script>

<style scoped>
  .productList {
    margin: 50px 0;
  }

  .productsTable >>> th:nth-child(1) {
    width: 25%;
  }

  .productsTable >>> th:nth-child(2) {
    width: 50%;
  }

  .productsTable >>> th:nth-child(3) {
    width: 10%;
  }

  .productsTable >>> th:nth-child(4) {
    width: 15%;
  }

  input {
    width: 50px;
    padding: 3px;
  }
</style>