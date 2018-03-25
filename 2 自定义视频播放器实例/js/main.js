(function($) {

	var video = $("#myVideo");
	var timeFormat = function(seconds) {
		var minite = Math.floor(seconds / 60);
		if(minite < 10) {
			minite = "0" + minite;
		}
		var second = Math.floor(seconds % 60);
		if(second < 10) {
			second = "0" + second;
		}
		return minite + ":" + second;
	}
	var showTitleAndControl = function(shouldShow) {
		if(shouldShow) {
			$(".control").stop().animate({'bottom':0}, 500);
			$(".caption").stop().animate({'top':0}, 500);
		} else {
			$(".control").stop().animate({'bottom':-50}, 500);
			$(".caption").stop().animate({'top':-50}, 500);
		}
	}

	var playAndPause = function() {
		if(video[0].paused || video[0].ended) {
			video[0].play();
			$("#playBtn").removeClass("play").addClass("pause");
		} else {
			video[0].pause();
			$("#playBtn").removeClass("pause").addClass("play");
		}
	}

	var stopVideo = function() {
		video[0].pause();
		updateProgress($(".progress").offset().left);
		$("#playBtn").removeClass("pause").addClass("play");
	}

	var playSpeed = function(speed) {
		if(speed == 1) {
			$("#speed1Btn").addClass("selected");
			$("#speed3Btn").removeClass("selected");
		} else if(speed == 3) {
			$("#speed1Btn").removeClass("selected");
			$("#speed3Btn").addClass("selected");
		}
		video[0].playbackRate = speed;
	}

	var soundAndMute = function() {
		if(video[0].muted) {
			video[0].muted = false;
			$("#soundBtn").removeClass("mute").addClass("sound");
			$(".volumnBar").css('width', video[0].volumn * 100 + '%');
		} else {
			video[0].muted = true;
			$("#soundBtn").removeClass("sound").addClass("mute");
			$(".volumnBar").css('width', 0);
		}
	}

	var enableProgressDrag = function() {
		var progressDrag = false;
		$(".progress").on('mousedown', function(e) {
			progressDrag = true;
			updateProgress(e.pageX);
		});
		$(document).on('mouseup', function(e) {
			if(progressDrag) {
				progressDrag = false;
				updateProgress(e.pageX);
			}			
		});
		$(document).on('mousemove', function(e) {
			if(progressDrag) {
				updateProgress(e.pageX);
			}
		});
	}

	var updateProgress = function(x) {
		var progress = $(".progress");
		var percent = 100 * (x - progress.offset().left) / progress.width();
		if(percent > 100) {
			percent = 100;
		}
		if(percent < 0) {
			percent = 0;
		}
		$(".timeBar").css('width', percent + '%');
		video[0].currentTime = video[0].duration * percent / 100;
	}

	var enableSoundDrag = function() {
		var SoundDrag = false;
		$(".volumn").on('mousedown', function(e) {
			SoundDrag = true;
			updateSound(e.pageX);
			video[0].muted = false;
			$("#soundBtn").removeClass("mute").addClass("sound");
		});
		$(document).on('mouseup', function(e) {
			if(SoundDrag) {
				SoundDrag = false;
				updateSound(e.pageX);
			}			
		});
		$(document).on('mousemove', function(e) {
			if(SoundDrag) {
				updateSound(e.pageX);
			}
		});
	}

	var updateSound = function(x, vol) {
		var volumn = $(".volumn");
		var percent;
		if(vol) {
			percent = vol * 100;
		} else {
			percent = 100 * (x - volumn.offset().left) / volumn.width();
			if(percent > 100) {
				percent = 100;
			}
			if(percent < 0) {
				percent = 0;
			}
		}
		$(".volumnBar").css('width', percent + '%');
		video[0].volumn = percent / 100;
	}

	//获取元数据，初始化视频数据
	video.on("loadedmetadata", function() {
		video.width($(".vContainer").width());
		video.height($(".vContainer").height());
		showTitleAndControl(false);
		$("#currentTime").html(timeFormat(0));
		$("#duration").html(timeFormat(video[0].duration));
		$(".vContainer").hover(function() {
			showTitleAndControl(true);
		}, function() {
			showTitleAndControl(false);
		});
		$("#playBtn").on("click", playAndPause);
		$("#stopBtn").on("click", stopVideo);
		$("#speed1Btn").on("click", function() {
			playSpeed(1);
		});
		$("#speed3Btn").on("click", function() {
			playSpeed(3);
		});
		$("#soundBtn").on("click", soundAndMute);

		enableProgressDrag();
		enableSoundDrag();
		updateSound(0, 0.7);
	});

	var loadingTimer = null;
	video.on("timeupdate", function() {
		var currentTime = video[0].currentTime;
		var duration = video[0].duration;
		var percent = 100 * currentTime / duration;
		$(".timeBar").css("width", percent + "%");
		$("#currentTime").html(timeFormat(currentTime));

		$(".loading").fadeOut(100);
		clearTimeout(loadingTimer);
		loadingTimer = setTimeout(function() {
			if(!video[0].paused && !video[0].ended) {
				$(".loading").fadeIn(100);
			}
		}, 500)
	});

	video.on('ended', function(){
		updateProgress($('.progress').offset().left);
		$("#playBtn").removeClass("pause").addClass("play");
	});

	video.on("canplay", function() {
		$(".loading").fadeOut(100);
	});

})(jQuery);