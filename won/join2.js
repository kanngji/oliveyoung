// const domainListEl = document.querySelector('#domain-list')
// const domainInputEl = document.querySelector('#domain-txt')
// // select 옵션 변경 시
// domainListEl.addEventListener('change', (event) => {
//   // option에 있는 도메인 선택 시
//   if(event.target.value !== "type") {
//     // 선택한 도메인을 input에 입력하고 disabled
//     domainInputEl.value = event.target.value
//     domainInputEl.disabled = true
//   } else { // 직접 입력 시
//     // input 내용 초기화 & 입력 가능하도록 변경
//     domainInputEl.value = ""
//     domainInputEl.disabled = false
//   }
// })

// function checkemailaddy(){
//     if (form.email_select.value == '1') {
//         form.email2.readOnly = false;
//         form.email2.value = '';
//         form.email2.focus();
//     }
//     else {
//         form.email2.readOnly = true;
//         form.email2.value = form.email_select.value;
//     }
// }


function mailcheck(){
    i=document.join.mail3.selectedIndex // 선택항목의 인덱스 번호
    var mail=document.join.mail3.options[i].value // 선택항목 value
    document.join.mail2.value=mail
   }
