import {
    FormInputLabel,
    Input,
    Group
} from './form-input.styles';

const FormInput = ({
    label,
    ...props
}) => {
    return (
        <Group>
        <Input {...props} />
        { 
            label &&
            // you can pass props to your styled components for super duper powerful
            // conditional styling - neat-o!
            (<FormInputLabel shrink={props.value.length}>{label}</FormInputLabel>)
        }
        </Group>
    )
}

export default FormInput;