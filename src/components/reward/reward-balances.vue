<template>
<div>
    <q-list :dark="dark" v-if="getRewards && getRewards.length">
      <q-item-label header>MINING REWARDS</q-item-label>
      <reward-balance :reward="reward.adj_p_balance" v-for="(reward,i) in getRewards" :key="`reward${i}`" />
    </q-list>
    <q-list :dark="dark" v-else>
      <q-item-label header>MINING REWARDS</q-item-label>
      <q-item>
        <q-item-section>
          <q-item-label caption>Please log in</q-item-label>
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
      getRewards: "user/getRewards"

    })
  },
  data () {
    return {}
  }
}
</script>
