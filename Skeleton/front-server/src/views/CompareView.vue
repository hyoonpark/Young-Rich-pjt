<template>
  <v-main>
    <section class="v-main" ref="dataListRef">
      <div class="tab-bar">
        <button class="tab deposit" :class="{ active: activeTab === 'deposit' }" @click="changeTab('deposit')">
          <v-avatar size="24">
            <v-icon>mdi-cash-multiple</v-icon>
          </v-avatar>
          예금
        </button>
        <button class="tab savings" :class="{ active: activeTab === 'savings' }" @click="changeTab('savings')">
          <v-avatar size="24">
            <v-icon>mdi-piggy-bank</v-icon>
          </v-avatar>
          적금
        </button>
      </div>

      <div class="tab-content" style="height:775px;">
        <v-card v-if="activeTab === 'deposit'" class="deposit-list" ref="depositList">
          <deposit-list :propsdata="mergedDepositData"></deposit-list>
        </v-card>

        <v-card v-if="activeTab === 'savings'" class="saving-list" ref="savingList">
          <saving-list :propsdata="mergedSavingData"></saving-list>
        </v-card>
      </div>
    </section>

    <!-- Remainder of your code -->
  </v-main>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import DepositList from '@/components/DepositList.vue';
import SavingList from '@/components/SavingList.vue';

export default {
  name: 'CompareView',
  components: {
    DepositList,
    SavingList,
  },
  data() {
    return {
      activeTab: 'deposit', // 기본적으로 예금 탭을 활성화
    };
  },
  computed: {
    ...mapState(['depositList', 'savingList']),
    mergedDepositData() {
      return this.depositList.map(data => {
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
    mergedSavingData() {
      return this.savingList.map(data => {
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
    ...mapActions(['fetchDepositData', 'fetchSavingData']),
    changeTab(tab) {
      this.activeTab = tab;
    },
  },
  mounted() {
    this.fetchDepositData();
    this.fetchSavingData();
  },
};
</script>

<style scoped>
.tab {
  padding: 8px 16px;
  background-color: #f2f2f2;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-right: 5px;
  display: flex;
  align-items: center;
}



.v-main__wrap {
  display: flex;
  flex-direction: column;
}

.dataList {
  position: sticky;
  top: 0;
  z-index: 1;
 
}

.tab-content {
  display: flex;
  justify-content: space-between;
}
.tab.active {
  background-color: #e2e2e2;
}

.tab .v-icon {
  margin-right: 5px;
}

.v-card {
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

.deposit-list,
.saving-list {
  width: 75%;
  height : 113%;
  margin-left : 470px;
}

@media (max-width: 768px) {
  .deposit-list,
  .saving-list {
    width: 100%;
    height: auto;
    margin-left: 0;
  }
}

</style>