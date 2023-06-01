<template>
  
    <div class="loading" v-if="loading" >
      <div class="shape">
          <!-- <looping-rhombuses-spinner
            :animation-duration="2500"
            :rhombus-size="100"
            :color="'#ff1d5e'"
          /> -->

          <fulfilling-square-spinner
            :animation-duration="4000"
            :size="300"
            color="#ccc8c9"
          />
      </div>  
    </div>

</template>

<script>
import {FulfillingSquareSpinner   } from 'epic-spinners'


export default {
  data(){
        return{ }
  }, 
  components: {
    
  },
  props:{
     loading:{
         type: Boolean,
     }
  },
  methods: {
    
  },
  components:{
    FulfillingSquareSpinner  
  }

};

</script>

