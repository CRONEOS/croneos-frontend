<template>
      <div  class="col-xs-12 col-sm-6 col-md-4 col-lg-3" >
        <div class="q-pa-sm bg-secondary">
            <div>{{ feetoken.balance}}</div>
            <div class="row justify-between">
              <!-- <div v-if="display_input">
                <q-input  v-model="amount_to_add" dense filled />
              </div> -->
              <q-btn  label="refund" color="primary" @click="withdraw" />
              <q-btn label="add" color="positive" @click="addBalance" />
            </div>
            
        </div>
      </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  // name: 'ComponentName',
  props:{
    feetoken:{
      type: Object,
      default: ()=>{return {}}
    }
  },

  data () {
    return {
      amount_to_add:'',
      display_input : false
    }
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName",
      getConfig: "app/getConfig"
    })
  },
  methods:{
    async addBalance(){
      let actions = [
        {
          account: this.feetoken.contract,
          name: "transfer",
          data: {
            to: this.getConfig.cron_contract,
            from: this.getAccountName,
            quantity: `1.0000 ${this.feetoken.sym}`,
            memo:""
          }
        }
      ];
      let res = await this.$store.dispatch("ual/transact", { actions: actions });
      if(res){
        this.callback();
      }
    },
    async withdraw(){
    
      let actions = [
        {
          account: this.getConfig.cron_contract,
          name: "refund",
          data: {
            amount: this.feetoken.balance,
            owner: this.getAccountName
          }
        }
      ];
      let res = await this.$store.dispatch("ual/transact", { actions: actions });
      if(res){
        this.callback();
      }
    },

    callback(){
      setTimeout(()=>{this.$store.dispatch('user/fetchDeposits',  this.getAccountName)}, 1000);
    }
  }
}
</script>
