<template>
      <div  class="bg-red" >
zzzzz
      </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  // name: 'ComponentName',
  props:{

  },

  data () {
    return {

    }
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName",
      getConfig: "app/getConfig"
    })
  },
  methods:{
    async addBalance(){

    },
    async withdraw(){

      
    },

    callback(){

    }
  }
}
</script>
