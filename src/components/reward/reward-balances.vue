<template>
<div>
      <q-list :dark="dark" v-if="getRewards && getAccountName" >
        <q-item-label header>MINING REWARDS ({{getRewards.length}})</q-item-label>
        <q-scroll-area :visible="true" :thumb-style="thumbStyle" style="height: 106px; width:100%">
          <reward-balance :reward="reward.adj_p_balance" v-for="(reward,i) in getRewards" :key="`reward${i}`" />
        </q-scroll-area>
      </q-list>
    
    <q-list :dark="dark"  dense v-else>
      <q-item-label header>MINING REWARDS</q-item-label>
      <q-item>
        <q-item-section>
          <q-item-label v-if="!getAccountName" caption>Please log in</q-item-label>
          <q-item-label v-else caption>No rewards</q-item-label>
        </q-item-section>   
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import rewardBalance from 'components/reward/reward-balance';
export default {
  // name: 'ComponentName',
  props:{
    dark:false
  },
  components:{
    rewardBalance
  },
  computed: {
    ...mapGetters({
      getRewards: "user/getRewards",
      getAccountName: "ual/getAccountName"

    })
  },
  data () {
    return {
      thumbStyle: {
        right: "0px",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "5px",
        opacity: 0.75
      }
    }
  }
}
</script>
