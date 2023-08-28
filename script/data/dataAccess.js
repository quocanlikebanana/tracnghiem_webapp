async function getLanhdaoData() {
    const res = await fetch("./resources/lanhdao.json");
    return await res.json();
}

async function getDoiData() {
    const res = await fetch("./resources/doi.json");
    return await res.json();
}