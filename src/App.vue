<template>
<div class="lg:flex flex-column justify-between items-center bg-blue-400 px-10 py-4">
  <div >
    <span class="font-bold text-xl text-white p-2">TODO APP</span> 
  </div>
  <div class="flex-column lg:flex items-center">
  <div class="font-bold text-xl text-white p-2"><router-link to="/">Home</router-link></div>

  
  <div  v-if="user.loggedIn" class="font-bold text-xl flex-column lg:flex items-center  text-white p-2">
      <div><router-link to="/categories" class="px-1">Categories</router-link></div>
      <div @click="logout" class="font-bold text-xl text-white p-1 cursor-pointer" >Logout</div>
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

import { getAuth, signOut } from '@firebase/auth';
import { useRouter } from "vue-router"
import { provideToast } from "vue-toastification";
import "vue-toastification/dist/index.css";
import { useStore } from "vuex";
export default {
  

  setup(){
    const router = useRouter();
    const auth = getAuth();
    const store = useStore();
    provideToast({ timeout: 3000 });
    const user = store.getters.user;
    const logout = () => {
      localStorage.clear();
        signOut(auth)
        router.push('/login');
    }
    return {logout, user}
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
