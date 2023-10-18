document.addEventListener('DOMContentLoaded', function() {
    
    function formDataToObject(formData) {
        let obj = {};
        for (let [key, value] of formData.entries()) {
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

    const form = document.querySelector('.pain-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const formDataObject = formDataToObject(formData);

        fetch('https://prod-08.australiasoutheast.logic.azure.com:443/workflows/52dcee3b0f4748f99c52d15b6bd6e38b/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ER-oVVkM_47WIelinwDFbzllOWgz-ZPEO3yJhjJVW9U', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObject)
        })
        .then(response => {
            if (response.ok) {
                return response.json().catch(error => {
                    return null; // If error occurs during parsing JSON, just return null and continue
                });
            } else {
                throw new Error('Server returned a non-200 status');
            }
        })
        .then(data => {
            alert('Thanks for submitting a form. We will contact you shortly.');
            form.reset(); // Clear the form after successful submission
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('There was an error submitting the form.');
        });
    });
});
