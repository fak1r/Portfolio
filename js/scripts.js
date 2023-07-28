window.addEventListener('load', function(){

    /* ==           Калькулятор           == */
 
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

    /* ==           Стрелка вверх           == */                      

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

    /* ==           Подсветка пункта по клику           == */                        

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

    /* ==           Подсветка пункта по скроллу           == */                 

    const topLinks = document.querySelectorAll('.menu__link')

    window.addEventListener('scroll', function(){

        for (let i = topLinks.length - 1; i >= 0; i--){

            const target = document.querySelector(topLinks[i].hash); 
            
            if(window.scrollY > window.scrollY + target.getBoundingClientRect().top - menu.clientHeight - target.clientHeight / 2){
                const active = menu.querySelector('.menu__link-active');
                active.classList.remove('menu__link-active');
                topLinks[i].classList.add('menu__link-active');
                break;
            }
        }
    })

    /* ==           Анимация блока вопросов           == */

    let faq = document.querySelector('.faq');

	faq.addEventListener('click', function(e){
		if(e.target.classList.contains('ask')){
			toogleItem(e.target);
		}
	});

	function toogleItem(ask){
		let answer = ask.parentNode.querySelector('.answ');
		toogleItemAnim(
			answer, 
			500,
			[
				{ opacity: 0, transform: 'translateX(-100px)' },
				{ opacity: 1, transform: 'translateX(0px)' }
			], 
			[
				{ opacity: 1, transform: 'translateX(0)' },
				{ opacity: 0, transform: 'translateX(100px)' }
			]
		);
	}
});

/* ==           Переключение анимации           == */

function toogleItemAnim(el, rate, keyframesToShow, keyframesToHide = null){
	// Для поддержки старых браузеров
	if(!('animate' in el)){
		el.classList.toggle('open');
		return;
	}

	if(el.jsAnim){
		return;
	}

	el.jsAnim = true;

	// если не передали действие скрытия, то просто развернёт действие открытия наоборот
	if(keyframesToHide === null){
		keyframesToHide = [...keyframesToShow].reverse();
	}

	if(el.classList.contains('open')){
		let animation = el.animate(
			compileKeyframes(el, keyframesToHide),
			{ duration: rate }
		);
		
		animation.addEventListener('finish', function(){
			el.classList.remove('open');
			el.jsAnim = false;
		});
	}
	else{
		el.classList.add('open');

		let animation = el.animate(
			compileKeyframes(el, keyframesToShow),
			{ duration: rate }
		);

		animation.addEventListener('finish', function(){
			el.jsAnim = false;
		});
	}
}

function compileKeyframes(el , keyframes){
	let res = [];

	for(let i = 0; i < keyframes.length; i++){
		let frame = keyframes[i];
		let realFrame = {};

		for(let name in frame){
			realFrame[name] = typeof frame[name] === 'function' ? 
			frame[name](el) : 
			frame[name];
		}

		res.push(realFrame);
	}
	
	return res;
}