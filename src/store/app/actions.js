export async function initRoutine ({ dispatch }) {

    dispatch('fetchSettings');
}

export async function fetchSettings ({ state, commit }) {
    let res = await this._vm.$eos.rpc.get_table_rows({
        json: true,
        code: state.config.cron_contract,
        scope: state.config.cron_contract,
        table: "settings",
        limit: 1
      });
      if(res && res.rows.length){
        console.log('fetched settings',res.rows[0]);

        res = res.rows[0];

        res.allowed_fee_tokens = res.allowed_fee_tokens.map(aft =>{
          let[am, sym] = aft.quantity.split(' ');
          aft.sym = sym;
          aft.precision = am.includes('.') ? am.split('.')[1].length : 0;
          return aft;
        })

        commit('setSettings', res);
      }
      else{
          console.log('fetching settings failed');
      }


}
