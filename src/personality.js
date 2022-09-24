import { storage } from '@forge/api';
import api, { route } from '@forge/api'

export const storePersonalityResults = function(req) {
    console.log(req);
    return api.asApp().requestJira(route`/rest/api/3/myself`, {
        headers: {
          'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(user => storage.set(user.accountId, req.payload.personality));
}

export const getPersonalityResults = function(req) {
    return api.asApp().requestJira(route`/rest/api/3/myself`, {
        headers: {
        'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(user => storage.get(user.accountId));
}