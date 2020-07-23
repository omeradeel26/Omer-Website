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