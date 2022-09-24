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
    .then(user => {
        const storeData = {
            name: user.displayName,
            personality: req.payload.personality
        }
        console.log("OOO: " + user.accountId);
        return storage.set(user.accountId, storeData);
        }
    );
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
        //console.log(users);
        for (const user of users) {
            //console.log("Apple: " + user.accountId);
            let storedData = await storage.get(user.accountId);
            //console.log("Banana: " + storedData);
            if (storedData != null) {
                console.log("Banana: " + storedData);
                allUserPersonalities.push(storedData);
            }
        }
        return allUserPersonalities;
    });
}