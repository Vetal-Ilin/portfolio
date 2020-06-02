$(document).ready(function() {


    /*  скрипт для меню которое показыывает на каком блоке находится пользователь  */
    $('#header-major').mouseover(function(){
        $('.navigation__header-major').css('background-color','rgba(130, 130, 130, 0.5)');
        $(this).mouseout(function(){
            $('.navigation__header-major').css('background-color','rgba(130, 130, 130, 0.1)');
        });
    });
    $('#main-skills').mouseover(function(){
        $('.navigation__main-skills').css('background-color','rgba(130, 130, 130, 0.5)');
        $(this).mouseout(function(){
            $('.navigation__main-skills').css('background-color','rgba(130, 130, 130, 0.1)');
        });
    });
    $('#main-education').mouseover(function(){
        $('.navigation__main-education').css('background-color','rgba(130, 130, 130, 0.5)');
        $(this).mouseout(function(){
            $('.navigation__main-education').css('background-color','rgba(130, 130, 130, 0.1)');
        });
    });
        

    /* Cкрипт для меню бургер  */
    $('.wrapper-menu-icon').click(function(event) {
        $('.wrapper-menu-icon, .wrapper-menu-icon__burger, .wrapper-menu-icon__burger__span, .wrapper-menu-item-navigation').toggleClass('active');
        $('body').toggleClass('lock');
    });
        

    /* анимация плавного скролла при нажатии на кнопку  */
    $('a[href^="#"]').click(function () {
        //Сохраняем значение атрибута href в переменной:
        var target = $(this).attr('href');
        $('html, body').animate({
         scrollTop: $(target).offset().top//можно вычесть высоту меню
        }, 500);
        return false;
    });

    
    
}); 