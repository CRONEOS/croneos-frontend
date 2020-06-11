export async function initRoutine ({ dispatch }) {

    dispatch('fetchSettings');
    dispatch('fetchAllowedFeeTokens');
    dispatch('fetchCronjobsByScope');
    dispatch('fetchTrustedDapps');

    
}

export async function fetchSettings ({ state, rootGetters, commit }) {
    let res = await this._vm.$eos.rpc.get_table_rows({
        json: true,
        code: state.config[rootGetters["ual/getActiveNetwork"] ].cron_contract,
        scope: state.config[rootGetters["ual/getActiveNetwork"] ].cron_contract,
        table: "settings",
        limit: 1
      });
      if(res && res.rows.length){
        console.log('fetched settings',res.rows[0]);

        res = res.rows[0];

        commit('setSettings', res);
      }
      else{
          console.log('fetching settings failed');
      }
}

export async function fetchAllowedFeeTokens ({ state, rootGetters, commit }) {

  let res = await this._vm.$eos.rpc.get_table_rows({
      json: true,
      code: state.config[rootGetters["ual/getActiveNetwork"] ].cron_contract,
      scope: state.config[rootGetters["ual/getActiveNetwork"] ].cron_contract,
      table: "gastokens",
      limit: -1
    });
    if(res && res.rows.length){
      console.log('fetched gastokens',res.rows);

      res = res.rows;

      res = res.map(aft =>{
        aft = aft.token; //we don't need the token key;
        let[amount, sym] = aft.quantity.split(' ');
        aft.sym = sym;
        aft.precision = amount.includes('.') ? amount.split('.')[1].length : 0;
        return aft;
      })

      commit('setAllowedFeeTokens', res);
    }
    else{
        console.log('fetching gastokens failed');
    }
}

export async function fetchCronjobsByScope ({ state, commit, rootGetters }) {

  let res = await this._vm.$eos.rpc.get_table_by_scope({
      json: true,
      code: state.config[rootGetters["ual/getActiveNetwork"] ].cron_contract,
      table: 'cronjobs',
      limit: -1
    });
    if(res && res.rows.length){
      console.log('fetched cronjobs by scope',res);
      commit('setCronjobsTableScopes', res.rows);
    }
    else{
        console.log('fetching cronjobs by scope failed');
    }
}

export async function fetchContractState ({ state, commit, rootGetters }) {

  let res = await this._vm.$eos.rpc.get_table_rows({
      json: true,
      code: state.config[rootGetters["ual/getActiveNetwork"] ].cron_contract,
      scope: state.config[rootGetters["ual/getActiveNetwork"] ].cron_contract,
      table: "state",
      limit: 1
    });
    if(res && res.rows.length){
      console.log('fetched contract state',res);
      commit('setContractState', res.rows[0]);
    }
    else{
        console.log('fetching contract state failed');
    }
}

export async function fetchTrustedDapps ({ state, commit, rootGetters }) {

  let res = await this._vm.$eos.rpc.get_table_rows({
      json: true,
      code: state.config[rootGetters["ual/getActiveNetwork"] ].cron_contract,
      scope: state.config[rootGetters["ual/getActiveNetwork"] ].cron_contract,
      table: "trusteddapps",
      limit: -1
    });
    if(res && res.rows.length){
      console.log('fetched trusteddapps',res.rows);
      commit('setTrustedDapps', res.rows);
    }
    else{
        console.log('fetching trusteddapps failed');
    }
}

