<template>
  <div class="p-6">
    <div class="max-w-2xl mx-auto">
      <h2 class="text-3xl font-bold mb-6 text-gray-800 text-center">
        CREAR NUEVA MATERIA PRIMA
      </h2>
      
      <form @submit.prevent="guardarMateria" class="space-y-6">
        <!-- Nombre de la Materia -->
        <div>
          <label for="nombre" class="block text-sm font-medium text-gray-700 mb-2">
            Nombre de la Materia *
          </label>
          <input
            id="nombre"
            v-model="formulario.nombre"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ej: Acero Inoxidable"
          />
        </div>

        <!-- Referencia -->
        <div>
          <label for="referencia" class="block text-sm font-medium text-gray-700 mb-2">
            Referencia *
          </label>
          <input
            id="referencia"
            v-model="formulario.referencia"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ej: AC-01"
          />
        </div>

        <!-- Unidad -->
        <div>
          <label for="unidad" class="block text-sm font-medium text-gray-700 mb-2">
            Unidad de Medida *
          </label>
          <select
            id="unidad"
            v-model="formulario.unidad"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Seleccionar unidad</option>
            <option value="kg">Kilogramos (kg)</option>
            <option value="g">Gramos (g)</option>
            <option value="l">Litros (l)</option>
            <option value="ml">Mililitros (ml)</option>
            <option value="m">Metros (m)</option>
            <option value="cm">Centímetros (cm)</option>
            <option value="unidad">Unidad</option>
            <option value="paquete">Paquete</option>
          </select>
        </div>

        <!-- Cantidad Disponible -->
        <div>
          <label for="cantidadDisponible" class="block text-sm font-medium text-gray-700 mb-2">
            Cantidad Disponible *
          </label>
          <input
            id="cantidadDisponible"
            v-model.number="formulario.cantidadDisponible"
            type="number"
            min="0"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ej: 200.5"
          />
        </div>

        <!-- Cantidad Mínima de Inventario -->
        <div>
          <label for="cantidadMinimaInventario" class="block text-sm font-medium text-gray-700 mb-2">
            Cantidad Mínima de Inventario *
          </label>
          <input
            id="cantidadMinimaInventario"
            v-model.number="formulario.cantidadMinimaInventario"
            type="number"
            min="0"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ej: 50.0"
          />
          <p class="text-sm text-gray-500 mt-1">
            Cuando el stock baje de este valor, se activará la alerta de reposición
          </p>
        </div>

        <!-- Botones -->
        <div class="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            @click="cancelar"
            class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            :disabled="cargando"
            class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition disabled:opacity-50"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { crearMateria, actualizarMateria } from '../services/api';

export default {
  name: 'CrearMateria',
  props: {
    materiaEditar: {
      type: Object,
      default: null
    }
  },
  emits: ['materia-guardada', 'cancelar'],
  data() {
    return {
      cargando: false,
      formulario: {
        nombre: '',
        referencia: '',
        unidad: '',
        cantidadDisponible: 0,
        cantidadMinimaInventario: 0
      }
    };
  },
  computed: {
    esEdicion() {
      return !!this.materiaEditar;
    }
  },
  watch: {
    materiaEditar: {
      immediate: true,
      handler(materia) {
        if (materia) {
          this.formulario = { ...materia };
        } else {
          this.limpiarFormulario();
        }
      }
    }
  },
  methods: {
    async guardarMateria() {
      this.cargando = true;
      
      try {
        if (this.esEdicion) {
          await actualizarMateria(this.formulario.id, this.formulario);
          alert('Materia actualizada exitosamente');
        } else {
          await crearMateria(this.formulario);
          alert('Materia creada exitosamente');
        }
        
        this.$emit('materia-guardada');
        this.limpiarFormulario();
      } catch (err) {
        console.error('Error guardando materia:', err);
        alert(`Error: ${err.message}`);
      } finally {
        this.cargando = false;
      }
    },
    cancelar() {
      this.limpiarFormulario();
      this.$emit('cancelar');
    },
    limpiarFormulario() {
      this.formulario = {
        nombre: '',
        referencia: '',
        unidad: '',
        cantidadDisponible: 0,
        cantidadMinimaInventario: 0
      };
    }
  }
};
</script>
