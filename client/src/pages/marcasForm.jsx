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
    <div className="max-w-2xl mx-auto mt-10 bg-gray-800 p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-white mb-6">{params.id ? "Editar Marca" : "Crear Marca"}</h1>
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
          <Form className="space-y-6">
            <div>
              <label htmlFor="idmarcas" className="block text-sm font-medium text-gray-300">ID</label>
              <Field type="number" name="idmarcas" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md" />
              <ErrorMessage name="idmarcas" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="descripcion_marcas" className="block text-sm font-medium text-gray-300">Descripción de la marca</label>
              <Field type="text" name="descripcion_marcas" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md" />
              <ErrorMessage name="descripcion_marcas" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="estado_marcas" className="block text-sm font-medium text-gray-300">Estado de la marca</label>
              <Field as="select" name="estado_marcas" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md">
                <option value="" label="Seleccione una opción"/>
                <option value="Activo" label="Activo"/>
                <option value="Inactivo" label="Inactivo"/>
              </Field>
              <ErrorMessage name="estado_marcas" component="div" className="text-red-500 text-sm mt-1" />
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

export default MarcasForm;
