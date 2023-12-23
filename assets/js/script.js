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


const row=document.querySelector(".solution-row");
const signIn=document.querySelector(".sign-in");
console.log(signIn)
function item(){
    axios.get("http://localhost:3000/main")
    .then(res => res.data)
    .then(data => {
        data.forEach(element => {
            axios.get(`http://localhost:3000/favorite`)
                .then(r => {
                        let ids = r.data.find(f => f.id === element.id);
                        if (!ids) {
                            row.innerHTML+=`
                            <div class="col-lg-4 col-sm-6 col-xs-12">
                                <div class="loan-card">
                                   <div class="fav">
                                        <div class="image">
                                            <img src=${element.image} alt="">
                                        </div>
                                        <i class="bi bi-heart bi${element.id}" onclick='favorite(${element.id})'></i>
                                   </div>
                                    <p class="title">${element.name}</p>
                                    <h3>${element.title}</h3>
                                    <p>${element.about}</p>
                                    <div class="buttons">
                                        <button onclick='delFunc(${element.id})'>Delete</button>
                                        <a href='./update.html?id=${element.id}'>Update</a>
                                        <a href='./detail.html?id=${element.id}'>Detail</a>
                                    </div>
                                </div>
                            </div>  `
                        }
                        else {
                            row.innerHTML+=`
                            <div class="col-lg-4 col-sm-6 col-xs-12">
                                <div class="loan-card">
                                   <div class="fav">
                                        <div class="image">
                                            <img src=${element.image} alt="">
                                        </div>
                                        <i class="bi bi-heart-fill bi${element.id}" onclick='favorite(${element.id})'></i>
                                   </div>
                                    <p class="title">${element.name}</p>
                                    <h3>${element.title}</h3>
                                    <p>${element.about}</p>
                                    <div class="buttons">
                                        <button onclick='delFunc(${element.id})'>Delete</button>
                                        <a href='./update.html?id=${element.id}'>Update</a>
                                        <a href='./detail.html?id=${element.id}'>Detail</a>
                                    </div>
                                </div>
                            </div>  `
                        }
                    })
            })
           
            
        });
    
    axios.get("http://localhost:3000/signin")
    .then(res => res.data)
    .then(data => {
        if(data.length!=0){
            signIn.innerText=`${data[data.length-1].email}`
        }
    })
}
item()

function delFunc(id){
    console.log(id) 
    axios.delete("http://localhost:3000/main/"+id)
    window.location.reload()
}

function favorite(id){
    const favicon=document.querySelector(`.bi${id}`)
    axios.get("http://localhost:3000/main/"+id)
    .then(res =>res.data)
    .then(data => {
        axios.get("http://localhost:3000/favorite")
        .then(r => {

                let ids = r.data.find(f => f.id === data.id);

                if (!ids) {
                    favicon.classList.add("bi-heart-fill")
                    favicon.classList.remove("bi-heart")
                    axios.post(`http://localhost:3000/favorite`, data)
                }
                else {
                    favicon.classList.remove("bi-heart-fill")
                    favicon.classList.add("bi-heart")
                    axios.delete(`http://localhost:3000/favorite/${ids.id}`)
                }
           
        })
    })
}