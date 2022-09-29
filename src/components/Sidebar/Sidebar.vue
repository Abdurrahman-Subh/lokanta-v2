<template>

  <div class="header">
    <div class="logo-container">
      <h2>Abdurrahman</h2>
    </div>
    <nav>
      <div class="header-id">
        <span>Sayfalar</span>
      </div>
      <div class="router-container">
        <router-link to="/">Ana-Sayfa</router-link>
      </div>
      <div class="router-container">
        <router-link to="/yeni-masa">Yeni Masa</router-link>
      </div>
    </nav>
    <div class="active-users">
      <div class="header-id">
        <span>son {{tabless.length}} masa</span>
      </div>
      <div class="users-container">
        <ul>  
            
              <li  v-for="table in tabless" :key="table.id">
          <router-link class="sidebar-name" :to="`/table/${table.id}`">
                
                {{table.name}}
          </router-link>
          </li>
        
        </ul>
      </div>
    </div>
</div>

</template>

<script>
import { db } from "@/firebase";
import { collection, getDocs, limit } from "firebase/firestore";
import { query } from "firebase/firestore"
export default {

   data() {
    return {
      loading: false,
      errorMessage: null,
      tabless: Array,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const querySnapshot = collection(db, "tables")
      const q = query(querySnapshot, limit(6))
      const data = await getDocs(q)
      let tables = [];
       data.docs.map((doc) => ( tables.push({
         id: doc.id,
        name: doc.data().name,
       })))
      this.tabless = tables;
    },
  }
};
</script>

<style scoped>

.header {
  background: #21252a;
  display: flex;
  flex-direction: column;
  width: 23%;
  height: 100%;
}
.logo-container {
  padding: 20px 0;
  color: #fff;
  border-bottom: 2px solid rgb(31, 31, 31);
}
nav {
  display: flex;
  height: 30%;
  flex-direction: column;
  padding: 30px 0 10px 30px;
  gap: 40px;
}
.header-id {
  display: flex;
  color: #60656b;
  text-transform: uppercase;
}
.router-container {
  background: #2a2e33;
  padding: 10px 0 10px 10px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 30px;
}
.sidebar-name{
  text-transform: capitalize;
}

nav a {
  color: #42b983;
}
.active-users {
  display: flex;
  height: 30%;
  flex-direction: column;
  padding: 30px 0 10px 30px;
  gap: 40px;
  height: 40%;
}
.users-container {
  color: #fff;
  height: 100%;
}
.users-container ul {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
}
.users-container ul li a{
  color: #fff;
  text-decoration: underline;
  font-size: 1.2rem;
}
@media screen and (min-width: 1760px) {
  .header{
    width: 30%;
  }
  .header-id{
    font-size: 1.8rem;
  }
  .router-container a{
      font-size: 2rem;
  }
 .users-container ul li a {
    font-size: 2rem;
  }
  .logo-container h2{
    font-size: 2.4rem;
  }
}
@media screen and (max-width: 1268px) {
  .header{
    width: 30%;
  }
}
@media screen and (max-width: 1168px) {
  .header {
    display: none;
  }
}
</style>
