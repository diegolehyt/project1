//-----------------------------------------------------------------------------------------------------------------
//----------------------------------------/ project 1 - group 2 /--------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------

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

    event.preventDefault()

    // Grab the text from the input box
    let locationFrom = document.getElementById("locationInput").value
    let locationTo = document.getElementById("destinationInput").value


    //--------------------------------------    extract date info into variables   -------------------------------------
    //Date From
    let dateFrom = document.getElementById("departingInput").value; 
    let dateprint = document.getElementById('printDate1');

    //day From
    let dayFrom = dateFrom.substr(0, 2);
    //month From
    let monthFrom = dateFrom.substr(3, 2);
    //year From
    let yearFrom = dateFrom.substr(6, 7);

    dateFrom = dayFrom + '%2F' + monthFrom + '%2F' + yearFrom; 
    dateprint.innerHTML = dateFrom;

    //Date Back
    let dateTo = document.getElementById("returningInput").value

    //day back
    let dayTo = dateTo.substr(0, 2);
    //month back
    let monthTo = dateTo.substr(3, 2);
    //year back
    let yearTo = dateTo.substr(6, 7);

    dateTo = dayTo + '%2F' + monthTo + '%2F' + yearTo;

    
    //global variables
    let currency = document.getElementById('currency').value;  //remove when input added
    //let currency = document.getElementById("currencyInput").value   //use for currency input

    // APIs call construction 
    //flight API "one Way Trip"
    let flightURL =
        'https://api.skypicker.com/flights?flyFrom=' + locationFrom + '&to=' + locationTo + '&dateFrom=' + dateFrom + '&partner=picky&v=3';

    //flight API "back Trip only"   
    let flightURL2 =
        'https://api.skypicker.com/flights?flyFrom=' + locationTo + '&to=' + locationFrom + '&dateFrom=' + dateTo + '&partner=picky&v=3';

    //currency API
    let currencyURL = 'http://data.fixer.io/api/latest?access_key=fe4a412b107682cf0ed9c555bfc457c7&symbols=' + currency;

    //Flight From API call-----------------------------------------------------------------
    fetch(flightURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (Fdata) {

            //PRINT BOXES TO TEST RESULTS
            let a = document.getElementById('print');
            let b = document.getElementById('print2');
            let c = document.getElementById('print3');
            let d = document.getElementById('print4');
            
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

            //price variables 
            let fromPrice = JSON.stringify(Fdata.data[0].price);
            let fromPriceBag = JSON.stringify(Fdata.data[0].bags_price[1]);

            if (isNaN(fromPriceBag)){
                fromPriceBag = 0;
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
                    
                    // //country from info
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
        
                    //price Back variables 
                    let backPrice = JSON.stringify(Fdata.data[0].price);
                    let backPriceBag = JSON.stringify(Fdata.data[0].bags_price[1]);

                    if (isNaN(backPriceBag)){
                        backPriceBag = 0;
                    }
        
                    let finalPriceBack = (parseFloat(backPrice) + parseFloat(backPriceBag)) * currencyRate; //Final price Back (on currency selected)

                    //Final Price Round Trip
                    let finalPrice = finalPriceFrom + finalPriceBack;  // on currency selected


                    //PRINT BOXES TO TEST RESULTS
                    a.textContent = currencyRate;
                    b.textContent = finalPriceFrom;
                    c.textContent = finalPriceBack;
                    d.textContent = finalPrice;            



                })
            })
        })

    
})

