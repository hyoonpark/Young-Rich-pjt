<template>
   <v-container  fluid v-if="propsdata && propsdata.length > 0">
  
  
      <v-card-text style="height:110%">
      <h2 class="list-title"> <v-avatar size="54">
            <v-icon>mdi-account-heart</v-icon>
        </v-avatar>당신에게 꼭 맞는 예금을 찾아보세요 !</h2><br><br>
          <h3>
            <v-avatar size="35" class="avatar-icon">
              <v-icon>mdi-magnify</v-icon>
            </v-avatar>
            검색 조건
          </h3><br>
          <v-row>
            <v-col cols="12" sm="6" md="4" lg="3">
              <v-select
                v-model="selectedBank"
                :items="[ '무관', ...bankOptions ]"
                label="은행별"
                outlined
                dense
                class="bank-selector"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="3">
              <v-select
                v-model="selectedInterestRate"
               :items="['무관', '금리 높은 순', '금리 낮은 순']"
                label="금리"
                outlined
                dense
                class="bank-selector"
           
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="3">
              <v-select
                v-model="selectedPeriod"
                :items="[ '무관', ...periodOptions ]"
                label="기간"
                outlined
                dense
                class="bank-selector"
              >  
              </v-select>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="3">
              <v-select
                v-model="selectedPaymentMethod"
                :items="[ '무관', '단리', '복리' ]"
                label="이자 지급 방식"
                outlined
                dense
                class="bank-selector"
              ></v-select>

            </v-col>

          </v-row>
        <div class="separator"></div>
        <div class="table-container" >
          <v-row>
            <v-col cols="12" sm="6" md="4" lg="3" v-for="(item, index) in filteredData" :key="index">
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
  name: 'DepositList',
  data() {
    return {
      bankName: null,
      selectedBank: null,
      selectedInterestRate: null,
      selectedPeriod: null,
      selectedPaymentMethod: null,
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
    filteredData() {
      let filteredData = this.flattenData;
      if (this.selectedBank && this.selectedBank !== '무관') {
        filteredData = filteredData.filter(
          item => item.kor_co_nm === this.selectedBank
        );
      }
      if (this.selectedInterestRate && this.selectedInterestRate !== '무관') {
        if (this.selectedInterestRate === '금리 높은 순') {
          filteredData.sort((a, b) => b.intr_rate2 - a.intr_rate2);
        } else if (this.selectedInterestRate === '금리 낮은 순') {
          filteredData.sort((a, b) => a.intr_rate2 - b.intr_rate2);
        }
      }
      if (this.selectedPeriod && this.selectedPeriod !== '무관') {
        const selectedPeriodWithoutUnit = parseInt(this.selectedPeriod);
        filteredData = filteredData.filter(
          item => parseInt(item.save_trm) === selectedPeriodWithoutUnit
        );
      }
      if (this.selectedPaymentMethod && this.selectedPaymentMethod !== '무관') {
        filteredData = filteredData.filter(
          item => item.intr_rate_type_nm === this.selectedPaymentMethod
        );
      }
      return filteredData;
    },
    bankOptions() {
      // 은행 옵션 목록 생성
      const bankSet = new Set(this.flattenData.map(item => item.kor_co_nm));
      return Array.from(bankSet);
    },

    periodOptions() {
      // 기간 옵션 목록 생성
      const periodSet = new Set(this.flattenData.map(item => item.save_trm));
      const optionsWithUnit = Array.from(periodSet).map(option => `${option}개월`);
      return optionsWithUnit;
    },
    paymentMethodOptions() {
      // 이자 지급 방식 옵션 목록 생성
      const paymentMethodSet = new Set(
        this.flattenData.map(item => item.rsrv_type_nm)
      );
      return Array.from(paymentMethodSet);
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

  }
}
</script>

<style scoped>

.table-container {
  height: calc(100% - 200px); /* 원하는 높이에 맞게 값 조정 */
  overflow-y: auto;
}

.list-title {
  text-align: center;

}

.bank-selector {
  margin-bottom: 16px;
}


.item-card { 
  height : 100%;
  border: 1px solid #0D47A1; 
}
.item-details {
  display: flex;
  align-items: center;
  margin-left: 16px;
}

.item-image-container {
  margin-right: 10px;
}

.item-image {
  width: 36px;
  height: 34px;
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

.separator {
  height: 1px;
  width: 100%;
  background-color: #ccc;
  margin: 16px 0;
}

/* 반응형 스타일 */
@media (max-width: 600px) {

  .table-container {
    max-height: unset;
  }
}



</style>