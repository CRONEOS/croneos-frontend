<template>
  <q-page padding class="constrain-page-width bg-white text-black">

    <!-- content -->
    <h5 class="row justify-between items-center">
      Getting Started with Croneos
      <q-btn flat color="secondary" round  @click="openURL(getConfig.social.github)" >
        <q-tooltip content-class="bg-primary">Visit our Github repos</q-tooltip>
        <q-icon name="img:statics/vectors/social/027-github.svg" size="36px"/>
      </q-btn>
    </h5>


    <p>For using CRONEOS in your smart contracts you first need to include the croneos api header file. Head over to our github repo to get the latest. CRONEOS is still in develpment, the api schema  may change but we'll do our best to make future updates backwards compatible.</p>
    <code-block :code="`#include <croneos.hpp>`" :copy="false" style="max-width:800px"/>
    
    <div >dddd</div>
    ccccccccccccccccccccccc

    <h5>Schedule an Action</h5>
    <p>Full example to schedule an action making use of the croneos::job struct. This an example of a recursive pattern.</p>
    <code-block :code="`https://raw.githubusercontent.com/CRONEOS/croneos-examples/master/snippets/full_example.cpp`" style="max-width:800px"/>

    <h5>More Examples</h5>
    <p>Coming soon.</p>
   

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
