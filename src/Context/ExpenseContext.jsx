import { createContext, useEffect, useReducer } from "react";

export const ExpenseContext = createContext();

function expenseReducer(state, action) {
    switch (action.type) {
    case "ADD":
        return [...state, action.payload];

    case "DELETE":
        return state.filter(item=> item.id !== action.payload)
    
    case "SET":
            return action.payload;

    case "UPDATE":
        return state.map(item => item.id === action.payload.id ? action.payload : item)
     default :
        return state;
    }
  }

export const ExpenseProvider = ({ children }) => {

    const [ expense , dispatch]=useReducer(expenseReducer , [])

    useEffect(()=>{
        const stored = JSON.parse(localStorage.getItem("expense"));
        if(stored) dispatch({type : "SET" , payload : stored})
    },[])
  
    useEffect(()=>{
        localStorage.setItem("expense" ,JSON.stringify(expense))
    },[expense])

    return (
     <ExpenseContext.Provider value={{expense , dispatch}}>
      {children}
     </ExpenseContext.Provider>
    )
};
