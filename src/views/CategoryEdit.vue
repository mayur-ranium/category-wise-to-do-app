<template>
<div>
<div class="container mx-auto lg:w-1/2 w-full px-2">
 <h1 class="text-blue-500 my-8 font-bold text-2xl">Update Category: </h1>

        <div class="flex lg:flex-nowrap flex-wrap justify-center w-full">
            <input type="text" id="text" class="bg-white rounded-md border border-gray-200 px-4 py-2 placeholder:text-slate-400 focus:outline-none w-full focus:ring-1 focus:ring-red-200" placeholder="Category Name" v-model="editCategory" >
            <button  class=" text-white px-4 py-2 font-bold rounded-lg ml-2 focus:outline-none focus:ring-1 focus:ring-violet-300 mt-4 lg:mt-0" :class="editCategory == ''?  'bg-red-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'"  @click="update">UPDATE</button>
            
       </div>
 </div>

</div>



</template>
<script>
import { ref } from "vue"
import { getDoc,doc, getFirestore, updateDoc } from "firebase/firestore"
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router"
import { useStore } from "vuex"
export default {
 props: ['id'],

setup(props){
       const editCategory = ref('');
       const db = getFirestore();
       const store = useStore();
       const user = store.getters.user;
       const docRef = doc(db, "users", user.data.uid, "categories", props.id);
       const router = useRouter();
       const toast = useToast();
        
        
    getDoc(docRef)
        .then((doc) => {
            editCategory.value = doc.data().category;
        })

    const update = () => {
        if(editCategory.value == ''){
            toast.error("Please enter category name.")
            return;
        }

    updateDoc(docRef, {
            category: editCategory.value,
        })
          
        toast.success("Category name updated.");
        router.push('/categories');
        }
        return { editCategory, update}
    }
}
</script>