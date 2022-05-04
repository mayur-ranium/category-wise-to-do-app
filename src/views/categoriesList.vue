<template>
<div class="categories-list">
  <h1 class="text-2xl text-blue-500 mt-6 font-bold">Todo Categories</h1>

  <div class="mt-6">
   <table class="border-collapse border border-slate-400 lg:w-1/2 w-full mx-auto text-black text-left">
        <thead class="text-center">
        <tr>
            <th>SR NO.</th>
            <th class="border border-slate-300 px-2 font-bold">Category Name</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="(categories, categoryIndex) in categoriesList" :key="categoryIndex" class="text-center">
                <td class="border border-slate-300 px-2 py-2 ">{{ categoryIndex + 1 }}</td>
                <td class="text-left px-2 py-2 capitalize border border-slate-300 ">
                  {{categories.category}}</td>
            </tr>
        </tbody>
    </table>
  </div>
</div>
</template>

<script>
import { collection, getDocs , getFirestore} from "firebase/firestore";
import { ref } from "vue";
export default{
    setup(){
      const db = getFirestore();
      const categoriesList = ref([]);
      const querySnapshot =  getDocs(collection(db, "categories"));

      querySnapshot.then(response =>{
        response.docs.forEach((doc) => {
          categoriesList.value.push(doc.data());
        console.log(doc.id, " => ", doc.data());
      });
    })
      return{categoriesList}
   }
  }
</script>