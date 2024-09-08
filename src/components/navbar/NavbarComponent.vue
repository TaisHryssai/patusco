<template>
  <b-navbar toggleable="lg" fixed="" variant="ligth">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <div class="content-right">
        <div class="navbar-collapse justfy-center nav-user" id="appnav">
          <span> Bem vindo, {{userLogged.user.name}} </span>
        </div>
      </div>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "NavbarComponent",
  data() {
    return {
      userLogged: localStorage.getItem("userLogged")
        ? JSON.parse(localStorage.getItem("userLogged"))
        : null,
    };
  },

  computed: {

  },

  mounted() {

  },

  methods: {
  },

  filters: {

  },
};
</script>

<style lang="scss" src="./style.scss" scoped />