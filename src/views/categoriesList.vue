<template>
<div class="categories-list">
</div>
</template>

<script>
import { collection, getDocs , getFirestore} from "firebase/firestore";
export default{
    setup(){
    const db = getFirestore();
    const querySnapshot =  getDocs(collection(db, "categories"));

    querySnapshot.then(response =>{
        response.docs.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    })
    }
}
</script>