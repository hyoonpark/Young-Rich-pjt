import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const url = "http://localhost:8000/finlife/deposit-products/";
const optionsUrlPrefix = "http://localhost:8000/finlife/deposit-product-options/";

export default new Vuex.Store({
  state: {
    dataList: [],
  },
  mutations: {
    SET_DATA_LIST(state, dataList) {
      state.dataList = dataList;
    },
    SET_ADDITIONAL_DATA(state, { finPrdtCd, additionalData }) {
      state.dataList = state.dataList.map(data => {
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
    fetchData({ commit }) {
      return axios.get(url)
        .then(response => {
          const dataList = response.data;
          const optionRequests = dataList.map(data => {
            const optionsUrl = optionsUrlPrefix + data.fin_prdt_cd;
            return axios.get(optionsUrl)
              .then(response => {
                const additionalData = response.data;
                commit('SET_ADDITIONAL_DATA', { finPrdtCd: data.fin_prdt_cd, additionalData });
                return {
                  ...data,
                  additionalData: additionalData,
                };
              });
          });
          return Promise.all(optionRequests)
            .then(dataListWithAdditionalData => {
              commit('SET_DATA_LIST', dataListWithAdditionalData);
            });
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
});