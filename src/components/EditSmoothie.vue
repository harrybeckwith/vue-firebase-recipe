<template>
    <div v-if="smoothie" class="edit-smoothie container">
        <h5>Edit {{ smoothie.title }} smoothie</h5>
        <form @submit.prevent="EditSmoothie">
            <div class="field title">
                <label for="title">Smoothie title:</label>
                <input type="text" name="title" v-model="smoothie.title">
            </div>
            <div v-for="(ing, i) in smoothie.ingredients" 
            :key="i" class="field">
            <label for="ingredient">ingredients: </label>
            <input type="text" name="ingredient" v-model="smoothie.ingredients[i]"/>
            <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">add an ingredient:</label>
                <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{ feedback }}</p>
                <button class="btn pink">
                    Update SMOOTHIE
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init';
import slugify from 'slugify';
export default {
    name: 'EditSmoothie',
    data() {
        return {
            smoothie: null,
            another: null,
            feedback: null,
        };
    },
    created() {
        // go into smoothie db
        // where the document has data that contains
        // retrieve use ref.get()
        // promise to get current snapshot
        // loop over the doc and get the data within
        let ref = db
            .collection('smoothies')
            .where('slug', '==', this.$route.params.smoothie_slug);
        ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                console.log(doc.data());
                this.smoothie = doc.data();
                this.smoothie.id = doc.id;
            });
        });
    },
    methods: {
        EditSmoothie() {
            if (this.smoothie.title) {
                // create a slug
                this.smoothie.slug = slugify(this.smoothie.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true,
                });
                db.collection('smoothies')
                    .doc(this.smoothie.id)
                    .update({
                        title: this.smoothie.title,
                        ingredients: this.smoothie.ingredients,
                        slug: this.smoothie.slug,
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
            console.log(this.smoothie.title, this.smoothie.ingredients);
        },
        addIng() {
            if (this.another) {
                this.smoothie.ingredients.push(this.another);
                this.another = null;
                this.feedback = null;
            } else {
                this.feedback = 'You must enter a value to add an ingredient';
            }
        },
        deleteIng(ing) {
            this.smoothie.ingredients = this.smoothie.ingredients.filter(
                ingredient => {
                    return ingredient != ing;
                }
            );
        },
    },
};
</script>

<style lang="scss">
.edit-smoothie {
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
