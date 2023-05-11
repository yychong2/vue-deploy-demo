<template>
  <Header :title="title" :description="description"/>
   <!-- Section-->
   <section class="py-5">
        <div class="container px-4 px-lg-5 mt-5">
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
              
              <p>In the very, very deep seabed, there is a majestic castle, in which live six mermaid princesses, they are all very beautiful, especially the youngest princess, she has long golden hair and is more beautiful than her sisters, she is the most beautiful She likes to listen to her sisters talking about many new things on the sea, so the little princess often thinks that one day she can go to the sea to see by herself.
              The little princess waited and waited, and on her fifteenth birthday, she quietly swam to the surface of the sea. There was a big boat on the sea, and many people on board were holding a grand birthday party. The prince was majestic, handsome, and the mermaid princess was also fascinated by him.
              Suddenly, "Huh!" A strong wind blew up and capsized the ship, and the prince also fell into the sea and drifted to the surface of the sea.</p>


              <p>
              "Oops! If you don't save the prince quickly, his life will be in danger!" So the mermaid princess took a lot of effort to save the prince to the shore.
              "Prince! Wake up!" said the mermaid princess, touching the prince's hand.
              At this time, the mermaid princess heard the footsteps approaching, so she hid behind the rocks, and a girl came. She was shocked when she saw the prince lying on the beach, and the prince woke up quickly under her careful care. The prince smiled at the girl and said, "Thank you! You saved my life."
              </p>

              <p>
              The mermaid princess hid behind the rock and was very sad when she heard this: "Prince, I am the one who saved you!"
              The mermaid princess can't forget the prince, because she is a mermaid and can't get close to the prince, so every night, she swims outside the castle and looks at the prince from afar. The mermaid princess said to herself: "I really want to become a human!"
              So, the mermaid princess went to ask the witch to help her achieve her wish.The witch said: "I have a way to turn you into a human being, but when your tail becomes your feet, it will hurt like a knife when you walk. Also, if the prince marries someone else, you will turn into bubbles." and die."
              In addition, the witch also hopes that the mermaid can give her her beautiful voice. "Okay! As long as I can be by the prince's side, nothing will be there!"
              </p>
              

            </div>
        </div>
     </section>

</template>

<script>

    import Header from '../components/header.vue'
    import { useI18n } from 'vue-i18n'

    export default{
        data(){
           const { t } = useI18n()

           return{
            title : t("title.about"),
            description : t("title.about_description"),
           }
        },
        methods:{
        },
        components:{
            Header
        }
    }
</script>

<style>
</style>