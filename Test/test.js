function func() {
    fetch("./resources/lanhdao.json")
        .then(res => res.json())
        .then(data => console.log(data));
}