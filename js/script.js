//----------Prevent Enter Key Auto Submit--------//
$(document).on('keypress', 'form', function(event) {
    return event.keyCode != 13;
});

//----------Variables--------//
const submit = $('button');
//--Add Total
$('.activities').append('<p></p>');
let finalTotal = $('.activities').children().last();


//-----Text Input Variables
const name = $('#name');
const email = $('#mail');
const creditCard = $('#cc-num');
const zipCode = $('#zip');
const cvv = $('#cvv');
const payment = $('#payment');
const paymentSection = $('#credit-card');
let paypalInfo = paymentSection.next();
let bitcoinInfo = paymentSection.next().next();


//----Select Input Variables
const otherRole = $('#otherRole');
const roleSelect = $('#title');
const shirtTheme = $('#design');
const shirtColor = $('#color');
let shirtColorOptions = $('#color options');
const activitiesCheckbox = $('.activities input');
const activitiesTip = $('.activities span');

//---Name Input Focus Onload
name.focus();

//---Hide Other Role Field Onload
otherRole.hide();
otherRole.prev().hide();

//---Hide Shirt Colors Onload & Dynamically add Select Color Option
$('<option value="select" selected>Select a T-Shirt Color</option>').insertBefore(shirtColor.children()[0]);
shirtColor.hide();
shirtColor.prev().hide();

//---Credit Card Default Payment Option Onload
payment.children()[1].selected = true;
paypalInfo.hide();
bitcoinInfo.hide();


//-----------Validator Functions---------------//

//---Name Entered?
function isNameEntered() {
  let emailValue = name.val();
  if (emailValue == ""){
    return 'fail';
  }
  else {
    return 'pass';
  }
}

//---Email Valid?
function isEmailValid() {
  let emailValue = email.val();
  let regex = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
  if (regex === false){
    return 'fail';
  }
  else {
    return 'pass';
  }
}

//---Are Checkbox unchecked?
function isboxChecked() {
 let checked = 0;
 for (let i=0; i< activitiesCheckbox.length; i++){
   if (activitiesCheckbox[i].checked){
     checked += 1;
   }
 }
 if (checked === 0){
   return 'fail';
 }
 else{
   return 'pass';
 }
}


//---CC Number Valid?
function isCardValid() {
  let cardValue = creditCard.val();
  let regex = /^\d{13,16}$/.test(cardValue);
  if (regex === false){
    return 'fail';
  }
  else {
    return 'pass';
  }
}


//---Zip Code Valid?
function isZipCodeValid() {
  let zipCodeValue = zipCode.val();
  let regex = /^\d{5}$/.test(zipCodeValue);
  if (regex === false){
    return 'fail';
  }
  else {
    return 'pass';
  }

}

//---CVV Valid?
function isCvvValid() {
  let cvvValue = cvv.val();
  let regex = /^\d{3}$/.test(cvvValue);
  if (regex === false){
    return 'fail';
  }
  else {
    return 'pass';
  }
}

//---Tuesday Morning?
function isTuesdayMorning(string) {
  let tuesMorning = /tuesday\s?\d\w\w-\d\d/gmi.test(string);
  if (tuesMorning){
    return true;
  }
  else {
    return false;
  }
}

//---Tuesday Afternoon?
function isTuesdayAfternoon(string) {
  let tuesAfternoon = /tuesday\s?\d\w\w-\dp/gmi.test(string);
  if (tuesAfternoon){
    return true;
  }
  else {
    return false;
  }
}


//-----------Show/Hide Validator---------------//
function showHideToolTip(result, element) {

  if (result === 'fail'){
    element.css('visibility', 'visible');
    return false;
  }else if ('pass') {
    element.css('visibility', 'hidden');
    return true;
  }
}

//---Call Activities Validator on Mouseover
$('.activities').on('mouseover', ()=> {
  showHideToolTip(isboxChecked(), activitiesTip);
});

//---Input Validator on Input
function inputValidator(regexName) {
  return e => {
    showHideToolTip(regexName(e), $(e.target).next());
  };
}

//----Validator on Submit w/Credit Card
function submitValidatorWithCard(){
  let results = [];
  results.push(showHideToolTip(isNameEntered(), name.next()));
  results.push(showHideToolTip(isEmailValid(), email.next()));
  results.push(showHideToolTip(isboxChecked(), activitiesTip));
  results.push(showHideToolTip(isCardValid(), creditCard.next()));
  results.push(showHideToolTip(isZipCodeValid(), zipCode.next()));
  results.push(showHideToolTip(isCvvValid(), cvv.next()));

  if (results.includes(false)) {
    return false;
  }
  else {
    return true;
  }
}

//----Validator on Submit
function submitValidator(){
  let results = [];
  results.push(showHideToolTip(isNameEntered(), name.next()));
  results.push(showHideToolTip(isEmailValid(), email.next()));
  results.push(showHideToolTip(isboxChecked(), activitiesTip));

  if (results.includes(false)) {
    return false;
  }
  else {
    return true;
  }
}




//--------------------------Interactivity---------------------------//

//---Input Event Listeners
name.on('input', inputValidator(isNameEntered));
email.on('input', inputValidator(isEmailValid));
zipCode.on('keyup', inputValidator(isZipCodeValid));
cvv.on('keyup', inputValidator(isCvvValid));
creditCard.on('input', inputValidator(isCardValid));


//---On Selecting Other Job Roll Show Input
roleSelect.on('change', (e)=> {
  if (e.target.value === 'other') {
    otherRole.show();
    otherRole.prev().show();
  } else {
    otherRole.hide();
    otherRole.prev().hide();
  }
});


//---On Selecting T-Shirt Design Show  Relevant Options
shirtTheme.on('change', (e)=> {

  if ($(e.target).val() === 'js puns'){
    shirtColor.prev().show();
    shirtColor.show();
    shirtColor.children()[0].selected = true;
    for (let i=0; i<shirtColor.children().length; i++){
      let puns = /js puns/i.test(shirtColor.children()[i].innerText);
      let select = /select/i.test(shirtColor.children()[i].innerText);
      if (puns === true || select === true){
        shirtColor.children()[i].style.display = 'inherit';
      } else {
        shirtColor.children()[i].style.display = 'none';
      }
    }
  }

  if ($(e.target).val() === 'heart js'){
    shirtColor.prev().show();
    shirtColor.show();
    shirtColor.children()[0].selected = true;
    for (let i=0; i<shirtColor.children().length; i++){

      let hearts = /I . JS/i.test(shirtColor.children()[i].innerText);
      let select = /select/i.test(shirtColor.children()[i].innerText);
      if (hearts === true || select === true){
        shirtColor.children()[i].style.display = 'inherit';
      } else {
        shirtColor.children()[i].style.display = 'none';
      }
    }
  }

  if ($(e.target).val() === 'Select Theme'){
    shirtColor.prev().hide();
    shirtColor.hide();
  }
});


//---On Selecting Activity Disable Conflicts & Totals

$('.activities label').on('change', (e) => {
//---Variables for Total
let total = [];
let sum = 0;
let checkedTally = 0;
//---Variables for Conflicts
let text;
let selectedlabel = e.target.parentNode;
let selectedbox = e.target;
let selectedText = selectedlabel.innerText;


 for (let i=0; i< activitiesCheckbox.length; i++){
   //---Variables
   text = activitiesCheckbox[i].parentNode.innerText;
   let box = activitiesCheckbox[i];
   let label = box.parentNode;
   let checked = box.checked;

     //----------Disable Conflicting Times--------//
    if ((isTuesdayMorning(selectedText) === true) && (isTuesdayMorning(text) === true)) {
      for (let i=0; i < text.length; i++ ){
        label.classList.add('disabled');
        box.disabled = true;
        if (checked === true) {
        label.classList.remove('disabled');
        box.disabled = false;
        }
      }
    }

    if ((isTuesdayAfternoon(selectedText) === true) && (isTuesdayAfternoon(text) === true)) {
      for (let i=0; i < text.length; i++ ){
        label.classList.add('disabled');
        box.disabled = true;
        if (checked === true) {
        label.classList.remove('disabled');
        box.disabled = false;
        }
      }
    }

  //Get Price from Text & Create Total Array & get Sum
    if (checked){
      let price = parseInt(text.substr(-3, 3));
      total.push(price);
      sum = total.reduce((x, y)=> x + y, 0);
      finalTotal.text(`Total: $${sum}`);
      checkedTally += 1;
    }
    if (checkedTally === 0) {
      sum = 0;
      finalTotal.text(`Total: $${sum}`);
      label.classList.remove('disabled');
      box.disabled = false;
    }
  }

});



//---On Selecting Payment Disable Other Options
payment.on('change', (e)=> {
  if (e.target.value === 'credit card') {
    paymentSection.show();
    bitcoinInfo.hide();
    paypalInfo.hide();
  }
  else if (e.target.value === 'bitcoin') {
    bitcoinInfo.show();
    paymentSection.hide();
    paypalInfo.hide();
  }
  else if (e.target.value === 'paypal') {
    paypalInfo.show();
    bitcoinInfo.hide();
    paymentSection.hide();
  }
  else {
    paymentSection.hide();
    bitcoinInfo.hide();
    paypalInfo.hide();
  }

});



//---------Submit Confirmation----------//

submit.on('click', (e)=>{

  //Add Confirmation Banner to DOM & Hide It
  $('header').append(`<p class="message">You are registered for Full Stack Conf!<br>A confirmation has been sent to ${email.val()} <p>`);
  const message = $('header p');
  message.hide();

  if (payment.val() === 'credit card') {
    submitValidatorWithCard();
    if(submitValidatorWithCard() === true){
      $(window).scrollTop(0);
      e.preventDefault();
      //Show Confirmation Banner then Submit Form
      message.show().delay(2000).fadeOut(2000);
      setTimeout(()=> {
        $('form').submit();
      }, 4200);
    } else {
      //Return to Top & Show Flags
      $(window).scrollTop(0);
      e.preventDefault();
    }
  }
  else {
    submitValidator();
    if(submitValidator() === true){
      $(window).scrollTop(0);
      e.preventDefault();
      //Show Confirmation Banner then Submit Form
      message.show().delay(2000).fadeOut(2000);
      setTimeout(()=> {
        $('form').submit();
      }, 4200);
    } else {
      //Return to Top & Show Flags
      $(window).scrollTop(0);
      e.preventDefault();
    }
  }

});
