
const btns = document.querySelectorAll("#visualizeBtn");
 btns.forEach(btn=>{
    btn.addEventListener("click", function (e) {
        console.log("clicked");
        let x = e.clientX-e.target.offsetLeft ;
        let y = e.clientY -e.target.offsetTop;
        console.log(e.clientX);
        console.log(e.clientY);
console.log(e.target.offsetLeft);
console.log(e.target.offsetTop);
console.log(e.target.tagName);
        let ripple=document.createElement('rip');
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';  
        this.appendChild(ripple);
         setTimeout(() => {
           ripple.remove()
        },1000);
        });
     });
 


/* #visualizeBtn::before{
    content:"";
    position:absolute;
    background-color: #EEE;
    padding:50%;
    border-radius:50%;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%) scale(1);
    opacity:0;
    transition: transform 1s , opacity 1s;
} */

/* #visulaizeBtn:active::before{
    transition:0s;
    opacity :1;
    transform: translate(-50%,-50%) scale(0);
} */

// span:nth-child(7){
//     position:absolute;
//     background: #fff;
//     transform: translate(-50%,-50%);
//     pointer-events: none;
//     border-radius: 50%;
//     animation: animate 2s linear infinte;

// }

// @keyframes animate {
//     0%
//     {
//         width:0px;
//         height:0px;
//         opacity:1;
//     }
//     100%
//     {
//         width:500px;
//         height:500px;
//         opacity:1;
//     }
// }
