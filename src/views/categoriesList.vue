<template>
<div class="categories-list lg:w-1/2 w-full mx-auto">
  <h1 class="text-2xl text-blue-500 my-6 font-bold">Todo Categories</h1>
 <div class="text-right">
   <button class="bg-blue-500 px-2 py-1  text-white text-sm font-bold rounded" @click="Router.push('/category/create')">Add Category</button>
 </div>
  <div class="mt-6 w-full">
   <table class="border-collapse border border-slate-400 w-full text-black text-left">
        <thead class="text-center">
        <tr>
            <th class="p-2">SR NO.</th>
            <th class="border border-slate-300 p-2 font-bold">Category Name</th>
            <th class="border border-slate-300 p-2 font-bold">Status</th>
            <th class="border border-slate-300 p-2 font-bold">Date</th>
            <th class="border border-slate-300 p-2">Edit</th>
            <th class="border border-slate-300 p-2">Delete</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="(categories, categoryIndex) in categoriesList" :key="categoryIndex" class="text-center font-bold text-black">
                <td class="border border-slate-300 px-2 py-2 ">{{ categoryIndex + 1 }}</td>
                <td class="text-left px-2 py-2 capitalize border border-slate-300 hover:text-blue-700">
                <a href="#">{{categories.category}}</a>  
                </td>
                   <td class="border border-slate-300 px-2 py-2">
                    <input type="checkbox" v-model="categories.done">
                </td>
                <td class="border border-slate-300 px-2 py-2">
                    {{ categories.Date }}
                </td>
                <td class="border border-slate-300"> <span class="fa fa-pen"></span></td>
                <td class="border border-slate-300"> <span class="fa fa-trash"></span></td>
            </tr>
        </tbody>
    </table>
  </div>
</div>
</template>

<script>
import { collection, getDocs , getFirestore} from "firebase/firestore";
import { ref } from "vue";
import { useRouter } from "vue-router"
export default{
    setup(){
      const db = getFirestore();
      const categoriesList = ref([]);
      const querySnapshot =  getDocs(collection(db, "categories"));
      const Router = useRouter();

      querySnapshot.then(response =>{
        response.docs.forEach((doc) => {
          categoriesList.value.push(doc.data());
      });
          console.log(categoriesList);
    })
      return{categoriesList,Router}
   }
  }
</script>

<style>
   th {
     background-color: rgb(76, 181, 238);
     color: #ffffff;
   }
    tr:nth-child(even) {
        background-color: rgb(251, 244, 244);
    }
    tr:nth-child(od) {
        background-color: #fff;
    }
</style>