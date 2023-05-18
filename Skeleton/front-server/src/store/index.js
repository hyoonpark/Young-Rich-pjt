import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const deposit_url = "http://localhost:8000/finlife/deposit-products/";
const deposit_optionsUrlPrefix = "http://localhost:8000/finlife/deposit-product-options/";
const saving_url = "http://localhost:8000/finlife/saving-products/";
const saving_optionsUrlPrefix = "http://localhost:8000/finlife/saving-product-options/"

export default new Vuex.Store({
  state: {
    depositList: [],
    savingList: [],
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
    },
})