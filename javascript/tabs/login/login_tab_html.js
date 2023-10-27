export const LOGIN_TAB_HTML = /*html*/`
<h2>Login</h2>
<p>This is the content for Tab 1.</p>
<form id="loginForm">
<div>
<label for="email">Email:</label>
<input type="email" id="email" name="email" required>
</div>
<div>
<label for="password">Password:</label>
<input type="password" id="password" name="password" required>
</div>
<br>
<div>
<button type="submit" id="submitButton">Login</button>
</div>
</form>
<br>
<button id="logOut">Log out</button>
<br>
<p>Don't have an account?</p>
<a href="signup.html">Sign Up</a>`