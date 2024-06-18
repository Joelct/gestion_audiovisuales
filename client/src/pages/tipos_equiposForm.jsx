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
    <div className="max-w-2xl mx-auto mt-10 bg-gray-800 p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-white mb-6">{params.id ? "Editar Tipo de Equipo" : "Crear Tipo de Equipo"}</h1>
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
          <Form className="space-y-6">
            <div>
              <label htmlFor="id_tipos_equipos" className="block text-sm font-medium text-gray-300">ID</label>
              <Field type="number" name="id_tipos_equipos" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md" />
              <ErrorMessage name="id_tipos_equipos" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="tipos_equipos_descripcion" className="block text-sm font-medium text-gray-300">Descripción</label>
              <Field type="text" name="tipos_equipos_descripcion" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md" />
              <ErrorMessage name="tipos_equipos_descripcion" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="tipos_equipos_estado" className="block text-sm font-medium text-gray-300">Estado</label>
              <Field as="select" name="tipos_equipos_estado" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md">
                <option value="" label="Seleccione una opción"/>
                <option value="Activo" label="Activo"/>
                <option value="Inactivo" label="Inactivo"/>
              </Field>
              <ErrorMessage name="tipos_equipos_estado" component="div" className="text-red-500 text-sm mt-1" />
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

export default TiposEquiposForm;
