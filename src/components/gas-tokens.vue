<template>
  <div v-if="getAllowedFeeTokensSym.length" class="row items-center">

    <div v-for="token in getAllowedFeeTokensSym" :key="token.sym" class="column items-center on-left">
        <img :src="token.logo" height="30px" />
        <div>{{token.sym}}</div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  // name: 'PageName',
  computed: {
    ...mapGetters({
      getAllowedFeeTokensSym: "app/getAllowedFeeTokensSym"
    })
  }
};
</script>
