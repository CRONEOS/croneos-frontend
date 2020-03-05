<template>
  <div v-if="getAllowedFeeTokensSym.length" class="row items-center">
    <!-- {{getAllowedFeeTokensSym}} -->
    <div v-for="token in getAllowedFeeTokensSym" :key="token.sym" class="column items-center q-mr-lg">
        <q-img :src="token.logo" contain style="height:45px; width:45px" />
        <div class="text-weight-light">{{token.sym}}</div>
        <q-tooltip content-class="bg-primary" :delay="500">
          <div>contract: {{token.contract}}</div>
          <div>precision: {{token.precision}}</div>
        </q-tooltip>
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
