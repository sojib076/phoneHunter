const phoneLoader = async(search,limit) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`);
    const data = await res.json();
    const phones = data.data;
    showPhones(phones,limit);
}

    
const showPhones = (phones,limit) => {
    
    const phonecontaienr = document.getElementById('phoneContainer');
    phonecontaienr.innerHTML = '';
    if ( limit && phones.length > 10 ) {
        document.getElementById("showMore").classList.remove("d-none");
        phones = phones.slice(0, 9);
        
    }else{
        document.getElementById("showMore").classList.add("d-none");
    }

    const noPhone = document.getElementById("noPhone")

    if (phones.length ===0) {
        noPhone.classList.remove("d-none");
    }else{
        noPhone.classList.add("d-none");
    }
     
    phones.forEach(phone =>{
        console.log(phone);
        
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML=`
        <div class="col">
        <div class="card">
          <img src=${phone.image} class="card-img-top p-4" alt="...">
          <div class="card-body">
            <h5 class="card-title">${phone.brand}</h5>
            <h5 class="card-title">${phone.phone_name}</h5>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick = phoneloadinfo('${phone.slug}')>
            OrderNow 
          </button>
        </div>
      </div>
        `
        phonecontaienr.appendChild(phoneDiv);
        
       
    }) 
    toogle(false);
}
 const phoneloadinfo = (id) => {
   const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        const phone = data.data;
        showPhoneInfo(phone);
    })
 }
 const  showPhoneInfo = (phone) => {
    console.log(phone);
    const exampleModalLabel = document.getElementById("exampleModalLabel");
    exampleModalLabel.innerText = phone.name;
    const modalbody = document.getElementById("modal-body");
    modalbody.innerHTML = `
             <h1>${phone.name}</h1>
             <h5>${phone.releaseDate}</h5>
            
        `

 }

const toogle = isloading => {
    if(isloading){
        document.getElementById("loader").classList.remove("d-none");
    }else{
        document.getElementById("loader").classList.add("d-none");
    }
}


const limitseach = (limit) => {
    toogle(true);
    const input = document.getElementById("inputValue")
    const search = input.value;
    phoneLoader(search ,limit);
}


document.getElementById("btnSearch").addEventListener("click", function(){
    limitseach(10);
   
});
var element = document.getElementById("inputValue");
element.addEventListener("keypress", function(event) {
	 if (event.key === "Enter") {
 		 limitseach(10);
 		
     }
});

document.getElementById("showMore").addEventListener("click", function(){
    limitseach();
} );


phoneLoader()