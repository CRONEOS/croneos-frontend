
export function setCronjobs (state, payload) {
    state.cronjobs = payload
}

export function removeCronjobByIndex (state, payload) {
    state.cronjobs.splice(payload, 1);
}

