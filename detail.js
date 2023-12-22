const id= new URLSearchParams(window.location.search).get("id")

const row=document.querySelector(".solution-row")

axios.get("http://localhost:3000/main/"+id)
.then(res =>res.data)
.then( element => {
    row.innerHTML=` 
                            <div class="col-lg-12">
                                <div class="loan-card">
                                    <div class="image">
                                        <img src=${element.image} alt="">
                                    </div>
                                    <p class="title">${element.name}</p>
                                    <h3>${element.title}</h3>
                                    <p>${element.about}</p>
                                </div>
                            </div> `
})