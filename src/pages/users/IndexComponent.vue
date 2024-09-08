<template>
    <div class="main">
      <PageComponent>
        <template v-slot:slot-pages>
          <div class="content-pages">
            <div class="breadcrumbs">
                <b-breadcrumb>
                    <b-breadcrumb-item to="/users">
                      <font-awesome-icon :icon="['fas', 'circle-chevron-left']" class="breadcrumb-icon" />

                      <span>
                        Usuários
                      </span>

                    </b-breadcrumb-item>
                </b-breadcrumb>
            </div>

            <div class="index-user">
                <b-row>
                    <b-col md="6" class="div-title">
                        <h2 class="title"> Usuários </h2>
                    </b-col>

                    <b-col md="6" class="buttons">
                        <b-button class="btn-create" to="/users/register">
                          <font-awesome-icon :icon="['fas', 'plus']" />
                          Cadastrar Usuário
                        </b-button>
                    </b-col>

                    <b-col md="6">
                        <b-input placeholder="Pesquisar" v-model="search"></b-input>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col md="12">
                        <b-table :items="filterUsers" :fields="fieldUsers" responsive="" :current-page="currentPage" :per-page="perPage">
                           
                        </b-table>

                        <b-pagination
                        v-model="currentPage"
                        :total-rows="rows"
                        :per-page="perPage"
                        aria-controls="my-table"
                        align="right"
                        ></b-pagination>
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
        sort_desc: false,
        sort: true,
        
      };
    },
  
    mounted() {
      // this.fillChartData();
      this.getListUsers();
    },
  
    methods: {
      async getListUsers(){
        try {
          const response = await this.$http.get('/users');
          if (response.data.error) {
            this.goError(response.data.message);
          } else {
            this.users = response.data.data;
          }
        } catch (error) {
          console.error(error);
        }
      },

      async deleteUser(user_id){
        await this.$http
        .delete(`/administrative/users/${user_id}`)
        .then((response) => {
          if (response.data.error) {
            this.goError(response.data.message);
          } else {
            this.goSuccess(response.data.message);
            this.getListUsers();
          }
        })
        .catch(function(error) {
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

      fieldUsers: function() {
        let fields = [
          { key: "name", label: "Nome" },
          { key: "email", label: "Email" },
          { key: "role_name", label: "Perfil" },
          { key: "actions", label: "" },
        ];
        return fields;
      },

      filterUsers(){
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
  