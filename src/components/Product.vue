<template>
  <div v-if="currentProduct" class="edit-form container">
    <h4>Producto</h4>
    <form @submit="updateProduct">
      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input
          type="text"
          class="form-control"
          id="nombre"
          v-model.trim="currentProduct.nombre"
        />
      </div>
      <div class="form-group">
        <label for="description">Descripcion</label>
        <input
          type="text"
          class="form-control"
          id="descripcion"
          v-model.trim="currentProduct.descripcion"
        />
      </div>
    </form>

    <div class="form-group">
      <label><strong>Estado:</strong></label>
      {{ currentProduct.habilitado ? "Habilitado" : "No Habilitado" }}
    </div>
    <div class="d-flex justify-content-start">
      <button
        class="btn btn-primary mr-2"
        @click="updateHabilitado(!currentProduct.habilitado)"
      >
        {{ currentProduct.habilitado ? "Deshabilitar" : "Habilitar" }}
      </button>
    </div>
    <div>
      <label><strong>Imagen:</strong></label>
      <label v-if="currentProduct.imagen == null"> No tiene Imagen</label>
      <img
        v-else
        src="currentProduct.imagen"
        class="img-fluid"
        alt="No se puede renderizar la imagen"
      />
    </div>

    <div class="row">
      <div class="btn-group">
        <button class="btn btn-warning mr p-2 col" @click="$refs.file.click()">
          {{
            currentProduct.imagen == null ? "Agregar Imagen" : "Cambiar Imagen"
          }}
        </button>
        <button
          v-if="currentProduct.imagen"
          class="btn btn-danger p-2 col"
          @click="deleteImage"
        >
          Borrar Imagen
        </button>
      </div>
    </div>
    <div class="py-2" />
    <input
      @change="onFileSelected"
      ref="file"
      class="form-control"
      type="file"
      id="formFile"
      hidden
    />
    <div class="btn-group d-flex justify-content-center">
      <div class="row">
        <button type="submit" class="btn btn-success" @click="updateProduct">
          Actualizar Producto
        </button>
      </div>
    </div>
    <div class="py-2" />
    <div class="btn-group d-flex justify-content-center">
      <div class="row">
        <button class="btn btn-danger mr-2" @click="deleteProduct">
          Eliminar Producto
        </button>
      </div>
    </div>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Por favor seleccion un producto</p>
  </div>
</template>

<script>
import ProductDataService from "../services/ProductDataService";

export default {
  name: "producto",
  data() {
    return {
      currentProduct: null,
      message: "",
      selectedFile: null,
    };
  },
  methods: {
    getProduct(id) {
      ProductDataService.get(id)
        .then(response => {
          this.currentProduct = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    onFileSelected(e) {
      console.log(e.target.files[0]);
      this.selectedFile = e.target.files[0];
      this.currentProduct.imagen = this.selectedFile;

      let data = {
        id: this.currentProduct.id,
        nombre: this.currentProduct.nombre,
        descripcion: this.currentProduct.descripcion,
        habilitado: this.currentProduct.habilitado,
        imagen: this.currentProduct.imagen,
      };
      ProductDataService.update(this.currentProduct.id, data)
        .then(response => {
          console.log(response.data);
          this.message = "Se agrego la imagen exitosamente!";
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteImage() {
      let data = {
        id: this.currentProduct.id,
        nombre: this.currentProduct.nombre,
        descripcion: this.currentProduct.descripcion,
        habilitado: this.currentProduct.habilitado,
        imagen: null,
      };
      ProductDataService.update(this.currentProduct.id, data)
        .then(response => {
          console.log(response.data);
          this.currentProduct.imagen = null;
          this.message = "Se borro la imagen exitosamente!";
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateHabilitado(status) {
      let data = {
        id: this.currentProduct.id,
        nombre: this.currentProduct.nombre,
        descripcion: this.currentProduct.descripcion,
        habilitado: status,
      };

      ProductDataService.update(this.currentProduct.id, data)
        .then(response => {
          console.log(response.data);
          this.currentProduct.habilitado = status;
          this.message = "Se actualizo el estado exitosamente!";
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateProduct() {
      ProductDataService.update(this.currentProduct.id, this.currentProduct)
        .then(response => {
          console.log(response.data);
          this.message = "Se actualizo el producto exitosamente!";
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteProduct() {
      ProductDataService.delete(this.currentProduct.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "productos" });
        })
        .catch(e => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getProduct(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 350px;
  margin: auto;
}
</style>
