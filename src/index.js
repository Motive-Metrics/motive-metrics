import Resolver from '@forge/resolver';
import ForgeUI, { render } from '@forge/ui';
import api, {route} from '@forge/api'
import {getPerformanceRatingsData} from './performance';
import {getMotivationRatings} from './motivation';

const resolver = new Resolver();

resolver.define('getText', async (req) => {
    console.log(req);
    return 'Hello, world!!!!!!';
});

resolver.define('getPerformanceRatingsData', async (req) => {
    const performanceData = await getPerformanceRatingsData(req);
    return performanceData;
});

resolver.define('getMotivation', async (req) => {
    const motivationsCount = await getMotivationRatings(req);
    return motivationsCount;
});


export const handler = resolver.getDefinitions();