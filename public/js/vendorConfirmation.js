// Use an API call to get the confirmation
// Populate the page using that information

$.ajax('http://localhost:3000/vendorConfirmation', {
    type: 'GET',
    data: JSON.stringify({
        id: id,
        aboutYourself: aboutYourself
    }),
    contentType: 'application/json',
    success: function () {
        console.log('success');
        // Redirect
        window.location.href = "/vendorConfirmation";
    },
    error: function () { console.log('error'); }
});