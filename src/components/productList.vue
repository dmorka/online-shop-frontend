<template>
  <div class="productList">

  <section v-if="errored">
    <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
  </section>

  <section v-else>
    <div v-if="loading">Loading...</div>
    <div
        v-else
        style="margin-top: 20px"
    >
      <b-table small :fields="fields" :items="pagedProductList" responsive="sm">
        <template #cell(name)="data">
          {{data.item.name}}
        </template>
        <template #cell(description)="data">
          {{data.item.description}}
        </template>
        <template #cell(price)="data">
          {{data.item.price}}
        </template>


      </b-table>
      <b-button variant="info col-sm-12" type="button" v-on:click="addItem()">Pokaż więcej</b-button>
    </div>
  </section>
  </div>
</template>

<script>
import {_} from 'vue-underscore'
import axios from 'axios';
export default {
  name: "productList",
  data () {
    return {
      fields: [
        'name',
        'description',
        'price',
      ],
      productList: null,
      // productList: [{"id":1,"name":"JBL Flip 5","description":"JBL Flip 5 to głośnik bezprzewodowy wyposażony w Bluetooth 4.2","price":248,"weight":0.6,"category":1},{"id":2,"name":"Edifier W860NB","description":"Słuchawki nauszne bezprzewodowe z systemem ANC.","price":549.99,"weight":0.3,"category":1},{"id":3,"name":"Karcher WD3","description":"Odkurzacz przemysłowy bezworkowy.","price":257.9,"weight":6.1,"category":1},{"id":4,"name":"RATTAN","description":"Ociekacz suszarka do naczyń dwu-poziomowa.","price":42,"weight":0.5,"category":1},{"id":5,"name":"TOMASETTO ALASKA AT ","description":"Zestaw filtrów fazy lotnej i fazy ciekłej.","price":9.99,"weight":0.15,"category":1},{"id":6,"name":"Nortec","description":"Podnosnik kola do montazownicy wywazarki.","price":1799,"weight":43,"category":1},{"id":7,"name":"Forever Living","description":"Krem Aloesowo Propolisowy firmy Forever to doskonałe połączenie stabilizowanego miszu Aloe Vera i propolisu pszczelego. Bardzo duża zawartość czystego miszu aloesowego (72,9%) wraz z propolisem powoduje, że krem głęboko nawilża i odżywia skóre.","price":79.09,"weight":0.1,"category":1},{"id":8,"name":"Maka","description":"z substancji o działaniu rozgrzewcym i regenna silne działanie rozgrzewa, egeneracji po urazach.","price":0.2,"weight":29.75,"category":1},{"id":9,"name":"JBL Flip 5","description":"JBL Flip 5 to  w Bluetooth 4.2","price":238,"weight":0.6,"category":1}],
      loading: true,
      // loading: false,
      errored: false,
      iterator: 0,
      pagedProductList: null
    }
  },
  methods: {
    addItem: function () {
      this.iterator += 1
      this.pagedProductList = _.first(this.productList, 2 * this.iterator)
    },
  },
  mounted () {
    axios
        .get('https://9nxyebc8af.execute-api.eu-central-1.amazonaws.com/dev/products')
        .then(response => {
          console.log("RESPONSE: "+ response.data.products);
          this.productList = response.data.products;
          this.addItem();
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally(() => this.loading = false)

  }
}
</script>

<style scoped>
  .productList {
    margin: 50px 0;
  }
</style>