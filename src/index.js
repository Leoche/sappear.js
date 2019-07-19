import anime from 'animejs';

let SAppear = {
    selectors:document.querySelectorAll(".sap"),
    animations:{
        'sap_slideup':{
            from:{
                opacity:0,
                translateY:50,
            },
            to:{
                opacity:1,
                translateY:0,
            }
        }
    },
    init(obj){
        if(!this.selectors) return;
        this.selectors.forEach(elem => {
            let newElem = {
                elem:elem,
                anim:this.animations.sap_slideup,
                appeared:false
            }
            for (var key in this.animations) {
                if (elem.classList.contains(key)) {
                    newElem.anim = this.animations[key]
                }
            }
            let animeInit = {
                targets: newElem.elem,
                duration:0,
                easing:'linear'
            }
            for (var key in  newElem.anim.from){
                animeInit[key] = newElem.anim.from[key];
            }
            anime(animeInit)
            let observer = new IntersectionObserver(entries => {
              entries.forEach(elem => {
                if(elem.intersectionRatio > 0) {
                    let animeInit = {
                        targets: newElem.elem,
                        duration:2000,
                    }
                    for (var key in  newElem.anim.to){
                        animeInit[key] = newElem.anim.to[key];
                    }
                    anime(animeInit)
                    observer.unobserve(newElem.elem)
                }
              });
            }, { rootMargin: '0px 0px', threshold: 0.00 });

            observer.observe(newElem.elem);
        })
    }
}

document.addEventListener('DOMContentLoaded', () => {
    SAppear.init();
})
