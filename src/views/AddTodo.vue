<template>
<div class="add-todos">
    <div class="container w-full lg:w-1/2 mx-auto text-left">
        <h1 class="text-blue-500 my-8 font-bold text-2xl text-center">ADD TODO : </h1>
      <div class="lg:w-1/2 w-full mx-auto lg:px-6 lg:py-10 p-4 bg-slate-100 shadowm-sm rounded-lg">
        <div class="mb-8 text-left text-xl">
            <label class="mb-2 block text-gray-800 font-medium ">Category Name:</label>
            <input type="name" class="bg-white text-black cursor-not-allowed rounded-md border border-gray-200 p-3 focus:outline-none w-full uppercase focus:ring-1 focus:ring-red-300"  disabled v-model="name">
      </div>
      <div class="mb-8 text-left text-xl">
          <label class="mb-2 block text-gray-800 font-medium">Description :</label>
          <input type="text" class="bg-white text-black rounded-md border border-gray-200 p-3 focus:outline-none w-full focus:ring-1 focus:ring-violet-300" placeholder="description" v-model="description">
      </div>
      <div class="mb-8 text-left text-xl">
          <label class="mb-2 block text-gray-800 font-medium"> Start Date :</label>
          <input type="date" class="bg-white text-black rounded-md border border-gray-200 p-3 focus:outline-none w-full focus:ring-1 focus:ring-violet-300" placeholder="Start Date" v-model="startDate">
      </div>
      <div class="mb-8 text-left text-xl">
          <label class="mb-2 block text-gray-800 font-medium"> End Date :</label>
          <input type="date" class="bg-white text-black rounded-md border border-gray-200 p-3 focus:outline-none w-full focus:ring-1 focus:ring-violet-300" placeholder="End Date" v-model="endDate">
      </div>
      <div class="text-center">
      <button type="button" class="bg-blue-400 px-4 py-2 rounded-lg text-white font-bold" @click="addTodo">Add</button>
      </div>
        </div>
 </div>
   
</div>


</template>
<script>
import { useRoute } from 'vue-router'
import { ref } from "vue"
import { getFirestore,addDoc,collection } from "firebase/firestore"
import { useToast } from "vue-toastification";
export default {
    props: [
        'name'
    ],
    setup(){
       const name = ref ('');
       const description = ref('');
       const startDate = ref('');
       const endDate = ref('');
       const route = useRoute();
       const toast = useToast();
       name.value = route.params.name;
       
       const addTodo = () => {
            const db = getFirestore();
            const docRef =  addDoc(collection(db, "todos"), {
                category : name.value,
                todo : description.value,
                start_date : startDate.value,
                end_date : endDate.value
        });  
           toast.success("Todo added.")
       }

       return{name,description,startDate,endDate,addTodo,toast};
    }

}
</script>