<template>
  <div style=" min-height:120px">
    <q-checkbox v-model="show_zero_balances" label="show zero balances" dense class="q-mb-sm"/>
    <div class="row q-col-gutter-lg text-white" v-if="getExtendedDeposits">
      <!-- {{getExtendedDeposits}} -->

      <deposit-balance
        v-for="(feetoken, i) in getExtendedDeposits"
        :feetoken="feetoken"
        :key="`dep${i}`"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import depositBalance from "components/deposit-balance";
export default {
  // name: 'PageName',
  components: {
    depositBalance
  },
  data() {
    return {
      show_zero_balances: true
    };
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName",
      getSettings: "app/getSettings",
      getDeposits: "user/getDeposits"
    }),
    getExtendedDeposits() {
      if (this.getSettings) {
        let res = [];
        this.getSettings.allowed_fee_tokens.forEach(aft => {

          let balance_for_sym = this.getDeposits.find(d => d.balance.split(" ")[1] == aft.sym);
          balance_for_sym = balance_for_sym ? balance_for_sym.balance: `0 ${aft.sym}`;
          let obj = JSON.parse(JSON.stringify(aft));
          obj.balance = balance_for_sym;
          res.push(obj);
        });
        //hide show zero balances
        if(!this.show_zero_balances){
          res = res.filter(r => parseFloat(r.balance) != 0 )
        }
        return res;
      }
    }
  },
  methods: {},
  watch: {}
};
</script>

<style>
</style>
