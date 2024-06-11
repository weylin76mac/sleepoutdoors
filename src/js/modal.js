



function createModal() {
    const modal = document.createElement("div");
    modal.id = "regisModal";
    modal.className = "modal";
    modal.innerHTML = `
    <div class="modalContent">
        <span class="close" title="Close">X</span>
        <h2>Register and Win!</h2>
        <p class="modalP">Sign up today and get a chance to win a special giveaway!</p>
        <button id="registerBtn" title="Register">Register Now</button>
    </div>`;
    document.querySelector('#banner-container').appendChild(modal)
}

// Check localStorage for value visited, if first time display msg, if not display none
function firstTime() {
    const modal = document.querySelector('#regisModal')
    if (!localStorage.getItem('visited')) {
        modal.style.display = 'block'
        localStorage.setItem('visited', true)
    }
    else {
        modal.style.display = 'none'
    }
}

// Add events for the button and the closing X
function addEvent() {
    const modal = document.querySelector('#regisModal')
    const span = document.querySelector('.close')
    const btn = document.querySelector("#registerBtn");

    // Close button
    span.addEventListener('click', () => {
        modal.style.display = 'none'
    })
    // Button
    btn.addEventListener('click', () => {
        alert('Thank you for registering! Look out for an email with the details.')
        modal.style.display = 'none'
    })
}

// Load modal template once page is loaded call the functions
document.addEventListener('DOMContentLoaded', () => {    
    createModal()
    firstTime()
    addEvent()
})