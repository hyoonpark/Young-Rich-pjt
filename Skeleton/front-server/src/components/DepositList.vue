<template>
  <v-container class="dataList" fluid v-if="propsdata && propsdata.length > 0">
    <v-row justify="center">
      <v-col cols="12" sm="6" md="4" v-for="(data, index) in propsdata.slice(0, 15)" :key="index">
        <v-card class="list-card" outlined>
          <v-card-text>
            <v-data-table :headers="headers" :items="data.additionalData" hide-default-footer>
              <template v-slot:item="props">
                <tr>
                  <td>{{ data.kor_co_nm }}</td>
                  <td>{{ data.fin_prdt_nm }}</td>
                  <td>{{ props.item.save_trm }} 개월</td>
                  <td>{{ props.item.intr_rate }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'DepositList',
  props: {
    propsdata: Array,
  },
  computed: {
    headers() {
      return [
        { text: '은행명', value: 'kor_co_nm' },
        { text: '상품이름', value: 'fin_prdt_nm' },
        { text: '기간', value: 'save_trm' },
        { text: '금리', value: 'intr_rate' },
      ];
    },
  },
};
</script>


<style>
.dataList {
  margin-top: 100px;
}

.list-card {
  max-width: 500px;
  margin: 10px;
}

.v-data-table {
  max-height: 400px;
  overflow-y: auto;
}
</style>