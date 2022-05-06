<template>
<div class="Login mt-10">
    <div class="container lg:w-3/12 md:w-1/2 w-full mx-auto px-4">
     <div class=" bg-slate-100 shadow-sm rounded-xl p-8">
         <h1 class="text-2xl mb-10 font-bold text-blue-400">LOGIN</h1>
      <div class="mb-5 text-left text-xl">
        <label class="mb-2 block text-gray-800" for="email">Email</label>
        <input type="email" class="bg-white text-black rounded-md border border-gray-200 p-3 focus:outline-none w-full" placeholder="Email" v-model="email">
      </div>
      <div class="mb-5 text-left text-xl">
          <label class="mb-2 block text-gray-800" for="password">Password</label>
          <input type="password" class="bg-white text-black rounded-md border border-gray-200 p-3 focus:outline-none w-full" placeholder="Password" v-model="password">
      </div>
      <button type="button" class="bg-blue-400 px-4 py-2 rounded-lg text-white font-bold mt-5" @click="login">LOGIN</button>
        </div>
    </div>
</div>
</template>

<script>
    import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
    import { ref } from "vue"
    import { useRouter } from 'vue-router'
    import { useToast } from "vue-toastification";
    export default {
    setup(){
      const email = ref('');
      const password = ref('');
      const errorMessage = ref('');
      const router = useRouter();
      const toast = useToast();

      const login = () => {
        const auth = getAuth();
           signInWithEmailAndPassword(auth, email.value, password.value)
           .then((userCredential) => {
               const user = userCredential.user;
               toast.success("You have successfully logged in.")
               router.push("/");
           })
           .catch((error) => {
               let errorMessage = {
                   'auth/user-not-found' : 'There is no account with this email.',
                   'auth/invalid-email' : "Invalid email",
                   'auth/internal-error' : "Password is missing.",
                   'auth/wrong-password' : "Incorrect password."
               }
              toast.error(errorMessage[error.code]);
           })
      }


      return {login, email, password, errorMessage }

    }

}
</script>