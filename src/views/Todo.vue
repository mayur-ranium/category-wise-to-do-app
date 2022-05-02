<template>
<div>
<div class=" mx-auto mt-10">
 <h1 class="text-blue-500 text-2xl font-bold text-center">MY TODO APP</h1>
  <div class="mt-10">
    <div class="lg:w-1/2 w-full mx-auto">
      <div>
        <button id="dropdownDefault" @click="isOpen = !isOpen" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
          <span v-if="categoryName">{{categoryName}}</span>
          <span v-else>Select Category</span>
          
          
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
        <div v-if="isOpen" class="z-10 absolute bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700">
          <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
             <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" v-for="category,categoryIndex in categories" :key="categoryIndex" @click="selectCategory(category)">{{ category.Name }}</a>
             </li>
         </ul>
      </div>
    </div>
   <div>
   <h1 class="font-bold my-6 text-black"> Category Name: <span class="uppercase text-gray-800">{{categoryName}}</span></h1>
   </div> 
     
        <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 font-bold rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-300 mt-8" :disabled="categoryName == ''" @click="submit">SUBMIT</button>
     </div>
  
    
     <div class="mt-8">
         <table class="border-collapse border border-slate-400 lg:w-1/2 w-full mx-auto text-black text-left">
        <thead class="text-center">
        <tr>
            <th>SR NO.</th>
            <th class="border border-slate-300 px-2 font-bold">Category Name</th>
            <th class="border border-slate-300">EDIT</th>
            <th class="border border-slate-300">REMOVE</th>
            <th class="border border-slate-300">Date</th>
            <th class="border border-slate-300 px-2 font-bold">STATUS</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="(todos, todoIndex) in newTodos" :key="todoIndex" class="text-center">
                <td class="border border-slate-300 px-2 py-2 ">{{ todoIndex + 1 }}</td>
                <td class="border border-slate-300 px-2 py-2 cursor-pointer capitalize font-semibold break-all">{{ todos.Name }}</td>
                <td class="border border-slate-300 px-2 py-2 cursor-pointer capitalize font-semibold break-all"></td>
                <td class="border border-slate-300 px-2 py-2 cursor-pointer capitalize font-semibold break-all"></td>
                <td class="border border-slate-300 px-2 py-2 cursor-pointer capitalize font-semibold break-all text-center"></td>
                <td class="border border-slate-300 px-2 py-2 cursor-pointer capitalize font-semibold break-all"></td>
            </tr>
        </tbody>

    </table>
        
    </div>
  </div>
</div>


</div>



</template>


<script>
import { reactive, ref } from "vue"
export default {
  setup(){
          const categories = reactive([
           {
             Name : "Do Now",
             done: false
           },
           {
             Name: "Do tommorow",
             done: false
           },
           {
             Name: "Do Soon",
             done : false
           },
           {
             Name: "Do when get Some Extra time",
             done: false
           }
     ]);
    
        const isOpen = ref(false)
     
        const content = ref('')
        const newTodos = ref([
        
        ])
        const dueDate = ref()
         const categoryName = ref('');
        const selectCategory = (category) => {
           
            categoryName.value = category.Name
            isOpen.value = false;
      
       
        }
        
        const submit = () => {
         
           newTodos.value.push({
                Name : categoryName.value,
            })
            categoryName.value = '';
  
        }

       return{categories, isOpen, content, selectCategory, newTodos, categoryName, submit, dueDate};
  },
}
</script>