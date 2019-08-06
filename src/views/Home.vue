<template>
  <div class="home container">
      <div class="card" v-for="(smoothie, i) in smoothies" :key="i">
        <div class="card-content">
          <i class ="material-icons delete" @click="deleteSmoothie(smoothie.id)"> delete</i>
          <h5 class="indigo-text">
            {{ smoothie.title}}
            
          </h5>
          <ul class="ingredients">
            <li v-for="(ing, i) in smoothie.ingredients" :key="i">
              <span class="chip">
                {{ ing }}
              </span>
            </li>
          </ul>
        </div>
        <span class="btn-floating btn-large halway-fab pink">
          <router-link :to="{name: 'EditSmoothie', params: { smoothie_slug: smoothie.slug }}">
            <i class="material-icons edit">edit</i>
          </router-link>
        </span>
      </div>
  </div>
</template>

<script>
import db from '@/firebase/init';

export default {
    name: 'home',
    data() {
        return {
            smoothies: [],
        };
    },
    methods: {
        deleteSmoothie(id) {
            // delete doc from firestore
            db.collection('smoothies')
                // pass in the id to match the item
                .doc(id)
                // delete from firestore
                .delete()
                // use a promise to then delete from the dom - data
                .then(() => {
                    this.smoothies = this.smoothies.filter(smoothie => {
                        return smoothie.id != id;
                    });
                });
        },
    },
    created() {
        // fetch data from the firestore
        // reference database name
        db.collection('smoothies')
            // get data
            .get()
            // snapshot of current state
            .then(snapshot => {
                // loop through each document
                snapshot.forEach(doc => {
                    // get the data and id
                    let smoothie = doc.data();
                    smoothie.id = doc.id;
                    this.smoothies.push(smoothie);
                });
            });
    },
};
</script>
<style lang="scss">
.home {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;
    margin-top: 60px;

    h2 {
        font-size: 1.8em;
        text-align: center;
        margin-top: 0;
    }

    .ingredients {
        margin: 30px auto;

        li {
            display: inline-block;
        }
    }
    .delete {
        position: absolute;
        top: 4px;
        right: 4px;
        cursor: pointer;
        color: #aaa;
        font-size: 1.4em;
    }
}
</style>
