
// let btn = document.querySelector("#visualizeBtn");

// if (btn) { 
//     btn.addEventListener("click", function (e) {
//         console.log("clicked");

//         let x = e.clientX - e.target.offsetLeft;
//         let y = e.clientY - e.target.offsetTop;
//         // Class Add
    
//         ripple.style.left = x + 'px';
//         ripple.style.top = y + 'px';
    
//         this.appendChild(ripple);
//         setTimeout(() => {
//             // Class Rem
//         }, 1000);
//     });
// }


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