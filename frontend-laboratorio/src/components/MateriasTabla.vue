<template>
  <div class="p-6">
    <!-- Header con título y botón alineados -->
    <div class="flex justify-between items-center mb-9">
      <h2 class="text-4xl font-bold text-gray-800">MATERIAS PRIMAS</h2>
      <button
        @click="$emit('mostrar-formulario')"
        class="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
      >
        + Agregar Materia
      </button>
    </div>
    <div class="overflow-x-auto rounded shadow">
      <table class="min-w-full text-sm text-center border border-gray-300">
        <thead class="bg-gray-100 text-gray-700 uppercase tracking-wider">
          <tr>
            <th class="px-4 py-3">Nombre</th>
            <th class="px-4 py-3">Referencia</th>
            <th class="px-4 py-3">Unidad</th>
            <th class="px-4 py-3">Stock</th>
            <th class="px-4 py-3">Estado</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr
            v-if="materias.length === 0"
            class="text-center text-gray-500"
          >
            <td colspan="6" class="px-4 py-2">
              No hay materias registradas.
            </td>
          </tr>
          <tr
            v-for="materia in materias"
            :key="materia.id"
            class="hover:bg-gray-50 transition"
          >
            <td class="px-4 py-2 font-medium text-gray-800">
              {{ materia.nombre }}
            </td>
            <td class="px-4 py-2">
              {{ materia.referencia }}
            </td>
            <td class="px-4 py-2">
              {{ materia.unidad }}
            </td>
            <td class="px-4 py-2">  
              <span
                :class="materia.cantidadDisponible < materia.cantidadMinimaInventario
                  ? 'bg-red-100 text-red-800'
                  : 'bg-green-100 text-green-800'
                "
                class="px-2 py-1 rounded text-xs font-semibold"
              >
                {{ materia.cantidadDisponible }}
              </span>
            </td>
            <td class="px-4 py-2">
              <button
                v-if="materia.cantidadDisponible < materia.cantidadMinimaInventario"
                :disabled="solicitudesEnviadas.includes(materia.id)"
                @click="solicitarReposicion(materia)"
                :class="[
                  'px-3 py-1 rounded text-sm font-semibold transition',
                  solicitudesEnviadas.includes(materia.id)
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    : 'bg-red-500 text-white hover:bg-red-600'
                ]"
              >
                {{ solicitudesEnviadas.includes(materia.id)
                  ? 'Solicitud enviada'
                  : 'Solicitar reposición' }}
              </button>
              <span
                v-else
                class="text-gray-400 italic text-sm"
              >
                Stock suficiente
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { getMaterias } from '../services/api';

export default {
  name: 'MateriasTabla',
  emits: ['mostrar-formulario', 'editar-materia'],
  data() {
    return {
      materias: [],
      solicitudesEnviadas: [] // IDs de materias ya solicitadas
    };
  },
  methods: {
    async cargarMaterias() {
      try {
        const res = await getMaterias();
        this.materias = res.data;
      } catch (err) {
        console.error('Error cargando materias:', err);
      }
    },
    solicitarReposicion(materia) {
      // Simular la solicitud
      alert(`Solicitud enviada para: ${materia.nombre}`);
      console.log('Materia a reponer:', materia);

      // Agregar ID a la lista de solicitudes enviadas
      this.solicitudesEnviadas.push(materia.id);

      // En un futuro, reemplaza esto con una solicitud real:
      // await solicitarRequisicion({ materiaId: materia.id, cantidadNecesaria: ... });
    }
  },
  mounted() {
    this.cargarMaterias();
  }
};
</script>