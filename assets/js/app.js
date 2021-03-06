// Render the color wheel
var colorPicker = new iro.ColorPicker('#colorPicker', {
	width: 280,
	color: 'rgb(61, 219, 133)',
	borderWidth: 5,
	borderColor: '#fff'
});

// ========== Probe elements ==========
const svg = document.querySelector('#dynamicSVG');
const colorWheel = document.querySelector('#userInput');
const navTitle = document.querySelector('#navTitle');
const hamburg = document.querySelector('.icofont-navigation-menu');
const toTopBtn = document.querySelector('.back-to-top');

const t1ImageCard = document.querySelector('#topwear-1-img-card');
const b1ImageCard = document.querySelector('#bottomwear-1-img-card');
const f1ImageCard = document.querySelector('#footwear-1-img-card');

const t1ImageExp = document.querySelector('#topwear-1-img-expand');
const b1ImageExp = document.querySelector('#bottomwear-1-img-expand');
const f1ImageExp = document.querySelector('#footwear-1-img-expand');

const t1Link = document.querySelector('#topwear-1-link');
const b1Link = document.querySelector('#bottomwear-1-link');
const f1Link = document.querySelector('#footwear-1-link');

// ========== Remove "X" on small screens ==========
var w = window.innerWidth;
var h = window.innerHeight;
if (h > w) {
	// on portrait
	svg.style.display = 'none';
}

// ========== Log user input ==========

// Register change when clicking or touching the color wheel
colorWheel.addEventListener('touchend', registerColor);
colorWheel.addEventListener('mouseup', registerColor);

// Register category
var catIndex; // category index
// 1 = male, 2 = female, 3 = kids

document.querySelector('#category').onchange = function () {
	catIndex = this.selectedIndex;
	registerColor();
};

// Function to log on event
var selectedHEX; // user input
var hue; // hue of user input
var mainColor; // color selected [string]
var colorIndex; // 0 = red, 1 = orange, 2 = yellow, 3 = green, 4 = blue, 5 = purple, 6 = pink

function registerColor(e) {
	var selectedHEX = colorPicker.color.hexString;
	console.log(`HEX: ${selectedHEX}`);

	// Change color of elements on window
	svg.style.fill = selectedHEX;
	navTitle.style.color = selectedHEX;
	hamburg.style.color = selectedHEX;
	toTopBtn.style.background = selectedHEX;
	hue = HEXtoHUE(selectedHEX);
	colorCategory(hue);
	contentReplacer(catIndex, colorIndex);

	console.log(`Category index: ${catIndex}`);
	console.log(`Hue: ${hue}`);
	console.log(mainColor);
	console.log('-       x        -\n-       x        -');
}

// ========== Find complementary ==========
var hue;

function HEXtoHUE(hex) {
	// HEX to RGB
	var rgb =
		'rgb(' +
		(hex = hex.replace('#', ''))
		.match(new RegExp('(.{' + hex.length / 3 + '})', 'g'))
		.map(function (l) {
			return parseInt(hex.length % 2 ? l + l : l, 16);
		})
		.join(',') +
		')';

	// Get array of RGB values
	rgb = rgb.replace(/[^\d,]/g, '').split(',');

	var r = rgb[0];
	var g = rgb[1];
	var b = rgb[2];

	console.log(`RGB: ${r} ${g} ${b}`);

	// RGB to HSB
	r /= 255.0;
	g /= 255.0;
	b /= 255.0;
	var max = Math.max(r, g, b);
	var min = Math.min(r, g, b);
	var h,
		s,
		l = (max + min) / 2.0;

	if (max == min) {
		h = s = 0; //achromatic
	} else {
		var d = max - min;
		s = l > 0.5 ? d / (2.0 - max - min) : d / (max + min);

		if (max == r && g >= b) {
			h = 1.0472 * (g - b) / d;
		} else if (max == r && g < b) {
			h = 1.0472 * (g - b) / d + 6.2832;
		} else if (max == g) {
			h = 1.0472 * (b - r) / d + 2.0944;
		} else if (max == b) {
			h = 1.0472 * (r - g) / d + 4.1888;
		}
	}

	h = h / 6.2832 * 360.0 + 0;
	return h;
}

// ========== Categorize colors ============
function colorCategory(hue) {
	if (hue >= 330 || hue < 10) {
		mainColor = 'red';
		colorIndex = 0;
	} else if (hue >= 10 && hue < 30) {
		mainColor = 'orange';
		colorIndex = 1;
	} else if (hue >= 30 && hue < 70) {
		mainColor = 'yellow';
		colorIndex = 2;
	} else if (hue >= 70 && hue < 170) {
		mainColor = 'green';
		colorIndex = 3;
	} else if (hue >= 170 && hue < 260) {
		mainColor = 'blue';
		colorIndex = 4;
	} else if (hue >= 260 && hue < 295) {
		mainColor = 'purple';
		colorIndex = 5;
	} else {
		mainColor = 'pink';
		colorIndex = 6;
	}
}

var imageDir = 'https://raw.githubusercontent.com/Az-21/trendx/master/assets/img/clothes/';

function contentReplacer(catIndex, colorIndex) {
	if (catIndex != undefined) {
		// wait for user input in category section

		if (catIndex == 1) {
			// 1 = male
			t1Link.href = hrefLink.maleTop[colorIndex];
			b1Link.href = hrefLink.maleBottom[colorIndex];
			f1Link.href = hrefLink.maleFoot[colorIndex];
		} else if (catIndex == 2) {
			// 2 = felmale
			t1Link.href = hrefLink.femaleTop[colorIndex];
			b1Link.href = hrefLink.femaleBottom[colorIndex];
			f1Link.href = hrefLink.femakeFoot[colorIndex];
		} else {
			// catchall (hopefully 3) = kids
			t1Link.href = hrefLink.kidsTop[colorIndex];
			b1Link.href = hrefLink.kidsBottom[colorIndex];
			f1Link.href = hrefLink.kidsFoot[colorIndex];
		}

		// Replace images
		t1ImageCard.src = imageDir + catIndex + '-' + colorIndex + '-top.jpg';
		b1ImageCard.src = imageDir + catIndex + '-' + colorIndex + '-bottom.jpg';
		f1ImageCard.src = imageDir + catIndex + '-' + colorIndex + '-foot.jpg';

		t1ImageExp.href = imageDir + catIndex + '-' + colorIndex + '-top.jpg';
		b1ImageExp.href = imageDir + catIndex + '-' + colorIndex + '-bottom.jpg';
		f1ImageExp.href = imageDir + catIndex + '-' + colorIndex + '-foot.jpg';
	}
}

// ==================  HREF Data  =========================

var hrefLink = {
	maleTop: [
		'https://www.amazon.in/Zombom-Sleeve-Cotton-Casual-Shirt/dp/B078V8L62T/', // 0 = red

		'https://www.myntra.com/shirts/solly-jeans-co/solly-jeans-co-men-orange-regular-fit-printed-casual-shirt/11502300/buy',

		'https://www.myntra.com/shirts/united-colors-of-benetton/united-colors-of-benetton-men-yellow-regular-fit-solid-casual-shirt/9218245/buy',

		'https://www.myntra.com/shirts/calvin-klein-jeans/calvin-klein-jeans-men-green-regular-fit-solid-casual-shirt/9591147/buy',

		'https://www.myntra.com/shirts/allen-solly/allen-solly-men-blue--white-printed-sport-fit-casual-shirt/11518892/buy',

	],

	maleBottom: [
		'https://www.amazon.in/Wrangler-Mens-Relaxed-Jeans-W33927W2201Z036034_Jsw-Black_36W/dp/B07T5F6XXV/',

		'https://www.myntra.com/jeans/us-polo-assn-denim-co/us-polo-assn-denim-co-men-blue-delta-slim-fit-mid-rise-clean-look-stretchable-jeans/11453226/buy',

		'https://www.myntra.com/trousers/allen-solly/allen-solly-men-white-smart-slim-fit-solid-chinos/10820294/buy',

		'https://www.myntra.com/jeans/us-polo-assn-denim-co/us-polo-assn-denim-co-men-blue-skinny-fit-mid-rise-clean-look-stretchable-jeans/8600053/buy',

		'https://www.myntra.com/trousers/peter-england/peter-england-men-brown-slim-fit-solid-chinos/2481552/buy',

	],

	maleFoot: [
		'https://www.amazon.in/Adidas-Visgre-Running-Shoes-8-CJ0034/dp/B07B4LF2RJ/',

		'https://www.myntra.com/casual-shoes/converse/converse-unisex-white-sneakers/8552735/buy',

		'https://www.myntra.com/casual-shoes/hm/hm-men-black-solid-loafers/10458796/buy',

		'https://www.myntra.com/casual-shoes/roadster/roadster-men-grey-solid-sneakers/10616582/buy',

		'https://www.myntra.com/casual-shoes/v8-by-ruosh/v8-by-ruosh-men-brown-leather-loafers/10990656/buy',


	],

	femaleTop: [
		'#'
	],

	femaleBottom: [
		'#'
	],

	femaleFoot: [
		'#'
	],

	kidsTop: [
		'#'
	],

	kidsBottom: [
		'#'
	],

	kidsFoot: [
		'#'
	]
};