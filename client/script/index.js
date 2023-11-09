async function test() {
    const a = await fetch('http://localhost:3000/api/3',
        {
            method: 'PUT',
            body: JSON.stringify({ title: "Hello", body: "World" })
        });
    if (a.status == 200) {
        alert("Success!");
    }
    else {
        alert("Error!");
    }
    console.log(a)
}

async function testGet() {
    const a = await fetch('http://localhost:3000/api/products/3?universo=Marvel&precoOrdem=ASC&precoLimite=100');
    const b = await a.json();
    console.log(b)
}