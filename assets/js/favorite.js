const row=document.querySelector(".solution-row")

axios.get("http://localhost:3000/favorite/")
.then(res =>res.data)
.then( element => {
    element.forEach(elem => {
        row.innerHTML+=` 
                            <div class="col-lg-6 col-sm-6 col-xs-12">
                                <div class="loan-card">
                                    <div class="image">
                                        <img src=${elem.image} alt="">
                                    </div>
                                    <p class="title">${elem.name}</p>
                                    <h3>${elem.title}</h3>
                                    <p>${elem.about}</p>
                                    <div class="buttons">
                                        <button onclick='delFunc(${elem.id})'>Delete</button>
                                        <a href='./update.html?id=${elem.id}'>Update</a>
                                        <a href='./detail.html?id=${elem.id}'>Detail</a>
                                    </div>
                                </div>
                            </div> `
    })
})
function delFunc(id){
    console.log(id) 
    axios.delete("http://localhost:3000/favorite/"+id)
    window.location.reload()
}