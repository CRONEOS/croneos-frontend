<template>
<div class="text-white" style="min-height:200px">
  <div class="center-page-content">
  <div  class="  row q-col-gutter-md  ">

    <div :class="colsetup">
      <div class="q-pa-sm">
        
        <div class="text-h6 q-mb-md">
          <img  src="~assets/croneos-logo-white.svg" style="height:14px" class="cursor-pointer"/>
          <router-link to="/mine" tag="a" class="text-link text-caption" style="display:block">
            Start Mining
          </router-link>
          <router-link to="/schedule" tag="a" class="text-link text-caption" style="display:block">
            Schedule
          </router-link>
          <router-link to="/docs/getting-started" tag="a" class="text-link text-caption" style="display:block">
            Documentation
          </router-link>
          <router-link to="/gas-tokens" tag="a" class="text-link text-caption" style="display:block">
            Gas Tokens
          </router-link>
        </div>
      </div>
    </div>
    <div :class="colsetup">
      <div class="q-pa-sm">
        <div class="text-h6 text-weight-light q-mb-md">Sponsors & Partners</div>
        <img  src="statics/vectors/eosdac-rec-white.svg" style="height:36px" class="cursor-pointer" @click="openURL('https://eosdac.io')">
      </div>
    </div>
   
    <div :class="colsetup">
       
      <div class="q-pa-sm ">
          
          <div class="text-h6 text-weight-light q-mb-md ">Follow Us</div>
          <q-btn dense color="secondary" round  @click="openURL(getConfig.social.telegram)" class="q-mr-md">
            <q-tooltip content-class="bg-primary">Visit our Telegram</q-tooltip>
            <q-icon name="img:statics/vectors/social/001-telegram.svg" size="24px"/>
          </q-btn>
          <q-btn dense color="secondary" round  @click="openURL(getConfig.social.github)">
            <q-tooltip content-class="bg-primary">Visit our Github repos</q-tooltip>
            <q-icon name="img:statics/vectors/social/027-github.svg" size="24px"/>
          </q-btn>
      </div>
    </div>
  </div>
  
  <q-separator class="q-mt-lg"/>

  <div class="row justify-end q-my-sm">© CRONEOS 2019-{{new Date().getFullYear()}}</div>
  </div>
  

</div>
</template>

<script>
import { mapGetters } from "vuex";
import { openURL } from "quasar";
export default {
  // name: 'ComponentName',
  data() {
    return {
      colsetup: "col-xs-12 col-sm-6 col-md-4"
    };
  },
  computed: {
    ...mapGetters({
      getConfig: "app/getConfig"
    })
  },
  methods: {
    openURL
  }
};
</script>
