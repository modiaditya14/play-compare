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
    if (app.features) {
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
        } else if (app.category === "Notes" || app.category === "Business") {
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
        } else if (app.category === "Entertainment" || app.category === "Music") {
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
                    value: app.features.premiumContent == true || false,
                });
            }
        } else if (app.category === "Games") {
            if ("multiplayer" in app.features) {
                features.push({ label: "Multiplayer", value: app.features.multiplayer == true || false });
            }
            if ("offline" in app.features) {
                features.push({ label: "Offline Play", value: app.features.offline == true || false });
            }
            if ("controller" in app.features) {
                features.push({
                    label: "Controller Support",
                    value: app.features.controller == true || false,
                });
            }
            if ("inAppPurchases" in app.features) {
                features.push({
                    label: "In-App Purchases",
                    value: app.features.inAppPurchases == true || false,
                });
            }
        }
        // else if () {
        //     if ("videoCall" in app.features) {
        //         features.push({ label: "Video Conference", value: app.features.videoCall == true || false });
        //     }
        //     if ("readReceipts" in app.features) {
        //         features.push({ label: "Screen Sharing", value: app.features.readReceipts == true || false });
        //     }
        //     if ("teamCollaboration" in app.features) {
        //         features.push({
        //             label: "Team Collaboration",
        //             value: app.features.teamCollaboration == true || false,
        //         });
        //     }
        //     if ("fileSharing" in app.features) {
        //         features.push({ label: "File Sharing", value: app.features.fileSharing == true || false });
        //     }
        // }
        else if (app.category === "Shopping") {
            if ("cashOnDelivery" in app.features) {
                features.push({ label: "Cash On Delivery", value: app.features.cashOnDelivery == true || false });
            }
            if ("wishlist" in app.features) {
                features.push({ label: "Wishlist", value: app.features.wishlist == true || false });
            }
            if ("easyReturns" in app.features) {
                features.push({
                    label: "Easy Returns",
                    value: app.features.easyReturns == true || false,
                });
            }
            if ("oneDayDelivery" in app.features) {
                features.push({ label: "one Day Delivery", value: app.features.oneDayDelivery == true || false });
            }
        }
        else if (app.category === "Photography") {
            if ("filters" in app.features) {
                features.push({
                    label: "Filters",
                    value: app.features.filters == true || false,
                });
            }
            if ("cloudBackup" in app.features) {
                features.push({ label: "Cloud Backup", value: app.features.cloudBackup == true || false });
            }
            if ("editingTools" in app.features) {
                features.push({ label: "Editing Tools", value: app.features.editingTools == true || false });
            }
            if ("collage" in app.features) {
                features.push({
                    label: "Collage",
                    value: app.features.collage == true || false,
                });
            }
        }
        //  else if (app.category === "News & Magazines") {
        //     if ("offlineReading" in app.features) {
        //         features.push({
        //             label: "Offline Reading",
        //             value: app.features.offlineReading == true || false,
        //         });
        //     }
        //     if ("personalization" in app.features) {
        //         features.push({ label: "Personalization", value: app.features.personalization == true || false });
        //     }
        //     if ("pushNotifications" in app.features) {
        //         features.push({
        //             label: "Push Notifications",
        //             value: app.features.pushNotifications == true || false,
        //         });
        //     }
        //     if ("darkMode" in app.features) {
        //         features.push({ label: "Dark Mode", value: app.features.darkMode == true || false });
        //     }
        // } 
        // else if (app.category === "Lifestyle") {
        //     if ("userProfiles" in app.features) {
        //         features.push({ label: "User Profiles", value: app.features.userProfiles == true || false });
        //     }
        //     if ("socialFeatures" in app.features) {
        //         features.push({ label: "Social Features", value: app.features.socialFeatures == true || false });
        //     }
        //     if ("personalization" in app.features) {
        //         features.push({ label: "Personalization", value: app.features.personalization == true || false });
        //     }
        //     if ("customization" in app.features) {
        //         features.push({ label: "Customization", value: app.features.customization == true || false });
        //     }
        // }
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
    console.log("Features A:", featuresA);
    console.log("Features B:", featuresB);
    // Get all unique feature labels
    const allFeatures = Array.from(
        new Set([...featuresA.map((f) => f.label), ...featuresB.map((f) => f.label)])
    );

    if (allFeatures.length === 0) return null;

    return (
        <div className="panel-emboss overflow-hidden rounded-3xl border border-white/5">
            <div className="border-b border-white/5 p-3 sm:p-6">
                <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-chalk/50">
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
                            className="grid grid-cols-3 sm:grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4 px-3 sm:px-6 py-3 sm:py-4"
                        >
                            <div className="flex items-center gap-2">
                                <FeatureIcon active={valueA} />
                                <span
                                    className={`text-xs sm:text-sm ${winner === "A" ? "font-semibold text-volt" : "text-chalk/60"
                                        }`}
                                >
                                    {valueA ? "Yes" : "No"}
                                </span>
                            </div>
                            <div className="text-[0.7rem] sm:text-[0.85rem] uppercase tracking-wide text-chalk/60 text-center font-semibold">
                                {featureLabel}
                            </div>
                            <div className="flex items-center justify-end gap-2">
                                <span
                                    className={`text-right text-xs sm:text-sm ${winner === "B" ? "font-semibold text-volt" : "text-chalk/60"
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
