<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navegación -->
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-center space-x-8 py-4">
          <button
            @click="seccionActual = 'materias'"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition',
              seccionActual === 'materias'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:text-blue-500'
            ]"
          >
            Materias Primas
          </button>
          <button
            @click="seccionActual = 'planos'"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition',
              seccionActual === 'planos'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:text-blue-500'
            ]"
          >
            Planos
          </button>
        </div>
      </div>
    </nav>

    <!-- Contenido -->
    <main class="max-w-7xl mx-auto py-6">
      <!-- Gestión completa de materias -->
      <MateriasManager v-if="seccionActual === 'materias'" />
      
      <!-- Gestión completa de planos -->
      <PlanosManager v-if="seccionActual === 'planos'" />
    </main>
  </div>
</template>

<script>
import MateriasManager from './components/MateriasManager.vue';
import PlanosManager from './components/PlanosManager.vue';

export default {
  name: 'App',
  components: {
    MateriasManager,
    PlanosManager
  },
  data() {
    return {
      seccionActual: 'materias'
    };
  }
};
</script>