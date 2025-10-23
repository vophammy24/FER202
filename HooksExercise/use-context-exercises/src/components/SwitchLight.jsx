import { Button } from 'react-bootstrap';
import { useReducer } from "react";
import { useTheme } from '../contexts/ThemeContext';

const initialState = { isLightOn: false}

function reducer (state, action) {
    switch (action.type){
        case "TOGGLE":
            return {isLightOn: !state.isLightOn };
        default : 
            return state;
    }
}
function SwitchLight (){
    const [state, dispatch] = useReducer(reducer, initialState);
    const { theme, toggleTheme } = useTheme();

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
                style={{
                ...buttonStyle,
                background: theme === 'light' ? '#6c757d' : '#f8f9fa',
                color: theme === 'light' ? '#ffffff' : '#000000'
                }}
                onClick={toggleTheme}
                >
                    {theme === 'light' ? 'Dark' : 'Light'}
            </Button>
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