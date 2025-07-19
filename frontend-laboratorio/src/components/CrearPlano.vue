<template>
  <div class="p-6">
    <div class="max-w-2xl mx-auto">
      <h2 class="text-3xl font-bold mb-6 text-gray-800 text-center">
        {{ esEdicion ? 'EDITAR PLANO' : 'CREAR NUEVO PLANO' }}
      </h2>
      
      <form @submit.prevent="guardarPlano" class="space-y-6">
        <!-- Número del Plano -->
        <div>
          <label for="numero" class="block text-sm font-medium text-gray-700 mb-2">
            Código del Plano *
          </label>
          <input
            id="codigo"
            v-model="formulario.codigo"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ej: PLN-001"
          />
        </div>

        <!-- Descripción -->
        <div>
          <label for="descripcion" class="block text-sm font-medium text-gray-700 mb-2">
            Descripción
          </label>
          <textarea
            id="descripcion"
            v-model="formulario.descripcion"
            rows="4"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Descripción detallada del plano..."
          ></textarea>
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
            {{ cargando ? 'Guardando...' : 'Guardar' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { crearPlano, actualizarPlano } from '../services/api';

export default {
  name: 'CrearPlano',
  props: {
    planoEditar: {
      type: Object,
      default: null
    }
  },
  emits: ['plano-guardado', 'cancelar'],
  data() {
    return {
      cargando: false,
      formulario: {
        numero: '',
        nombre: '',
        descripcion: '',
        estado: 'ACTIVO'
      }
    };
  },
  computed: {
    esEdicion() {
      return !!this.planoEditar;
    }
  },
  watch: {
    planoEditar: {
      immediate: true,
      handler(plano) {
        if (plano) {
          this.formulario = { ...plano };
        } else {
          this.limpiarFormulario();
        }
      }
    }
  },
  methods: {
    async guardarPlano() {
      this.cargando = true;
      
      try {
        if (this.esEdicion) {
          await actualizarPlano(this.formulario.id, this.formulario);
          alert('Plano actualizado exitosamente');
        } else {
          await crearPlano(this.formulario);
          alert('Plano creado exitosamente');
        }
        
        this.$emit('plano-guardado');
        this.limpiarFormulario();
      } catch (err) {
        console.error('Error guardando plano:', err);
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
        numero: '',
        nombre: '',
        descripcion: '',
        estado: 'ACTIVO'
      };
    }
  }
};
</script>
