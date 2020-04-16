<template>
<div class="home">
  <Cards :cards="cards" v-if="user" />
  <Login :log="log" v-else-if="login" />
  <Register :reg="reg" v-else-if="register" />
</div>
</template>

<script>
import Register from '@/components/Register.vue';
import Login from '@/components/Login.vue';
import Cards from '@/components/Cards.vue';
import axios from 'axios';
export default {
  name: 'home',
  data() { 
    return {
      log: false,
      reg: true,
      cards: []
    }
  },
  components: {
    Register,
    Login,
    Cards
  },
  async created() {
    try {
      let response = await axios.get('/api/user');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
    this.getCards();
  },
  methods: {
    async getCards() {
      try {
        let response = await axios.get("/api/card");
        this.cards = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }, 
    register() {
      return this.reg;
    },
    login() {
      return this.log;
    }
  }
}
</script>

<style scoped>
.home {
  padding-top: 10px;
}
</style>