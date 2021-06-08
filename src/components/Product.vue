<template>
  <div v-if="currentProduct" class="edit-form">
    <h4>Producto</h4>
    <form>
      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input
          type="text"
          class="form-control"
          id="nombre"
          v-model="currentProduct.nombre"
        />
      </div>
      <div class="form-group">
        <label for="description">Descripcion</label>
        <input
          type="text"
          class="form-control"
          id="descripcion"
          v-model="currentProduct.descripcion"
        />
      </div>

      <div class="form-group">
        <label><strong>Estado:</strong></label>
        {{ currentProduct.habilitado ? "Habilitado" : "No Habilitado" }}
      </div>
      <div>
        <label><strong>Imagen:</strong></label>
        <img src="currentProduct.imagen" class="img-fluid" alt="imagen" />
      </div>
      <div class="form-group">
        <label><strong>Imagen:</strong></label>
        {{ currentProduct.imagen }}
      </div>
    </form>

    <button
      class="btn btn-primary mr-2"
      v-if="currentProduct.habilitado"
      @click="updateHabilitado(false)"
    >
      DesHabilitar
    </button>
    <button v-else class="btn btn-primary mr-2" @click="updateHabilitado(true)">
      Habilitar
    </button>

    <button class="btn btn-danger mr-2" @click="deleteProduct">
      Elimiar
    </button>

    <button type="submit" class="btn btn-success" @click="updateProduct">
      Actualizar
    </button>
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

    updateHabilitado(status) {
      var data = {
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
  max-width: 300px;
  margin: auto;
}
</style>
