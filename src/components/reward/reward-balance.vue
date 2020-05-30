<template>
    
        <q-item dark v-if="reward">
          <q-item-section avatar>
            <q-spinner v-if="is_withdrawing"/>
            <q-icon v-else :name="`img:${getIconForSymbol(reward.split(' ')[1])}`" color="primary" text-color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label caption>{{ reward}}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn label="withdraw" color="primary" @click="withdraw()"  size="sm" :disabled="getIsTransacting || !parseReward().can_withdraw"/>
          </q-item-section>
        </q-item>
    
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

      is_withdrawing: false
    }
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName",
      getSettings: "app/getSettings",
      getConfig: "app/getConfig",
      getIsTransacting: "ual/getIsTransacting",
      getIconForSymbol: "app/getIconForSymbol",
      getActiveNetwork: "ual/getActiveNetwork",
      getCronBalance: "user/getCronBalance"
    })

    
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
      this.is_withdrawing=true;
      let amount = this.parseReward().asset;
      let actions = [
        {
          account: this.getConfig[this.getActiveNetwork].cron_contract,
          name: "withdraw",
          data: {
            amount: amount,
            miner: this.getAccountName
          }
        }
      ];
      if(amount.includes("CRON") && !this.getCronBalance ){
        //todo check if has account;
        actions.unshift({
          account: this.getConfig[this.getActiveNetwork].token_contract,
          name: "open",
          data: {
            owner: this.getAccountName,
            symbol: "4,CRON",
            ram_payer: this.getAccountName
          }
        });
        
      }


      let res = await this.$store.dispatch("ual/transact", { actions: actions, disable_signing_overlay: true });
      if(res){
        setTimeout(()=>{this.$store.dispatch("user/fetchRewards", this.getAccountName)}, 1000);
      }
      this.is_withdrawing=false;
    }

  }
}
</script>
