import ForgeUI, { render, CustomField, useProductContext, Text, CustomFieldEdit, Select, Option, useState } from '@forge/ui';
import Resolver from '@forge/resolver';

const EditMotivation = () => {

    const onSubmit = (formData) => {
        console.log(formData);
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

export default EditMotivation;