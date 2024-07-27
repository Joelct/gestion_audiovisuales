import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useProcesos } from '../context/procesosContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import moment from 'moment';
import './form.css';

function ProcesosForm() {
    const { createProceso, updateProceso, getProceso } = useProcesos();
    const params = useParams();
    const navigate = useNavigate();
    const [procesoData, setProcesoData] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (params.id) {
            loadProceso(params.id);
        }
    }, [params.id]);

    const initialValues = {
        no_prestamo: '',
        empleado: '',
        equipo: '',
        usuario: '',
        fecha_prestamo: '',
        fecha_devolucion: '',
        comentario: '',
        estado: '' 
    };

    const validationSchema = Yup.object({
        no_prestamo: Yup.number(),
        empleado: Yup.string().required('El empleado es requerido'),
        equipo: Yup.string().required('El equipo es requerido'),
        usuario: Yup.string().required('El usuario es requerido'),
        fecha_prestamo: Yup.string().required('La fecha de prestamo requerida'),
        // fecha_devolucion: Yup.string().required('El estado del empleado es requerido'),
        // comentario: Yup.string().required('El estado del empleado es requerido'),
        estado: Yup.string().required('El estado es requerido')
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const formattedValues = {
            ...values
        };

        try {
            if (params.id){
                await updateProceso(params.id, formattedValues);
            } else {
                await createProceso(formattedValues);
            }
            resetForm();
            setSuccessMessage('Proceso guardado exitosamente');
            navigate('/procesos');
        } catch (error) {
            console.error('Error al guardar el proceso:', error);
            alert('Error al guardar el proceso');
        } finally {
            setSubmitting(false);
        }
    };

    const loadProceso = async (id) => {
        try {
            const proceso = await getProceso(id);
            setProcesoData({
                ...proceso,
                fecha_prestamo: moment.utc(proceso.fecha_prestamo).format('YYYY-MM-DD'),
                fecha_devolucion: moment.utc(proceso.fecha_devolucion).format('YYYY-MM-DD')
            });
        } catch (error) {
            console.error('Error al cargar el proceso:', error);
        }
    };
    return (
        <div className="max-w-2xl mx-auto mt-10 bg-gray-800 p-8 rounded-lg shadow-md">
          
          <h1 className="text-2xl font-bold text-white mb-6">{params.id ? "Editar Proceso" : "Crear Proceso"}</h1>
          <Formik
            initialValues={procesoData || initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div>
                  <label htmlFor="no_prestamo" className="block text-sm font-medium text-gray-300">No. del prestamo</label>
                  <Field type="number" name="no_prestamo" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md" disabled={!!params.id} />
                  <ErrorMessage name="no_prestamo" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label htmlFor="empleado" className="block text-sm font-medium text-gray-300">Nombre del Empleado</label>
                  <Field type="text" name="empleado" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md" />
                  <ErrorMessage name="empleado" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label htmlFor="equipo" className="block text-sm font-medium text-gray-300">Equipo</label>
                  <Field type="text" name="equipo" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md" />
                  <ErrorMessage name="equipo" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label htmlFor="usuario" className="block text-sm font-medium text-gray-300">Nombre del usuario</label>
                  <Field type="text" name="usuario" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md" />
                  <ErrorMessage name="usuario" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label htmlFor="fecha_prestamo" className="block text-sm font-medium text-gray-300">Fecha de prestamo</label>
                  <Field type="date" name="fecha_prestamo" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md" />
                  <ErrorMessage name="fecha_prestamo" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label htmlFor="fecha_devolucion" className="block text-sm font-medium text-gray-300">Fecha de devolucion</label>
                  <Field type="date" name="fecha_devolucion" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md" />
                  <ErrorMessage name="fecha_devolucion" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label htmlFor="comentario" className="block text-sm font-medium text-gray-300">Comentario</label>
                  <Field type="text" name="comentario" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md" />
                  <ErrorMessage name="comentario" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label htmlFor="estado" className="block text-sm font-medium text-gray-300">Estado del prestamo</label>
                  <Field as="select" name="estado" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md">
                    <option value="" label="Seleccione una opción" />
                    <option value="En uso" label="En uso" />
                    <option value="Devuelto" label="Devuelto" />
                  </Field>
                  <ErrorMessage name="estado" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full py-2.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">
                  {isSubmitting ? 'Guardando...' : 'Guardar proceso'}
                </button>
              </Form>
            )}
          </Formik>
          {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
        </div> 
      );
    }
    
    export default ProcesosForm;