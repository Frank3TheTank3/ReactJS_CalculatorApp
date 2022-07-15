import { ACTIONS } from "./App"

export default function OperationButton({dispatch, operation}){
    return <button onClick={() => dispatch({type: ACTIONS.WAEHLE_OPERATION, payload: {operation} })}
    >
        
        {operation}
        
    </button>
}