import { useEffect, useState } from "react";
import {
    Button,
    ButtonGroup,
    Container,
    Row,
    Col,
    Card,
    CardBody
} from "reactstrap";

// ⏱ saniyeyi mm:ss formatına çevirir
function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

const DURATIONS = {
    focus: 4,
    short: 2,
    long: 3,
};

// 🌱 büyüme görseli
function getGrowthVisual(stage) {
    if (stage === 0) return "🌰";
    if (stage === 1) return "💧";
    if (stage === 2) return "🌿";
    if (stage === 3) return "🌱";
    if (stage < 8) return "🪴";
    if (stage < 12) return "🌳";
    return "🌼";
}

export default function App() {
    const [mode, setMode] = useState("focus");
    const [focusCount, setFocusCount] = useState(0);

    const [secondsLeft, setSecondsLeft] = useState(DURATIONS.focus);
    const [isRunning, setIsRunning] = useState(false);

    const [completedSessions, setCompletedSessions] = useState(0);
    const [growthStage, setGrowthStage] = useState(0);

    const [animate, setAnimate] = useState(false);

    const totalSeconds = DURATIONS[mode];
    const progress = Math.max(0, Math.min(1, secondsLeft / totalSeconds));

    const radius = 90;
    const circumference = 2 * Math.PI * radius;
    const offset = -(circumference - progress * circumference);

    function manualSwitch(nextMode = mode) {
        setIsRunning(false);
        setMode(nextMode);
        setSecondsLeft(DURATIONS[nextMode]);

        if (nextMode === "focus") setFocusCount(0);
    }

    function switchMode(nextMode) {
        setMode(nextMode);
        setSecondsLeft(DURATIONS[nextMode]);
    }

    // ⏱ Timer çalıştırır
    useEffect(() => {
        if (!isRunning) return;

        const id = setInterval(() => {
            setSecondsLeft(prev => Math.max(0, prev - 1));
        }, 1000);

        return () => clearInterval(id);
    }, [isRunning]);

    // ⏰ Süre bitince çalışır
    useEffect(() => {
        if (secondsLeft !== 0) return;

        const timeout = setTimeout(() => {
            if (mode === "focus") {
                setGrowthStage(prev => prev + 1);
                setCompletedSessions(prev => prev + 1);

                // ✅ animasyon sadece burada tetiklenir
                setAnimate(true);
                setTimeout(() => setAnimate(false), 300);

                setFocusCount(prev => {
                    const newCount = prev + 1;
                    newCount % 4 === 0 ? switchMode("long") : switchMode("short");
                    return newCount;
                });
            } else {
                switchMode("focus");
            }

            setIsRunning(true);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [secondsLeft, mode]);

    return (
        <Container className="app-container text-center">

            <div className="surface">

                {/* Mode Switch */}
                <ButtonGroup className="mode-switch">
                    <Button color={mode === "focus" ? "warning" : "light"} onClick={() => manualSwitch("focus")}>
                        Focus
                    </Button>

                    <Button color={mode === "short" ? "warning" : "light"} onClick={() => manualSwitch("short")}>
                        Short
                    </Button>

                    <Button color={mode === "long" ? "warning" : "light"} onClick={() => manualSwitch("long")}>
                        Long
                    </Button>
                </ButtonGroup>


                {/* Timer */}
                <div className="timer-wrapper">
                    <svg width="240" height="240">
                        <circle className="timer-bg" r={radius} cx="120" cy="120" />
                        <circle
                            className="timer-progress"
                            r={radius}
                            cx="120"
                            cy="120"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            transform="rotate(-90 120 120)"
                        />
                    </svg>

                    <div className="timer-text">
                        {formatTime(secondsLeft)}
                    </div>
                </div>


                {/* Controls */}
                <div className="d-flex justify-content-center gap-2">

                    <Button className="start-btn" onClick={() => setIsRunning(true)}>
                        Start Session
                    </Button>

                    <Button color="secondary" className="pause-btn" onClick={() => setIsRunning(false)}>
                        Pause
                    </Button>

                    <Button color="link" className="reset-btn" onClick={() => manualSwitch(mode)}>
                        Reset
                    </Button>

                </div>

            </div>


            {/* Garden */}
            <Row className="justify-content-center">
                <Col md="4">
                    <Card className="garden-card">
                        <CardBody>
                            <h6 className="text-muted mb-1">Your Focus Growth</h6>


                            <div className={`growth-visual ${animate ? "grow" : ""}`}>
                                {getGrowthVisual(growthStage)}
                            </div>

                            <p className="text-muted mb-0">
                                {completedSessions} sessions completed
                            </p>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

        </Container>
    )};
