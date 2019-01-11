$(function () {

    // Большой слайдер
    
    $('.slider__element').slick({
        dots: true,
        infinite: false,
        prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
    });


//Hamburger opener

   $('.hamburger').click(function () {
    $('.menu-collapse').toggleClass('d-none').css('order', '1');
    $('.menu').toggleClass('menu-opened');
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
    $('.con-f').toggleClass('d-none').css('order', '1');
   });

// Написать письмо

   $('.write').click(function () {
    $('.con-w').toggleClass('d-none').css('order', '1');
   });



 // Map
   // $('.map1').click(function () {
   //  $('.territory').toggleClass('d-block');
   //  $('.malkovo').toggleClass('d-none');
   //  $('.kalinec').toggleClass('d-none');
   // });

   // $('.map2').click(function () {
   //  $('.territory').toggleClass('d-none');
   //  $('.malkovo').toggleClass('d-block');
   //  $('.kalinec').toggleClass('d-none');
   // });

   //  $('.map3').click(function () {
   //  $('.territory').toggleClass('d-none');
   //  $('.malkovo').toggleClass('d-none');
   //  $('.kalinec').toggleClass('d-block');
   // });


//Валидация и отправка формы

$(document).ready(function() {
    $('[data-submit]').on('click', function(e) {
        e.preventDefault();
        $('form').submit();
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

        el.validate({
            rules: {
                tel: {
                    required: true,
                    regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
                },
                name: {
                    required: true
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
                    case 'popupResult':
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
                                    $form.trigger('reset');
                                    //строки для остлеживания целей в Я.Метрике и Google Analytics
                                }, 1100);
                                $('#overlay').on('click', function(e) {
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

    $(".menu-two li a").click(function() {
    $(".menu-two li a").removeClass('active');
    $(this).addClass('active');
  });
    
});


  });