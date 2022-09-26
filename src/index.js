import Resolver from '@forge/resolver';
import ForgeUI, { render } from '@forge/ui';
import api, {route} from '@forge/api'
import {getPerformanceRatingsData} from './selfPerformance';
import { getPeerAssessedPerformanceRatings } from './peerRatedPerformance';
import {getMotivationRatings} from './motivation';

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

resolver.define('getMotivation', async (req) => {
    const motivationsCount = await getMotivationRatings(req);
    return motivationsCount;
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