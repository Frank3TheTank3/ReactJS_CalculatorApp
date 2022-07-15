import { ACTIONS } from "./App"

export default function ZahlButton({dispatch, zahl}){
    return <button onClick={() => dispatch({type: ACTIONS.ZAHL_ERSTELLEN, payload: {zahl} })}
    >
        
        {zahl}
        
    </button>
}