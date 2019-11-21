<template>
  <q-page padding class="">
    <h5>Mining Rewards</h5>
    <div  class="row q-col-gutter-lg text-white" >
      <reward-balance :reward="reward.adj_p_balance" v-for="(reward,i) in getRewards" :key="`reward${i}`" class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"/>
    </div>
    <div class="q-mt-md">My CPU {{JSON.stringify(getCPUStats)}}</div>


    <h5>Scheduled Jobs</h5>
    <p>This page shows all mineable cronjobs. You can mine manual from this page but it will probably not work when more miners (bots) enter the croneos platform. In fact bots are an essential part for on time execution. Anyone can start a miner, enjoy while the competition (mining difficulty) is low. Learn more about bot mining here (link)</p>
    <transition-group
      v-if="getCronjobs.length"
      enter-active-class="animated fadeIn"
      leave-active-class="animated zoomOut"
      class="row q-col-gutter-md overflow-hidden"
      tag="div"
    >
      <cronjob
        v-for="(cronjob, i) in getCronjobs"
        :key="cronjob.id"
        :cronjob="cronjob"
        @executed="removeExecutedJob(i)"
      />
    </transition-group>
    <div v-else> No jobs</div>
    <q-btn label="dev reload" color="primary" @click="$store.dispatch('cronjobs/fetchCronjobs');" class="q-mt-md"/>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import cronjob from "components/cronjob/cronjob";
import rewardBalance from 'components/reward/reward-balance';
export default {
  // name: 'PageName',
  components: {
    cronjob,
    rewardBalance
  },
  data() {
    return {
      CLOCK_TIMER: null

    };
  },
  computed: {
    ...mapGetters({
      getCLOCK: "app/getCLOCK",
      getCronjobs: "cronjobs/getCronjobs",
      getRewards: "user/getRewards",
      getCPUStats: "user/getCPUStats"
    })
  },
  methods: {

    removeExecutedJob(e) {
      console.log("job at array position", e, "executed");
      // this.cronjobs.splice(e, 1);
      this.$store.commit('cronjobs/removeCronjobByIndex', e);
    }
  },
  mounted(){
    this.$store.dispatch('cronjobs/fetchCronjobs');
    if(!this.CLOCK_TIMER || !this.getCLOCK){
      this.$store.commit("app/setCLOCK", new Date().getTime());
      this.CLOCK_TIMER = setInterval(() => {
          this.$store.commit("app/setCLOCK", new Date().getTime());
      }, 1000);
    }
  },
  beforeDestroy(){
    clearInterval( this.CLOCK_TIMER );
    this.CLOCK_TIMER = null;
  },
};
</script>

<style>
</style>
