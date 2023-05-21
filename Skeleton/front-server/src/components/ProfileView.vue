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
    <h1>관심 상품 목록</h1>
    <v-card class="interest-product-list">
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <h2>예금</h2>
            <v-list>
              <v-list-item v-for="product in depositProducts" :key="product.id" @click="navigateToProductDetails(product)">
                <v-list-item-content>
                  <v-list-item-title>{{ product.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="6">
            <h2>적금</h2>
            <v-list>
              <v-list-item v-for="product in savingProducts" :key="product.id" @click="navigateToProductDetails(product)">
                <v-list-item-content>
                  <v-list-item-title>{{ product.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'ProfileView',
  data() {
    return {
      isEditing: false,
      isUsernameDisabled: true, 
      isEmailDisabled: true,
      depositProducts: [],
      savingProducts: [],
    };
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
    // initializeProfileData() {
    //   const username = this.$store.state.user.userName;
    //   const storedProfile = JSON.parse(localStorage.getItem(`userProfile_${username}`)); // 각 유저의 프로필을 가져오도록 수정
    //   const storedProducts = JSON.parse(localStorage.getItem('interestProducts')) || [];
    //   const storedProductsDeposit = JSON.parse(localStorage.getItem('interestProductsDeposit')) || [];

  
    //   if (storedProfile) {
    //     this.nickname = storedProfile.nickname;
    //     this.email = storedProfile.email;
    //     this.age = storedProfile.age;
    //     this.assets = storedProfile.assets;
    //     this.salary = storedProfile.salary;
    //   }


    //   this.depositProducts = storedProductsDeposit.filter(
    //     product => product.type === 'deposit' && product.username === username
    //   );
    //   this.savingProducts = storedProducts.filter(
    //     product => product.type === 'saving' && product.username === username
    //   );

    //   this.loadInterestProducts();
    // },
    loadInterestProducts() {
      const username = this.$store.state.user.userName;
      const storedProductsDeposit = JSON.parse(localStorage.getItem('interestProductsDeposit')) || [];
      
      this.depositProducts = storedProductsDeposit.filter(
        product => product.type === 'deposit' && product.username === username
      );

      const storedProducts = JSON.parse(localStorage.getItem('interestProducts')) || [];
      this.savingProducts = storedProducts.filter(
        product => product.type === 'saving' && product.username === username
      );
    },
    navigateToProductDetails(product) {
    // 상품의 유형에 따라 적절한 상세 페이지로 이동합니다
    if (product.type === 'deposit') {
      this.$router.push(`/detail-deposit/${product.id}/${product.month}`);
    } else if (product.type === 'saving') {
      this.$router.push(`/detail-saving/${product.id}/${product.month}`);
    }
  },
  },
  created() {
    // this.initializeProfileData();
    this.loadInterestProducts();
  },
};
</script>

<style>
.profile-info {
  padding: 16px;
  margin-bottom: 16px;
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