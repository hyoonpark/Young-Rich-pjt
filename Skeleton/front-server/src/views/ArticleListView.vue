<template>
    <div>
      <br>
      <h1>Young&Rich Board</h1>
      <div class="centered">
      <router-link class="btn btn-danger" id="create" :to="{ name: 'CreateView' }">CREATE</router-link>
      <br>
      <ArticleList />
      <hr>
      </div>
    </div>
  </template>
  
  <script>
  import ArticleList from '@/components/Board/ArticleList.vue'
  
  export default {
    name: 'ArticleListView',
    components: {
      ArticleList,
    },
    computed:{
      isLogin() {
        return this.$store.getters.isLogin // 로그인 여부
      }
    },
    created() {
      this.getArticles()
    },
    methods: {
      getArticles() {
        if (this.isLogin) {
          this.$store.dispatch('getArticles')
        } else {
          alert('로그인이 필요한 페이지입니다...')
          this.$router.push({ name: 'LogInView' })
        }
        
  
  
        // 로그인이 되어 있으면 getArticles action 실행
        // 로그인 X라면 login 페이지로 이동
  
      }
    }
  }
  </script>
  
  <style scoped>
  h1 {
    text-align: center;
  }

  .centered {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  #create {
    color: aliceblue;
  }

  .create-button {
  margin-left: 10px;
  }
  </style>