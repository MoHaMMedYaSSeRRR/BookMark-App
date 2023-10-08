var siteName = document.getElementById("siteName")
var siteUrl = document.getElementById("siteUrl")
var alertMessage1 = document.getElementById("alert")
var alertMessage2= document.getElementById("alert2")
var siteContainer;


if (localStorage.getItem('sites') != null) {
    siteContainer = JSON.parse(localStorage.getItem('sites'))
    displaySites(siteContainer)
}
else {
    siteContainer = [];
}

function validation() {
    if (siteName.value != '' && siteUrl.value != '') {
        return true
    }
    else if(siteName.value === '')
     {
        return 'nameRequired';
    }
    else {
            return 'siteRequired'
    }

}




function addsite() {
    if (validation() == true) {
        var site = {
            name: siteName.value,
            siteUrl: siteUrl.value
        }
        siteContainer.push(site)
        localStorage.setItem('sites', JSON.stringify(siteContainer))
        clearForm()
        displaySites(siteContainer)
        alertMessage1.classList.replace("d-block" , "d-none")
        alertMessage2.classList.replace("d-block" , "d-none")
        

    }
    else if(validation() == 'nameRequired')
    {
      return  alertMessage1.classList.replace("d-none", "d-block") ;

    }
    else{
        alertMessage2.classList.replace("d-none", "d-block")
    }


}

function displaySites(siteContainer) {
    var cartoona = ``
    for (let i = 0; i < siteContainer.length; i++) {
        var siteLink = siteContainer[i].siteUrl
        cartoona += `
        <div  class="row p-2 d-flex justify-content-around  mt-4">
          
      
        <div class=" col-md-6 ">
                <h4>${siteContainer[i].name}</h4>
         </div>
            <div class="site-button col-md-6">
                <a target="_blank" href="${siteLink}">
                    <button class="btn btn-info">Visit</button>
                </a>
                <button onclick=(deleteSite(${i})) class="btn btn-danger ms-2">Delete</button>
            </div>
            </div> 

         `

    }
    document.getElementById("siteData").innerHTML = cartoona;
}


function clearForm() {
    siteName.value = ''
    siteUrl.value = ''
}

function deleteSite(deletedIndex) {
    siteContainer.splice(deletedIndex, 1)
    localStorage.setItem('sites', JSON.stringify(siteContainer))
    displaySites(siteContainer)
}