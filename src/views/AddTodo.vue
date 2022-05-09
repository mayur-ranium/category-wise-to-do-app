<template>
<div class="add-todos">
    <div class="container w-full lg:w-1/2 mx-auto text-left">
        <h1 class="text-blue-500 my-8 font-bold text-2xl text-center">ADD TODO : </h1>
      <form class="lg:w-1/2 w-full mx-auto lg:px-6 lg:py-10 p-4 bg-slate-100 shadowm-sm rounded-lg" @submit.prevent="addTodo">
        <div class="mb-8 text-left text-xl">
            <label class="mb-2 block text-gray-800 font-medium ">Category Name:</label>
            <input type="name" class="bg-slate-50 text-black text-opacity-50 cursor-not-allowed rounded-md border border-gray-200 p-3 focus:outline-none w-full uppercase focus:ring-1 focus:ring-red-300"  disabled v-model="form.categoryName">
      </div>
      <div class="mb-8 text-left text-xl">
          <label class="mb-2 block text-gray-800 font-medium">Description :</label>
          <input type="text" class="bg-white text-black rounded-md border border-gray-200 p-3 focus:outline-none w-full focus:ring-1 focus:ring-violet-300" placeholder="Description" v-model="form.description">
      </div>
      <div class="mb-8 text-left text-xl">
          <label class="mb-2 block text-gray-800 font-medium"> Date :</label>
          <input type="date" class="bg-white text-black rounded-md border border-gray-200 p-3 focus:outline-none w-full focus:ring-1 focus:ring-violet-300" placeholder="Date" v-model="form.date">
      </div>
      <div class="text-center">
      <button type="submit" class="bg-blue-400 px-4 py-2 rounded-lg text-white font-bold" :class="form.description == '' ? 'cursor-not-allowed bg-red-500' : 'cursor-pointer'">Add</button>
      </div>
   </form>
 </div>
   
</div>


</template>
<script>
import { useRoute } from 'vue-router'
import { ref } from "vue"
import { getFirestore,addDoc,collection } from "firebase/firestore"
import { useToast } from "vue-toastification";
import moment from 'moment';
export default {
    setup(){
        const form = ref({
            description : '',
            date : '',
            categoryName: ''
       })
       const route = useRoute();
       const toast = useToast();
       
       form.value.categoryName = route.params.category;
       form.value.date = moment(form.value.date).format('DD/MM/YYYY');
       const addTodo = () => {
           
           if(form.value.description == ''){
               toast.error('Field is required.')
               return;
           }else{
               const db = getFirestore();
               const docRef =  addDoc(collection(db, "todos"), {
                   category : form.value.categoryName,
                   todo : form.value.description,
                   date : form.value.date,
           });  
              toast.success("Todo added.")
           }
       }
       return{form,addTodo,toast};
    }
}
</script>