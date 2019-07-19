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
        },
        'sap_scaleup':{
            from:{
                opacity:0,
                scale:.5,
            },
            to:{
                opacity:1,
                scale:1,
            }
        },
        'sap_slidedown':{
            from:{
                opacity:0,
                translateY:-50,
            },
            to:{
                opacity:1,
                translateY:0,
            }
        },
        'sap_slideright':{
            from:{
                opacity:0,
                translateX:-50,
            },
            to:{
                opacity:1,
                translateX:0,
            }
        },
        'sap_slideleft':{
            from:{
                opacity:0,
                translateX:50,
            },
            to:{
                opacity:1,
                translateX:0,
            }
        }
    },
    easings: ['easeInQuad', 'easeOutQuad', 'easeInOutQuad','easeInCubic', 'easeOutCubic','easeInOutCubic','easeInQuart', 'easeOutQuart','easeInOutQuart','easeInQuint', 'easeOutQuint','easeInOutQuint','easeInSine', 'easeOutSine', 'easeInOutSine','easeInExpo', 'easeOutExpo', 'easeInOutExpo','easeInCirc', 'easeOutCirc', 'easeInOutCirc','easeInBack', 'easeOutBack', 'easeInOutBack'],
    init(obj){
        if(!this.selectors) return;
        this.selectors.forEach(elem => {
            let newElem = {
                elem:elem,
                anim:this.animations.sap_slideup,
                delay:0,
                duration: 600,
                easing:"easeOutBack",
                appeared:false
            }
            for (var key in this.animations) {
                if (elem.classList.contains(key)) {
                    newElem.anim = this.animations[key]
                }
            }

            elem.classList.forEach(className => {
                let regex = /sap_duration_(\d+)/g;
                let match = regex.exec(className);
                if (match !== null && match[1]) {
                    newElem.duration = parseInt(match[1]) * 100;
                }
                regex = /sap_delay_(\d+)/g;
                match = regex.exec(className);
                if (match !== null && match[1]) {
                    newElem.delay = parseInt(match[1]) * 100;
                }
                regex = /sap_easing_([A-z]+)/g;
                match = regex.exec(className);
                if (match !== null && match[1]) {
                    newElem.easing = match[1];
                }
            })
            
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
                        easing: newElem.easing,
                        delay: newElem.delay,
                        duration:newElem.duration,
                    }
                    console.log(animeInit);
                    for (var key in  newElem.anim.to){
                        animeInit[key] = newElem.anim.to[key];
                    }
                    anime(animeInit)
                    observer.unobserve(newElem.elem)
                }
              });
            }, { rootMargin: '-100px -100px', threshold: 0.50 });

            observer.observe(newElem.elem);
        })
    }
}

document.addEventListener('DOMContentLoaded', () => {
    SAppear.init();
})
