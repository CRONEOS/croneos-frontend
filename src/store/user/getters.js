function parseMicroSeconds(us, precision = 2) {
  us = Number(us);
  if (us >= 1000000) {
    let sec = (us / 1000000).toFixed(precision);
    return sec + " sec";
  } else if (us >= 1000) {
    let ms = (us / 1000).toFixed(precision);
    return ms + " ms";
  } else {
    let u = us.toFixed(precision);
    return u + " µs";
  }
}

function parseBytes(b, precision = 2) {
    b = Number(b);
    return `${(b/1024).toFixed(precision)} KB`;

  }

export function getRewards(state) {
  return state.rewards;
}

export function getDeposits(state) {
  return state.deposits;
}

//account
export function getCPUStats(state) {
  if (state.account) {
    let cpu = state.account.cpu_limit;
    let res = JSON.parse(JSON.stringify(cpu));
    res.perc_used = 100 - (cpu.available / cpu.max) * 100;
    res.parsed = {};
    res.parsed.available = parseMicroSeconds(cpu.available);
    res.parsed.used = parseMicroSeconds(cpu.used);
    res.parsed.max = parseMicroSeconds(cpu.max);
    res.self_delegated_cpu = state.account.self_delegated_bandwidth != null ? state.account.self_delegated_bandwidth.cpu_weight : 0;
    res.total_delegated_cpu = state.account.total_resources.cpu_weight;
    return res;
  }
}

export function getNETStats(state) {
  if (state.account) {
    let net = state.account.net_limit;
    let res = JSON.parse(JSON.stringify(net));
    res.perc_used = 100 - (net.available / net.max) * 100;
    res.parsed = {};
    res.parsed.available = parseBytes(net.available);
    res.parsed.used = parseBytes(net.used);
    res.parsed.max = parseBytes(net.max);
    res.self_delegated_net = state.account.self_delegated_bandwidth != null ? state.account.self_delegated_bandwidth.net_weight : 0;
    res.total_delegated_net = state.account.total_resources.net_weight;
    return res;
  }
}
