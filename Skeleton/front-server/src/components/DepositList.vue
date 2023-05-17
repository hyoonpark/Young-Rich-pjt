<template>
  <v-container class="dataList" fluid v-if="propsdata && propsdata.length > 0">
    
    <v-card class="list-card" outlined>
      <v-card-text>
        <h2 class="list-title">예금 List</h2>
        <v-data-table :headers="headers" :items="flattenData">
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.kor_co_nm }}</td>
              <td>{{ item.fin_prdt_nm }}</td>
              <td>{{ item.save_trm }} 개월</td>
              <td>{{ item.intr_rate }}</td>
              <td>{{ item.join_member }}</td>
              <td>{{ item.join_way }}</td>
              <td>{{ item.etc_note }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
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
        { text: '가입 조건', value: 'join_member' },
        { text: '가입 방법', value: 'join_way' },
        { text: '유의사항', value: 'etc_note' },
      ];
    },
    flattenData() {
      const flattenedData = [];
      this.propsdata.forEach(data => {
        data.additionalData.forEach(item => {
          flattenedData.push({
            
            kor_co_nm: data.kor_co_nm,
            fin_prdt_nm: data.fin_prdt_nm,
            save_trm: item.save_trm,
            intr_rate: item.intr_rate,
            join_member: data.join_member,
            join_way: data.join_way,
            etc_note : data.etc_note,
          });
        });
      });
      return flattenedData;
    },
  },
};
</script>

<style>
.dataList {
  margin-top: 100px;
  display: flex;
  justify-content: center;
}

.list-card {
  max-width: 2000px;
  max-height : 2000px;
  margin: 10px;
}

.v-data-table {
  max-height: 400px;
  overflow-y: auto;
}

.list-title {
  text-align: center;
  margin-top: 0;
}
</style>