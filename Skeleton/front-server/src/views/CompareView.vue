<template>
  <section class="dataList">
    <div class="tab-bar">
      <button class="tab" :class="{ active: activeTab === 'deposit' }" @click="changeTab('deposit')">예금</button>
      <button class="tab" :class="{ active: activeTab === 'savings' }" @click="changeTab('savings')">적금</button>
    </div>

    <div class="tab-content">
      <div v-if="activeTab === 'deposit'">
        <deposit-list ref="depositList" :propsdata="mergedDepositData"></deposit-list>
      </div>

      <div v-if="activeTab === 'savings'">
        <h2 class="list-title">적금 List</h2>
        <!-- 적금에 대한 컴포넌트 또는 내용을 추가하세요 -->
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import DepositList from '@/components/DepositList.vue';

export default {
  name: 'CompareView',
  components: {
    DepositList: DepositList,
  },
  data() {
    return {
      activeTab: 'deposit', // 기본적으로 예금 탭을 활성화
    };
  },
  computed: {
    ...mapState(['dataList']),
    mergedDepositData() {
      return this.dataList.map(data => {
        if (data.additionalData) {
          return {
            ...data,
            intr_rate: data.additionalData.intr_rate,
          };
        } else {
          return data;
        }
      });
    },
  },
  methods: {
    ...mapActions(['fetchData']),
    changeTab(tab) {
      this.activeTab = tab;
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style>
.dataList {
  margin-top: 100px;
  text-align: center;
}

.tab-bar {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
}

.tab {
  padding: 8px 16px;
  background-color: #f2f2f2;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.tab.active {
  background-color: #e2e2e2;
}

.tab-content {
  margin-left: 100px;
}

.list-title {
  margin-bottom: 20px;
  font-size: 24px;
}

/* 추가된 스타일 */
.tab-bar {
  max-width: 400px;
  margin: 0 auto;
}

.tab {
  flex: 1;
  margin-right: 5px;
}

.tab-content {
  margin-left: 0;
}
</style>