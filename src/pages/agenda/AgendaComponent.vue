<template>
    <div class="main">
        <PageComponent>
            <template v-slot:slot-pages>
                <div class="content-pages">
                    <div class="breadcrumbs">
                        <p>
                            <b-link to="/agenda" class="breadcrumb-item">
                                <font-awesome-icon :icon="['fas', 'circle-chevron-left']" />
                                <strong> Agenda </strong>
                            </b-link>
                        </p>
                    </div>

                    <div class="index-user">
                        <b-row>
                            <b-col md="6" class="div-title">
                                <h2 class="title"> Agenda </h2>
                            </b-col>

                            <b-col md="6" class="buttons" v-if="userLogged.user.role_id != 2">
                                <b-button class="btn-create" to="/agenda/register" style="background-color:#26534f">
                                    <font-awesome-icon :icon="['fas', 'plus']" />
                                    Marcar Horário
                                </b-button>
                            </b-col>
                            <b-col md="12"></b-col>

                            <b-col md="3">
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
                                        v-model="date"
                                    ></b-form-input>
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
                                <b-button @click="getAgenda()" class="btn-search"> Pesquisar </b-button>
                            </b-col>

                        </b-row>

                        <b-row>
                            <b-col md="12">
                                <b-table :items="agenda" :fields="fieldUsers" responsive="" :current-page="currentPage"
                                    :per-page="perPage">
                                    <template v-slot:cell(actions)="data">
                                        <b-button v-b-tooltip.hover title="Editar Agenda" class="edit"
                                            @click="editAgenda(data.item)">
                                            <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                                        </b-button>

                                        <b-button v-b-tooltip.hover title="Deletar Agenda" class="delete"
                                            @click="deleteAgenda(data.item)" v-if="userLogged.user.role_id != 2">
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
    name: "AgendaComponent",
    components: {
        PageComponent,
    },
    data() {
        return {
            userLogged: localStorage.getItem("userLogged")
                ? JSON.parse(localStorage.getItem("userLogged"))
                : null,

            agenda: [],
            date: '',
            type_animals: [],
            value_type: null,

        };
    },

    mounted() {
        this.getAgenda();
        this.getTypeAnimals();
    },

    methods: {
        async getAgenda() {
            await this.$http
                .get(`/agenda/${this.userLogged.user.role_id}`,{
                    params:{
                        'date': this.date ? this.date : null,
                        'type_animal': this.value_type ? this.value_type.id : null,
                    }
                })
                .then((response) => {
                    if (response.data.error) {
                        this.goError(response.data.message);
                    } else {
                        this.agenda = response.data.data;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        async deleteUser(user_id) {
            await this.$http
                .delete(`/agenda/${user_id}`)
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

        editAgenda(item){
            this.$router.push({ name: 'agenda-register', query: { agenda: item.id } });
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

    },

    computed: {
        fieldUsers: function () {
            let fields = [
                { key: "doctor_name", label: "Médico" },
                { key: "user_name", label: "Responsável" },
                { key: "animal_name", label: "Nome do Pet" },
                { key: "type_animal_name", label: "Tipo" },
                { key: "consultation_date", label: "Data" },
                { key: "period", label: "Período" },
                { key: "actions", label: "" },
            ];
            return fields;
        },
    },

    filters: {
    },
};
</script>

<style lang="scss" src="./style.scss" scoped />