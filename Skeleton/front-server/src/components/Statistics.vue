<template>
    <v-tabs v-model="activeTab">
      <v-tab v-for="(tab, index) in tabs" :key="index" @click="changeTab(index)">
        {{ tab.label }}
      </v-tab>
  
      <v-tab-item v-for="(tab, index) in tabs" :key="index" v-show="activeTab === index">
        <v-container>
          <v-row>
            <v-col cols="6">
              <canvas :ref="`chartCanvas${index}`" style="width: 100%; height: 400px;"></canvas>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs>
  </template>
  
  <script>
  import Chart from 'chart.js';
  
  export default {
    data() {
      return {
        activeTab: 0,
        tabs: [
          { label: '금리별' },
          { label: '기간별' },
          { label: '저축 금리 유형별' },
          { label: '은행별' }
        ],
        savingProducts: [],
        depositProducts: []
      };
    },
    mounted() {
      this.drawCharts();
    },
    methods: {
      drawCharts() {
        this.tabs.forEach((tab, index) => {
          const canvasRef = `chartCanvas${index}`;
          const ctx = this.$refs[canvasRef].getContext('2d');
  
          // Generate chart data based on the tab
          let chartData;
          switch (index) {
            case 0:
              chartData = this.generateInterestRateChartData();
              break;
            case 1:
              chartData = this.generateDurationChartData();
              break;
            case 2:
              chartData = this.generateSavingTypeChartData();
              break;
            case 3:
              chartData = this.generateBankChartData();
              break;
            default:
              chartData = {};
          }
  
          // Create chart using Chart.js
          new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {
              responsive: true,
              // Add additional chart options as needed
            }
          });
        });
      },
      generateInterestRateChartData() {
        // Generate data for '금리별' chart
        const labels = this.depositProducts.map(product => product.fin_prdt_nm);
        const data = this.depositProducts.map(product => product.save_trm);
  
        return {
          labels: labels,
          datasets: [
            {
              label: 'Months',
              data: data,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }
          ]
        };
      },
      generateDurationChartData() {
        // Generate data for '기간별' chart
        // Implement your logic here
      },
      generateSavingTypeChartData() {
        // Generate data for '저축 금리 유형별' chart
        // Implement your logic here
      },
      generateBankChartData() {
        // Generate data for '은행별' chart
        // Implement your logic here
      },
      changeTab(index) {
        this.activeTab = index;
      }
    }
  };
  </script>