document.getElementById('paymentForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const userId = document.getElementById('userId').value;
    const planId = document.getElementById('planId').value;
    const transactionUuid = document.getElementById('transactionUuid').value;
  
    try {
      const response = await fetch('/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, planId, transactionUuid }),
      });
  
      const result = await response.json();
  
      if (result.success) {
        const paymentDetailsElement = document.getElementById('paymentDetails');
        paymentDetailsElement.textContent = JSON.stringify(result, null, 2);
  
        document.getElementById('paymentResult').classList.remove('hidden');
      } else {
        alert('Payment initiation failed: ' + result.message);
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('An error occurred. Please try again.');
    }
  });
  