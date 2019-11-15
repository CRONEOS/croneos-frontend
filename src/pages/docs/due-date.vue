<template>
  <q-page padding class="constrain-page-width bg-white text-black" style="padding-bottom:300px">

    <!-- content -->
    <h5 class="row justify-between items-center">Due Date</h5>

    <p>The croneos contract (and the miners) need to know when your scheduled job must be executed. Setting the due date for your cronjob can be done in 2 ways.</p>

    <h6>Delay in seconds</h6>
    <p>You can set the execution time of your job relative to the blocktime on which your job is received by the contract. This can be done with the delay_sec property of the croneos::job struct.</p>
    <code-block :code="delay_sec" :copy="false" style="max-width:800px"/>
    
    <div class="info-box">The job will be ready for execution by a miner after delay_sec has past from the block on which the job is received. The croneos contract will assert if the delay isn't met.</div>


    <h6>Fixed timepoint</h6>
    <p>You also can set the execution time of your job to a fixed timepoint in the future.</p>
    <code-block :code="fixed_time" :copy="false" style="max-width:800px"/>
    
    <div class="warning-box">Chose between delay_sec or due_date. When you set both the contract will prioritize delay_sec and ignore the fixed timepoint.</div>
   

  </q-page>
</template>

<script>
import {openURL} from 'quasar';
import codeBlock from 'components/code-block';
import { mapGetters } from "vuex";
export default {
  // name: 'PageName',
  components:{
    codeBlock
  },
  data() {
    return {
      delay_sec:`croneos::job mycronjob;
mycronjob.delay_sec = 60*5; // (uint32_t) 5 min`,
      fixed_time:`croneos::job mycronjob;
// eosio::time_point_sec
mycronjob.due_date = time_point_sec(current_time_point().sec_since_epoch() + 60);`,
    };
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName",
      getConfig:"app/getConfig"
    })
  },
  methods: {
    openURL,
    async fetchCodeSnippet(url){
      let res = await this.$axios.get(url);
      console.log(res)
      return await res.data;
    }
    
  },

}
</script>

<style>
</style>

