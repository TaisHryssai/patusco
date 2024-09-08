<template>
    <div class="main">
      <PageComponent>
        <template v-slot:slot-pages>
          <div class="content-pages">
            <div class="breadcrumbs">
              <p>
                <b-link to="/doctors" class="breadcrumb-item">
                  <font-awesome-icon :icon="['fas', 'circle-chevron-left']" />
                  Médicos
                </b-link>

                <b-link :to="'/doctors/register'" class="breadcrumb-item">
                  <font-awesome-icon class="icon-next" :icon="['fas', 'chevron-right']" />
                  <strong> Cadastro de Médicos </strong>
                </b-link>
              </p>

            </div>

            <div class="register-user">
              <b-row>
                <b-col md="12 div-title">
                  <h2 class="title">Cadastro de Médicos </h2>
                </b-col>

                <b-col md="12 form">
                  <b-card>
                    <b-row>
                      <b-col md="6">
                        <b-form-group
                          id="input-group-1"
                          label="Nome Completo:"
                          label-for="input-name"
                        >
                          <b-form-input
                            id="input-name"
                            type="text"
                            placeholder="Digite aqui..."
                            required
                            v-model="dataObj.name"
                          ></b-form-input>
                        </b-form-group>
                      </b-col>

                      <b-col md="6">
                        <b-form-group
                          id="input-group-1"
                          label="Email:"
                          label-for="input-email"
                        >
                          <b-form-input
                            id="input-email"
                            type="text"
                            placeholder="Digite aqui..."
                            required
                            v-model="dataObj.email"
                          ></b-form-input>
                        </b-form-group>
                      </b-col>

                      <b-col md="6">
                        <b-form-group
                          id="input-group-1"
                          label="Contato:"
                          label-for="input-contact"
                        >
                          <b-form-input
                            id="input-contact"
                            type="text"
                            placeholder="Digite aqui..."
                            v-model="dataObj.contact"
                            required
                          ></b-form-input>
                        </b-form-group>
                      </b-col>

                      <b-col md="6">
                        <b-form-group
                          id="input-group-1"
                          label="Endereço:"
                          label-for="input-address"
                        >
                          <b-form-input
                            id="input-address"
                            type="text"
                            placeholder="Digite aqui..."
                            required
                            v-model="dataObj.address"
                            ></b-form-input>
                        </b-form-group>
                      </b-col>

                      <b-col md="12">
                        <label for=""> Observação: </label>
                        <b-form-textarea
                          id="textarea"
                          placeholder="Digite aqui..."
                          rows="3"
                          max-rows="6"
                          v-model="dataObj.observation"
                        ></b-form-textarea>
                      </b-col>

                      <b-col md="12 buttons">
                        <b-button class="btn-cancel" @click="goBack()"> Cancelar </b-button>
                        <b-button class="btn-create" v-if="this.userId" @click="updateUser()"> Atualizar </b-button>
                        <b-button class="btn-create" v-else @click="saveCLient()"> Gravar </b-button>
                      </b-col>
                    </b-row>
                  </b-card>
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
    name: "CreateComponent",
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
        dataObj:{
          id: null,
          name: '',
          email: '',
          contact: '',
          address: '',
          observation: '',
          role_id: 2 // doctor
        }
        
      };
    },
  
    mounted() {
      if(this.userId != ''){
          this.findUser();
        }
    },
  
    methods: {
      async saveCLient(){
        await this.$http.post(`/users/register`, this.dataObj)
        .then((response) => {
          if (response.data.error) {
            this.goError(response.data.message);
          } else {
            this.goSuccess(response.data.message);
            this.goBack();
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

      async findUser(){
        await this.$http
        .get(`/users/${this.userId}`)
        .then((response) => {
          if (response.data.error) {
            this.goError(response.data.message);
          } else {
            let value = response.data.user;
            this.dataObj.name = value.name
            this.dataObj.email = value.email
            this.dataObj.contact = value.contact
            this.dataObj.address = value.address
            this.dataObj.observation = value.observation
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      },

      async updateUser(){
        await this.$http.put(`/users/${this.userId}/update`, this.dataObj)
        .then((response) => {
          if (response.data.error) {
            this.goError(response.data.message);
          } else {
            this.goSuccess(response.data.message);
            this.goBack();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      },

      goBack(){
        this.$router.back();
      }

    },
  
    computed: {
      userId() {
        return this.$route.query.doctor;
      },
    },
  
    filters: {
    },
  };
  </script>
  
  <style lang="scss" src="./style.scss" scoped />
  