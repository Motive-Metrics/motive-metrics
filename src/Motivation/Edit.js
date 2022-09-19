import ForgeUI, { render, CustomField, useProductContext, Text, CustomFieldEdit, Select, Option, useState } from '@forge/ui';
import Resolver from '@forge/resolver';

const EditMotivation = () => {

    const onSubmit = (formData) => {
        console.log(formData);
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

export default EditMotivation;