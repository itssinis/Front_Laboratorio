<template>
  <div class="p-6">
    <!-- Header con título y botón alineados -->
    <div class="flex justify-between items-center mb-9">
      <h2 class="text-4xl font-bold text-gray-800">PLANOS</h2>
      <button
        @click="$emit('mostrar-formulario')"
        class="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
      >
        + Agregar Plano
      </button>
    </div>
    <div class="overflow-x-auto rounded shadow">
      <table class="min-w-full text-sm text-center border border-gray-300">
        <thead class="bg-gray-100 text-gray-700 uppercase tracking-wider">
          <tr>
            <th class="px-4 py-3">Código</th>
            <th class="px-4 py-3">Descripción</th>
            <th class="px-4 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr
            v-if="planos.length === 0"
            class="text-center text-gray-500"
          >
            <td colspan="6" class="px-4 py-2">
              No hay planos registrados.
            </td>
          </tr>
          <tr
            v-for="plano in planos"
            :key="plano.id"
            class="hover:bg-gray-50 transition"
          >
            <td class="px-4 py-2 font-medium text-gray-800 text-center">
              {{ plano.codigo }}
            </td>
            <td class="px-4 py-2">
              {{ plano.descripcion }}
            </td>
            <td class="px-4 py-2">
              <div class="flex space-x-2 justify-center">
                <button
                  @click="editarPlano(plano)"
                  class="px-3 py-1 bg-blue-500 text-white rounded text-sm font-semibold hover:bg-blue-600 transition"
                >
                  Editar
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { getPlanos } from '../services/api';

export default {
  name: 'PlanosTabla',
  emits: ['mostrar-formulario', 'editar-plano'],
  data() {
    return {
      planos: []
    };
  },
  methods: {
    async cargarPlanos() {
      try {
        const res = await getPlanos();
        this.planos = res.data;
      } catch (err) {
        // Mostrar mensaje al usuario
        alert(`Error conectando con la API: ${err.message}`);
      }
    },
    editarPlano(plano) {
      this.$emit('editar-plano', plano);
    },
  },
  mounted() {
    this.cargarPlanos();
  }
};
</script>
