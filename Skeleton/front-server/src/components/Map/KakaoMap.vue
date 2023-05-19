<template>
  <div class="map_wrap">
    <div id="map" style="width: 100%; height: 100%; position: relative; overflow: hidden;"></div>

    <div id="menu_wrap" class="bg_white">
      <div class="option">
        <div>
          <form @submit.prevent="searchPlaces">
            키워드: <input type="text" v-model="keyword" size="15" id="keyword" />
            <button type="submit">검색하기</button>
          </form>
        </div>
      </div>
      <hr>
      <ul id="placesList">
        <li v-for="(place, index) in places" :key="index" class="item">
          <span :class="'markerbg marker_' + (index + 1)"></span>
          <div class="info">
            <h5>{{ place.place_name }}</h5>
            <span v-if="place.road_address_name">{{ place.road_address_name }}</span>
            <span class="jibun gray">{{ place.address_name }}</span>
            <span class="tel">{{ place.phone }}</span>
          </div>
        </li>
      </ul>
      <div id="pagination">
        <a v-for="page in pagination.last" :key="page" :class="{ on: page === pagination.current }" @click="gotoPage(page)">{{ page }}</a>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  mounted() {
    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567),
      level: 3,
    };
    this.map = new kakao.maps.Map(mapContainer, mapOption);
    this.ps = new kakao.maps.services.Places();
    this.searchPlaces();
  },
  data() {
    return {
      keyword: '녹산동 은행',
      places: [],
      pagination: {},
      map: null,
      ps: null,
      markers: [],
    };
  },
  methods: {
    searchPlaces() {
      const keyword = this.keyword.trim();
      if (!keyword) {
        alert('키워드를 입력해주세요!');
        return;
      }
      this.ps.keywordSearch(keyword, this.placesSearchCB);
    },
    placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        this.displayPlaces(data);
        this.displayPagination(pagination);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
      }
    },
    displayPlaces(places) {
      this.removeAllChildNods(document.getElementById('placesList'));
      this.removeMarker();

      const bounds = new kakao.maps.LatLngBounds();

      for (let i = 0; i < places.length; i++) {
        const place = places[i];
        const placePosition = new kakao.maps.LatLng(place.y, place.x);
        const marker = this.addMarker(placePosition, i);
        const itemEl = this.getListItem(i, place);

        bounds.extend(placePosition);

        marker.onmouseover = () => {
          this.displayInfowindow(marker, place.place_name);
        };

        marker.onmouseout = () => {
          this.infowindow.close();
        };

        itemEl.onmouseover = () => {
          this.displayInfowindow(marker, place.place_name);
        };

        itemEl.onmouseout = () => {
          this.infowindow.close();
        };

        document.getElementById('placesList').appendChild(itemEl);
      }

      this.map.setBounds(bounds);
    },
    getListItem(index, place) {
      const el = document.createElement('li');
      let itemStr = `<span class="markerbg marker_${index + 1}"></span>
        <div class="info">
          <h5>${place.place_name}</h5>`;

      if (place.road_address_name) {
        itemStr += `
          <span>${place.road_address_name}</span>
          <span class="jibun gray">${place.address_name}</span>`;
      } else {
        itemStr += `
          <span>${place.address_name}</span>`;
      }

      itemStr += `
          <span class="tel">${place.phone}</span>
        </div>`;

      el.innerHTML = itemStr;
      el.className = 'item';

      return el;
    },
    addMarker(position, idx) {
      const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
      const imageSize = new kakao.maps.Size(36, 37);
      const imgOptions = {
        spriteSize: new kakao.maps.Size(36, 691),
        spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10),
        offset: new kakao.maps.Point(13, 37),
      };
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
      const marker = new kakao.maps.Marker({
        position,
        image: markerImage,
      });

      marker.setMap(this.map);
      this.markers.push(marker);

      return marker;
    },
    removeMarker() {
      for (let i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
    },
    displayPagination(pagination) {
      const paginationEl = document.getElementById('pagination');
      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
      }
      for (let i = 1; i <= pagination.last; i++) {
        const el = document.createElement('a');
        el.href = '#';
        el.innerHTML = i;
        if (i === pagination.current) {
          el.className = 'on';
        } else {
          el.onclick = (() => {
            return () => {
              pagination.gotoPage(i);
            };
          })(i);
        }
        paginationEl.appendChild(el);
      }
    },
    displayInfowindow(marker, title) {
      const content = `<div style="padding:5px;z-index:1;">${title}</div>`;
      this.infowindow.setContent(content);
      this.infowindow.open(this.map, marker);
    },
    removeAllChildNods(el) {
      while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
      }
    },
  },
  mounted() {
    this.map = new kakao.maps.Map(document.getElementById('map'), {
      center: new kakao.maps.LatLng(37.566826, 126.9786567),
      level: 3,
    });
    this.ps = new kakao.maps.services.Places();
    this.infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    this.searchPlaces();
  },
};
</script>
<style>
/* .kmap {
  width: 100%;
  height: 600px;
} */
.map_wrap, .map_wrap * {margin:0;padding:0;font-family:'Malgun Gothic',dotum,'돋움',sans-serif;font-size:12px;}
.map_wrap a, .map_wrap a:hover, .map_wrap a:active{color:#000;text-decoration: none;}
.map_wrap {position:relative;width:100%;height:500px;}
#menu_wrap {position:absolute;top:0;left:0;bottom:0;width:250px;margin:10px 0 30px 10px;padding:5px;overflow-y:auto;background:rgba(255, 255, 255, 0.7);z-index: 1;font-size:12px;border-radius: 10px;}
.bg_white {background:#fff;}
#menu_wrap hr {display: block; height: 1px;border: 0; border-top: 2px solid #5F5F5F;margin:3px 0;}
#menu_wrap .option{text-align: center;}
#menu_wrap .option p {margin:10px 0;}  
#menu_wrap .option button {margin-left:5px;}
#placesList li {list-style: none;}
#placesList .item {position:relative;border-bottom:1px solid #888;overflow: hidden;cursor: pointer;min-height: 65px;}
#placesList .item span {display: block;margin-top:4px;}
#placesList .item h5, #placesList .item .info {text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}
#placesList .item .info{padding:10px 0 10px 55px;}
#placesList .info .gray {color:#8a8a8a;}
#placesList .info .jibun {padding-left:26px;background:url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png) no-repeat;}
#placesList .info .tel {color:#009900;}
#placesList .item .markerbg {float:left;position:absolute;width:36px; height:37px;margin:10px 0 0 10px;background:url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png) no-repeat;}
#placesList .item .marker_1 {background-position: 0 -10px;}
#placesList .item .marker_2 {background-position: 0 -56px;}
#placesList .item .marker_3 {background-position: 0 -102px}
#placesList .item .marker_4 {background-position: 0 -148px;}
#placesList .item .marker_5 {background-position: 0 -194px;}
#placesList .item .marker_6 {background-position: 0 -240px;}
#placesList .item .marker_7 {background-position: 0 -286px;}
#placesList .item .marker_8 {background-position: 0 -332px;}
#placesList .item .marker_9 {background-position: 0 -378px;}
#placesList .item .marker_10 {background-position: 0 -423px;}
#placesList .item .marker_11 {background-position: 0 -470px;}
#placesList .item .marker_12 {background-position: 0 -516px;}
#placesList .item .marker_13 {background-position: 0 -562px;}
#placesList .item .marker_14 {background-position: 0 -608px;}
#placesList .item .marker_15 {background-position: 0 -654px;}
#pagination {margin:10px auto;text-align: center;}
#pagination a {display:inline-block;margin-right:10px;}
#pagination .on {font-weight: bold; cursor: default;color:#777;}
</style>