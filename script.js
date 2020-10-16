'use strict';

window.onload = function () {

  // плавный скролл

  let hiddenElement = document.getElementById('basket');
  let btns = document.querySelectorAll('.anchorBasket');
  for (let btn of btns) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      hiddenElement.scrollIntoView({
        block: 'center',
        behavior: 'smooth'
      });
      return false;
    });
  }

  // Основное меню

  let burger = document.getElementById('burger');
  let body = document.getElementById('body');
  let popUp = document.getElementById('popUp');
  let cross = document.getElementById('cross');

  burger.addEventListener('click', function () {
    body.classList.add('fixed');
    popUp.classList.add('popUp_on');
    popUp.classList.remove('popUp_off');
  });

  cross.addEventListener('click', function () {
    body.classList.remove('fixed');
    popUp.classList.add('popUp_off');
    popUp.classList.remove('popUp_on');
  })

  // добавление мелких всплывашек

  let positions = document.querySelectorAll('.position');

  let linkOff = function () {
    for (let position of positions) {
      position.classList.add('not-active');
    };
  };

  let linkOn = function () {
    for (let position of positions) {
      position.classList.remove('not-active');
    };
  };

  // счет элементов в корзине

  let count = document.getElementsByName('goods');
  let quantity = document.getElementById('quantity');
  let basketContainer = document.getElementById('basketContainer')

  document.body.onclick = function () {
    quantity.innerHTML = count.length;
    if (count.length == 0) {
      basketContainer.classList.remove('fadeIn');
      basketContainer.classList.add('clean');
    };
  };

  // всплывашка меню покупок

  let basket = document.getElementById('basket');

  basket.addEventListener('mouseenter', function () {
    if (count.length != 0) {
      basketContainer.classList.remove('clean', 'basket-off');
      basketContainer.classList.add('fadeIn', 'basket-on');
    } else {
      return false;
    };
  });

  basketContainer.addEventListener('mouseleave', function () {
    if (count.length != 0) {
      basketContainer.classList.remove('basket-on');
      basketContainer.classList.add('basket-off');
    } else {
      return false;
    };
  });

  // добавление в меню покупок и прочего

  let purchase = ['product1', 'product2', 'product3', 'product4', 'product5', 'product6'];

  let purcaseDesc = '<li class="full__basket__items" name="goods"><h4 class="basket__items__header">КОЛЬЦО TRINITY, Cartier</h4><p class="basket__items__price">498 000 ₽</p><button name="cleanGood" class="basket__items__cross btn" aria-label="удалить товар" onclick="this.parentNode.parentNode.removeChild(this.parentNode)"><span class="cross__link__black"></span><span class="cross__link__black"></span></button></li>';

  for (let i = 0; i < positions.length; i++) {
    positions[i].addEventListener('click', function (e) {
      e.preventDefault();
      popUpMini(purchase[i]);
      fullBasket.insertAdjacentHTML('beforeend', purcaseDesc);

      let basketItemsHeader = document.querySelectorAll('.basket__items__header');
      let basketItemsPrice = document.querySelectorAll('.basket__items__price');
      let basketImg = document.getElementById(purchase[i]).querySelector('img');
      let currentHeader = document.getElementById(purchase[i]).querySelector('h4');
      let currentPreis = document.getElementById(purchase[i]).querySelector('p');

      basketItemsHeader[count.length - 1].innerHTML = currentHeader.textContent;
      basketItemsPrice[count.length - 1].innerHTML = currentPreis.textContent;
      let clone = basketImg.cloneNode(true);
      basketItemsHeader[count.length - 1].before(clone);
      return false;
    });
  };

  function popUpMini(element) {
    linkOff();
    document.getElementById(element).classList.remove('clean', 'pos__pop_off');
    document.getElementById(element).classList.add('visible', 'pos__pop_on');
    setTimeout(function () {}, 4500);
    setTimeout(function () {
      document.getElementById(element).classList.remove('pos__pop_on');
      document.getElementById(element).classList.add('pos__pop_off');
      setTimeout(function () {
        document.getElementById(element).classList.remove('visible');
        document.getElementById(element).classList.add('clean');
        linkOn();
      }, 600);
    }, 4500);
    return false;
  };

// карта yandex

  let alert = document.getElementById('alert');
  let cleanAlert = document.getElementById('cleanAlert');

  ymaps.ready(init);
  function init() {

    var myMap = new ymaps.Map("map", {
      center: [55.75578939414953, 37.61462095190236],
      zoom: 5,
      behaviors: ['default', 'scrollZoom']
    });

    var myCollection = new ymaps.GeoObjectCollection(),
      
    myPoints = [{
          coords: [55.75578939414953, 37.61462095190236],
          text: 'МОСКВА',
          iconText: 'M',
          hintText: 'Магазин по адресу: Москва, Манежная площадь, 1 к2',
          balloonText: 'Магазин по адресу: Москва, Манежная площадь, 1 к2'
        },
        {
          coords: [59.93603406416598, 30.3147275],
          text: 'САНКТ-ПЕТЕРБУРГ',
          iconText: 'C',
          hintText: 'Магазин по адресу: Санкт-Петербург, ​Малая Морская, 4',
          balloonText: 'Магазин по адресу: Санкт-Петербург, ​Малая Морская, 4'
        },
        {
          coords: [53.207388571205435, 50.19790299999996],
          text: 'САМАРА',
          iconText: 'C',
          hintText: 'Магазин по адресу: Самара, ​Дыбенко, 30',
          balloonText: 'Магазин по адресу: Самара, ​Дыбенко, 30'
        },
        {
          coords: [55.82957756889806, 49.11858599999993],
          text: 'КАЗАНЬ',
          iconText: 'K',
          hintText: 'Магазин по адресу: Казань, Ямашева проспект, 46',
          balloonText: 'Магазин по адресу: Казань, Ямашева проспект, 46'
        },
        {
          coords: [54.71805156995343, 20.5000935],
          text: 'КАЛИНИНГРАД',
          iconText: 'K',
          hintText: 'Магазин по адресу: Калининград, ​Театральная, 30',
          balloonText: 'Магазин по адресу: Калининград, ​Театральная, 30'
        },
      ];
          
    for (var i = 0, l = myPoints.length; i < l; i++) {
      var point = myPoints[i];
      myCollection.add(new ymaps.Placemark(
        point.coords, {
          iconContent: point.iconText,
          hintContent: point.hintText,
          balloonContent: point.balloonText
        }
      ));
    };

    myMap.geoObjects.add(myCollection);

    mapBtn.addEventListener('click', function () {
      let inputAdr;
      let coincidence;
  
      inputAdr = document.getElementById('mapInput').value.toUpperCase().trim();
        
      if (inputAdr.length == 0) {
        coincidence = null;
      } else {    
        for (let j = 0, l = myPoints.length; j < l; j++) {
          let point = myPoints[j];
  
          if (inputAdr == point.text.toUpperCase()) {
              coincidence = point;
              let coordAkt = point.coords;             
              myMap.setZoom(14);
              myMap.panTo(coordAkt,{duration: 1000}); 
              document.getElementById('mapInput').value = "";
              return coincidence;
            } else {
              coincidence = null;
            };
          };
      };  
      
      if (coincidence == null) {
        alert.classList.remove('clean', 'cleanAlert_off');
        alert.classList.add('fadeIn', 'cleanAlert_on');
      };
      document.getElementById('mapInput').value = "";
    });

    cleanAlert.addEventListener('click', function (y) {
          y.preventDefault();
          alert.classList.remove('cleanAlert_on');
          alert.classList.add('cleanAlert_off');
        setTimeout(function () {
          alert.classList.remove('fadeIn');
          alert.classList.add('clean');
        }, 600);
      });
      return false;
    };   
};
