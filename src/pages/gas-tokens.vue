<template>
  <q-page padding>
    <!-- content -->
    <div style class="center-page-content">
      <h5>Gas Tokens</h5>
      <gas-tokens />

      <p>We are not listing new gas tokens at this stage.</p>

      <div class="q-mt-xl">Pay gas in your native token</div>
      <div>Add utility to token</div>
      <div class="q-mt-md">
        <q-btn label="apply" :disabled="true" color="primary" />
        <q-btn label="go back" flat color="primary" to="/" />
      </div>
      
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
