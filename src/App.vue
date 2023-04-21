<template>
  <div id="app">
    <header class="header">
      <nav class="header__nav">
        <ul class="nav__list">
          <li class="nav__item">Каталог</li>
          <li class="nav__item">Доставка</li>
          <li class="nav__item">Оплата</li>
          <li class="nav__item">Контакты</li>
          <li class="nav__item">О компании</li>
        </ul>
        <div class="nav__search">
          <input
            v-model="search"
            type="text"
            placeholder="Поиск по названию картины"
            class="search__input"
          />
          <button class="search__btn btn-normal">Найти</button>
        </div>
      </nav>
    </header>
    <main class="main">
      <section>
        <h1 class="main__header_1">Картины эпохи Возрождения</h1>
        <div class="cards__container">
          <Card
            v-for="card in searchHandler"
            :key="card.id"
            :id="card.id"
            :filename="card.filename"
            :name="card.name"
            :author="card.author"
            :isDiscount="card.isDiscount"
            :price__discount="card.price__discount"
            :price__main="card.price__main"
            :isSold="card.isSold"
            :images="card.images"
          ></Card>
        </div>
      </section>
    </main>
    <footer class="footer">
      <FooterItem />
    </footer>
  </div>
</template>

<script>
import Card from "./components/Card.vue";
import FooterItem from "./components/FooterItem.vue";

export default {
  name: "App",
  data() {
    return {
      search: "",
      cards: [
        {
          id: "1",
          filename: "painting-1",
          name: "Рождение Венеры",
          author: "Сандро Боттичелли",
          isDiscount: true,
          price__discount: "1 000 000 $",
          price__main: "2 000 000 $",
          images: ["painting-1", "painting-1-s2"],
        },
        {
          id: "2",
          filename: "painting-2",
          name: "Тайная вечеря",
          author: "Леонардо да Винчи",
          price__main: "3 000 000 $",
          images: ["painting-2", "painting-2-s2"],
        },
        {
          id: "3",
          filename: "painting-3",
          name: "Сотворение Адама",
          author: "Микеланджело",
          isDiscount: true,
          price__discount: "1 000 000 $",
          price__main: "2 000 000 $",
          images: ["painting-3", "painting-3-s2", "painting-3-s3"],
        },
        {
          id: "4",
          filename: "painting-4",
          name: "Урок анатомии",
          author: "Рембрандт",
          isSold: true,
          images: ["painting-4", "painting-4-s2"],
        },
      ],
    };
  },
  components: {
    Card,
    FooterItem,
  },
  computed: {
    searchHandler() {
      return this.cards.filter((card) => {
        return card.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
};
</script>
