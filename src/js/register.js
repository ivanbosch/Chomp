let usernameAlreadySelected = false;

function onUsernameSelection() {
    const username = document.getElementById("userName").value;
    this.usernameAlreadySelected = true;
    socket.auth = { username };
    socket.connect();
}