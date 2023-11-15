function isGitHubActionsPage() {
    return window.location.pathname.match(/\/[^/]+\/[^/]+\/actions/);
}

if (isGitHubActionsPage()) {

function parseDateTime(dateTimeStr) {
    // Remove parentheses and split the string
    const parts = dateTimeStr.replace(/[()]/g, '').split(',');

    // Combine the date and time parts and replace the GMT part
    const formattedStr = `${parts[0]},${parts[1].trim()} ${parts[2].split(' ')[1]}`;
    
    // Parse the date
    return new Date(formattedStr);
}

function formatDateTime(date) {
    // Format the date and time; you can adjust the format as needed
    return date.toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
    });
}

function displayLocalTime(dateTimeStr) {
    const date = parseDateTime(dateTimeStr);
    return formatDateTime(date);
}


function updateRunTimeDisplay() {
    const timeElements = document.querySelectorAll('relative-time');

    console.log('Found time elements:', timeElements.length); // Debugging line

    timeElements.forEach(el => {
        const fullTime = el.getAttribute('title');
        const localTime = displayLocalTime(fullTime);
        if (fullTime && !el.classList.contains('full-time-updated')) {
            const newElement = document.createElement('div');
            newElement.textContent = `${localTime}`;
            // newElement.style.cssText = 'position: absolute; top: 0; left: 0;';
            el.parentElement.style='position: relative'
            el.style="display: none; visibility: hidden;"

              // Remove or hide the SVG element
              const svgElement = el.parentElement.querySelector('svg.octicon-calendar');
              if (svgElement) {
                  svgElement.style.display = 'none'; // Hide the SVG element
              }

            // Insert the new element into the DOM
            el.parentElement.insertBefore(newElement, el.nextSibling);
            el.classList.add('full-time-updated');
        }
    });
}
function checkForChanges() {
    const targetNode = document.querySelector('.PageLayout-content-centered-xl');
    if (targetNode && !targetNode.classList.contains('full-time-updated')) {
        updateRunTimeDisplay();
        targetNode.classList.add('full-time-updated');
    }
}

// Initial call to update the display
updateRunTimeDisplay();

// Set up a polling mechanism to check for changes every 2 seconds
setInterval(checkForChanges, 2000);
}