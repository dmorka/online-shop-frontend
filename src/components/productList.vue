<template>
  <div class="productList">
      <b-table class="productsTable" small :fields="fields" :items="pagedProductList" responsive="sm">
        <template #cell(name)="data">
          {{data.item.name}}
        </template>
        <template #cell(description)="data">
          {{data.item.description}}
        </template>
        <template #cell(price)="data">
          {{data.item.price}}
        </template>
        <template #cell(action)>
          <b-row>
            <b-button class="m-1" v-if="showAddToCartButton" variant="info">Add To Cart</b-button>
            <b-input  class="m-1" v-if="showNumberOfItemsInput" type="number" min="1" max="999"></b-input>
            <b-button class="m-1" v-if="showEditButton" variant="warning">Edit</b-button>
            <b-button class="m-1" v-if="showRemoveButton" variant="danger">Remove</b-button>
          </b-row>
        </template>
      </b-table>
      <b-button variant="info col-sm-12" type="button" v-on:click="addItem()">Show more</b-button>
  </div>
</template>

<script>
import {_} from 'vue-underscore'
import EventBus from "@/utils/event-bus";
export default {
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
      this.pagedProductList = _.first(this.productList, 2 * this.iterator);
    }
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