const nameField=document.getElementById("name")
const emergName=document.getElementById("emerg")
const age=document.getElementById("age")
const arrival=document.getElementById("arrival")
const leave=document.getElementById("leave")
const phone=document.getElementById("phone")
const cell=document.getElementById("cell")
const emergPhone=document.getElementById("emergP")
const terrDesc=document.getElementById("TemperDesc")
const terrSpan=document.getElementById("tSpan")
const dietDesc=document.getElementById("dSpan")
const dietField=document.getElementById("dietD")
const dietBox=document.getElementById("diet")
const terriRad=document.getElementById("isTerri")
const errorTime=750//How many MS thing's should stay red for.


function phoneValidator(e){
    //Testing for consecutive numbers only, odd formatting will get stripped anyway, and then pass validation on the post loop!
    if(e.value.replace(/(\d{3}).*(\d{3}).*(\d{4})/, '$1$2$3').length!=10){
        e.style.backgroundColor='red'
        e.value=e.value.replace(/[^0-9]/g,'')
        setTimeout(returnDefaults,errorTime,e)
    }else{
        //Gotta make sure this meets the expecations of the above if otherwise it'll loop recursively
        e.value=e.value.replace(/.*(\d{3}).*(\d{3}).*(\d{4}).*/, '($1) $2-$3');
        e.style.backgroundColor=null
    }
}
function displayTerritorial(e){
    if(e.value=="T"){
        terrDesc.style.visibility="visible"
        terrSpan.style.visibility="visible"
    }else{
        terrSpan.style.visibility="hidden"
        terrDesc.style.visibility="hidden"
        terrDesc.value=""
    }
}
function displayDiet(e){
    if(e.checked){
        dietDesc.style.visibility="visible"
        dietField.style.visibility="visible"
    }else{
        dietDesc.style.visibility="hidden"
        dietField.style.visibility="hidden"
        dietField.value=""
    }
}
function emailValidator(e){
    //Below regex string pulled from an old PHP document. Not sure of it's origin
    if(!e.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        e.style.backgroundColor='red'
        setTimeout(returnDefaults,errorTime,e)
    }else{
        e.style.backgroundColor=null
    }
}
function returnDefaults(e){
    e.style.backgroundColor=null
}

function getRadioSelection(radioName){
    return document.querySelector('input[name="'+radioName+'"]:checked').value;
}
function isDayChecked(){
    //Long but simple line, return true if 1 or more box is checked
    //Future proofed for sat/sun
    if( document.getElementById('mon').checked||document.getElementById('tue').checked||document.getElementById('wed').checked||document.getElementById('thu').checked||document.getElementById('fri').checked||document.getElementById('sat').checked||document.getElementById('sun').checked){
        return true
    }
    return false
}
function isTimeValid(){
    //Break our times down and do a manual comparison
    ah=parseInt(arrival.value.split(":")[0])
    am=parseInt(arrival.value.split(":")[1])
    lh=parseInt(leave.value.split(":")[0])
    lm=parseInt(leave.value.split(":")[1])
    if(ah<lh||((ah==lh)&&am<lm)){
        if(ah>5&&ah<13&&lh>9&&lh<19){
            return true
        }
    }
    return false
}
function isPhoneValid(){
    if((phone.value.match(/\(\d{3}\) \d{3}-\d{4}/)||cell.value.match(/\(\d{3}\) \d{3}-\d{4}/))&&emergPhone.value.match(/\(\d{3}\) \d{3}-\d{4}/)){
        return true
    }
    return false
}
function isEmailValid(){
    if(e.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        return true
    }
    return false
}
function isTerritorialOrDietRestricted(){
    if((!terriRad.checked||terrDesc.value.length>0)&&(!dietBox.checked||dietField.value.length>0)){
       return true 
    }
    return false
}
function attemptSubmission(){
    if(nameField.value.length>0&&emergName.value.length>0){//Handle both our simple strings here!
        if(age.value.match(/\d*/)){//Make sure the age contains a number, we'll discard non numeric values
            age.value.replace(/^\D*/,'')
            if(isDayChecked()){//Make sure atleast 1 day is checked
                if(isTimeValid()){//Check if the min/max flags are triggered, if not move on
                    if(isPhoneValid()){
                        if(isTerritorialOrDietRestricted()){
                            return true
                        }else{
                            alert("Please fill in the missing details.");
                        }
                    }else{
                        alert("Please check the phone numbers, you need either a home or cell phone and an emergency contact number.");
                    }
                }else{
                    alert("Please check your arrival and departure times");
                }
            }else{
                alert("Please select one or more days");
            }
        }else{
            alert("That's not a valid age");
        }
    }else{
        alert("Please enter all names!");
    }
    return false
}