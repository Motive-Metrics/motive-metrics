import ForgeUI, { CustomFieldEdit, Select, Option } from '@forge/ui';

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

export default MyPerformanceEdit;