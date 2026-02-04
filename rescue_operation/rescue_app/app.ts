// 自治会レスキューアプリ：TypeScript完全版

// 1. 道具クラス
class Equipment {
    itemName: string;
    stockCount: number;

    constructor(name: string, stock: number) {
        this.itemName = name;
        this.stockCount = stock;
    }
}

// 2. 貸出台帳クラス
class LendingLedger {
    borrower: string;
    item: Equipment;
    quantity: number;
    destination: string;

    constructor(borrower: string, item: Equipment, quantity: number, destination: string) {
        this.borrower = borrower;
        this.item = item;
        this.quantity = quantity;
        this.destination = destination;
    }

    // 貸出処理を実行
    execute(): void {
        console.log(`--- 貸出リクエスト: ${this.borrower} (行先: ${this.destination}) ---`);

        // 在庫チェック
        if (this.item.stockCount >= this.quantity) {
            this.item.stockCount -= this.quantity; // 在庫を減らす
            console.log(`【成功】${this.item.itemName} を ${this.quantity}個 貸し出しました。`);
            console.log(`（現在の倉庫残高: ${this.item.stockCount}個）\n`);
        } else {
            console.log(`【失敗】在庫不足！ ${this.item.itemName} は残り ${this.item.stockCount}個 です。`);
            console.log(`（不足分: ${this.quantity - this.item.stockCount}個）\n`);
        }
    }
}

// --- 実行テスト：リスト活用編 ---
console.log("=== レスキュー倉庫・一括処理 ===\n");

// 1. 倉庫（在庫リスト）を準備
const inventory: Equipment[] = [
    new Equipment("油圧ジャッキ", 5),
    new Equipment("発電機", 2),
    new Equipment("救助用ロープ", 10)
];

// 2. 貸出依頼（リクエストのリスト）を準備
const requests: LendingLedger[] = [
    new LendingLedger("田中", inventory[0], 3, "現場A"), // ジャッキ3個
    new LendingLedger("佐藤", inventory[1], 3, "現場B"), // 発電機3個（在庫は2個なので失敗するはず）
    new LendingLedger("鈴木", inventory[2], 5, "現場C")  // ロープ5個
];

// 3. 全てのリクエストを順番に処理
// item という変数に、リストの中身が1つずつ入ってループします
requests.forEach(req => {
    req.execute();
});

console.log("--- 【緊急】発電機が3個入荷しました！ ---");

// 発電機（inventory[1]）の在庫を増やす
inventory[1].stockCount += 3;

// 佐藤さんの依頼をもう一度リスト（requests）に追加して実行してみる
requests.push(new LendingLedger("佐藤（再挑戦）", inventory[1], 3, "現場B"));

// 追加された最後の依頼（佐藤さん）だけを実行 
requests[requests.length - 1].execute();

console.log("--- 倉庫内を名前で検索 ---");

const searchName = "救助用ロープ";

// inventoryリストの中から、itemNameが一致するものを探す
const target = inventory.find(item => item.itemName === searchName);

if (target) {
    console.log(`【発見】${target.itemName} は現在 ${target.stockCount}個 あります。`);
} else {
    console.log(`【未登録】${searchName} は倉庫にありません。`);
}

// 画面の「箱」を取得する
const displayArea = document.getElementById("display-area");

if (displayArea) {
    // 画面に表示するメッセージを組み立てる
    const message = `
【最新の在庫状況】
${inventory.map(item => `・${item.itemName}: ${item.stockCount}個`).join('\n')}

最後に検索した結果:
${target ? `発見！ ${target.itemName} は ${target.stockCount}個 です。` : "見つかりませんでした"}
    `;

    // 画面の「箱」に文字を流し込む
    displayArea.innerText = message;
}

// ボタンを取得する
const lendButton = document.getElementById("lend-button");

// ボタンがクリックされた時の処理
lendButton?.addEventListener("click", () => {
    // 最初のアイテム（油圧ジャッキ）を1個減らす
    if (inventory[0].stockCount > 0) {
        inventory[0].stockCount -= 1;
        
        // 画面の表示を更新する（上で作った表示処理をもう一度呼び出すイメージ）
        updateDisplay();
    } else {
        alert("在庫がありません！");
    }
});

// 表示更新を何度も使うので、関数（ひとまとめ）にします
function updateDisplay() {
    const displayArea = document.getElementById("display-area");
    if (displayArea) {
        displayArea.innerText = `
【最新の在庫状況】
${inventory.map(item => `・${item.itemName}: ${item.stockCount}個`).join('\n')}
         `;
    }
}

// 最初に一度実行して表示しておく
updateDisplay();