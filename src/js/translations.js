window.translations = {
    en: {
        lang: 'en',
        title: 'KINECTI - Ski Coaching Video Report Tool',
        premiumActive: 'Premium active',
        login: 'Log in',
        loggedIn: 'Logged in',
        unset: 'Not set',
        analysisWaiting: 'Waiting',
        selectVideoNeeded: 'Select a video',
        stableRisk: 'Stable range',
        watchRisk: 'Watch',
        highRisk: 'Needs attention',
        originalView: 'Original view',
        aiWaiting: 'AI ready',
        originalHint: 'Use AI Reference only when you need pose markers.',
        aiHint: 'Play the video to show pose lines and reference angles.',
        premiumCopy: feature => `${feature} is available after login and Premium access check.`,
        logoutConfirm: 'Are you sure you want to log out?',
        loggedOutMsg: 'You have been logged out.',
        noSessionsTitle: 'No turn sessions saved',
        noSessionsBody: 'Set start/end points, then save a turn session.',
        noSessionOption: 'No sessions',
        noCapturesTitle: 'No frames saved',
        noCapturesBody: 'Pause on a key moment, annotate it, then save the frame.',
        capturePrefix: 'Frame',
        compareIdleTitle: 'Ready to compare',
        compareIdleBody: 'Select two saved turn sessions to compare coaching notes and key metrics.',
        text: {
            '.menu a[href="#tool"]': 'Coaching board',
            '.menu a[href="#guide"]': 'Guide',
            '.menu a[href="#resources"]': 'Resources',
            '.menu a[href="#about"]': 'Technology',
            '.menu a[href="#privacy"]': 'Privacy',
            '.menu a[href="#contact"]': 'Contact',
            '.hero .eyebrow': 'SKI COACHING VIDEO REPORT TOOL',
            '.hero h1': 'KINECTI',
            '.hero .lead': 'Review long ski videos, save key turn sessions, annotate representative frames, and export student-ready coaching reports. AI Reference supports the coach; it does not replace the coach.',
            '.hero .actions .button.primary': 'Start coaching review',
            '.hero .actions .button:not(.primary)': 'How data is handled',
            '.hero-panel h2': 'Coaching report workflow',
            '.hero-panel .lead': 'Use original video as the teaching surface, switch AI Reference on only when markers help, and package feedback into a report students can understand.',
            '#tool .section-head h2': 'Ski coaching video report board',
            '#tool .section-head p': 'Load ski footage, mark the turn session, capture the key frame, add visual coaching notes, and export feedback as a student-ready report.',
            '#empty_state strong': 'Select a ski video to start the coaching board.',
            '#empty_state p': 'Files stay in the current browser session.',
            '.upload-trigger': 'Select video file',
            '#btn_play_pause': 'Play',
            '#btn_view_original': 'Original',
            '#btn_view_ai': 'AI Reference',
            '.dashboard h3': 'Ski coaching panel',
            '.dashboard > .label': 'Turn review workflow',
            '[data-tab-target="session"]': 'Session',
            '[data-tab-target="annotation"]': 'Capture',
            '[data-tab-target="analysis"]': 'AI',
            '[data-tab-target="report"]': 'Report',
            '.session-meta .premium-chip:nth-child(1) span': 'Start',
            '.session-meta .premium-chip:nth-child(2) span': 'End',
            '.stats-grid .stat-box:nth-child(1) .label': 'Left knee flex',
            '.stats-grid .stat-box:nth-child(2) .label': 'Right knee flex',
            '.stats-grid .stat-box:nth-child(3) .label': 'Left upper body',
            '.stats-grid .stat-box:nth-child(4) .label': 'Right upper body',
            '.stats-grid .stat-box:nth-child(5) .label': 'Tracking quality',
            '.stats-grid .stat-box:nth-child(6) .label': 'Quality note',
            '.stat-box[data-panel-tab="analysis"] .label': 'Turn stability signal',
            '#btn_draw': 'Draw',
            '#btn_clear': 'Clear',
            '#btn_pen_color': 'Highlight color',
            '#btn_pen_width': 'Thick pen',
            '#btn_text_note': 'Text note',
            '#btn_shape_line': 'Line',
            '#btn_shape_arrow': 'Arrow',
            '#btn_shape_circle': 'Circle',
            '#btn_shape_angle': 'Angle line',
            '#btn_protractor': 'Protractor',
            '#btn_save_frame_capture': 'Save current frame',
            '#capturePanelLabel': 'Saved coaching frames',
            '.session-panel h4': 'Turn session',
            '.session-panel > .label': 'Mark turn start and end, then save.',
            '#btn_set_session_start': 'Set start',
            '#btn_set_session_end': 'Set end',
            '#btn_save_session': 'Save session',
            '#btn_update_session_memo': 'Update note',
            '#btn_clear_session': 'Clear selection',
            '#premiumModalTitle': 'Login required',
            '#premiumLoginText': 'Sign in with Google',
            '#premiumClose': 'Close',
            '.premium-panel h4': 'Premium coaching report',
            '.premium-panel > p': 'Export student-ready reports, compare turn sessions, and save coaching data.',
            '#btn_risk_timeline': 'Show instability moments',
            '#aiDraftTitle': 'AI coaching draft',
            '#btn_generate_ai_draft': 'Generate draft',
            '#btn_copy_ai_draft': 'Copy draft',
            '#btn_compare_sessions': 'Compare',
            '#btn_report_png': 'Save report',
            '#btn_export_csv': 'Export CSV',
            '#btn_export_video': 'Save AI video',
            'footer nav a[href="public/guide.html"]': 'Guide',
            'footer nav a[href="public/privacy.html"]': 'Privacy Policy',
            'footer nav a[href="public/terms.html"]': 'Terms',
            'footer p': '© 2026 KINECTI Neural Lab. All rights reserved.'
        },
        placeholder: {
            '#turnSessionName': 'Session name',
            '#turnSessionMemo': 'Coaching note, e.g. upper body collapses inside first',
            '#aiCoachingDraft': 'Generate a student-ready coaching note from the selected turn session and coach memo.',
            '#reportStudentName': 'Student name',
            '#reportCoachName': 'Coach name',
            '#loginPassword': 'Password'
        },
        labels: {
            '#sessionStartLabel': 'Not set',
            '#sessionEndLabel': 'Not set'
        },
        tags: ['Good turn', 'Needs work', 'Left turn', 'Right turn', 'Linked turns']
    },
    ko: {
        lang: 'ko',
        title: 'KINECTI - 스키 코칭 영상 보드',
        premiumActive: 'Premium 활성',
        login: '로그인',
        loggedIn: '로그인됨',
        unset: '미지정',
        analysisWaiting: '분석 대기',
        selectVideoNeeded: '영상 선택 필요',
        stableRisk: '안정 범위',
        watchRisk: '관찰 권장',
        highRisk: '주의 필요',
        originalView: '원본 보기',
        aiWaiting: 'AI 대기',
        originalHint: 'AI 참고는 관절선이 필요할 때만 켜세요.',
        aiHint: '재생하면 관절선과 각도 참고 지표를 표시합니다.',
        premiumCopy: feature => `${feature} 기능은 로그인 후 Premium 권한이 확인되면 이용할 수 있습니다.`,
        logoutConfirm: '로그아웃 하시겠습니까?',
        loggedOutMsg: '로그아웃 되었습니다.',
        noSessionsTitle: '저장된 턴 세션 없음',
        noSessionsBody: '시작/끝을 지정한 뒤 턴 세션을 저장하세요.',
        noSessionOption: '세션 없음',
        noCapturesTitle: '저장된 프레임 없음',
        noCapturesBody: '중요한 순간에서 멈추고 주석을 단 뒤 프레임을 저장하세요.',
        capturePrefix: '프레임',
        compareIdleTitle: '비교 대기',
        compareIdleBody: '저장한 턴 세션 2개를 선택하면 코칭 메모와 핵심 지표를 비교합니다.',
        text: {
            '.menu a[href="#tool"]': '코칭 보드',
            '.menu a[href="#guide"]': '사용 안내',
            '.menu a[href="#resources"]': '자료실',
            '.menu a[href="#about"]': '기술 정보',
            '.menu a[href="#privacy"]': '개인정보 처리방침',
            '.menu a[href="#contact"]': '문의',
            '.hero .eyebrow': 'SKI COACHING VIDEO REPORT TOOL',
            '.hero h1': 'KINECTI',
            '.hero .lead': '긴 스키 영상을 검토하고, 중요한 턴 구간과 대표 프레임을 저장하고, 코칭 주석과 메모를 학생에게 보낼 리포트로 정리하는 도구입니다. AI Reference는 코치를 대체하지 않는 참고 레이어입니다.',
            '.hero .actions .button.primary': '코칭 리뷰 시작',
            '.hero .actions .button:not(.primary)': '데이터 처리 방식 보기',
            '.hero-panel h2': '코칭 리포트 워크플로우',
            '.hero-panel .lead': '원본 영상을 기준 화면으로 쓰고, 필요할 때만 AI Reference를 켜서 참고한 뒤, 학생이 이해하기 쉬운 피드백 리포트로 정리합니다.',
            '#tool .section-head h2': '스키 코칭 영상 보드',
            '#tool .section-head p': '스키 영상을 불러와 턴 구간을 저장하고, 대표 프레임을 캡처하고, 시각 주석과 코칭 메모를 학생용 리포트로 정리합니다.',
            '#empty_state strong': '스키 영상을 선택하면 코칭 보드가 시작됩니다.',
            '#empty_state p': '파일은 현재 브라우저 세션에서만 처리됩니다.',
            '.upload-trigger': '영상 파일 선택',
            '#btn_play_pause': '재생',
            '#btn_view_original': '원본',
            '#btn_view_ai': 'AI 참고',
            '.dashboard h3': '스키 코칭 패널',
            '.dashboard > .label': '턴 리뷰 워크플로우',
            '[data-tab-target="session"]': '세션',
            '[data-tab-target="annotation"]': '캡처/주석',
            '[data-tab-target="analysis"]': '분석',
            '[data-tab-target="report"]': '리포트',
            '.session-meta .premium-chip:nth-child(1) span': '구간 시작',
            '.session-meta .premium-chip:nth-child(2) span': '구간 끝',
            '.stats-grid .stat-box:nth-child(1) .label': '왼쪽 무릎 굴곡',
            '.stats-grid .stat-box:nth-child(2) .label': '오른쪽 무릎 굴곡',
            '.stats-grid .stat-box:nth-child(3) .label': '왼쪽 상체 라인',
            '.stats-grid .stat-box:nth-child(4) .label': '오른쪽 상체 라인',
            '.stats-grid .stat-box:nth-child(5) .label': '추적 품질',
            '.stats-grid .stat-box:nth-child(6) .label': '품질 안내',
            '.stat-box[data-panel-tab="analysis"] .label': '턴 안정성 신호',
            '#btn_draw': '주석 그리기',
            '#btn_clear': '주석 지우기',
            '#btn_pen_color': '강조 색상',
            '#btn_pen_width': '굵은 펜',
            '#btn_text_note': '텍스트 메모',
            '#btn_shape_line': '직선',
            '#btn_shape_arrow': '화살표',
            '#btn_shape_circle': '원 표시',
            '#btn_shape_angle': '각도선',
            '#btn_protractor': '각도기',
            '#btn_save_frame_capture': '현재 프레임 저장',
            '#capturePanelLabel': '저장된 코칭 프레임',
            '.session-panel h4': '턴 세션',
            '.session-panel > .label': '턴 시작과 끝을 찍어 저장하세요.',
            '#btn_set_session_start': '시작 지정',
            '#btn_set_session_end': '끝 지정',
            '#btn_save_session': '세션 저장',
            '#btn_update_session_memo': '메모 업데이트',
            '#btn_clear_session': '선택 해제',
            '#premiumModalTitle': '로그인이 필요합니다',
            '#premiumLoginText': 'Google 계정으로 로그인',
            '#premiumClose': '닫기',
            '.premium-panel h4': 'Premium 코칭 리포트',
            '.premium-panel > p': '학생에게 보낼 리포트, 턴 비교, 코칭 데이터를 저장합니다.',
            '#btn_risk_timeline': '턴 흔들림 시점 보기',
            '#aiDraftTitle': 'AI 코칭 메모 초안',
            '#btn_generate_ai_draft': '초안 생성',
            '#btn_copy_ai_draft': '초안 복사',
            '#btn_compare_sessions': '비교',
            '#btn_report_png': '리포트 저장',
            '#btn_export_csv': 'CSV 내보내기',
            '#btn_export_video': 'AI 구간 영상 저장',
            'footer nav a[href="public/guide.html"]': '사용 가이드',
            'footer nav a[href="public/privacy.html"]': '개인정보처리방침',
            'footer nav a[href="public/terms.html"]': '이용약관',
            'footer p': '© 2026 KINECTI Neural Lab. All rights reserved.'
        },
        placeholder: {
            '#turnSessionName': '세션 이름',
            '#turnSessionMemo': '코칭 메모 예: 상체가 안쪽으로 먼저 무너짐',
            '#aiCoachingDraft': '선택한 턴 세션과 코치 메모를 학생에게 전달하기 좋은 문장으로 정리합니다.',
            '#reportStudentName': '학생 이름',
            '#reportCoachName': '코치 이름',
            '#loginPassword': '비밀번호'
        },
        labels: {
            '#sessionStartLabel': '미지정',
            '#sessionEndLabel': '미지정'
        },
        tags: ['좋은 턴', '나쁜 턴', '좌턴', '우턴', '연속턴']
    },
    ja: {
        lang: 'ja',
        title: 'KINECTI - スキーコーチング動画ボード',
        premiumActive: 'Premium 有効',
        login: 'ログイン',
        loggedIn: 'ログイン中',
        unset: '未設定',
        analysisWaiting: '分析待機',
        selectVideoNeeded: '動画を選択',
        stableRisk: '安定範囲',
        watchRisk: '要確認',
        highRisk: '注意',
        originalView: '元動画表示',
        aiWaiting: 'AI 待機',
        originalHint: 'AIオーバーレイ는 필요한時만 참고로 쓰세요.',
        aiHint: '再生하면 관절선과 각도 참고 지표를 표시합니다.',
        premiumCopy: feature => `${feature} 기능은 로그인 후 Premium 권한이 확인되면 이용할 수 있습니다.`,
        logoutConfirm: 'ログアウトしますか?',
        loggedOutMsg: 'ログアウトしました.',
        noSessionsTitle: '保存済みターンセッションなし',
        noSessionsBody: '開始/終了を指定してターンセッションを保存してください.',
        noSessionOption: 'セッションなし',
        noCapturesTitle: '保存済みフレームなし',
        noCapturesBody: '重要な瞬間で停止し、注釈を付けてフレームを保存してください.',
        capturePrefix: 'フレーム',
        compareIdleTitle: '比較待機',
        compareIdleBody: '保存したターンセッションを2つ選ぶと、メモと主要指標を比較します.',
        text: {
            '.menu a[href="#tool"]': '分析ツール',
            '.menu a[href="#guide"]': 'ガイド',
            '.menu a[href="#resources"]': '資料',
            '.menu a[href="#about"]': '기술 정보',
            '.menu a[href="#privacy"]': 'プライバシー',
            '.menu a[href="#contact"]': 'お問い合わせ',
            '.hero .eyebrow': 'SKI COACHING VIDEO BOARD',
            '.hero h1': 'KINECTI',
            '.hero .lead': '長いスキー動画에서 중요한 턴을 저장하고, 주석을 달고, 학생용 리포트를 만드는 도구입니다.',
            '.hero .actions .button.primary': 'レビューを開始',
            '.hero .actions .button:not(.primary)': '데이터 처리 방식 보기',
            '.hero-panel h2': 'コーチング手順',
            '.hero-panel .lead': '元動画を基準 화면으로 쓰고, 필요할 때만 AI Reference를 켜서 참고한 뒤, 피드백을 정리합니다.',
            '#tool .section-head h2': '스키 코칭 영상 보드',
            '#tool .section-head p': '動画を読み込み, 턴 구간을 저장하고, 주석을 달고 리포트를 저장합니다.',
            '#empty_state strong': '스키 영상을 선택하면 코칭 보드가 시작됩니다.',
            '#empty_state p': '파일은 현재 브라우저 세션에서만 처리됩니다.',
            '.upload-trigger': '영상 파일 선택',
            '#btn_play_pause': '再生',
            '#btn_view_original': '元動画',
            '#btn_view_ai': 'AI Reference',
            '.dashboard h3': '스키 코칭 패널',
            '.dashboard > .label': '턴 리뷰 워크플로우',
            '[data-tab-target="session"]': 'セッション',
            '[data-tab-target="annotation"]': '캡처/주석',
            '[data-tab-target="analysis"]': '分析',
            '[data-tab-target="report"]': 'レポート',
            '.session-meta .premium-chip:nth-child(1) span': '開始',
            '.session-meta .premium-chip:nth-child(2) span': '終了',
            '.stats-grid .stat-box:nth-child(1) .label': '左膝의 屈曲',
            '.stats-grid .stat-box:nth-child(2) .label': '右膝의 屈曲',
            '.stats-grid .stat-box:nth-child(3) .label': '左上体ライン',
            '.stats-grid .stat-box:nth-child(4) .label': '右上体ライン',
            '.stats-grid .stat-box:nth-child(5) .label': '追跡品質',
            '.stats-grid .stat-box:nth-child(6) .label': '品質メモ',
            '.stat-box[data-panel-tab="analysis"] .label': '턴 안정성 신호',
            '#btn_draw': '描画',
            '#btn_clear': '클리어',
            '#btn_pen_color': '強調色',
            '#btn_pen_width': '굵은 펜',
            '#btn_text_note': 'テキストメモ',
            '#btn_shape_line': '直線',
            '#btn_shape_arrow': '矢일표',
            '#btn_shape_circle': '円',
            '#btn_shape_angle': '角度線',
            '#btn_protractor': '분도기',
            '#btn_save_frame_capture': '현재 프레임 저장',
            '#capturePanelLabel': '저장된 코칭 프레임',
            '.session-panel h4': '턴 세션',
            '.session-panel > .label': '턴 시작과 끝을 찍어 저장하세요.',
            '#btn_set_session_start': '開始指定',
            '#btn_set_session_end': '終了指定',
            '#btn_save_session': '保存',
            '#btn_update_session_memo': '메모 업데이트',
            '#btn_clear_session': '選択解除',
            '#premiumModalTitle': '로그인이 필요합니다',
            '#premiumLoginText': 'Google 계정으로 로그인',
            '#premiumClose': '닫기',
            '.premium-panel h4': 'Premium 코칭 리포트',
            '.premium-panel > p': '受講者向けレポート, 턴 비교, 코칭 데이터를 저장합니다.',
            '#btn_risk_timeline': '不安定な場面を見る',
            '#aiDraftTitle': 'AI 코칭 메모 초안',
            '#btn_generate_ai_draft': '초안 생성',
            '#btn_copy_ai_draft': '초안 복사',
            '#btn_compare_sessions': '比較',
            '#btn_report_png': '리포트 저장',
            '#btn_export_csv': 'CSV出力',
            '#btn_export_video': 'AI動画保存',
            'footer nav a[href="public/guide.html"]': 'ガイド',
            'footer nav a[href="public/privacy.html"]': '개인정보처리방침',
            'footer nav a[href="public/terms.html"]': '이용약관',
            'footer p': '© 2026 KINECTI Neural Lab. All rights reserved.'
        },
        placeholder: {
            '#turnSessionName': '세션 이름',
            '#turnSessionMemo': '메모 예: 상체가 안쪽으로 먼저 무너짐',
            '#aiCoachingDraft': '선택한 턴 세션과 코치 메모를 학생에게 전달하기 좋은 문장으로 정리합니다.',
            '#reportStudentName': '학생 이름',
            '#reportCoachName': '코치 이름',
            '#loginPassword': '비밀번호'
        },
        labels: {
            '#sessionStartLabel': '未設定',
            '#sessionEndLabel': '未設定'
        },
        tags: ['좋은 턴', '나쁜 턴', '좌턴', '우턴', '연속턴']
    }
};

window.translations['en-AT'] = {
    ...window.translations.en,
    lang: 'en-AT',
    title: 'KINECTI - Ski Coaching Video Board',
    text: {
        ...window.translations.en.text,
        '.hero .lead': 'Review long ski videos, save key turn sessions, draw coaching notes, and export athlete-ready reports. AI overlay is an optional reference layer.',
        '.premium-panel > p': 'Export athlete-ready reports, compare turn sessions, and save coaching data.'
    },
    placeholder: {
        ...window.translations.en.placeholder,
        '#reportStudentName': 'Athlete name'
    }
};

window.sectionContent = {
    en: {
        guide: `
    <div class="section-head">
        <h2>Guide</h2>
        <p>For more reliable results, use footage where the skier's full body is visible and the turn flow is not interrupted. Angle estimates can become unstable when the skier is far from the camera or joints are hidden by ski clothing, poles, or other people.</p>
    </div>
    <div class="grid-3">
        <article class="card">
            <h3>1. Select a ski video</h3>
            <p>Choose the turn footage you want to review. The file is read only in browser memory and is not stored on a server.</p>
        </article>
        <article class="card">
            <h3>2. Check turn tracking</h3>
            <p>Use the skeleton overlay to review knee flexion and upper-body line. Annotation tools help mark turn entry, transition, and finish moments.</p>
        </article>
        <article class="card">
            <h3>3. Use it for coaching records</h3>
            <p>Results are reference material for practice logs and coaching feedback. Skill evaluation or injury-related decisions should come from a ski instructor, coach, or medical professional.</p>
        </article>
    </div>`,
        resources: `
    <div class="section-head">
        <h2>Resources</h2>
        <p>Basic references on ski turn video review, knee flexion, upper-body line, and left/right turn balance. Use these notes to interpret KINECTI results more carefully.</p>
    </div>
    <div class="article-list">
        <article class="resource-article">
            <h3>What ski turn video analysis means</h3>
            <p>Ski turn video analysis estimates key body landmarks in the footage and reviews how knee and upper-body lines change through the turn. Tracking shoulders, hips, knees, and ankles frame by frame makes the turn flow easier to revisit visually.</p>
            <p>KINECTI processes the selected ski video in the browser and displays landmark and angle references. This can help with practice logs or left/right turn comparison, but camera distance, slope, angle, ski clothing, and pole occlusion can affect the estimates. Do not judge posture from a single number alone.</p>
        </article>
        <article class="resource-article">
            <h3>Why knee flexion matters in ski turns</h3>
            <p>Knee flexion and left/right differences can help review turn stability, load transfer, and rhythm. If one side repeatedly collapses or shows a large difference, the turn balance may need closer review.</p>
            <p>In video analysis, knee flexion is calculated from hip, knee, and ankle positions. This is a reference signal, not a diagnosis of skill level or injury risk. If pain or prior injury is involved, expert evaluation should come first.</p>
        </article>
        <article class="resource-article">
            <h3>What to check when reviewing ski turns</h3>
            <p>It is usually better to review the full flow from turn entry to transition and finish, rather than judging one frozen posture. Comparing knee flexion and upper-body line across left and right turns helps reveal repeated habits.</p>
            <ul>
                <li>Check that the skier's full body is inside the frame.</li>
                <li>Use a front-diagonal or side-diagonal view when possible.</li>
                <li>Look for repeated large differences between left and right knee flexion.</li>
                <li>Results can become unstable when poles, other skiers, or lift structures hide body parts.</li>
            </ul>
            <p>KINECTI annotations make it easier to mark entry, transition, and finish frames for comparison.</p>
        </article>
        <article class="resource-article">
            <h3>How MediaPipe Pose estimates joints</h3>
            <p>MediaPipe Pose estimates major body landmarks from a video image. It detects a person and calculates points such as shoulders, elbows, wrists, hips, knees, and ankles. KINECTI uses these landmarks to draw the skeleton and show turn reference metrics.</p>
            <p>The technology is fast and accessible, but it is not perfect for every ski video. Long-distance footage, fast turns, backlighting, overlapping people, or body parts outside the frame can reduce tracking quality. First check whether the skeleton overlay matches the skier's actual body position.</p>
        </article>
        <article class="resource-article">
            <h3>Important caution for coaching boards</h3>
            <p>KINECTI is a tool for coaches to review footage, explain points, and create reports. AI reference metrics are affected by filming conditions and model estimation, so they should not be treated as absolute standards. Pain or injury-related decisions should be reviewed by medical or ski professionals.</p>
            <p>For more stable analysis, keep the skier large enough in the frame and capture the full turn. When comparing sessions, similar camera distance and angle make changes easier to track.</p>
        </article>
    </div>`,
        about: `
    <div class="section-head">
        <h2>Technology</h2>
        <p>KINECTI uses a browser-based pose estimation model and HTML Canvas visualization. It extracts pose landmarks from the selected ski video and calculates angles between key points to show turn changes as numbers and visual references.</p>
    </div>
    <div class="grid-3">
        <article class="card">
            <h3>MediaPipe Pose</h3>
            <p>Estimates key body landmarks and displays frame-by-frame movement on the screen.</p>
        </article>
        <article class="card">
            <h3>Turn metric calculation</h3>
            <p>Calculates vector angles between hips, knees, ankles, and upper-body reference points to track knee flexion and upper-body line.</p>
        </article>
        <article class="card">
            <h3>Local processing</h3>
            <p>The selected ski video is analyzed in the current browser and is not stored on an external server.</p>
        </article>
    </div>`,
        privacy: `
    <div class="section-head">
        <h2>Privacy</h2>
        <p>This policy explains what information may be processed when using the KINECTI website and what rights users have.</p>
    </div>
    <div class="policy">
        <h3>Information we process</h3>
        <p>KINECTI does not provide account registration and does not require directly identifying information such as name, phone number, or address. Video files selected by the user are opened in the browser for analysis and are not uploaded or stored by the site operator on a separate server.</p>
        <h3>Automatically collected information</h3>
        <p>Google Analytics and Microsoft Clarity may be used to check service quality. These tools may process non-identifying statistics such as visited pages, device type, browser information, and approximate usage patterns.</p>
        <h3>Cookies</h3>
        <p>Service providers may use cookies or similar technologies for traffic measurement and service improvement. Users can block or delete cookies in browser settings.</p>
        <h3>Purpose of use</h3>
        <ul>
            <li>Check website errors and improve performance</li>
            <li>Understand how content and features are used</li>
            <li>Review security and prevent abuse</li>
        </ul>
        <h3>Contact</h3>
        <p>For privacy questions, contact us through the email in the Contact section. We will respond within the necessary scope after reviewing the request.</p>
    </div>`,
        contact: `
    <div class="section-head">
        <h2>Operator and Contact</h2>
        <p>KINECTI Neural Lab is an individual project researching sports coaching video boards and browser-based report tools. Feature suggestions, bug reports, and privacy questions are accepted by email.</p>
    </div>
    <div class="policy">
        <h3>Operator</h3>
        <p>KINECTI Neural Lab</p>
        <h3>Contact email</h3>
        <p><a href="mailto:smarttool_lee@naver.com">smarttool_lee@naver.com</a></p>
        <h3>Disclaimer</h3>
        <p>KINECTI's AI reference metrics are auxiliary information for coaching explanations. They do not replace skill-level assessment, disease diagnosis, treatment prescription, or injury judgment.</p>
    </div>`
    },
    ko: {
        guide: `
    <div class="section-head">
        <h2>사용 안내</h2>
        <p>정확한 결과를 위해 스키어 전신이 보이고 턴 흐름이 끊기지 않는 영상을 사용하세요. 멀리서 촬영했거나 스키복, 폴, 다른 사람에게 관절이 가려진 영상에서는 각도 계산이 불안정할 수 있습니다.</p>
    </div>
    <div class="grid-3">
        <article class="card"><h3>1. 스키 영상 선택</h3><p>분석할 턴 영상을 선택합니다. 파일은 브라우저 메모리에서만 읽히며 서버 저장 기능은 없습니다.</p></article>
        <article class="card"><h3>2. 턴 자세 추적 확인</h3><p>캔버스에 표시되는 골격선을 보며 무릎 굴곡과 상체 라인을 확인합니다. 주석 기능으로 턴 시작, 전환, 마무리 구간을 표시할 수 있습니다.</p></article>
        <article class="card"><h3>3. 강습·연습 기록으로 활용</h3><p>결과는 개인 연습 기록과 코칭 피드백을 위한 참고용입니다. 기술 평가나 부상 판단은 스키 강사, 코치, 의료 전문가의 판단을 우선해야 합니다.</p></article>
    </div>`,
        resources: document.getElementById('resources')?.innerHTML || '',
        about: document.getElementById('about')?.innerHTML || '',
        privacy: document.getElementById('privacy')?.innerHTML || '',
        contact: document.getElementById('contact')?.innerHTML || ''
    }
};

window.sectionContent['en-AT'] = window.sectionContent.en;
window.sectionContent.ja = window.sectionContent.en;