// Use an API call to get the confirmation
// Populate the page using that information

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
        window.location.href = "/vendorConfirmation";
    },
    error: function () { console.log('error'); }
});