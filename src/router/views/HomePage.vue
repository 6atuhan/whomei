<template>
  <button @click="toggleWhatisFunc" class="border-2 rounded-xl bg-rose-200 hover:bg-rose-600 hover:text-white transition-all p-2 text-purple-900 border-zinc-800" to="whatis">?</button>
  <button class=" transition-all float-right border-2 rounded-xl bg-rose-200 hover:bg-rose-600 hover:text-white p-2 text-purple-900 border-zinc-800" @click="logOut">X</button>

    <what-is-comp v-show="toggleWhatis"></what-is-comp>

    <div v-show="!toggleWhatis">
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
        <div class="flex justify-around items-center">
        <button
            v-show="boolSettings"
            @click="toggleSettings"
            class="
                border-2
                rounded-full
                bg-rose-200
                hover:bg-rose-600
                transition-all
                p-2
                border-zinc-800
            "
        >
            <img src="/src/assets/001-user.png" width="32" />
        </button>
        <button
            v-show="!boolSettings"
            @click="toggleSettings"
            class="
                border-2
                rounded-full
                bg-rose-200
                hover:bg-rose-600
                transition-all
                p-2
                border-zinc-800
            "
        >
            <img src="/src/assets/002-settings.png" width="32" />
        </button>
        </div>
        <div
        v-show="boolSettings"
        class="
            mt-12
            flex flex-col
            gap-5
            justify-center
            items-center
            w-1/2
            m-auto
        "
    >
        <label for="name" class="w-full text-white font-semibold"
            >Name<input
            v-model="name"
                type="text"
                id="name"
                maxlength="30"
                class="
                    outline-pink-500
                    text-black
                    transition-all
                    w-full
                    p-2
                    rounded-xl
                "
        /></label>
        <label for="message" class="w-full text-white font-semibold"
            >Message<textarea
            v-model="message"
                type="text"
                id="message"
                maxlength="256"
                class="
                    outline-pink-500
                    text-black
                    transition-all
                    w-full
                    p-2
                    rounded-xl
                "
            >
            </textarea>
        </label>
        <div class="flex " v-show="isInputsEmpty">
            
            <button class="
            border-2
                    rounded-xl
                    bg-red-300
                    hover:bg-red-600 hover:text-white
                    transition-all
                    p-2
                    black
                    px-10
                    border-zinc-800" @click="cleanInputs">Clean</button>
        <button
            @click="saveContent"
            class="
                border-2
                rounded-xl
                bg-green-200
                hover:bg-green-600 hover:text-white
                transition-all
                p-2
                text-black
                px-10
                border-zinc-800
            "
        >
            Save
        </button>
        </div>
    </div>
         <div
        v-show="!boolSettings"
        class="flex flex-col gap-3 mt-4 items-center justify-center"
        >
        <h1
            class="
                text-white
                font-semibold
                text-center text-3xl
                border-b-2 border-pink-500
                w-80
            "
            v-for="i in firebasedenCekilmisAnaDizi" :key="i.id"
        >
            Ben, {{i.name}}
        </h1>
        <h1
            class="
                text-white
                font-semibold
                text-center text-2xl
                border-b-2 border-pink-500
                p-1
                px-20
                mb-10
            "
            v-for="i in firebasedenCekilmisAnaDizi" :key="i.id"
        >
        {{i.message}}
        </h1>
        </div>
    </div>
</template>


<script setup>
import { computed, ref } from 'vue'
import { db} from '../../firebase'
import { collection, onSnapshot,addDoc , query, orderBy, limit } from 'firebase/firestore'
import {signOut, getAuth } from 'firebase/auth'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import whatIsComp from '../../components/whatIsComp.vue'


/* standar javascript  */

const route=useRouter()
const boolSettings = ref(false)
var emptyFields = ref(false)
const toggleWhatis = ref(false)
var name=ref("")
var message=ref("")
const userId=ref("welcome")


    var idddd=route.options.history.state.current
    userId.value=idddd.slice(6)

    

///////1//////////////////////////////////////////
/*auth */

const toggleWhatisFunc = ()=>{
    toggleWhatis.value= ! toggleWhatis.value
}

const isInputsEmpty=computed(()=>{
    return name.value == "" || message.value == "" ? false : true
})

const checkEmptyFıelds=()=>{
    
    
    emptyFields.value= name.value !="" && message.value != "" ? true : false
}

const toggleSettings = () => {
    boolSettings.value = !boolSettings.value
    checkEmptyFıelds()
}

const cleanInputs = ()=>{
    name.value=""
    message.value=""
}
/* firebase script */
const saveContent = () => {
    addDoc(collection(db, userId.value), {
    name: name.value,
    message: message.value,
    date:Date.now()
    });
    toggleSettings()
}


const firebasedenCekilmisAnaDizi = ref([])
const itemleriSıralama = query (collection(db, userId.value), orderBy("date", "desc"),limit(1));
onMounted(() => {
    onSnapshot(itemleriSıralama, (querySnapshot) => { //collection(db, 'whomeis')
        const fbWhomeis = [];
        querySnapshot.forEach((doc) => {
            const cekilenVeri = {
                id: doc.id,
                message: doc.data(userId.value).message,
                name: doc.data(userId.value).name,
            }
            fbWhomeis.push(cekilenVeri)
        });
        firebasedenCekilmisAnaDizi.value = fbWhomeis        
    })


})

const logOut = ()=>{
      const auth = getAuth();
      signOut(auth).then(() => {
        route.push("/")
      }).catch((error) => {
        // An error happened.
      });

}

</script>




<style>
textarea {
    overflow: hidden;
    resize: none;
}
</style>