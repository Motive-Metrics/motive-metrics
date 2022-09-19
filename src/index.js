import Resolver from '@forge/resolver';
import ForgeUI, { render } from '@forge/ui';
import api, {route} from '@forge/api'
import {getMotivationRatings} from './motivation';

const resolver = new Resolver();

resolver.define('getText', async (req) => {
    console.log(req);
    // get data for self performance ratings
    const performanceData = await getPerformanceRatings(req);
    console.log(performanceData);

    return 'Hello, world!!!!!!';
});

resolver.define('getMotivation', async (req) => {
    const motivationsCount = await getMotivationRatings(req);
    return motivationsCount;
});

// Function to get the performance ratings of all issues.
// A list containing object for each issue {issue key, performanceRating, assignee} will be returned.
// Will be useful later when working with this data for project page (REMOVE COMMENT LATER)
const getPerformanceRatings = async function(req) {
    var jql = `project in (${req.context.extension.project.key})`;
    const response = await api.asApp().requestJira(route`/rest/api/3/search?${jql}`);
    const data = await response.json();

    var issuePerformances = [];
    var assigneeName = null;
    for (var issue of data.issues) {
        if ( issue.fields.assignee ) {
            assigneeName = issue.fields.assignee.displayName;
        }
        // I think forge gives an ID of custom fields created, so have to refer by the ID 'customfield_10046', instead of the 'key' used in manifest file (REMOVE COMMENT LATER)
        issuePerformances.push({
            "key": issue.key,
            "performanceRating": issue.fields.customfield_10046,
            "assignee": assigneeName
        });
    }
    
    return issuePerformances;
}

export const handler = resolver.getDefinitions();