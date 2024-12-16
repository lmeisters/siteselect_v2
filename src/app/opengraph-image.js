import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SiteSelect - Web Design Gallery";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "white",
                    backgroundImage:
                        "radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)",
                    backgroundSize: "100px 100px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "40px 80px",
                        backgroundColor: "white",
                        borderRadius: "12px",
                        border: "1px solid rgba(0,0,0,0.1)",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    }}
                >
                    <h1
                        style={{
                            fontSize: 64,
                            fontWeight: 900,
                            letterSpacing: "-0.05em",
                            background: "black",
                            backgroundClip: "text",
                            color: "transparent",
                            padding: "20px 0",
                            lineHeight: 1,
                        }}
                    >
                        SiteSelect.
                    </h1>
                    <p
                        style={{
                            fontSize: 28,
                            color: "rgb(82 82 91)",
                            marginTop: 24,
                            textAlign: "center",
                            maxWidth: 700,
                        }}
                    >
                        Curated Design Gallery for Creative Inspiration
                    </p>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
