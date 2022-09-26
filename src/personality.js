import { storage } from '@forge/api';
import api, { route } from '@forge/api'

export const storePersonalityResults = function(req) {
    console.log('storePersonalityResults', req.payload.accountId);
    const storeData = {
        accountId: req.payload.accountId,
        personality: req.payload.personality
    }
    return storage.set(req.payload.accountId, storeData);
}

export const getMyPersonalityResults = function(req) {
    return api.asApp().requestJira(route`/rest/api/3/myself`, {
        headers: {
        'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(user => storage.get(user.accountId));
}

export const getAllPersonalityResults = function(req) {
    return api.asApp().requestJira(route`/rest/api/3/users/search`, {
        headers: {
          'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(async users => {
        const allUserPersonalities = [];
        for (const user of users) {
            let storedData = await storage.get(user.accountId);
            if (storedData != null) {
                console.log('retrieved user: ' + user.accountId);
                allUserPersonalities.push(storedData);
            }
        }
        return allUserPersonalities;
    });
}