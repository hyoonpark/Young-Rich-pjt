<template>
    <v-tabs v-model="activeTab">
      <v-tab v-for="(tab, index) in tabs" :key="index" @click="changeTab(index)">
        {{ tab.label }}
      </v-tab>
  
      <v-tab-item v-for="(tab, index) in tabs" :key="index" v-show="activeTab === index">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-row>
                <v-col cols="6">
                    
                  <canvas :ref="`depositchartCanvas${index}`" style="width: 50%; height:100%;"></canvas>
                </v-col>
                <v-col cols="6">
                   
                  <canvas :ref="`savingChartCanvas${index}`" style="width: 50%; height:50%;"></canvas>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs>
  </template>
  
  <script>
  import Chart from 'chart.js';
  
  export default {
    name: 'Statistics',
    props: {
      savingProducts: {
        type: Array,
        required: true
      },
      depositProducts: {
        type: Array,
        required: true
      }
    },
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
      this.$nextTick(() => {
        this.drawCharts();
      });
    },
    methods: {
      drawCharts() {
        this.tabs.forEach((tab, index) => {
          const depositcanvasRef = `depositchartCanvas${index}`;
          const depositctx = this.$refs[depositcanvasRef][0].getContext('2d'); // Access native DOM element
            
          const savingCanvasRef = `savingChartCanvas${index}`;
          const savingCtx = this.$refs[savingCanvasRef][0].getContext('2d');
          // Generate chart data based on the tab
          let DepositchartData;
          let SavingchartData
          switch (index) {
            case 0:
              DepositchartData = this.dgenerateInterestRateChartData();
              SavingchartData = this.sgenerateInterestRateChartData();
              break;
            case 1:
              DepositchartData = this.generateDurationChartData();
              SavingchartData = this.generateDurationChartData();
              break;
            case 2:
              DepositchartData = this.generateSavingTypeChartData();
              SavingchartData = this.generateSavingTypeChartData();
              break;
            case 3:
              DepositchartData = this.generateBankChartData();
              SavingchartData = this.generateBankChartData();
              break;
            default:
              chartData = {};
          }
  
          // Create chart using Chart.js
          new Chart(depositctx, {
            type: 'bar',
            data: DepositchartData,
            options: {
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  stepSize: 0.5,
                  max: 5
                },
                x: {
                  offset: true,
                  grid: {
                    offset: true
                  },
                  ticks: {
                    maxRotation: 0, // 레이블 최대 회전값
                    minRotation: 0 // 레이블 최소 회전값
                  }
                }
              },
              plugins: {
                tooltip: {
                  position: 'average',
                  mode: 'index',
                  intersect: false
                },
                legend: {
                  display: true,
                  position: 'top',
                  align: 'center',
                  labels: {
                    boxWidth: 12,
                    padding: 20
                  }
                }
              }
            }
          }),
          new Chart(savingCtx, {
            type: 'bar',
            data: SavingchartData,
            options: {
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  stepSize: 0.5,
                  max: 5
                },
                x: {
                  offset: true,
                  grid: {
                    offset: true
                  },
                  ticks: {
                    maxRotation: 0, // 레이블 최대 회전값
                    minRotation: 0 // 레이블 최소 회전값
                  }
                }
              },
              plugins: {
                tooltip: {
                  position: 'average',
                  mode: 'index',
                  intersect: false
                },
                legend: {
                  display: true,
                  position: 'top',
                  align: 'center',
                  labels: {
                    boxWidth: 12,
                    padding: 20
                  }
                }
              }
            }
          });
  
        });
      },
      dgenerateInterestRateChartData() {
        // Generate data for '금리별' chart
        const depositLabels = this.depositProducts.map(product => product.fin_prdt_nm);
        const depositData = this.depositProducts.map(product => product.intr_rate);
  
        console.log(depositLabels)
        return {
          labels: depositLabels,
          datasets: [
            {
              label: '금리(%)',
              data: depositData,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 3
            },
          ]
        };
      },
      sgenerateInterestRateChartData() {
        // Generate data for '금리별' chart
        const savingLabels = this.savingProducts.map(product => product.fin_prdt_nm);
        const savingData = this.savingProducts.map(product => product.intr_rate);
  
        return {
          labels: savingLabels,
          datasets: [
            {
              label: '금리(%)',
              data: savingData,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 3
            },
  
          ]
        };
      },
      generateDurationChartData() {
        const depositLabels = this.depositProducts.map(product => product.fin_prdt_nm);
        const depositData = this.depositProducts.map(product => product.intr_rate);
        const savingLabels = this.savingProducts.map(product => product.fin_prdt_nm);
        const savingData = this.savingProducts.map(product => product.intr_rate);
  
        return {
          labels: depositLabels,
          datasets: [
            {
              label: 'Deposit',
              data: depositData,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            },
            {
              label: 'Saving',
              data: savingData,
              backgroundColor: 'rgba(192, 75, 192, 0.2)',
              borderColor: 'rgba(192, 75, 192, 1)',
              borderWidth: 1
            }
          ]
        };
      },
      generateSavingTypeChartData() {
        const depositLabels = this.depositProducts.map(product => product.fin_prdt_nm);
        const depositData = this.depositProducts.map(product => product.intr_rate);
        const savingLabels = this.savingProducts.map(product => product.fin_prdt_nm);
        const savingData = this.savingProducts.map(product => product.intr_rate);
  
        return {
          labels: depositLabels,
          datasets: [
            {
              label: 'Deposit',
              data: depositData,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            },
            {
              label: 'Saving',
              data: savingData,
              backgroundColor: 'rgba(192, 75, 192, 0.2)',
              borderColor: 'rgba(192, 75, 192, 1)',
              borderWidth: 1
            }
          ]
        };
      },
      generateBankChartData() {
        const depositLabels = this.depositProducts.map(product => product.fin_prdt_nm);
        const depositData = this.depositProducts.map(product => product.intr_rate);
        const savingLabels = this.savingProducts.map(product => product.fin_prdt_nm);
        const savingData = this.savingProducts.map(product => product.intr_rate);
  
        return {
          labels: depositLabels,
          datasets: [
            {
              label: 'Deposit',
              data: depositData,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            },
            {
              label: 'Saving',
              data: savingData,
              backgroundColor: 'rgba(192, 75, 192, 0.2)',
              borderColor: 'rgba(192, 75, 192, 1)',
              borderWidth: 1
            }
          ]
        };
      },
      changeTab(index) {
        this.activeTab = index;
      }
    }
  };
  </script>