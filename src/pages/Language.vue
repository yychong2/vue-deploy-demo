<template>
    <Header :title="title"/>
    <div>
        <p>{{ $t("home.created_by" , {company : "Lokalise" }) }}</p>
        <p>{{ $t("home.num_visits", 30) }}</p>
        <p>{{ $t("about.donations", { donations: $n(1456, "currencyFormat") }) }}</p>
        <p>{{ $d(new Date(), "longFormat") }}</p>
    </div>
</template>

<script>

    import Header from '../components/header.vue'

    export default{
        data(){
           return{
            title :"Language Testing",
           }
        },
        methods:{
        },
        components:{
            Header
        }
    }
</script>