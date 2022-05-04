<template>
<div class="category-create">
 <div class="container mx-auto lg:w-1/2 w-full px-2">
 <h1 class="text-blue-500 my-8 font-bold text-2xl">Create New Category: </h1>
        <div class="flex lg:flex-nowrap flex-wrap justify-center w-full">
            <input type="text" id="text" class="bg-white rounded-md border border-gray-200 px-4 py-2 placeholder:text-slate-400 focus:outline-none w-full focus:ring-1 focus:ring-red-200" placeholder="Category Name" v-model="categoryName" >
            <button class=" text-white px-4 py-2 font-bold rounded-lg ml-2 focus:outline-none focus:ring-1 focus:ring-violet-300 mt-4 lg:mt-0" :class="categoryName == ''?  'bg-red-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'"  @click="submit">SUBMIT</button>
       </div>
 </div>
</div>
</template>

<script>

import { ref } from "vue"
import { useRouter } from "vue-router"
import { getFirestore, addDoc, collection } from "firebase/firestore"
export default {
    setup(){
         const categoryName = ref('');
         const errMsg = ref(false)
         const router = useRouter()
         const submit = () => {
            if(categoryName.value == ''){
                alert("Please Enter Category Name.")
                return;
            }
            const db = getFirestore();
            const docRef =  addDoc(collection(db, "categories"), {
            category : categoryName.value,
        });  
            categoryName.value = ""
            alert("Category created succefully.");
            router.push('/categories');
         } 
         return{categoryName,submit, errMsg};
    }
}

</script>