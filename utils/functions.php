<?php
	function scanForMedia() {
		$dRoot = $_SERVER['DOCUMENT_ROOT'];
		$x = 1;
		$json = '{"list":[';
		
		while(is_dir("../photos/album" . $x)) {
			$json .= '{"album":"album' . $x . '","files":[';
			if($dir = opendir("../photos/album" . $x)) {
				while(false !== ($file = readdir($dir))) {
					if($file != "." && $file != "..") {
						$json .= ('"' . $file . '",');
					}
				}
				$json = substr($json,0,-1);
			}
			$json .= ']},';
			$x++;
		}
		$json = substr($json,0,-1);
		
		$json .= ']}';
		clearstatcache();
		return $json;
	}
	
	function parseAlbumInfo($a) {
		return "thanks";
	}
	
	if($_GET['incomingQuery']) {
		if($_GET['incomingQuery'] == 'getAllFiles') {
			echo scanForMedia();
		} else if($_GET['incomingQuery'] == 'getInfoFor') {
			echo parseAlbumInfo($_GET['album']);
		}
	}
?>