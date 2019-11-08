<template>
  <q-page padding>
    <!-- {{rewards}} -->
    <div  class="row q-col-gutter-lg text-white" >
      <reward-balance :reward="reward.adj_p_balance" v-for="(reward,i) in getRewards" :key="`reward${i}`"/>
    </div>

  </q-page>
</template>

<script>

import { mapGetters } from "vuex";
import rewardBalance from 'components/reward-balance';
export default {
  // name: 'PageName',
  components: {
    rewardBalance
  },
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName",
      getRewards: "user/getRewards"

    })
  },
  methods: {

  },

};
</script>

<style>
</style>
