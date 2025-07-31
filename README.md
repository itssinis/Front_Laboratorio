# Front_Laboratorio

Interfaz web construida en **Vue 3 + Vite + Tailwind CSS**, diseñada para el módulo de **Materias Primas** del sistema distribuido de laboratorio. Este frontend consume una API REST externa y permite visualizar materias primas, monitorear el stock, y generar solicitudes de abastecimiento.

---

## 🚀 Tecnologías usadas

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)

---

## Características

- Tabla dinámica de materias primas.
- Visualización de referencia y stock.
- Notificación visual cuando el stock está bajo.
- Botón para generar solicitud a servicio de requisiciones.

---

## Instalación y ejecución local

1. Clona este repositorio:

```bash
git clone https://github.com/itssinis/Front_Laboratorio.git
cd Front_Laboratorio
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo .env y define tu URL de backend:

```env
VITE_API_URL=http://tu-servidor.com/api
```

4. Ejecuta el servidor:

```bash
npm run dev
```

## Despliegue 

Este proyecto está diseñado para ser desplegado con Docker y consumir APIs distribuidas en servidores remotos (como instancias EC2 en AWS).

## Estructura del proyecto

```bash
Front_Laboratorio/
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── views/
│   ├── App.vue
│   └── main.js
├── .env
├── vite.config.js
└── package.json
```