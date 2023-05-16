<template>
  <section class="main-page">
    <h1 class="list-title">예금 List</h1>
    <deposit-list ref="depositList" :propsdata="mergedData"></deposit-list>
  </section>
</template>

<script>
import axios from 'axios';
import DepositList from '@/components/DepositList.vue';

let url = "http://localhost:8000/finlife/deposit-products/";
let optionsUrlPrefix = "http://localhost:8000/finlife/deposit-product-options/";

export default {
  name: 'MainPageView',
  data() {
    return {
      dataList: [],
      optionsList: [],
      optionsUrlPrefix: optionsUrlPrefix,
    };
  },
  components: {
    DepositList: DepositList,
  },
  mounted() {
    axios.get(url)
      .then(response => {
        this.dataList = response.data;
        const optionRequests = this.dataList.map(data => {
          const optionsUrl = this.optionsUrlPrefix + data.fin_prdt_cd;
          return axios.get(optionsUrl)
            .then(response => {
              // optionsUrl에서 받은 데이터를 data에 추가
              data.additionalData = response.data;
              return data; // 수정된 data 반환
            });
        });
        return Promise.all(optionRequests);
      })
      .then(dataListWithAdditionalData => {
        // 모든 옵션 요청이 완료되었을 때 DepositList에 dataList을 전달
        this.$refs.depositList.propsdata = dataListWithAdditionalData;
      })
      .catch(error => {
        console.error(error);
      });
  },
  computed: {
    mergedData() {
      return this.dataList.map(data => {
        const matchedData = this.optionsList.find(item => item.fin_prdt_cd === data.id);

        if (matchedData) {
          return {
            ...data,
            intr_rate: matchedData.intr_rate,
          };
        } else {
          return data;
        }
      });
    },
  },
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