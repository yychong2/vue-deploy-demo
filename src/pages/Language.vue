<template>
    <Header :title="title" :description="description"/>
    <div>
        <p>{{ $t("home.created_by" , {company : "Lokalise" }) }}</p>
        <p>{{ $t("home.num_visits", 30) }}</p>
        <p>{{ $t("about.donations", { donations: $n(1456, "currencyFormat") }) }}</p>
        <p>{{ $d(new Date(), "longFormat") }}</p>
    </div>
</template>

<script>

    import Header from '../components/header.vue'
    import { useI18n } from 'vue-i18n'

    export default{
        data(){
           const { t } = useI18n()

           return{
            title : t("title.language"),
            description : t("title.language_description"),
           }
        },
        setup() {
        },
        methods:{
        },
        components:{
            Header
        }
    }
</script>