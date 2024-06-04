import { createContext, useContext, useState } from "react";
import {
  getEmpleadosRequest,
  crearEmpleadoRequest,
  editarEmpleadoRequest,
  deleteEmpleadoRequest,
  getEmpleadoRequest
} from "../api/empleados.api";

const EmpleadosContext = createContext();

export const useEmpleados = () => {
  const context = useContext(EmpleadosContext);
  if (!context) {
    throw new Error("useEmpleados debe estar dentro de un EmpleadosContextProvider");
  }
  return context;
};

export const EmpleadosContextProvider = ({ children }) => {
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadEmpleados = async () => {
    try {
      const response = await getEmpleadosRequest();
      setEmpleados(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error al cargar los empleados");
      setLoading(false);
    }
  };

  const createEmpleado = async (empleado) => {
    try {
      const response = await crearEmpleadoRequest(empleado);
      setEmpleados([...empleados, response.data]);
    } catch (error) {
      setError("Error al crear el empleado");
    }
  };

  const updateEmpleado = async (id, empleado) => {
    try {
      const response = await editarEmpleadoRequest(id, empleado);
      setEmpleados(empleados.map((e) => (e.idempleados === id ? response.data : e)));
    } catch (error) {
      setError("Error al actualizar el empleado");
    }
  };

  const deleteEmpleado = async (id) => {
    try {
      await deleteEmpleadoRequest(id);
      setEmpleados(empleados.filter((empleado) => empleado.idempleados !== id));
    } catch (error) {
      setError("Error al eliminar el empleado");
    }
  };

  return (
    <EmpleadosContext.Provider
      value={{ empleados, loadEmpleados, createEmpleado, updateEmpleado, deleteEmpleado, loading, error }}
    >
      {children}
    </EmpleadosContext.Provider>
  );
};
