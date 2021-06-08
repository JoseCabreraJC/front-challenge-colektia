<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Buscar por Nombre"
          v-model="nombre"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchNombre"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Lista de Productos</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(product, index) in products"
          :key="index"
          @click="setActiveProduct(product, index)"
        >
          {{ product.nombre }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="deleteAllProducts">
        Eliminar Todos
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentProduct">
        <h4>Producto</h4>
        <div>
          <label><strong>Nombre:</strong></label> {{ currentProduct.nombre }}
        </div>
        <div>
          <label><strong>Descripcion:</strong></label>
          {{ currentProduct.descripcion }}
        </div>
        <div>
          <label><strong>Estado:</strong></label>
          {{ currentProduct.habilitado ? "Habilitado" : "No Habilitado" }}
        </div>
        <router-link
          :to="'/productos/' + currentProduct.id"
          class="btn btn-warning"
          >Editar</router-link
        >
      </div>
      <div v-else>
        <br />
        <p>Por favor haga click en un Tutorial</p>
      </div>
    </div>
  </div>
</template>

<script>
import ProductDataService from "../services/ProductDataService";

export default {
  name: "tutorials-list",
  data() {
    return {
      products: [],
      currentproduct: null,
      currentIndex: -1,
      nombre: "",
    };
  },
  methods: {
    retrieveProducts() {
      ProductDataService.getAll()
        .then(response => {
          this.products = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveProducts();
      this.currentProduct = null;
      this.currentIndex = -1;
    },
    setActiveProduct(product, index) {
      this.currentProduct = product;
      this.currentIndex = product ? index : -1;
    },

    // removeAllProducts() {
    //   ProductDataService.deleteAll()
    //     .then(response => {
    //       console.log(response.data);
    //       this.refreshList();
    //     })
    //     .catch(e => {
    //       console.log(e);
    //     });
    // },

    searchName() {
      ProductDataService.findByName(this.nombre)
        .then(response => {
          this.products = response.data;
          this.setActiveProduct(null);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveProducts();
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
