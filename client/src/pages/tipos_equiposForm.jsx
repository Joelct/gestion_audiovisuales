import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTiposEquipos } from '../context/tipos_equiposContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './form.css';

function TiposEquiposForm() {
  const { createTipoEquipo, getTipoEquipo, updateTipoEquipo } = useTiposEquipos();
  const navigate = useNavigate();
  const params = useParams();
  const [tipoEquipo, setTipoEquipo] = useState({
    id_tipos_equipos: '',
    tipos_equipos_descripcion: '',
    tipos_equipos_estado: ''
  });

  useEffect(() => {
    const loadTipoEquipo = async () => {
      if (params.id) {
        const tipoEquipo = await getTipoEquipo(params.id);
        setTipoEquipo({
          id_tipos_equipos: tipoEquipo.id_tipos_equipos,
          tipos_equipos_descripcion: tipoEquipo.tipos_equipos_descripcion,
          tipos_equipos_estado: tipoEquipo.tipos_equipos_estado
        });
      }
    };
    loadTipoEquipo();
  }, [params.id, getTipoEquipo]);

  return (
    <div>
      <Formik
        initialValues={tipoEquipo}
        validationSchema={Yup.object({
          id_tipos_equipos: Yup.number().required('El ID es obligatorio'),
          tipos_equipos_descripcion: Yup.string().required('La descripción es obligatoria'),
          tipos_equipos_estado: Yup.string().required('El estado es obligatorio'),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          if (params.id) {
            await updateTipoEquipo(params.id, values);
          } else {
            await createTipoEquipo(values);
          }
          setSubmitting(false);
          navigate('/tipos_equipos');
        }}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form className="form-container">
            <div>
              <label htmlFor="id_tipos_equipos">ID</label>
              <Field type="number" name="id_tipos_equipos" />
              <ErrorMessage name="id_tipos_equipos" component="div" />
            </div>
            <div>
              <label htmlFor="tipos_equipos_descripcion">Descripción</label>
              <Field type="text" name="tipos_equipos_descripcion" />
              <ErrorMessage name="tipos_equipos_descripcion" component="div" />
            </div>
            <div>
              <label htmlFor="tipos_equipos_estado">Estado</label>
              <Field type="text" name="tipos_equipos_estado" />
              <ErrorMessage name="tipos_equipos_estado" component="div" />
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

export default TiposEquiposForm;
