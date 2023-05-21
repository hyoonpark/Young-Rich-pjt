import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import createPersistedState from 'vuex-persistedstate';
import router from '../router';

const API_URL = 'http://127.0.0.1:8000';

Vue.use(Vuex);

const deposit_url = 'http://localhost:8000/finlife/deposit-products/';
const deposit_optionsUrlPrefix = 'http://localhost:8000/finlife/deposit-product-options/';
const saving_url = 'http://localhost:8000/finlife/saving-products/';
const saving_optionsUrlPrefix = 'http://localhost:8000/finlife/saving-product-options/';

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    depositList: [],
    savingList: [],
    token: null,
    user: {
      id: null,
      username: null,
      email: null,
      age: null,
      assets: null,
      salary: null,
    },
  },
  getters: {
    isLogin(state) {
      return state.token ? true : false;
    },
    getUserName(state) {
      return state.user.userName;
    },
  },
  mutations: {
    SET_DEPOSIT_LIST(state, depositList) {
      state.depositList = depositList;
    },
    SET_SAVING_LIST(state, savingList) {
      state.savingList = savingList;
    },
    SET_DEPOSIT_ADDITIONAL_DATA(state, { finPrdtCd, additionalData }) {
      state.depositList = state.depositList.map((data) => {
        if (data.fin_prdt_cd === finPrdtCd) {
          return {
            ...data,
            additionalData: additionalData,
          };
        }
        return data;
      });
    },
    SET_SAVING_ADDITIONAL_DATA(state, { finPrdtCd, additionalData }) {
      state.savingList = state.savingList.map((data) => {
        if (data.fin_prdt_cd === finPrdtCd) {
          return {
            ...data,
            additionalData: additionalData,
          };
        }
        return data;
      });
    },
    SAVE_TOKEN(state, token) {
      state.token = token;
      router.push({ name: 'CompareView' }); //  store/index.js $router 접근 불가 -> import를 해야함
    },
    SET_USER(state, user) {
      state.user = user;
    },
    updateUserProfile(state, userProfile) {
      state.user = { ...state.user, ...userProfile };
    },

    LOGOUT(state) {
      state.token = null;
      state.user = {
        id: null,
        username: null,
        email: null,
        age: null,
        assets: null,
        salary: null,
      };
      router.push({ name: 'MainPageView' });
    },
  },
  actions: {
    fetchDepositData({ commit }) {
      // 예금 데이터 가져오기
      return axios
        .get(deposit_url)
        .then((response) => {
          const depositList = response.data;
          const optionRequests = depositList.map((data) => {
            const optionsUrl = deposit_optionsUrlPrefix + data.fin_prdt_cd;
            return axios.get(optionsUrl).then((response) => {
              const additionalData = response.data;
              commit('SET_DEPOSIT_ADDITIONAL_DATA', { finPrdtCd: data.fin_prdt_cd, additionalData });
              return {
                ...data,
                additionalData: additionalData,
              };
            });
          });
          return Promise.all(optionRequests).then((depositListWithAdditionalData) => {
            commit('SET_DEPOSIT_LIST', depositListWithAdditionalData);
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchSavingData({ commit }) {
      // 적금 데이터 가져오기
      return axios
        .get(saving_url)
        .then((response) => {
          const savingList = response.data;
          const optionRequests = savingList.map((data) => {
            const optionsUrl = saving_optionsUrlPrefix + data.fin_prdt_cd;
            return axios.get(optionsUrl).then((response) => {
              const additionalData = response.data;
              commit('SET_SAVING_ADDITIONAL_DATA', { finPrdtCd: data.fin_prdt_cd, additionalData });
              return {
                ...data,
                additionalData: additionalData,
              };
            });
          });
          return Promise.all(optionRequests).then((savingListWithAdditionalData) => {
            commit('SET_SAVING_LIST', savingListWithAdditionalData);
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchInterestProducts({ commit, state }, { userId, productType }) {
      return new Promise((resolve, reject) => {
        if (state.token) {
          const token = state.token
          const config = {
            headers: {
              Authorization: `Token ${token}`,
            },
          };
          const params = {
            user_id: userId,
            product_type: productType,
          };
        
          axios.post(`${API_URL}/accounts/get_interest/`, params, config)
            .then(response => {
              resolve(response.data);
             
            })
            .catch(error => {
              reject(error);
            });
        } else {
          reject(new Error('인증되지 않은 사용자입니다.'));
        }
      });
    },
    signUp(context, payload) {
      const username = payload.username;
      const email = payload.email;
      const password1 = payload.password1;
      const password2 = payload.password2;
      const age = parseInt(payload.age); // Integer 형식으로 변환
      const assets = parseInt(payload.assets); // Integer 형식으로 변환
      const salary = parseInt(payload.salary); // Integer 형식으로 변환
    
      axios
        .post(`${API_URL}/accounts/create-user/`, {
          username: username,
          email: email,
          password: password1,
          age: age,
          assets: assets,
          salary: salary,
        })
        .then((response) => {
          alert('회원가입이 완료되었습니다.');
          router.push('/');
        })
        .catch((error) => {
          // 회원가입 실패 처리
          console.error(error);
          alert('회원가입 중 오류가 발생했습니다.');
        });
    },
    login(context, payload) {
      const username = payload.username;
      const password = payload.password;

      return axios
        .post(`${API_URL}/accounts/login/`, {
          username,
          password,
        })
        .then((response) => {
          const token = response.data.token;
          // 토큰을 저장하거나 Vuex 스토어에 저장
          context.commit('SAVE_TOKEN', token);
          const user = {
            id: response.data.id,
            username: response.data.username,
            email: response.data.email,
            age: response.data.age,
            assets: response.data.assets,
            salary: response.data.salary,
          };
          context.commit('SET_USER', user);
          axios.get(`${API_URL}/accounts/login/`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          // 로그인 성공 처리
          alert('로그인이 처리되었습니다.');
          // 사용자 정보 요청을 통해 사용자 정보를 가져옵니다.

        })
        .catch((error) => {
          // 로그인 실패 처리
          console.error(error);
          alert('없는 회원이거나 회원 정보가 틀립니다');
        });
    },
    logout({ commit }) {
      commit('LOGOUT');
    },

    initialize({ commit }) {
      const username = this.state.user.userName;
      const storedProfile = JSON.parse(localStorage.getItem(`userProfile_${username}`));
      if (storedProfile) {
        commit('updateUserProfile', storedProfile);
      }
    },
    saveProfileChanges({ commit, state }, userProfile) {
      if (state.token) {
        return new Promise((resolve, reject) => {
          const token = state.token;
          console.log(token);
          const config = {
            headers: {
              Authorization: `Token ${token}`,
            },
          };

          console.log(userProfile);
          axios
            .put(`${API_URL}/accounts/updateprofile/`, userProfile, config)
            .then((response) => {
              commit('updateUserProfile', userProfile);
              localStorage.setItem(`userProfile_${userProfile.username}`, JSON.stringify(userProfile));

              resolve(response.data);
            })
            .catch((error) => {
              reject(error);
            });
        });
      } else {
        return Promise.reject(new Error('인증되지 않은 사용자입니다.'));
      }
    },
    registerDepositProduct({ commit, state }, product) {
      return new Promise((resolve, reject) => {
        if (state.token) {
          const token = state.token;
          console.log(token);
          const config = {
            headers: {
              Authorization: `Token ${token}`,
            },
          };
          axios
            .post(`${API_URL}/accounts/update_interest_product/`, product, config)
            .then((response) => {
              resolve(response.data);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          reject(new Error('인증되지 않은 사용자입니다.'));
        }
      });
    },
    unregisterDepositProduct({ commit, state }, product) {
      if (state.token) {
        return new Promise((resolve, reject) => {
          const token = state.token;
      
          const config = {
            headers: {
              Authorization: `Token ${token}`,
            },
          };
          axios
            .delete(`${API_URL}/accounts/update_interest_product/`, { data: product, ...config })
            .then(response => {
              resolve(response.data);
            })
            .catch(error => {
              reject(error);
            });
        });
      } else {
        return Promise.reject(new Error('인증되지 않은 사용자입니다.'));
      }
    },
    checkInterestProduct({ commit, state }, product) {
      if (state.token) {
        return new Promise((resolve, reject) => {
          const token = state.token;
        
          const config = {
            headers: {
              Authorization: `Token ${token}`,
            },
          };
          axios
            .post(`${API_URL}/accounts/check_interest/`, product, config )
            .then(response => {
              resolve(response.data);
            })
            .catch(error => {
              reject(error);
            });
        });
      } else {
        return Promise.reject(new Error('인증되지 않은 사용자입니다.'));
      }
    }
    
  },
});