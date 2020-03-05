<template>
  <q-page padding>
    <!-- content -->
    <div style class="center-page-content">
      <h5>Gas Tokens</h5>
      <gas-tokens />

      <p class="text-italic">We are not listing new gas tokens at this stage.</p>


      <div class="q-mt-md">
        <q-btn label="apply" :disabled="true" color="primary" />
        <q-btn label="go back" flat color="primary" @click="$router.go(-1)" />
      </div>
      <div style="height:200px"></div>
    </div>
  </q-page>
</template>

<script>
// import { mapGetters } from "vuex";
import gasTokens from 'components/gas-tokens'
export default {
  // name: 'PageName',
  components:{
    gasTokens
  },
  // computed: {
  //   ...mapGetters({
  //     getAccountName: "ual/getAccountName",
  //     getAllowedFeeTokens: "app/getAllowedFeeTokens"
  //   })
  // },
};
</script>
