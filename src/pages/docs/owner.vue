<template>
  <q-page padding class="constrain-page-width bg-white text-black" style="padding-bottom:300px">

    <!-- content -->
    <h5 class="row justify-between items-center">Owner</h5>
    <p>The owner property of the croneos::job struct is a required eosio::name that will pay for the RAM to temporary store the job in the croneos cronjobs table. Only the owner account is authorized to cancel the job. Typically the owner of the job will be the contract that initiates the scheduled job.</p>
    <code-block :code="owner_code" :copy="false" style="max-width:800px"/>

    <div class="info-box q-mt-md">RAM used to store the scheduled job will be released after the job is executed or cancelled.</div>


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
      owner_code:`croneos::job mycronjob;
mycronjob.owner = get_self(); // (eosio::name)`,
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

