// 【Step 1】 基本的なDOM操作とイベント
// HTMLの要素を取得して、定数に代入しよう
// 例: const heightInput = document.getElementById('height');

// 1.身長の入力欄の要素を取得
const heightInput = document.querySelector('input#height');
// 2.体重の入力欄の要素を取得
const weightInput = document.querySelector('input#weight');
// 3.「計算する」ボタンの要素を取得
const calcBtn = document.querySelector('button#calc-btn');
// 4.計算結果を表示する要素を取得
const bmiResult = document.querySelector('p#bmi-result');
// console.log(heightInput,weightInput,calcBtn,bmiResult);

// 計算履歴を表示する要素を取得
const historyList = document.querySelector('ul#history-list');

// 計算履歴保存用の配列
const historyData = [];

// 「計算する」ボタンがクリックされたときの処理を追加しよう
// 例: calcBtn.addEventListener('click', () => { ... });
calcBtn.addEventListener('click', () => {// calcボタンがクリックされた時に実行したい処理
console.log('クリックしました');

// 5.入力された身長の値を取得
const heightValue = heightInput.value;
console.log(heightValue);
// 6.入力された体重の値を取得
const weightValue = weightInput.value;

// 追加機能2：入力値の検証
// 未入力のチェック
if (heightValue === '' || weightValue === ''){
    alert('身長と体重を入力してください。');
    return; // プログラムを終了させる
}
// 数字かどうかチェック
if(isNaN(heightValue) || isNaN(weightValue)) {
    alert('身長と体重は半角数字で入力してください。');
    return; // プログラムを終了させる
}
// 身長の単位を変換
const convertedHeightValue = heightValue / 100;

console.log(weightValue);
// 7.BMIを計算する(体重[kg] ÷ (身長[m] × 身長[m]))
const bmi = Math.round(weightValue / (convertedHeightValue * convertedHeightValue) * 100 ) / 100;
console.log(bmi);
// 8.計算結果をbmiResultに表示
bmiResult.innerText = bmi;

// 追加機能1：肥満度の判定（低体重・普通体重・肥満）
// 1.表示領域の要素を取得
// document.getElementById('ID属性の値')
const judgeResult = document.getElementById('judgment-result');
console.log(judgeResult);
// 2.BMIの値を基に肥満度を判定
let judgeResultText = '';
if (bmi < 18.5) {
    console.log('低体重');
    judgeResultText = '低体重';
} else if (bmi <25) {
    console.log('普通体重');
    judgeResultText = '普通体重';
} else {
    console.log('肥満');
    judgeResultText = '肥満';
}
// 3.判定結果を画面に表示
judgeResult.innerText = judgeResultText;


// 追加機能3：計算履歴の表示 （historyDataという配列を作って中に計算履歴を入れる）
// 1.履歴のオブジェクトを作る（日付:date・BMI:bmi・判定結果:judge）
const today = new Date();
console.log(today);
const year = today.getFullYear();
const month = String(today.getMonth() +1).padStart(2,'0');
const date = String(today.getDate()).padStart(2,'0'); 
const hour = String(today.getHours()).padStart(2,'0');
const min = String(today.getMinutes()).padStart(2,'0');
const sec = String(today.getSeconds()).padStart(2,'0');

console.log(year, month, date, hour, min, sec);
const newRecord = {
    bmi:bmi,
    judge:judgeResultText,
    date:`${year}-${month}-${date}-${hour}-${min}-${sec}`,
}
// 2.履歴の配列にオブジェクトを入れる
historyData.unshift(newRecord);
console.log(historyData);
// 3.履歴一覧を画面に表示する
historyList.innerHTML = '';
for(let history of historyData) {
    const liElm = document.createElement('li');
    liElm.className = 'list-group-item d-flex justify-content-between align-items-center';
    liElm.innerHTML = `<span class="text-muted small">${new Date(history.date).toLocaleString('ja-JP')}</span>
    <span>BMI: ${history.bmi}</span>
    <span>${history.judge}</span>`;
    historyList.appendChild(liElm);
}
});


