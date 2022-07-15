import { useReducer } from "react"
import ZahlButton from "./ZahlButton"
import OperationButton from "./OperationButton"
import "./styles.css"

export const ACTIONS = {
  ZAHL_ERSTELLEN: "erstelle-zahl",
  WAEHLE_OPERATION: "waehle-operation",
  LOESCHEN: "loeschen",
  ZAHL_ENTFERNEN: "entferne-zahl",
  EVALUIEREN: "evaluieren"

}

function reducer(state, {type, payload}){
  switch(type){
    case ACTIONS.ZAHL_ERSTELLEN:
      if(state.overwrite){
        return{
          ...state,
          jetztigerOpertator: payload.zahl,
          overwrite: false,
        }
      }
      if(payload.zahl === "0" && state.jetztigerOpertator === "0") {
        return state
      }
      if(payload.zahl === "." && state.jetztigerOpertator.includes(".")) {
        return state
      }
      return{
        ...state,
        jetztigerOpertator: `${state.jetztigerOpertator || ""}${payload.zahl}`,
      }
    case ACTIONS.WAEHLE_OPERATION:

      if(state.jetztigerOpertator == null && state.vorherigerOperator == null){
        return state
      }

      if(state.jetztigerOpertator == null){
        return{
          ...state,
          operation: payload.operation
        }
      }


      if(state.vorherigerOperator == null){
        return {
          ...state,
          operation: payload.operation,
          vorherigerOperator: state.jetztigerOpertator,
          jetztigerOpertator: null,
        }
      }

      return{
        ...state,
        vorherigerOperator: evaluieren(state),
        operation: payload.operation,
        jetztigerOpertator: null
      }
    case ACTIONS.LOESCHEN:
      return{}
    case ACTIONS.ZAHL_ENTFERNEN:
      if(state.overwrite) {
        return{
          ...state,
          overwrite: false,
          jetztigerOpertator: null
        }
    }
    if(state.jetztigerOpertator == null) return state
    if(state.jetztigerOpertator.length === 1) {
      return {...state, jetztigerOpertator: null}
    }
    return{
      ...state,
      jetztigerOpertator: state.jetztigerOpertator.slice(0, -1)
    }
    case ACTIONS.EVALUIEREN:
      if(state.operation == null || state.jetztigerOpertator == null || state.vorherigerOperator == null)
      {
        return state
      }
      return{
        ...state,
        overwrite: true,
        vorherigerOperator: null,
        operation: null,
        jetztigerOpertator: evaluieren(state)
      }
  }
}

function evaluieren({jetztigerOpertator, vorherigerOperator, operation}) {
  const vorher = parseFloat(vorherigerOperator)
  const jetzt = parseFloat(jetztigerOpertator)
  if(isNaN(vorher) || isNaN(jetzt)) return ""
  let berechnung = ""
  switch (operation){
    case "+":
      berechnung = vorher + jetzt
      break
    case "−":
      berechnung = vorher - jetzt
      break
    case "×":
      berechnung = vorher * jetzt
      break
    case "÷":
      berechnung = vorher / jetzt
      break
  }
  return berechnung.toString();
}

const INT_FORMATTER = new Intl.NumberFormat("de-CH", {
  maximumFractionDigits: 0,
})

function formatOperator(operator) {
  if(operator == null) return
  const [int, dezimal] = operator.split('.')
  if(dezimal == null) return INT_FORMATTER.format(int)
  return `${INT_FORMATTER.format(int)}.${dezimal}`
}

function App() {
  const [{jetztigerOpertator, vorherigerOperator, operation}, dispatch] = useReducer(
    reducer,
    {}
    
  )

  return (
   
    <div className="calculator-grid">
       <title>Frank's calculator</title>
      <div className = "output">
        <div className ="vorheriger-operator">{formatOperator(vorherigerOperator)} {operation}</div>
        <div className = "jetztiger-operator">{formatOperator(jetztigerOpertator)}</div>
      </div>
      <button className="span-zwei" onClick={() => dispatch({type: ACTIONS.LOESCHEN})}>AC</button>
      <button onClick={() => dispatch({type: ACTIONS.ZAHL_ENTFERNEN})}>DEL</button>

      <OperationButton  operation ="÷" dispatch={dispatch}> </OperationButton>

      <ZahlButton  zahl ="1" dispatch={dispatch}> </ZahlButton>
      <ZahlButton  zahl ="2" dispatch={dispatch}> </ZahlButton>
      <ZahlButton  zahl ="3" dispatch={dispatch}> </ZahlButton>

      <OperationButton  operation ="×" dispatch={dispatch}> </OperationButton>
      <ZahlButton  zahl ="4" dispatch={dispatch}> </ZahlButton>
      <ZahlButton  zahl ="5" dispatch={dispatch}> </ZahlButton>
      <ZahlButton  zahl ="6" dispatch={dispatch}> </ZahlButton>
      <OperationButton  operation ="+" dispatch={dispatch}> </OperationButton>
      <ZahlButton  zahl ="7" dispatch={dispatch}> </ZahlButton>
      <ZahlButton  zahl ="8" dispatch={dispatch}> </ZahlButton>
      <ZahlButton  zahl ="9" dispatch={dispatch}> </ZahlButton>
      <OperationButton  operation ="−" dispatch={dispatch}> </OperationButton>
      <ZahlButton  zahl ="." dispatch={dispatch}> </ZahlButton>
      <ZahlButton  zahl ="0" dispatch={dispatch}> </ZahlButton>

      <button className="span-zwei" onClick={() => dispatch({type: ACTIONS.EVALUIEREN})}>=</button>


    </div>
  )
}

export default App;
