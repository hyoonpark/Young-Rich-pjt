

<template>
  <v-container>
    <h1>Profile Page</h1>
    <p class="greeting">안녕하세요, <span class="username">{{ username }}</span>!</p>
    <v-card class="profile-info">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6">
           <v-text-field v-model="username" :disabled="!isEditing || isUsernameDisabled" label="닉네임"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="email" :disabled="!isEditing || isEmailDisabled" label="이메일"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field v-model="age" :disabled="!isEditing" label="나이" type="number" suffix="세"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="assets" :disabled="!isEditing" label="현재 자산" type="number" suffix="만원"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field v-model="salary" :disabled="!isEditing" label="연봉" type="number" suffix="만원"></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="!isEditing" @click="toggleEditing">수정</v-btn>
        <v-btn v-if="isEditing" @click="saveChanges">저장</v-btn>
      </v-card-actions>
    </v-card>
    <h2 class="subtitle">관심 상품 목록</h2>
    <v-card class="interest-product-list">
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <h2>예금</h2>
            <v-list>
              <v-list-item v-for="product in depositProducts" :key="product.id" @click="GoToProfileDeposit(product)" >
                <v-list-item-content>
                  
                   <v-list-item-title ><img v-if="setBankName(product)" :src="getBankImage(product.kor_co_nm)" alt="Bank Image" class="bank-image"> {{ product.fin_prdt_nm }} / {{ product.save_trm }}개월</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="6">
            <h2>적금</h2>
            <v-list>
              <v-list-item v-for="product in savingProducts" :key="product.id" @click="GoToProfileSaving(product)">
                <v-list-item-content>
                
                  <v-list-item-title ><img v-if="setBankName(product)" :src="getBankImage(product.kor_co_nm)" alt="Bank Image" class="bank-image"> {{ product.fin_prdt_nm }} / {{ product.save_trm }}개월</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <h2 class="subtitle">한 눈에 보는 내 상품</h2>
    
        <!-- "한 눈에 보는 내 상품" 옆에 버튼 추가 -->
        <v-card-actions>
          <v-btn @click="showStatistics">내 상품 통계 보기</v-btn>
        </v-card-actions>

        <!-- 통계 컴포넌트를 토글해서 보여줄 영역 -->
        <v-card v-if="showStatisticsComponent" class="statistic-list">
          <v-row>
            <Statistics :savingProducts="savingProducts" :depositProducts="depositProducts" />
          </v-row>
      </v-card>
  </v-container>
</template>

<script>

import Statistics from '@/components/Statistics.vue';

export default {
  
  name: 'ProfileView',
  data() {
    return {
      isEditing: false,
      isUsernameDisabled: true, 
      isEmailDisabled: true,
      depositProducts: [],
      savingProducts: [],
      bankName : null,
      showStatisticsComponent: false,
      }
  },
  components : {
    Statistics,
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    email: {
      get() {
        return this.user.email;
      },

    },
    assets: {
      get() {
        return this.user.assets;
      },
      set(value) {
        this.user.assets = value;
      }
    },
    salary: {
      get() {
        return this.user.salary;
      },
      set(value) {
        this.user.salary = value;
      }
    },
    username: {
      get() {
        return this.user.username;
      },

      },
    age: {
      get() {
        return this.user.age; 
      },
      set(value) {
        this.user.age = value; 
      }
    },
  },
  methods: {
    setBankName(product) {
      this.bankName = product.kor_co_nm;
      return true
    },
    getBankImage(bankName) {
      console.log(`@/assets/bank_images/${bankName}.png`)
      return require(`@/assets/bank_images/${bankName}.png`);
    },

    toggleEditing() {
      this.isEditing = !this.isEditing;

    },
    saveChanges() {
      this.$store.commit('updateUserProfile', {
        username: this.username,
        email: this.email,
        age: parseInt(this.age),
        assets: parseInt(this.assets),
        salary: parseInt(this.salary),
      });
      this.$store.dispatch('saveProfileChanges', this.$store.state.user)
        .then(() => {
          this.toggleEditing();
          alert('프로필 수정이 완료되었습니다!');

        })
        .catch(error => {
          console.error(error);
        });
    },

    loadinterestDeposit() {
      const userId = this.$store.state.user.id;
      
      let productType = 1;
      this.$store.dispatch('fetchInterestProducts', { userId, productType })
        .then(response => {
          this.depositProducts = response;
    
        })
        .catch(error => {
          console.error(error);
        });

    },
    loadinterestSaving() {
      const userId = this.$store.state.user.id;
      
      let productType = 2;
      this.$store.dispatch('fetchInterestProducts', { userId, productType })
        .then(response => {
          this.savingProducts = response;
    
        })
        .catch(error => {
          console.error(error);
        });
    },
    GoToProfileDeposit(product) {
      const id = product.fin_prdt_nm
    
      this.$router.push({ name: 'ProfileDeposit', params: {product,id}});
    },
    GoToProfileSaving(product) {
      const id = product.fin_prdt_nm
     
      this.$router.push({ name: 'ProfileSaving', params: {product,id}});
    },
    showStatistics() {
      this.showStatisticsComponent = true;
    },
  },
  created() {
    this.loadinterestSaving(),
    this.loadinterestDeposit()
  },
};
</script>

<style>
.profile-info {
  padding: 16px;
  margin-bottom: 16px;
}

h2.subtitle {
  margin-top: 50px;
}

.statistic-list {
  margin-top : 40px;
}

.interest-product-list {
  margin-top: 40px;
}

.v-text-field {
  margin-bottom: 16px;
}

.greeting {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
}

.username {
  color: #FF4081;
}
</style>