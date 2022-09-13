import Resolver from '@forge/resolver';
import ForgeUI, { 
    render,
    useProductContext,
    CustomField, 
    CustomFieldEdit,
    Option,
    Select,
    Text, 
} from '@forge/ui';
import api, {route} from '@forge/api'

const resolver = new Resolver();

resolver.define('getText', async (req) => {
    console.log(req);
    // Below lines retrieves and prints a list containing performanceratings of all issues (REMOVE COMMENT LATER)
    var jql = `project in (${req.context.extension.project.key})`;
    const response = await api.asApp().requestJira(route`/rest/api/3/search?${jql}`);
    const data = await response.json();
    const performanceData = getPerformanceRatings(data);
    console.log(performanceData);

    return 'Hello, world!!!!!!';
});

// Function to get a list of issues with the issue key, performance rating & assignee of each issue
// Will be useful later when working with this data for project page
function getPerformanceRatings(req) {
    var issuePerformances = [];
    var assigneeName = null;
    for (var issue of req.issues) {
        // This handles null assignee value. Try to store displayName if assignee is not null (REMOVE COMMENT LATER)
        if ( issue.fields.assignee ) {
            assigneeName = issue.fields.assignee.displayName;
        }
        // Not sure why customfield for performance rating is stored under 'customfield_10046', instead of the 'key' used in manifest file (REMOVE COMMENT LATER)
        issuePerformances.push({
            "key": issue.key,
            "performanceRating": issue.fields.customfield_10046,
            "assignee": assigneeName
        });
    }
    
    return issuePerformances;
}

const MyPerformanceView = () => {
    const {
        extensionContext: { fieldValue },
    } = useProductContext();

    return (
        <CustomField>
            <Text>
                {fieldValue || 'None'}
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