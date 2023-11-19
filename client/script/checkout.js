function teste() {
    localStorage.setItem(
        "productID",
        JSON.stringify([
            {
                id: 1,
                quantity: 1,
            },
            {
                id: 2,
                quantity: 1,
            },
        ])
    );
}

function getIdsLocalStorage() {
    teste();
    return JSON.parse(localStorage.getItem("productID"));
}

async function checkout() {
    const ids = await getIdsLocalStorage();

    const reqOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(ids),
    };
    await fetch("http://localhost:3000/api/cart/checkout", reqOptions).then(
        (res) => {
            console.log(res);
            if (res.status === 200) {
                window.location.assign(
                    "http://localhost:5500/client/sucesso.html"
                );
            } else {
                window.location.assign(
                    "http://localhost:5500/client/erro.html"
                );
            }
        }
    );
}
