import { Form, Formik, Field, ErrorMessage } from 'formik';
import { crearEmpleadoRequest } from '../api/empleados.api.js';
import * as Yup from 'yup';

function EmpleadosForm() {
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
      await crearEmpleadoRequest(values);
      resetForm();
      alert('Empleado creado exitosamente');
    } catch (error) {
      console.error(error);
      alert('Error al crear el empleado');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="idempleados">Id empleado</label>
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
              Crear empleado
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EmpleadosForm;
