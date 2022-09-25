import ForgeUI, { render, CustomField, CustomFieldEdit, Select, Option, useProductContext, useState, Text, StatusLozenge } from '@forge/ui';
import api, {route} from '@forge/api';
import { getCustomFieldID } from './index';

const PeerAssessedPerformanceView = () => {
    
    const {platformContext: {issueKey}} = useProductContext();
    const [assigneeId] = useState(getIssueAssigneeID(issueKey));
    const {accountId} = useProductContext();
    
    // If current user logged in == assignee ID, then display “Cannot peer rate yourself”
    if (accountId == assigneeId) {
        return (
            <CustomField>
                <Text>Cannot peer rate yourself!</Text>
            </CustomField>
        )
    };

    // If ID of current user logged in does not exist in return value, then display “Peer assess performance”
    const [fieldData] = useState(getPeerAssessedPerformanceData(issueKey));
    var accounts;
    var ratings;

    if (fieldData === null || typeof fieldData === 'undefined') {
        accounts = [];
        ratings = [];
    }
    else {
        accounts = fieldData.accountId;
        ratings = fieldData.peerAssessedPerformanceRating;
    };

    var exists = false;
    var counter = 0;
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i] == accountId) {
            exists = true;
            counter = i;
        }
    }

    if (!exists) {
        return (
            <CustomField>
                <Text>Peer assess performance!</Text>
            </CustomField>
        )
    }
    
    const getLozengeApperance = (rating) => {
        switch (rating) {
            case 'Good':
                return 'success';
            case 'Somewhat Good':
                return 'moved';
            case 'Okay':
                return 'inprogress';
            case 'Somewhat Bad':
                return 'moved';
            case 'Bad':
                return 'removed';
            default:
                return 'default'
        }
    }
    
    const {
        extensionContext: { fieldValue },
    } = useProductContext();

    const output = fieldValue === null ? 'None' : fieldValue.peerAssessedPerformanceRating[counter];
    

    return (
        <CustomField>
            <Text>
                <StatusLozenge text={output} appearance={getLozengeApperance(output)}></StatusLozenge>
            </Text>
        </CustomField>
    );
};

const PeerAssessedPerformanceEdit = () => {
    
    const {platformContext: {issueKey}} = useProductContext();
    const [assigneeId] = useState(getIssueAssigneeID(issueKey));
    const {accountId} = useProductContext();
    const [fieldData] = useState(getPeerAssessedPerformanceData(issueKey));

    // If current user is the assignee, keep return data the same
    if (accountId == assigneeId) {
        const onSubmit = (formValue) => {
            var accounts;
            var ratings;

            // if first time peer rating performance for this issue, set properties to empty array
            if (fieldData === null || typeof fieldData === 'undefined') {
                accounts = [];
                ratings = [];
            }
            else {
                accounts = fieldData.accountId;
                ratings = fieldData.peerAssessedPerformanceRating;
            };
            return {
                "accountId": accounts,
                "peerAssessedPerformanceRating": ratings
            };
        };
        
        return (
            <CustomFieldEdit onSubmit={onSubmit} header="How would you rate the performance of your peer?" width="medium" >
                <Text>Cannot peer assess yourself!</Text>
            </CustomFieldEdit>
        );
    };

    // Else, let user rate performance like self assessment 
    const onSubmit = (formValue) => {
        
        var accounts;
        var ratings;

        // if first time peer rating performance for this issue, set properties to empty array
        if (fieldData === null || typeof fieldData === 'undefined') {
            accounts = [];
            ratings = [];
        }
        else {
            accounts = fieldData.accountId;
            ratings = fieldData.peerAssessedPerformanceRating;
        };

        // If user already rated performance, update thier previous rating
        var exists = false;
        for (let i = 0; i < accounts.length; i++) {
            if (accounts[i] == accountId) {
                ratings[i] = formValue.myPerformanceRating;
                exists = true;
            }
        }

        // If user has not rated performance before, add their rating
        if (!exists) {
            accounts.push(accountId);
            ratings.push(formValue.myPerformanceRating);
        }

        return {
            "accountId": accounts,
            "peerAssessedPerformanceRating": ratings
        };
    }

    return (
        <CustomFieldEdit onSubmit={onSubmit} header="How would you rate the performance of your peer?" width="medium" >
            <Select label="Select one of the options below to rate your performance" name="myPerformanceRating">
                <Option label="Bad" value="Bad" />
                <Option label="Somewhat Bad" value="Somewhat Bad" />
                <Option label="Okay" value="Okay" />
                <Option label="Somewhat Good" value="Somewhat Good" />
                <Option label="Good" value="Good" />
            </Select>
        </CustomFieldEdit>
    );
};

const getIssueAssigneeID = async function (issueKey) {
    const response = await api.asApp().requestJira(route`/rest/api/3/issue/${issueKey}`);
    const data = await response.json();
    
    var assigneeId = null;
    if ( data.fields.assignee ) {
        assigneeId = data.fields.assignee.accountId;
    }
    
    return assigneeId;
};

const getPeerAssessedPerformanceData = async function (issueKey) {
    const response = await api.asApp().requestJira(route`/rest/api/3/issue/${issueKey}`);
    const data = await response.json();
    const customFieldID = await getPeerPerformanceCustomFieldID(data, 'peerAssessedPerformanceRating');
    return data.fields[customFieldID];
};

const getPeerPerformanceCustomFieldID = async function (data, targetProperty) {
    for (var fieldName in data.fields) {
        if (data.fields[fieldName]) {
            if (data.fields[fieldName].hasOwnProperty(targetProperty)) {
                return fieldName;
            }
        }
    };
    return null;
};

export const getPeerAssessedPerformanceRatings = async function (req) {
    var jql = `project in (${req.context.extension.project.key})`;
    const response = await api.asApp().requestJira(route`/rest/api/3/search?${jql}`);
    const data = await response.json();

    const customFieldID = await getCustomFieldID(data, 'peerAssessedPerformanceRating');

    var issuePerformances = [];
    for (var issue of data.issues) {
        if ( issue.fields[customFieldID].peerAssessedPerformanceRating ) {
            issuePerformances.push(issue.fields[customFieldID].peerAssessedPerformanceRating);
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
};

export const renderPerformanceFieldEdit = render(<PeerAssessedPerformanceEdit />);
export const renderPerformanceFieldView = render(<PeerAssessedPerformanceView />);