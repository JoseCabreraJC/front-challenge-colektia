<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Nombre</label>
        <input
          type="text"
          class="form-control"
          id="nombre"
          required
          v-model="producto.nombre"
          name="nombre"
        />
      </div>

      <div class="form-group">
        <label for="description">Descripcion</label>
        <input
          class="form-control"
          id="descripcion"
          required
          v-model="producto.descripcion"
          name="descripcion"
        />
      </div>

      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          id="habilitado"
          v-model="producto.habilitado"
          name="habilitado"
        />
        <label class="form-check-label" for="habilitado">Habilitado</label>
      </div>
      <div class="mb-3">
        <label for="formFile" class="form-label">Agregar una imagen</label>
        <input class="form-control" type="file" id="formFile" />
      </div>

      <button @click="saveProduct" class="btn btn-success">Enviar</button>
    </div>

    <div v-else>
      <h4>Se guardo correctamente!</h4>
      <button class="btn btn-success" @click="newProduct">Agregar</button>
    </div>
  </div>
</template>

<script>
import ProductDataService from "../services/ProductDataService";

export default {
  name: "add-product",
  data() {
    return {
      producto: {
        id: null,
        nombre: "",
        descripcion: "",
        habilitado: false,
      },
      submitted: false,
    };
  },
  methods: {
    saveProduct() {
      var data = {
        nombre: this.producto.nombre,
        descripcion: this.producto.descripcion,
        habilitado: this.producto.habilitado,
      };

      ProductDataService.create(data)
        .then(response => {
          this.producto.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },

    newProduct() {
      this.submitted = false;
      this.producto = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
