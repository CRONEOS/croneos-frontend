<template>
      <div  class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2" >
        <div class="q-pa-sm bg-secondary relative-position rounded-borders shadow-3">
            <div class="text-h6 q-mb-md">{{ feetoken.balance}}</div>

            <div class="row justify-between">
              <q-btn  :disabled="getIsTransacting" label="refund" color="primary" @click="withdraw" />
              <q-btn :disabled="getIsTransacting" label="add" color="positive" @click="is_adding_balance=true" />
            </div>
            <transition enter-active-class="animated fadeIn"  mode="out-in">
              <div v-if="is_adding_balance && !getIsTransacting" class="row justify-between items-center absolute-bottom bg-secondary q-ma-sm" >
                <q-input autofocus type="number" dense  filled v-model="amount_to_add"  style="height:35px; width:120px" class="bg-white">
                    <template v-slot:append>
                      <q-icon name="close" color="negative" @click="is_adding_balance=false " class="cursor-pointer" style="margin-right:-5px"/>
                    </template>
                </q-input>
                <q-btn label="ok" color="positive" @click="addBalance " />
              </div>

              <div v-if="getIsTransacting && is_adding_balance" class="row justify-between items-center absolute-bottom bg-secondary q-ma-sm" >
                <div>
                  <q-spinner color="primary"/>
                  <span class="q-ml-sm">waiting</span>
                </div>
                <q-btn label="ok" color="positive" @click="addBalance " />
              </div>

            </transition>
            
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
      is_adding_balance: false,
      amount_to_add:null,
      display_input : false
    }
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName",
      getConfig: "app/getConfig",
      getIsTransacting: "ual/getIsTransacting",
      getActiveNetwork: "ual/getActiveNetwork",
    })
  },
  methods:{
    async addBalance(){
      if(parseFloat(this.amount_to_add) <= 0 || this.amount_to_add==null) return;
      
      
      let actions = [
        {
          account: this.feetoken.contract,
          name: "transfer",
          data: {
            to: this.getConfig[this.getActiveNetwork].cron_contract,
            from: this.getAccountName,
            quantity: `${Number(this.amount_to_add).toFixed(this.feetoken.precision) } ${this.feetoken.sym}`,
            memo:"deposit gas"
          }
        }
      ];
      this.amount_to_add=null;
      let res = await this.$store.dispatch("ual/transact", { actions: actions, disable_signing_overlay: true });
      this.is_adding_balance=false;
      if(res){
        this.callback();
      }
    },
    async withdraw(){
    
      let actions = [
        {
          account: this.getConfig[this.getActiveNetwork].cron_contract,
          name: "refund",
          data: {
            amount: this.feetoken.balance,
            owner: this.getAccountName
          }
        }
      ];
      let res = await this.$store.dispatch("ual/transact", { actions: actions, disable_signing_overlay: true });
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
