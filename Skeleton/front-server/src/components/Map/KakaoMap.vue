<template>
    <div>
      <h3>은행 찾기</h3>
      <div class="kmap" ref="map"></div>
    </div>
  </template>
  
  <script>
  export default {
    props: [
      'options',
    ],
    data() {
      return {
        mapInstance: null
      }
    },
    mounted() {
      let kakao =window.kakao;
  
      var container = this.$refs.map; //지도를 담을 영역의 DOM 레퍼런스
      // var options = { //지도를 생성할 때 필요한 기본 옵션
        // center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        // level: 3 //지도의 레벨(확대, 축소 정도)
  
      const { center, level } = this.options
      this.mapInstance = new kakao.maps.Map(container, {
        center: new kakao.maps.LatLng(center.lat, center.lng),
        level,
      }); //지도 생성 및 객체 리턴
    },
    watch: {
      'options.level'(cur, prev) {
        this.mapInstance.setLevel(cur)
      }
    },
  }
  </script>
  
  <style>
  .kmap {
    width: 100%;
    height: 600px;
  }
  </style>