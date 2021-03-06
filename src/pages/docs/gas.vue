<template>
  <q-page padding class="constrain-page-width bg-white text-black" style="padding-bottom:300px">

    <!-- content -->
    <h5 class="row justify-between items-center">
      Gas Fees
    </h5>
    <p>When you schedule an action you have the option to set a gas fee. This gas is used to compensate the executer/miner of your job. Gas is completely optional but it will incentivize miners to execute your job on time. Check <router-link to="/gas-tokens" tag="a" class="text-link inline-block" style="display:block">here</router-link> which tokens are allowed for gas.</p>

    <h6>Schedule without gas</h6>
    <p>Just omit the gas_fee parameter when you configure the croneos::job struct. Alternatively you can set the asset amount to be zero. Mind that in the latter case the symbol must be from a valid gas token.</p>
    <code-block :code="no_gas" :copy="false" style="max-width:800px"/>
    
    <h6>Paying for gas</h6>
    <p>If your job is configured with a gas_fee greater than zero then the croneos contract will try to substract the set amount from your deposits. You can deposit gas upfront or pay gas as you go.</p>
    <p>Auto pay gas via the croneos::job struct.</p>
    <code-block :code="pay_gas" :copy="false" style="max-width:800px"/>

    <div class="warning-box q-mb-md">If you set a gas fee and you don't have enough funds in your deposits and you have disabled auto_pay_gas (default) the croneos contract will assert.</div>

    <p>You can pay upfront by transfering a valid gas token to the contract "{{getConfig.cron_contract}}" with memo "deposit". It's also possible to top up the gas deposits for an other account. Also you can use the <router-link to="/schedule" tag="a" class="text-link inline-block" style="display:block">UI</router-link> to add and/or withdraw your deposits.</p>
    <code-block :code="`//transfer memo \ndeposit\ndeposit:accountname //no spaces before/after :`" :copy="false" style="max-width:800px"/>

    <div class="info-box q-mb-md">Funds from your gas deposits can be withdrawn at any time. Gas from cancelled and/or expired jobs will be refunded to your deposits.</div>

    <!-- <h5>Schedule an Action</h5>
    <p>Full example to schedule an action making use of the croneos::job struct. This an example of a recursive pattern.</p>
    <code-block :code="`https://raw.githubusercontent.com/CRONEOS/croneos-examples/master/snippets/full_example.cpp`" style="max-width:800px"/>

    <h5>More Examples</h5>
    <p>Coming soon.</p> -->
   
  </q-page>
</template>

<script>
import {openURL} from 'quasar';
import codeBlock from 'components/code-block';
import { mapGetters } from "vuex";
export default {
  // name: 'PageName',
  components:{
    codeBlock
  },
  data() {
    return {
      no_gas: `//You also can omit the gas_fee setting.
croneos::job mycronjob;
mycronjob.gas_fee = asset(0, symbol(symbol_code("EOS"), 4));`,

      pay_gas: `croneos::job mycronjob;
mycronjob.gas_fee = asset(1000, symbol(symbol_code("EOS"), 4)) //0.0001 EOS;
mycronjob.auto_pay_gas = true; //default is false`
    };
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName",
      getConfig:"app/getConfig"
    })
  },
  methods: {
    openURL,
    async fetchCodeSnippet(url){
      let res = await this.$axios.get(url);
      console.log(res)
      return await res.data;
    }
    
  },

}
</script>

<style>
</style>
