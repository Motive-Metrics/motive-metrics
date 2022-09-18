import ForgeUI, { CustomField, useProductContext, Text } from '@forge/ui';

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

export default MyPerformanceView;