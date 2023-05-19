<template>
    <div>
      <h3>가까운 은행 찾아보자</h3>
      <div class="controll">
        <button @click="zoom(1)">ZOOM+</button>
        <button @click="zoom(-1)">ZOOM-</button>
      </div>
      <div class="map-area">
        <div class="searchbox">
          <div><input type="text" value="명지 은행" @keyup.enter="searchPlace"/></div>
        </div>
        <div class="results">
          <div class="place" v-for="rs in search.results" :key="rs.id" @click="showPlace(rs)">
            <h4>{{ rs.place_name }}</h4>
            <div class="addr">{{ rs.address_name }}</div>
          </div>
        </div>
        <KakaoMap :options="mapOption" />
      </div>
    </div>
  </template>
  
  <script>
  import KakaoMap from '@/components/map/KakaoMap';
  export default {
    components: {
      KakaoMap
    },
    data() {
      return {
        mapOption: {
          center: {
            lat: 33.450701,
            lng: 126.570667,
          },
          level: 8
        },
        search: {
          keyword: null,
          pgn: null,
          results: [],
        }
      }
    },
    mounted() {
  
    },
    methods: {
      searchPlace(e) {
        const keyword = e.target.value.trim()
        if (keyword.length === 0) {
          return
        }
  
        const ps = new window.kakaoMap.maps.services.Places()
        ps.keywordSearch(keyword, (data, status, pgn) => {
          this.search.keyword = keyword;
          this.search.pgn = pgn;
          this.search.results = data
        })
      },
      zoom(delta) {
        const level = Math.max(3, this.mapOption.level + delta)
        this.mapOption.level += level
      },
      showPlace(place) {
        this.mapOption.center = {
          lat: place.y,
          lng: place.x
        }
      } 
    },
  }
  </script>
  
  <style>
  .map-area {
    display: flex;
    position: relative;
  }
  
  .searchbox {
      position: absolute;
      top: 0;
      left: 0;
      height: 600px;
      z-index: 10000;
      background-color: #ffffffaa;
      width: 300px;
      display: flex;
      flex-direction: column;
  }
  
  .place {
    padding: 8px;
    cursor: pointer;
  }
  
  h4 {
    margin: 0;
  }
  
  .results {
    flex: 1 1 auto;
    overflow-y: auto;
  }
  </style>