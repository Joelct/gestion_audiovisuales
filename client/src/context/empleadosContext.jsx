import { createContext, useContext } from "react";

export const EmpleadosContext = createContext();

export const useEmpleados = () => {
   const context = useContext(EmpleadosContext)
   if(!context){
    throw new Error("useEmpleados must be within a Empleados ContextProvider")
   }
   return context;
}

export const EmpleadosContextProvider = ({ children }) => {
    return (
        <EmpleadosContext.Provider value={{ text: "Hello world" }}>
            {children}
        </EmpleadosContext.Provider>
    );
};
