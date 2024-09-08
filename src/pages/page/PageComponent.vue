<template>
  <div class="main">
    <div class="page">
      <div class="nav">
        <NavbarComponent />
      </div>
      <div class="content-page-right">
        <div class="side">
          <SidebarComponent />
        </div>
        <div class="pages">
          <!-- Named slot content goes here -->
          <slot name="slot-pages"></slot>
        </div>
        <div class="side">
          <!-- Additional content or components can be added here -->
        </div>
      </div>
  
      <!-- Uncomment if FooterComponent is used -->
      <!-- <FooterComponent /> -->
    </div>
  </div>
</template>

  
  <script>
import NavbarComponent from "../../components/navbar/NavbarComponent";
import SidebarComponent from "../../components/sidebar/SidebarComponent.vue";
  // import FooterComponent from "../../components/footer/FooterComponent.vue";
  
  export default {
    name: "PageComponent",
    components: {
      NavbarComponent,
      SidebarComponent,
      // FooterComponent,
    },
  };
  </script>
  
  <style lang="scss" scoped>
  /* Add your SCSS styles here */
  @import './style.scss';
  </style>
  