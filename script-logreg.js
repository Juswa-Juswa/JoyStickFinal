// READ ME: Some of the functions or event lister doesnt work when putted 
//          on the same event listener therefore they are mostly seperated.

document.addEventListener('DOMContentLoaded', (event) => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('logIn');
    const forgotButton = document.getElementById('forgot');
    const backToLoginButton = document.getElementById('back-to-login');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });

    forgotButton.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('forgot-username').value = '';
        document.getElementById('retrieved-password').style.display = 'none';
        container.classList.add("forgot-password-active");
    });

    backToLoginButton.addEventListener('click', (e) => {
        e.preventDefault();
        container.classList.remove("forgot-password-active");
    });

    // Password visibility toggle for Sign Up
    const signUpPasswordField = document.getElementById('signup-password');
    const signUpTogglePassword = document.getElementById('signup-show');

    signUpTogglePassword.addEventListener('click', function () {
        if (signUpPasswordField.type === "password") {
            signUpPasswordField.type = "text";
            signUpTogglePassword.innerHTML = "<i class='bx bx-hide'></i>";
        } else {
            signUpPasswordField.type = "password";
            signUpTogglePassword.innerHTML = "<i class='bx bx-show'></i>";
        }
    });

    // Password visibility toggle for Sign In
    const signInPasswordField = document.getElementById('signin-password');
    const signInTogglePassword = document.getElementById('signin-show');

    signInTogglePassword.addEventListener('click', function () {
        if (signInPasswordField.type === "password") {
            signInPasswordField.type = "text";
            signInTogglePassword.innerHTML = "<i class='bx bx-hide'></i>";
        } else {
            signInPasswordField.type = "password";
            signInTogglePassword.innerHTML = "<i class='bx bx-show'></i>";
        }
    });
});

// Function to read the contents of the users.txt file
const readUsersFile = () => {
    const file = new XMLHttpRequest();
    file.open("GET", "users.txt", false);
    try {
        file.send(null);
        if (file.status === 200) {
            return file.responseText;
        } else {
            throw new Error("Failed to read file.");
        }
    } catch (error) {
        console.error("Error reading file:", error);
        return null;
    }
};

// Function to write to the users.txt file
const writeUsersFile = (content) => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "users.txt");
};

// Function to parse the contents of users.txt and return an array of usernames and passwords
const parseUsers = (fileContent) => {
    if (!fileContent) return [];
    const lines = fileContent.split("\n");
    const users = [];
    lines.forEach(line => {
        const [username, password] = line.trim().split(":");
        if (username && password) {
            users.push({ username, password });
        }
    });
    return users;
};

// Function to find a user by username and password
const findUser = (users, username, password) => {
    return users.find(user => user.username === username && user.password === password);
};

// Function to add a new user to the users.txt file
const addUser = (username, password) => {
    const usersContent = readUsersFile() || "";
    const users = parseUsers(usersContent);
    users.push({ username, password });
    const newContent = users.map(user => `${user.username}:${user.password}`).join("\n");
    writeUsersFile(newContent);
};

// Handle Sign Up
document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('signup-username').value;
    const confirmUsername = document.getElementById('signup-confirm-username').value;
    const password = document.getElementById('signup-password').value;

    if (username !== confirmUsername) {
        alert('Usernames do not match.');
        return;
    }

    const usersContent = readUsersFile();
    if (usersContent === null) {
        alert('Error reading users file.');
        return;
    }

    const users = parseUsers(usersContent);
    const userExists = users.some(user => user.username === username);

    if (userExists) {
        alert('Username already exists.');
        return;
    }

    addUser(username, password);
    alert('Account created successfully.');
    container.classList.remove("right-panel-active");
});

// Handle Sign In
const attempt = {};

document.getElementById('signin-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('signin-username').value;
    const password = document.getElementById('signin-password').value;

    if (attempt[username] === undefined) {
        attempt[username] = 1;
    } else {
        attempt[username]++;
    }

    if (attempt[username] > 5) {
        alert('You have exceeded the maximum login attempts for this username.');
        document.querySelector('.sign-in-container form button').disabled = true;
        return;
    }

    const usersContent = readUsersFile();
    
    if (usersContent === null) {
        alert('Error reading users file.');
        return;
    }

    const users = parseUsers(usersContent);
    const user = findUser(users, username, password);

    if (user) {
        alert('Login successful! Press Ok to Continue.');
        setTimeout(() => {
            window.location.href = 'JoyStick_Home.html';
            history.pushState(null, null, 'index.html');
        }, 1000);
    } else {
        alert('Invalid username or password');
    }
});

// Handle Forgot Password
document.getElementById('forgot-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('forgot-username').value;


    if (username === '') {
        alert('Please enter your username.');
        return;
    }

    const usersContent = readUsersFile();
    if (usersContent === null) {
        alert('Error reading users file.');
        return;
    }

    const users = parseUsers(usersContent);
    const user = users.find(user => user.username === username);

    if (user) {
        document.getElementById('retrieved-password').style.display = 'block';
        document.getElementById('password-display').textContent = user.password;
    } else {
        alert('Username not found.');
    }
});

//- - - - - - - - - - - - - - - - -> MOUSE TRACKER

const circleElement = document.querySelector('.circle');

const mouse = { x: 0, y: 0 }; 
const previousMouse = { x: 0, y: 0 }
const circle = { x: 0, y: 0 }; 

let currentScale = 0; 
let currentAngle = 0; 

window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

const speed = 0.20;

const tick = () => {
  circle.x += (mouse.x - circle.x) * speed;
  circle.y += (mouse.y - circle.y) * speed;

  const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;

  const deltaMouseX = mouse.x - previousMouse.x;
  const deltaMouseY = mouse.y - previousMouse.y;
  previousMouse.x = mouse.x;
  previousMouse.y = mouse.y;

  const mouseVelocity = Math.min(Math.sqrt(deltaMouseX**2 + deltaMouseY**2) * 4, 150); 
  const scaleValue = (mouseVelocity / 150) * 0.5;
  currentScale += (scaleValue - currentScale) * speed;

  const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;

  const angle = Math.atan2(deltaMouseY, deltaMouseX) * 180 / Math.PI;
  if (mouseVelocity > 20) {
    currentAngle = angle;
  }
  const rotateTransform = `rotate(${currentAngle}deg)`;

  circleElement.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;
  window.requestAnimationFrame(tick);
}

tick();