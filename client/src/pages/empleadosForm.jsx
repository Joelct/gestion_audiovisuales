import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import { useEmpleados } from '../context/empleadosContext';
import './form.css';

function EmpleadosForm() {
  const { createEmpleado, updateEmpleado, getEmpleado } = useEmpleados();
  const params = useParams();
  const navigate = useNavigate();
  const [empleadoData, setEmpleadoData] = useState(null);

  const validateCedula = (cedula_empleados) => {
    let numero = 0;
    let resultado = 0;
    let suma = 0;

    for (let i = 0; i < cedula_empleados.length; i++) {
        numero = parseInt(cedula_empleados.charAt(i), 10);
        if (i % 2 !== 0) {
            numero = numero * 2;
            if (numero > 9) {
                numero = numero - 9;
            }
        }
        suma = suma + numero;
    }

    if (suma % 10 !== 0) {
        resultado = 10 - (suma % 10);
        return resultado === numero;
    } else {
        return true;
    }
  };

  useEffect(() => {
    if (params.id) {
      loadEmpleado(params.id);
    }
  }, [params.id]);

  const initialValues = {
    idempleados: '',
    nombre_empleados: '',
    cedula_empleados: '',
    tanda_labor: '',
    fecha_ingreso: '',
    estado_empleado: ''
  };

  const validationSchema = Yup.object({
    idempleados: Yup.number(),
    nombre_empleados: Yup.string().required('El nombre es requerido'),
    cedula_empleados: Yup.string()
    .required('La cédula es requerida')
    .matches(/^\d{11}$/, 'La cédula debe tener 11 dígitos')
    .test('is-valid-cedula', 'La cédula no es válida', value => validateCedula(value)),
    tanda_labor: Yup.string().required('La tanda laboral es requerida'),
    fecha_ingreso: Yup.date().required('La fecha de ingreso es requerida'),
    estado_empleado: Yup.string().required('El estado del empleado es requerido')
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (params.id) {
        await updateEmpleado(params.id, values);
      } else {
        await createEmpleado(values);
      }
      resetForm();
      alert('Empleado guardado exitosamente');
      navigate('/empleados'); // Redireccionar a la página de empleados
    } catch (error) {
      console.error('Error al guardar el empleado:', error);
      alert('Error al guardar el empleado');
    } finally {
      setSubmitting(false);
    }
  };

  const loadEmpleado = async (id) => {
    try {
      const empleado = await getEmpleado(id);
      setEmpleadoData(empleado);
    } catch (error) {
      console.error('Error al cargar el empleado:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-gray-800 p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-white mb-6">{params.id ? "Editar Empleado" : "Crear Empleado"}</h1>
      <Formik
        initialValues={empleadoData || initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <div>
              <label htmlFor="idempleados" className="block text-sm font-medium text-gray-300">ID del Empleado</label>
              <Field type="number" name="idempleados" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md" disabled={!!params.id} />
              <ErrorMessage name="idempleados" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="nombre_empleados" className="block text-sm font-medium text-gray-300">Nombre del Empleado</label>
              <Field type="text" name="nombre_empleados" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md" />
              <ErrorMessage name="nombre_empleados" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="cedula_empleados" className="block text-sm font-medium text-gray-300">Cédula del Empleado</label>
              <Field type="text" name="cedula_empleados" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md" />
              <ErrorMessage name="cedula_empleados" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="tanda_labor" className="block text-sm font-medium text-gray-300">Tanda Laboral</label>
              <Field as="select" name="tanda_labor" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md">
                <option value="" label="Seleccione una opción" />
                <option value="Matutino" label="Matutino" />
                <option value="Vespertino" label="Vespertino" />
                <option value="Nocturno" label="Nocturno" />
              </Field>
              <ErrorMessage name="tanda_labor" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="fecha_ingreso" className="block text-sm font-medium text-gray-300">Fecha de Ingreso</label>
              <Field type="date" name="fecha_ingreso" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md" />
              <ErrorMessage name="fecha_ingreso" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="estado_empleado" className="block text-sm font-medium text-gray-300">Estado del Empleado</label>
              <Field as="select" name="estado_empleado" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md">
                <option value="" label="Seleccione una opción" />
                <option value="Activo" label="Activo" />
                <option value="Inactivo" label="Inactivo" />
              </Field>
              <ErrorMessage name="estado_empleado" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full py-2.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">
              {isSubmitting ? 'Guardando...' : 'Guardar empleado'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EmpleadosForm;
