<template>
  <div class="add">
    <img
      v-if="loading"
      src="https://c.tenor.com/pgO8hZgOW5AAAAAC/loading-bar.gif"
      alt=""
    />
    <div class="combContainer" v-else>
        <div class="title-container">

        <h1>Yeni Masa Oluştur</h1>
        </div>
      <router-link :to="{ name: 'home' }">
        <div v-if="errorMessage">
          <h2 class="error">{{ errorMessage }}</h2>
        </div>
      </router-link>
      <div class="table">
        <div class="input-container">
          <input type="text" placeholder="Masa adı giriniz..." v-model="name" />
          <button :disabled="name.length <= 3" @click="createNewTable">
            Oluştur
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";
export default {
  name: "Products",
  data() {
    return {
      loading: false,
      products: [
        {
          name: "pizza",
          price: 20,
          img: "https://images.deliveryhero.io/image/fd-tr/LH/aiph-hero.jpg",
          amount: 0,
        },
        {
          name: "hamburger",
          price: 10,
          img: "https://images.deliveryhero.io/image/fd-tr/LH/x8c8-hero.jpg",
          amount: 0,
        },
        {
          name: "meyve suyu",
          price: 5,
          img: "https://www.nazar.com.tr/wp-content/uploads/2020/12/sikma-meyve-suyu.jpg",
          amount: 0,
        },
      ],
      name: "",
      errorMessage: null,
    };
  },
  methods: {
    async createNewTable() {
      var audio = new Audio(
        "http://soundbible.com/mp3/Elevator Ding-SoundBible.com-685385892.mp3"
      ); // path to file
      if (this.name.length > 3) {
        this.loading = true;

        try {
          await addDoc(collection(db, "tables"), {
            name: this.name,
            products: this.products,
            total: 0,
            durum: false,
            createdAt: new Date(),
          });
          this.loading = false;
          audio.play();
          this.$router.replace({ path: "/" });
        } catch (err) {
          console.log(err);
        }
      } else {
        this.errorMessage = "Lütfen 3 Karakterden Daha Uzun Bir İsim Giriniz";
      }
    },
  },
  watch: {
    name: {
      handler: function (val) {
        if (this.name.length <= 3) {
          this.errorMessage = "Lütfen 3 Karakterden Daha Uzun Bir İsim Giriniz";
        } else {
          this.errorMessage = null;
        }
      },
    },
  },
};
</script>

<style scoped lang="scss">
@import "../css/variables/_colors.scss";
.combContainer{
    display: flex;
    width: 100%;
    height: 80%;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    .title-container{
       width: 100%;
       height: 80%;
       display: flex;
       justify-content: center;
       align-items: center;
    }
}
.add{
    width: 100%;
    height: 100%;
}
.table {
  width: 100%;
  height: 100%;
  padding: 30px;
  .input-container {
    display: flex;
    justify-content: center;
    input {
      padding: 10px 20px;
      font-size: 1.4rem;
      outline: none;
      border-radius: 5px;
      border: 2px solid lightcoral;
      text-transform: capitalize;
    }
    button {
      padding: 10px 20px;
      font-size: 1.2rem;
      border: none;
      outline: none;
      background: lightgreen;
      font-weight: 700;
      cursor: pointer;
      &:hover {
        background: rgb(196, 241, 196);
      }
      &:disabled {
        background: #cccccc;
      }
    }
  }
}
.error {
  color: red;
}
@media only screen and (max-width: 650px) {
  .productContainer {
    grid-template-columns: repeat(auto-fit, 100%);
  }
}
</style>
