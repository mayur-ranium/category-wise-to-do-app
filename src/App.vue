<template>
<div class="lg:flex flex-column justify-between items-center bg-blue-400 px-10 py-4">
  <div >
    <span class="font-bold text-xl text-white p-2">TODO APP</span> 
  </div>
  <div class="flex-column lg:flex items-center">
  <div class="font-bold text-xl text-white p-2"><router-link to="/">Home</router-link></div>

  <div  v-if="loggedIn" class="font-bold text-xl flex-column lg:flex items-center  text-white p-2">
      <div><router-link to="/categories">Categories</router-link></div>
      <div @click="logout" class="font-bold text-xl text-white p-2 cursor-pointer" >Logout</div>
  </div>

  <div class="font-bold text-xl text-white p-2" v-else >
   <router-link to="/register" class="px-2" >Register</router-link>
   <router-link to="/login" class="px-2">Login</router-link>
  </div>
  </div>
</div>
 <router-view/>
</template>

<script>

import { getAuth, signOut, onAuthStateChanged } from '@firebase/auth';
import { useRouter } from "vue-router"
import { ref } from "vue"
// Import from vue-toastification/composition, not vue-toastification
import { provideToast } from "vue-toastification";
// Also import the toast's css
import "vue-toastification/dist/index.css";
export default {
  

  setup(){
    const router = useRouter();
    const loggedIn = ref(false);
    const auth = getAuth()
    provideToast({ timeout: 3000 });


    const logout = () => {
        signOut(auth)
        router.push('/login');
    }
     
     onAuthStateChanged(auth, (user) => {
          if(user){
              loggedIn.value = true;
          }else{
              loggedIn.value = false;
           }
      })
    return {logout,loggedIn}
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
