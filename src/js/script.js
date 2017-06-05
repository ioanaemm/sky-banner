// JavaScript Document
window.onload = function(){
	console.log("Junior developer test.");

	// declare your variables here.
	var background;
	var logo;
	var frame1_samsung;
	var frame1_ms;
	var frame1_text1;
	var frame1_text2;
	var frame2_bbsale;
	var frame2_bbsale_shadow;
	var frame2_text1;
	var frame2_text2;
	var frame3_cta;
	var frame3_text1;
	var frame3_text2;
	var frame3_text3;
	var frame3_text4;
	var frame3_sheen;

	// store a reference to the canvas which we will draw on.
	var stage = new createjs.Stage("stage");

	// register the stage to handle mouse events.
	stage.enableMouseOver(10);

	// register the Ticker to listen for the tick event.
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", handleTick, false);

	// redraw the canvas - like Event.ENTER_FRAME in Adobe Flash.
	function handleTick(event) {
		stage.update();
	}

	// create a preloader to load the images.
	var loader = new createjs.LoadQueue(false);

	// when all images are loaded call the handleAllImageLoaded function.
	loader.on('complete', handleAllImagesLoaded, this);

	var images = [
		"background",
		"logo",
		"frame1_samsung",
		"frame1_ms",
		"frame1_text1",
		"frame1_text2",
		"frame2_bbsale",
		"frame2_bbsale_shadow",
		"frame2_text1",
		"frame2_text2",
		"frame3_cta",
		"frame3_text1",
		"frame3_text2",
		"frame3_text3",
		"frame3_text4",
		"frame3_sheen"
	];

	var manifest = images.map(function(image){
		return {
			id: image,
			src: "images/" + image + ".png"
		};
	});

	// provide a manifest of files and ids to be loaded.
	loader.loadManifest(manifest);

	function handleAllImagesLoaded() {
		console.log("All the images have loaded.");
		drawTheBannerBackground();
	}

	function drawTheBannerBackground() {
		console.log("draw and animate the background.");

		// provide the loader result for the item with id == 'background'
		// as a bitmap which will be stored in our background variable.
		background = new createjs.Bitmap( loader.getResult( "background" ) );

		// set the background bitmap alpha to zero.
		background.alpha = 0;

		// add background to the display list.
		stage.addChild( background );

		// animate the background bitmap alpha value to 1 over the duration of 1000 milliseconds.
		createjs.Tween.get( background ).to( {alpha:1}, 1000 );

		// after the background is drawn on the canvas draw and animate the content for frame 1.
		setTimeout(frame1, 100);
	}

	function endBanner() {
		var mainTime = Date.now();
		console.log('stop! time: ', mainTime);
		createjs.Tween.removeAllTweens();
	}

	function frame1() {
		console.log("draw and animate frame one.");
		setTimeout(endBanner, 15000);

		// refer to the creative brief, frame 1 for guidance.
		logo = new createjs.Bitmap( loader.getResult( "logo" ) );
		stage.addChild(logo);
		logo.y = 206;
		logo.x = 20;

		frame1_samsung = new createjs.Bitmap(loader.getResult("frame1_samsung"));
		stage.addChild(frame1_samsung);
		frame1_samsung.y = 115;
		frame1_samsung.x = 56;

		frame1_ms = new createjs.Bitmap(loader.getResult("frame1_ms"));
		stage.addChild(frame1_ms);
		frame1_ms.y = 115;
		frame1_ms.x = 163;

		frame1_text1 = new createjs.Bitmap(loader.getResult("frame1_text1"));
		stage.addChild(frame1_text1);
		frame1_text1.y = 20;
		frame1_text1.x = 55;
		frame1_text1.alpha = 0;

		frame1_text2 = new createjs.Bitmap(loader.getResult("frame1_text2"));
		stage.addChild(frame1_text2);
		frame1_text2.y = 42;
		frame1_text2.x = 64;
		frame1_text2.alpha = 0;

		createjs.Tween.get( frame1_text1 ).to( {alpha:1}, 1000 ).call(function() {
				createjs.Tween.get( frame1_text2 ).to( {alpha:1}, 1000 ).call(function() {
						setTimeout(frame2, 2000);
					});
			});
	}

	function frame2() {
		console.log("draw and animate frame two.");
		// refer to the creative brief, frame 2 for guidance.
		frame2_bbsale = new createjs.Bitmap( loader.getResult( "frame2_bbsale" ) );
		stage.addChild(frame2_bbsale);
		frame2_bbsale.y = -250;
		frame2_bbsale.x = 65;

		frame2_bbsale_shadow = new createjs.Bitmap( loader.getResult( "frame2_bbsale_shadow" ) );
		stage.addChild(frame2_bbsale_shadow);
		frame2_bbsale_shadow.y = 200;
		frame2_bbsale_shadow.x = 63 + 174/2;
		frame2_bbsale_shadow.regX = 174/2;
		frame2_bbsale_shadow.regY = 0;
		frame2_bbsale_shadow.scaleX = 0;
		frame2_bbsale_shadow.scaleY = 0;

		frame2_text1 = new createjs.Bitmap( loader.getResult( "frame2_text1" ) );
		stage.addChild(frame2_text1);
		frame2_text1.y = 25;
		frame2_text1.x = 42;
		frame2_text1.alpha = 0;

		frame2_text2 = new createjs.Bitmap( loader.getResult( "frame2_text2" ) );
		stage.addChild(frame2_text2);
		frame2_text2.y = 217;
		frame2_text2.x = 125;
		frame2_text2.alpha = 0;

		createjs.Tween.get(frame1_text1).to( {alpha:0}, 1000);
		createjs.Tween.get(frame1_text2).to( {alpha:0}, 1000);
		createjs.Tween.get(frame1_ms).to( {alpha:0}, 1000);
		createjs.Tween.get(frame1_samsung).to( {alpha:0}, 1000).call(function(){
			createjs.Tween.get(frame2_text1).to({alpha:1}, 1000).call(function(){
				createjs.Tween.get(frame2_text2).to( {alpha:1}, 1000);
				createjs.Tween.get(frame2_bbsale_shadow).to( {scaleX: 1, scaleY: 1}, 1000, createjs.Ease.bounceOut);
				createjs.Tween.get(frame2_bbsale).to( {y: 65}, 1000, createjs.Ease.bounceOut).call(function() {
					setTimeout(frame3, 2000);
				});
			});
		});

		// after a timeout and the animations have completed, draw frame 3.

	}

	function frame3() {
		console.log("draw and animate frame three.");
		// refer to the creative brief, frame 3 for guidance.

		frame3_cta = new createjs.Bitmap(loader.getResult("frame3_cta"));
		stage.addChild(frame3_cta);
		frame3_cta.y = 200;
		frame3_cta.x = 145;
		frame3_cta.alpha = 0;

		frame3_text1 = new createjs.Bitmap(loader.getResult("frame3_text1"));
		stage.addChild(frame3_text1);
		frame3_text1.y = 30;
		frame3_text1.x = 10;
		frame3_text1.alpha = 0;

		frame3_text2 = new createjs.Bitmap(loader.getResult("frame3_text2"));
		stage.addChild(frame3_text2);
		frame3_text2.y = 85;
		frame3_text2.x = 40;
		frame3_text2.alpha = 0;

		frame3_text3 = new createjs.Bitmap(loader.getResult("frame3_text3"));
		stage.addChild(frame3_text3);
		frame3_text3.y = 137;
		frame3_text3.x = 74;
		frame3_text3.alpha = 0;

		frame3_text4 = new createjs.Bitmap(loader.getResult("frame3_text4"));
		stage.addChild(frame3_text4);
		frame3_text4.y = 180;
		frame3_text4.x = 84;
		frame3_text4.alpha = 0;

		frame3_sheen = new createjs.Bitmap(loader.getResult("frame3_sheen"));
		stage.addChild(frame3_sheen);
		frame3_sheen.y = 200;
		frame3_sheen.x = 120;
		frame3_sheen.alpha = 0;

		createjs.Tween.get(frame2_text1).to({alpha:0}, 1000);
		createjs.Tween.get(frame2_bbsale).to({alpha:0}, 1000);
		createjs.Tween.get(frame2_bbsale_shadow).to({alpha:0}, 1000);

		createjs.Tween.get(frame2_text2).to({alpha:0}, 1000).call(function(){
			frame3_cta.alpha = 1;
			createjs.Tween.get(frame3_text1).to({alpha:1}, 1000).call(function(){
				createjs.Tween.get(frame3_text2).to({alpha: 1}, 1000).call(function(){
					createjs.Tween.get(frame3_text3).to({alpha: 1}, 1000).call(function(){
						createjs.Tween.get(frame3_text4).to({alpha: 1}, 1000).call(function(){
							createjs.Tween.get(frame3_sheen).to({alpha: 1}, 350).call(function() {
								createjs.Tween.get(frame3_sheen).to({alpha: 0}, 350);
							});
							createjs.Tween.get(frame3_sheen).to({x: 280}, 690).call(function(){
								var endTime = Date.now();
								console.log('animation finished! time: ', endTime);
							});
						});
					});
				});
			});
		});
	}
};
