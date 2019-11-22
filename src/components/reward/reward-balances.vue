<template>
    <q-list :dark="dark" >
      <q-item-label header>MINING REWARDS</q-item-label>
      <reward-balance :reward="reward.adj_p_balance" v-for="(reward,i) in getRewards" :key="`reward${i}`" />
    </q-list>
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
    })
  },
  data () {
    return {}
  }
}
</script>
