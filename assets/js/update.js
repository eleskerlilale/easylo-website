const id=new URLSearchParams(window.location.search).get("id")
const name=document.querySelector("#name")
const about=document.querySelector("#about");
const title=document.querySelector("#title");
const file=document.querySelector("input[type='file']");
const image=document.querySelector(".img")
const save=document.querySelector(".save")
const cancel=document.querySelector(".cancel")

axios.get("http://localhost:3000/main/"+id)
.then(data => {
    image.src=data.data.image
    name.value=data.data.name
    title.value=data.data.title
    about.value=data.data.about
})
file.addEventListener("input", () => {
    let img=file.files[0]
    if(img){
        let reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload=function() {
            image.src=reader.result
        }
    }
})

save.addEventListener("click", (e) => {
    e.preventDefault()
    if(id){
        axios.put("http://localhost:3000/main/"+id, 
            {
                image:image.src,
                name:name.value,
                title:title.value,
                about:about.value
            }
        )
    }else{
        axios.post("http://localhost:3000/main/", 
        {
            image:image.src,
            name:name.value,
            title:title.value,
            about:about.value
        }
     )
    }
     window.location='./index.html'
     console.log(name.value, title.value, about.value)
})

cancel.addEventListener("click", () => {
    window.location='./index.html'
})