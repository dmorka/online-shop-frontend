<template>
  <div class="productList">
    <b-table
      class="productsTable"
      small
      :fields="fields"
      :items="pagedOrderList"
      responsive="sm"
    >
      <template #cell(approvalDate)="data">
        {{ formatDate(data.item.order.approvalDate) }}
      </template>
      <template #cell(value)="data">
        {{ data.item.order.value }}
      </template>
      <template #cell(username)="data">
        {{ data.item.order.userName }}
      </template>
      <template #cell(products)="data">
        <ol>
        <li v-for="product in data.item.prods" v-bind:key="product.name">
          <em>{{getProductName(product.productId)}}:</em> {{product.quantity}} pcs
        </li>
        </ol>
      </template>
      <template v-if="!hideActionButtons" #cell(action)="data">
        <b-row >
          <b-button class="m-1" variant="success"
                    @click="updateOrderStatus(data.item.order.id, 4)"
          >COMPLETED</b-button>
          <b-button class="m-1" variant="danger"
                    @click="updateOrderStatus(data.item.order.id, 3)"
          >CANCEL</b-button>
        </b-row>
      </template>
    </b-table>
    <b-button v-if="orderList!=null && orderList.length > 5 && iterator*5 < orderList.length " variant="info col-sm-12" type="button" v-on:click="addItem()">Show more</b-button>
  </div>
</template>

<script>
import { _ } from "vue-underscore";
import axios from "axios";
import moment from "moment";
export default {
  props: {
    statusId: {
      type: String,
      required: true,
    },
    hideActionButtons: {
      type: Boolean,
      default: false
    }
  },
  name: "productList",
  data () {
    return {
      fields: [
        { key: "approvalDate", label: "Approval Date"},
        { key: "value", label: "Value"},
        { key: "username", label: "Client"},
        { key: "products", label: "Product List"},
        { key: "action", label: "Action"}
      ],
      iterator: 1,
      pagedOrderList: null,
      productList: null,
      orderList: null,
      orders: null
    }
  },
  methods: {
    addItem: function () {
      this.iterator += 1;
      this.updateList();
    },
    updateList: function () {
      this.pagedOrderList = _.first(this.orders, 5 * this.iterator);
    },
    getProductName: function (productId) {
      if (this.productList != null) {
        let found = _.find(this.productList, function (product) { return product.id === productId; });
        return _.get(found, 'name', null);
      }
      return null;
    },
    formatDate: function (date) {
      return moment(date).format("MMMM Do YYYY, H:mm:ss");
    },
    updateOrderStatus: function (orderId, statusId) {
      axios
          .put(
              "https://9nxyebc8af.execute-api.eu-central-1.amazonaws.com/dev/orders/" +
              orderId,
              {status: statusId}
          )
          .then((response) => {
            this.orders = _.filter(this.orders, function (item) {
              return item.order.id !== orderId;
            });
            this.updateList();
            alert(response.data.message);
          })
          .catch((error) => {
            alert(error.message);
          });
    },
    fetchProductList: function () {
      axios
          .get('https://9nxyebc8af.execute-api.eu-central-1.amazonaws.com/dev/products')
          .then(response => {
            this.productList = response.data.products;
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
          .finally(() => this.loading = false)
    },
    fetchOrderListByStatus: function () {
      axios
          .get('https://9nxyebc8af.execute-api.eu-central-1.amazonaws.com/dev/orders/status/'+this.statusId)
          .then(response => {
            this.orderList = response.data.orders;
            this.orders = this.orderList;
            this.updateList();
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
          .finally(() => this.loading = false)
    }
  },
  mounted() {
    this.fetchProductList();
    this.fetchOrderListByStatus();
  }
}
</script>

<style scoped>
  .productList {
    margin: 50px 0;
  }

  .productsTable >>> th:nth-child(1) {
    width: 20%;
  }

  .productsTable >>> th:nth-child(2) {
    width: 10%;
  }

  .productsTable >>> th:nth-child(3) {
    width: 10%;
  }

  .productsTable >>> th:nth-child(4) {
    width: 40%;
  }

  .productsTable >>> th:nth-child(5) {
    width: 20%;
  }

  input {
    width: 50px;
    padding: 3px;
  }
</style>