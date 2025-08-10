'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import axios from 'axios';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef(null);
  const imgRefs = useRef([]);
  const textRefs = useRef([]);
  const [blocks, setBlocks] = useState([]);
  const [videoUrl, setVideoUrl] = useState('/hero.mp4'); // default fallback
  console.log(videoUrl ,"videoUrl")

  // Fetch hero section data + latest video
  useEffect(() => {
    // Get hero blocks
    axios.get('http://localhost:5000/api/hero-sections')
      .then((res) => setBlocks(res.data))
      .catch((err) => console.error('Failed to fetch hero sections:', err));

    // Get background video
    axios.get('http://localhost:5000/api/video')
      .then((res) => {
        if (res.data?.url) {
          const fullUrl = res.data.isLocal
            ? `${res.data.url.replace(/\\/g, '/')}`
            : res.data.url;

          setVideoUrl(`${fullUrl}?t=${Date.now()}`); // force refresh
        } else {
          setVideoUrl('/hero.mp4'); // fallback if no video in DB
        }
      })
      .catch(() => {
        setVideoUrl('/hero.mp4'); // fallback if API fails
      });
  }, []);

  // GSAP animation for text & image transitions
  useEffect(() => {
    if (blocks.length === 0) return;

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: isMobile ? `+=${blocks.length * 500}` : `+=${blocks.length * 1000}`,
          scrub: isMobile ? 0.5 : 1,
          pin: true,
          anticipatePin: 1,
          markers: false,
        },
      });

      gsap.set(imgRefs.current.slice(1), { opacity: 0 });
      gsap.set(textRefs.current.slice(1), { y: '100%', opacity: 0 });

      for (let i = 0; i < blocks.length - 1; i++) {
        tl.to(textRefs.current[i], {
          y: '-100%',
          opacity: 0,
          duration: isMobile ? 0.4 : 0.6,
          ease: 'power2.inOut',
        })
          .to(imgRefs.current[i], {
            opacity: 0,
            duration: isMobile ? 0.4 : 0.6,
            ease: 'power2.inOut',
          }, '<')
          .to(textRefs.current[i + 1], {
            y: '0%',
            opacity: 1,
            duration: isMobile ? 0.4 : 0.6,
            ease: 'power2.inOut',
          }, '<0.1')
          .to(imgRefs.current[i + 1], {
            opacity: 1,
            duration: isMobile ? 0.4 : 0.6,
            ease: 'power2.inOut',
          }, '<');
      }
    }, heroRef);

    return () => ctx.revert();
  }, [blocks]);

  return (
    <section
      ref={heroRef}
      className='hero-section w-full h-auto min-h-screen relative overflow-hidden bg-black'
    >
      {/* ✅ Dynamic background video */}
      <video
        key={videoUrl} // ensures re-render when URL changes
        className='absolute top-0 left-0 w-full h-full object-cover'
        autoPlay
        muted
        loop
        playsInline
      >
        
        <source src={videoUrl} type='video/mp4' />
      </video>

      <div className='mx-auto h-full flex flex-col lg:flex-row md:items-center justify-center px-0 mt-[4rem] md:mt-0 items-end relative z-10'>
        {/* Left: Title + Changing Text */}
        <div className='w-full lg:w-6/12 flex flex-col sm:mt-20 items-center lg:items-start justify-center py-8 md:pl-32 pl-8'>
          <h2 className='w-full text-[44px] xs:text-6xl sm:text-7xl lg:text-[50px] xl:text-[80px] 2xl:text-[114px] text-white leading-[1.1] font-medium'>
            We are
          </h2>

          <div className='martech-wrapper w-full relative overflow-hidden h-[72px] xs:h-[84px] sm:h-[102px] md:h-[180px]'>
            {blocks.map((block, idx) => (
              <span
                key={block._id}
                ref={(el) => textRefs.current[idx] = el}
                className='absolute top-0 left-0 w-full font-extrabold bg-gradient-to-r from-[#BE2FF4] to-[#6210FF] text-transparent bg-clip-text text-[50px] xs:text-6xl sm:text-7xl md:text-8xl lg:text-[60px] xl:text-[90px] 2xl:text-[110px] leading-[1.2] inline-block'
                style={{
                  opacity: idx === 0 ? 1 : 0,
                  transform: idx === 0 ? 'translateY(0)' : 'translateY(100%)',
                }}
              >
                {block.title}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Changing Images */}
        <div className='w-full lg:w-6/12 h-auto lg:h-full flex items-center justify-center relative'>
          <div className='w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-full flex justify-center items-center lg:items-end relative'>
            <svg
              width='100%'
              height='100%'
              viewBox='0 0 798 531'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              preserveAspectRatio='xMidYMid meet'
              className='overflow-visible max-w-[600px] lg:max-w-none'
            >
              <defs>
                <clipPath id='image_clip_path'>
                  <path d='M1375.24 0.0751953C1297.95 304.734 1019.35 530.063 687.749 530.063C356.147 530.063 77.2875 304.734 0.261719 0.0751953H283.56C350.664 155.118 506.282 263.906 687.749 263.906C869.217 263.906 1024.83 155.118 1091.94 0.0751953H1375.24Z' />
                </clipPath>
                <linearGradient id='overlay_gradient' x1='0%' y1='0%' x2='100%' y2='100%'>
                  <stop offset='0%' stopColor='#6210FF' stopOpacity='0.2' />
                  <stop offset='100%' stopColor='#BE2FF4' stopOpacity='0.2' />
                </linearGradient>
              </defs>

              <path
                d='M1375.24 0.0751953C1297.95 304.734 1019.35 530.063 687.749 530.063C356.147 530.063 77.2875 304.734 0.261719 0.0751953H283.56C350.664 155.118 506.282 263.906 687.749 263.906C869.217 263.906 1024.83 155.118 1091.94 0.0751953H1375.24Z'
                fill='url(#overlay_gradient)'
              />

              {blocks.map((block, idx) => (
                <image
                  key={block._id}
                  ref={(el) => imgRefs.current[idx] = el}
                  href={block.image}
                  width='120%'
                  height='100%'
                  clipPath='url(#image_clip_path)'
                  preserveAspectRatio='xMidYMid slice'
                  style={{ opacity: idx === 0 ? 1 : 0 }}
                />
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
