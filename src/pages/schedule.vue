<template>
  <q-page padding class="overflow-hidden">
    <h5>Schedule</h5>
    <scheduler />
    <!-- content -->
    <q-input label="account" v-model="action.account" readonly/>
    <q-input label="action name" v-model="action.name" readonly/>
    <q-input label="gass fee" v-model="gas_fee"/>
    <q-input label="delay sec" v-model="delay_sec"/>
    <q-input label="expiration sec" v-model="expiration_sec"/>
    <q-input label="tag" v-model="job_tag"/>
    <q-input label="description" v-model="description"/>
    <q-btn label="schedule" @click="processAction" color="primary"/>


    <!-- <pre>{{action}}</pre> -->
    <div class="q-mt-md">
      <q-btn label="reload jobs" @click="getMyCronJobs" color="primary"/>
      <cronjobs-table :cronjobs="mycronjobs"/>
    </div>
    <!-- <pre>{{mycronjobs}}</pre> -->

  </q-page>
</template>

<script>

import {nameToValue} from '../imports/encode.js';
// we import all of `date`
import { date } from 'quasar';
// destructuring to keep only what is needed
const { addToDate } = date
//let newDate = addToDate(new Date(), { days: 7, month: 1 })

import { mapGetters } from "vuex";
import cronjobsTable from "components/cronjobs-table";
import deposits from "components/deposit/deposits";
import scheduler from "components/scheduler/scheduler";
export default {
  // name: 'PageName',
  components: {
    cronjobsTable,
    deposits,
    scheduler
  },
  data() {
    return {
      description:"",
      gas_fee:'0.0001 KASDAC',
      job_tag:'',
      expiration_date_time: '2019-11-04T21:12:10',
      due_date_time:'2019-11-04T21:12:00',
      delay_sec:"30",
      expiration_sec: "10",
      cron_contract: "piecestest12",
      mycronjobs:[],
      action:{
        account: "dacelections",
        name: "newperiode",
        authorization:[{actor:"execexecexec", permission:"active"}],
        data: {
          message:"hello",
          dac_id: "eos.dac"
        }
      }

    };
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName",
      getConfig: "app/getConfig",


    })
  },
  methods:{
    async processAction(){
      const contract = await this.$eos.getContract(this.action.account);
      // let serialized_data = this.$eos.Serialize.serializeActionData(contract, this.action.account, this.action.name, this.action.data);

      let serialized_action = this.$eos.Serialize.serializeAction(contract, this.action.account,this.action.name, this.action.authorization, this.action.data);
      // let action = JSON.parse(JSON.stringify(this.action));
      // action.data = serialized_data;


      // schedule the above action

      let actions = [
        {
          account: this.getConfig.cron_contract,
          name: "schedule",
          data: {
            owner: this.getAccountName,
            tag: this.job_tag,
            actions: [serialized_action],
            due_date: this.due_date_time,
            delay_sec: this.delay_sec,
            expiration: this.expiration_date_time,
            expiration_sec: this.expiration_sec,
            gas_fee: this.gas_fee,
            description: this.description
          }
        }
      ];
      let res =  await this.$store.dispatch("ual/transact", { actions: actions });
      if(res){
        this.getMyCronJobs();
        this.$store.dispatch('user/fetchDeposits', this.getAccountName);
      }
    },
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
