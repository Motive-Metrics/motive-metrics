import ForgeUI, { render, CustomField, CustomFieldEdit, Select, Option, useProductContext, Text, StatusLozenge } from '@forge/ui';
import api, {route} from '@forge/api';
import { getCustomFieldID } from './index';

const MyPerformanceView = () => {
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

    const output = fieldValue === null ? 'None' : fieldValue.myPerformanceRating;

    return (
        <CustomField>
            <Text>
                <StatusLozenge text={output} appearance={getLozengeApperance(output)}></StatusLozenge>
            </Text>
        </CustomField>
    );
};

const MyPerformanceEdit = () => {
    const onSubmit = (formValue) => {
        return formValue;
    }

    return (
        <CustomFieldEdit onSubmit={onSubmit} header="How would you rate your performance?" width="medium" >
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

export const getPerformanceRatingsData = async function (req) {
    var jql = `project in (${req.context.extension.project.key})`;
    var projectId = req.context.extension.project.id;
    const response = await api.asApp().requestJira(route`/rest/api/3/search?${jql}`);
    const data = await response.json();

    const customFieldID = await getCustomFieldID(data, 'myPerformanceRating');

    var performanceData = [0, 0, 0, 0, 0];
    for (var issue of data.issues) {
        if ( issue.fields[customFieldID] && issue.fields[customFieldID].myPerformanceRating ) {
            if (projectId == issue.fields.project.id) {
                var rating = issue.fields[customFieldID].myPerformanceRating;
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
            } 
        };
    }

    return performanceData;
};

export const renderPerformanceFieldEdit = render(<MyPerformanceEdit />);
export const renderPerformanceFieldView = render(<MyPerformanceView />);