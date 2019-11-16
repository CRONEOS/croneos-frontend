<template>
  <q-page padding class="bg-white constrain-page-width">
    <!-- content -->
    <h5>Mining bots</h5>
    <p>We care about the execution time of our scheduled jobs and we care about you receiving high rewards. Bots that automate the execution of the scheduled jobs can be of great help here. Hence we encourage the community to develop various tools to mine gas fees and CRON.</p>
    very basic JS example
    <code-block :code="code" :copy="false" style="max-width:800px"/>

    <h5>The Ultimate Mining Bot</h5>
    <p>The ultimate croneos mining bot would be a nodeos plugin that reacts to table deltas on the croneos contract. The state history plugin would be a good candidate as a base to build such a bot.</p>

    <h5>Some Ideas...</h5>
    <p>Raspberry pi python lib that listen to a stream of table deltas from the croneos contract.</p>
    <p>Automated mining in the Browser via service worker.</p>
    <p>croneos cloud mining (firebase cloud functions/cron).</p>
    <i>If you want to join the project please contact via github.</i>

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
      code: `function scheduleExecution(job_id, due_date){
  const due_date = Date.parse(due_date + ".000+00:00"); //utc ms
  const now = new Date().getTime(); //(better use chain time)
  if(due_date >= now){
    //store the timer & job_id in a map to clear the timer when table delta received before execution
    return setTimeout(()=>{execute_cron_job_by_id(job_id)}, due_date-now);
  }
}`
    };
  },
}
</script>

<style>
</style>
