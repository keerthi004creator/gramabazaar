"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function AboutPage() {

const router = useRouter();

return (

<div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 overflow-hidden">

{/* Hero */}

<div className="max-w-6xl mx-auto px-6 py-20">

<motion.h1
initial={{opacity:0,y:-60}}
animate={{opacity:1,y:0}}
transition={{duration:0.8}}
className="text-6xl font-bold text-center text-green-700 mb-6"
>

About GramaBazaar

</motion.h1>

<motion.p
initial={{opacity:0}}
animate={{opacity:1}}
transition={{delay:0.4}}
className="text-center text-gray-600 text-lg max-w-3xl mx-auto"
>

GramaBazaar connects local farmers and producers directly with customers.
Our goal is to deliver fresh, natural, and affordable products
while supporting rural communities.

</motion.p>

</div>

{/* Cards */}

<div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-6 pb-20">

{[
{
title:"Farm Fresh Quality",
text:"All our products come directly from trusted farmers ensuring freshness and quality."
},
{
title:"Support Local Farmers",
text:"Every purchase supports rural farmers and small businesses across villages."
},
{
title:"Healthy Lifestyle",
text:"We provide natural fruits, vegetables, dairy and grains to keep families healthy."
}
].map((item,i)=>(

<motion.div
key={i}
initial={{opacity:0,y:80}}
animate={{opacity:1,y:0}}
transition={{delay:i*0.3}}
whileHover={{scale:1.05}}
className="bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-green-100"
>

<h3 className="text-2xl font-semibold text-green-700 mb-4">
{item.title}
</h3>

<p className="text-gray-600 leading-relaxed">
{item.text}
</p>

</motion.div>

))}

</div>

{/* Mission Section */}

<div className="bg-green-600 text-white py-20 px-6 text-center">

<motion.h2
initial={{opacity:0}}
animate={{opacity:1}}
transition={{delay:0.2}}
className="text-4xl font-bold mb-6"
>

Our Mission

</motion.h2>

<motion.p
initial={{opacity:0}}
animate={{opacity:1}}
transition={{delay:0.4}}
className="max-w-3xl mx-auto text-lg"
>

Our mission is to build a bridge between rural producers and modern
customers. We believe technology can empower villages while providing
customers with healthy and sustainable products.

</motion.p>

</div>

{/* Back Button */}

<div className="flex justify-center py-16">

<button
onClick={()=>router.push("/")}
className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg shadow-lg hover:scale-105 transition"
>

Back to Home

</button>

</div>

</div>

);

}