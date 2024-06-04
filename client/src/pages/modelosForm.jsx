// src/pages/modelosForm.jsx
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useModelos } from '../context/modelosContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ModelosForm() {
  const { createModelo, getModelo, updateModelo } = useModelos();
  const navigate = useNavigate();
  const params = useParams();
  const [modelo, setModelo] = useState({
    idmodelos: '',
    descripcion_modelo: '',
    estado_modelo: '',
    idmarcas: ''
  });

  useEffect(() => {
    const loadModelo = async () => {
      if (params.id) {
        const modelo = await getModelo(params.id);
        setModelo({
          idmodelos: modelo.idmodelos,
          descripcion_modelo: modelo.descripcion_modelo,
          estado_modelo: modelo.estado_modelo,
          idmarcas: modelo.idmarcas
        });
      }
    };
    loadModelo();
  }, [params.id, getModelo]);

  return (
    <div>
      <Formik
        initialValues={modelo}
        validationSchema={Yup.object({
          idmodelos: Yup.number().required('El ID es obligatorio'),
          descripcion_modelo: Yup.string().required('La descripción es obligatoria'),
          estado_modelo: Yup.string().required('El estado es obligatorio'),
          idmarcas: Yup.number().required('El ID de la marca es obligatorio')
        })}
        onSubmit={async (values, { setSubmitting }) => {
          if (params.id) {
            await updateModelo(params.id, values);
          } else {
            await createModelo(values);
          }
          setSubmitting(false);
          navigate('/modelos');
        }}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="idmodelos">ID</label>
              <Field type="number" name="idmodelos" />
              <ErrorMessage name="idmodelos" component="div" />
            </div>
            <div>
              <label htmlFor="descripcion_modelo">Descripción del modelo</label>
              <Field type="text" name="descripcion_modelo" />
              <ErrorMessage name="descripcion_modelo" component="div" />
            </div>
            <div>
              <label htmlFor="estado_modelo">Estado del modelo</label>
              <Field type="text" name="estado_modelo" />
              <ErrorMessage name="estado_modelo" component="div" />
            </div>
            <div>
              <label htmlFor="idmarcas">ID de la marca</label>
              <Field type="number" name="idmarcas" />
              <ErrorMessage name="idmarcas" component="div" />
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

export default ModelosForm;
