async function getRecommended() {
    getAllProducts().then((data) => {
        console.log(data);
    });
}