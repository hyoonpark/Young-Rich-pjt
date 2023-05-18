<template>
  <div>
    <div class="container">
    <!-- <img src="./img/money.png" alt="money" class="img"> -->
      <h1 class="ercword">환율계산기</h1>
      <p>외화 환전금액을 계산하여 드립니다.</p>
      <div class="currency">
          <select class="selectcurrency" name="currency-one" id="currencyOne" v-model="currencyOne">
              <option value="AED">AED</option>
              <option value="ARS">ARS</option>
              <option value="AUD">AUD</option>
              <option value="BGN">BGN</option>
              <option value="BRL">BRL</option>
              <option value="BSD">BSD</option>
              <option value="CAD">CAD</option>
              <option value="CHF">CHF</option>
              <option value="CLP">CLP</option>
              <option value="CNY">CNY</option>
              <option value="COP">COP</option>
              <option value="CZK">CZK</option>
              <option value="DKK">DKK</option>
              <option value="DOP">DOP</option>
              <option value="EGP">EGP</option>
              <option value="EUR">EUR</option>
              <option value="FJD">FJD</option>
              <option value="GBP">GBP</option>
              <option value="GTQ">GTQ</option>
              <option value="HKD">HKD</option>
              <option value="HRK">HRK</option>
              <option value="HUF">HUF</option>
              <option value="IDR">IDR</option>
              <option value="ILS">ILS</option>
              <option value="INR">INR</option>
              <option value="ISK">ISK</option>
              <option value="JPY">JPY</option>
              <option value="KRW">KRW</option>
              <option value="KZT">KZT</option>
              <option value="MXN">MXN</option>
              <option value="MYR">MYR</option>
              <option value="NOK">NOK</option>
              <option value="NZD">NZD</option>
              <option value="PAB">PAB</option>
              <option value="PEN">PEN</option>
              <option value="PHP">PHP</option>
              <option value="PKR">PKR</option>
              <option value="PLN">PLN</option>
              <option value="PYG">PYG</option>
              <option value="RON">RON</option>
              <option value="RUB">RUB</option>
              <option value="SAR">SAR</option>
              <option value="SEK">SEK</option>
              <option value="SGD">SGD</option>
              <option value="THB">THB</option>
              <option value="TRY">TRY</option>
              <option value="TWD">TWD</option>
              <option value="UAH">UAH</option>
              <option value="USD" selected>USD</option>
              <option value="UYU">UYU</option>
              <option value="VND">VND</option>
              <option value="ZAR">ZAR</option>
          </select>
          <input type="number" id="amount-one" value="1">
        </div>
      <div class="swap-rate-container">
        <button id="swap" class="btn">Swap</button>
        <div id="rate" class="rate"></div>
      </div>

      <div class="currency">
        <select class="selectcurrency" name="currency-two" id="currencyTwo" v-model="currencyTwo">
            <option value="AED">AED</option>
            <option value="ARS">ARS</option>
            <option value="AUD">AUD</option>
            <option value="BGN">BGN</option>
            <option value="BRL">BRL</option>
            <option value="BSD">BSD</option>
            <option value="CAD">CAD</option>
            <option value="CHF">CHF</option>
            <option value="CLP">CLP</option>
            <option value="CNY">CNY</option>
            <option value="COP">COP</option>
            <option value="CZK">CZK</option>
            <option value="DKK">DKK</option>
            <option value="DOP">DOP</option>
            <option value="EGP">EGP</option>
            <option value="EUR">EUR</option>
            <option value="FJD">FJD</option>
            <option value="GBP">GBP</option>
            <option value="GTQ">GTQ</option>
            <option value="HKD">HKD</option>
            <option value="HRK">HRK</option>
            <option value="HUF">HUF</option>
            <option value="IDR">IDR</option>
            <option value="ILS">ILS</option>
            <option value="INR">INR</option>
            <option value="ISK">ISK</option>
            <option value="JPY">JPY</option>
            <option value="KRW" selected>KRW</option>
            <option value="KZT">KZT</option>
            <option value="MXN">MXN</option>
            <option value="MYR">MYR</option>
            <option value="NOK">NOK</option>
            <option value="NZD">NZD</option>
            <option value="PAB">PAB</option>
            <option value="PEN">PEN</option>
            <option value="PHP">PHP</option>
            <option value="PKR">PKR</option>
            <option value="PLN">PLN</option>
            <option value="PYG">PYG</option>
            <option value="RON">RON</option>
            <option value="RUB">RUB</option>
            <option value="SAR">SAR</option>
            <option value="SEK">SEK</option>
            <option value="SGD">SGD</option>
            <option value="THB">THB</option>
            <option value="TRY">TRY</option>
            <option value="TWD">TWD</option>
            <option value="UAH">UAH</option>
            <option value="USD">USD</option>
            <option value="UYU">UYU</option>
            <option value="VND">VND</option>
            <option value="ZAR">ZAR</option>
        </select>
        <input type="number" id="amount-two" value="1">
      </div>
    </div>
  </div>
</template>

<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script>
export default {
  data() {
    return {
      data: [],
      currencyKey: "{{ CURRENCY_KEY }}",
      currencyOne: "USD",
      amountOne: 1,
      currencyTwo: "KRW",
      amountTwo: 1,
      conversionRate: '',
    }
  },
  methods: {
    async updateCurrency() {
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/{{ currencyKey }}/latest/${this.currencyOne}`
        );

        const data = response.data;

        this.conversionRate = data.conversion_rates[this.currencyTwo];

        this.amountTwo = (this.amountOne * this.conversionRate).toFixed(2);
      } catch (error) {
        console.log(error);
      }
    },
    changeCurrency() {
      const temp = this.currencyTwo;
      this.currencyTwo = this.currencyOne;
      this.currencyOne = temp;
      this.updateCurrency();
    }
  },
  mounted() {
    this.updateCurrency();
  },
  watch: {
    currencyOne() {
      this.updateCurrency();
    },
    currencyTwo() {
      this.updateCurrency();
    },
    amountOne() {
      this.updateCurrency();
    }
  },
}
</script>

<style>
  *{
      box-sizing: border-box;
  }
  body{
      margin: 0;
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      flex-direction: column;
      background-color: #fff;
  }
  
  .img{
      width: 150px;
      height: 150px;
  }
  
  .ercword{
      color: #5fbaa7;
  }
  
  .currency{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 40px 0;
  }
  
  .currency input{
      text-align: right;
      padding: 1px 2px;
      border: none;
      font-size: 30px;
  }
  
  .selectcurrency{
      padding: 10px 20px 10px 10px;
      font-size: 16px;
      border-radius: 10px;
      border: 1px solid #777;
      background: transparent;
  
  }
  
  .swap-rate-container{
      display: flex;
      justify-content: space-between;
      align-items: center;
  }
  
  .rate {
      color: #5fbaa7;
      font-size: 18px;
      padding: 0 10px;
    }

  .btn{
      background-color: #5fbaa7;
      color: #fff;
      padding: 5px 12px;
      border-radius: 10px;
  }
</style>