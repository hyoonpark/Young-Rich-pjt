<template>
    <div>
      <h2>은행명 : {{ $route.params.item.kor_co_nm }}</h2>
      <p>상품이름 : {{ $route.params.item.fin_prdt_nm }}</p>
      <p>기간 : {{ $route.params.item.save_trm }} 개월</p>
      <p>저축 금리 유형명: {{ $route.params.item.intr_rate_type_nm }}</p>
      <p>저축 금리 : {{ $route.params.item.intr_rate }}%</p>
      <p>적립 유형명 : {{ $route.params.item.rsrv_type_nm }}</p>
      <p>최고 우대금리 : {{ $route.params.item.intr_rate2 }}%</p>
      <p>만기 후 이자율 : {{ $route.params.item.mtrt_int }}</p>
      <p>최고 한도 : {{ $route.params.item.max_limit }}원</p>
      <p>가입 조건 : {{ $route.params.item.join_member }}</p>
      <p>가입 방법 : {{ $route.params.item.join_way }}</p>
      <p>우대 조건 : {{ $route.params.item.spcl_cnd }}</p>
      <p>기타 특이 사항 : {{ $route.params.item.etc_note }}</p>
     
    </div>
  </template>
  
  <script>
  export default {
    name: 'DetailSaving',
  };
  </script>
  
  <style>
  
  </style>