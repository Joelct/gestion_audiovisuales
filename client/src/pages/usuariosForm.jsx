import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useUsuarios } from '../context/usuariosContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './form.css';

function UsuariosForm() {
  const { createUsuario, getUsuario, updateUsuario } = useUsuarios();
  const navigate = useNavigate();
  const params = useParams();
  const [usuario, setUsuario] = useState({
    idusuarios: '',
    nombre_usuario: '',
    cedula_usuario: '',
    no_carnet: '',
    tipo_usuario: '',
    tipo_persona: '',
    estado_usuario: ''
  });

  // Validación de cédula
  const validateCedula = (cedula_usuario) => {
    let numero = 0;
    let resultado = 0;
    let suma = 0;

    for (let i = 0; i < cedula_usuario.length; i++) {
      numero = parseInt(cedula_usuario.charAt(i), 10);
      if (i % 2 !== 0) {
        numero = numero * 2;
        if (numero > 9) {
          numero = numero - 9;
        }
      }
      suma = suma + numero;
    }

    if (suma % 10 !== 0) {
      resultado = 10 - (suma % 10);
      return resultado === numero;
    } else {
      return true;
    }
  };

  useEffect(() => {
    const loadUsuario = async () => {
      if (params.id) {
        const usuario = await getUsuario(params.id);
        setUsuario({
          idusuarios: usuario.idusuarios,
          nombre_usuario: usuario.nombre_usuario,
          cedula_usuario: usuario.cedula_usuario,
          no_carnet: usuario.no_carnet,
          tipo_usuario: usuario.tipo_usuario,
          tipo_persona: usuario.tipo_persona,
          estado_usuario: usuario.estado_usuario
        });
      }
    };
    loadUsuario();
  }, [params.id, getUsuario]);

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-gray-800 p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-white mb-6">{params.id ? "Editar Usuario" : "Crear Usuario"}</h1>
      <Formik
        initialValues={usuario}
        validationSchema={Yup.object({
          idusuarios: Yup.number(),
          nombre_usuario: Yup.string().required('El nombre es obligatorio'),
          cedula_usuario: Yup.string()
            .required('La cédula es requerida')
            .matches(/^\d{11}$/, 'La cédula debe tener 11 dígitos')
            .test('is-valid-cedula', 'La cédula no es válida', value => validateCedula(value)),
          no_carnet: Yup.string().required('El número de carnet es obligatorio'),
          tipo_usuario: Yup.string().required('El tipo de usuario es obligatorio'),
          tipo_persona: Yup.string().required('El tipo de persona es obligatorio'),
          estado_usuario: Yup.string().required('El estado es obligatorio'),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          if (params.id) {
            await updateUsuario(params.id, values);
          } else {
            await createUsuario(values);
          }
          setSubmitting(false);
          navigate('/usuarios');
        }}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <div>
              <label htmlFor="idusuarios" className="block text-sm font-medium text-gray-300">ID del usuario</label>
              <Field type="number" name="idusuarios" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md" disabled={!!params.id} />
              <ErrorMessage name="idusuarios" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="nombre_usuario" className="block text-sm font-medium text-gray-300">Nombre</label>
              <Field type="text" name="nombre_usuario" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md" />
              <ErrorMessage name="nombre_usuario" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="cedula_usuario" className="block text-sm font-medium text-gray-300">Cédula</label>
              <Field type="number" name="cedula_usuario" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md" />
              <ErrorMessage name="cedula_usuario" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="no_carnet" className="block text-sm font-medium text-gray-300">Número de Carnet</label>
              <Field type="text" name="no_carnet" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md" />
              <ErrorMessage name="no_carnet" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="tipo_usuario" className="block text-sm font-medium text-gray-300">Tipo de Usuario</label>
              <Field as="select" name="tipo_usuario" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md">
                <option value="" label="Seleccione una opción"/>
                <option value="Estudiante" label="Estudiante"/>
                <option value="Profesor" label="Profesor"/>
                <option value="Técnico" label="Técnico"/>
              </Field>
              <ErrorMessage name="tipo_usuario" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="tipo_persona" className="block text-sm font-medium text-gray-300">Tipo de Persona</label>
              <Field as="select" name="tipo_persona" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md">
                <option value="" label="Seleccione una opción"/>
                <option value="Fisica" label="Física"/>
                <option value="Juridica" label="Jurídica"/>
              </Field>
              <ErrorMessage name="tipo_persona" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="estado_usuario" className="block text-sm font-medium text-gray-300">Estado</label>
              <Field as="select" name="estado_usuario" className="mt-1 block w-full p-2.5 bg-gray-700 text-white rounded-md">
                <option value="" label="Seleccione una opción"/>
                <option value="Activo" label="Activo"/>
                <option value="Inactivo" label="Inactivo"/>
              </Field>
              <ErrorMessage name="estado_usuario" component="div" className="text-red-500 text-sm mt-1" />
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

export default UsuariosForm;
