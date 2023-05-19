<template>
  <div>
    <h2>은행명: {{ $route.params.item.kor_co_nm }}</h2>
    <p>상품이름: {{ $route.params.item.fin_prdt_nm }}</p>
    <p>기간: {{ $route.params.item.save_trm }} 개월</p>
    <p>공시 시작일 : {{ formatDate($route.params.item.dcls_strt_day) || '종료기간 미정' }}</p>
    <p>공시 종료일 : {{ formatDate($route.params.item.dcls_end_day) || '종료기간 미정' }}</p>

    <p>저축 금리 유형명: {{ $route.params.item.intr_rate_type_nm }}</p>
    <p>저축 금리: {{ $route.params.item.intr_rate }}%</p>
    <p>적립 유형명: {{ $route.params.item.rsrv_type_nm }}</p>
    <p>최고 우대금리: {{ $route.params.item.intr_rate2 }}%</p>
    <p>만기 후 이자율: {{ $route.params.item.mtrt_int }}</p>
    <p>최고 한도: {{ $route.params.item.max_limit }}원</p>
    <p>가입 조건: {{ $route.params.item.join_member }}</p>
    <p>가입 방법: {{ $route.params.item.join_way }}</p>
    <p>우대 조건: {{ $route.params.item.spcl_cnd }}</p>
    <p>기타 특이 사항: {{ $route.params.item.etc_note }}</p>

    <v-btn @click="toggleInterestProduct" :color="isInterested ? 'red' : 'primary'" class="interest-btn">
  {{ isInterested ? '관심 등록 해제' : '관심 상품 등록' }}
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'DetailSaving',
  data() {
    return {
      isInterested: false,
    };
  },
  created() {
    this.checkInterestProduct();
  },
  methods: {
    checkInterestProduct() {
      const storedProducts = JSON.parse(localStorage.getItem('interestProducts')) || [];
      const productId = this.$route.params.item.fin_prdt_nm;
      this.isInterested = storedProducts.some(product => product.name === productId);
    },
    toggleInterestProduct() {
  const product = {
    id: this.$route.params.item.id, 
    name: this.$route.params.item.fin_prdt_nm,
    type: 'saving',

    username: this.$store.state.user.userName,
  };

  const storedProducts = JSON.parse(localStorage.getItem('interestProducts')) || [];

  if (this.isInterested) {
    // 관심 상품 등록 해제
    const index = storedProducts.findIndex(item => item.name === product.name && item.username === product.username);
    if (index > -1) {
      storedProducts.splice(index, 1);
      localStorage.setItem('interestProducts', JSON.stringify(storedProducts));
    }
  } else {
    // 관심 상품 등록
    storedProducts.push(product);
    localStorage.setItem('interestProducts', JSON.stringify(storedProducts));
  }

  this.isInterested = !this.isInterested;
  const message = this.isInterested ? '관심 상품이 등록되었습니다!' : '관심 등록이 해제되었습니다!';
  alert(message);
},
  },
};
</script>

<style scoped>
.interest-btn {
  margin-top: 20px;
}
</style>