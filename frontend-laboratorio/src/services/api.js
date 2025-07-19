import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://ec2-3-142-243-137.us-east-2.compute.amazonaws.com/lab',
  timeout: 10000, // 10 segundos de timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para manejo de errores
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en la API:', error);
    if (error.code === 'ECONNABORTED') {
      console.error('Timeout: La solicitud tardó demasiado');
    } else if (error.response?.status === 404) {
      console.error('Recurso no encontrado');
    } else if (error.response?.status >= 500) {
      console.error('Error del servidor');
    }
    return Promise.reject(error);
  }
);

// ========== FUNCIONES PARA MATERIAS ==========
// Obtener todas las materias primas
export const getMaterias = () => API.get('/materias');

// Crear una nueva materia
export const crearMateria = (materia) => API.post('/materias', materia);

// ========== FUNCIONES PARA PLANOS ==========
// Obtener todos los planos
export const getPlanos = () => API.get('/planos');

// Crear un nuevo plano
export const crearPlano = (plano) => API.post('/planos', plano);

// Actualizar un plano existente
export const actualizarPlano = (id, plano) => {
  return API.put(`/planos/update/${id}`, plano);
};
// Obtener un plano por ID
export const getPlano = (id) => API.get(`/planos/${id}`);

// Aquí luego podrás agregar la función para enviar una requisición real
// export const solicitarRequisicion = (data) => axios.post('http://.../requisiciones', data);
