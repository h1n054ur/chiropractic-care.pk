document.addEventListener('DOMContentLoaded', function() {
    
    // Convert FormData to a plain JavaScript object
    function formDataToObject(formData) {
        let obj = {};
        for (let [key, value] of formData.entries()) {
            // If the key already exists, convert the value to an array.
            if (obj[key]) {
                if (!Array.isArray(obj[key])) {
                    obj[key] = [obj[key]];
                }
                obj[key].push(value);
            } else {
                obj[key] = value;
            }
        }
        return obj;
    }

    // Grabbing the form element
    const form = document.querySelector('.pain-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Preventing the default form submission

        // Grabbing all the form data and converting to an object
        const formData = new FormData(form);
        const formDataObject = formDataToObject(formData);

        // Sending the data via Fetch API
        fetch('https://prod-08.australiasoutheast.logic.azure.com:443/workflows/52dcee3b0f4748f99c52d15b6bd6e38b/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ER-oVVkM_47WIelinwDFbzllOWgz-ZPEO3yJhjJVW9U', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObject)
        })
        .then(response => response.json()) // Assuming server responds with json
        .then(data => {
            console.log(data);
            alert('Form successfully submitted!');
            form.reset(); // Clearing the form
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('There was an error submitting the form.');
        });
    });
});