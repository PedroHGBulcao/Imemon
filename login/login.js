document.addEventListener('DOMContentLoaded', () => {
    const loginform = document.querySelector('#login');
    loginform.addEventListener('submit', async e => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = {
            username: formData.get('username'),
            password: formData.get('password')
        };
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            const { token } = await response.json();
            localStorage.setItem('token', token);
            window.location.href = '/home';
        } else {
            const error = await response.json();
            alert(error.message);
        }
    });
    const registerform = document.querySelector('#register');
    registerform.addEventListener('submit', async e => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password')
        };
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            const { token } = await response.json();
            localStorage.setItem('token', token);
            window.location.href = '/home';
        } else {
            const error = await response.json();
            alert(error.message);
        }
    });
});

function checkUser() {
    document.getElementById("profile").innerHTML = "<a href=\"/login/login.html\"> Login </a>"
    $.get('${pageContext.request.contextPath}/myservlet', function (data) {
        if (data == null) {
            document.getElementById("profile").innerHTML = "<a href=\"/login/login.html\"> Login </a>";
        } else {
            document.getElementById("profile").innerHTML = "<a href=\"/Profile/?&user=" + data.username + "\">" + data.username + "</a>";
        }
    });
}