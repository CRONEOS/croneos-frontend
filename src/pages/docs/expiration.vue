<template>
  <q-page padding class="constrain-page-width bg-white text-black" style="padding-bottom:300px">

    <!-- content -->
    <h5 class="row justify-between items-center">Expiration</h5>
    <!-- <p>A job must have an expiration.</p> -->
    <!-- <code-block :code="`#include <croneos.hpp>`" :copy="false" style="max-width:800px"/> -->

    <div class="warning-box">I'm still deciding if I want the expiration to be configurable. This option might disapear so that all jobs have a fixed expiration.</div>


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

