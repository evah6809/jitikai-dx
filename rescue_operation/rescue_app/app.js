// 自治会レスキューアプリ：TypeScript完全版
// 1. 道具クラス
var Equipment = /** @class */ (function () {
    function Equipment(name, stock) {
        this.itemName = name;
        this.stockCount = stock;
    }
    return Equipment;
}());
// 2. 貸出台帳クラス
var LendingLedger = /** @class */ (function () {
    function LendingLedger(borrower, item, quantity, destination) {
        this.borrower = borrower;
        this.item = item;
        this.quantity = quantity;
        this.destination = destination;
    }
    // 貸出処理を実行
    LendingLedger.prototype.execute = function () {
        console.log("--- \u8CB8\u51FA\u30EA\u30AF\u30A8\u30B9\u30C8: ".concat(this.borrower, " (\u884C\u5148: ").concat(this.destination, ") ---"));
        // 在庫チェック
        if (this.item.stockCount >= this.quantity) {
            this.item.stockCount -= this.quantity; // 在庫を減らす
            console.log("\u3010\u6210\u529F\u3011".concat(this.item.itemName, " \u3092 ").concat(this.quantity, "\u500B \u8CB8\u3057\u51FA\u3057\u307E\u3057\u305F\u3002"));
            console.log("\uFF08\u73FE\u5728\u306E\u5009\u5EAB\u6B8B\u9AD8: ".concat(this.item.stockCount, "\u500B\uFF09\n"));
        }
        else {
            console.log("\u3010\u5931\u6557\u3011\u5728\u5EAB\u4E0D\u8DB3\uFF01 ".concat(this.item.itemName, " \u306F\u6B8B\u308A ").concat(this.item.stockCount, "\u500B \u3067\u3059\u3002"));
            console.log("\uFF08\u4E0D\u8DB3\u5206: ".concat(this.quantity - this.item.stockCount, "\u500B\uFF09\n"));
        }
    };
    return LendingLedger;
}());
// --- 実行テスト：リスト活用編 ---
console.log("=== レスキュー倉庫・一括処理 ===\n");
// 1. 倉庫（在庫リスト）を準備
var inventory = [
    new Equipment("油圧ジャッキ", 5),
    new Equipment("発電機", 2),
    new Equipment("救助用ロープ", 10)
];
// 2. 貸出依頼（リクエストのリスト）を準備
var requests = [
    new LendingLedger("田中", inventory[0], 3, "現場A"), // ジャッキ3個
    new LendingLedger("佐藤", inventory[1], 3, "現場B"), // 発電機3個（在庫は2個なので失敗するはず）
    new LendingLedger("鈴木", inventory[2], 5, "現場C") // ロープ5個
];
// 3. 全てのリクエストを順番に処理
// item という変数に、リストの中身が1つずつ入ってループします
requests.forEach(function (req) {
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
var searchName = "救助用ロープ";
// inventoryリストの中から、itemNameが一致するものを探す
var target = inventory.find(function (item) { return item.itemName === searchName; });
if (target) {
    console.log("\u3010\u767A\u898B\u3011".concat(target.itemName, " \u306F\u73FE\u5728 ").concat(target.stockCount, "\u500B \u3042\u308A\u307E\u3059\u3002"));
}
else {
    console.log("\u3010\u672A\u767B\u9332\u3011".concat(searchName, " \u306F\u5009\u5EAB\u306B\u3042\u308A\u307E\u305B\u3093\u3002"));
}
// 画面の「箱」を取得する
var displayArea = document.getElementById("display-area");
if (displayArea) {
    // 画面に表示するメッセージを組み立てる
    var message = "\n\u3010\u6700\u65B0\u306E\u5728\u5EAB\u72B6\u6CC1\u3011\n".concat(inventory.map(function (item) { return "\u30FB".concat(item.itemName, ": ").concat(item.stockCount, "\u500B"); }).join('\n'), "\n\n\u6700\u5F8C\u306B\u691C\u7D22\u3057\u305F\u7D50\u679C:\n").concat(target ? "\u767A\u898B\uFF01 ".concat(target.itemName, " \u306F ").concat(target.stockCount, "\u500B \u3067\u3059\u3002") : "見つかりませんでした", "\n    ");
    // 画面の「箱」に文字を流し込む
    displayArea.innerText = message;
}
// ボタンを取得する
var lendButton = document.getElementById("lend-button");
// ボタンがクリックされた時の処理
lendButton === null || lendButton === void 0 ? void 0 : lendButton.addEventListener("click", function () {
    // 最初のアイテム（油圧ジャッキ）を1個減らす
    if (inventory[0].stockCount > 0) {
        inventory[0].stockCount -= 1;
        // 画面の表示を更新する（上で作った表示処理をもう一度呼び出すイメージ）
        updateDisplay();
    }
    else {
        alert("在庫がありません！");
    }
});
// 表示更新を何度も使うので、関数（ひとまとめ）にします
function updateDisplay() {
    var displayArea = document.getElementById("display-area");
    if (displayArea) {
        displayArea.innerText = "\n\u3010\u6700\u65B0\u306E\u5728\u5EAB\u72B6\u6CC1\u3011\n".concat(inventory.map(function (item) { return "\u30FB".concat(item.itemName, ": ").concat(item.stockCount, "\u500B"); }).join('\n'), "\n         ");
    }
}
// 最初に一度実行して表示しておく
updateDisplay();
