<template>
<div class="add-smoothie container">
  <h2 class="center-align indigo-text">Add new smoothie recipe</h2>
  <form @submit.prevent="AddSmoothie">
      <div class="field title">
          <label for="title">Smoothie title:</label>
          <input type="text" name="title" v-model="title">
      </div>
      <div v-for="(ing, i) in ingredients" 
      :key="i" class="field">
      <label for="ingredient">ingredients: </label>
      <input type="text" name="ingredient" v-model="ingredients[i]"/>
      <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
          <label for="add-ingredient">add an ingredient:</label>
          <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
      </div>
       <div class="field center-align">
           <p v-if="feedback" class="red-text">{{ feedback }}</p>
          <button class="btn pink">
              ADD SMOOTHIE
          </button>
      </div>
  </form>
</div>
  
</template>

<script>
import db from '@/firebase/init';
import slugify from 'slugify';

export default {
    name: 'AddSmoothie',
    data() {
        return {
            title: null,
            another: null,
            ingredients: [],
            feedback: null,
            slug: null,
        };
    },
    methods: {
        AddSmoothie() {
            if (this.title) {
                // create a slug
                this.slug = slugify(this.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true,
                });
                db.collection('smoothies')
                    .add({
                        title: this.title,
                        ingredients: this.ingredients,
                        slug: this.slug,
                    })
                    .then(() => {
                        this.$router.push({ name: 'home' });
                    })
                    .catch(err => {
                        console.log(err);
                    });

                console.log(this.slug);
            } else {
                this.feedback = 'You must enter a smoothie title';
            }
        },
        addIng() {
            if (this.another) {
                this.ingredients.push(this.another);
                this.another = null;
                this.feedback = null;
            } else {
                this.feedback = 'You must enter a value to add an ingredient';
            }
        },
        deleteIng(ing) {
            this.ingredients = this.ingredients.filter(ingredient => {
                return ingredient != ing;
            });
        },
    },
};
</script>

<style lang="scss">
.add-smoothie {
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;

    h2 {
        font-size: 2em;
        margin: 20px auto;
    }
    .field {
        margin: 20px auto;
        position: relative;
    }
    .delete {
        position: absolute;
        right: 0;
        bottom: 16px;
        color: #aaa;
        font-size: 1.4em;
        cursor: pointer;
    }
}
</style>
