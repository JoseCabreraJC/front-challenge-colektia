<template>
  <form @submit.prevent="saveProduct" class="submit-form">
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
        <input
          class="form-control"
          type="file"
          id="formFile"
          @change="onFileSelected"
        />
      </div>

      <button @click="saveProduct" class="btn btn-success">Enviar</button>
    </div>

    <div v-else>
      <h4>Se guardo correctamente!</h4>
      <button class="btn btn-success" @click="newProduct">
        Agregar otro Producto
      </button>
    </div>
  </form>
</template>
<script>
import ProductDataService from "../services/ProductDataService";
// import ImageDataService from "../services/ImageDataService";

export default {
  name: "add-product",
  data() {
    return {
      selectedFile: null,
      producto: {
        id: null,
        nombre: "",
        descripcion: "",
        habilitado: false,
        imagen: null,
      },
      submitted: false,
    };
  },
  methods: {
    saveProduct() {
      let data = {
        nombre: this.producto.nombre,
        descripcion: this.producto.descripcion,
        habilitado: this.producto.habilitado,
        imagen: this.producto.imagen,
      };
      console.log(data);

      ProductDataService.create(data)
        .then(response => {
          console.log(response.data);
          this.producto.id = response.data.id;
          // ImageDataService.create(this.producto.imagen);
          // console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },

    onFileSelected(event) {
      console.log(event.target.files[0]);
      // let fd = new FormData();
      this.selectedFile = event.target.files[0];
      this.producto.imagen = this.selectedFile;
      // fd.append("file", this.selectedFile);
      // console.log(Array.from(fd));
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
