<template>
    <div class="main">
      <div
        class="bg-login"
      >
        <!-- Imagem pessoa de fundo -->
        <img
          class="login__peaple--bg"
          alt="Imagem"
          src="@/assets/Patusco_branco.png"
        />
        <div class="login">
          <div class="content d-flex justify-content-center align-items-center">
            <div class="form">
              <header class="header-login">
                <h3> Bem-vindo </h3>
                <p> Preencha as informações abaixo para fazer login em sua conta. </p>
              </header>
              <form @submit.prevent="submit">
                <div class="form-group left">
                  <label for="email">E-mail</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder="usuario@email.com"
                    aria-describedby="emailHelp"
                    required
                    v-model="dataObj.login.email"
                  />
                </div>
                <div class="form-group left no-bottom">
                  <label for="password">Senha</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    placeholder="Digite sua senha"
                    v-model="dataObj.login.password"
                    required
                  />
                </div>
  
                <button type="submit" class="btn button-login center">
                  LOGIN
                </button>
  
              </form>

              <router-link class="register" :to="{ name: 'users-register' }" >
                Cadastrar-se
              </router-link>

            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    name: "LoginComponent",
  
      data() {
        return {
          dataObj: {
            login: {
              email: "",
              password: "",
            },
          },
        };
      },
    methods:{
      async submit() {
        await this.$http
          .post("/login", this.dataObj.login)
          .then((response) => {

            localStorage.setItem(
              "authToken",
              JSON.stringify(response.data.access_token)
            );
            localStorage.setItem(
              "userLogged",
              JSON.stringify(response.data)
            );

            this.goLogin(response.data.user);
            console.log(response.data)

          })
          .catch((error) => {
            console.log(error.response.data.message);
            this.goError(error.response.data.message);
          });
      },


      goLogin() {
        this.$router.push("/agenda");
          this.$swal({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 4000,
          icon: "success",
          title: "Olá!",
          text: "Seja muito bem-vind@.",
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
          position: "top-end",
          showConfirmButton: false,
          timer: 4000,
          icon: "error",
          title: "Ops...",
          text: message ? message : "Usuário ou senha inválidos!",
        });
      },


    },
    mounted(){
  
    },
  
  };
  </script>
  
  <style lang="scss" src="./style.scss" scoped />
  
  