<template>
  <v-container class="dataList" fluid v-if="propsdata && propsdata.length > 0">
    <v-card class="list-card" outlined >
      <v-card-text>
        <h2 class="list-title">적금 List</h2> <br>
        <div class="table-container">
          <v-data-table :headers="headers" :items="flattenData">
            <template v-slot:item="{ item }">
<<<<<<< HEAD
              <tr @click="goToDetail(item)">
=======
              <tr>
                {{items}}
>>>>>>> main
                <td>{{ item.kor_co_nm }}</td>
                <td>{{ item.fin_prdt_nm }}</td>
                <td>{{ item.save_trm }} 개월</td>
                <td>{{ item.intr_rate }}</td>
              </tr>
            </template>
          </v-data-table>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'SavingList',
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
      ].map(header => ({ ...header, align: 'center' }));
    },
    flattenData() {
      const flattenedData = [];
      this.propsdata.forEach(data => {
        data.additionalData.forEach(item => {
          flattenedData.push({
            kor_co_nm: data.kor_co_nm,
            fin_prdt_nm: data.fin_prdt_nm,
            save_trm: item.save_trm,
<<<<<<< HEAD
            rsrv_type_nm : item.rsrv_type_nm,
            intr_rate_type_nm : item.intr_rate_type_nm,
            intr_rate: item.intr_rate,
            intr_rate2: item.intr_rate2,
            join_member: data.join_member,
            join_way: data.join_way,
            etc_note: data.etc_note,
            mtrt_int : data.mtrt_int,
            max_limit : data.max_limit,
            spcl_cnd : data.spcl_cnd
=======
            intr_rate: item.intr_rate,
            join_member: data.join_member,
            join_way: data.join_way,
            etc_note: data.etc_note,
>>>>>>> main
          });
        });
      });
      return flattenedData;
    },
  },
<<<<<<< HEAD
  methods : {
    goToDetail(item) {
      this.$router.push({ name: 'DetailSaving', params: { item: item } })
    }
  }
=======
>>>>>>> main
};
</script>

<style>
.dataList {
  margin-top: 150px;
  display: flex;
  justify-content: center;
}

.list-card {
  max-width: 100%;
  margin: 10px;
}

.table-container {
  max-height: 400px;
  overflow-y: auto;
}

.list-title {
  text-align: center;
  margin-top: 0;
}

/* 반응형 스타일 */
@media (max-width: 600px) {
  .list-card {
    max-height: unset;
  }
  
  .table-container {
    max-height: unset;
  }
}
</style>