<template>

<div class="flex flex-col gap-5 justify-center items-center mt-40">
     <div class="bg-violet-800">
        <h1
            class="
                text-white
                leading-relaxed

                text-7xl
                sm:text-7xl sm:leading-relaxed
                md:text-9xl md:leading-relaxed
                text-center
                font-SouthAustralia
                select-none
            "
        >
            Who me i
        </h1>
        </div>

        <button @click="logIn" type="button" class=" transition-all text-white shadow-md shadow-emerald-300 hover:bg-pink-500 hover:shadow-rose-300 hover:shadow-lg bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
            <svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
            Sign in with Google
        </button>
        
        </div>
</template>


<script setup>
/* import kısımları  */

import { ref } from 'vue'
import { db} from '../../firebase'
import { collection, onSnapshot , query, orderBy, limit } from 'firebase/firestore'
import { onMounted } from 'vue'
import { getAuth,signInWithPopup,GoogleAuthProvider } from "firebase/auth";
import { useRouter } from 'vue-router';

/* standar javascript  */
const router = useRouter()
const userId=ref("welcome")
/////////////////////////////////////////////////
/*auth */


const logIn = ()=>{
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;

        userId.value=user.uid
        router.push("/home/"+userId.value)
    }).catch((error) => {
  });
}


const firebasedenCekilmisAnaDizi = ref([])
const itemleriSıralama = query (collection(db, userId.value), orderBy("date", "desc"),limit(1));
onMounted(() => {
    onSnapshot(itemleriSıralama, (querySnapshot) => { //collection(db, 'whomeis')
        const fbWhomeis = [];
        querySnapshot.forEach((doc) => {
            const cekilenVeri = {
                id: doc.id,
                message: doc.data().message,
                name: doc.data().name,
            }
            fbWhomeis.push(cekilenVeri)
            console.log(doc)
        });
        firebasedenCekilmisAnaDizi.value = fbWhomeis        
    })


})
</script>




<style>
textarea {
    overflow: hidden;
    resize: none;
}
</style>