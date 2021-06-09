import Head from "next/head";

import Thumbnail from "../components/thumbnail.js";
import Lightbox from "../components/lightbox.js";

import { throttle } from "../js/throttle.js";

import { useEffect, useState } from "react";

const IMAGES = [
    ["/ie-loader-images/h-lightbox-1.jpeg", "Harvested field with hay bales - Alentejo, Portugal © Micael Nussbaumer"],
    ["/ie-loader-images/h-lightbox-2.jpeg", "Family cycling and skating in abandoned Tempelhof Airport lane - Berlin, Germany © Micael Nussbaumer"],
    ["/ie-loader-images/h-lightbox-8.jpeg", "Group of hindu and muslim kids posing for a photo - New Delhi, India © Micael Nussbaumer"],
    ["/ie-loader-images/v-lightbox-4.jpeg", "Buddhist Monk Portrait with a statue of the buddhist mythological Seven Headed Naga  serving as background - Siem Reap, Cambodia © Micael Nussbaumer"],
    ["/ie-loader-images/h-lightbox-5.jpeg", "Traditional Nepalase Hindu Temple in one of the many lively city squares of Kathmandu, Nepal © Micael Nussbaumer"],
    ["/ie-loader-images/v-lightbox-6.jpeg", "Woman in traditional Nepalese clothing sitting in a valley in Pokhara, Nepal © Micael Nussbaumer"],
    ["/ie-loader-images/h-lightbox-7.jpeg", "Geometric pattern on a ceiling inside the Red Fort - New Delhi, India © Micael Nussbaumer"],
    ["/ie-loader-images/h-lightbox-3.jpeg", "Kids silhuetes in the sea near-shore close to sunset - Phu Quoc Island, Vietnam © Micael Nussbaumer"],
    ["/ie-loader-images/h-lightbox-9.jpeg", "Portrait of four man sitting during a pause in their badminton game - Hanoi, Vietnam © Micael Nussbaumer"]
];


export default function Home() {

    let [opened, set_opened] = useState(false);
    let [window_sizes, set_window_sizes] = useState(null);
    let resize_timer;

    const get_window_sizes = () => {
	let doc = document.documentElement;
	return {w: doc.clientWidth, h: doc.clientHeight};
    };

    const previous = (evt) => {
	evt.stopPropagation();
	if (opened > 0) { set_opened(opened - 1); }
	else { set_opened(IMAGES.length - 1); }
    };

    const next = (evt) => {
	evt.stopPropagation();
	if (opened < (IMAGES.length - 1)) { set_opened(opened + 1); }
	else { set_opened(0); }
    };

    const set_timing = () => {
	if (resize_timer) { clearTimeout(resize_timer); }
	resize_timer = setTimeout(
	    () =>  set_window_sizes(get_window_sizes()),
	    2000
	);
    };

    useEffect(() => {
	let {func} = throttle("resize", "optimized_resize", window);
	window.addEventListener("optimized_resize", set_timing);
	set_window_sizes(get_window_sizes());

	return () => {
	    window.removeEventListener("optimized_resize", set_timing);
	    window.removeEventListener("resize", func);
	};
    }, []);
    
    return (
	<div className={`main-container ${opened || opened === 0 ? "no-overflow" : ""}`} >
	  <Head>
            <title>ImageEngine Optimized Lightbox</title>
            <meta name="description" content="Next.js custom image loaders leveraging ImageEngine CDN for highly optimized images" />
            <link rel="icon" href="/favicon.ico" />
	  </Head>
	  <main>
	    {IMAGES.map(([path, alt], index) => {
		return <Thumbnail key={`image-thumb-${index}`} src={path} alt={alt} directives={{}} onClick={(_evt) => set_opened(index)} window_sizes={window_sizes}/> ;
		  })
	      }
	  </main>
	  {opened || opened === 0 ? <Lightbox src={IMAGES[opened][0]} alt={IMAGES[opened][1]} directives={{}} onClick={(_evt) => set_opened(null)} window_sizes={window_sizes} previous={previous} next={next}/> : null}
	    <footer>
	      <a href="https://imageengine.io" target="_blank">ImageEngine</a>
	      <a href="https://micaelnussbaumer.com" target="_blank">© Micael Nussbaumer 2021</a>
	      
	      <a href="https://nextjs.org" target="_blank">Next.js</a>
	      <a href="https://vercel.com" target="_blank">Vercel</a>
	    </footer>
	</div>
    );
};

