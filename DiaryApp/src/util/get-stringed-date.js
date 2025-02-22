const getStringedDate = (targetDate) => {
    //날짜 -> yyyy-mm-dd 형식의 문자열로 변환
    let year = targetDate.getFullYear();
    let month = targetDate.getMonth() + 1;
    let date = targetDate.getDate();
    return `${year}-${month < 10 ? `0${month}` : month}-${date < 10 ? `0${date}` : date}`;
}

export default getStringedDate;