<template>
<div>
  <section class="card-selection">
    <div class="card" v-for="card in cards" v-bind:key="card._id">
      <!-- <router-link :to="{ name: 'Photo', params: { id: photo._id }}">
        <img :src="photo.path" />
      </router-link> -->
      <div class="cardInfo">
        <p class="photoTitle">{{card.recipient}}</p>
        <p class="photoName">{{card.message}}</p>
      </div>
      <!-- <p class="photoDate">{{formatDate(photo.created)}}</p> -->
    </div>
  </section>
</div>
</template>


<script>
export default {
  name: 'Cards',
  props: {
    cards: Array
  },
  methods: {
    // formatDate(date) {
    //   if (moment(date).diff(Date.now(), 'days') < 15)
    //     return moment(date).fromNow();
    //   else
    //     return moment(date).format('d MMMM YYYY');
    // }
  }
}
</script>


<style scoped>
.cardInfo {
  display: flex;
  justify-content: space-between;
  font-size: 0.8em;
}

.cardInfo p {
  margin: 0px;
}

/* .photoDate {
  font-size: 0.7em;
  font-weight: normal;
} */

p {
  margin: 0px;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.card-selection {
  column-gap: 1em;
}

.card {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.card img {
  width: 100%;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 2;
  }
}
</style>