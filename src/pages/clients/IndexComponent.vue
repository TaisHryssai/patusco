<template>
  <div class="main">
    <PageComponent>
      <template v-slot:slot-pages>
        <div class="content-pages">
          <div class="breadcrumbs">
            <p>
              <b-link to="/clients" class="breadcrumb-item">
                <font-awesome-icon :icon="['fas', 'circle-chevron-left']" />
                <strong> Clientes </strong>
              </b-link>
            </p>
          </div>

          <div class="index-user">
            <b-row>
              <b-col md="6" class="div-title">
                <h2 class="title"> Clientes </h2>
              </b-col>

              <b-col md="6" class="buttons">
                <b-button class="btn-create" to="/clients/register" style="background-color:#26534f">
                  <font-awesome-icon :icon="['fas', 'plus']" />
                  Cadastrar Cliente
                </b-button>
              </b-col>

            </b-row>

            <b-row>
              <b-col md="12">
                <b-table :items="filterUsers" :fields="fieldUsers" responsive="" :current-page="currentPage"
                  :per-page="perPage">
                  <template v-slot:cell(actions)="data">
                    <b-button v-b-tooltip.hover title="Adicionar Pet" @click="AddPet(data.item)" class="pet">
                      <font-awesome-icon :icon="['fas', 'paw']" />
                    </b-button>

                    <b-button v-b-tooltip.hover title="Editar Cliente" class="edit" @click="editClient(data.item)">
                      <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                    </b-button>

                    <b-button v-b-tooltip.hover title="Deletar Cliente" class="delete" @click="deleteClient(data.item)">
                      <font-awesome-icon :icon="['fas', 'trash']" />
                    </b-button>
                  </template>
                </b-table>
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

      users: [],
      perPage: 5,
      currentPage: 1,
      search: "",
    };
  },

  mounted() {
    this.getListUsers();
  },

  methods: {
    async getListUsers() {
      await this.$http
        .get(`/users/listClients`)
        .then((response) => {
          if (response.data.error) {
            this.goError(response.data.message);
          } else {
            this.users = response.data.data;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    AddPet(item) {
      this.$router.push({ name: 'animals-register', query: { client: item.id } });
    },

    editClient(item) {
      this.$router.push({ name: 'clients-register', query: { client: item.id } });
    },

    async deleteClient(item) {
      await this.$http
        .delete(`/users/${item.id}`)
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
      return this.users.length;
    },

    fieldUsers: function () {
      let fields = [
        { key: "name", label: "Nome" },
        { key: "email", label: "Email" },
        { key: "contact", label: "Contato" },
        { key: "actions", label: "" },
      ];
      return fields;
    },

    filterUsers() {
      let items = this.users;
      if (this.search.length) {
        items = this.users.filter((item) => {
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