<template>
  <v-container class="dataList" fluid v-if="propsdata && propsdata.length > 0">
      <div class="selector-container">
      <v-select
        v-model="selectedRate"
        :items="rateOptions"
        label="Interest Rate"
        outlined
        dense
        class="selector"
      ></v-select>
      <v-select
        v-model="selectedDuration"
        :items="durationOptions"
        label="Duration"
        outlined
        dense
        class="selector"
      ></v-select>
    </div>
    <v-card class="list-card custom-card" outlined>
      <v-card-text>
        <h2 class="list-title">예금 List</h2><br>
        <div class="table-container">
          <v-row>
            <v-col cols="12" sm="6" md="4" lg="3" v-for="(item, index) in flattenData" :key="index">
              <v-card @click="goToDetail(item)" class="item-card">
                <div class="item-details">
                  <div class="item-image-container">
                    <v-img :src="getBankImage(item.kor_co_nm)" alt="Bank Image" class="item-image"></v-img>
                  </div>
                  <div class="item-text">
                    <h3 class="item-title">{{ item.fin_prdt_nm }}</h3>
                    <p class="item-info">{{ item.save_trm }} 개월</p>
                    <p class="item-info">{{ item.intr_rate }}%</p>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: 'DepositList',
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
      this.$router.push({ name: 'DetailDeposit', params: { item, id } });
    },
  },
};
</script>

<style>
.dataList {
  
  display: flex;
  justify-content: center;
  max-width: 2000px;
  /* Increase the max-width value to adjust the container size */
  margin-left: auto;
  margin-right: auto;
}

.list-card {
  max-width: 10%;
  margin: 10px;
}

.table-container {
  max-height: 400px;
  overflow-y: auto;
}

.list-title {
  text-align: center;

}

.list-card {
  /* Adjust the width to fit three cards per row */
  max-width: calc(33.33% - 20px);
  
  /* Add some margin to create spacing between cards */
  margin: 10px;
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

.custom-card {
  /* Double the width and height */
  
   transform : scaleY(1.6);
   transform : scaleX(1.0);
   width : 80%;
   height : 600px;
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

.selector-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.selector {
  width: 32%;
}
</style>