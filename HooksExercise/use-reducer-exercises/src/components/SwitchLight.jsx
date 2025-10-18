import { Button } from 'react-bootstrap';
import { useReducer } from "react";

const initialState = { isLightOn: false}

function reducer (state, action) {
    switch (action.type){
        // case 'TURN_ON':
        //     return {isLightOn: true}
        // case 'TURN_OFF':
        //     return {isLightOn: false}
        case "TOGGLE":
            return {isLightOn: !state.isLightOn };
        default : 
            return state;
    }
}
function SwitchLight (){
    const [state, dispatch] = useReducer(reducer, initialState);

    const buttonStyle = {  
        margin: '5px',
        padding: '10px 20px',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '16px'
    };
    return (
        <div style={{ padding: '20px', border: '1px solid #ccc' }}>     
            <h2>Công Tắc Đèn</h2>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
                Đèn hiện đang: {state.isLightOn ? 'On' : 'Off'}  
            </p>
            <Button
                onClick={() => dispatch({type: "TOGGLE"})}   
                style={{ 
                    ...buttonStyle,
                    background: state.isLightOn ? 'red' : 'green',
                    color: 'white'
                }}  
            >
                {state.isLightOn ? 'Turn Off' : 'Turn On'}  
            </Button>   
        </div>
    );
}
export default SwitchLight;