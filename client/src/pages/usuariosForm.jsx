// src/pages/usuariosForm.jsx
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useUsuarios } from '../context/usuariosContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function UsuariosForm() {
  const { createUsuario, getUsuario, updateUsuario } = useUsuarios();
  const navigate = useNavigate();
  const params = useParams();
  const [usuario, setUsuario] = useState({
    nombre_usuario: '',
    cedula_usuario: '',
    no_carnet: '',
    tipo_usuario: '',
    tipo_persona: '',
    estado_usuario: ''
  });

  useEffect(() => {
    const loadUsuario = async () => {
      if (params.id) {
        const usuario = await getUsuario(params.id);
        setUsuario({
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
    <div>
      <Formik
        initialValues={usuario}
        validationSchema={Yup.object({
          nombre_usuario: Yup.string().required('El nombre es obligatorio'),
          cedula_usuario: Yup.number().required('La cédula es obligatoria'),
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
          <Form>
            <div>
              <label htmlFor="nombre_usuario">Nombre</label>
              <Field type="text" name="nombre_usuario" />
              <ErrorMessage name="nombre_usuario" component="div" />
            </div>
            <div>
              <label htmlFor="cedula_usuario">Cédula</label>
              <Field type="number" name="cedula_usuario" />
              <ErrorMessage name="cedula_usuario" component="div" />
            </div>
            <div>
              <label htmlFor="no_carnet">Número de Carnet</label>
              <Field type="text" name="no_carnet" />
              <ErrorMessage name="no_carnet" component="div" />
            </div>
            <div>
              <label htmlFor="tipo_usuario">Tipo de Usuario</label>
              <Field type="text" name="tipo_usuario" />
              <ErrorMessage name="tipo_usuario" component="div" />
            </div>
            <div>
              <label htmlFor="tipo_persona">Tipo de Persona</label>
              <Field type="text" name="tipo_persona" />
              <ErrorMessage name="tipo_persona" component="div" />
            </div>
            <div>
              <label htmlFor="estado_usuario">Estado</label>
              <Field type="text" name="estado_usuario" />
              <ErrorMessage name="estado_usuario" component="div" />
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

export default UsuariosForm;
