export async function loggedInRoutine ({ dispatch }, payload) {

  dispatch('fetchRewards', payload.accountname);
  dispatch('fetchDeposits', payload.accountname);
  dispatch('fetchAccount', payload.accountname);
  dispatch('fetchCronBalance', payload.accountname);
  

}

export async function loggedOutRoutine ({ dispatch, commit }) {
  commit('setRewards', false);
  commit('setDeposits', []);
  commit('setAccount', false);
  commit('setCronBalance', false);
}


export async function fetchRewards ({ commit, rootState, rootGetters }, accountname) {
    //let account = rootGetters.getAccountName || 
    let res = await this._vm.$eos.rpc.get_table_rows({
        json: true,
        code: rootState.app.config[rootGetters["ual/getActiveNetwork"] ].cron_contract,
        scope: accountname,
        table: "rewards",
        limit: -1

      });
      if(res && res.rows.length){
        console.log(res);
        commit('setRewards', res.rows);
      }
}

export async function fetchAccount ({ commit, rootState, rootGetters }, accountname) {
  //let account = rootGetters.getAccountName ||
  if(!accountname) return;
  let res = await this._vm.$eos.rpc.get_account(accountname);
    if(res ){
      console.log(res);
      commit('setAccount', res);
    }
}

export async function fetchDeposits ({ commit, rootState, rootGetters }, accountname) {
  //let account = rootGetters.getAccountName || 
  let res = await this._vm.$eos.rpc.get_table_rows({
      json: true,
      code: rootState.app.config[rootGetters["ual/getActiveNetwork"]].cron_contract,
      scope: accountname,
      table: "deposits",
      limit: -1

    });
    if(res && res.rows){
      console.log('fetched deposits', res.rows);
      commit('setDeposits', res.rows);
    }
}

export async function fetchCronBalance ({ commit, rootState, rootGetters }, accountname) {
  //let account = rootGetters.getAccountName || 
  let res = await this._vm.$eos.rpc.get_table_rows({
      json: true,
      code: rootState.app.config[rootGetters["ual/getActiveNetwork"]].token_contract,
      scope: accountname,
      table: "accounts",
      limit: 1

    });
    if(res && res.rows.length){
      console.log('fetched cron balance ', res.rows);
      let bal = res.rows.find(b=> b.balance.includes("CRON") );
      if(bal){
        commit('setCronBalance', bal.balance);
      }
      
    }
}

