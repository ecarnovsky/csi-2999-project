document.querySelector('#reservation-submit-btn').addEventListener('click', makeReservation);

function makeReservation(event) {
    event.preventDefault();

    const firstName = document.querySelector('#first-name');
    const lastName = document.querySelector('#last-name');
    const email = document.querySelector('#email');
    const phone = document.querySelector('#phone');
    const agreedToTerms = document.querySelector('#agreed-to-terms');
    const startDate = document.querySelector('#reservation-start-date');
    const endDate = document.querySelector('#reservation-end-date');
    const selectedSiteId = document.querySelector('#selectedSiteId');

    // Check for empty fields and validity
    if (!firstName.value.trim()) {
        alert('Please enter your first name.');
        firstName.focus();
        return;
    }
    
    if (!lastName.value.trim()) {
        alert('Please enter your last name.');
        lastName.focus();
        return;
    }

    if (!email.value.trim()) {
        alert('Please enter your email.');
        email.focus();
        return;
    }

    if (!isValidEmail(email.value.trim())) {
        alert('Please enter a valid email address (e.g., user@example.com).');
        email.focus();
        return;
    }

    if (!phone.value.trim()) {
        alert('Please enter your phone number.');
        phone.focus();
        return;
    }

    if (!isValidPhoneNumber(phone.value.trim())) {
        alert('Please enter a valid 10-digit phone number.');
        phone.focus();
        return;
    }
    
    if (!agreedToTerms.checked) {
        alert('You must agree to the Rules and Regulations in order to make a reservation!');
        return;
    }

    if (!startDate.value.trim()) {
        alert('Start date is missing.');
        return;
    }

    if (!endDate.value.trim()) {
        alert('End date is missing.');
        return;
    }

    if (!selectedSiteId.value.trim()) {
        alert('Please select a site.');
        return;
    }

    fetch("/reservation", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            firstName: firstName.value.trim(),
            lastName: lastName.value.trim(),
            email: email.value.trim(),
            phoneNumber: phone.value.trim(),
            agreedToTerms: agreedToTerms.checked,
            startDate: startDate.value.trim(),
            endDate: endDate.value.trim(),
            selectedSiteId: selectedSiteId.value.trim()
        })
    })
    .then(response => {
        if (response.ok) {
            const reservationDetails = {
                firstName: firstName.value.trim(),
                lastName: lastName.value.trim(),
                email: email.value.trim(),
                phoneNumber: phone.value.trim(),
                startDate: startDate.value.trim(),
                endDate: endDate.value.trim(),
                siteId: selectedSiteId.value.trim()
            };
            
            // Construct the alert message with reservation details
            const alertMessage = `  Attention Customers, please save this information for your records. Also, when arriving make sure to give the attendant your last name and email that was made with the reservation.
            \nReservation made successfully!\n
            Details:\n
            First Name: ${reservationDetails.firstName}
            Last Name: ${reservationDetails.lastName}
            Email: ${reservationDetails.email}
            Phone Number: ${reservationDetails.phoneNumber}
            Start Date: ${reservationDetails.startDate}
            End Date: ${reservationDetails.endDate}`;
    
            // Show the alert message
            alert(alertMessage);
    
            // Redirect to the home page
            window.location.href = '/home'; // Change '/home' to the desired home page URL
        } else {
            alert('Something went wrong, please try again.');
        }
        return response.text();
    })
    .then(responseMessage => {
        console.log(responseMessage);
    })
    .catch(err => {
        console.log(`error ${err}`);
    });
}

function isValidEmail(email) {
    // Regex for basic email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

function isValidPhoneNumber(phoneNumber) {
    // Regex for validating US phone number format: 10 digits, no spaces or symbols
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(phoneNumber);
}
