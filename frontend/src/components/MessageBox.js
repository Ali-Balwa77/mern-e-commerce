import Alert from 'react-bootstrap/Alert'
export default function MessageBox(props)
{
    return (
        <Alert variant={ props.variant || "into" }>
            {props.children }
        </Alert>
    )
}