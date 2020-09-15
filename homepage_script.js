var x = document.querySelectorAll('.nav__links');
var y = window.scrollY;

var checkHeader = function(){
    let scrollPosition = Math.round(window.scrollY);
    
    if (scrollPosition > 20){
        document.querySelector('header').classList.add('sticky');
        for (var i = 0; i < x.length; i++) {
            x[i].classList.add('stick');
        }
        document.getElementById("nav__image").src = "imgs/logo.png";
    } else {
        document.querySelector('header').classList.remove('sticky');
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove('stick');
        }
        document.getElementById('nav__image').src = "imgs/logov2.png";
    }
}

document.getElementById('nav__image').src = "imgs/logov2.png";

function topFunction() {
    document.documentElement.scrollTop = 0;
}

window.addEventListener('scroll',checkHeader);

const faders = document.querySelectorAll(".fade");

const callbackFunction = function(entries){
    entries.forEach(entry => {
        if(!entry.isIntersecting){
            return;
        }
        console.log(entry.target);
        entry.target.classList.toggle('on');
        observer.unobserve(entry.target);
        
    });
};

const observer  = new IntersectionObserver(callbackFunction, {
    threshold: 0.4
});

faders.forEach(fade=>{
    observer.observe(fade);
})


var modalBtns = document.querySelectorAll('.modal-open');

modalBtns.forEach(function(btn){
    console.log(btn.getAttribute('data-modal'));
    btn.onclick = function(){
        var modal = btn.getAttribute('data-modal');
        document.getElementById(modal).style.display = "block";
        document.body.style.overflowY = "hidden";
    };
});

var closeBtns = document.querySelectorAll('.modal-close');

closeBtns.forEach(function(btn){
    btn.onclick = function(){
        var modal = btn.closest('.modal').style.display = 'none';
        document.body.style.overflowY = 'scroll';
    }
})

window.onclick = function(e){
    if(e.target.className == "modal"){
        e.target.style.display = "none";
        document.body.style.overflowY = 'scroll';
    }
};