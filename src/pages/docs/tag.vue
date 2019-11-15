<template>
  <q-page padding class="constrain-page-width bg-white text-black" style="padding-bottom:300px">

    <!-- content -->
    <h5 class="row justify-between items-center">Tag</h5>
    <p>The tag property of the croneos::job struct is an optional eosio::name to identify your jobs. You can only have one active job with the same name at a given time. The tag name is very useful to retrieve existing jobs from the pool. See index of the cronjobs table.</p>
    <code-block :code="tag_code" :copy="false" style="max-width:800px"/>

    <div class="warning-box">When you add a job with a duplicate name the contract will assert if the job is executable. If the existing job is expired it'll be replaced by the new received job with the same tag.</div>

    <div class="info-box q-mt-md">A tag is optional. You can omit this property while configuring your croneos::job instance.</div>

    <p>todo: example of how to retrieve jobs with tag</p>


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
      tag_code:`croneos::job mycronjob;
mycronjob.tag = name("mytag"); // (eosio::name)`,
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

