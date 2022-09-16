import Resolver from '@forge/resolver';
import ForgeUI, { 
    render,
    useProductContext,
    CustomField, 
    CustomFieldEdit,
    Option,
    Select,
    StatusLozenge,
    Text, 
} from '@forge/ui';
import api, {route} from '@forge/api'

const resolver = new Resolver();

resolver.define('getText', async (req) => {
    console.log(req);
    // get data for self performance ratings
    const performanceData = await getPerformanceRatings(req);
    console.log(performanceData);

    return 'Hello, world!!!!!!';
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

    return (
        <CustomField>
            <Text>
                <StatusLozenge text={fieldValue || 'None'} appearance={getLozengeApperance(fieldValue)}></StatusLozenge>
            </Text>
        </CustomField>
    );
};

const MyPerformanceEdit = () => {
    const onSubmit = (formValue) => {
        return formValue.myPerformanceRating;
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

export const renderPerformanceFieldView = render(<MyPerformanceView />);
export const renderPerformanceFieldEdit = render(<MyPerformanceEdit />);
export const handler = resolver.getDefinitions();