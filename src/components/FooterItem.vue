<template>
    <div class="footer-nav">
        <ul class="footer-nav__list">
          <li class="footer-nav__item">Каталог</li>
          <li class="footer-nav__item">Доставка</li>
          <li class="footer-nav__item">Оплата</li>
          <li class="footer-nav__item">Контакты</li>
          <li class="footer-nav__item">О компании</li>
        </ul>
        <ul class="footer-contacts">
          <li class="footer-contacts__item_number">
            <img src="source/phone.svg" alt="">
            <span> +7 (812) 555-55-55</span></li>
          <li class="footer-contacts__item_adress">
            <img src="source/location.svg" alt="">
            <span> г. Екатеринбург ул. Генеральская, 3</span>
          </li>
        </ul>
      </div>
  </template>
  
  <script>
  export default {
    name: 'FooterItem',
    props: {
      
    }
  }
  </script>