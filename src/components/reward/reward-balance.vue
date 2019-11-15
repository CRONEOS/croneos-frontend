<template>
      <div v-if="reward"  >
        <!-- {{parseReward()}} -->
        <div class="q-pa-sm bg-secondary rounded-borders shadow-3">
            <div class=" q-mb-md">{{ reward}}</div>
            <div class="row justify-end">
              <q-btn label="withdraw" color="primary" @click="withdraw( )" />
            </div>
            
        </div>
      </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  // name: 'ComponentName',
  props: {
    reward: {
      type: String,
      default: ""
    }
  },
  data () {
    return {
      cron_contract: "piecestest12",
    }
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName",
      getSettings: "app/getSettings",
      getConfig: "app/getConfig"
    }),
    // getParsedReward(){
    //   if(!this.reward) return;
    //   let {amount_p, sym} = reward.split(',');
    //   let res = {};
    //   res.symbol = sym;
    //   res.amount = parseFloat(amount_p).toFixed(4);
    //   return res;
    // },
    
  },
  methods:{
    parseReward(){
      if(!this.reward) return;
      let [amount_p, sym] = this.reward.split(' ');
      let precision = amount_p.includes(".") ? amount_p.split('.')[1].length-1 : 0;
      let amount = amount_p.substring(0, amount_p.length - 1);//remove excess decimal

      let res= {}
      res.asset = `${amount} ${sym}`;
      res.can_withdraw = !!Number(amount);
      return res;
    },
    async withdraw(){
    
      let actions = [
        {
          account: this.getConfig.cron_contract,
          name: "withdraw",
          data: {
            amount: this.parseReward().asset,
            miner: this.getAccountName
          }
        }
      ];
      let res = await this.$store.dispatch("ual/transact", { actions: actions });
      if(res){
        setTimeout(()=>{this.$store.dispatch("user/fetchRewards", this.getAccountName)}, 1000);
      }
    }

  }
}
</script>
