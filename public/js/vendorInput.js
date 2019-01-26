// var To = $("[name='to']");
// console.log(To);

$(".create-form").submit(function (event) {

    event.preventDefault();
    var formInputs = $(".create-form").serializeArray();

    var leaseDetails = {
        to: formInputs[0].value,
        from: formInputs[1].value,
        price: formInputs[2].value,
        paymentFrequency: formInputs[3].value
    }

    var parkingSpotDetails = {
        unit: formInputs[4].value,
        streetNumber: formInputs[5].value,
        streetName: formInputs[6].value,
        city: formInputs[7].value,
        postalCode: formInputs[8].value

    }

    var aboutYourself = {
        firstName: formInputs[9].value,
        lastName: formInputs[10].value

    }



    var data = {
        leaseDetails: leaseDetails,
        parkingSpotDetails: parkingSpotDetails,
        aboutYourself: aboutYourself
    };

    var address = String(parkingSpotDetails.streetNumber)+" "+String(parkingSpotDetails.streetName)+" "+String(parkingSpotDetails.city);

    // console.log(JSON.stringify({
    //     leaseDetails: leaseDetails,
    //     parkingSpotDetails: parkingSpotDetails,
    //     aboutYourself: aboutYourself
    // }));

    // adding geocode call
    $.get('/api/geocode?address='+'5125 Celebration Dr, ON, Canada') //trying this instead of the var address temporarily
    .then(function(data,err){
        $.ajax('http://localhost:3000/vendorInput', {
        type: 'POST',
        data: JSON.stringify({
            leaseDetails: leaseDetails,
            parkingSpotDetails: parkingSpotDetails,
            aboutYourself: aboutYourself
        }),
        contentType: 'application/json',
        success: function () {
            console.log('success');
            // Redirect
            // window.location.href = "/vendorConfirmation";
            // vendorConfirmation(data);


            $.ajax('http://localhost:3000/vendorConfirmation', {  //trying this instead of the same call from vendorConfirmation(data) on line 62 to see if this will work 
                type: 'GET',
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: function () {
                    console.log('success');
                    console.log("MEOWWWW   "+data);
                    $(".container").text(data);
                    // Redirect
                    //window.location.href =;
                },
                error: function () { console.log('error'); }
            });




        },
        error: function () { console.log('error'); }
    });

    });
    

    //console.log(JSON.stringify(leaseDetails) + "\n" + JSON.stringify(parkingSpotDetails) + " \n " + JSON.stringify(aboutYourself));


});

