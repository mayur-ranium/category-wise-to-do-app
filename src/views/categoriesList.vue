<template>
<div class="categories-list">
    
    
</div>


</template>



<script>
import { collection, getDocs , getFirestore} from "firebase/firestore";
export default{
    setup(){
    const db = getFirestore();
    const querySnapshot =  getDocs(collection(db, "cities"));
   
    querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });


    }
}



</script>