import { createRouter, createWebHashHistory} from "vue-router";    


 const routes=[ {                                                  
         path:'/',                                                 
         name:'Home',                                              
         component: ()=> import ("/src/router/views/HomePage.vue")       
     },
     {                                                  
        path:'/whatis',                                                 
        name:'WhatIs',                                              
        component: ()=> import ("/src/router/views/WhatisPage.vue")       
    }]      
     
     
 const router =createRouter({                                      
     history:createWebHashHistory(),                               
     routes,                                                       
 })                                                                
 export default router; 