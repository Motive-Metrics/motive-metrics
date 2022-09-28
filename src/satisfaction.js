import ForgeUI, { CustomField, CustomFieldEdit, Option, render, Select, StatusLozenge, Text, useProductContext } from '@forge/ui';
import api, {route} from '@forge/api';
import { getCustomFieldID } from './index';

const MySatisfactionView = () => {
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

    const output = fieldValue === null ? 'None' : fieldValue.mySatisfactionRating;

    return (
        <CustomField>
            <Text>
              <StatusLozenge text={output} appearance={getLozengeApperance(output)}></StatusLozenge>
          </Text>
        </CustomField>
    );
};

const MySatisfactionEdit = () => {
  const onSubmit = (formValue) => {
      return formValue;
  }

  return (
      <CustomFieldEdit onSubmit={onSubmit} header="How would you rate your satisfaction for this Issue?" width="medium" >
          <Select label="Select one of the options below" name="mySatisfactionRating">
              <Option label="Bad" value="Bad" />
              <Option label="Somewhat Bad" value="Somewhat Bad" />
              <Option label="Okay" value="Okay" />
              <Option label="Somewhat Good" value="Somewhat Good" />
              <Option label="Good" value="Good" />
          </Select>
      </CustomFieldEdit>
  );
};

export const getSatisfactionRatingsData = async function (req) {
    var jql = `project in (${req.context.extension.project.key})`;
    const response = await api.asApp().requestJira(route`/rest/api/3/search?${jql}`);
    const data = await response.json();

    const customFieldID = await getCustomFieldID(data, 'mySatisfactionRating');

    var issueSatisfaction = [];
    for (var issue of data.issues) {
        if ( issue.fields[customFieldID] && issue.fields[customFieldID].mySatisfactionRating ) {
            issueSatisfaction.push(issue.fields[customFieldID].mySatisfactionRating);
        };
    }

    var satisfactionData = [0, 0, 0, 0, 0];
    for (var rating of issueSatisfaction) {
        switch (rating) {
            case 'Bad':
                satisfactionData[0] += 1;
                break;
            case 'Somewhat Bad':
                satisfactionData[1] += 1;
                break;
            case "Okay":
                satisfactionData[2] += 1;
                break;
            case "Somewhat Good":
                satisfactionData[3] += 1
                break;
            case "Good":
                satisfactionData[4] += 1
                break;
        };
    };

    return satisfactionData;
};

export const renderSatisfactionFieldView = render(<MySatisfactionView />);
export const renderSatisfactionFieldEdit = render(<MySatisfactionEdit />);

