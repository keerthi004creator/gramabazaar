import supabase from './supabaseClient.js'

document.getElementById("registerBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  const confirmPassword = document.getElementById("confirmPassword").value

  if(!email || !password || !confirmPassword){
    alert("Please fill all fields")
    return
  }

  if(password !== confirmPassword){
    alert("Passwords do not match")
    return
  }

  // 1️⃣ Create user in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: email,
    password: password
  })

  if(authError){
    alert("Registration error: " + authError.message)
    return
  }

  // 2️⃣ Store user in 'users' table
  const { error: dbError } = await supabase
    .from('users')
    .insert([
      { user_id: authData.user.id, email: email }
    ])

  if(dbError){
    alert("Error storing user info: " + dbError.message)
    return
  }

  alert("Registration successful! Please login.")
  window.location.href = "login.html"
})