<template>
  <div>
    <!-- Vista de tabla -->
    <PlanosTabla
      v-if="!mostrarFormulario"
      @mostrar-formulario="abrirFormulario"
      @editar-plano="editarPlano"
    />
    
    <!-- Vista de formulario -->
    <CrearPlano
      v-else
      :plano-editar="planoSeleccionado"
      @plano-guardado="planoGuardado"
      @cancelar="cerrarFormulario"
    />
  </div>
</template>

<script>
import PlanosTabla from './PlanosTabla.vue';
import CrearPlano from './CrearPlano.vue';

export default {
  name: 'PlanosManager',
  components: {
    PlanosTabla,
    CrearPlano
  },
  data() {
    return {
      mostrarFormulario: false,
      planoSeleccionado: null
    };
  },
  methods: {
    abrirFormulario() {
      this.mostrarFormulario = true;
      this.planoSeleccionado = null;
    },
    editarPlano(plano) {
      this.planoSeleccionado = plano;
      this.mostrarFormulario = true;
    },
    planoGuardado() {
      this.mostrarFormulario = false;
      this.planoSeleccionado = null;
    },
    cerrarFormulario() {
      this.mostrarFormulario = false;
      this.planoSeleccionado = null;
    }
  }
};
</script>