<template>
    <!-- Header-->
   <header class="bg-dark py-5">
        <div class="container px-4 px-lg-5 my-5">
            <div class="text-center text-white">
                <h1 class="display-4 fw-bolder">{{ title }}</h1>
                <p class="lead fw-normal text-white-50 mb-0">With this Homepage template</p>
            </div>
        </div>
    </header>

</template>

<script>
export default{
    props:{
            title:{
                type: [String,Number,Array,Object],
                //必选项
                required:true
            },
            age:{
                type:Number,
                default: 0
            },
            names:{
                type:Array,
                default :["ken","Kong"]
            }
    },

}
</script>