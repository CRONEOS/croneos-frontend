<template>

    <div class="row q-col-gutter-lg text-white" v-if="getExtendedDeposits">
      <!-- {{getExtendedDeposits}} -->
   
      <deposit-balance v-for="(feetoken, i) in getExtendedDeposits" :feetoken="feetoken" :key="`dep${i}`" />
   
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


    };
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName",
      getSettings: "app/getSettings",
      getDeposits: "user/getDeposits"
    }),
    getExtendedDeposits(){
      if(this.getSettings ){
        let res = [];
        this.getSettings.allowed_fee_tokens.forEach(aft => {
            let balance_for_sym = this.getDeposits.find(d => d.balance.split(' ')[1] == aft.sym);
            balance_for_sym = balance_for_sym ? balance_for_sym.balance : `0 ${aft.sym}`;
            let obj= JSON.parse(JSON.stringify(aft));
            obj.balance = balance_for_sym;
            res.push(obj)
        })
        return res;

      }




    }
  },
  methods:{


  },
  watch: {

  },
}
</script>

<style>
</style>
