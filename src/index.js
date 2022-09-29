import Resolver from '@forge/resolver';
import ForgeUI, { render } from '@forge/ui';
import api, {route} from '@forge/api'
import { getPerformanceRatingsData } from './selfPerformance';
import { getPeerAssessedPerformanceRatings, getAllAveragePerformance } from './peerRatedPerformance';
import { getSatisfactionRatingsData, getAllAverageSatisfaction } from './satisfaction';
import { getMotivationRatings, getAllAverageMotivation } from './motivation';
import { storePersonalityResults, getAllPersonalityResults } from './personality';

const resolver = new Resolver();

resolver.define('getText', async (req) => {
    console.log(req);
    return 'Hello, world!!!!!!';
});

resolver.define('getSelfAssessedPerformanceRatings', async (req) => {
    const performanceData = await getPerformanceRatingsData(req);
    return performanceData;
});

resolver.define('getPeerAssessedPerformanceRatings', async (req) => {
    const peerAssessedPerformanceData = await getPeerAssessedPerformanceRatings(req);
    return peerAssessedPerformanceData;
});

resolver.define('getSelfDataEmptyStatus', async (req) => {
    const performanceData = await getPerformanceRatingsData(req);
    var isEmpty = true;
    for (let i = 0; i < performanceData.length; i++) {
        if (performanceData[i] != 0) {
            isEmpty = false;
        }
    }
    return isEmpty;
});

resolver.define('getPeerDataEmptyStatus', async (req) => {
    const performanceData = await getPerformanceRatingsData(req);
    var isEmpty = true;
    for (let i = 0; i < performanceData.length; i++) {
        if (performanceData[i] != 0) {
            isEmpty = false;
        }
    }
    return isEmpty;
});

resolver.define('getAllAveragePerformance', async (req) => {
    const averagePerformance = await getAllAveragePerformance(req);
    return averagePerformance;
});

resolver.define('getMotivation', async (req) => {
    const motivationsCount = await getMotivationRatings(req);
    return motivationsCount;
});


resolver.define('getAllAverageMotivation', async (req) => {
    const averageMotivation = await getAllAverageMotivation(req);
    return averageMotivation;
});

resolver.define('getSatisfactionRatingsData', async (req) => {
    const satisfactionData = await getSatisfactionRatingsData(req);
    return satisfactionData;
});

resolver.define('getAllAverageSatisfaction', async (req) => {
    const averageSatisfaction = await getAllAverageSatisfaction(req);
    return averageSatisfaction;
});

resolver.define('storePersonalityResults', async (req) => {
    await storePersonalityResults(req);
});

resolver.define('getMyPersonalityResults', async (req) => {
    return await getMyPersonalityResults(req);
});

resolver.define('getAllPersonalityResults', async (req) => {
    return await getAllPersonalityResults(req);
});


export const getCustomFieldID = async function (data, targetProperty) {
    for (var issue of data.issues) {
        for (var fieldName in issue.fields) {
            if (issue.fields[fieldName]) {
                if (issue.fields[fieldName].hasOwnProperty(targetProperty)) {
                    return fieldName;
                }
            }
        }
    };
    return null;
};

export const handler = resolver.getDefinitions();