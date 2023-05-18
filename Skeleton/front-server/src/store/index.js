import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import createPersistedState from 'vuex-persistedstate'
import router from '../router'


const API_URL = 'http://127.0.0.1:8000'


Vue.use(Vuex);

const deposit_url = "http://localhost:8000/finlife/deposit-products/";
const deposit_optionsUrlPrefix = "http://localhost:8000/finlife/deposit-product-options/";
const saving_url = "http://localhost:8000/finlife/saving-products/";
const saving_optionsUrlPrefix = "http://localhost:8000/finlife/saving-product-options/"


export default new Vuex.Store({
  plugins: [
    createPersistedState(),
  ],
  state: {
    depositList: [],
    savingList: [],
    token: null,
    user : {
      id : null,
      userName : null,
    }
 
  },
  getters: {
    isLogin(state) {
      return state.token ? true : false
    },
    getUserName(state) {
      return state.user.userName;
    }
    },
  mutations: {
    SET_DEPOSIT_LIST(state, depositList) {
      state.depositList = depositList;
    },
    SET_SAVING_LIST(state, savingList) {
      state.savingList = savingList;
    },
    SET_DEPOSIT_ADDITIONAL_DATA(state, { finPrdtCd, additionalData }) {
      state.depositList = state.depositList.map(data => {
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
      state.savingList = state.savingList.map(data => {
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
      router.push({name : 'CompareView'}) //  store/index.js $router 접근 불가 -> import를 해야함
    },
    SET_USER(state, user) {
      state.user = user;
    },
    LOGOUT(state) {
      state.token = null;
      state.user = {
        id : null,
        userName: null,
      }
      router.push({name:'MainPageView'})
    },
  },
  actions: {
    fetchDepositData({ commit }) {
      // 예금 데이터 가져오기
      return axios.get(deposit_url)
        .then(response => {
          const depositList = response.data;
          const optionRequests = depositList.map(data => {
            const optionsUrl = deposit_optionsUrlPrefix + data.fin_prdt_cd;
            return axios.get(optionsUrl)
              .then(response => {
                const additionalData = response.data;
                commit('SET_DEPOSIT_ADDITIONAL_DATA', { finPrdtCd: data.fin_prdt_cd, additionalData });
                return {
                  ...data,
                  additionalData: additionalData,
                };
              });
          });
          return Promise.all(optionRequests)
            .then(depositListWithAdditionalData => {
              commit('SET_DEPOSIT_LIST', depositListWithAdditionalData);
            });
        })
        .catch(error => {
          console.error(error);
        });
      },
    fetchSavingData({ commit }) {
      // 적금 데이터 가져오기
      return axios.get(saving_url)
        .then(response => {
          const savingList = response.data;
          const optionRequests = savingList.map(data => {
            const optionsUrl = saving_optionsUrlPrefix + data.fin_prdt_cd;
            return axios.get(optionsUrl)
              .then(response => {
                const additionalData = response.data;
                commit('SET_SAVING_ADDITIONAL_DATA', { finPrdtCd: data.fin_prdt_cd, additionalData });
                return {
                  ...data,
                  additionalData: additionalData,
                };
              });
          });
          return Promise.all(optionRequests)
            .then(savingListWithAdditionalData => {
              commit('SET_SAVING_LIST', savingListWithAdditionalData);
            });
        })
        .catch(error => {
          console.error(error);
        });
      },
      signUp(context, payload) {
        const username = payload.username
        const password1 = payload.password1
        const password2 = payload.password2
  
        axios({
          method: 'post',
          url: `${API_URL}/accounts/signup/`,
          data: {
            username, password1, password2
          }
        })
          .then((res) => {
            // console.log(res)
            // context.commit('SIGN_UP', res.data.key)
            context.commit('SAVE_TOKEN', res.data.key)
            alert('회원가입이 완료되었습니다')
          })
          .catch((err) => {
          console.log(err)
          alert('이미 존재하는 회원이거나, 아이디가 형식에 맞지 않습니다.')
        })
      },
      login(context, payload) {
        const username = payload.username
        const password = payload.password
  
        axios({
          method: 'post',
          url: `${API_URL}/accounts/login/`,
          data: {
            username, password
          }
        })
          .then((res) => {
            const user = {userName : username}
            context.commit('SET_USER',user)
            context.commit('SAVE_TOKEN', res.data.key)
            alert('로그인이 처리되었습니다')
          })
      
        .catch((err) =>  {
          console.log(err)
          alert('아이디와 비밀번호를 확인하세요!')
        })


      },
      logout({commit}) {
        commit('LOGOUT')
      }
    },
})