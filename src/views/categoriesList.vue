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
            <th class="border border-slate-300 p-2 font-bold">SR NO.</th>
            <th class="border border-slate-300 p-2 font-bold">CATEGORY NAME</th>
            <th class="border border-slate-300 p-2 font-bold">EDIT</th>
            <th class="border border-slate-300 p-2 font-bold">REMOVE</th>
        </tr>
        </thead>
        <tbody class="text-black">
            <tr v-for="(categories, categoryIndex) in categoriesList" :key="categoryIndex" class="text-center">
                <td class="border border-slate-300 px-2 py-2 font-bold">{{ categoryIndex + 1 }}</td>
                <td class="text-left px-2 py-2 capitalize border border-slate-300 hover:text-blue-500 font-bold cursor-pointer">
                    {{categories.category}}
                 </td>
                  <td class="px-2 py-2 capitalize border border-slate-300" @click="editCat(categories)">
                    <span class="fa fa-pen"></span>
                  </td>
                  <td class="px-2 py-2 capitalize border border-slate-300" @click="deleteCategory(categories, categoryIndex)">
                    <span class="fa fa-trash"></span>
                  </td>
            </tr>
        </tbody>
    </table>
  </div>
</div>
</template>

<script>
import { collection, deleteDoc, getDocs , getFirestore, doc} from "firebase/firestore";
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
        categoriesList.value.push(
          {
            category : doc.data().category,
            id : doc.id
          })
        })
      })

      const editCat = (categories) => {
        Router.push(`/category/edit/${categories.id}`);
      }

      const deleteCategory = (categories, index) => {
        deleteDoc(doc(db, "categories", categories.id));
        categoriesList.value.splice(index,1);
      }
       
      return{categoriesList,Router,editCat,deleteCategory}
   }
  }
</script>

<style>
    th {
      background-color: rgb(114, 161, 238);
      color:#ffffff;
    }
    tr:nth-child(even) {
        background-color: rgb(241, 226, 226);
    }
    tr:nth-child(od) {
        background-color: #fff;
    }
</style>