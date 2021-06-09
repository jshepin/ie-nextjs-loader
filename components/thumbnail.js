import Image from "next/image";
import { constructUrl } from "@imageengine/react/build/utils/index.js";

import { useState, useEffect, createRef } from "react";

function thumbnail_loader({ src, quality, width, distribution }) {
    let url = distribution + src,
	directives = {
	    width: width,
	    height: width,
	    fitMethod: "cropbox",
	    compression: 100 - quality,
	    sharpness: 10
	};
    
    return constructUrl(url, directives);
};

export default function Thumbnail({ onClick, src, alt, window_sizes }) {

    let thumbnail_ref = createRef(),
	[width, set_width] = useState(null),
	[initial_size, set_initial_size] = useState(null);

    useEffect(() => {
	if (window_sizes) {
	    
	    let dimensions = thumbnail_ref.current.getBoundingClientRect(),
		n_width = Math.ceil(dimensions.width);

	    
	    if (!initial_size) { set_initial_size(n_width); }

	    if (initial_size >= n_width) { set_width(initial_size); }
	    else {
		
		set_initial_size(n_width);
		set_width(n_width);
		
	    }
	}
    }, [window_sizes]);
    
    return (
	<div className="image-thumbnail" onClick={onClick} ref={thumbnail_ref}>
	  {width ?
	      <Image
		    src={src}
		    alt={alt}
		    sizes={`(max-width: 320px) 300px, (max-width: 500px) 500px, (max-width: 1000) 1000px, (max-width: 1500) 1500px, ${width}px`}
		    layout="responsive"
		    objectFit="cover"
		    objectPosition="center"
		    width={width}
		    height={width}
		    loader={process.env.DISTRIBUTION ? (args) => thumbnail_loader({...args, distribution: process.env.DISTRIBUTION}) : undefined}
		    quality={80}/> : null
		}
		<div className="image-details">
		  <p>{alt}</p>
		</div>
	</div>
    );
};
