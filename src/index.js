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

const resolver = new Resolver();

resolver.define('getText', (req) => {
    console.log(req);

    return 'Hello, world!';
});

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