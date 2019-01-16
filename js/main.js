$(function () {

  // Большой слайдер
  $('.slider__element').slick({
      dots: true,
      prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left"></i></button>',
      nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
  });

//Hamburger opener

   $('.hamburger').click(function () {
    $('.menu-collapse').removeClass('d-none');
    $('.menu').addClass('menu-opened');
   });

      $('.menu__close').click(function () {
    $('.menu-collapse').addClass('d-none');
    $('.menu').removeClass('menu-opened');
   });

  //Слайдер экскурсии

   $('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav'
  });
  $('.slider-nav').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: true,
    centerMode: true,
    focusOnSelect: true
  });

// Заказать звонок

   $('.call').click(function () {
    $('.con-f').toggleClass('d-none');
    $('.con-w').addClass('d-none');
   });

// Написать письмо

   $('.write').click(function () {
    $('.con-w').toggleClass('d-none');
    $('.con-f').addClass('d-none');
   });

//Валидация и отправка формы


$(document).ready(function() {
    $('[data-submit]').on('click', function(e) {
        e.preventDefault();
        $(this).parents('form').submit();
    })
    $.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Please check your input."
    );

    // Функция валидации и вывода сообщений
    function valEl(el) {

        el.validate ({
            rules: {
                tel: {
                    required: true,
                    regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
                },
                name: {
                    required: true
                },

                check: {
                    required: true,
                },

                email: {
                    required: true,
                    email: true
                }
            },

            messages: {
                tel: {
                    required: 'Поле обязательно для заполнения',
                    regex: 'Пожалуйста, укажите номер телефона в международном формате. Пример +7 (495) 212-12-55'
                },
                name: {
                    required: 'Поле обязательно для заполнения',
                },
                email: {
                    required: 'Поле обязательно для заполнения',
                    email: 'Неверный формат E-mail'
                }
            },

            errorPlacement: function(error, element) {
              error.appendTo($('.erorrMessage'));
            },

            // Начинаем проверку id="" формы
            submitHandler: function(form) {
                $('#loader').fadeIn();
                var $form = $(form);
                var $formId = $(form).attr('id');
                switch ($formId) {
                    // Если у формы id="goToNewPage" - делаем:
                    case 'goToNewPage':
                        $.ajax({
                                type: 'POST',
                                url: $form.attr('action'),
                                data: $form.serialize(),
                            })
                            .always(function(response) {
                                //ссылка на страницу "спасибо" - редирект
                                location.href = 'https://';
                                //отправка целей в Я.Метрику и Google Analytics
                                ga('send', 'event', 'masterklass7', 'register');
                                yaCounter27714603.reachGoal('lm17lead');
                            });
                        break;
                    // Если у формы id="popupResult" - делаем:
                    case 'popupCall':
                        $.ajax({
                                type: 'POST',
                                url: $form.attr('action'),
                                data: $form.serialize(),
                            })
                            .always(function(response) {
                                setTimeout(function() {
                                    $('#loader').fadeOut();
                                }, 800);
                                setTimeout(function() {
                                    $('#overlay').fadeIn();
                                    $('.popup').hide();
                                    $('#thx').show();
                                    $form.trigger('reset');
                                    //строки для остлеживания целей в Я.Метрике и Google Analytics
                                }, 1100);
                                $('#overlay').on('click', function(e) {
                                    $(this).fadeOut();
                                });

                            });
                        break;
                      // письмо 
                    case 'popupLetter':
                      $.ajax({
                              type: 'POST',
                              url: $form.attr('action'),
                              data: $form.serialize(),
                          })
                          .always(function(response) {
                              setTimeout(function() {
                                  $('#loader').fadeOut();
                              }, 800);
                              setTimeout(function() {
                                  $('#overlayLat').fadeIn();
                                  $('.popupLat').hide();
                                  $('#thh').show();
                                  $form.trigger('reset');
                                  //строки для остлеживания целей в Я.Метрике и Google Analytics
                              }, 1100);
                              $('#overlay, #overlayLat').on('click', function(e) {
                                  $(this).fadeOut();
                              });

                          });
                      break;
                }
                return false;
            }
        })
    }
    // Запускаем механизм валидации форм, если у них есть класс .js-form
    $('.js-form').each(function() {
        valEl($(this));
    });

});

  });