<template>
  <v-container>
    <h1>Profile Page</h1>
    <p class="greeting"><span class="username">{{ username }}</span>님의 프로필입니다 !</p>
    <v-card class="profile-info">
  <v-card-text>
    <v-row class="profile-row">
      <v-col cols="12" sm="6">
        <v-text-field v-model="username" :disabled="!isEditing || isUsernameDisabled" label="닉네임"></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field v-model="email" :disabled="!isEditing || isEmailDisabled" label="이메일"></v-text-field>
      </v-col>
    </v-row>
    <v-row class="profile-row">
      <v-col cols="12" sm="6">
        <v-select v-model="age" :disabled="!isEditing" :items="ageOptions" label="나이" ></v-select>
      </v-col>
      <v-col cols="12" sm="6">
        <v-select v-model="assets" :disabled="!isEditing" :items="assetsOptions" label="자산">
            <option :value="null">콘텐츠선택</option>
        </v-select>
      </v-col>
    </v-row>
    <v-row class="profile-row">
      <v-col cols="12" sm="6">
        <v-select v-model="salary" :disabled="!isEditing" :items="salaryOptions" label="월급"></v-select>
      </v-col>
    </v-row>
  </v-card-text>
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn v-if="!isEditing" @click="toggleEditing" color="primary">수정</v-btn>
    <v-btn v-if="isEditing" @click="saveChanges" color="primary">저장</v-btn>
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
      <v-row>
        <v-col cols="6">
          <h2 class="subtitle">한 눈에 보는 내 상품 <v-btn @click="showStatistics" color=primary>통계 보기</v-btn></h2>
         
        </v-col>
    </v-row>
  
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
      ageOptions: ['10대', '20대', '30대', '40대', '50대', '60대', '70대', '80대'],
      assetsOptions: ['0-1000만원', '1000-2000만원', '2000-3000만원', '3000-4000만원', '4000-5000만원', '5000-6000만원', '6000-7000만원', '7000-8000만원', '8000-9000만원', '9000-10000만원'],
      salaryOptions: ['0-100만원', '100-200만원', '200-300만원', '300-400만원', '400-500만원', '500-600만원', '600-700만원', '700-800만원', '800-900만원', '900-1000만원'],

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
        return this.user.assets 
      },
      set(value) {
        this.user.assets = value;
      }
    },
    salary: {
      get() {
        return this.user.salary
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
        return this.user.age
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
        age  : this.getAgeValue(this.age),
        assets : this.getNumericValue(this.assets),
        salary : this.getNumericValue(this.salary)
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
    getAgeValue(ageOption) {
      // 나이 옵션에 따라 실제 나이 값으로 변환하여 반환
      switch (ageOption) {
        case '10대':
          return 10;
        case '20대':
          return 20;
        case '30대':
          return 30;
        case '40대':
          return 40;
        case '50대':
          return 50;
        case '60대':
          return 60;
        case '70대':
          return 70;
        case '80대':
          return 80;
        default:
          return null;
      }
    },
    getNumericValue(rangeOption) {
      // 범위 옵션에 따라 숫자 값으로 변환하여 반환
      if (rangeOption) {
        const rangeValues = rangeOption.split('-');
        if (rangeValues.length === 2) {
          return parseInt(rangeValues[1], 10) ;
        }
      }
      return null;
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

.profile-row {
  margin-bottom: 16px;
}

.v-btn {
  margin-right: 8px;
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
  color: #03A9F4
}
</style>