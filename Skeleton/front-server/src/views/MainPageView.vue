<template>
  <v-container class="v-container-h" fluid fill-height>
    <v-row justify="center" align="center">
      <v-col cols="12">
        <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="false">
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4" aria-label="Slide 5"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="5" aria-label="Slide 6"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="6" aria-label="Slide 7"></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <router-link :to="{ name: 'CompareView' }">
                <img src="@/assets/main_images/list.png" class="d-block w-100" alt="예적금리스트">
              </router-link>
              <div class="carousel-caption d-none d-md-block">
                <h5>Slide 1</h5>
                <p>Some representative placeholder content for the first slide.</p>
              </div>
            </div>
            <div class="carousel-item">
              <router-link :to="{ name: 'KakaoView' }">
                <img src="@/assets/main_images/search.png" class="d-block w-100" alt="은행찾기">
              </router-link>
              <div class="carousel-caption d-none d-md-block">
                <h5>Slide 2</h5>
                <p>Some representative placeholder content for the second slide.</p>
              </div>
            </div>
            <div class="carousel-item">
              <router-link :to="{ name: 'ExchangeView' }">
                <img src="@/assets/main_images/exchange.png" class="d-block w-100" alt="환율정보">
              </router-link>
              <div class="carousel-caption d-none d-md-block">
                <h5>Slide 3</h5>
                <p>Some representative placeholder content for the third slide.</p>
              </div>
            </div>
            <!-- 추가적인 슬라이드 -->
            <div class="carousel-item">
              <router-link :to="{ name: 'ArticleListView' }">
                <img src="@/assets/main_images/article.png" class="d-block w-100" alt="부자게시판">
              </router-link>
              <div class="carousel-caption d-none d-md-block">
                <h5>Slide 4</h5>
                <p>Some representative placeholder content for the fourth slide.</p>
              </div>
            </div>
            <div class="carousel-item">
              <router-link :to="{ name: 'CreateView' }">
                <img src="@/assets/main_images/create.png" class="d-block w-100" alt="꿀팁작성">
              </router-link>
              <div class="carousel-caption d-none d-md-block">
                <h5>Slide 5</h5>
                <p>Some representative placeholder content for the fifth slide.</p>
              </div>
            </div>
            <div class="carousel-item">
              <router-link :to="{ name: 'SignUpView' }">
                <img src="@/assets/main_images/signup.png" class="d-block w-100" alt="회원가입">
              </router-link>
              <div class="carousel-caption d-none d-md-block">
                <h5>Slide 6</h5>
                <p>Some representative placeholder content for the sixth slide.</p>
              </div>
            </div>
            <div class="carousel-item">
              <router-link :to="{ name: 'LogInView' }">
                <img src="@/assets/main_images/login.png" class="d-block w-100" alt="로그인">
              </router-link>
              <div class="carousel-caption d-none d-md-block">
                <h5>Slide 7</h5>
                <p>Some representative placeholder content for the seventh slide.</p>
              </div>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'MainPageView',
}
</script>

<style scoped>


/* 슬라이드의 화살표와 인디케이터의 색상을 수정합니다. */
.carousel-control-prev-icon,
.carousel-control-next-icon {
  background-color: black;
}
.carousel-indicators .active {
  background-color: black;
}

/* 슬라이드 내용의 텍스트 색상을 수정합니다. */
.carousel-caption {
  color: black;
}

/* 슬라이드 내용의 배경 색상을 수정합니다. */
.carousel-caption::before {
  background-color: rgba(255, 255, 255, 0.7);
}
</style>
