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
            axios.post('https://flut.jcmmweb.com/api/v1/auth ', {   
                username: "davis7231",
                password: '123qwe',
            },
            {  
                'X-Requested-With': 'XMLHttpRequest',
                 withCredentials: true
            }
            )
            .then(response => {
              this.data = response.data;
              this.token = response.data.AccessToken;
              this.memDetail = response.data.MemberDetail;
              //console.log(response.headers['set-cookie']);
              //console.log(JSON.stringify(this.memDetail));
              //console.log(toRaw(this.memDetail));
              // this.GetProductListByCategory();
            })
            .catch(error => {
              console.error(error);
            });
        },
        greet() {
            console.log(this.message);
        },
        GetProductListByCategory(){
            console.log(this.token)
            axios.post('https://flut.jcmmweb.com/api/v1/GetProductListByCategory', {   
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
            
            // const headers = { 
            //     "Content-Type": "application/json",
            //     "Cookie" : "im1mYKDxV8SfewHRyCIKYOF4QYCkFxBAd4wNcCzUTgcTAg6Fj6sugZIuQ7GWHNrQfq2g2QaT/eHTfuhtdmblVg==",
            //     "Language":"en-US",
            //     "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjE0NSIsImp0aSI6Ijk4OGQwOWE0LTNjNWYtNDAzNy1iYTBhLWZkNGY5YTJkNGQ5ZCIsIm5iZiI6MTY4MzAxMzQ3MiwiZXhwIjoxNjgzMDM1MDcyLCJpYXQiOjE2ODMwMTM0NzJ9.k4NCpjVhc--wLexqomqzCzdPt08w4XLmQCmfMPI3Log" ,
            //     "X-Member-Details": '{ "Username": "local01", "UserId": "12145","UserGroup": "42","UserGroupName": "VIP42","Email": "laliho@mail.com","IpAddress": "161.142.151.114","IsPauseBet": false,"PlayerType": "0","AgentId": "1","AgentCode": "ag1","Name": "Laliho","DateCreated": "2022-11-10T08:27:59","MinWithdrawal": 0,"MaxWithdrawal": 0,"DailyWithdrawalLimit": 0,"DailyWithdrawalLimitAmt": 0,"Currency": "CNY"}' ,
            // };
        
            //var memDetail = '{ "Username": "local01", "UserId": "12145","UserGroup": "42","UserGroupName": "VIP42","Email": "laliho@mail.com","IpAddress": "161.142.151.114","IsPauseBet": false,"PlayerType": "0","AgentId": "1","AgentCode": "ag1","Name": "Laliho","DateCreated": "2022-11-10T08:27:59","MinWithdrawal": 0,"MaxWithdrawal": 0,"DailyWithdrawalLimit": 0,"DailyWithdrawalLimitAmt": 0,"Currency": "CNY"}';
            axios.defaults.headers.common['X-Member-Details'] = JSON.stringify(this.memDetail);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
            //axios.defaults.headers.common['Cookie'] = 'xGWodtdScUzVe+ySXuMDV6OMGzvz0IbJq8mBLP6oXgKeHlzxwgLwLvbySMICFeBBYw9z3gFChakPH1PWkKniAw==';

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