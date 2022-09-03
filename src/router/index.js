import { createRouter, createWebHashHistory} from "vue-router";    


 const routes=[ {                                                  
         path:'/home/:uid',                                                 
         name:'Home',                                              
         component: ()=> import ("/src/router/views/HomePage.vue")       
     },
     {                                                  
        path:'/',                                                 
        name:'LogIn',                                              
        component: ()=> import ("/src/router/views/LoginPage.vue")       
    }]      
     
     
 const router =createRouter({                                      
     history:createWebHashHistory(),                               
     routes,                                                       
 })                                                                
 export default router; 