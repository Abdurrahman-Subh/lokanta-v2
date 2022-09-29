<template>
  <div class="main-container">
    <img
      v-if="loading"
      src="https://c.tenor.com/pgO8hZgOW5AAAAAC/loading-bar.gif"
      alt=""
    />
    <div v-else>
      <div class="products">
        <div v-for="(product, i) in table.products" :key="i" class="product">
          <div class="product-img">
            <img :src="product.img" alt="foto" />
          </div>
          <div class="product-title">
            <span> {{ product.title }}</span>
          </div>
          <div class="product-price">
            <span class="price"> {{ product.price }} TL</span>
            <button class="add" @click="add(product)">&#43;</button>
            <span class="amount"> {{ product.amount }}</span>
            <button
              class="add"
              :disabled="product.amount <= 0"
              @click="min(product)"
            >
              &#8722;
            </button>
          </div>
        </div>
      </div>
      <div class="table-container">
        <div class="table">
          <h2 class="title">Masa Adı: {{ table.name }}</h2>
          <h4>Toplam Fiyat: {{ table.total }}</h4>
          <div v-if="table.durum == true">
            <h3>Masa Durumu: Açık</h3>
          </div>
          <div v-else>
            <h3>Masa Durumu: Kapalı</h3>
          </div>
        </div>
      </div>
      <div class="btn-container">
        <button @click="clear">Her şeyi sil</button>
        <button @click="close">Masa Durumunu Değiştir</button>
        <button @click="save">Kaydet</button>
      </div>
    </div>
  </div>
</template>

<script>
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
export default {
  name: "Table",
  data() {
    return {
      products: Array,
      table: Array,
      loading: true,
      errorMessage: null,
    };
  },
  methods: {
    async fetchSingleProduct() {
      try {
        const res = await getDoc(doc(db, "tables", this.$route.params.id));
        if (!res.exists()) {
          this.errorMessage = 'Böyle Bir Masa Yok'
        }
        this.table = res.data();
        this.loading = false;
      } catch (err) {
        console.log(err);
      }
    },
    add(i) {
      i.amount++;
      this.table.total += i.price;
    },
    min(i) {
      i.amount--;
      this.table.total -= i.price;
    },
    clear() {
      this.table.total = 0;
      this.table.products.map((i) => {
        i.amount = 0;
      });
    },
    close() {
      this.table.durum = !this.table.durum;
    },
    async save() {
      const colRef = doc(db, "tables", this.$route.params.id);
      await updateDoc(colRef, {
        name: this.table.name,
        total: this.table.total,
        products: this.table.products,
        durum: this.table.durum,
      });
      alert("İşlem Başarılı");
    },
  },
  created() {
    this.fetchSingleProduct();
  },
};
</script>

<style scoped lang="scss">
.main-container {
  padding: 10px;
  width: 100%;
}
.products {
  display: flex;
  justify-content: space-around;
  padding: 20px;
  .product {
    width: 25%;
    .product-img {
      width: 100%;
      img {
        width: 100%;
        height: 200px;
      }
    }
    .product-price {
      display: flex;
      justify-content: space-around;
      .price {
        color: #fff;
        font-size: 1.6rem;
        font-weight: 900;
      }
      .add {
        padding: 10px;
        font-size: 1.2rem;
        cursor: pointer;
      }
      .amount {
        display: flex;
        align-items: center;
        font-size: 1.4rem;
        font-weight: 700;
        color: #fff;
      }
    }
  }
}
.table-container {
  width: 100%;
  height: 100%;

  .table {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .title {
      text-transform: capitalize;
      color: #e7e0c0;
    }
    h2,
    h4 {
      color: #e7e0c0;
      font-weight: 800;
      font-size: 1.4rem;
    }
    div {
      h3 {
        color: #e7e0c0;
        font-weight: 800;
        font-size: 1.4rem;
      }
    }
  }
}
.btn-container {
  margin-top: 50px;
  display: flex;
  justify-content: space-around;
  button {
    padding: 10px 20px;
    outline: none;
    border: none;
    background: lightgreen;
    font-size: 1.2rem;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 700;
    &:hover {
      background: rgb(180, 240, 180);
    }
  }
}
@media screen and (max-width: 768px) {
  .products {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: center;
    align-items: center;
    gap: 30px;
    .product {
      width: 100%;
    }
  
  }
}
@media screen and (max-width: 668px) {
  .products {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    justify-content: center;
    align-items: center;
    gap: 30px;
    .product {
      width: 80%;
      margin-left: auto;
      margin-right: auto;
    }
  }
  .btn-container {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 20px;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
