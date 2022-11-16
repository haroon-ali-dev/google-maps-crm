const Customers = ({ customers }) => {
  return (
    <div>
      <ul>
        {customers.map((customer, i) => (
          <li key={i} >{customer.name} {customer.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default Customers;