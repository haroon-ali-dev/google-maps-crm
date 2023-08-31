export async function getCustomers(apiURL, uId, token) {
    const res = await fetch(`${apiURL}/api/customers/user/${uId}`, {
        headers: { "x-auth-token": token }
    });
    const data = await res.json();

    if (data.message === "success") {
        return data.customers;
    } else {
        alert(data.message);
    }
}