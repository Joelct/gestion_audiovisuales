// src/pages/tec_conexionForm.jsx
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTecConexiones } from '../context/tec_conexionContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function TecConexionForm() {
  const { createTecConexion, getTecConexion, updateTecConexion } = useTecConexiones();
  const navigate = useNavigate();
  const params = useParams();
  const [tecConexion, setTecConexion] = useState({
    idtec_conexion: '',
    tec_conexion_descrip: '',
    tex_conexion_estado: ''
  });

  useEffect(() => {
    const loadTecConexion = async () => {
      if (params.id) {
        const tecConexion = await getTecConexion(params.id);
        setTecConexion({
          idtec_conexion: tecConexion.idtec_conexion,
          tec_conexion_descrip: tecConexion.tec_conexion_descrip,
          tex_conexion_estado: tecConexion.tex_conexion_estado
        });
      }
    };
    loadTecConexion();
  }, [params.id, getTecConexion]);

  return (
    <div>
      <Formik
        initialValues={tecConexion}
        validationSchema={Yup.object({
          idtec_conexion: Yup.number().required('El ID es obligatorio'),
          tec_conexion_descrip: Yup.string().required('La descripción es obligatoria'),
          tex_conexion_estado: Yup.string().required('El estado es obligatorio'),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          if (params.id) {
            await updateTecConexion(params.id, values);
          } else {
            await createTecConexion(values);
          }
          setSubmitting(false);
          navigate('/tec_conexiones');
        }}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="idtec_conexion">ID</label>
              <Field type="number" name="idtec_conexion" />
              <ErrorMessage name="idtec_conexion" component="div" />
            </div>
            <div>
              <label htmlFor="tec_conexion_descrip">Descripción de la conexión técnica</label>
              <Field type="text" name="tec_conexion_descrip" />
              <ErrorMessage name="tec_conexion_descrip" component="div" />
            </div>
            <div>
              <label htmlFor="tex_conexion_estado">Estado de la conexión técnica</label>
              <Field type="text" name="tex_conexion_estado" />
              <ErrorMessage name="tex_conexion_estado" component="div" />
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

export default TecConexionForm;
