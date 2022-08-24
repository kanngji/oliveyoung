var mapContainer = document.getElementById("map"), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(37.538846, 126.950453), // 지도의 중심좌표
    level: 3, // 지도의 확대 레벨
    mapTypeId: kakao.maps.MapTypeId.ROADMAP, // 지도종류
  };

// 지도를 생성한다
var map = new kakao.maps.Map(mapContainer, mapOption);

// 마커 클러스터러를 생성합니다
var clusterer = new kakao.maps.MarkerClusterer({
  map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
  averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
  minLevel: 10, // 클러스터 할 최소 지도 레벨
});

var data = [
  [37.538846, 126.950453, '<div style="padding:5px;"> 정강이조 본거지 </div>'],
  [37.559182, 126.92759, '<div style="padding:5px;"> 내용 1 </div>'],
  [37.55321, 126.972613, '<div style="padding:5px;"> 내용 2 </div>'],
  [37.37558907, 126.978305, '<div style="padding:5px;"> 내용 3 </div>'],
];

var markers = [];

for (var i = 0; i < data.length; i++) {
  // 지도에 마커를 생성하고 표시한다.
  var marker = new kakao.maps.Marker({
    position: new kakao.maps.LatLng(data[i][0], data[i][1]),
    map: map,
  });

  // 마커가 표시될 위치입니다
  var markerPosition = new kakao.maps.LatLng(data[i][0], data[i][1]);

  // 마커를 생성합니다
  //   var marker = new kakao.maps.Marker({
  //     position: markerPosition,
  //   });

  // 마커가 지도 위에 표시되도록 설정합니다
  marker.setMap(map);

  var iwContent = data[i][2], // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    iwPosition = new kakao.maps.LatLng(data[i][0], data[i][1]); //인포윈도우 표시 위치입니다

  // 인포윈도우를 생성합니다
  var infowindow = new kakao.maps.InfoWindow({
    position: iwPosition,
    content: data[i][2],
  });

  // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
  infowindow.open(map, marker);
  markers.push(marker);
}

// 클러스터러에 마커들을 추가합니다
clusterer.addMarkers(markers);

// 지도 타입 변경 컨트롤을 생성한다
var mapTypeControl = new kakao.maps.MapTypeControl();

// 지도의 상단 우측에 지도 타입 변경 컨트롤을 추가한다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 지도에 확대 축소 컨트롤을 생성한다
var zoomControl = new kakao.maps.ZoomControl();

// 지도의 우측에 확대 축소 컨트롤을 추가한다
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

// =================== MARKER =====================================
