<template>
    <div class="main">
      <PageComponent>
        <!-- Use v-slot to define the named slot -->
        <template v-slot:slot-pages>
          <div class="content-pages">
            <!-- Slot content goes here -->
             <h3>Bem-vindo!</h3>
          </div>
        </template>
      </PageComponent>
    </div>
  </template>
  
  <script>
  import PageComponent from "../page/PageComponent.vue";
  
  export default {
    name: "DashboardComponent",
    components: {
      PageComponent,
    },
    data() {
      return {
        userLogged: localStorage.getItem("userLogged")
          ? JSON.parse(localStorage.getItem("userLogged"))
          : null,
  
        avatar: null,
      };
    },
  
    mounted() {
      // this.fillChartData();
    },
  
    methods: {
      // Add your methods here
    },
  
    computed: {
      // Add your computed properties here
    },
  
    filters: {
      // Add your filters here
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  