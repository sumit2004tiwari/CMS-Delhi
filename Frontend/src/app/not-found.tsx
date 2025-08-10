"use client";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#5F00F6] to-[#B933FF] text-white px-4 py-12 relative overflow-hidden">
      <div className="z-10 flex flex-col items-center">
        <h1 className="text-[120px] sm:text-[180px] font-extrabold bg-gradient-to-r from-white to-[#EEF0FF] text-transparent bg-clip-text drop-shadow-lg">404</h1>
        <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-center" style={{ fontFamily: "'Outfit', sans-serif" }}>
          Oops! Page Not Found
        </h2>
        <div className="text-center mb-10">
        <p className="text-center text-[15px] md:text-[20px] md:max-w-[1176px] outfit-light leading-[149%] tracking-[0.08em] mx-auto mt-6 text-white">
          The page you're looking for doesn't exist or has been moved.</p>
        
        <p className="text-center text-[15px] md:text-[20px] md:max-w-[1176px] outfit-light leading-[149%] tracking-[0.08em] mx-auto mt-6 text-white">
          But don't worry, your journey in the future of marketing continues!
        </p>
        </div>

        <Link href="/" className="inline-block px-6 py-2 rounded-full bg-white text-[#6210FF] font-bold text-lg shadow-lg hover:bg-[#EEF0FF] transition-all duration-200" >
          Go Home
        </Link>
      </div>
    </section>
  );
} 