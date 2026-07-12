import type { PlayApp } from "../types/app";

function FeatureIcon({ active }: { active: boolean }) {
    return (
        <span
            className={`inline-block h-2 w-2 rounded-full ${active ? "bg-volt shadow-[0_0_6px_var(--color-volt)]" : "bg-chalk/20"
                }`}
        />
    );
}

function getFeatureLabels(
    app: PlayApp
): { label: string; value: boolean }[] {
    const features: { label: string; value: boolean }[] = [];
    const appWithFeatures = app as any;
    if (app.features) {
        console.log(app.features)
        if (app.category === "Productivity") {
            if ("offlineMode" in app.features) {
                features.push({ label: "Offline Mode", value: app.features.offlineMode == true || false });
            }
            if ("cloudSync" in app.features) {
                features.push({ label: "Cloud Sync", value: app.features.cloudSync == true || false });
            }
            if ("collaboration" in app.features) {
                features.push({
                    label: "Collaboration",
                    value: app.features.collaboration == true || false,
                });
            }
        } else if (app.category === "Communication") {
            if ("readReceipts" in app.features) {
                features.push({ label: "Read Receipts", value: app.features.readReceipts == true || false });
            }
            if ("voiceCall" in app.features) {
                features.push({ label: "Voice Call", value: app.features.voiceCall == true || false });
            }
            if ("videoCall" in app.features) {
                features.push({ label: "Video Call", value: app.features.videoCall == true || false });
            }
            if ("e2eEncryption" in app.features) {
                features.push({
                    label: "E2E Encryption",
                    value: app.features.e2eEncryption == true || false,
                });
            }
        } else if (app.category === "Social") {
            if ("stories" in app.features) {
                features.push({ label: "Stories", value: app.features.stories == true || false });
            }
            if ("directMessaging" in app.features) {
                features.push({
                    label: "Direct Messaging",
                    value: app.features.directMessaging == true || false,
                });
            }
            if ("liveStreaming" in app.features) {
                features.push({ label: "Live Streaming", value: app.features.liveStreaming == true || false });
            }
            if ("groupChats" in app.features) {
                features.push({ label: "Group Chats", value: app.features.groupChats == true || false });
            }
        } else if (app.category === "Entertainment") {
            if ("offlineDownload" in app.features) {
                features.push({
                    label: "Offline Download",
                    value: app.features.offlineDownload == true || false,
                });
            }
            if ("ads" in app.features) {
                features.push({ label: "Ad-Supported", value: app.features.ads == true || false });
            }
            if ("premiumContent" in app.features) {
                features.push({
                    label: "Premium Content",
                    value: appWithFeatures.premiumContent ?? false,
                });
            }
        } else if (app.category === "Games") {
            if ("multiplayer" in app.features) {
                features.push({ label: "Multiplayer", value: appWithFeatures.multiplayer ?? false });
            }
            if ("offline" in app.features) {
                features.push({ label: "Offline Play", value: appWithFeatures.offline ?? false });
            }
            if ("controller" in app.features) {
                features.push({
                    label: "Controller Support",
                    value: appWithFeatures.controller ?? false,
                });
            }
            if ("inAppPurchases" in app.features) {
                features.push({
                    label: "In-App Purchases",
                    value: appWithFeatures.inAppPurchases ?? false,
                });
            }
        }
    }

    return features;
}

export function FeaturesComparison({
    appA,
    appB,
}: {
    appA: PlayApp;
    appB: PlayApp;
}) {
    const featuresA = getFeatureLabels(appA);
    const featuresB = getFeatureLabels(appB);
    // console.log("Features A:", featuresA);
    // console.log("Features B:", featuresB);
    // Get all unique feature labels
    const allFeatures = Array.from(
        new Set([...featuresA.map((f) => f.label), ...featuresB.map((f) => f.label)])
    );

    if (allFeatures.length === 0) return null;

    return (
        <div className="panel-emboss bg-black overflow-hidden rounded-3xl border border-white/5">
            <div className="border-b border-white/5 p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-chalk/50">
                    Features
                </h3>
            </div>
            <div className="divide-y divide-white/5">
                {allFeatures.map((featureLabel) => {
                    const featureA = featuresA.find((f) => f.label === featureLabel);
                    const featureB = featuresB.find((f) => f.label === featureLabel);
                    const valueA = featureA?.value ?? false;
                    const valueB = featureB?.value ?? false;
                    const winner =
                        valueA === valueB ? null : valueA ? "A" : "B";

                    return (
                        <div
                            key={featureLabel}
                            className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-4"
                        >
                            <div className="flex items-center gap-2">
                                <FeatureIcon active={valueA} />
                                <span
                                    className={`text-sm ${winner === "A" ? "font-semibold text-volt" : "text-chalk/60"
                                        }`}
                                >
                                    {valueA ? "Yes" : "No"}
                                </span>
                            </div>
                            <div className="text-xs uppercase tracking-wide text-chalk/30">
                                {featureLabel}
                            </div>
                            <div className="flex items-center justify-end gap-2">
                                <span
                                    className={`text-right text-sm ${winner === "B" ? "font-semibold text-volt" : "text-chalk/60"
                                        }`}
                                >
                                    {valueB ? "Yes" : "No"}
                                </span>
                                <FeatureIcon active={valueB} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
