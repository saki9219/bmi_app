// 名前付きエクスポート
// BMI値を計算する関数
export const calculateBMI = (heightCm,weightKg) => {
    const heightMeters = heightCm / 100;
    return Math.round(weightKg / (heightMeters * heightMeters) * 100 ) / 100;
};
//  肥満度を判定する関数
export const getJudgement = (bmi) => {
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
    return judgeResultText;
};

