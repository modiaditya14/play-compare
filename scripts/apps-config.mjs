// Package IDs by category. features set by hand (Play Store can't provide these).
// icon/installs/rating/reviews/etc fetched live by fetch-apps.mjs.

export const APPS = [
  // Productivity
  { id: "com.microsoft.office.outlook", category: "Productivity", features: { offlineMode: true, cloudSync: true, collaboration: true } },
  { id: "com.google.android.apps.docs", category: "Productivity", features: { offlineMode: true, cloudSync: true, collaboration: true } },
  { id: "com.todoist", category: "Productivity", features: { offlineMode: true, cloudSync: true, collaboration: true } },
  { id: "com.google.android.calendar", category: "Productivity", features: { offlineMode: true, cloudSync: true, collaboration: true } },
  { id: "com.trello", category: "Productivity", features: { offlineMode: false, cloudSync: true, collaboration: true } },
  { id: "com.microsoft.office.word", category: "Productivity", features: { offlineMode: true, cloudSync: true, collaboration: true } },
  { id: "com.microsoft.office.excel", category: "Productivity", features: { offlineMode: true, cloudSync: true, collaboration: true } },
  { id: "com.microsoft.office.powerpoint", category: "Productivity", features: { offlineMode: true, cloudSync: true, collaboration: true } },
  { id: "com.adobe.reader", category: "Productivity", features: { offlineMode: true, cloudSync: true, collaboration: false } },
  { id: "com.google.android.apps.docs.editors.sheets", category: "Productivity", features: { offlineMode: true, cloudSync: true, collaboration: true } },

  // Notes
  { id: "notion.id", category: "Notes", features: { offlineMode: false, cloudSync: true, collaboration: true } },
  { id: "com.evernote", category: "Notes", features: { offlineMode: true, cloudSync: true, collaboration: false } },
  { id: "com.microsoft.office.onenote", category: "Notes", features: { offlineMode: true, cloudSync: true, collaboration: true } },
  { id: "com.google.android.keep", category: "Notes", features: { offlineMode: true, cloudSync: true, collaboration: true } },
  { id: "com.simplemobiletools.notes", category: "Notes", features: { offlineMode: true, cloudSync: false, collaboration: false } },
  { id: "com.socialnmobile.colornote", category: "Notes", features: { offlineMode: true, cloudSync: true, collaboration: false } },
  { id: "com.standardnotes.standardnotes", category: "Notes", features: { offlineMode: true, cloudSync: true, collaboration: false } },
  { id: "net.cozic.joplin", category: "Notes", features: { offlineMode: true, cloudSync: true, collaboration: false } },
  { id: "com.getpocketbook.notes", category: "Notes", features: { offlineMode: true, cloudSync: false, collaboration: false } },
  { id: "com.bardsoftware.notekeeper", category: "Notes", features: { offlineMode: true, cloudSync: true, collaboration: false } },

  // Communication
  { id: "com.whatsapp", category: "Communication", features: { readReceipts: true, voiceCall: true, videoCall: true, e2eEncryption: true } },
  { id: "com.google.android.apps.messaging", category: "Communication", features: { readReceipts: true, voiceCall: false, videoCall: false, e2eEncryption: true } },
  { id: "us.zoom.videomeetings", category: "Communication", features: { readReceipts: false, voiceCall: true, videoCall: true, e2eEncryption: true } },
  { id: "com.discord", category: "Communication", features: { readReceipts: false, voiceCall: true, videoCall: true, e2eEncryption: false } },
  { id: "org.telegram.messenger", category: "Communication", features: { readReceipts: true, voiceCall: true, videoCall: true, e2eEncryption: true } },
  { id: "com.skype.raider", category: "Communication", features: { readReceipts: true, voiceCall: true, videoCall: true, e2eEncryption: true } },
  { id: "com.viber.voip", category: "Communication", features: { readReceipts: true, voiceCall: true, videoCall: true, e2eEncryption: true } },
  { id: "org.thoughtcrime.securesms", category: "Communication", features: { readReceipts: true, voiceCall: true, videoCall: true, e2eEncryption: true } },
  { id: "com.tencent.mm", category: "Communication", features: { readReceipts: true, voiceCall: true, videoCall: true, e2eEncryption: false } },
  { id: "jp.naver.line.android", category: "Communication", features: { readReceipts: true, voiceCall: true, videoCall: true, e2eEncryption: true } },

  // Social
  { id: "com.instagram.android", category: "Social", features: { stories: true, directMessaging: true, liveStreaming: true, groupChats: true } },
  { id: "com.zhiliaoapp.musically", category: "Social", features: { stories: true, directMessaging: true, liveStreaming: true, groupChats: false } },
  { id: "com.snapchat.android", category: "Social", features: { stories: true, directMessaging: true, liveStreaming: false, groupChats: true } },
  { id: "com.facebook.katana", category: "Social", features: { stories: true, directMessaging: true, liveStreaming: true, groupChats: true } },
  { id: "com.linkedin.android", category: "Social", features: { stories: true, directMessaging: true, liveStreaming: false, groupChats: true } },
  { id: "com.pinterest", category: "Social", features: { stories: false, directMessaging: true, liveStreaming: false, groupChats: false } },
  { id: "com.twitter.android", category: "Social", features: { stories: false, directMessaging: true, liveStreaming: true, groupChats: false } },
  { id: "com.reddit.frontpage", category: "Social", features: { stories: false, directMessaging: true, liveStreaming: false, groupChats: false } },
  { id: "com.tumblr", category: "Social", features: { stories: false, directMessaging: true, liveStreaming: false, groupChats: false } },
  { id: "org.joinmastodon.android", category: "Social", features: { stories: false, directMessaging: true, liveStreaming: false, groupChats: false } },

  // Entertainment
  { id: "com.netflix.mediaclient", category: "Entertainment", features: { offlineDownload: true, ads: true, premiumContent: true } },
  { id: "com.google.android.youtube", category: "Entertainment", features: { offlineDownload: true, ads: true, premiumContent: true } },
  { id: "com.disney.disneyplus", category: "Entertainment", features: { offlineDownload: true, ads: false, premiumContent: true } },
  { id: "com.amazon.avod.thirdpartyclient", category: "Entertainment", features: { offlineDownload: true, ads: true, premiumContent: true } },
  { id: "com.hulu.plus", category: "Entertainment", features: { offlineDownload: true, ads: true, premiumContent: true } },
  { id: "in.startv.hotstar", category: "Entertainment", features: { offlineDownload: true, ads: true, premiumContent: true } },
  { id: "com.hbo.hbonow", category: "Entertainment", features: { offlineDownload: true, ads: false, premiumContent: true } },
  { id: "com.peacocktv.peacockandroid", category: "Entertainment", features: { offlineDownload: false, ads: true, premiumContent: true } },
  { id: "com.crunchyroll.crunchyroid", category: "Entertainment", features: { offlineDownload: true, ads: true, premiumContent: true } },
  { id: "tv.twitch.android.app", category: "Entertainment", features: { offlineDownload: false, ads: true, premiumContent: true } },

  // Music
  { id: "com.spotify.music", category: "Music", features: { offlineDownload: true, ads: true, premiumContent: true } },
  { id: "com.google.android.apps.youtube.music", category: "Music", features: { offlineDownload: true, ads: true, premiumContent: true } },
  { id: "com.soundcloud.android", category: "Music", features: { offlineDownload: true, ads: true, premiumContent: true } },
  { id: "com.amazon.mp3", category: "Music", features: { offlineDownload: true, ads: false, premiumContent: true } },
  { id: "com.gaana", category: "Music", features: { offlineDownload: true, ads: true, premiumContent: true } },
  { id: "com.jio.media.jiobeats", category: "Music", features: { offlineDownload: true, ads: true, premiumContent: true } },
  { id: "com.pandora.android", category: "Music", features: { offlineDownload: true, ads: true, premiumContent: true } },
  { id: "deezer.android.app", category: "Music", features: { offlineDownload: true, ads: true, premiumContent: true } },
  { id: "com.bsbportal.music", category: "Music", features: { offlineDownload: true, ads: true, premiumContent: true } },
  { id: "com.mxtech.videoplayer.ad", category: "Music", features: { offlineDownload: true, ads: true, premiumContent: false } },  

  // Games
  { id: "com.activision.callofduty.shooter", category: "Games", features: { multiplayer: true, offline: false, controller: true, inAppPurchases: true } },
  { id: "com.supercell.clashofclans", category: "Games", features: { multiplayer: true, offline: false, controller: false, inAppPurchases: true } },
  { id: "com.king.candycrushsaga", category: "Games", features: { multiplayer: false, offline: true, controller: false, inAppPurchases: true } },
  { id: "com.dts.freefireth", category: "Games", features: { multiplayer: true, offline: false, controller: true, inAppPurchases: true } },
  { id: "com.roblox.client", category: "Games", features: { multiplayer: true, offline: false, controller: true, inAppPurchases: true } },
  { id: "com.tencent.ig", category: "Games", features: { multiplayer: true, offline: false, controller: true, inAppPurchases: true } },
  { id: "com.kiloo.subwaysurf", category: "Games", features: { multiplayer: false, offline: true, controller: false, inAppPurchases: true } },
  { id: "com.innersloth.spacemafia", category: "Games", features: { multiplayer: true, offline: false, controller: false, inAppPurchases: true } },
  { id: "com.supercell.clashroyale", category: "Games", features: { multiplayer: true, offline: false, controller: false, inAppPurchases: true } },
  { id: "com.mojang.minecraftpe", category: "Games", features: { multiplayer: true, offline: true, controller: true, inAppPurchases: true } },

  // Business
  { id: "com.Slack", category: "Business", features: { offlineMode: false, cloudSync: true, collaboration: true } },
  { id: "com.microsoft.teams", category: "Business", features: { offlineMode: false, cloudSync: true, collaboration: true } },
  { id: "com.asana.app", category: "Business", features: { offlineMode: false, cloudSync: true, collaboration: true } },
  { id: "com.intuit.quickbase.mobileapp", category: "Business", features: { offlineMode: false, cloudSync: true, collaboration: true } },
  { id: "com.salesforce.chatter", category: "Business", features: { offlineMode: false, cloudSync: true, collaboration: true } },
  { id: "com.zoho.zohoone", category: "Business", features: { offlineMode: false, cloudSync: true, collaboration: true } },
  { id: "com.mondaycom.mondaycomapp", category: "Business", features: { offlineMode: false, cloudSync: true, collaboration: true } },
  { id: "com.basecamp.bc3", category: "Business", features: { offlineMode: false, cloudSync: true, collaboration: true } },
  { id: "com.cisco.webex.meetings", category: "Business", features: { offlineMode: false, cloudSync: true, collaboration: true } },
  { id: "com.docusign.ink", category: "Business", features: { offlineMode: false, cloudSync: true, collaboration: false } },

  // Shopping
  { id: "com.amazon.mShop.android.shopping", category: "Shopping", features: { cashOnDelivery: true, wishlist: true, easyReturns: true, oneDayDelivery: true } },
  { id: "com.flipkart.android", category: "Shopping", features: { cashOnDelivery: true, wishlist: true, easyReturns: true, oneDayDelivery: false } },
  { id: "com.ebay.mobile", category: "Shopping", features: { cashOnDelivery: false, wishlist: true, easyReturns: true, oneDayDelivery: false } },
  { id: "com.alibaba.aliexpresshd", category: "Shopping", features: { cashOnDelivery: false, wishlist: true, easyReturns: true, oneDayDelivery: false } },
  { id: "com.myntra.android", category: "Shopping", features: { cashOnDelivery: true, wishlist: true, easyReturns: true, oneDayDelivery: false } },
  { id: "com.walmart.android", category: "Shopping", features: { cashOnDelivery: false, wishlist: true, easyReturns: true, oneDayDelivery: true } },
  { id: "com.zzkko", category: "Shopping", features: { cashOnDelivery: false, wishlist: true, easyReturns: true, oneDayDelivery: false } },
  { id: "com.etsy.android", category: "Shopping", features: { cashOnDelivery: false, wishlist: true, easyReturns: false, oneDayDelivery: false } },
  { id: "com.meesho.supply", category: "Shopping", features: { cashOnDelivery: true, wishlist: true, easyReturns: true, oneDayDelivery: false } },
  { id: "com.app.ajio", category: "Shopping", features: { cashOnDelivery: true, wishlist: true, easyReturns: true, oneDayDelivery: false } },

  // Photography
  { id: "com.google.android.apps.photos", category: "Photography", features: { filters: false, cloudBackup: true, editingTools: true, collage: false } },
  { id: "com.niksoftware.snapseed", category: "Photography", features: { filters: true, cloudBackup: false, editingTools: true, collage: false } },
  { id: "com.vsco.cam", category: "Photography", features: { filters: true, cloudBackup: true, editingTools: true, collage: false } },
  { id: "com.adobe.lrmobile", category: "Photography", features: { filters: true, cloudBackup: true, editingTools: true, collage: false } },
  { id: "com.picsart.studio", category: "Photography", features: { filters: true, cloudBackup: true, editingTools: true, collage: true } },
  { id: "com.canva.editor", category: "Photography", features: { filters: true, cloudBackup: true, editingTools: true, collage: true } },
  { id: "com.linecorp.foodcam.android", category: "Photography", features: { filters: true, cloudBackup: false, editingTools: false, collage: false } },
  { id: "com.lightricks.facetune", category: "Photography", features: { filters: true, cloudBackup: false, editingTools: true, collage: false } },
  { id: "com.adobe.psmobile", category: "Photography", features: { filters: true, cloudBackup: true, editingTools: true, collage: false } },
  { id: "com.cyberlink.youperfect", category: "Photography", features: { filters: true, cloudBackup: false, editingTools: true, collage: true } },
];