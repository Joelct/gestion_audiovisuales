import React, { useEffect, useState } from 'react';
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
        <div className="form-container">
            <h1>{params.id ? "Editar Equipo" : "Crear Equipo"}</h1>
            <Formik
                initialValues={equipoData || initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <label htmlFor="idequipos">ID del Equipo</label>
                            <Field type="number" name="idequipos" disabled={!!params.id} />
                            <ErrorMessage name="idequipos" component="div" />
                        </div>
                        <div>
                            <label htmlFor="descripcion_equipo">Descripción del Equipo</label>
                            <Field type="text" name="descripcion_equipo" />
                            <ErrorMessage name="descripcion_equipo" component="div" />
                        </div>
                        <div>
                            <label htmlFor="no_serial">Número de Serie</label>
                            <Field type="number" name="no_serial" />
                            <ErrorMessage name="no_serial" component="div" />
                        </div>
                        <div>
                            <label htmlFor="serv_tag">Service Tag</label>
                            <Field type="text" name="serv_tag" />
                            <ErrorMessage name="serv_tag" component="div" />
                        </div>
                        <div>
                            <label htmlFor="tipo_equipo">Tipo de Equipo</label>
                            <Field type="text" name="tipo_equipo" />
                            <ErrorMessage name="tipo_equipo" component="div" />
                        </div>
                        <div>
                            <label htmlFor="descripcion_marca">Descripción de la Marca</label>
                            <Field type="text" name="descripcion_marca" />
                            <ErrorMessage name="descripcion_marca" component="div" />
                        </div>
                        <div>
                            <label htmlFor="descripcion_modelo">Descripción del Modelo</label>
                            <Field type="text" name="descripcion_modelo" />
                            <ErrorMessage name="descripcion_modelo" component="div" />
                        </div>
                        <div>
                            <label htmlFor="tec_conexion_descrip">Descripción de la Conexión Técnica</label>
                            <Field type="text" name="tec_conexion_descrip" />
                            <ErrorMessage name="tec_conexion_descrip" component="div" />
                        </div>
                        <div>
                            <label htmlFor="estado_equipo">Estado del Equipo</label>
                            <Field type="text" name="estado_equipo" />
                            <ErrorMessage name="estado_equipo" component="div" />
                        </div>
                        <button type="submit" disabled={isSubmitting}>
                            Guardar equipo
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default EquiposForm;
