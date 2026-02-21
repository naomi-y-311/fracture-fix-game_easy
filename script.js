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
    pathData: "M2.9982 2.79327C5.99429 5.86428 8.37573 9.41311 11.1972 12.6354C11.3437 12.8026 11.5435 13.0905 11.7878 13.1108C12.2017 13.1452 12.6658 12.357 13.313 11.857C14.5692 10.8864 16.754 12.8482 17.8681 13.1697C19.1756 13.5146 21.82 14.0536 23.3376 14.474C25.3782 18.4574 27.3226 23.0631 26.093 25.9042C24.636 29.2704 23.1895 30.9724 20.2748 32.2678C14.0412 35.0383 3.70915 27.0926 2.45658 21.1769C1.19309 15.2096 0.997862 8.6388 2.9982 2.79327Z", 
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
    pathData: "M15.0811 0.149689C15.2072 7.74735 16.0631 15.4918 16.7803 23.0555C17.1404 26.8534 17.3129 26.7056 17.5953 26.4635C18.0574 26.0685 18.5829 25.5514 19.1665 25.3393C19.7575 25.1245 19.9203 27.3046 20.1207 29.987C20.4421 34.2895 21.1404 38.5457 21.5571 42.8364C17.78 52.2891 14.5485 64.0943 19.5399 73.8333C20.3575 75.4285 21.2399 76.9896 22.0572 78.585C20.5396 78.1646 17.8953 77.6256 16.5878 77.2807C15.4737 76.9591 13.2889 74.9974 12.0327 75.968C11.3855 76.468 10.9214 77.2562 10.5074 77.2218C8.7131 77.0728 3.31347 68.5397 1.71788 66.9043C2.59289 64.3472 3.74522 62.6318 4.97087 60.1485C10.4751 48.9963 10.8133 36.7274 12.0999 24.5426C12.9606 16.3915 14.2636 8.30201 15.0811 0.149689Z", 
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
    pathData: "M23.8105 40.9056C25.156 28.0524 25.6183 14.5607 28.1419 1.94303C30.6204 1.81976 43.4624 1.01098 43.4146 1.94298C42.1219 27.1499 36.6071 51.8338 33.9601 76.8859C33.125 84.7897 30.957 92.4948 30.1461 100.423C26.8347 132.804 20.0825 164.754 16.1419 197.068C13.1829 221.332 17.2242 247.475 7.97725 270.616C7.76945 268.477 7.44853 266.346 7.1961 264.212C7.01984 262.722 6.0424 252.954 5.58665 253.119C5.00305 253.331 4.4775 253.848 4.01543 254.243C3.73304 254.485 3.56051 254.633 3.20039 250.835C2.48318 243.272 1.62728 235.527 1.50124 227.93C2.99728 213.012 4.13451 198.042 4.86915 183.068C7.20199 135.517 18.858 88.216 23.8105 40.9056Z",
    color: "#ffcdd3",
    zIndex: 1
        },
        {
    name: "bone_4",
    type: 'bone',
    targetX: 88.05, 
    targetY: 348.5,
    pathData: "M59.501 23.2022C59.8007 27.3888 59.2093 33.4366 55.0899 35.5784C52.4168 36.9682 47.356 40.0154 44.7262 41.2148C41.4304 42.7179 39.2379 42.2806 30.3626 43.2148C27.4153 43.525 13.9258 50.5631 12.5667 45.2148C12.348 44.3541 12.2523 43.5155 12.1518 42.6345C10.8859 31.5387 -3.14217 21.1708 3.0898 9.21478C4.14548 7.18946 5.16614 5.15432 6.49763 3.03296C6.69351 3.03296 30.0244 0.647964 30.2287 1.82769C30.3022 2.25169 30.0887 3.51108 29.7271 5.64494C28.9773 10.0697 28.1251 14.7328 27.8663 19.2193C27.7222 21.7163 35.6423 21.4045 37.0822 21.5164C44.5618 22.0975 52.0354 22.4486 59.501 23.2022Z",
    color: "#ffcdd3",
    zIndex: 1
        },
        {
    name: "bone_5",
    type: 'bone',
    targetX: 107.96, 
    targetY: 318.46,
    pathData: "M3.95912 32.7492C7.46427 29.22 9.87778 24.9515 12.8422 21.0069C16.2378 16.4886 18.9862 13.3571 19.3677 13.2088C20.0984 12.9247 20.5303 15.7703 20.9717 16.1474C21.5335 16.6275 28.7528 4.32598 30.8126 2.26447C32.8834 4.9349 34.741 8.04605 37.4766 10.0883C37.5981 15.6348 37.3033 25.8025 38.5449 33.8342C39.7907 41.8933 41.6746 48.8036 42.0469 54.0033C34.5765 53.2494 27.1104 52.8989 19.6282 52.3176C18.1882 52.2057 10.2682 52.5175 10.4122 50.0205C10.671 45.534 11.5232 40.8709 12.2731 36.4461C12.6347 34.3123 12.8481 33.0529 12.7747 32.6289C12.5802 31.5061 4.9927 32.6574 3.95912 32.7492Z",
    color: "#ffcdd3",
    zIndex: 1
        },
        {
    name: "bone_6",
    type: 'bone',
    targetX: 93.04, 
    targetY: 284.33,
    pathData: "M21.3972 0.492889C21.9164 1.9855 23.0712 4.93399 24.8731 8.904C25.6221 10.5543 26.9543 12.3864 28.6162 14.6719C33.642 21.5838 39.3893 27.8835 44.6192 34.6263C42.24 37.0074 40.3457 40.1606 38.8798 43.158C37.5004 45.9788 35.8254 49.404 34.7783 48.5093C34.3369 48.1321 33.905 45.2866 33.1744 45.5706C32.7929 45.7189 30.0444 48.8504 26.6489 53.3687C23.6844 57.3134 21.2709 61.5819 17.7657 65.1111C12.7988 65.5519 7.82197 65.8207 2.8502 66.196C4.33065 63.8373 5.79437 61.5143 7.08758 59.0395C7.93235 57.4229 8.69813 55.9574 9.44242 54.9233C11.4588 52.1216 13.2606 47.8324 15.0788 41.8324C18.1792 31.6011 19.3516 21.0275 20.1082 14.2045C20.6146 9.64116 21.1317 5.07807 21.3972 0.492889Z",
    color: "#ffcdd3",
    zIndex: 1
        },
        {
    name: "bone_7",
    type: 'bone',
    targetX: 93.05, 
    targetY: 76.86,
    pathData: "M31.6227 41.1165C27.6521 58.4438 26.3312 76.551 26.2706 94.2961C26.1404 132.366 21.7699 171.144 19.5666 209.205C24.3522 222.96 34.6363 232.826 43.3906 244.115C45.2658 246.533 46.9728 249.311 49.4527 251.163C48.766 219.837 52.1466 188.869 52.7028 157.636C53.5261 111.127 60.149 64.219 65.2483 17.9993C65.4489 16.1811 65.9864 2.51094 65.2483 1.78365C58.2186 1.78365 51.1868 1.67932 44.1573 1.78366C40.363 1.62072 37.2324 2.03672 35.9755 1.78364C34.1048 14.8062 34.5612 28.2939 31.6227 41.1165ZM1.03699 274.907C1.0176 274.909 1.01741 274.909 1.03699 274.907Z",
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
            statusDiv.textContent = `小さな骨片も忘れずに！ (${lockedBonesCount}/${totalBones})`;
        } else if (lockedPlatesCount < totalPlates) {
            statusDiv.textContent = `仕上げにプレートで固定しましょう (${lockedPlatesCount}/${totalPlates})`;
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
