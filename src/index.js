import Resolver from '@forge/resolver';
import ForgeUI, { render } from '@forge/ui';
import api, {route} from '@forge/api'

const resolver = new Resolver();

resolver.define('getText', async (req) => {
    console.log(req);
    return 'Hello, world!!!!!!';
});

// Returns a list containing the count of each performance ratings in the following order: [Bad, Somewhat Bad, Okay, Somewhat Good, Good]
resolver.define('getPerformanceRatingsData', async (req) => {
    var jql = `project in (${req.context.extension.project.key})`;
    const response = await api.asApp().requestJira(route`/rest/api/3/search?${jql}`);
    const data = await response.json();

    var issuePerformances = [];
    for (var issue of data.issues) {
        if ( issue.fields.customfield_10046 ) {
            issuePerformances.push(issue.fields.customfield_10046);
        };
    }

    var performanceData = [0, 0, 0, 0, 0];
    for (var rating of issuePerformances) {
        switch (rating) {
            case 'Bad':
                performanceData[0] += 1;
                break;
            case 'Somewhat Bad':
                performanceData[1] += 1;
                break;
            case "Okay":
                performanceData[2] += 1;
                break;
            case "Somewhat Good":
                performanceData[3] += 1
                break;
            case "Good":
                performanceData[4] += 1
                break;
        };
    };

    return performanceData;
});

export const handler = resolver.getDefinitions();