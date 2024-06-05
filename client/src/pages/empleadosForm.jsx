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
    cedula_empleados: Yup.string().required('La cédula es requerida'),
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
    <div>
      <h1>{params.id ? "Editar Empleado" : "Crear Empleado"}</h1>
      <Formik
        initialValues={empleadoData || initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting }) => (
          <Form className="form-container">
            <div>
              <label htmlFor="idempleados">ID del Empleado</label>
              <Field type="number" name="idempleados" disabled={!!params.id} />
              <ErrorMessage name="idempleados" component="div" />
            </div>
            <div>
              <label htmlFor="nombre_empleados">Nombre del Empleado</label>
              <Field type="text" name="nombre_empleados" />
              <ErrorMessage name="nombre_empleados" component="div" />
            </div>
            <div>
              <label htmlFor="cedula_empleados">Cédula del Empleado</label>
              <Field type="text" name="cedula_empleados" />
              <ErrorMessage name="cedula_empleados" component="div" />
            </div>
            <div>
              <label htmlFor="tanda_labor">Tanda Laboral</label>
              <Field type="text" name="tanda_labor" />
              <ErrorMessage name="tanda_labor" component="div" />
            </div>
            <div>
              <label htmlFor="fecha_ingreso">Fecha de Ingreso</label>
              <Field type="date" name="fecha_ingreso" />
              <ErrorMessage name="fecha_ingreso" component="div" />
            </div>
            <div>
              <label htmlFor="estado_empleado">Estado del Empleado</label>
              <Field type="text" name="estado_empleado" />
              <ErrorMessage name="estado_empleado" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Guardar empleado
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EmpleadosForm;
