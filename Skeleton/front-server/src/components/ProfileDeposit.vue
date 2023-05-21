<template>
  <div>
    
    <h2>은행명: {{ $route.params.product.kor_co_nm }}</h2>
    <p>상품이름: {{ $route.params.product.fin_prdt_nm }}</p>
    <p>기간: {{ $route.params.product.save_trm }} 개월</p>
    <p>공시 시작일 : {{ $route.params.product.dcls_strt_day || '종료기간 미정' }}</p>
    <p>공시 종료일 : {{ $route.params.product.dcls_end_day || '종료기간 미정' }}</p>
    <p>저축 금리 유형명: {{ $route.params.product.intr_rate_type_nm }}</p>
    <p>저축 금리: {{ $route.params.product.intr_rate }}%</p>
    <p>적립 유형명: {{ $route.params.product.rsrv_type_nm }}</p>
    <p>최고 우대금리: {{ $route.params.product.intr_rate2 }}%</p>
    <p>만기 후 이자율: {{ $route.params.product.mtrt_int }}</p>
    <p>최고 한도: {{ $route.params.product.max_limit }}원</p>
    <p>가입 조건: {{ $route.params.product.join_member }}</p>
    <p>가입 방법: {{ $route.params.product.join_way }}</p>
    <p>우대 조건: {{ $route.params.product.spcl_cnd }}</p>
    <p>기타 특이 사항: {{ $route.params.product.etc_note }}</p>
    <v-btn v-if="isInterested" @click="unregisterDepositProduct" color="red" class="interest-btn">
      관심 상품 등록 해제
    </v-btn>
    <v-btn v-else @click="registerDepositProduct" color="primary" class="interest-btn">
      관심 상품 등록
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'ProfileDeposit',
  data() {
    return {
      isInterested: false,
    };
  },
  created() {
    this.checkInterestProduct()

  },
  methods: {
    registerDepositProduct() {
      const product = {
        fin_prdt_nm: this.$route.params.product.fin_prdt_nm,
        save_trm: this.$route.params.product.save_trm,
        kor_co_nm: this.$route.params.product.kor_co_nm,
        dcls_strt_day : this.$route.params.product.dcls_strt_day,
        dcls_end_day : this.$route.params.product.dcls_end_day,
        intr_rate_type_nm : this.$route.params.product.intr_rate_type_nm,
        intr_rate : this.$route.params.product.intr_rate,
        intr_rate2 : this.$route.params.product.intr_rate2,
        mtrt_int : this.$route.params.product.mtrt_int,
        max_limit : this.$route.params.product.max_limit,
        join_member : this.$route.params.product.join_member,
        join_way : this.$route.params.product.join_way,
        spcl_cnd : this.$route.params.product.spcl_cnd,
        etc_note : this.$route.params.product.etc_note,
        product_type: 1,
      };
      
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
        fin_prdt_nm: this.$route.params.product.fin_prdt_nm,
        save_trm: this.$route.params.product.save_trm,
        kor_co_nm: this.$route.params.product.kor_co_nm,
        dcls_stry_day : this.$route.params.product.dcls_strt_day,
        dcls_end_day : this.$route.params.product.dcls_end_day,
        intr_rate_type_nm : this.$route.params.product.intr_rate_type_nm,
        intr_rate : this.$route.params.product.intr_rate,
        intr_rate2 : this.$route.params.product.intr_rate2,
        mtrt_int : this.$route.params.product.mtrt_int,
        max_limit : this.$route.params.product.max_limit,
        join_member : this.$route.params.product.join_member,
        join_way : this.$route.params.product.join_way,
        spcl_cnd : this.$route.params.product.spcl_cnd,
        etc_note : this.$route.params.product.etc_note,
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
        fin_prdt_nm: this.$route.params.product.fin_prdt_nm,
        save_trm: this.$route.params.product.save_trm,
        kor_co_nm: this.$route.params.product.kor_co_nm,
        dcls_strt_day : this.$route.params.product.dcls_strt_day,
        dcls_end_day : this.$route.params.product.dcls_end_day,
        intr_rate_type_nm : this.$route.params.product.intr_rate_type_nm,
        intr_rate : this.$route.params.product.intr_rate,
        intr_rate2 : this.$route.params.product.intr_rate2,
        mtrt_int : this.$route.params.product.mtrt_int,
        max_limit : this.$route.params.product.max_limit,
        join_member : this.$route.params.product.join_member,
        join_way : this.$route.params.product.join_way,
        spcl_cnd : this.$route.params.product.spcl_cnd,
        etc_note : this.$route.params.product.etc_note,
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
.interest-btn {
  margin-top: 20px;
}
</style>