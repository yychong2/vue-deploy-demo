<template>
    <h3 class="title">Test API</h3>
    <div>
        <!-- <p>{{ indexes }}</p> -->
        <button @click="getToken">Click Token and GameList</button>
    </div>
  
    <div :style="classReadData" style="overflow-wrap: break-word" >
        <!-- <p>{{ data }}</p> -->
        <p>Token : {{ token }}</p>
    </div>

  
     <!-- <p>{{ data }}</p> -->
    <div class="row">
    <div class="column" v-for="(item,index) of gameCasino" :key="index">
        <h4 class="title">{{ item.ProductName }}</h4>
        <span><img :style="imagaSize" :src="item.Image2 "/></span>
    </div >
    </div>

    <div>
        <!-- <p>{{ indexes }}</p> -->
        <button @click="GetUserProfile">Click Profile Detail</button>
        <p>Profile : {{ userProfile }}</p>
    </div>

  
</template>

<script>
import axios from 'axios';
import { isProxy, toRaw } from 'vue';

axios.defaults.withCredentials = false;

export default {
    data(){
        return{
            data :{
                type : String
            },
            token:{
                type : String
            },
            userProfile:{type : String},
            classReadData:{
                width: "796px",
            },
            gameCasino:[],
            memDetail:{},
            message: 'Hello, world!',
            imagaSize:{
                width:"200px"
            }
        }
    },
    setup(){
        const fun1 = () =>{
            console.log("fun1");
        }
        
        return{
            fun1
        }
    },
    created(){
    //    this.indexes();
    },
    methods: {
        indexes :function(params) {
            console.log("indexes");
            
            axios.post('https://flut.jcmmweb.com/api/v1/auth', {   
                username: "test001",
                password: '123qwe',
            }
            )
            .then(response => {
              console.log(response.data);
              this.data = response.data;
              this.token = response.data.AccessToken;
            })
            .catch(error => {
              console.error(error);
            });
        },
        getToken() {
            
        },
        greet() {
            console.log(this.message);
        },
        GetProductListByCategory(){
            
        },
        GetUserProfile(){
            
            
            axios.defaults.headers.common['X-Member-Details'] = JSON.stringify(this.memDetail);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;

            const headers = { 
                "Content-Type": "application/json",
                "Language":"en-US",
            };
            
            //console.log(headers);
            axios.get('https://flut.jcmmweb.com/api/v1/GetUserProfile', { withCredentials: true} ,{headers}
            ).then(response => {
              console.log(response.data);
              this.userProfile = response.data;
            })
            .catch(error => {
              console.error(error);
            });
        }
    },
    computed:{
    }
};



</script>


<style>
 .classReadData{
    width: 796px;
 }

 .title{
    color :yellow
 }

 * {
  box-sizing: border-box;
}

.hero{
    height: 100% !important;
}

.row {
  display: flex;
}

/* Create three equal columns that sits next to each other */
.column {
  flex: 33.33%;
  padding: 5px;
}

</style>
