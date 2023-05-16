<template> 
  <section class="main-page">
    <h1 class="list-title">예금 List</h1>
    <deposit-list v-bind:propsdata="dataList"></deposit-list>
  </section>
</template>

<script>
import axios from 'axios';
import DepositList from '@/components/DepositList.vue';

let url = "http://localhost:8000/finlife/deposit-products/"

export default {
  name: 'MainPageView',

  data: () => {
    return {
      dataList : []
    }
  },
  components : {
    DepositList: DepositList,
  },
  mounted() {
    axios({
      method : "GET",
      url : url
    }).then(response => {
      this.dataList = response.data
    }).catch(response => {
      console.log("Failed",response)
    })
  },
  methods : { 
    
  }
};
</script>

<style>
.main-page {
  margin-top: 100px;
  text-align: center;
}

.list-title {
  margin-bottom: 20px;
  font-size: 24px;
}
</style>