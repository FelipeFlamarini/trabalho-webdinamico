async function test() {
    const a = await fetch('http://localhost:3000/api/3?teste=2',
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: "Hello", body: "World" })
        });
    if (a.status == 200) {
        alert("Success!");
    }
    else {
        alert("Error!");
    }
}

async function testGet() {
    const a = await fetch('http://localhost:3000/api/products/3');
    const b = await a.json();
    console.log(b)
}