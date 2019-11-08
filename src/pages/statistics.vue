<template>
  <q-page padding>
    <!-- content -->
    <span>show mining stats for account </span>
    {{$route.params.accountname}}
    <div>
        <router-link to="/rewards" tag="a" class="row items-center">
          More info about reward model
        </router-link>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  // name: 'PageName',
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName"
    })
  },
}
</script>

<style>
</style>
