<template>
  <div class="main">
    <PageComponent>
      <template v-slot:slot-pages>

        <div class="content-pages">
          <div class="breadcrumbs">
            <b-breadcrumb>
              <b-breadcrumb-item to="/clients">
                <font-awesome-icon :icon="['fas', 'circle-chevron-left']" class="breadcrumb-icon" />

                <span>
                  Animais
                </span>

              </b-breadcrumb-item>
            </b-breadcrumb>
          </div>

          {{ animal }}

          <div class="register-animal">
            <b-row>
              <b-col md="12 div-title">
                <h2 class="title">Cadastro de Animais </h2>
              </b-col>

              <b-col md="12 form">
                <b-card>
                  <b-row>
                    <b-col md="6">
                      <b-form-group id="input-group-3" label="Responsável:" label-for="input-3">
                        <multiselect v-model="value" :options="users" label="name" track-by="id" :disabled="isDisabled">
                        </multiselect>
                      </b-form-group>
                    </b-col>

                    <b-col md="6">
                      <b-form-group id="input-group-3" label="Tipo:" label-for="input-3">

                        <multiselect v-model="type_animal_id" :options="type_animals" label="name" track-by="id">
                        </multiselect>

                      </b-form-group>
                    </b-col>

                    <b-col md="6">
                      <b-form-group id="input-group-1" label="Nome do animal:" label-for="input-1">
                        <b-form-input id="input-1" type="text" placeholder="Digite aqui..." required
                          v-model="dataObj.name"></b-form-input>
                      </b-form-group>
                    </b-col>

                    <b-col md="6">
                      <b-form-group id="input-group-1" label="Idade:" label-for="input-age">
                        <b-form-input id="input-age" type="text" placeholder="Digite aqui..." v-model="dataObj.age"
                          required></b-form-input>
                      </b-form-group>
                    </b-col>

                    <b-col md="12">
                      <label for=""> Observação: </label>
                      <b-form-textarea id="textarea" v-model="dataObj.observation" placeholder="Digite aqui..." rows="3"
                        max-rows="6"></b-form-textarea>
                    </b-col>

                    <b-col md="12 buttons">
                      <b-button class="btn-cancel" @click="goBack()"> Cancelar </b-button>
                      <b-button class="btn-create" v-if="animalId" @click="updateAnimal()"> Atualizar </b-button>
                      <b-button class="btn-create" v-else @click="saveAnimal()"> Gravar </b-button>
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
import Multiselect from 'vue-multiselect'

export default {
  name: "CreateComponent",
  components: {
    PageComponent,
    Multiselect
  },
  data() {
    return {
      userLogged: localStorage.getItem("userLogged")
        ? JSON.parse(localStorage.getItem("userLogged"))
        : null,
      users: [],
      value: null,
      type_animal_id: null,
      client_id: '',
      isDisabled: false,
      type_animals: [],
      dataObj: {
        id: null,
        name: '',
        client_id: '',
        type_animal_id: '',
        age: '',
        observation: '',
      },
      animal: {}
    };
  },

  mounted() {
    this.getListUsers();
    this.getTypeAnimals();
    if (this.userId) {
      this.findUser(this.userId);
    }
    if (this.animalId) {
      this.findAnimal();
    }
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

    async getTypeAnimals() {
      await this.$http
        .get(`/type_animals`)
        .then((response) => {
          if (response.data.error) {
            this.goError(response.data.message);
          } else {
            this.type_animals = response.data.data;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    async findUser(userId) {
      await this.$http
        .get(`/users/${userId}`)
        .then((response) => {
          if (response.data.error) {
            this.goError(response.data.message);
          } else {
            this.value = response.data.user;
            this.isDisabled = true
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    async findAnimal() {
      await this.$http
        .get(`/animals/${this.animalId}`)
        .then((response) => {
          if (response.data.error) {
            this.goError(response.data.message);
          } else {
            this.animal = response.data.animal;
            this.dataObj.name = this.animal.name
            this.dataObj.age = this.animal.age
            this.dataObj.observation = this.animal.observation

            this.dataObj.type_animal_id = this.animal.type_animal_id

            this.findUser(this.animal.user_id)
            this.findTypeAnimals()
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    async findTypeAnimals() {
      await this.$http
        .get(`/type_animals/${this.animal.type_animal_id}`)
        .then((response) => {
          if (response.data.error) {
            this.goError(response.data.message);
          } else {
            this.type_animal_id = response.data.type_animal;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    async saveAnimal() {
      this.dataObj.client_id = this.client_id.id;
      this.dataObj.type_animal_id = this.type_animal_id.id;

      let data = {
        user_id: this.value.id,
        type_animal_id: this.type_animal_id.id,
        name: this.dataObj.name,
        age: this.dataObj.age,
        observation: this.dataObj.observation,
      }

      await this.$http.post(`/animals/register`, data)
        .then((response) => {
          if (response.data.error) {
            this.goError(response.data.message);
          } else {
            this.goSuccess(response.data.message);
            this.goBack()
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    async updateAnimal() {
      this.dataObj.client_id = this.client_id.id;
      this.dataObj.type_animal_id = this.type_animal_id.id;

      let data = {
        user_id: this.value.id,
        type_animal_id: this.type_animal_id.id,
        name: this.dataObj.name,
        age: this.dataObj.age,
        observation: this.dataObj.observation,
      }

      await this.$http.put(`/animals/${this.animalId}/update`, data)
        .then((response) => {
          if (response.data.error) {
            this.goError(response.data.message);
          } else {
            this.goSuccess(response.data.message);
            this.goBack()
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

    goBack() {
      this.$router.back();
    }
  },

  computed: {
    userId() {
      return this.$route.query.client;
    },

    animalId() {
      return this.$route.query.animal;
    },
  },

  filters: {
  },
};
</script>

<style lang="scss" src="./style.scss" scoped />