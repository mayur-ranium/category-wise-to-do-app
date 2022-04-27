<template>
<div class="text-2xl font-bold text-blue-500 mt-10">
    Welcome {{ userEmail }}
</div>

<div v-if="user">You Are Logged In </div>
</template>
<script>
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { ref } from "vue"
export default {
   setup(){
       const userEmail = ref('');
       const auth = getAuth();
       onAuthStateChanged(auth, (user) => {
           if(user){
               userEmail.value = user.email;
           }else{
               userEmail.value = "Home"
           }
       })
       return { userEmail }
   }
}
</script>