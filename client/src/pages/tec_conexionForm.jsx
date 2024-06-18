import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTecConexiones } from '../context/tec_conexionContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './form.css';

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
    <div className="max-w-2xl mx-auto mt-10 bg-gray-800 p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-white mb-6">{params.id ? "Editar Conexión Técnica" : "Crear Conexión Técnica"}</h1>
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
          <Form className="space-y-6">
            <div>
              <label htmlFor="idtec_conexion" className="block text-sm font-medium text-gray-300">ID</label>
              <Field type="number" name="idtec_conexion" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md" />
              <ErrorMessage name="idtec_conexion" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="tec_conexion_descrip" className="block text-sm font-medium text-gray-300">Descripción de la conexión técnica</label>
              <Field type="text" name="tec_conexion_descrip" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md" />
              <ErrorMessage name="tec_conexion_descrip" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="tex_conexion_estado" className="block text-sm font-medium text-gray-300">Estado de la conexión técnica</label>
              <Field as="select" name="tex_conexion_estado" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md">
                <option value="" label="Seleccione una opción"/>
                <option value="Activo" label="Activo"/>
                <option value="Inactivo" label="Inactivo"/>
              </Field>
              <ErrorMessage name="tex_conexion_estado" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full py-2.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">
              {isSubmitting ? 'Enviando...' : 'Guardar'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default TecConexionForm;
