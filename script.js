//-----------------------------------------------------------------------------------------------------------------
//----------------------------------------/ project 1 - group 2 /--------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------



//Local Storage SetUp 
if (localStorage.getItem('locationFromInput') !== null && localStorage.getItem('currencyInput') !== null ){
   let Pcity = localStorage.getItem('locationFromInput');
   let Pcurrency = localStorage.getItem('currencyInput');
   document.getElementById("locationInput").setAttribute("value", Pcity);
   document.getElementById("currency").setAttribute("value", Pcurrency);

}

//Reset Data
let resetBtn = document.getElementById('resetBtn');
resetBtn.addEventListener('click', function(){
    
    localStorage.clear();
    location.reload(true);
})


//Date Picker
const elems = document.querySelectorAll('.datepicker');
M.Datepicker.init(elems, {
    format: 'dd/mm/yyyy'
});

//Check Box
let checkbox = document.getElementById('checkbox');
let returnDateDiv = document.getElementById("returnDateDiv")

checkbox.addEventListener( 'change', function() {
    if(this.checked) {
        returnDateDiv.style.display = "block";
    } 
    else {
        returnDateDiv.style.display = "none";
    }
});




document.getElementById('submitBtn').addEventListener('click', function (event) {

    // Loader
    let footer = document.getElementById("footer");
    let loader = document.getElementById('loader');
    let titleDiv = document.getElementById("titleDiv");
    titleDiv.style.display = "none";
    footer.style.marginTop = '500px';
    loader.style.display = 'block';

    event.preventDefault()

    //Hide Main Page
    let mainPage = document.getElementById('mainPage');
    let mainPage2 = document.getElementById('mainPage2');
    mainPage.style.display = "none";
    mainPage2.style.display = "none";

    // Grab the text from the input box
    let locationFrom = document.getElementById("locationInput").value
    let locationTo = document.getElementById("destinationInput").value

    let locationFrom2 = locationTo;
    let locationTo2 = locationFrom;


    //--------------------------------------    extract date info into variables   -------------------------------------
    //Date From
    let dateFrom = document.getElementById("departingInput").value; 


    //day From
    let dayFrom = dateFrom.substr(0, 2);
    //month From
    let monthFrom = dateFrom.substr(3, 2);
    //year From
    let yearFrom = dateFrom.substr(6, 7);

    dateFrom = dayFrom + '%2F' + monthFrom + '%2F' + yearFrom; 
    

    //Date Back
    let dateTo = document.getElementById("returningInput").value

    //in case of one way trip
    if (dateTo === ""){
        dateTo = document.getElementById("departingInput").value;
        locationFrom2 = locationFrom;
        locationTo2 = locationTo;
    }



    //day back
    let dayTo = dateTo.substr(0, 2);
    //month back
    let monthTo = dateTo.substr(3, 2);
    //year back
    let yearTo = dateTo.substr(6, 7);

    dateTo = dayTo + '%2F' + monthTo + '%2F' + yearTo;

    
    //global variables
    let currency = document.getElementById('currency').value;  //remove when input added


    // APIs call construction 
    //flight API "one Way Trip"
    let flightURL =
        'https://api.skypicker.com/flights?flyFrom=' + locationFrom + '&to=' + locationTo + '&dateFrom=' + dateFrom + '&partner=picky&v=3';

    //flight API "back Trip only"   
    let flightURL2 =
        'https://api.skypicker.com/flights?flyFrom=' + locationFrom2 + '&to=' + locationTo2 + '&dateFrom=' + dateTo + '&partner=picky&v=3';

    //currency API
    let currencyURL = 'https://api.frankfurter.app/latest?access_key=fe4a412b107682cf0ed9c555bfc457c7&symbols=' + currency;

    //--------------------------------------------------  Flight From API call  ----------------------------------------------------------------
    fetch(flightURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (Fdata) {

            //--------------------------------------   Getting all "Result boxes" from the DOM   -------------------------------------------------
            //Name Input
            let pInput = document.getElementById("pInput").value;
            let totalPriceF = document.getElementById("totalPriceF");
            //Prices DOM
            let fromPriceDiv = document.getElementById('fromPrice');
            let backPriceDiv = document.getElementById('backPrice');
            let totalPriceDiv = document.getElementById('totalPriceDiv');
            //Depart Flight
            let departDate1 = document.getElementById('departDate1');
            let cityFromInfo1 = document.getElementById('cityFromInfo1');
            let durationInfo1 = document.getElementById('durationInfo1');
            let cityBackInfo1 = document.getElementById('cityBackInfo1');
            let arriveDate1 = document.getElementById('arriveDate1');
            let stops1 = document.getElementById('stops1');

            let cityFromCode1 = document.getElementById('cityFromCode1');
            let cityBackCode1 = document.getElementById('cityBackCode1');
            let pFrom = document.getElementById('pFrom');
            //Return Flight
            let departDate2 = document.getElementById('departDate2');
            let cityFromInfo2 = document.getElementById('cityFromInfo2');
            let durationInfo2 = document.getElementById('durationInfo2');
            let cityBackInfo2 = document.getElementById('cityBackInfo2');
            let arriveDate2 = document.getElementById('arriveDate2');
            let stops2 = document.getElementById('stops2');

            let cityFromCode2 = document.getElementById('cityFromCode2');
            let cityBackCode2 = document.getElementById('cityBackCode2');
            let pBack = document.getElementById('pBack');

            //---------------------------------------------------------------------------------------------------------------
            
            // b.textContent = JSON.stringify(Fdata.data[0].price);   //ticket price From
            // b.textContent = JSON.stringify(Fdata.data[0].bags_price[1]);   //bag price From
            
            // //country from info
            // a.textContent = JSON.stringify(Fdata.data[0].countryFrom.name);   //country From
            // b.textContent = JSON.stringify(Fdata.data[0].countryFrom.code);   //country code From 
            // a.textContent = JSON.stringify(Fdata.data[0].cityFrom);           //City From

            // //Country to 
            // a.textContent = JSON.stringify(Fdata.data[0].countryTo.name);   //country To
            // b.textContent = JSON.stringify(Fdata.data[0].countryTo.code);   //country To 
            // a.textContent = JSON.stringify(Fdata.data[0].cityTo);           //City To

            // b.textContent = locationFrom                                      //airport code From
            // a.textContent = dateFrom                                          //date From
            // //Flight info
            // a.textContent = JSON.stringify(Fdata.data[0].fly_duration);       //flight time
            // b.textContent = JSON.stringify(Fdata.data[0].route.length);       //flight stops


            // a.textContent = JSON.stringify(Fdata.data[0].airlines[0]);     //airlines loop
            // b.textContent = JSON.stringify(Fdata.data[0].airlines[1]); 

            // a.textContent = JSON.stringify(Fdata.data[0].airlines.length);   //length airlines 

            // for (let i = 0; JSON.stringify(Fdata.data[0].airlines.length) < i ; i++){   //for loop airlines
            //     a.textContent = (JSON.stringify(Fdata.data[0].route[i]));    
            // }

            //City Variables
            let cityNameFrom = JSON.stringify(Fdata.data[0].cityFrom);
            let durationFrom = JSON.stringify(Fdata.data[0].fly_duration);
            let stopsFrom = (JSON.stringify(Fdata.data[0].route.length)) - 1;
            let cityNameBack = JSON.stringify(Fdata.data[0].cityTo);
            let df = Math.round((JSON.stringify(Fdata.data[0].duration.total) / 3600) / 24);

            let countryFrom = JSON.stringify(Fdata.data[0].countryFrom.name);
            let countryBack = JSON.stringify(Fdata.data[0].countryTo.name);
             

            //price variables 
            let fromPrice = JSON.stringify(Fdata.data[0].price);
            let fromPriceBag = JSON.stringify(Fdata.data[0].bags_price[1]);

            if (isNaN(fromPriceBag)){
                fromPriceBag = 40;
            }

            let totalPriceFrom = parseFloat(fromPrice) + parseFloat(fromPriceBag); //total price From EUR

            //Currency API call-----------------------------------------------------------------
            fetch(currencyURL)
            .then(function (response) {
                return response.json()
            })
            .then(function (Cdata) {
                
            
                //currency variables
                let currencyRate = JSON.stringify(Cdata.rates[currency]);
                currencyRate = parseFloat(currencyRate);
                
                let finalPriceFrom = totalPriceFrom * currencyRate;
                
                
                //Flight Back API call-----------------------------------------------------------------
                fetch(flightURL2)
                .then(function (response) {
                    return response.json()
                })
                .then(function (Fdata) {
                    // a.textContent = JSON.stringify(Fdata.data[0].price);   //ticket price Back 
                    // b.textContent = JSON.stringify(Fdata.data[0].bags_price[1]);   //bag price Back
                    
                    // //country to info
                    // a.textContent = JSON.stringify(Fdata.data[0].countryFrom.name);   //country Back
                    // b.textContent = JSON.stringify(Fdata.data[0].countryFrom.code);   //country code Back 
                    // a.textContent = JSON.stringify(Fdata.data[0].cityFrom);           //City Back
                    // //Country to 
                    // a.textContent = JSON.stringify(Fdata.data[0].countryTo.name);   //country To
                    // b.textContent = JSON.stringify(Fdata.data[0].countryTo.code);   //country To 
                    // a.textContent = JSON.stringify(Fdata.data[0].cityTo);           //City To
        
                    // b.textContent = locationFrom                                      //airport code Back
                    // a.textContent = dateFrom                                          //date Back
                    // //Flight info
                    // a.textContent = JSON.stringify(Fdata.data[0].fly_duration);       //flight time
                    // b.textContent = JSON.stringify(Fdata.data[0].route.length);       //flight stops
        
        
                    // a.textContent = JSON.stringify(Fdata.data[0].airlines[0]);     //airlines loop
                    // b.textContent = JSON.stringify(Fdata.data[0].airlines[1]); 
        
                    // a.textContent = JSON.stringify(Fdata.data[0].airlines.length);   //length airlines 
        
                    // for (let i = 0; JSON.stringify(Fdata.data[0].airlines.length) < i ; i++){ //for loop airlines
                    //     a.textContent = (JSON.stringify(Fdata.data[0].route[i]));    
                    // }

                    //flight duration variables 
                    let durationBack = JSON.stringify(Fdata.data[0].fly_duration);
                    let stopsBack = (JSON.stringify(Fdata.data[0].route.length)) - 1;
                    let db = Math.round((JSON.stringify(Fdata.data[0].duration.total) / 3600) / 24);

                    //price Back variables 
                    let backPrice = JSON.stringify(Fdata.data[0].price);
                    let backPriceBag = JSON.stringify(Fdata.data[0].bags_price[1]);

                    if (isNaN(backPriceBag)){
                        backPriceBag = 40;
                    }

                    //-------------------------------------------   Formulas   ----------------------------------------------------------
        
                    let finalPriceBack = (parseFloat(backPrice) + parseFloat(backPriceBag)) * currencyRate; //Final price Back (on currency selected)

                    // Incase of One way trip
                    if (finalPriceFrom == finalPriceBack){
                        finalPriceBack = 0;
                    }

                    //Final Price Round Trip
                    let finalPrice = finalPriceFrom + finalPriceBack;  // on currency selected


                    //---------------------------------------------   PRINT BOXES RESULTS  --------------------------------------------------
                    //CRdiv.textContent = currencyRate; //print currency rate test
                    //Prices Results
                    fromPriceDiv.textContent = finalPriceFrom.toFixed(2) + ' ' + currency;
                    backPriceDiv.textContent = finalPriceBack.toFixed(2) + ' ' + currency;
                    totalPriceF.textContent = finalPrice.toFixed(2) + ' ' + currency;

                    //ONE WAY TRIP--------------------
                    departDate1.textContent = dayFrom + '/' + monthFrom;
                    cityFromInfo1.textContent = " " + cityNameFrom.replace(/['"]+/g, '') + ', ' + countryFrom.replace(/['"]+/g, '');
                    durationInfo1.textContent = " " + durationFrom.replace(/['"]+/g, '');
                    cityBackInfo1.textContent = " " + cityNameBack.replace(/['"]+/g, '') + ', ' + countryBack.replace(/['"]+/g, '');
                    if (stopsFrom == 0){
                        stopsFrom = " Direct Flight"
                    }
                    stops1.textContent = stopsFrom;

                    cityFromCode1.textContent = locationFrom;
                    cityBackCode1.textContent = locationTo;
                    pFrom.textContent = pInput;
                    //date From depart
                    arriveDate1.textContent = (parseInt(dayFrom) + df) + '/' + monthFrom;

                    //ROUND TRIP-----------------------
                    departDate2.textContent = dayTo + '/' + monthTo;
                    cityFromInfo2.textContent = " " + cityNameBack.replace(/['"]+/g, '') + ', ' + countryBack.replace(/['"]+/g, '');
                    durationInfo2.textContent = " " + durationBack.replace(/['"]+/g, '');
                    cityBackInfo2.textContent = " " + cityNameFrom.replace(/['"]+/g, '') + ', ' + countryFrom.replace(/['"]+/g, '');
                    if (stopsBack == 0){
                        stopsBack = " Direct Flight"
                    }
                    stops2.textContent = stopsBack;

                    cityFromCode2.textContent = locationTo;
                    cityBackCode2.textContent = locationFrom;
                    pBack.textContent = pInput;
                    //date From depart
                    arriveDate2.textContent = (parseInt(dayTo) + db) + '/' + monthTo;  

                    //Loader Display ----------------------------------------------------------
                    loader.style.display = 'none';
                    footer.style.marginTop = '100px';
                    
                    //print boxes display
                    let fromDiv = document.getElementById('fromDiv');
                    let returnDiv = document.getElementById('returnDiv');
                    fromDiv.style.display = "block";
                    totalPriceDiv.style.display = "block";

                    if (dateFrom != dateTo){

                        returnDiv.style.display = "block";
                    }
                    else{
                        finalPrice = finalPriceFrom;
                        totalPriceF.textContent = finalPrice.toFixed(2) + ' ' + currency; 
                    }

                    //Local Storage----------------------------------------------------------------
                    locationFrom = localStorage.setItem('locationFromInput', locationFrom);
                    currency = localStorage.setItem('currencyInput', currency);

                    //Go Back
                    let goBackBtn = document.getElementById('goBackBtn');
                    goBackBtn.style.display = "block";
                    goBackBtn.addEventListener('click', function(){

                        location.reload(true);
                    })

                   

                   





                })
            })
        })

    
})


