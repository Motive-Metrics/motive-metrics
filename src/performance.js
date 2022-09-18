import ForgeUI, { render, CustomField, CustomFieldEdit, Select, Option, useProductContext, Text, StatusLozenge } from '@forge/ui';

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

export const renderPerformanceFieldEdit = render(<MyPerformanceEdit />);
export const renderPerformanceFieldView = render(<MyPerformanceView />);