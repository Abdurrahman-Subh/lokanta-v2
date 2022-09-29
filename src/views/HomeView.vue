<template>
  <div class="home">
    <div class="top-container">
      <div class="search-container">
        <input type="text" placeholder="Masa ara..." v-model="query" />
      </div>
      <div class="notfication-container">
        <p>Açık Masa Sayısı</p>
        <span>{{this.open.length}}</span>
      </div>
      <div class="btn-container">
        <router-link to="/yeni-masa">
        <button>Yeni Masa +</button>
        </router-link>
      </div>
    </div>

  

     <div class="tables" v-if="search.length > 0">
      <div class="for-table" v-for="table in search" :key="table.id">
        <router-link :to="`/table/${table.id}`">
          <div class="table">
            <h2>Masa Adı: {{ table.name }}</h2>
            <h3>Toplam Fiyat: {{ table.total }}</h3>
            <h3>
              Tarih:
              {{
                new Date(table.createdAt.seconds * 1000).toLocaleDateString(
                  "en-UK"
                )
              }}
            </h3>
            <div class="durum" v-if="table.durum == true">
              <h3>Masa Durumu: Açık</h3>
            </div>
            <div class="durum" v-else>
              <h3>Masa Durumu: Kapalı</h3>
            </div>
          </div>
        </router-link>
        <div class="button-container">
          <button @click="deleteTable(table.id)">Masayi sil</button>
        </div>
      </div>
    </div>
    <div v-else class="error">
      <h2>Bu İsimle Masanız Yok</h2>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase";
import { collection, getDocs, deleteDoc, query, orderBy } from "firebase/firestore";
export default {
  name: "Home",
  data() {
    return {
      loading: false,
      query: "",
      products: Array,
      searchTimeout: null,
      errorMessage: null,
      tabless: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
      async getData() {
      const querySnapshot = collection(db, "tables")
      const q = query(querySnapshot, orderBy('createdAt', 'desc'))
      const data = await getDocs(q)
      let tables = [];
       data.docs.map((doc) => ( tables.push({
         id: doc.id,
        name: doc.data().name,
        durum: doc.data().durum,
        createdAt: doc.data().createdAt,
        total: doc.data().total,
       })))
      this.tabless = tables;
    },
    async deleteTable(id) {
      const tableCollection = collection(db, "tables");
      let tableRef = doc(tableCollection, id);
      try {
        await deleteDoc(tableRef);
        alert("islem basarili");
        this.$router.go();
      } catch (err) {
        console.log(err);
      }
    }
  },
  computed: {
         //Search Function
  search () {
   if(this.query.length> 0){
     return this.tabless.filter(
      (item) =>(
        item.name.toString().toLowerCase().includes(this.query) 
    ));
    
  }else{
    return this.tabless
  }
  },
  open(){
    return this.tabless.filter(i => i.durum == true)
  } 
   },
  watch: {
    query: {
      handler(value) {
        if (value && value.length > 0) {
            console.log(this.search);
        }
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.home {
  background: #dee4e7;
  width: 100%;
  height: 100%;
}
.error{
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  h2{
    font-size: 2rem;
  }
}
.top-container {
  display: flex;
}
.search-container {
  width: 70%;
  display: flex;
}
.search-container input {
  width: 100%;
  padding: 20px;
  outline: none;
  border: none;
  font-size: 1.2rem;
  text-transform: capitalize;
}
.notfication-container {
  width: 15%;
  background: lightgrey;
  display: flex;
  align-items: center;
  justify-content: center;
}
.notfication-container span {
  background: lightgreen;
  padding: 10px;
  border-radius: 50px;
}
.btn-container {
  width: 15%;
  background: lightcyan;
}
.btn-container button {
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  cursor: pointer;
  background: #3c9adc;
  color: #fff;
  font-size: 1.1rem;
}
.btn-container button:hover {
  background: #77b1db;
  transition: 500ms ease-in-out;
}
.tables {
  width: 100%;
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 20px;
  gap: 40px;
  overflow-y: scroll; 
  height:600px;
  .for-table {
    box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.37);
    // width: 320px;
  height: 300px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    &:nth-child(odd) {
      background-image: url("https://templates.cms-guide.com/52206/images/bg2.png");
    }
    &:nth-child(even) {
      background-image: url("https://templates.cms-guide.com/52206/images/bg1.png");
    }
    a{
          height: 100%;
    display: flex;
    }
  }
  .table {
    width: 100%;
    color: #fff;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    cursor: pointer;

    h2,
    h3,
    h4 {
      text-transform: capitalize;
      color: #fff;
      font-weight: 800;
    }
    h2 {
      color: #254e53;
    }
  }
}
.button-container {
  display: flex;
  justify-content: center;
  border-top: 2px solid #000;
  gap: 5px;

  button {
    padding: 15px 20px;
    font-size: 1.4rem;
    cursor: pointer;
    outline: none;
    border: none;
    background: transparent;
    color: #e7e0c0;
    font-weight: 700;
    &:hover {
      background-color: #db9a72;
    }
  }
}
.durum {
  display: grid;
  align-items: center;
}
@media screen and (max-width: 1168px) {
  .tables {
    grid-template-columns: repeat(2, 1fr);
      overflow-y: initial; 
  height:100%;
      .table{
    padding: 13px;
      h1, h2, h3, h4{
        font-size: 1.2rem;
      }
    }
  }
}
@media screen and (max-width: 890px) {
  .tables {
    grid-template-columns: repeat(1, 1fr);
    padding: 10%;
  }
}
</style>
