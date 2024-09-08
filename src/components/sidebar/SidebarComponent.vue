<template>
  <div class="sidebar">
    <div class="menu">
      <div class="buttom-menu">
        <b-navbar-brand href="#/users" class="logo">
          <!-- <img alt="platilit" src="@/assets/img/logo-plastilit.png" /> -->
        </b-navbar-brand>
      </div>
      
      <b-collapse v-model="visible" id="sidebar">
        <ul>

          <router-link
            style="text-decoration: none; color: white"
            :to="{ name: 'profile' }"
          >
            <li :class="{ 'menu-active': currentRouteName == 'profile' }">
              <h6>
                <font-awesome-icon :icon="['fas', 'user']" /> Meu Perfil
              </h6>
            </li>
          </router-link>

          <router-link
            style="text-decoration: none; color: white"
            :to="{ name: 'agenda-index' }"
          >
            <li :class="{ 'menu-active': currentRouteName == 'agenda-index' }">
              <h6>
                <font-awesome-icon :icon="['fas', 'calendar-days']" /> Agenda
              </h6>
            </li>
          </router-link>

          <router-link
            style="text-decoration: none; color: white"
            :to="{ name: 'receptionists-index' }"
            v-if="userLogged.user.role_id == 1 || userLogged.user.role_id == 4"
          >
            <li :class="{ 'menu-active': currentRouteName == 'receptionists-index' }">
              <h6>
                <font-awesome-icon :icon="['fas', 'users']" /> Recepcionistas
              </h6>
            </li>
          </router-link>

          <router-link
            style="text-decoration: none; color: white"
            :to="{ name: 'clients-index' }"
            v-if="userLogged.user.role_id != 3"
          >
            <li :class="{ 'menu-active': currentRouteName == 'clients-index' }">
              <h6>
                <font-awesome-icon :icon="['fas', 'users']" /> Clientes
              </h6>
            </li>
          </router-link>

          <router-link
            style="text-decoration: none; color: white"
            :to="{ name: 'doctors-index' }"
            v-if="userLogged.user.role_id != 3"
          >
            <li :class="{ 'menu-active': currentRouteName == 'doctors-index' }">
              <h6>
                <font-awesome-icon :icon="['fas', 'user-doctor']" /> Médicos
              </h6>
            </li>
          </router-link>

          <router-link
            style="text-decoration: none; color: white"
            :to="{ name: 'animals-index' }"
          >
            <li :class="{ 'menu-active': currentRouteName == 'animals-index' }">
              <h6>
                <font-awesome-icon :icon="['fas', 'paw']" /> Animais
              </h6>
            </li>
          </router-link>


          <b-button
            style="text-decoration: none;"
            @click.prevent="logout"
          >
            <li>
              <h6>
                <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
                SAIR
              </h6>
            </li>
          </b-button>

        </ul>
      </b-collapse>
    </div>
  </div>
</template>

<script>

export default {
    name: 'SidebarComponent',
    data() {
      return {
        visible: true,
        winWidth:0,
        userLogged: localStorage.getItem("userLogged")
                ? JSON.parse(localStorage.getItem("userLogged"))
                : null,
      }
    },

    computed: {
    currentRouteName() {
         return this.$route.name;
      },
    },

    methods: {
      goLogin() {
        this.$router.push("/");
      },

      logout() {
          localStorage.removeItem("authToken");
          localStorage.removeItem("authTokenExpires");
          localStorage.removeItem("userLogged");
          localStorage.removeItem("@plastilit:avatar");
          localStorage.removeItem("userLogout");
          this.goLogin();

      },
   },
    
}
</script>

<style lang="scss" src="./style.scss" scoped />





