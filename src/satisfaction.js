import ForgeUI, { CustomField, CustomFieldEdit, Option, render, Select, StatusLozenge, Text, useProductContext } from '@forge/ui';

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

    return (
        <CustomField>
            <Text>
              <StatusLozenge text={fieldValue || 'None'} appearance={getLozengeApperance(fieldValue)}></StatusLozenge>
          </Text>
        </CustomField>
    );
};

const MySatisfactionEdit = () => {
  const onSubmit = (formValue) => {
      return formValue.myPerformanceRating;
  }

  return (
      <CustomFieldEdit onSubmit={onSubmit} header="How would you rate your satisfaction of this Issue?" width="medium" >
          <Select label="Select one of the options below" name="myPerformanceRating">
              <Option label="Bad" value="Bad" />
              <Option label="Somewhat Bad" value="Somewhat Bad" />
              <Option label="Okay" value="Okay" />
              <Option label="Somewhat Good" value="Somewhat Good" />
              <Option label="Good" value="Good" />
          </Select>
      </CustomFieldEdit>
  );
};

export const renderSatisfactionFieldView = render(<MySatisfactionView />);
export const renderSatisfactionFieldEdit = render(<MySatisfactionEdit />);

