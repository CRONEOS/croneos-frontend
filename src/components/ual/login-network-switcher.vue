<template>
  <div>
    <q-btn-dropdown
      split
      flat 
      color="white"
      dark
      @click="handleLoginClick"
      :loading="getShouldRenderLoginModal"
    >

      <template v-slot:label>
        <div class="row items-center justify-between no-wrap">
          <q-btn flat  class="bg-secondary q-mr-sm networkbuttonhover" round :icon="`img:statics/images/networks/${getActiveNetwork}.png`" size="sm">
            <q-tooltip content-class="bg-secondary">
              <div v-if="getAccountName">
                {{`You are connected to ${getActiveNetwork} with ${getSESSION.authenticatorName}`}}
              </div>
              <div v-else>
                {{`Connect to ${getActiveNetwork}`}}
              </div>
            </q-tooltip>
          </q-btn>
          <div class="text-center">{{getAccountName ? getAccountName : 'login'}}</div>
        </div>
      </template>


      <q-list dark class="bg-secondary" separator >

        <q-item v-if="getAccountName" clickable v-close-popup @click="$store.dispatch('ual/logout')" class="bg-primary">
          <q-item-section avatar>
            <q-icon name="ion-log-out" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Logout </q-item-label>
            <q-item-label caption>network {{getActiveNetwork}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="handleNetworkClick(network.key)" v-for="network in networks" :key="network.label">
          <q-item-section avatar>
            <q-icon :name="network.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{network.label}}</q-item-label>
          </q-item-section>
          <!-- <q-item-section side>
            <q-icon name="info" color="amber" />
          </q-item-section>-->
        </q-item>
      </q-list>
    </q-btn-dropdown>
    
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  // name: 'ComponentName',
  data() {
    return {
      selected_network: null,
      networks: [
        {
          label: "Jungle",
          key: "jungle",
          icon: "img:statics/images/networks/jungle.png"
        },
        {
          label: "Mainnet",
          key: "mainnet",
          icon: "img:statics/images/networks/mainnet.png"
        },
        {
          label: "Kylin",
          key:"kylin",
          icon: "img:statics/images/networks/kylin.png"
        },

      ]
    };
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName",
      getShouldRenderLoginModal: "ual/getShouldRenderLoginModal",
      getActiveNetwork: "ual/getActiveNetwork",
      getSESSION: "ual/getSESSION",
    })
  },
  methods:{
    handleLoginClick(){
      if(!!!this.getAccountName){
        this.$store.dispatch('ual/renderLoginModal')
      }
      
    },
    async handleNetworkClick(network_key){
      if(!!this.getAccountName){
        await this.$store.dispatch('ual/logout');
      };
      this.$store.commit("ual/setActiveNetwork", network_key);
      await this.$store.dispatch("ual/initUAL");
      this.$store.dispatch('ual/renderLoginModal');
    }
  },
};
</script>

<style>

.networkbuttonhover:hover {
  background-color: black!important;
}
  
</style>
