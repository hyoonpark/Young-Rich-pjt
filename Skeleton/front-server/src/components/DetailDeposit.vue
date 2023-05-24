<template>
  <v-container fluid>
    <div class="header">
      <h2><img v-if="setBankName($route.params.item)" :src="getBankImage($route.params.item.kor_co_nm)" alt="Bank Image" class="bank-image">{{ $route.params.item.kor_co_nm }} - {{ $route.params.item.fin_prdt_nm }}</h2>
      <v-btn @click="backcompare" class="back-btn">
        뒤로 가기
      </v-btn>
    </div>
    <v-card class="mt-5">
      <v-card-title>
        <h5>세부 정보</h5>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6">
            <p><span class="highlight">기간 : {{ $route.params.item.save_trm }} 개월</span></p>
            <p><span class="highlight">저축 금리: {{ $route.params.item.intr_rate }}%</span></p>
            <p>저축 금리 유형명: {{ $route.params.item.intr_rate_type_nm }}</p>
            <p>공시 시작일: {{ $route.params.item.dcls_strt_day || '종료기간 미정' }}</p>
            <p>공시 종료일: {{ $route.params.item.dcls_end_day || '종료기간 미정' }}</p>
            <p>적립 유형명: {{ $route.params.item.rsrv_type_nm || '구분 없음' }}</p>
          </v-col>
          <v-col cols="12" sm="6">
            <p><span class="highlight">최고 우대금리: {{ $route.params.item.intr_rate2 }}%</span></p>
            <p>만기 후 이자율: {{ $route.params.item.mtrt_int }}</p>
            <p>최고 한도: {{ $route.params.item.max_limit || '홈페이지 참고' }}원</p>
            <p>가입 조건: {{ $route.params.item.join_member }}</p>
            <p>가입 방법: {{ $route.params.item.join_way }}</p>
            <p>우대 조건: {{ $route.params.item.spcl_cnd }}</p>
            <p>기타 특이 사항: {{ $route.params.item.etc_note }}</p>
            <p>문의 번호: {{ this.phone_number }}</p>
            <p>홈페이지: <a :href="this.homepage">{{ this.homepage }}</a></p>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn v-if="isInterested" @click="unregisterDepositProduct" color="red" class="mr-4">
          관심 상품 등록 해제
        </v-btn>
        <v-btn v-else @click="registerDepositProduct" color="primary" class="mr-4">
          관심 상품 등록
        </v-btn>
       
      </v-card-actions>
    </v-card>

    <!-- [2: 이자 계산하기] -->
    <h2>이자 계산해보기</h2>
    <v-card class="mt-5">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6">
            <br>
            <p>{{ $route.params.item.save_trm }} 개월 만기시 세후 수령액 ({{$route.params.item.intr_rate_type_nm }})</p>
            <br>
            <v-text-field v-model="principal" label="월 적립금 (원)" type="number" outlined></v-text-field>
            <v-btn color="primary" @click="calculateInterest">계산</v-btn>
            <br><br>
         
          </v-col>
          <v-col cols="12" sm="6">
            <v-btn-toggle v-model="activeTab" mandatory>
              <v-btn :value="'bestinterestRate'"  @click="changeTab('bestinterestRate')"><span class='cals'>최고 금리</span></v-btn>
              <v-btn :value="'interestRate'"  @click="changeTab('interestRate')"><span class='cals'>저축 금리</span></v-btn>
            </v-btn-toggle>
            <template v-if="activeTab === 'bestinterestRate'">
              <p><span >원금 합계: <span class="black-text">{{ this.principal.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }) }} 원</span></span></p>
              <p><span >세전 이자: <span class="black-text">+ {{ bestinterestResult.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }) }} 원</span></span></p>
              <p><span >이자 과세 (15.4%): <span class="black-text">- {{ (bestinterestResult * 0.154).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}} 원</span></span></p>
              <v-alert :value="showResult" type="success">
                <p>세후 수령액: {{ (this.principal + (bestinterestResult * 0.846)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }) }} 원</p>
              </v-alert>
            </template>
            <template v-else-if="activeTab === 'interestRate'">
              <p><span >원금 합계: <span class="black-text">{{ this.principal.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }) }} 원</span></span></p>
              <p><span >세전 이자: <span class="black-text">+ {{ (interestResult).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}} 원</span></span></p>
              <p><span >이자 과세 (15.4%): <span class="black-text">- {{ (interestResult * 0.154).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }) }} 원</span></span></p>
              <v-alert  type="success">
                <p>세후 수령액: {{ (this.principal + (interestResult * 0.846)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }) }} 원</p>
              </v-alert>
            </template>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>

import { mapState } from 'vuex';

export default {
  name: 'DetailDeposit',
  data() {
    return {
      isInterested: false,
      activeTab: 'bestinterestRate',
      principal: 1000000,
      bestinterestRate: null,
      interestRate: null,
      months: null,
      interestResult: null,
      bankName : null,
      phone_number : null,
      homepage : null,
    };
  },
  computed: {
    ...mapState(['salary', 'assets', 'age']),
  },
  created() {
    this.checkInterestProduct()
    this.calculateInterest()
    this.principal = 100000
    this.getCompanyData()
    
  },
  methods: {
    setBankName(item) {
      this.bankName = item.kor_co_nm;
      return true
    },
    getBankImage(bankName) {
     
      return require(`@/assets/bank_images/${bankName}.png`);
    },
    changeTab(tab) {
      this.activeTab = tab;
    },
    calculateInterest() {
      this.principal =  this.principal*this.months
      this.bestinterestRate = this.$route.params.item.intr_rate2;
      this.interestRate = this.$route.params.item.intr_rate;
      this.months = this.$route.params.item.save_trm;
      this.interestResult = (this.interestRate/100) * this.principal * ((this.months)/12)
      this.bestinterestResult = (this.bestinterestRate/100) * this.principal * ((this.months)/12)
    },
    backcompare() {
      this.$router.push('/rate-comparison')
    },  
    getCompanyData() {
      const bank_name = this.$route.params.item.kor_co_nm
      this.$store.dispatch('fetchCompanyData', bank_name)
        .then(companyData => {
          this.phone_number = companyData.cal_tel;
          this.homepage = companyData.homp_url;
         
        })
        .catch(() => {
          console.error('일치하는 회사 정보를 찾을 수 없습니다.');
        });
    },
    registerDepositProduct() {
      const product = {
        fin_prdt_nm: this.$route.params.item.fin_prdt_nm,
        save_trm: this.$route.params.item.save_trm,
        kor_co_nm: this.$route.params.item.kor_co_nm,
        dcls_strt_day : this.$route.params.item.dcls_strt_day,
        dcls_end_day : this.$route.params.item.dcls_end_day,
        intr_rate_type_nm : this.$route.params.item.intr_rate_type_nm,
        intr_rate : this.$route.params.item.intr_rate,
        intr_rate2 : this.$route.params.item.intr_rate2,
        mtrt_int : this.$route.params.item.mtrt_int,
        max_limit : this.$route.params.item.max_limit,
        join_member : this.$route.params.item.join_member,
        join_way : this.$route.params.item.join_way,
        spcl_cnd : this.$route.params.item.spcl_cnd,
        etc_note : this.$route.params.item.etc_note,
        salary : this.$store.state.user.salary,
        age : this.$store.state.user.age,
        assets : this.$store.state.user.assets,
        product_type: 1,
        
      };
      console.log(product)
      this.$store.dispatch('registerDepositProduct', product)
        .then(() => {
          this.isInterested = true;
          alert('예금상품이 등록되었습니다!');
        })
        .catch(error => {
          if (error.response && error.response.status === 409) {
            alert('이미 등록한 상품입니다.');
          } else {
            console.error('상품 등록에 실패하였습니다', error);
          }
        });
    },
    unregisterDepositProduct() {
      const product = {
        fin_prdt_nm: this.$route.params.item.fin_prdt_nm,
        save_trm: this.$route.params.item.save_trm,
        kor_co_nm: this.$route.params.item.kor_co_nm,
        dcls_stry_day : this.$route.params.item.dcls_strt_day,
        dcls_end_day : this.$route.params.item.dcls_end_day,
        intr_rate_type_nm : this.$route.params.item.intr_rate_type_nm,
        intr_rate : this.$route.params.item.intr_rate,
        intr_rate2 : this.$route.params.item.intr_rate2,
        mtrt_int : this.$route.params.item.mtrt_int,
        max_limit : this.$route.params.item.max_limit,
        join_member : this.$route.params.item.join_member,
        join_way : this.$route.params.item.join_way,
        spcl_cnd : this.$route.params.item.spcl_cnd,
        etc_note : this.$route.params.item.etc_note,
        product_type: 1,
      };
      
      this.$store.dispatch('unregisterDepositProduct', product)
        .then(() => {
          this.isInterested = false;
          alert('예금상품 등록이 해제되었습니다!');
        })
        .catch(error => {
          console.error('상품 등록 해제에 실패하였습니다', error);
        });
    },
    checkInterestProduct() {
      const product = {
        fin_prdt_nm: this.$route.params.item.fin_prdt_nm,
        save_trm: this.$route.params.item.save_trm,
        kor_co_nm: this.$route.params.item.kor_co_nm,
        dcls_strt_day : this.$route.params.item.dcls_strt_day,
        dcls_end_day : this.$route.params.item.dcls_end_day,
        intr_rate_type_nm : this.$route.params.item.intr_rate_type_nm,
        intr_rate : this.$route.params.item.intr_rate,
        intr_rate2 : this.$route.params.item.intr_rate2,
        mtrt_int : this.$route.params.item.mtrt_int,
        max_limit : this.$route.params.item.max_limit,
        join_member : this.$route.params.item.join_member,
        join_way : this.$route.params.item.join_way,
        spcl_cnd : this.$route.params.item.spcl_cnd,
        etc_note : this.$route.params.item.etc_note,
        product_type: 1,
      };

      this.$store.dispatch('checkInterestProduct', product)
        .then(() => {
          this.isInterested = false;
        })
        .catch(error => {
          if (error.response && error.response.status === 409) {
            this.isInterested = true;
          } else {
            console.error('통신에 실패하였습니다', error);
          }
        });
    }
  },
};
</script>



<style scoped>
.card-title {
  font-size: 20px;
  font-weight: bold;
}

.highlight {
  
  color: blue;
}


h2 {
  margin-top: 50px;
}
.v-btn-toggle .v-btn {
  font-size: 13px;
  margin-bottom: 25px;
  padding: 4px 8px;
  background-color: skyblue;
}

.black-text {
  color: black;
}

.green-text {
  color: green;
}

.cals {
  font-weight : bold;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.back-btn {
  margin-left: 20px;
  margin-top: 45px;
}
</style>