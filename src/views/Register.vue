<template>
<div class="Register mt-10">
    <div class="container lg:w-3/12 md:w-1/2 w-full mx-auto px-4">
     
     <div class=" bg-slate-100 shadow-sm rounded-xl p-8">
         <h1 class="text-2xl mb-10 font-bold text-blue-400">REGISTER</h1>
      <div class="mb-5 text-left text-xl">
        <label class="mb-2 block text-gray-800" for="email">Name</label>
        <input type="email" class="bg-white text-black rounded-md border border-gray-200 p-3 focus:outline-none w-full capitalize" placeholder="Name" v-model="name" required>
      </div>
      <div class="mb-5 text-left text-xl">
        <label class="mb-2 block text-gray-800" for="email">Email</label>
        <input type="email" class="bg-white text-black rounded-md border border-gray-200 p-3 focus:outline-none w-full" placeholder="Email" v-model="email">
      </div>
      <div class="mb-5 text-left text-xl">
          <label class="mb-2 block text-gray-800" for="password">Password</label>
          <input type="password" class="bg-white text-black rounded-md border border-gray-200 p-3 focus:outline-none w-full" placeholder="Password" v-model="password">
      </div>
       <h1 class="text-red-500 font-bold text-2xl mt-5">{{ err }} </h1>
          <button type="button" class="bg-blue-400 px-4 py-2 rounded-lg text-white font-bold mt-5" @click="submit" >SUBMIT</button>
    </div>
    
    </div>
</div>

</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { ref } from "vue"
import { useRouter } from 'vue-router'
import { getFirestore } from "firebase/firestore"
import { collection, addDoc } from "firebase/firestore"; 
import { useToast } from "vue-toastification";
export default {
    setup(){
      const email = ref('');
      const password = ref('');
      const name = ref('');
      const err = ref('');
      const errorMessage = ref('');
      const router = useRouter();
       const toast = useToast();
    
        const submit = () => {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email.value, password.value, name.value)
            .then((userCredential) => {
            const user = userCredential.user;
            user.displayName = name.value;
            const db = getFirestore();
            const docRef =  addDoc(collection(db, "users"), {
            username : user.displayName,
            email:user.email
        });
            toast.success("Register User Successfully.")
            router.push('/');
        })
            .catch((error) => {
             let errorMessage = {
                 'auth/internal-error' : 'Password is Missing',
                 'auth/invalid-email': "Invalid Email" ,
                 'auth/weak-password': "Password should be at least 6 characters ",
                 'auth/email-already-in-use': "Email Already in use Try Another",
                }
                err.value = errorMessage[error.code];
            });
      }


      return {submit, email, password, name, errorMessage, err }

    }

}
</script>