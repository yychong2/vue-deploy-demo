<template>
    <h3 class="title">{{ title }} </h3>

    <form @submit.prevent="loginWithPassword">
      <label>
        Username
        <input type="text" v-model="username" />
      </label>
      <label>
        Password
        <input type="password" v-model="password" />
      </label>
      <button type="button" @click="getToken">Log in</button>
    </form>


    <!-- <div>
        <p>{{ indexes }}</p> 
        <button @click="getToken">Click Token</button>
    </div> -->
    <Transition>
    <div v-if="tokenRes">

        <div style="overflow-wrap: break-word" >
        <p>Token : {{ token }}</p>
        </div>

        <div>
            <!-- <p>{{ indexes }}</p> -->
            <button type="button" @click="GetUserProfile">Click Profile Detail after click Token</button>
            <p>Profile Detail :{{ memProfile }}</p>
        </div>

        <div>
            <button @click="GetProductListByCategory">Click get GameList</button>
            <div class="row">
            <div class="column" v-for="(item,index) of gameCasino" :key="index">
                <h4 class="title">{{ item.ProductName }}</h4>
                <span><img :style="imagaSize" :src="item.Image2 "/></span>
            </div>
            </div>
        </div>
    </div>
    <div v-else>
        <p>{{ errorMsg }}</p> 
       
    </div>
    </Transition>


  
</template>

<script>
import axios from 'axios';
import { isProxy, toRaw } from 'vue';

axios.defaults.withCredentials = true;

export default {
    data(){
        return{
            data :"",
            token:"",
            username:"",
            password:"",
            tokenRes : false,
            title:"",
            errorMsg : "",
            gameCasino:[],
            memDetail:{},
            imagaSize:{
                width:"100px"
            },
            classReadData:{
                width: "796px",
            },
            memProfile:{}
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
        //  console.log(this.apiUrl);
            this.indexes();
    },
    methods: {
        indexes :function(params) {
            console.log("indexes");
            this.title = "Welcome Vue 2 Demo"

            // axios.post(this.apiUrl+ 'auth', {   
            //     username: "test001",
            //     password: '123qwe',
            // }
            // )
            // .then(response => {
            //   console.log(response.data);
            //   this.data = response.data;
            //   this.token = response.data.AccessToken;
            // })
            // .catch(error => {
            //   console.error(error);
            // });
        },
        getToken() {
         
            axios.post( this.apiUrl +'auth ', {   
                username: this.username,
                password: this.password,
            },
            {  
                'X-Requested-With': 'XMLHttpRequest',
                withCredentials: true,
                credentials: 'include'
            }
            )
            .then(response => {
              this.data = response.data;
              this.token = response.data.AccessToken;
              this.memDetail = response.data.MemberDetail;

              //console.log(toRaw(this.memDetail));
              this.tokenRes = true;

            })
            .catch(error => {
                console.error(error);
                this.errorMsg = error;
            });
        },
        
        GetProductListByCategory(){
            console.log(this.token)
            axios.post(this.apiUrl+ 'GetProductListByCategory', {   
                  "CategoryType": "SL",
                  "IsLaunchGame": false
                }
            )
            .then(response => {
            
              this.gameCasino = response.data.ProductTypeContent;
              console.log(response.data.ProductTypeContent);
            })
            .catch(error => {
              console.error(error);
            });
        },

        GetUserProfile(){
          
            var memDetail2 = JSON.stringify(toRaw(this.memDetail));
            //console.log(memDetail2)
            
            axios.defaults.headers.common['Content-Type'] = "application/json";
            axios.defaults.headers.common['X-Member-Details'] = memDetail2;
            axios.defaults.headers.common['Authorization'] = 'Bearer ' +  this.token;

            const headers = { 
                "Content-Type": "application/json",
                "Language":"en-US",
                "X-Member-Details" : axios.defaults.headers.common['X-Member-Details'],
                "Authorization" : axios.defaults.headers.common['Authorization']
            };

            axios.get('https://flut.jcmmweb.com/api/v1/GetUserProfile',
             {  } ,   {headers}
            ).then(response => {
              console.log(response.data);
              this.memProfile = response.data.UserDetail
            })
            .catch(error => {
              console.error(error);
            });
        }
    },
    computed:{
    },
   
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

.active{
    display: block;
}

.non-active {
    display: none;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
