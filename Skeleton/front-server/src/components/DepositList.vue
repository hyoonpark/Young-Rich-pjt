<template>
  <v-container class="dataList" fluid v-if="propsdata && propsdata.length > 0">
    <v-row justify="center">
      <v-col cols="12" sm="6" md="4" v-for="(data, index) in propsdata.slice(0, 15)" :key="index">
        
        <v-card class="list-card" outlined>
          <v-card-text>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>은행명: {{ data.kor_co_nm }}</v-list-item-title>
                <v-list-item-subtitle>상품이름: {{ data.fin_prdt_nm }}</v-list-item-subtitle>
                <v-list-item-subtitle>기간별 금리:</v-list-item-subtitle>
                <v-list-item-subtitle v-for="(additionalData, additionalIndex) in data.additionalData" :key="additionalIndex">
                  {{additionalData.save_trm}} 개월 : {{ additionalData.intr_rate }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'DepositList',
  props: ['propsdata'],
  computed: {

}
}
</script>

<style>
.dataList {
  margin-top: 100px;
}

.list-card {
  max-width: 300px;
  margin: 10px;
}
</style>