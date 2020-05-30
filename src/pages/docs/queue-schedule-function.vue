<template>
  <q-page padding class="constrain-page-width bg-white text-black" style="padding-bottom:300px">

    <!-- content -->
    <h5 class="row justify-between items-center">Schedule Function</h5>
    <p>When you enabled the queue in the croneos header file there will be a queue table added to your contract. This table can be populated with the queue::schedule method. The croneosqueue table will hold your scheduled actions. </p>
    <code-block :code="schedule_code" :copy="false" style="max-width:800px"/>

    <p>The scheduled actions will be executed by the miners. To enable this you need to expose a "tick" action in your contract. Miners will call this tick action to execute the jobs in the queue. The tick action can be called by anyone, so it's not limited to croneos miners.</p>
    <code-block :code="tick_action" :copy="false" style="max-width:800px"/>

    <!-- <div class="info-box q-mt-md">A tag is optional. You can omit this property while configuring your croneos::job instance.</div> -->


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
      schedule_code:`
croneos::queue myqueue(get_self());

myqueue.schedule(
  //action to be scheduled (can be anything)
  action(
    permission_level{get_self(), "active"_n},
    name("eosio.token"), name("transfer"),
    make_tuple(get_self(), "piecesnbitss", "0.1000 EOS", string("Test queued transfer."))
  ),
  //optional tag to identify the scheduled action in the queue
  name("dummytag"),
  //gas fee
  extended_asset(asset(1, symbol(symbol_code("EOS"), 4) ), name("eosio.token") ),
  delay_sec, //delay_sec
  expiration_sec //expiration_sec
);`,

  tick_action:`
ACTION yourcontract::tick(){
  croneos::queue myqueue(get_self());
  myqueue.exec();
}`
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

