function getElementfromString(string){
    const div = document.createElement('div')
    div.innerHTML = string
    return div.firstElementChild
}

//hiding the parameter box initially
let parameterBox = document.getElementById("parameterBox")
parameterBox.style.display="none"

//for parameter number
let addedParamCount = 0;

//if the user clicks on paramsbox, hide the json
let paramsRadio = document.getElementById("paramsRadio")
// /console.log(paramsRadio)
paramsRadio.addEventListener('click',()=>{
    document.getElementById("requestJsonBox").style.display= "none"
    document.getElementById("params").style.display="block"
    document.getElementById("parameterBox").style.display="block  "
})

//if the user clicks on jsonbox hide the json box
let jsonRadio = document.getElementById("jsonRadio")
jsonRadio.addEventListener('click',()=>{
    document.getElementById("parameterBox").style.display="none"
    document.getElementById("params").style.display="none"
    document.getElementById("requestJsonBox").style.display ="block"
})

//if the user click on add parameter button
let addParam = document.getElementById("addParam")
addParam.addEventListener("click",()=>{
    let params = document.getElementById("params")
    let string = `<div  id="parameterBox">
                    <div class="form-row my-2">
                        <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount+2}</label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterkey${addedParamCount+2}" placeholder="Enter parameter ${addedParamCount+2} key">
                     </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parametervalue${addedParamCount+2}" placeholder="Enter value ${addedParamCount+2} key">
                    </div>
                        <button type="button" id="addParam" class="btn btn-primary deleteParam">-</button>
                    </div>
                    </div>`
    //params.appendChild(string):- creating an html as it is a string console.log(typeof String)
    let childElement = getElementfromString(string)
    params.appendChild(childElement)
    addedParamCount++;

    let deleteParam = document.getElementsByClassName("deleteParam")
for(item of deleteParam){
    item.addEventListener('click',(e)=>{
        e.target.parentElement.remove()
    })
}
})

//submit handler
document.getElementById("submit").addEventListener('click',(e)=>{
    e.preventDefault();
    const url = document.getElementById("urlField").value;
    const requestType = document.querySelector("input[name='requestType']:checked").value;
    const contentType = document.querySelector("input[name='contentType']:checked").value;
    //console.log(url,contentType,requestType)
    
    
    data={};
    if(contentType=="params"){
        
        for(let i=1;i<addedParamCount+1;i++){
            if(document.getElementById(`parameterkey${i}`)!= undefined){
            let key = document.getElementById(`parameterkey${i}`).value;
            let value =document.getElementById(`parametervalue${i}`).value;
            data[key] = value;
            //console.log(key,value)
        }
    }
        //console.log(data)
        data = JSON.stringify(data)
    }else{
        data = document.getElementById('requestJsonText').value;
        console.log(data)
    }
    if(requestType == "GET"){
        fetch(url,{
            method:'GET'
        })
        .then(response => response.text())
        .then(data => document.getElementById('requestJsonText').value = data)
        .catch(err=>console.log("error",err))
    }
    else{
        fetch(url,{
            method:'POST',
            headers:{
                "Content-Type": 'application/json;charset=UTF-8'
            }
        })
        .then(response => response.text())
        .then(data => document.getElementById('requestJsonText').value = data)
        .catch(err=>console.log("error",err))
    }
})
