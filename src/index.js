import Resolver from '@forge/resolver';
import ForgeUI, { render } from '@forge/ui';
import api, {route} from '@forge/api'

const resolver = new Resolver();

resolver.define('getText', async (req) => {
    console.log(req);
    // get data for self performance ratings
    // const performanceData = await getPerformanceRatings(req);
    // console.log(performanceData);

    return 'Hello, world!!!!!!';
});

// Function to get the performance ratings of all issues.
// A list containing object for each issue {issue key, performanceRating, assignee} will be returned.
// Will be useful later when working with this data for project page (REMOVE COMMENT LATER)
resolver.define('getPerformanceRatings', async (req) => {
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
});

// Returns count of performance ratings in the following order: Bad, Somewhat Bad, Okay, Somewhat Good, Good 
// const getPerformanceRatingsData = async (req) => {
resolver.define('getPerformanceRatingsData', async (req) => {
    var jql = `project in (${req.context.extension.project.key})`;
    const response = await api.asApp().requestJira(route`/rest/api/3/search?${jql}`);
    const data = await response.json();

    var issuePerformances = [];
    // Store performance rating value
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

// bbb
resolver.define('aaa', async (req) => {
    var jql = `project in (${req.context.extension.project.key})`;
    const response = await api.asApp().requestJira(route`/rest/api/3/search?${jql}`);
    const data = await response.json();

    var issuePerformances = [];
    // Store performance rating value
    for (var issue of data.issues) {
        if ( issue.fields.customfield_10046 ) {
            issuePerformances.push(issue.fields.customfield_10046);
        };
    }

    var performanceData = [0, 0, 0, 0, 0];
    var performanceLabels = ['Bad', 'Somewhat Bad', 'Okay', 'Somewhat Good', 'Good'];
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

    var output = [];
    for (let i = 0; i < performanceData.length; i++) {
        output.push({
            "performanceRating": performanceLabels[i],
            "count": performanceData[i]
        });
    }
    
    return output;
});

export const handler = resolver.getDefinitions();