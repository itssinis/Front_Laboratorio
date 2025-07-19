<template>
  <div>
    <!-- Vista de tabla -->
    <MateriasTabla
      v-if="!mostrarFormulario"
      @mostrar-formulario="abrirFormulario"
    />
    
    <!-- Vista de formulario -->
    <CrearMateria
      v-else
      @materia-guardada="materiaGuardada"
      @cancelar="cerrarFormulario"
    />
  </div>
</template>

<script>
import MateriasTabla from './MateriasTabla.vue';
import CrearMateria from './CrearMateria.vue';

export default {
  name: 'MateriasManager',
  components: {
    MateriasTabla,
    CrearMateria
  },
  data() {
    return {
      mostrarFormulario: false,
      materiaSeleccionada: null
    };
  },
  methods: {
    abrirFormulario() {
      this.mostrarFormulario = true;
      this.materiaSeleccionada = null;
    },
    materiaGuardada() {
      this.mostrarFormulario = false;
      this.materiaSeleccionada = null;
    },
    cerrarFormulario() {
      this.mostrarFormulario = false;
      this.materiaSeleccionada = null;
    }
  }
};
</script>