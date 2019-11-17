<template>
  <q-page padding class="constrain-page-width bg-white text-black" style="padding-bottom:300px">

    <!-- content -->
    <h5 class="row justify-between items-center">Schedule Function</h5>
    <p>Once you have assigned values to the croneos::job struct you can schedule an action. The syntax is very similar to normal inline transactions.</p>
    <code-block :code="schedule_code" :copy="false" style="max-width:800px"/>

    <!-- <div class="info-box q-mt-md">A tag is optional. You can omit this property while configuring your croneos::job instance.</div> -->

    <h6>Blacklist</h6>
    <p>Some contracts are blacklisted. This means you can't schedule actions from them. (list blacklist).</p>


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
      schedule_code:`croneos::job mycronjob;
// due_date, expiration, gas, tag, description
mycronjob.schedule(
    name("yourcontract"), //contract that holds the to be scheduled action
    name("schedule"), //its action name
    make_tuple(delay_sec, expiration_sec,  tag ), //the action data
    permission_level{get_self(), "active"_n} //authorization for scheduling
);`,
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

