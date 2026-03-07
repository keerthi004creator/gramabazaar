import supabase from './supabaseClient.js'

const loginBtn = document.getElementById("loginBtn")
const errorMsg = document.getElementById("errorMsg")

loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  // Clear previous error
  errorMsg.textContent = ""
  errorMsg.classList.add("hidden")

  if(!email || !password){
    errorMsg.textContent = "Please fill all fields"
    errorMsg.classList.remove("hidden")
    return
  }

  // Supabase Auth login
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  })

  if(error){
    errorMsg.textContent = "Incorrect email or password"
    errorMsg.classList.remove("hidden")
    return
  }

  // Login successful → redirect to store page
  window.location.href = "store.html"
})