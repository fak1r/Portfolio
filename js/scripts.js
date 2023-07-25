window.addEventListener('load', function(){

 // _______________________________________________________________ //
 //                         Калькулятор
 
    const inp1 = document.querySelector('.num1');
    const inp2 = document.querySelector('.num2');
    const select = document.querySelector('.op');
    const btn = document.querySelector('.btn');
    const res = document.querySelector('.result');

    const calc = {
        'plus': (num1, num2) => +num1 + +num2,
        'minus': (num1, num2) => num1 - num2,
        'mult': (num1, num2) => num1 * num2,
        'div': (num1, num2) => num1 / num2
    }

    function calculate(){
        const op = select.value;
        const num1 = inp1.value;
        const num2 = inp2.value;
        res.innerHTML = calc[op](num1, num2);
        btn.disabled = true;
    }

    btn.addEventListener('click', calculate);
    
    [inp1, inp2].forEach(el => el.addEventListener('input', function(){ 
        this.value = this.value.replace(/[^\d]/g, '');
    }));

    [inp1, inp2, select].forEach(el => el.addEventListener('input', function(){ 
        btn.disabled = false;
    }));

 // _______________________________________________________________ //
 //                         Стрелка вверх

    const arrow = document.querySelector('.arrowUpTpTop');
    
    function arrowVisibleToggle(){
        window.scrollY > 700 ? 
        arrow.classList.add('visible') :
        arrow.classList.remove('visible')
    }

    window.addEventListener('scroll', arrowVisibleToggle);

    arrow.addEventListener('click', function(){
        window.scrollTo({
            top: 0,
            behavior: 'smooth'    
        });
    })

 // _______________________________________________________________ //
 //                         Подсветка пункта по клику

    function scrollTo(hash){
        // const target = document.getElementById(menuLink.hash.slice(1)); 
        // можно получать по классу за счёт #
        const target = document.querySelector(hash); 
        const targetMarginTop = parseFloat(window.getComputedStyle(target).marginTop);
        const pos = window.scrollY + target.getBoundingClientRect().top - menu.clientHeight - targetMarginTop;
        window.scrollTo({
            top: pos,
            behavior: "smooth"
        });
    }

    const menu = document.querySelector('.nav-menu');

    menu.addEventListener('click', function(e){
        if(e.target.classList.contains('menu__link')){
            e.preventDefault();
            
            scrollTo(e.target.hash)

            // СМЕНА ПОДСВЕТКИ
            const active = menu.querySelector('.menu__link-active');
            active.classList.remove('menu__link-active');
            e.target.classList.add('menu__link-active');

        }
    });

    // если перешли в браузере по ссылке #id
    if(window.location.hash !== ''){
        scrollTo(window.location.hash)
    }

 // _______________________________________________________________ //
 //                    Подсветка пункта по скроллу

    const topLinks = document.querySelectorAll('.menu__link')

    window.addEventListener('scroll', function(){

        for (let i = topLinks.length - 1; i >= 0; i--){

            const target = document.querySelector(topLinks[i].hash); 
            const h2Pos = window.scrollY + target.getBoundingClientRect().top;
            
            if(window.scrollY > this.window.scrollY + target.getBoundingClientRect().top - menu.clientHeight - target.clientHeight / 2){
                const active = menu.querySelector('.menu__link-active');
                active.classList.remove('menu__link-active');
                topLinks[i].classList.add('menu__link-active');
                console.log(window.scrollY, target.getBoundingClientRect().top);
                break;
            }
        }
    })

});