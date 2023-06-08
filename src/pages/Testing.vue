<template>
  
<div>
  <Pie
          id="my-chart-id"
          :options="chartOptions"
          :data="chartData"
        />
</div>
  

    <!-- <div class="loading" v-if="loading" >
      <div class="shape">
          <looping-rhombuses-spinner
            :animation-duration="2500"
            :rhombus-size="100"
            :color="'#ff1d5e'"
          />
      </div>  
    </div> -->

</template>

<script>
import {LoopingRhombusesSpinner } from 'epic-spinners'
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend,ArcElement, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale ,ArcElement)


export default {
  data(){
        return{ 
          chartData: {
              labels: [ 'January', 'February', 'March' ],
              datasets: [ { backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'], data: [40, 20, 12] } ]
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false
            }

        }
  }, 
  props:{
     loading:{
         type: Boolean,
     }
  },
  methods: {
    
  },
  components:{
      LoopingRhombusesSpinner , Pie
  }

};

</script>

<style>
.loading{
    z-index: 9999;
    background: black;
    opacity: 0.8;
    height: 100%;
    width: 100%;
    position: absolute;
    overflow-x: hidden;
}

.shape{
    width: 30%;
    height: 50%;
    margin: 20% 0 0% 37%;
}
</style>