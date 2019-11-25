<template>
  <q-page padding class="bg-white constrain-page-width">
    <!-- content -->
    <h5>Mining bot</h5>
    <p>We care about the execution time of the scheduled jobs and we care about you receiving high rewards. Bots that automate the execution of the jobs can be of great help here. Hence we encourage the community to develop various tools to mine gas fees and CRON.</p>
    <p>To get you started we've created a nodejs mining bot which can be found in our <a href="https://github.com/CRONEOS/croneos-miner" class="text-link" target="_blank">Github repos</a>.</p>
 
    <!-- <code-block :code="code" :copy="false" style="max-width:800px"/> -->

    <h6>The Ultimate Mining Bot</h6>
    <p>The ultimate croneos mining bot would be a nodeos plugin that reacts to table deltas on the croneos contract. The state history plugin would be a good candidate as a base to build such a bot.</p>

    <h6>Some Ideas...</h6>
    <p>Raspberry pi python lib that listen to a stream of table deltas from the croneos contract.</p>
    <p>Automated mining in the Browser via service worker.</p>
    <p>croneos cloud mining (firebase cloud functions/cron).</p>
    <i>If you want to join the project please contact via Telegram.</i>

  </q-page>
</template>

<script>
import codeBlock from 'components/code-block';
export default {
  // name: 'PageName',
  components:{
    codeBlock
  },
  data() {
    return {
    };
  },
}
</script>

<style>
</style>
