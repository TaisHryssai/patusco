<template>
    <div class="main">
      <PageComponent>
        <template v-slot:slot-pages>
          <div class="content-pages">
            <div class="breadcrumbs">
                <p>
                  <b-link to="/agenda" class="breadcrumb-item">
                    <font-awesome-icon :icon="['fas', 'circle-chevron-left']" />
                    Agenda
                  </b-link>

                  <b-link :to="'/agenda/register'" class="breadcrumb-item">
                    <font-awesome-icon class="icon-next" :icon="['fas', 'chevron-right']" />
                    <strong> Marcar Horário </strong>
                  </b-link>
                </p>
            </div>

            <div class="register-agenda">
              <b-row>
                <b-col md="12 div-title">
                  <h2 class="title">Marcar Horário </h2>
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
                        <multiselect v-model="value_user" :options="users" label="name" track-by="id" @select="getClientsAnimals()"></multiselect>

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

                      <b-col md="4">
                        <b-form-group
                          id="input-group-1"
                          label="Animal:"
                          label-for="input-contact"
                        >
                        <multiselect v-model="value_animal" :options="animals" label="name" track-by="id" @select="selectAnimal()"></multiselect>

                        </b-form-group>
                      </b-col>

                      <b-col md="4">
                        <b-form-group
                          id="input-group-1"
                          label="Tipo de animal:"
                          label-for="input-address"
                        >
                        <multiselect v-model="value_type" :options="type_animals" label="name" track-by="id"></multiselect>

                        </b-form-group>
                      </b-col>

                      <b-col md="4">
                        <b-form-group
                          id="input-group-1"
                          label="Idade:"
                          label-for="input-age"
                        >
                          <b-form-input
                            id="input-age"
                            type="text"
                            placeholder="Digite aqui..."
                            required
                            v-model="dataObj.age"
                          ></b-form-input>
                        </b-form-group>
                      </b-col>

                      <b-col md="4">
                        <b-form-group
                          id="input-group-1"
                          label="Médico:"
                          label-for="input-email"
                        >
                        <multiselect v-model="value_doctor" :options="doctors" label="name" track-by="id"></multiselect>

                        </b-form-group>
                      </b-col>

                      <b-col md="4">
                        <b-form-group
                          id="input-group-1"
                          label="Data:"
                          label-for="input-date"
                        >

                        <b-form-input
                            id="input-date"
                            type="date"
                            placeholder="Digite aqui..."
                            required
                            v-model="dataObj.consultation_date"
                          ></b-form-input>

                        </b-form-group>
                      </b-col>

                      <b-col md="4">
                        <b-form-group
                          id="input-group-1"
                          label="Período:"
                          label-for="input-email"
                        >
                        <multiselect v-model="value_period" :options="periods" label="name" track-by="id" :disabled="isDisabled"></multiselect>
                        </b-form-group>
                      </b-col>

                      <b-col md="12">
                        <label for=""> Sintomas: </label>
                        <b-form-textarea
                          id="textarea"
                          placeholder="Digite aqui..."
                          rows="3"
                          max-rows="6"
                          v-model="dataObj.symptoms"
                        ></b-form-textarea>
                      </b-col>

                      <b-col md="12" style="margin-top: 10px;">
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
                        <b-button class="btn-create" v-if="this.agendaId" @click="updateAgenda()"> Atualizar </b-button>
                        <b-button class="btn-create" v-else @click="saveAgenda()"> Gravar </b-button>
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
        doctors: [],
        animals: [],
        type_animals: [],
        dataObj:{
          id: null,
          client_id: '',
          animal_id: '',
          consultation_date: '',
          period: '',
          email: '',
          type_animal: '',
          symptoms: '',
          observation: '',
          age: '',
          doctor_id: ''
        },

        periods: [
          {id:1, name: 'Manhã'},
          {id:2, name: 'Tarde'},
        ],

        value_period: null,
        value_type: null,
        value_animal: null,
        value_user: null,
        value_doctor: null,
        
      };
    },
  
    mounted() {
      this.getClients();
      this.getDoctors();
      this.getAnimals();
      if(this.agendaId){
          this.findAgenda();
        }

      this.getTypeAnimals();
    },
  
    methods: {
      async saveAgenda(){
        this.dataObj.user_id = this.value_user.id;
        this.dataObj.animal_id = this.value_animal.id;
        this.dataObj.doctor_id = this.value_doctor.id;
        this.dataObj.type_animal = this.value_type.id;

        let data = {
          user_id: this.dataObj.user_id,
          animal_id: this.dataObj.animal_id,
          doctor_id: this.dataObj.doctor_id,
          symptoms: this.dataObj.symptoms,
          period: this.value_period.name,
          observation: this.dataObj.observation,
          consultation_date: this.dataObj.consultation_date,
        }
        await this.$http.post(`/agenda/register`, data)
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

      async updateAgenda(){
        this.dataObj.user_id = this.value_user.id;
        this.dataObj.animal_id = this.value_animal.id;
        this.dataObj.doctor_id = this.value_doctor.id;
        this.dataObj.type_animal = this.value_type.id;

        let data = {
          user_id: this.dataObj.user_id,
          animal_id: this.dataObj.animal_id,
          doctor_id: this.dataObj.doctor_id,
          symptoms: this.dataObj.symptoms,
          period: this.value_period.name,
          observation: this.dataObj.observation,
          consultation_date: this.dataObj.consultation_date,
        }

        await this.$http.put(`/agenda/${this.agendaId}/update`, data)
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

      async findAgenda(){
        await this.$http
        .get(`/agenda/${this.agendaId}`)
        .then((response) => {
          if (response.data.error) {
            this.goError(response.data.message);
          } else {
            let value = response.data.agenda;
            this.value_period = value.period == 'Manhã' ? {id:1, name:'Manhã'} : {id:2, name: 'Tarde'};
            this.dataObj.observation = value.observation
            this.dataObj.symptoms = value.symptoms
            this.dataObj.consultation_date = value.consultation_date
            this.findUser(value.user_id);
            this.findDoctor(value.doctor_id);
            this.findAnimal(value.animal_id);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      },

      async findUser(user_id){
        await this.$http
        .get(`/users/${user_id}`)
        .then((response) => {
          if (response.data.error) {
            this.goError(response.data.message);
          } else {
            let value = response.data.user;
            this.value_user = value
            this.dataObj.email = value.email
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      },

      async findDoctor(doctor_id){
        await this.$http
        .get(`/users/${doctor_id}`)
        .then((response) => {
          if (response.data.error) {
            this.goError(response.data.message);
          } else {
            let value = response.data.user;
            this.value_doctor = value
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      },

      async findAnimal(animal_id){
        await this.$http
        .get(`/animals/${animal_id}`)
        .then((response) => {
          if (response.data.error) {
            this.goError(response.data.message);
          } else {
            this.value_animal = response.data.animal;
            this.dataObj.age = this.value_animal.age;

            this.findTypeAnimals(this.value_animal.type_animal_id)
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      },

      async findTypeAnimals(type_animal_id){
        await this.$http
        .get(`/type_animals/${type_animal_id}`)
        .then((response) => {
          if (response.data.error) {
            this.goError(response.data.message);
          } else {
            this.value_type = response.data.type_animal;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      },

      async getClients(){
        await this.$http
        .get(`/users/listClients`)
        .then((response) => {
          if (response.data.error) {
            this.goError(response.data.message);
          } else {
            this.users = response.data.data;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      },

      async getClientsAnimals(){
        await this.$http
        .get(`/users/${this.value_user.id}/animals`)
        .then((response) => {
          if (response.data.error) {
            this.goError(response.data.message);
          } else {
            this.animals = response.data.data;
            this.dataObj.email = this.value_user.email
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      },

      selectAnimal(){
        this.dataObj.age = this.value_animal.age;
      },

      async getDoctors(){
        await this.$http
        .get(`/users/listDoctor`)
        .then((response) => {
          if (response.data.error) {
            this.goError(response.data.message);
          } else {
            this.doctors = response.data.data;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      },

      async getAnimals(){
        await this.$http
        .get(`/animals`)
        .then((response) => {
          if (response.data.error) {
            this.goError(response.data.message);
          } else {
            this.animals = response.data.data;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      },

      async getTypeAnimals(){
        await this.$http
        .get(`/type_animals`)
        .then((response) => {
          if (response.data.error) {
            this.goError(response.data.message);
          } else {
            this.type_animals = response.data.data;
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
      agendaId() {
        return this.$route.query.agenda;
      },
    },
  
    filters: {
    },
  };
  </script>
  
  <style lang="scss" src="./style.scss" scoped />
  