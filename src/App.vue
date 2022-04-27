<script setup>

</script>

<template>
<div class="flex justify-between bg-blue-400 px-10 py-4">
  <div >
    <span class="font-bold text-xl text-white p-2">TODO APP</span> 
  </div>
  <div>
  <span class="font-bold text-xl text-white p-2"><router-link to="/">Home</router-link></span>
  <span @click="logout" class="font-bold text-xl text-white p-2 cursor-pointer" v-if="loggedIn">Logout</span>
  <span class="font-bold text-xl text-white p-2" v-else >
   <router-link to="/register" class="px-2" >Register</router-link>
   <router-link to="/login" class="px-2">Login</router-link>
  </span>
  </div>


</div>
 <router-view/>
</template>

<script>

import { getAuth, signOut, onAuthStateChanged } from '@firebase/auth';
import { useRouter } from "vue-router"
import { ref } from "vue"
export default {
  

  setup(){
    const Router = useRouter();
    const loggedIn = ref(false);
    const auth = getAuth()
     const logout = () => {
        signOut(auth)
        Router.push('/login');
     }
    
    onAuthStateChanged(auth, (user) => {
          if(user){
              loggedIn.value = true;
          }else{
              loggedIn.value = false;
           }

      })

    return {
      logout, loggedIn
    }
  }
    
   

 }
</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
 a.router-link-exact-active {
    color: #2c3e50;

}

</style>
