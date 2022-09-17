import ForgeUI, { render, CustomField, useProductContext, Text, CustomFieldEdit, Select, Option, useState } from '@forge/ui';
import Resolver from '@forge/resolver';

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

export default ViewMotivation;