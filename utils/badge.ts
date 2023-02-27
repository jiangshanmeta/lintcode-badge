export const contentPresets = {
    rank: {
        presetLabel: "Rank",
        badgeLabel: "Rank",
        badgeValue: "rank",
        badgeValueDisplay: "Rank",
    },
    solved: {
        presetLabel: "Solved",
        badgeLabel: "Solved",
        badgeValue: "solved",
        badgeValueDisplay: "Solved",
    },
    "solved-over-total": {
        presetLabel: "Solved over total",
        badgeLabel: "Solved",
        badgeValue: "solvedOverTotal",
        badgeValueDisplay: "Solved over total",
    },
    "solved-percentage": {
        presetLabel: "Solved percentage",
        badgeLabel: "Solved",
        badgeValue: "solvedPercentage",
        badgeValueDisplay: "Solved percentage",
    },
} as const;

export const styles = {
    plastic: { width: "99px", height: "18px" },
    flat: { width: "81px", height: "20px" },
    "flat-square": { width: "125px", height: "20px" },
    "for-the-badge": { width: "210px", height: "28px" },
    social: { width: "98px", height: "20px" },
} as const;

export type ContentPresetName = keyof typeof contentPresets;

type Style = keyof typeof styles;

export interface Badge {
  username: string;
  style: Style;
  labelColor: string;
  color: string;
  contentPreset: ContentPresetName | "custom";
  label: string;
  value: ContentPresetName;
  showLogo: boolean;
  logoColor: string;
}

export const DEFAULT_BADGE: Badge = {
    username: "jiangshanmeta",
    style: "for-the-badge",
    labelColor: "black",
    color: "#12B4FF",
    contentPreset: "solved-over-total",
    label: "Solved",
    value: "solved-over-total",
    showLogo: false,
    logoColor: "yellow",
};


export const getUrl = (badge: Badge): string =>
    `https://img.shields.io/badge/dynamic/json?style=${
        badge.style
    }&labelColor=${encodeURIComponent(
        badge.labelColor
    )}&color=${encodeURIComponent(badge.color)}&label=${encodeURIComponent(
        badge.label
    )}&query=${
        contentPresets[badge.value].badgeValue
    }&url=https%3A%2F%2Flintcode-badge.vercel.app%2Fapi%2Fusers%2F${encodeURIComponent(
        badge.username
    )}`;

export const getMarkdown = (badge: Badge): string =>
    `[![LeetCode user ${badge.username}](${getUrl(
        badge
    )})](https://lintcode.com/user/${badge.username}/)`;
