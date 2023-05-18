<template>
  <Header :title="title" :description="description"/>

    <section class="form-01-main">
      <div class="form-cover">
      <div class="container">

        <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
              
              <p>{{$t("about.content1")}}</p>

              <p>{{$t("about.content2")}}</p>

              <p>{{$t("about.content3")}}</p>
              
            </div>
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

.justify-content-center{
    margin-top: 38px;
    color: white;
}
</style>