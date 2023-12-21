const smooth=document.createElement("div")
smooth.classList.add('smooth');
smooth.innerHTML=`<i class="bi bi-arrow-up"></i>`
document.body.append(smooth)

window.addEventListener("scroll" , () => {
    if(document.body.scrollTop>500 || document.documentElement.scrollTop>500){
        smooth.style.display='block'
    }else{
        smooth.style.display='none'
    }
})
smooth.addEventListener("click", () => {
    window.scroll({
        top: 100,
        left: 0,
        behavior: "smooth",
      });
})