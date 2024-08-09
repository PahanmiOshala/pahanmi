// Function to get the date 5 days from today
function displayFutureDate(days) {
  const today = new Date();
  today.setDate(today.getDate() + days);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return today.toLocaleDateString(undefined, options);
}

// Function to show the alert with the future date
function showThankYouMessage() {
  const futureDate = displayFutureDate(5);
  alert(`Thank you for your purchase! Your order will be delivered on ${futureDate}`);
}

// Handle form submission
document.getElementById('checkout-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  showThankYouMessage(); // Show the alert with the future delivery date
  
  // Optionally reset the form fields
  this.reset();
  
  // Redirect to index.html after 0.5 seconds
  setTimeout(function() {
      window.location.href = 'index.html';
  }, 500); // 0.5 seconds
});
