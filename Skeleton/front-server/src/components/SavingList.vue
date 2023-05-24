<template>
  <v-container style="height:90%" fluid v-if="propsdata && propsdata.length > 0">
  
  
      <v-card-text style="height:110%">
        <h2 class="list-title">적금 List</h2><br>
        <div class="table-container" style="height:85%">
          <v-row>
            <v-col cols="12" sm="6" md="4" lg="3" v-for="(item, index) in flattenData" :key="index">
              <v-card @click="goToDetail(item)" class="item-card" >
                <div class="item-details">
                  <div class="item-image-container">
                    <v-img :src="getBankImage(item.kor_co_nm)" alt="Bank Image" class="item-image"></v-img>
                  </div>
                  <div class="item-text">
                    <h3 class="item-title">{{ item.fin_prdt_nm }}</h3>
                    <p class="item-info">기간 : {{ item.save_trm }} 개월</p>
                    <span class="item-info">최고 금리 {{ item.intr_rate2 }}%</span> / <span class="item-info">평균 금리 {{ item.intr_rate }}%</span>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-card-text>

  </v-container>
</template>
<script>
export default {
  name: 'SavingList',
  data() {
    return {
      bankName: null,
    };
  },
  props: {
    propsdata: Array,
  },
  computed: {
    flattenData() {
      const flattenedData = [];
      this.propsdata.forEach(data => {
        data.additionalData.forEach(item => {
          flattenedData.push({
            kor_co_nm: data.kor_co_nm,
            fin_prdt_nm: data.fin_prdt_nm,
            save_trm: item.save_trm,
            id: data.id,
            rsrv_type_nm: item.rsrv_type_nm,
            intr_rate_type_nm: item.intr_rate_type_nm,
            intr_rate: item.intr_rate,
            intr_rate2: item.intr_rate2,
            join_member: data.join_member,
            join_way: data.join_way,
            etc_note: data.etc_note,
            mtrt_int: data.mtrt_int,
            max_limit: data.max_limit,
            spcl_cnd: data.spcl_cnd,
            dcls_strt_day: data.dcls_strt_day,
            dcls_end_day: data.dcls_end_day,
          });
        });
      });
      return flattenedData;
    },
  },
  methods: {
    getBankImage(bankName) {
      console.log(`@/assets/bank_images/${bankName}.png`);
      return require(`@/assets/bank_images/${bankName}.png`);
    },
    goToDetail(item) {
      const id = item.id;
      this.$router.push({ name: 'DetailSaving', params: { item, id } });
    },
  },
};
</script>

<style scoped>

.table-container {
  height: 100%; 
  max-height: none; 
  overflow-y: auto;
  
}

.list-title {
  text-align: center;

}


.item-card { 
  height : 110%;
  max-height: none; 
  overflow-y: auto;
  border: 1px solid #0D47A1; 
}

.item-details {
  display: flex;
  align-items: center;
  margin-left: 16px;
}

.item-image-container {
  margin-right: 8px;
}

.item-image {
  width: 36px;
  height: 35px;
}

.item-text {
  flex-grow: 1;
}

.item-title {
  margin-top: 0;
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: bold;
}

.item-info {
  margin: 0;
  font-size: 14px;
  color: #777777;
}



/* 반응형 스타일 */
@media (max-width: 600px) {

  .table-container {
    max-height: unset;
  }
}

</style>