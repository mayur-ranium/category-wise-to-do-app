<template>
<div class="add-todos">
    <div class="container w-full lg:w-1/2 mx-auto text-left">
        <h1 class="text-blue-500 my-8 font-bold text-2xl text-center">ADD TODO : </h1>
      <div class="lg:w-1/2 w-full mx-auto lg:px-6 lg:pt-12 lg:pb-14 p-4 bg-slate-100 shadowm-sm rounded-lg">
      <div class="mb-6">
        <button class="bg-blue-300 w-full font-bold text-white px-4 py-2 rounded flex justify-between items-center transition
          duration-150 uppercase" id="menu-btn" @click="openMenu">
          <span v-if="categoryName">{{ categoryName }}</span> 
          <span v-else>Categories</span>
          <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="caret-down"
          class="w-2 ml-2"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <path
            fill="currentColor"
            d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
          ></path>
        </svg></button>
        <div class="w-full relative"> 
        <div class="bg-blue-50 shadow-lg hidden flex-col rounded mt-1 py-2 text-sm z-50 absolute w-full" id="dropdown">
            <ul>
               <li class="py-1 px-4 text-black capitalize text-md hover:bg-blue-200 :hover:text-blue-700 cursor-pointer" v-for="(category, index) in categories" :key="index" @click="selectCategory(category)">{{ category.name }}</li>
            </ul>
        </div>
        </div>
    </div>
      <div class="mb-6 text-left text-xl">
          <label class="mb-2 block text-gray-800 font-medium">Description :</label>
          <input type="text" class="bg-white text-black rounded-md border border-gray-200 p-3 focus:outline-none w-full focus:ring-1 focus:ring-violet-300" placeholder="Description" v-model="form.description">
      </div>
      <div class="mb-6 text-left text-xl">
          <label class="mb-2 block text-gray-800 font-medium"> Date :</label>
          <input type="date" class="bg-white text-black rounded-md border border-gray-200 p-3 focus:outline-none w-full focus:ring-1 focus:ring-violet-300" placeholder="Date" v-model="form.date">
      </div>
      <div class="text-center">
      <button type="button" class="bg-blue-400 px-4 py-2 rounded-lg text-white font-bold" :class=" form.description == '' ? 'cursor-not-allowed bg-red-500' : 'cursor-pointer'" @click="addTodo">Add</button>
      </div>
   </div>
 </div> 
</div>

</template>

<script>
     
 

import { useRoute } from 'vue-router'
import { ref } from "vue"
import { getFirestore,collection, getDocs,addDoc } from "firebase/firestore"
import { useToast } from "vue-toastification";
import moment from 'moment';
import { useStore } from "vuex"
export default {
    setup(){
        const form = ref({
            description : '',
            date : '',
       })
       const router = useRoute();
       const toast = useToast();
       const db = getFirestore();
       const store = useStore();
       const categories = ref([]);
       const user = store.getters.user;
       const querySnapshot =  getDocs(collection(db, "users" , user.data.uid , "categories"));
       const categoryName = ref('');
       const categoryId = ref('');
       
       //to get documents
       querySnapshot.then(response =>{
        response.docs.forEach((doc) => { 
          categories.value.push(
           {
             name : doc.data().category,
             id : doc.id
           })
        })
      })

       //open dropdown menu
       const openMenu = () => {
       const menuBtn = document.querySelector('#menu-btn')
       const dropdown = document.querySelector('#dropdown')
               if(dropdown.classList.contains('hidden')){
                   dropdown.classList.remove('hidden');
                   dropdown.classList.add('flex');
               }else{
                   dropdown.classList.remove('flex')
                   dropdown.classList.add('hidden')
               } 
        }
         
        //select Category 
        const selectCategory = (category) => {
            categoryName.value = category.name;
            categoryId.value = category.id;
            openMenu();            
        }

       //add todo
       const addTodo = () => {
           if(form.value.description == '' && categoryName.value){
               toast.error('Field is required.')
               return;
           }else{
               const db = getFirestore();
               const dateFormat = moment(form.value.date).format('DD/MM/YYYY');
               addDoc(collection(db, "users", user.data.uid, "categories", categoryId.value, "todos"), {
                   category : categoryName.value,
                   todo : form.value.description,
                   date : dateFormat,
           });  
              toast.success("Todo added.")
           }
       }
       return{form,addTodo,toast,openMenu,categories, selectCategory, categoryName, categoryId};
    }
}
</script>