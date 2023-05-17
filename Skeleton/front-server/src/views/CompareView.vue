<template>
  <section class="dataList">
    
    <deposit-list ref="depositList" :propsdata="mergedData"></deposit-list>
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
  computed: {
    ...mapState(['dataList']),
    mergedData() {
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

.list-title {
  margin-bottom: 20px;
  font-size: 24px;
}
</style>