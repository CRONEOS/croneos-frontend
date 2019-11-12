<template>
  <q-page padding>
    <!-- content -->
    <div style class="center-page-content">
      <h5>Gas Tokens</h5>
      <div class="row">
        <div v-for="token in getAllowedFeeTokens" class="q-mr-sm" :key="token.sym" > {{token.sym}}</div>
      </div>
      <p>We are not listing new tokens for being used as gas at this stage.</p>

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
import { mapGetters } from "vuex";
export default {
  // name: 'PageName',
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName",
      getAllowedFeeTokens: "app/getAllowedFeeTokens"
    })
  },
};
</script>
