import supabase from './supabaseClient.js'

document.getElementById("logoutBtn").onclick = async () => {

await supabase.auth.signOut()

window.location.href="admin-login.html"

}