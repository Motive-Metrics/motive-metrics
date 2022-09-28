import ForgeUI, { render, CustomField, useProductContext, Text, CustomFieldEdit, Select, Option, useState } from '@forge/ui';
import Resolver from '@forge/resolver';
import api, {route} from '@forge/api'
import { getCustomFieldID } from './index';

const ViewMotivation = () => {

    const {
        extensionContext: { fieldValue },
    } = useProductContext();
    
    const output = fieldValue === null ? 'None' : fieldValue.myMotivationRating
    return (
        <CustomField>
            <Text>{output}</Text>
        </CustomField>
    );
};

const EditMotivation = () => {

    const onSubmit = (formData) => {
        formData.motivationScore = false;
        formData.challenging = true;
        formData.interesting = true;
        formData.important = true;
        formData.innovative = true;
        formData.difficult = true;
        formData.easy = false;
        return formData;
    };
      
    return (
        <CustomFieldEdit onSubmit={onSubmit} header="Tell us about your motivation?" width="medium" >
            <Select label="Rate how motivated you were" name="myMotivationRating">
                <Option label="Low" value="Low" />
                <Option label="Somewhat Low" value="Somewhat Low" />
                <Option label="Okay" value="Okay" />
                <Option label="Somewhat High" value="Somewhat High" />
                <Option label="High" value="High" />
            </Select>
        </CustomFieldEdit>
    );
};

export const getMotivationRatings = async function(req) {
    var jql = `project in (${req.context.extension.project.key})`;
    const response = await api.asApp().requestJira(route`/rest/api/3/search?${jql}`);
    const data = await response.json();

    const customFieldID = await getCustomFieldID(data, 'motivationScore');
    
    var motivationsCount = {};
    for (var issue of data.issues) {
        var issueMotivationField = issue.fields[`${customFieldID}`];
        for (const property in issueMotivationField) {
            if (property != 'myMotivationRating' && issueMotivationField[`${property}`]) {
                const previous = motivationsCount[`${property}`] ? motivationsCount[`${property}`] : 0;
                motivationsCount[`${property}`] = previous + 1;
            }
        }
    }

    return motivationsCount;
}

export const getAllAverageMotivation = async function(req) {
    let jql = `project in (${req.context.extension.project.key})`;
    const response = await api.asApp().requestJira(route`/rest/api/3/search?${jql}`);
    const data = await response.json();

    const customFieldID = await getCustomFieldID(data, 'motivationScore');

    const sumMotivationRatings = {};
    const frequencyMotivationRatings = {};
    const values = {
      "Low": 0,
      "Somewhat Low": 1,
      "Okay": 2,
      "Somewhat High": 3,
      "High": 4,
    };

    for (let issue of data.issues) {
        let issueMotivationField = issue.fields[`${customFieldID}`];
        let assignee = issue.fields.assignee;
        if (issueMotivationField != null && issueMotivationField.hasOwnProperty('myMotivationRating') && assignee != null) {
            if (!sumMotivationRatings.hasOwnProperty(assignee.accountId)) {
                console.log('Assignee: ' + assignee.accountId);
                sumMotivationRatings[assignee.accountId] = 0;
                frequencyMotivationRatings[assignee.accountId] = 0;
            }
            
            sumMotivationRatings[assignee.accountId] += values[issueMotivationField.myMotivationRating];
            frequencyMotivationRatings[assignee.accountId] += 1;
        }
    }
    const avgMotivationRatings = {};
    for (const property in sumMotivationRatings) {
        avgMotivationRatings[property] = sumMotivationRatings[property] / frequencyMotivationRatings[property];
    }
    return avgMotivationRatings;
}


export const renderViewMotivation = render(<ViewMotivation/>);
export const renderEditMotivation = render(<EditMotivation/>);