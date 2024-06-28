import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { useEquipos } from '../context/equiposContext';
import { crearEquipoRequest, editarEquipoRequest, getEquipoRequest } from '../api/equipos.api';
import './form.css';

function EquiposForm() {
    const { createEquipo } = useEquipos();
    const params = useParams();
    const [equipoData, setEquipoData] = useState(null);

    useEffect(() => {
        if (params.id) {
            loadEquipo(params.id);
        }
    }, []);

    const initialValues = {
        idequipos: '',
        descripcion_equipo: '',
        no_serial: '',
        serv_tag: '',
        tipo_equipo: '',
        descripcion_marca: '',
        descripcion_modelo: '',
        tec_conexion_descrip: '',
        estado_equipo: ''
    };

    const validationSchema = Yup.object({
        idequipos: Yup.number(),
        descripcion_equipo: Yup.string().required('La descripción del equipo es requerida'),
        no_serial: Yup.number().required('El número de serie es requerido'),
        serv_tag: Yup.string().required('El Service Tag es requerido'),
        tipo_equipo: Yup.string().required('El tipo de equipo es requerido'),
        descripcion_marca: Yup.string().required('La descripción de la marca es requerida'),
        descripcion_modelo: Yup.string().required('La descripción del modelo es requerida'),
        tec_conexion_descrip: Yup.string().required('La descripción de la conexión técnica es requerida'),
        estado_equipo: Yup.string().required('El estado del equipo es requerido')
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            if (params.id) {
                await editarEquipoRequest(params.id, values);
            } else {
                await crearEquipoRequest(values);
            }
            resetForm();
            alert('Equipo guardado exitosamente');
        } catch (error) {
            console.error(error);
            alert('Error al guardar el equipo');
        } finally {
            setSubmitting(false);
        }
    };

    const loadEquipo = async (id) => {
        try {
            const equipo = await getEquipoRequest(id);
            setEquipoData(equipo);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-gray-800 p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-white mb-6">{params.id ? "Editar Equipo" : "Crear Equipo"}</h1>
            <Formik
                initialValues={equipoData || initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-6">
                        <div>
                            <label htmlFor="idequipos" className="block text-sm font-medium text-gray-300">ID del Equipo</label>
                            <Field type="number" name="idequipos" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md" disabled={!!params.id} />
                            <ErrorMessage name="idequipos" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                            <label htmlFor="descripcion_equipo" className="block text-sm font-medium text-gray-300">Descripción del Equipo</label>
                            <Field type="text" name="descripcion_equipo" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md" />
                            <ErrorMessage name="descripcion_equipo" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                            <label htmlFor="no_serial" className="block text-sm font-medium text-gray-300">Número de Serie</label>
                            <Field type="number" name="no_serial" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md" />
                            <ErrorMessage name="no_serial" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                            <label htmlFor="serv_tag" className="block text-sm font-medium text-gray-300">Service Tag</label>
                            <Field type="text" name="serv_tag" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md" />
                            <ErrorMessage name="serv_tag" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                            <label htmlFor="tipo_equipo" className="block text-sm font-medium text-gray-300">Tipo de Equipo</label>
                            <Field type="text" name="tipo_equipo" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md" />
                            <ErrorMessage name="tipo_equipo" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                            <label htmlFor="descripcion_marca" className="block text-sm font-medium text-gray-300">Descripción de la Marca</label>
                            <Field type="text" name="descripcion_marca" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md" />
                            <ErrorMessage name="descripcion_marca" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                            <label htmlFor="descripcion_modelo" className="block text-sm font-medium text-gray-300">Descripción del Modelo</label>
                            <Field type="text" name="descripcion_modelo" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md" />
                            <ErrorMessage name="descripcion_modelo" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                            <label htmlFor="tec_conexion_descrip" className="block text-sm font-medium text-gray-300">Descripción de la Conexión Técnica</label>
                            <Field type="text" name="tec_conexion_descrip" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md" />
                            <ErrorMessage name="tec_conexion_descrip" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                            <label htmlFor="estado_equipo" className="block text-sm font-medium text-gray-300">Estado del Equipo</label>
                            <Field as="select" name="estado_equipo" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md">
                                <option value="" label="Seleccione una opción" />
                                <option value="Activo" label="Activo" />
                                <option value="Inactivo" label="Inactivo" />
                            </Field>
                            <ErrorMessage name="estado_equipo" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <button type="submit" disabled={isSubmitting} className="w-full py-2.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">
                            {isSubmitting ? 'Guardando...' : 'Guardar equipo'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default EquiposForm;
