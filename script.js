const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const statusDiv = document.getElementById('status');
    const title = document.getElementById('title');
    const body = document.body;

    // --- ゲーム設定 ---
    const baseWidth = 400;
    const baseHeight = 600;
    let scale = 1;
    const snapDistance = 30; // 吸着距離

    // --- ピース定義 ---
    const piecesDef = [
        {
    name: "bone_1",
    type: 'bone',
    // ▼ Figmaのサイドバーの数値をそのまま書く
    targetX: 69.23, 
    targetY: 369.65,
    // ▼ Figmaからコピーした d="..." の中身
    pathData: "M1.9982 0.931091C4.9943 4.0021 7.37574 7.55093 10.1973 10.7732C10.3437 10.9404 10.5435 11.2284 10.7878 11.2486C11.2017 11.283 11.6658 10.4949 12.313 9.99479C13.5692 9.0242 15.754 10.986 16.8681 11.3075C18.1757 11.6524 20.82 12.1914 22.3376 12.6119C24.3782 16.5952 26.3227 21.2009 25.093 24.042C23.636 27.4082 22.1896 29.1102 19.2748 30.4056C13.0412 33.1761 2.70916 25.2304 1.45658 19.3147C0.193096 13.3474 -0.00213087 6.77662 1.9982 0.931091Z", 
    color: "#ffcdd3",
    zIndex: 1
        },
        {
    name: "bone_2",
    type: 'bone',
    // ▼ Figmaのサイドバーの数値をそのまま書く
    targetX: 70.72, 
    targetY: 302.9,
    // ▼ Figmaからコピーした d="..." の中身
    pathData: "M13.9359 0.0498962C14.0619 7.64755 14.9178 15.392 15.635 22.9557C15.9951 26.7536 16.1677 26.6058 16.4501 26.3637C16.9121 25.9687 17.4377 25.4516 18.0213 25.2395C18.6122 25.0247 18.7751 27.2048 18.9754 29.8872C19.2968 34.1897 19.9951 38.4459 20.4119 42.7366C16.6347 52.1893 13.4033 63.9945 18.3947 73.7335C19.2122 75.3287 20.0947 76.8898 20.912 78.4852C19.3944 78.0648 16.7501 77.5258 15.4426 77.1809C14.3285 76.8594 12.1436 74.8976 10.8875 75.8682C10.2402 76.3682 9.7761 77.1564 9.36218 77.122C7.56784 76.973 2.16821 68.44 0.572624 66.8045C1.44764 64.2474 2.59996 62.532 3.82562 60.0487C9.32982 48.8965 9.668 36.6277 10.9546 24.4428C11.8153 16.2917 13.1183 8.20221 13.9359 0.0498962Z", 
    color: "#ffcdd3",
    zIndex: 1
        },
        {
    name: "bone_3",
    type: 'bone',
    // ▼ Figmaのサイドバーの数値をそのまま書く
    targetX: 84.09, 
    targetY: 76.47,
    // ▼ Figmaからコピーした d="..." の中身
    pathData: "M22.8096 39.9056C24.1551 27.0524 24.6175 13.5607 27.141 0.943034C29.6196 0.819769 42.4616 0.0109833 42.4138 0.942991C41.1211 26.1499 35.6062 50.8338 32.9592 75.8859C32.1241 83.7897 29.9561 91.4948 29.1453 99.4235C25.8339 131.804 19.0817 163.755 15.141 196.068C12.1821 220.332 16.2234 246.475 6.97641 269.616C6.76861 267.477 6.4477 265.346 6.19527 263.212C6.01901 261.722 5.04157 251.954 4.58582 252.119C4.00222 252.331 3.47667 252.848 3.0146 253.243C2.73221 253.485 2.55968 253.633 2.19956 249.835C1.48235 242.272 0.626448 234.527 0.500412 226.93C1.99645 212.012 3.13368 197.042 3.86832 182.068C6.20116 134.517 17.8572 87.2161 22.8096 39.9056Z",
    color: "#ffcdd3",
    zIndex: 1
        },
        {
    name: "bone_4",
    type: 'bone',
    targetX: 88.05, 
    targetY: 348.5,
    pathData: "M58.5001 22.2022C58.7999 26.3888 58.2085 32.4366 54.089 34.5784C51.416 35.9682 46.3552 39.0154 43.7254 40.2148C40.4296 41.7179 38.2371 41.2806 29.3618 42.2148C26.4145 42.525 12.9249 49.5631 11.5659 44.2148C11.3472 43.3541 11.2515 42.5155 11.151 41.6345C9.8851 30.5387 -4.14299 20.1708 2.08898 8.21478C3.14465 6.18946 4.16531 4.15432 5.49681 2.03296C5.69269 2.03296 29.0235 -0.352036 29.2279 0.827685C29.3014 1.25169 29.0879 2.51108 28.7263 4.64494C27.9764 9.06969 27.1243 13.7328 26.8655 18.2193C26.7214 20.7163 34.6415 20.4045 36.0814 20.5164C43.561 21.0975 51.0345 21.4486 58.5001 22.2022Z",
    color: "#ffcdd3",
    zIndex: 1
        },
        {
    name: "bone_5",
    type: 'bone',
    targetX: 107.96, 
    targetY: 318.46,
    pathData: "M1.31971 31.2396C4.82486 27.7104 7.23836 23.4419 10.2028 19.4972C13.5984 14.9789 16.3468 11.8474 16.7283 11.6991C17.459 11.4151 17.8909 14.2606 18.3323 14.6378C18.894 15.1178 26.1134 2.81634 28.1732 0.754822C30.244 3.42525 32.1016 6.5364 34.8371 8.57864C34.9587 14.1252 34.6639 24.2929 35.9055 32.3245C37.1513 40.3837 39.0352 47.294 39.4075 52.4937C31.937 51.7397 24.471 51.3892 16.9888 50.8079C15.5488 50.696 7.62878 51.0078 7.77282 48.5108C8.03164 44.0244 8.88379 39.3612 9.63366 34.9365C9.99528 32.8026 10.2087 31.5432 10.1353 31.1192C9.94076 29.9965 2.35329 31.1477 1.31971 31.2396Z",
    color: "#ffcdd3",
    zIndex: 1
        },
        {
    name: "bone_6",
    type: 'bone',
    targetX: 93.04, 
    targetY: 284.33,
    pathData: "M19.497 0.164307C20.0163 1.65692 21.171 4.6054 22.9729 8.57542C23.722 10.2257 25.0541 12.0578 26.716 14.3434C31.7419 21.2553 37.4892 27.5549 42.7191 34.2977C40.3399 36.6789 38.4455 39.832 36.9797 42.8295C35.6003 45.6502 33.9252 49.0754 32.8782 48.1807C32.4368 47.8035 32.0049 44.958 31.2742 45.242C30.8927 45.3903 28.1443 48.5218 24.7487 53.0402C21.7843 56.9848 19.3708 61.2533 15.8656 64.7825C10.8987 65.2233 5.92183 65.4921 0.950066 65.8674C2.43052 63.5087 3.89424 61.1857 5.18745 58.7109C6.03221 57.0943 6.798 55.6289 7.54229 54.5947C9.55866 51.793 11.3605 47.5038 13.1787 41.5038C16.2791 31.2725 17.4515 20.699 18.2081 13.876C18.7145 9.31258 19.2316 4.74948 19.497 0.164307Z",
    color: "#ffcdd3",
    zIndex: 1
        },
        {
    name: "bone_7",
    type: 'bone',
    targetX: 93.05, 
    targetY: 76.86,
    pathData: "M30.9412 39.9275C26.9705 57.2547 25.6496 75.3619 25.589 93.107C25.4588 131.177 21.0883 169.955 18.885 208.016C23.6706 221.771 33.9547 231.637 42.709 242.926C44.5842 245.344 46.2912 248.122 48.7711 249.973C48.0844 218.648 51.4651 187.68 52.0212 156.447C52.8445 109.938 59.4674 63.0299 64.5667 16.8102C64.7673 14.992 65.3048 1.32185 64.5667 0.594553C57.537 0.594553 50.5052 0.490223 43.4757 0.594563C39.6814 0.431628 36.5508 0.847623 35.2939 0.594546C33.4233 13.6172 33.8796 27.1048 30.9412 39.9275ZM0.3554 273.718C0.336017 273.72 0.335823 273.72 0.3554 273.718Z",
    color: "#ffcdd3",
    zIndex: 1
        },
        {
    name: "right_plate",
    type: 'plate',
    targetX: 106.38, 
    targetY: 258,
    pathData: "M41.0176 0C45.7114 8.96785e-05 49.5166 3.80519 49.5166 8.49902V120.501C49.5166 125.195 45.7114 129 41.0176 129C36.3237 129 32.5186 125.195 32.5186 120.501V93.3945H5.61426V93.3779L0 90.1367L5.61426 86.8945V86.874H32.5186V68.3945H5.61426V68.3779L0 65.1367L5.61426 61.8945V61.874H32.5186V44.3945H6.61426V44.3779L1 41.1367L6.61426 37.8945V37.874H32.5186V8.49902C32.5186 3.80514 36.3237 0 41.0176 0ZM41.0176 110.838C38.8957 110.838 37.1758 112.558 37.1758 114.68C37.1758 116.802 38.8957 118.521 41.0176 118.521C43.1394 118.521 44.8593 116.801 44.8594 114.68C44.8594 112.558 43.1394 110.838 41.0176 110.838ZM41.0176 86.3877C38.8957 86.3877 37.1758 88.1086 37.1758 90.2305C37.176 92.3522 38.8958 94.0723 41.0176 94.0723C43.1393 94.0722 44.8592 92.3522 44.8594 90.2305C44.8594 88.1086 43.1394 86.3878 41.0176 86.3877ZM41.0176 61.9385C38.8958 61.9385 37.176 63.6585 37.1758 65.7803C37.1758 67.9022 38.8957 69.623 41.0176 69.623C43.1394 69.623 44.8594 67.9021 44.8594 65.7803C44.8592 63.6586 43.1393 61.9386 41.0176 61.9385ZM41.0176 37.4893C38.8957 37.4893 37.1759 39.2092 37.1758 41.3311C37.1758 43.453 38.8957 45.1729 41.0176 45.1729C43.1394 45.1728 44.8594 43.4529 44.8594 41.3311C44.8593 39.2093 43.1394 37.4893 41.0176 37.4893ZM41.0176 13.04C38.8957 13.04 37.1758 14.7599 37.1758 16.8818C37.1758 19.0037 38.8957 20.7236 41.0176 20.7236C43.1394 20.7235 44.8593 19.0037 44.8594 16.8818C44.8594 14.76 43.1394 13.0401 41.0176 13.04Z",
    color: "#cfd8dc",
    zIndex: 2
        },
        {
    name: "left_plate",
    type: 'plate',
    targetX: 65, 
    targetY: 335,
    pathData: "M5 0C7.76142 0 10 2.23858 10 5V12.3076H18.3701V12.3291L22.3105 14.6055L18.3701 16.8809V16.8838H18.3652L18.3516 16.8916V16.8838H10V28.3076H18.3701V28.3291L22.3105 30.6055L18.3701 32.8809V32.8838H18.3652L18.3516 32.8916V32.8838H10V40C10 42.7614 7.76142 45 5 45C2.23858 45 2.01337e-08 42.7614 0 40V5C0 2.23858 2.23858 0 5 0ZM5 28C3.34315 28 2 29.3431 2 31C2 32.6569 3.34315 34 5 34C6.65685 34 8 32.6569 8 31C8 29.3431 6.65685 28 5 28ZM5 12C3.34315 12 2 13.3431 2 15C2 16.6569 3.34315 18 5 18C6.65685 18 8 16.6569 8 15C8 13.3431 6.65685 12 5 12Z",
    color: "#cfd8dc",
    zIndex: 2
        }
    ];

    let pieces = [];
    let isDragging = false;
    let selectedPiece = null;
    let dragOffset = {x: 0, y: 0};
    let isCompleted = false;

    // --- ヘルパー関数 ---
    function buildPath(c, pathData) {
        c.beginPath();
        if (pathData.length < 2) return;
        c.moveTo(pathData[0], pathData[1]);
        for(let i=2; i<pathData.length; i+=2) {
            c.lineTo(pathData[i], pathData[i+1]);
        }
        c.closePath();
    }

    function drawCircle(c, x, y, r) {
        c.moveTo(x + r, y);
        c.arc(x, y, r, 0, Math.PI * 2);
    }

    // --- 初期化 ---
    function init() {
        // 修正点: まずピースを生成する
        pieces = piecesDef.map((def, index) => {
            // 初期位置をランダムに
            let startX, startY;
            if (index % 2 === 0) {
                startX = 50 + Math.random() * 50;
            } else {
                startX = baseWidth - 100 + Math.random() * 50;
            }
            startY = 50 + Math.random() * (baseHeight - 100);

            return {
                ...def,
                x: startX,
                y: startY,
                isLocked: false,
                id: index
            };
        });

        // その後にリサイズ（描画）を行う
        window.addEventListener('resize', resize);
        resize();
        
        statusDiv.textContent = "バラバラの骨をドラッグして整復してください";
    }

    function resize() {
        const winW = window.innerWidth * 0.95;
        const winH = window.innerHeight * 0.8;
        scale = Math.min(winW / baseWidth, winH / baseHeight);
        
        // ★追加: デバイスの画素密度（DPR）を取得（iPhoneなら2や3になります）
        const dpr = window.devicePixelRatio || 1;

        // ★変更: 内部の解像度をDPR倍にして高精細にする
        canvas.width = baseWidth * scale * dpr;
        canvas.height = baseHeight * scale * dpr;

        // ★追加: でも、画面上の見た目のサイズは大きくならないようにCSSで押さえる
        canvas.style.width = `${baseWidth * scale}px`;
        canvas.style.height = `${baseHeight * scale}px`;
        
        // ★変更: 描画の基準もDPR倍に拡大する
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(scale * dpr, scale * dpr);
        
        draw();
    }

    // --- 描画ロジック ---
// --- 描画ロジック ---
    function drawPiecePath(c, p) {
        // SVGデータ(pathData)がある場合（新しい骨やプレート）
        if (p.pathData) {
            if (!p.cachedPath) {
                p.cachedPath = new Path2D(p.pathData);
            }
            // SVGデータがある場合は Path2Dオブジェクトを返すだけにする
            return p.cachedPath; 
        } 
    }

/* drawPiecePath から返ってきたデータを使って、実際に色を塗る処理に変更 */
    function draw() {
        if (!pieces || pieces.length === 0) return;

        ctx.clearRect(0, 0, baseWidth, baseHeight);

        // ★追加: 骨がすべて完了しているかチェック
        const allBonesLocked = pieces
            .filter(p => p.type === 'bone')
            .every(p => p.isLocked);

        // 1. ガイドライン（点線）
        ctx.save();
        ctx.setLineDash([4, 4]);
        pieces.forEach(p => {
            // ★追加: プレートは、骨が終わるまで表示しない
            if (p.type === 'plate' && !allBonesLocked) return;

            if (!p.isLocked) {
                ctx.save();
                ctx.translate(p.targetX, p.targetY);
                
                const path2d = drawPiecePath(ctx, p);
                
                ctx.strokeStyle = "#bdbdbd";
                ctx.lineWidth = 1;
                
                if (path2d) {
                    ctx.stroke(path2d);
                } else {
                    ctx.stroke();
                }
                ctx.restore();
            }
        });
        ctx.restore();

        // 2. ピース描画（実体）
        const sortedPieces = [...pieces].sort((a, b) => {
            if (a.isLocked !== b.isLocked) return a.isLocked ? -1 : 1;
            return a.zIndex - b.zIndex;
        });
        
        if (selectedPiece) {
            const idx = sortedPieces.indexOf(selectedPiece);
            if (idx > -1) {
                sortedPieces.splice(idx, 1);
                sortedPieces.push(selectedPiece);
            }
        }

        sortedPieces.forEach(p => {
            // ★追加: プレートは、骨が終わるまで表示しない
            if (p.type === 'plate' && !allBonesLocked) return;

            ctx.save();
            ctx.translate(p.x, p.y);

            if (p === selectedPiece && !p.isLocked) {
                ctx.shadowColor = "rgba(0,0,0,0.3)";
                ctx.shadowBlur = 10;
                ctx.shadowOffsetY = 5;
            }

            const path2d = drawPiecePath(ctx, p);

            if (p.type === 'plate') {
                ctx.fillStyle = p.isLocked ? "#b0bec5" : p.color;
                ctx.strokeStyle = p.strokeColor || "#78909c";
                ctx.lineWidth = 1;

                if (path2d) {
                    ctx.fill(path2d, "evenodd");
                    ctx.stroke(path2d);
                } else {
                    ctx.fill("evenodd");
                    ctx.stroke();
                }
            } else {
                ctx.fillStyle = p.isLocked ? "#ffe0b2" : p.color;
                ctx.strokeStyle = "#5d4037";
                ctx.lineWidth = 1;

                if (path2d) {
                    ctx.fill(path2d);
                    ctx.stroke(path2d);
                } else {
                    ctx.fill();
                    ctx.stroke();
                }
            }
            ctx.restore();
        });

        updateProgress();
    }

function updateProgress() {
        if (!pieces || pieces.length === 0) return;

        const bones = pieces.filter(p => p.type === 'bone');
        const plates = pieces.filter(p => p.type === 'plate');

        const lockedBonesCount = bones.filter(p => p.isLocked).length;
        const lockedPlatesCount = plates.filter(p => p.isLocked).length;

        const totalBones = bones.length;
        const totalPlates = plates.length;
        const totalPieces = totalBones + totalPlates;
        const totalLocked = lockedBonesCount + lockedPlatesCount;

        let ratio = totalLocked / totalPieces;
        
        // ★リセット: 通常時は元の位置に戻す
        statusDiv.style.position = "absolute";
        statusDiv.style.bottom = "calc(30px + env(safe-area-inset-bottom))";
        statusDiv.style.top = "auto";
        statusDiv.style.left = "0";
        statusDiv.style.transform = "none";
        statusDiv.style.width = "100%";
        statusDiv.style.backgroundColor = "transparent";
        statusDiv.style.padding = "0";
        statusDiv.style.borderRadius = "0";
        statusDiv.style.boxShadow = "none";
        statusDiv.style.fontSize = "1rem";

        if (lockedBonesCount < totalBones) {
            statusDiv.textContent = `点線に合わせて骨をおいてね (${lockedBonesCount}/${totalBones})`;
        } else if (lockedPlatesCount < totalPlates) {
            statusDiv.textContent = `最後にプレートをくっつけよう (${lockedPlatesCount}/${totalPlates})`;
        } else if (!isCompleted) {
            // --- ▼ 成功時の演出（中央表示に変更） ▼ ---
            isCompleted = true;
            
            statusDiv.textContent = "完成！おめでとう！";
            
            // ★CSSを動的に変更して中央に配置
            statusDiv.style.bottom = "auto";
            statusDiv.style.top = "50%";
            statusDiv.style.left = "50%";
            statusDiv.style.transform = "translate(-50%, -50%) scale(1.5)"; // 中央配置 + 拡大
            statusDiv.style.width = "80%"; // 幅を制限
            statusDiv.style.backgroundColor = "rgba(255, 255, 255, 0.9)"; // 背景を白く
            statusDiv.style.padding = "20px";
            statusDiv.style.borderRadius = "15px";
            statusDiv.style.boxShadow = "0 10px 10px rgba(0,0,0,0.2)";
            statusDiv.style.zIndex = "100"; // 最前面へ
            statusDiv.style.transition = "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)"; // ボヨヨンというアニメーション

            // スマホの振動
            if(navigator.vibrate) navigator.vibrate([100,50,100,50,200]);

            // 紙吹雪発射
            const duration = 1500;
            const end = Date.now() + duration;

            (function frame() {
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0, y: 0.8 },
                    colors: ['#F06292', '#BA68C8', '#4FC3F7', '#FF8A65']
                });
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1, y: 0.8 },
                    colors: ['#F06292', '#BA68C8', '#4FC3F7', '#FF8A65']
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
        }
    }
    // --- 入力イベント ---
    function getPos(e) {
        const rect = canvas.getBoundingClientRect();
        const cx = e.touches ? e.touches[0].clientX : e.clientX;
        const cy = e.touches ? e.touches[0].clientY : e.clientY;

        // ★修正: 「実際のキャンバス幅(400)」と「画面上の表示幅(rect.width)」の比率を使う
        // これにより、DPRに関係なく、常に正しいゲーム内座標(0〜400)が取得できます
        return {
            x: (cx - rect.left) * (baseWidth / rect.width),
            y: (cy - rect.top) * (baseHeight / rect.height)
        };
    }

/* マウスが骨の上に乗ったかどうかの判定ロジックを、高画質＆SVG対応版に変更 */
    function isInside(pos, p) {
        ctx.save();
        
        // ★ここが修正ポイント！
        // 当たり判定の時だけは、高画質化や画面拡大の設定（scale/dpr）を
        // 一旦リセットして、「純粋な400x600の座標系」として計算させます。
        ctx.setTransform(1, 0, 0, 1, 0, 0); 
        
        // ピースの位置へ移動
        ctx.translate(p.x, p.y);
        
        const path2d = drawPiecePath(ctx, p);
        let hit = false;

        if (path2d) {
            // 1. 形の内側かどうかを判定
            hit = ctx.isPointInPath(path2d, pos.x, pos.y);
            
            // 2. もし内側でなければ、線の太さを太くして判定
            if (!hit) {
                ctx.lineWidth = 20; 
                hit = ctx.isPointInStroke(path2d, pos.x, pos.y);
            }
        } else {
            // 従来方式
            hit = ctx.isPointInPath(pos.x, pos.y);
            
            if (!hit) {
                 const dist = Math.sqrt(pos.x*pos.x + pos.y*pos.y);
                 if (dist < 30) hit = true;
            }
        }
        
        ctx.restore(); // リセットした設定を元に戻す（描画用に戻す）
        return hit;
    }

    function handleStart(e) {
        if (isCompleted) return;
        if (e.touches && e.touches.length > 1) return;
        e.preventDefault();
        const pos = getPos(e);

        // ★追加: 骨がすべて完了しているかチェック
        const allBonesLocked = pieces
            .filter(p => p.type === 'bone')
            .every(p => p.isLocked);

        // タッチ候補の選定
        const candidates = pieces.filter(p => {
            // 既にロックされているものは除外
            if (p.isLocked) return false;
            // ★追加: 骨が終わっていない場合、プレートは触れないように除外
            if (p.type === 'plate' && !allBonesLocked) return false;
            
            return true;
        });

        for (let i = candidates.length - 1; i >= 0; i--) {
            if (isInside(pos, candidates[i])) {
                selectedPiece = candidates[i];
                isDragging = true;
                dragOffset.x = pos.x - candidates[i].x;
                dragOffset.y = pos.y - candidates[i].y;
                draw();
                return;
            }
        }
    }

    function handleMove(e) {
// ★追加: 指が2本以上ある場合はブラウザのズーム動作を優先させるため、処理を中断
        if (e.touches && e.touches.length > 1) return;

        if (!isDragging || !selectedPiece) return;
        e.preventDefault(); // ←1本指のときだけ、画面スクロールを止める
        const pos = getPos(e);
        selectedPiece.x = pos.x - dragOffset.x;
        selectedPiece.y = pos.y - dragOffset.y;
        draw();
    }

    function handleEnd(e) {
        if (!isDragging || !selectedPiece) return;
        e.preventDefault();

        const dx = selectedPiece.x - selectedPiece.targetX;
        const dy = selectedPiece.y - selectedPiece.targetY;
        const dist = Math.sqrt(dx*dx + dy*dy);

        if (dist < snapDistance) {
            const allBonesDone = pieces.filter(p => p.type === 'bone').every(p => p.isLocked);
            
            if (selectedPiece.type === 'plate' && !allBonesDone) {
                statusDiv.textContent = "先に骨をすべてくっつけてください！";
                if(navigator.vibrate) navigator.vibrate(100);
            } else {
                selectedPiece.x = selectedPiece.targetX;
                selectedPiece.y = selectedPiece.targetY;
                selectedPiece.isLocked = true;
                statusDiv.textContent = "カチッ！";
                if(navigator.vibrate) navigator.vibrate(50);
            }
        }

        isDragging = false;
        selectedPiece = null;
        draw();
    }

    canvas.addEventListener('mousedown', handleStart);
    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mouseup', handleEnd);
    canvas.addEventListener('touchstart', handleStart, {passive: false});
    canvas.addEventListener('touchmove', handleMove, {passive: false});
    canvas.addEventListener('touchend', handleEnd);

    // 実行開始
    init();
