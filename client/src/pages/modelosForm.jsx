import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useModelos } from '../context/modelosContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './form.css';

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
    <div className="max-w-2xl mx-auto mt-10 bg-gray-800 p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-white mb-6">{params.id ? "Editar Modelo" : "Crear Modelo"}</h1>
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
          <Form className="space-y-6">
            <div>
              <label htmlFor="idmodelos" className="block text-sm font-medium text-gray-300">ID</label>
              <Field type="number" name="idmodelos" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md" />
              <ErrorMessage name="idmodelos" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="descripcion_modelo" className="block text-sm font-medium text-gray-300">Descripción del modelo</label>
              <Field type="text" name="descripcion_modelo" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md" />
              <ErrorMessage name="descripcion_modelo" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="estado_modelo" className="block text-sm font-medium text-gray-300">Estado del modelo</label>
              <Field as="select" name="estado_modelo" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md">
                <option value="" label="Seleccione una opción"/>
                <option value="Activo" label="Activo"/>
                <option value="Inactivo" label="Inactivo"/>
              </Field>
              <ErrorMessage name="estado_modelo" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="idmarcas" className="block text-sm font-medium text-gray-300">ID de la marca</label>
              <Field type="number" name="idmarcas" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md" />
              <ErrorMessage name="idmarcas" component="div" className="text-red-500 text-sm mt-1" />
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

export default ModelosForm;
