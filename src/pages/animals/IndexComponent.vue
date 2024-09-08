<template>
  <div class="main">
    <PageComponent>
      <template v-slot:slot-pages>

        <div class="content-pages">
          <div class="breadcrumbs">
            <p>
              <b-link to="/animals" class="breadcrumb-item">
                <font-awesome-icon :icon="['fas', 'circle-chevron-left']" />
                <strong> Animais </strong>
              </b-link>
            </p>
          </div>

          <div class="index-user">
            <b-row>
              <b-col md="6" class="div-title">
                <h2 class="title"> Animais </h2>
              </b-col>

              <b-col md="6" class="buttons">
                <b-button class="btn-create" to="/animals/register" style="background-color:#26534f">
                  <font-awesome-icon :icon="['fas', 'plus']" />
                  Cadastrar animal
                </b-button>
              </b-col>

            </b-row>

            <b-row>
              <b-col md="12">
                <b-table :items="filterUsers" :fields="fieldUsers" responsive="" :current-page="currentPage"
                  :per-page="perPage">
                  <template v-slot:cell(actions)="data">

                    <b-button v-b-tooltip.hover title="Editar Animal" class="edit" @click="editAnimal(data.item)">
                      <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                    </b-button>

                    <b-button v-b-tooltip.hover title="Deletar Animal" class="delete" @click="deleteAnimal(data.item)">
                      <font-awesome-icon :icon="['fas', 'trash']" />
                    </b-button>
                  </template>
                </b-table>

                <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table"
                  align="right"></b-pagination>
              </b-col>
            </b-row>

          </div>
        </div>
      </template>
    </PageComponent>
  </div>
</template>

<script>
import PageComponent from "../page/PageComponent";

export default {
  name: "IndexComponent",
  components: {
    PageComponent,
  },
  data() {
    return {
      userLogged: localStorage.getItem("userLogged")
        ? JSON.parse(localStorage.getItem("userLogged"))
        : null,

      animals: [],
      perPage: 5,
      currentPage: 1,
      search: "",
      sort_desc: false,
      sort: true,

    };
  },

  mounted() {
    this.getListUsers();
  },

  methods: {
    async getListUsers() {
      await this.$http
        .get(`/animals`)
        .then((response) => {
          if (response.data.error) {
            this.goError(response.data.message);
          } else {
            this.animals = response.data.data;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    async deleteAnimal(item) {
      await this.$http
        .delete(`/animals/${item.id}`)
        .then((response) => {
          if (response.data.error) {
            this.goError(response.data.message);
          } else {
            this.goSuccess(response.data.message);
            this.getListUsers();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    editAnimal(item) {
      this.$router.push({ name: 'animals-register', query: { animal: item.id } });
    },

    goSuccess(message) {
      this.$swal({
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 4000,
        icon: "success",
        title: "Sucesso!",
        text: message ? message : "Cadastro Atualizado.",
      });
    },

    goError(message) {
      this.$swal({
        toast: true,
        position: "center",
        showConfirmButton: true,
        icon: "error",
        title: "Atenção!",
        text: message ? message : "Já existe um usuário com este e-mail.",
      });
    },

  },

  computed: {
    rows() {
      return this.animals.length;
    },

    fieldUsers: function () {
      let fields = [
        { key: "name", label: "Nome" },
        { key: "type_name", label: "Tipo" },
        { key: "age", label: "Idade" },
        { key: "user_name", label: "Responsável" },
        { key: "actions", label: "" },
      ];
      return fields;
    },

    filterUsers() {
      let items = this.animals;
      if (this.search.length) {
        items = this.animals.filter((item) => {
          return (
            item.name
              .toLowerCase()
              .includes(this.search.toLowerCase().trim())
          );
        });
      }

      return items;
    }
  },

  filters: {
  },
};
</script>

<style lang="scss" src="./style.scss" scoped />