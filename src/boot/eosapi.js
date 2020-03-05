import { JsonRpc, Api, Serialize } from '@jafri/eosjs2';

// var VConsole = require("vconsole");
// var vConsole = new VConsole();

const endpoints = ["https://jungle2.cryptolions.io", "jungle.eosdac.io"];

const rpc = new JsonRpc(endpoints);
const api = new Api({
  rpc,
  textDecoder: new TextDecoder(),
  textEncoder: new TextEncoder()
});

api.Serialize = Serialize;

api.setEndpoints = (endpoints) => {
  console.log('setting endpoint to', endpoints);
  api.rpc = new JsonRpc(endpoints);
}

export default ({ Vue, store }) => {
  //console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',store)
  // something to do
  console.log(store)
  api.setEndpoints(store.state.app.config[store.getters["ual/getActiveNetwork"]].endpoints)
  console.log('eos injected in Vue prototype!');
  console.log(api)

  Vue.prototype.$eos = api;
};