<template>
  <div class="card__wrapper" :class="{ sold: isSold }">
    <div v-if="isSold" @click="openModal" class="sold-opacity"></div>
    <div @click="openModal" class="card__img__wrapper">
      <img
        class="card__img"
        :src="require(`../assets/${filename}.png`)"
        alt=""
      />
    </div>
    <div class="card__content">
      <h2 @click="openModal" class="card__header_2">
        « {{ name }} »<br />
        {{ author }}
      </h2>
      <h3 v-if="isSold">Продана на аукционе</h3>
      <div class="card__buy">
        <div class="card__price">
          <span class="price" :class="{ price__discount: isDiscount }">
            {{ price__main }}
          </span>
          <br />
          <span v-if="isDiscount" class="price">{{ price__discount }}</span>
        </div>
        <button v-if="isLoading" class="btn-normal btn-loading">
          <img src="../assets/loading2.svg" class="purchase-icon" alt="" />
          Обработка
        </button>
        <button
          v-if="inCart && !isLoading"
          @click="onButtonClick"
          class="card__buy-btn btn-normal"
          :class="{ 'btn-in-cart': inCart }"
        >
          <img class="purchase-icon" src="../assets/cart.svg" alt="" /> В
          корзине
        </button>

        <button
          v-else-if="!isLoading"
          @click="onButtonClick"
          class="card__buy-btn btn-normal"
        >
          <img class="purchase-icon" src="../assets/purchase.svg" alt="" />
          Купить
        </button>
      </div>
    </div>
    <div v-if="showModal" class="modal-container">
      <!-- <div  class="modal-container"> -->
      <div class="modal-bg" @click="closeModal"></div>
      <div class="modal-wrapper">
        <div class="picture-wrapper">
          <div class="slider-pictures">
            <img
              v-for="(image, index) in images"
              :key="index"
              class="card__img modal__img"
              :src="require(`../assets/${image}.png`)"
              alt=""
            />
          </div>
          <div class="slider-wrapper">
            <div @click="prevSlide" class="slider__left">
              <img
                class="slider__left_arrow"
                src="../assets/slider-arrow.svg"
                alt=""
              />
            </div>
            <div @click="nextSlide" class="slider__right">
              <img
                class="slider__right_arrow"
                src="../assets/slider-arrow.svg"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="info-wrapper">
          <h2 class="card__header_2">
            « {{ name }} »<br />
            {{ author }}
          </h2>
          <p class="card__description">
            Картина итальянского художника тосканской школы Сандро Боттичелли.
            Представляет собой живопись темперой на холсте размером 172,5 ×
            278,5 см. В настоящее время хранится в галерее Уффици, Флоренция.
          </p>
          <h3 v-if="isSold">Продана на аукционе</h3>
          <div class="card__buy_modal card__buy">
            <div class="card__price modal__price">
              <span class="price" :class="{ price__discount: isDiscount }">
                {{ price__main }}
              </span>
              <br />
              <span v-if="isDiscount" class="price">{{ price__discount }}</span>
            </div>
            <button v-if="isLoading" class="btn-normal">
              <img src="../assets/loading2.svg" class="purchase-icon" alt="" />
              Обработка
            </button>
            <button
              v-if="inCart && !isLoading"
              @click="onButtonClick"
              class="card__buy-btn btn-normal"
              :class="{ 'btn-in-cart': inCart }"
            >
              <img class="purchase-icon" src="../assets/cart.svg" alt="" /> В
              корзине
            </button>

            <button
              v-else-if="!isLoading"
              @click="onButtonClick"
              class="card__buy-btn btn-normal"
            >
              <img class="purchase-icon" src="../assets/purchase.svg" alt="" />
              Купить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    filename: String,
    name: String,
    author: String,
    price__discount: String,
    price__main: String,
    isSold: Boolean,
    isDiscount: Boolean,
    id: {
      type: String, // или Number, в зависимости от типа идентификатора
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isLoading: false,
      inCart: false,
      showModal: false,
      activeSlideIndex: 0,
      mainSlide: null,
      slideCount: 0,
    };
  },
  mounted() {
    // this.mainSlide = this.document.querySelectorAll(".slider-pictures");
    // this.slideCount = this.mainSlide.querySelectorAll("img").length;
    this.slideCount = 2;
    const inCart = localStorage.getItem(`inCart_${this.id}`);
    if (inCart === "true") {
      this.inCart = true;
    }
  },
  methods: {
    onButtonClick() {
      this.isLoading = true;
      if (!this.inCart) {
        setTimeout(() => {
          this.isLoading = false;
          this.inCart = true;
          localStorage.setItem(`inCart_${this.id}`, this.inCart);
        }, 2000);
      } else {
        setTimeout(() => {
          this.isLoading = false;
          this.inCart = false;
          localStorage.setItem(`inCart_${this.id}`, this.inCart);
        }, 2000);
      }
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    prevSlide() {
      this.$nextTick(() => {
        this.slideCount = document
          .querySelector(".slider-pictures")
          .querySelectorAll("img").length;
      });
      console.log(this.slideCount);
      console.log(document.querySelector(".slider-pictures"));

      this.activeSlideIndex =
        this.activeSlideIndex > 0
          ? this.activeSlideIndex - 1
          : this.slideCount - 1;
      const width = document.querySelector(".slider-pictures").clientWidth;
      console.log(width);
      document.querySelector(
        ".slider-pictures"
      ).style.transform = `translateX(-${this.activeSlideIndex * width}px)`;
    },
    nextSlide() {
      this.$nextTick(() => {
        this.slideCount = document
          .querySelector(".slider-pictures")
          .querySelectorAll("img").length;
      });

      this.activeSlideIndex =
        this.activeSlideIndex < this.slideCount - 1
          ? this.activeSlideIndex + 1
          : 0;
      const width = document.querySelector(".slider-pictures").clientWidth;
      document.querySelector(
        ".slider-pictures"
      ).style.transform = `translateX(-${this.activeSlideIndex * width}px)`;
    },
  },
};
</script>

<style>
.slider-pictures {
  transition: transform 0.5s ease;
}
</style>
