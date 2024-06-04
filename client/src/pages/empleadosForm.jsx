import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { useEmpleados } from '../context/empleadosContext';
import { crearEmpleadoRequest, editarEmpleadoRequest, getEmpleadoRequest } from '../api/empleados.api';

function EmpleadosForm() {
  const { createEmpleado, updateEmpleado } = useEmpleados();
  const params = useParams();
  const [empleadoData, setEmpleadoData] = useState(null);

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
    idempleados: Yup.number().required('El ID del empleado es obligatorio'),
    nombre_empleados: Yup.string().required('El nombre del empleado es obligatorio'),
    cedula_empleados: Yup.number().required('La cédula del empleado es obligatoria'),
    tanda_labor: Yup.string().required('La tanda laboral es obligatoria'),
    fecha_ingreso: Yup.date().required('La fecha de ingreso es obligatoria'),
    estado_empleado: Yup.string().required('El estado del empleado es obligatorio')
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
    } catch (error) {
      console.error(error);
      alert('Error al guardar el empleado');
    } finally {
      setSubmitting(false);
    }
  };

  const loadEmpleado = async (id) => {
    try {
      const response = await getEmpleadoRequest(id);
      setEmpleadoData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{params.id ? "Editar Empleado" : "Crear Empleado"}</h1>
      <Formik
        initialValues={empleadoData || initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="idempleados">ID</label>
              <Field type="number" name="idempleados" />
              <ErrorMessage name="idempleados" component="div" />
            </div>
            <div>
              <label htmlFor="nombre_empleados">Nombre</label>
              <Field type="text" name="nombre_empleados" />
              <ErrorMessage name="nombre_empleados" component="div" />
            </div>
            <div>
              <label htmlFor="cedula_empleados">Cédula</label>
              <Field type="number" name="cedula_empleados" />
              <ErrorMessage name="cedula_empleados" component="div" />
            </div>
            <div>
              <label htmlFor="tanda_labor">Tanda laboral</label>
              <Field type="text" name="tanda_labor" />
              <ErrorMessage name="tanda_labor" component="div" />
            </div>
            <div>
              <label htmlFor="fecha_ingreso">Fecha de ingreso</label>
              <Field type="date" name="fecha_ingreso" />
              <ErrorMessage name="fecha_ingreso" component="div" />
            </div>
            <div>
              <label htmlFor="estado_empleado">Estado</label>
              <Field as="select" name="estado_empleado">
                <option value="">Seleccione un estado</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </Field>
              <ErrorMessage name="estado_empleado" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Guardar'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EmpleadosForm;
