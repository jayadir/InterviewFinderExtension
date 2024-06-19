let locationInput
let startDateInput
let endDateInput; 

document.addEventListener('DOMContentLoaded', function () {
    locationInput = document.getElementById('location'); 
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    startDateInput = document.getElementById('start-date');
    endDateInput = document.getElementById('end-date');

    chrome.storage.local.get(['location', 'startDate', 'endDate','locations'], function(result) {
        if (locationInput && startDateInput && endDateInput) { 
            locationInput.value = result.location || ''; 
            startDateInput.value = result.startDate || '';
            endDateInput.value = result.endDate || '';
        }
        result.locations.forEach((loc)=>{
            const option=document.createElement('option')
            option.value=loc.id
            option.text=loc.name
            option.setAttribute('data-timezone',loc.timezone)
            locationInput.appendChild(option)
        })
    });

    startButton.onclick = () => {
        const props = {
            location: locationInput.value,
            startDate: startDateInput.value,
            endDate: endDateInput.value,
            timezone: locationInput.options[locationInput.selectedIndex].getAttribute('data-timezone')
        }
        chrome.runtime.sendMessage({event: 'onStart',props});
    };

    stopButton.onclick = () => {
        
        chrome.runtime.sendMessage({event: 'onStop',});
    };
    locationInput.addEventListener('input', saveInputValues);
    startDateInput.addEventListener('input', saveInputValues);
    endDateInput.addEventListener('input', saveInputValues);
});
function saveInputValues() {
    chrome.storage.local.set({
        location: locationInput.value,
        startDate: startDateInput.value,
        endDate: endDateInput.value
    }, function() {
        console.log('Input values saved.');
    });
}
