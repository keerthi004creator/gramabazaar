import supabase from './supabaseClient.js'

document.addEventListener("DOMContentLoaded", () => {
  const shopBtn = document.getElementById("shopNow")

  if (!shopBtn) return

  shopBtn.addEventListener("click", async () => {

    // Get current session
    const { data: { session } } = await supabase.auth.getSession()

    if (session) {
      // User is logged in → go to shopping page
      window.location.href = "store.html"  // replace with your shopping page
    } else {
      // User not logged in → redirect to login page
      window.location.href = "login.html?redirect=store.html"
    }

  })
})