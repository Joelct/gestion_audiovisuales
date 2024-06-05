// src/pages/marcasForm.jsx
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMarcas } from '../context/marcasContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './form.css';

function MarcasForm() {
  const { createMarca, getMarca, updateMarca } = useMarcas();
  const navigate = useNavigate();
  const params = useParams();
  const [marca, setMarca] = useState({
    idmarcas: '',
    descripcion_marcas: '',
    estado_marcas: ''
  });

  useEffect(() => {
    const loadMarca = async () => {
      if (params.id) {
        const marca = await getMarca(params.id);
        setMarca({
          idmarcas: marca.idmarcas,
          descripcion_marcas: marca.descripcion_marcas,
          estado_marcas: marca.estado_marcas
        });
      }
    };
    loadMarca();
  }, [params.id, getMarca]);

  return (
    <div>
      <Formik
        initialValues={marca}
        validationSchema={Yup.object({
          idmarcas: Yup.number().required('El ID es obligatorio'),
          descripcion_marcas: Yup.string().required('La descripción es obligatoria'),
          estado_marcas: Yup.string().required('El estado es obligatorio')
        })}
        onSubmit={async (values, { setSubmitting }) => {
          if (params.id) {
            await updateMarca(params.id, values);
          } else {
            await createMarca(values);
          }
          setSubmitting(false);
          navigate('/marcas');
        }}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form className="form-container">
            <div>
              <label htmlFor="idmarcas">ID</label>
              <Field type="number" name="idmarcas" />
              <ErrorMessage name="idmarcas" component="div" />
            </div>
            <div>
              <label htmlFor="descripcion_marcas">Descripción de la marca</label>
              <Field type="text" name="descripcion_marcas" />
              <ErrorMessage name="descripcion_marcas" component="div" />
            </div>
            <div>
              <label htmlFor="estado_marcas">Estado de la marca</label>
              <Field type="text" name="estado_marcas" />
              <ErrorMessage name="estado_marcas" component="div" />
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

export default MarcasForm;
