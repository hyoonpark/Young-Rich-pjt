<template>
  <div>
    <h2>은행명 : {{ $route.params.item.kor_co_nm }}</h2>
    <p>상품이름 : {{ $route.params.item.fin_prdt_nm }}</p>
    <p>기간 : {{ $route.params.item.save_trm }} 개월</p>
    <p>금리 : {{ $route.params.item.intr_rate }}%</p>
    <p>가입 조건 : {{ $route.params.item.join_member }}</p>
    <p>가입 방법 : {{ $route.params.item.join_way }}</p>
    <p>우대 금리 사항 : {{ $route.params.item.spcl_cnd }}</p>
    <p>기타 특이 사항 : {{ $route.params.item.etc_note }}</p>
    
  </div>
</template>

<script>
export default {
  name: 'DetailDeposit',
};
</script>

<style>

</style>