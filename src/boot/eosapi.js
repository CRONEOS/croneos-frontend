import { JsonRpc, Api, Serialize } from "eosjs";
// var VConsole = require("vconsole");
// var vConsole = new VConsole();

// const chains = [{
//     chainId: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473',
//     rpcEndpoints: [{
//         protocol: 'https',
//         host: 'jungle2.cryptolions.io',
//         port: 443,
//     }]
// }];

const rpc = new JsonRpc("https://jungle2.cryptolions.io"); //api.main.alohaeos.com, eos.greymass.com, jungle2.cryptolions.io jungle.eosdac.io
const api = new Api({
  rpc,
  textDecoder: new TextDecoder(),
  textEncoder: new TextEncoder()
});

api.Serialize = Serialize;

// export default async ({ app, router, store, Vue }) => {

// }

export default ({ Vue }) => {
  // something to do
  console.log('eos injected in Vue prototype!');
  console.log(api)

  Vue.prototype.$eos = api;
};