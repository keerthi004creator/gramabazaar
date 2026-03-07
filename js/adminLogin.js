import supabase from './supabaseClient.js'

document.getElementById("loginBtn").onclick = async () => {

const email=document.getElementById("email").value
const password=document.getElementById("password").value

const { data, error } = await supabase.auth.signInWithPassword({
email,
password
})

if(error){
alert("Login failed")
return
}

alert("Login successful")

window.location.href="admin-dashboard.html"

}