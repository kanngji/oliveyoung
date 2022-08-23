$(function () {
  $(".slide").slick({
    slide: "div", //슬라이드 되어야 할 태그
    infinite: true, //무한 반복 옵션
    speed: 100, // 다음 버튼 누르고 다음 화면 뜨는데까지 걸리는 시간
    arrows: true, // 옆으로 이동하는 화살표 표시 여부
    // dots: true, //스크롤바 아래 점으로 페이지네이션 여부
    autoplay: true, //자동 스크롤 사용 여부
    autoplaySpeed: 10000, //자동 스크롤시 다음으로 넘어가는데 걸리는 시간
    prevArrow: "<button type='button' class='slick-prev'>Previous</button>", // 이전 화살표 모양 설정
    nextArrow: "<button type='button' class='slick-next'>Next</button>", // 다음 화살표 모양 설정
  });
});

//팝업창 세팅
window.onload = function () {
  window.open("popup.html", "popupNo1", "width=300,height=360");
};
