"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactPage(){

const router = useRouter();

const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [message,setMessage]=useState("");

useEffect(() => {
emailjs.init("WleqQwRY0NYJD1m-Q");
}, []);

const handleSend = async () => {

if(!name || !email || !message){
alert("Please fill all fields");
return;
}

const templateParams = {
name: name,
email: email,
message: message
};

try {

  await emailjs.send(
"service_q8x7abc",
"template_k92jfd",
templateParams
);

  alert("Message Sent Successfully ✅");

} catch (error) {

  console.error("EmailJS Error:", error);
  alert("Failed to send message");

}

};

return(

<div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-green-100">

{/* Header */}

<div className="text-center py-20 px-6">

<motion.h1
initial={{opacity:0,y:-50}}
animate={{opacity:1,y:0}}
transition={{duration:0.8}}
className="text-6xl font-bold text-green-700 mb-6"
>

Contact Us

</motion.h1>

<p className="text-gray-600 text-lg">

We would love to hear from you

</p>

</div>

{/* Contact Info */}

<div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 px-6 pb-16">

<motion.div
whileHover={{scale:1.05}}
className="bg-white/80 backdrop-blur-lg p-10 rounded-2xl shadow-xl"
>

<h3 className="text-2xl font-bold text-green-700 mb-4">

📞 Phone

</h3>

<p className="text-gray-600 text-lg">

+91 90000 00000

</p>

</motion.div>

<motion.div
whileHover={{scale:1.05}}
className="bg-white/80 backdrop-blur-lg p-10 rounded-2xl shadow-xl"
>

<h3 className="text-2xl font-bold text-green-700 mb-4">

📧 Email

</h3>

<p className="text-gray-600 text-lg">

support@gramabazaar.com

</p>

</motion.div>

</div>

{/* Message Form */}

<div className="max-w-4xl mx-auto px-6 pb-20">

<div className="bg-white p-10 rounded-2xl shadow-xl">

<h2 className="text-3xl font-bold text-green-700 mb-6 text-center">

Send us a Message

</h2>

<div className="grid gap-6">

<input
type="text"
placeholder="Your Name"
value={name}
onChange={(e)=>setName(e.target.value)}
className="border p-3 rounded-lg"
/>

<input
type="email"
placeholder="Your Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="border p-3 rounded-lg"
/>

<textarea
placeholder="Your Message"
rows="4"
value={message}
onChange={(e)=>setMessage(e.target.value)}
className="border p-3 rounded-lg"
/>

<button
onClick={handleSend}
className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg"
>

Send Message

</button>

</div>

</div>

</div>

{/* Back Button */}

<div className="flex justify-center pb-16">

<button
onClick={()=>router.push("/")}
className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full shadow-lg hover:scale-105 transition"
>

Back to Home

</button>

</div>

</div>

);

}