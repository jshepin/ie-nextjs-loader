import Image from "next/image";
import { constructUrl } from "@imageengine/react/build/utils/index.js";

function lightbox_loader({ src, quality, distribution, w, h }) {
    let url = distribution + src,
	directives = {
	    width: w,
	    height: h,
	    fitMethod: "box",
	    compression: 100 - quality
	};
    
    return constructUrl(url, directives);
};

export default function Lighbox({ onClick, src, alt, window_sizes, previous, next }) {

    return (
	<div className="lightbox" onClick={onClick}>
	  <button className="previous" onClick={previous}/>
	  <div className="image-lightbox">
	    {window_sizes ? <Image
				  src={src}
				  alt={alt}
				  sizes={`(max-width: 320px) 300px, (max-width: 500px) 500px, (max-width: 1000) 1000px, (max-width: 1500) 1500px, ${window_sizes.w}px`}
				  objectFit="contain"
				  objectPosition="center"
				  width={window_sizes.w}
				  height={window_sizes.h}
				  loader={process.env.DISTRIBUTION ? (args) => lightbox_loader({...args, ...window_sizes, distribution: process.env.DISTRIBUTION}) : undefined}
		  priority={true}
		  quality={90}
	      />  : null}
	  </div>
	  <button className="next" onClick={next}/>
	</div>
    );
};
