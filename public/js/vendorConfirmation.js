// Use an API call to get the confirmation
// Populate the page using that information
console.log("wtf");

function vendorConfirmation(data){

    $.ajax('http://localhost:3000/vendorConfirmation', {
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
};