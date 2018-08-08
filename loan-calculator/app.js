// Listen for submit
document.querySelector('#loan-form').addEventListener('submit', (e)=>{
    e.preventDefault();
    //Hide results, show loading-gif
    document.querySelector('#results').style.display = 'none';
    document.querySelector('#loading').style.display = 'block';

    setTimeout(calculateResults, 1500)
})


function calculateResults() {
    //show results, hide loading-gif
    document.querySelector('#results').style.display = 'block';
    document.querySelector('#loading').style.display = 'none';

    // UI vars
    const amount = document.querySelector('#amount')
    const interest = document.querySelector('#interest')
    const years = document.querySelector('#years')
    const monthlyPayment = document.querySelector('#monthly-payment')
    const totalPayment = document.querySelector('#total-payment')
    const totalInterest = document.querySelector('#total-interest')

    const principal = parseFloat(amount.value)
    const calculatedInterest = parseFloat(interest.value) / 100 / 12
    const calculatedPayments = parseFloat(years.value) * 12

    //Monthly Payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments)
    const monthly = (principal * x * calculatedInterest) / (x - 1)

    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2)
        totalPayment.value = ((monthly * calculatedPayments).toFixed(2))
        totalInterest.value = ((calculatedPayments * monthly) - principal).toFixed(2)
    } else {
        showError('Please check your numbers')
    }
}

function showError(error) {
    document.querySelector('#results').style.display = 'none';
    document.querySelector('#loading').style.display = 'none';
    const errorDiv = document.createElement('div');
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error))


    card.insertBefore(errorDiv, heading)

    setTimeout(() => {
        document.querySelector('.alert').remove()
    }, 3000)
}

