<template>
<div class="todos lg:w-1/2 w-full mx-auto">
<h1 class="text-2xl text-blue-500 my-8 font-bold">Todos</h1>
 <div class="text-right">
 <span>
   <button class="bg-blue-500 px-2 py-1  text-white text-sm font-bold rounded" @click="router.push('/addtodo')">Add Todo</button>
   </span>
 </div>
  <div class="mt-6 w-full">
   <table class="border-collapse border border-slate-400 w-full text-black text-left">
        <thead class="text-center">
        <tr>
            <th class="border border-slate-300 p-2 font-bold">SR NO.</th>
            <th class="border border-slate-300 p-2 font-bold">TODO NAME</th>
            <th class="border border-slate-300 p-2 font-bold">DATE</th>
            <th class="border border-slate-300 p-2 font-bold">EDIT</th>
            <th class="border border-slate-300 p-2 font-bold">REMOVE</th>
        </tr>
        </thead>
        <tbody class="text-black">
            <tr  class="text-center" v-for="(todo, index) in todos" :key="index">
                <td class="border border-slate-300 px-2 py-2 font-bold">{{ index +1 }}</td>
                  <td class="text-left px-2 py-2 capitalize border border-slate-300 hover:text-blue-500 font-bold cursor-pointer">
                   {{todo.todo}}
                 </td>
                <td class="text-center px-2 py-2 capitalize border border-slate-300 hover:text-blue-500 font-bold cursor-pointer">
        
                   {{todo.date}}
                 </td>
                  <td class="px-2 py-2 capitalize border border-slate-300">
                    <span class="fa fa-pen"></span>
                  </td>
                  <td class="px-2 py-2 capitalize border border-slate-300">
                    <span class="fa fa-trash"></span>
                  </td>
            </tr>
        </tbody>
    </table>
  </div>

</div>


</template>


<script>
import { getFirestore } from '@firebase/firestore';
import { useRouter } from "vue-router";
import { getDocs,collection } from "firebase/firestore"
import { ref } from "vue"

export default {
    setup(){
       const router = useRouter();
       const db = getFirestore();
       const todos = ref([]);
       const categoryId = ref('');
       const userUid = ref('');
       userUid.value = localStorage.getItem("userUid");
       categoryId.value = localStorage.getItem("categoryId");

       const querySnapshot =  getDocs(collection(db, "users", userUid.value, "categories", categoryId.value, 'todos'));

       querySnapshot.then(response =>{
         response.docs.forEach((doc) => { 
          todos.value.push(
           {
             todo : doc.data().todo,
             id : doc.id,
             date: doc.data().date,
           })
        })
      })
       return{ todos, categoryId, userUid, router};

    }
}
</script>