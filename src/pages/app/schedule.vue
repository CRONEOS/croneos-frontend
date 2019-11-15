<template>
  <q-page padding class="overflow-hidden">
    <h5>Gas Deposits</h5>
    <deposits />
    <h5>My Scheduled Jobs</h5>

    <div class="q-mt-md">
      
      <cronjobs-table :cronjobs="mycronjobs"/>
      <q-btn label="dev reload" @click="getMyCronJobs" color="primary"/>
    </div>


    <scheduler class="q-mt-xl" @scheduled="getMyCronJobs"/>


  </q-page>
</template>

<script>

import { mapGetters } from "vuex";
import deposits from "components/deposit/deposits";
import cronjobsTable from "components/cronjobs-table";
import scheduler from "components/scheduler/scheduler";
export default {
  // name: 'PageName',
  components: {
    cronjobsTable,
    scheduler,
    deposits
  },
  data() {
    return {
      cron_contract: "piecestest12",
      mycronjobs:[],
    };
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName",
      getConfig: "app/getConfig",


    })
  },
  methods:{
 
    async getMyCronJobs(){
      let res  = await this.$eos.rpc.get_table_rows({
        json: true,
        code: this.cron_contract,
        scope: this.cron_contract,
        table: "cronjobs",
        
        // table_key : '',
        // lower_bound : nameToValue(this.getAccountName).toString() ,
        // upper_bound : nameToValue(this.getAccountName).toString(),
        lower_bound : this.getAccountName,
        upper_bound : this.getAccountName,
        index_position : 2,
        key_type : 'i64',
        reverse : true,
        // show_payer : false,
     });
     console.log(res)
     this.mycronjobs = res.rows.map(mcj => {mcj.__index=null; return mcj})
    },

    updateProxy () {
      this.proxyDate = this.expiration_date
    },

    save () {
      this.expiration_date = this.proxyDate
    }


  },
watch: {
  getAccountName: {
    immediate: true,
    handler(newVal, oldVal) {
      if(this.getAccountName){this.getMyCronJobs();}
      
    },
  },
},
}
</script>

<style>
</style>
