    const apiUrl = '/api'; // API base URL
    let currentCustomerId = null;

    $(document).ready(function () {
      fetchCustomers();

      // Open form for adding a new customer
      $('#openFormBtn').click(function () {
        resetForm();
        $('#formContainer').show();
      });

      // Add customer
      $('#addBtn').click(function () {
        addCustomer();
      });

      // Update customer
      $('#updateBtn').click(function () {
        updateCustomer();
      });
    });

    async function fetchCustomers() {
        
      const response = await fetch(`${apiUrl}/customers`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const customers = await response.json();
      const customerList = $('#customerList');
      customerList.empty();
      customers.forEach(customer => {
        const row = `
        <tr>
          <td>${customer.name}</td>
          <td>${customer.email}</td>
          <td>${customer.address}</td>
          <td>${customer.phone}</td>
          <td>
            <button class="btn btn-warning btn-update" onclick="editCustomer('${customer._id}')">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-danger" onclick="deleteCustomer('${customer._id}')">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>`;
        customerList.append(row);
      });
    }

    async function addCustomer() {
      const name = $('#name').val();
      const email = $('#email').val();
      const address = $('#address').val();
      const phone = $('#phone').val();
      const response = await fetch(`${apiUrl}/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ name, email, address, phone })
      });
      if (response.ok) {
        fetchCustomers();
        resetForm();
      } else {
        alert('Failed to create customer.');
      }
    }

    async function deleteCustomer(customerId) {
      const response = await fetch(`${apiUrl}/customers/${customerId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        fetchCustomers();
      } else {
        alert('Failed to delete customer.');
      }
    }

    async function editCustomer(customerId) {
      const response = await fetch(`${apiUrl}/customers/${customerId}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const customer = await response.json();
      $('#name').val(customer.name);
      $('#email').val(customer.email);
      $('#address').val(customer.address);
      $('#phone').val(customer.phone);
      currentCustomerId = customerId;
      $('#formTitle').text('Edit Customer');
      $('#formContainer').show();
      $('#addBtn').hide();
      $('#updateBtn').show();
    }

    async function updateCustomer() {
      const name = $('#name').val();
      const email = $('#email').val();
      const address = $('#address').val();
      const phone = $('#phone').val();
      const response = await fetch(`${apiUrl}/customers/${currentCustomerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ name, email, address, phone })
      });
      if (response.ok) {
        fetchCustomers();
        resetForm();
      } else {
        alert('Failed to update customer.');
      }
    }

    function resetForm() {
      $('#name').val('');
      $('#email').val('');
      $('#address').val('');
      $('#phone').val('');
      currentCustomerId = null;
      $('#formContainer').hide();
      $('#addBtn').show();
      $('#updateBtn').hide();
      $('#formTitle').text('Add Customer');
    }