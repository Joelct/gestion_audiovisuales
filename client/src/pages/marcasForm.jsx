// MarcasForm.jsx
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { crearMarca, actualizarMarca, obtenerMarcaPorId } from '../api/marcas.api';

function MarcasForm() {
    const { id } = useParams();
    const [marcaData, setMarcaData] = useState(null);

    useEffect(() => {
        if (id) {
            loadMarca(id);
        }
    }, [id]);

    const initialValues = {
        idmarcas: '',
        descripcion_marcas: '',
        estado_marcas: ''
    };

    const validationSchema = Yup.object({
        idmarcas: Yup.number(),
        descripcion_marcas: Yup.string().required('La descripción de la marca es requerida'),
        estado_marcas: Yup.string().required('El estado de la marca es requerido')
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            if (id) {
                await actualizarMarca(id, values);
            } else {
                await crearMarca(values);
            }
            resetForm();
            alert('Marca guardada exitosamente');
        } catch (error) {
            console.error(error);
            alert('Error al guardar la marca');
        } finally {
            setSubmitting(false);
        }
    };

    const loadMarca = async (id) => {
        try {
            const marca = await obtenerMarcaPorId(id);
            setMarcaData(marca);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>{id ? "Editar Marca" : "Crear Marca"}</h1>
            <Formik
                initialValues={marcaData || initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <label htmlFor="idmarcas">ID de la Marca</label>
                            <Field type="number" name="idmarcas" disabled={!!id} />
                            <ErrorMessage name="idmarcas" component="div" />
                        </div>
                        <div>
                            <label htmlFor="descripcion_marcas">Descripción de la Marca</label>
                            <Field type="text" name="descripcion_marcas" />
                            <ErrorMessage name="descripcion_marcas" component="div" />
                        </div>
                        <div>
                            <label htmlFor="estado_marcas">Estado de la Marca</label>
                            <Field as="select" name="estado_marcas">
                                <option value="">Seleccione...</option>
                                <option value="Activa">Activa</option>
                                <option value="Inactiva">Inactiva</option>
                            </Field>
                            <ErrorMessage name="estado_marcas" component="div" />
                        </div>
                        <button type="submit" disabled={isSubmitting}>
                            Guardar marca
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default MarcasForm;
