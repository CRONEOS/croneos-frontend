<template>
      <div  class="bg-red" >
        <h5>test dev</h5>
    <q-input label="account" v-model="action.account" readonly/>
    <q-input label="action name" v-model="action.name" readonly/>
    <q-input label="gas fee" v-model="gas_fee"/>
    <q-input label="delay sec" v-model="delay_sec"/>
    <q-input label="expiration sec" v-model="expiration_sec"/>
    <q-input label="tag" v-model="job_tag"/>
    <q-input label="scope" v-model="scope" />
    <q-input label="description" v-model="description"/>
    <q-btn label="schedule" @click="processAction" color="primary"/>
      </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  // name: 'ComponentName',
  props:{

  },

  data() {
    return {
      description:"",
      scope: "",
      gas_fee:'0.0001 EOS',
      job_tag:'',
      expiration_date_time: '1970-01-01T00:00:00', //1970-01-01T00:00:00 UTC
      due_date_time:'1970-01-01T00:00:00',
      delay_sec:"30",
      expiration_sec: "10",
      cron_contract: "",
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
      getActiveNetwork: "ual/getActiveNetwork"
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
          account: this.getConfig[this.getActiveNetwork].cron_contract,
          name: "schedule",
          data: {
            owner: this.getAccountName,
            scope: this.scope,
            tag: this.job_tag,
            auth_bouncer: "",
            actions: [serialized_action],
            due_date: this.due_date_time,
            delay_sec: this.delay_sec,
            expiration: this.expiration_date_time,
            expiration_sec: this.expiration_sec,
            gas_fee: this.gas_fee,
            description: this.description,
            oracle_srcs: []
          }
        }
      ];
      let res =  await this.$store.dispatch("ual/transact", { actions: actions });
      if(res){
        // this.getMyCronJobs();
        this.$emit('scheduled');
        this.$store.dispatch('user/fetchDeposits', this.getAccountName);
      }
    },


    updateProxy () {
      this.proxyDate = this.expiration_date
    },

    save () {
      this.expiration_date = this.proxyDate
    }


  },
}
</script>
