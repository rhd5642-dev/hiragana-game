function doPost(e) {
  try {
    // 현재 스프레드시트의 활성화된 시트 가져오기
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // 게임에서 전송한 JSON 데이터 파싱
    var data = JSON.parse(e.postData.contents);
    
    // 스프레드시트에 한 행(Row)으로 학생 성적 데이터 추가
    sheet.appendRow([
      data.time,            // 제출 시간
      data.cls,             // 반
      data.stuId,           // 학번
      data.name,            // 이름
      data.stage + "단계",   // 학습 단계
      data.score,           // 점수
      data.wrongCnt,        // 오답 수
      data.wrongNote        // 오답 노트
    ]);
    
    // 성공 응답 반환 (CORS 대응)
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
                         .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // 에러 발생 시 로그 및 에러 반환
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}