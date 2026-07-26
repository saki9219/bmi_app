import { calculateBMI, getJudgement } from "./functions.js";
// 1.身長の入力欄の要素を取得
const heightInput = document.querySelector('input#height');
// 2.体重の入力欄の要素を取得
const weightInput = document.querySelector('input#weight');
// 3.「計算する」ボタンの要素を取得
const calcBtn = document.querySelector('button#calc-btn');
// 4.計算結果を表示する要素を取得
const bmiResult = document.querySelector('p#bmi-result');
// 5.計算履歴を削除するボタンの要素を取得
const clearBtn = document.getElementById("clear-btn");

// おすすめの書籍データ
const bookRecommendations = {
    "低体重": [
        {
            title: "一生役立つ きちんとわかる栄養学",
            desc: "健康的に体重を増やすための栄養知識をやさしく解説。",
            url: "#",
            img: "img/books/nutrition-basic.jpg"
        },
        {
            title: "自重筋トレ入門",
            desc: "筋トレ初心者向けに、自宅でできる自重トレーニングを週2回・1回15分で続ける入門書。生活習慣改善やダイエットにも役立つ内容。",
            url: "#",
            img: "img/books/bodyweight-training.jpg"
        }
    ],
    "普通体重": [
        {
            title: "あなたの心身を守る！最高の健康習慣",
            desc: "毎日の生活習慣を整えて心身の健康を守るための実践的な習慣を紹介。食事・運動・睡眠など、無理なく続けられる健康メソッドがまとまった一冊。",
            url: "#",
            img: "img/books/health-habits.jpg"
        },
        {
            title: "長生き部屋トレ",
            desc: "自宅でできる“部屋トレ”を中心に、無理なく続けられる運動習慣を紹介する健康実用書。長生きのための体づくりを、生活の中で自然に取り入れられる内容。",
            url: "#",
            img: "img/books/room-training.jpg"
        }
    ],
    "肥満": [
        {
            title: "科学的に正しいダイエット 最高の教科書",
            desc: "最新の栄養学と科学的根拠に基づき、無理なく続けられるダイエット方法をまとめた一冊。食事・運動・生活習慣を改善し、健康的に痩せるための実践的なメソッドが学べる。",
            url: "#",
            img: "img/books/science-diet.jpg"
        },
        {
            title: "食べて痩せるダイエット栄養学：スリムな人は知っている",
            desc: "食べながら健康的に痩せるための栄養学を、科学的根拠に基づいて解説した一冊。スリムな人が実践している食事の選び方や習慣をわかりやすくまとめている。",
            url: "#",
            img: "img/books/eat-diet.jpg"
        }
    ]
};

// 日付のフォーマット関数
const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString('ja-JP', {
    month: 'long',
    day: 'numeric',
    weekday: 'short'
});
    const formattedTime = date.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit'
});
    return `${formattedDate} ${formattedTime}`;
};

// 履歴一覧を描画する関数
const renderHistory = () => {
    historyList.innerHTML = '';
    historyData.forEach((history) => {
        const liElm = document.createElement('li');
        liElm.className = 'history-item';
        liElm.innerHTML = `
        <span class="history-date">${formatDate(history.date)}</span>
        <span class="history-bmi">BMI: ${history.bmi}</span>
        <span class="history-judge">${history.judge}</span>
        `;
        historyList.appendChild(liElm);
    });
};

// 計算履歴を表示する要素を取得
const historyList = document.querySelector('ul#history-list');

// おすすめ書籍を描画する関数
const booksSection = document.getElementById('books-section');
const booksList = document.getElementById('books-list');

const renderBooks = (judge) => {
    const books = bookRecommendations[judge];
    if (books) {
        booksSection.style.display = "block";
        booksList.innerHTML = "";
        books.forEach(book => {
            const div = document.createElement('div');
            div.className = "book-card";
            div.innerHTML = `
            <img class="book-img" src="${book.img}" alt="${book.title}">
            <div class="book-item">
                <h4 class="book-title">${book.title}</h4>
                <p class="book-desc">${book.desc}</p>
                <a class="book-link" href="${book.url}">商品を見る</a>
            </div>
            `;
            booksList.appendChild(div);
        });
    } else {
        booksSection.style.display = "none";
    }
};

// 計算履歴保存用の配列
let historyData = [];
// 計算履歴保存用の配列（localStorageからデータを読み込み）
const savedData = localStorage.getItem('bmiHistory');
if(savedData) {
    historyData = JSON.parse(savedData);
};
// ページを開いたときに履歴を表示
renderHistory();

calcBtn.addEventListener('click', () => {
// 5.入力された身長の値を取得
const heightValue = heightInput.value;
// 6.入力された体重の値を取得
const weightValue = weightInput.value;

// 入力値の検証
// 未入力のチェック
if (heightValue === '' || weightValue === ''){
    alert('身長と体重を入力してください。');
    return;
}
// 数字かどうかチェック
if(isNaN(heightValue) || isNaN(weightValue)) {
    alert('身長と体重は半角数字で入力してください。');
    return;
}
// 0以下の数値のチェック
if (heightValue <= 0 || weightValue <= 0) {
    alert("身長と体重は0より大きい数値を入力してください。");
    return;
}
// 7.BMIを計算する(体重[kg] ÷ (身長[m] × 身長[m]))
const bmi = calculateBMI(heightValue,weightValue);
// 8.計算結果をbmiResultに表示
bmiResult.innerText = bmi;

// 肥満度の判定（低体重・普通体重・肥満）
// 1.表示領域の要素を取得
const judgeResult = document.getElementById('judgment-result');
// 2.BMIの値を基に肥満度を判定
const judgeInfo = getJudgement(bmi);
judgeResult.innerText = judgeInfo;

// おすすめの書籍一覧を画面に表示する
renderBooks(judgeInfo);

// 計算履歴の表示
// 1.履歴のオブジェクトを作る（日付:date・BMI:bmi・判定結果:judge）
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() +1).padStart(2,'0');
const date = String(today.getDate()).padStart(2,'0'); 
const hour = String(today.getHours()).padStart(2,'0');
const min = String(today.getMinutes()).padStart(2,'0');
const sec = String(today.getSeconds()).padStart(2,'0');

const newRecord = {
    bmi:bmi,
    judge:judgeInfo,
    date:`${year}-${month}-${date}T${hour}:${min}:${sec}`,
}
// 2.履歴の配列にオブジェクトを入れる
historyData.unshift(newRecord);
// 2-2.historyDataをbmiHistoryというキーでlocalStorageに保存
localStorage.setItem('bmiHistory', JSON.stringify(historyData))
// 3.履歴一覧を画面に表示する
renderHistory();
});

clearBtn.addEventListener("click", () => {
    if (!confirm("計算履歴をすべて削除しますか？")) {
        return;
    }
    historyData = [];
    localStorage.removeItem("bmiHistory");
    renderHistory();
});


